import React from 'react'
import { TrendingUp, Package, Users, DollarSign, Plus, Settings, AlertTriangle, ScanLine, Loader } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/client'

export default function AdminDashboardScreen() {
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      const res = await apiClient.get('/admin/dashboard');
      return res.data.data;
    }
  });

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING': return '#FFC107'; // Amber
      case 'PACKED': return '#2196F3';
      case 'SHIPPED': return 'var(--color-primary)'; // Indigo
      case 'DELIVERED': return 'var(--color-success)'; // Emerald
      case 'CANCELLED': return '#FF4B4B'; // Red
      default: return 'var(--color-text-muted)';
    }
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader className="animate-spin" size={32} color="var(--color-primary)" />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'red' }}>
        Failed to load dashboard data.
      </div>
    )
  }

  const { totalSales, activeOrders, customers, products, recentOrders } = analytics;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Dashboard</h1>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Sales Overview */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '24px', borderRadius: 'var(--border-radius-lg)', marginBottom: '24px', boxShadow: 'var(--shadow-soft)' }}>
        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Total Sales (All Time)</div>
        <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>₹{totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: 'var(--border-radius-pill)', fontSize: '13px', fontWeight: '600' }}>
          <TrendingUp size={16} /> Live Data
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
          <Package size={24} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{activeOrders}</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Active Orders</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
          <Users size={24} color="var(--color-success)" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{customers}</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Customers</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
          <Settings size={24} color="#FF4B4B" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{products}</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Products</div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Recent Orders</h2>
        <button style={{ color: 'var(--color-primary)', fontSize: '14px', fontWeight: '600' }}>View All</button>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
        {recentOrders.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No recent orders.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#F9F9F9', textAlign: 'left', color: 'var(--color-text-muted)' }}>
              <tr>
                <th style={{ padding: '16px', fontWeight: '500' }}>Order ID</th>
                <th style={{ padding: '16px', fontWeight: '500' }}>Amount</th>
                <th style={{ padding: '16px', fontWeight: '500' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} style={{ borderTop: '1px solid #EAEAEA' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '600' }}>{order.order_number}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '4px' }}>{order.customer_name}</div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '600' }}>₹{order.total.toFixed(2)}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      backgroundColor: `${getStatusColor(order.status)}15`, 
                      color: getStatusColor(order.status),
                      fontWeight: '600',
                      fontSize: '11px'
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Floating Barcode Scanner */}
      <button style={{
        position: 'fixed',
        bottom: '100px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(31, 16, 142, 0.4)',
        zIndex: 100
      }}>
        <ScanLine size={24} />
      </button>

    </div>
  )
}
