import React, { useEffect, useState } from 'react'
import { CheckCircle, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OrderSuccessScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="animate-fade-in" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px'
    }}>
      <div style={{
        transform: show ? 'scale(1)' : 'scale(0.5)',
        opacity: show ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        marginBottom: '32px'
      }}>
        <CheckCircle size={100} color="var(--color-success)" />
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>Order Confirmed!</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
        Thank you for your purchase. Your premium items are being prepared for dispatch.
      </p>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', width: '100%', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #EAEAEA' }}>
          <Package size={24} color="var(--color-primary)" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Order Number</div>
            <div style={{ fontWeight: '600' }}>#LX-8472910</div>
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Estimated Delivery</div>
          <div style={{ fontWeight: '600' }}>Thu, 26 June 2026</div>
        </div>
      </div>

      <Link to="/" className="btn-primary" style={{ marginBottom: '16px' }}>
        Continue Shopping
      </Link>
      
      <Link to="/orders" style={{ color: 'var(--color-text-muted)', fontWeight: '600', padding: '12px' }}>
        View Order Status
      </Link>
    </div>
  )
}
