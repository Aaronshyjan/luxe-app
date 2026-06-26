import React from 'react'
import { ChevronLeft, MapPin, Package, CheckCircle, Truck, Copy, MessageCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export default function OrderTrackingScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const stages = [
    { title: 'Order Placed', date: 'June 22, 10:30 AM', completed: true, icon: <CheckCircle size={20} /> },
    { title: 'Processing', date: 'June 22, 2:15 PM', completed: true, icon: <Package size={20} /> },
    { title: 'Shipped', date: 'June 23, 9:00 AM', completed: false, icon: <Truck size={20} /> },
    { title: 'Delivered', date: 'Expected June 26', completed: false, icon: <MapPin size={20} /> }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', backgroundColor: 'white', borderRadius: '50%', boxShadow: 'var(--shadow-soft)' }}>
          <ChevronLeft size={20} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>Track Order</h1>
      </div>

      {/* Delivery Summary */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '24px', borderRadius: 'var(--border-radius-lg)', marginBottom: '24px', boxShadow: 'var(--shadow-soft)' }}>
        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '4px' }}>Estimated Delivery</div>
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Thu, 26 June</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: 'var(--border-radius-md)' }}>
          <Truck size={20} />
          <div style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>In transit to destination</div>
        </div>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Order Status</h2>

      {/* Vertical Timeline */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', marginBottom: '24px' }}>
        {stages.map((stage, index) => (
          <div key={index} style={{ display: 'flex', gap: '16px', position: 'relative', paddingBottom: index === stages.length - 1 ? '0' : '32px' }}>
            {/* Line connecting nodes */}
            {index < stages.length - 1 && (
              <div style={{ 
                position: 'absolute', 
                left: '11px', 
                top: '24px', 
                bottom: '0', 
                width: '2px', 
                backgroundColor: stage.completed ? 'var(--color-primary)' : '#EAEAEA',
                zIndex: 1
              }} />
            )}
            
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: stage.completed ? 'var(--color-primary)' : 'white',
              border: stage.completed ? 'none' : '2px solid #EAEAEA',
              color: stage.completed ? 'white' : '#EAEAEA',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              zIndex: 2,
              marginTop: '2px'
            }}>
              {stage.completed ? <CheckCircle size={14} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EAEAEA' }} />}
            </div>
            
            <div>
              <div style={{ fontWeight: stage.completed ? '700' : '500', color: stage.completed ? 'var(--color-text)' : 'var(--color-text-muted)' }}>{stage.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{stage.date}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Shipment Details</h2>
      <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Premium Noise-Cancelling Headphones</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Qty: 1 • Matte Black</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{ flex: 1, padding: '16px', backgroundColor: 'white', border: '1px solid #EAEAEA', borderRadius: 'var(--border-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
          <Copy size={18} /> Tracking ID
        </button>
        <button style={{ flex: 1, padding: '16px', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', border: 'none', borderRadius: 'var(--border-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
          <MessageCircle size={18} /> Support
        </button>
      </div>

    </div>
  )
}
