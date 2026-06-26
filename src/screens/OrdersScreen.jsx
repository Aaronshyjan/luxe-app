import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/client'
import useStore from '../store/useStore'

export default function OrdersScreen() {
  const { checkoutEmail } = useStore();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', checkoutEmail],
    queryFn: async () => {
      if (!checkoutEmail) return [];
      const res = await apiClient.get(`/orders/user/${checkoutEmail}`);
      return res.data.data;
    },
    enabled: !!checkoutEmail
  });

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING': return '#FFC107'; // Amber
      case 'PACKED': return '#2196F3'; // Blue
      case 'SHIPPED': return 'var(--color-primary)'; // Indigo
      case 'DELIVERED': return 'var(--color-success)'; // Emerald
      case 'CANCELLED': return '#FF4B4B'; // Red
      default: return 'var(--color-text-muted)';
    }
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>My Orders</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {!checkoutEmail && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
            No orders found. Place an order to see it here!
          </div>
        )}
        
        {isLoading && checkoutEmail && (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#FF4B4B' }}>Failed to load orders.</div>
        )}

        {orders && orders.length === 0 && checkoutEmail && !isLoading && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
            No orders found. Place an order to see it here!
          </div>
        )}

        {orders?.map(order => (
          <Link to={`/track/${order.order_number}`} key={order.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: 'var(--border-radius-lg)', 
            padding: '16px', 
            boxShadow: 'var(--shadow-soft)',
            display: 'block'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #EAEAEA' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{order.order_number}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
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
                  {order.items && order.items[0] && order.items[0].product && order.items[0].product.images && (
                    <img src={order.items[0].product.images[0]} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ fontWeight: '700' }}>₹{order.total.toFixed(2)}</div>
              </div>
              <ChevronRight size={20} color="var(--color-text-muted)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
