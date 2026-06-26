import React from 'react'
import { TrendingUp, Package, Users, DollarSign, Plus, Settings, AlertTriangle, ScanLine } from 'lucide-react'

export default function AdminDashboardScreen() {
  const recentOrders = [
    { id: '#LX-8472910', customer: 'E. Shellstrop', amount: 636.12, status: 'Processing' },
    { id: '#LX-7391822', customer: 'C. Anagonye', amount: 299.00, status: 'Shipped' },
    { id: '#LX-6182933', customer: 'T. Al-Jamil', amount: 899.00, status: 'Delivered' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return '#FFC107'; // Amber
      case 'Shipped': return 'var(--color-primary)'; // Indigo
      case 'Delivered': return 'var(--color-success)'; // Emerald
      default: return 'var(--color-text-muted)';
    }
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px', paddingBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Dashboard</h1>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Sales Overview */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '24px', borderRadius: 'var(--border-radius-lg)', marginBottom: '24px', boxShadow: 'var(--shadow-soft)' }}>
        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Total Sales (This Month)</div>
        <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>₹10,333,500.00</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: 'var(--border-radius-pill)', fontSize: '13px', fontWeight: '600' }}>
          <TrendingUp size={16} /> +14.5% vs last month
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
          <Package size={24} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>842</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Active Orders</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
          <Users size={24} color="var(--color-success)" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>12.5k</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Customers</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
          <DollarSign size={24} color="#FFC107" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>₹34.8Cr</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Revenue YTD</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
          <Settings size={24} color="#FF4B4B" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>1,204</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Products</div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Quick Actions</h2>
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', margin: '0 -24px', padding: '0 24px 16px 24px', scrollbarWidth: 'none' }}>
        <button style={{ minWidth: '120px', padding: '16px', backgroundColor: 'white', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>Add Product</span>
        </button>
        <button style={{ minWidth: '120px', padding: '16px', backgroundColor: 'white', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>Inventory</span>
        </button>
        <button style={{ minWidth: '120px', padding: '16px', backgroundColor: 'white', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>Customers</span>
        </button>
      </div>

      {/* Inventory Alerts */}
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Inventory Alerts</h2>
      <div style={{ backgroundColor: '#FFF5F5', padding: '16px', borderRadius: 'var(--border-radius-lg)', border: '1px solid #FFE0E0', display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '24px' }}>
        <AlertTriangle size={24} color="#FF4B4B" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#CC0000', marginBottom: '4px' }}>Low Stock: Luxury Wallet</h3>
          <p style={{ fontSize: '13px', color: '#CC0000', marginBottom: '12px' }}>Only 4 units remaining in warehouse.</p>
          <button style={{ backgroundColor: 'white', color: '#CC0000', padding: '6px 12px', borderRadius: 'var(--border-radius-pill)', fontSize: '12px', fontWeight: '700', border: '1px solid #FFE0E0' }}>Restock Now</button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Recent Orders</h2>
        <button style={{ color: 'var(--color-primary)', fontSize: '14px', fontWeight: '600' }}>View All</button>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
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
                  <div style={{ fontWeight: '600' }}>{order.id}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '4px' }}>{order.customer}</div>
                </td>
                <td style={{ padding: '16px', fontWeight: '600' }}>₹{order.amount.toFixed(2)}</td>
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
