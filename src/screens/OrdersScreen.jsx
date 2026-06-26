import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import useStore from '../store/useStore'

export default function OrdersScreen() {
  const { orders } = useStore();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return '#FFC107'; // Amber
      case 'Shipped': return 'var(--color-primary)'; // Indigo
      case 'Delivered': return 'var(--color-success)'; // Emerald
      case 'Cancelled': return '#FF4B4B'; // Red
      default: return 'var(--color-text-muted)';
    }
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>My Orders</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map(order => (
          <Link to={`/track/${order.id.replace('#', '')}`} key={order.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: 'var(--border-radius-lg)', 
            padding: '16px', 
            boxShadow: 'var(--shadow-soft)',
            display: 'block'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #EAEAEA' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{order.id}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{order.date}</div>
              </div>
              <div style={{ 
                padding: '4px 12px', 
                borderRadius: 'var(--border-radius-pill)', 
                backgroundColor: `${getStatusColor(order.status)}15`, 
                color: getStatusColor(order.status),
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {order.status}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                  <img src={order.image} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: '700' }}>₹{order.amount.toFixed(2)}</div>
              </div>
              <ChevronRight size={20} color="var(--color-text-muted)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
