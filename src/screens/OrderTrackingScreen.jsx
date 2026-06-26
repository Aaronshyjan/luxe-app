import React from 'react'
import { ChevronLeft, MapPin, Package, CheckCircle, Truck, Copy, MessageCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/client'

export default function OrderTrackingScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const res = await apiClient.get(`/orders/${id}`);
      return res.data.data;
    }
  });

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading order details...</div>;
  if (error || !order) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Order not found.</div>;

  const orderTime = new Date(order.createdAt).getTime();
  const processTime = orderTime + (2 * 60 * 60 * 1000); // +2 hours
  const shipTime = orderTime + (24 * 60 * 60 * 1000); // +1 day
  const deliverTime = orderTime + (4 * 24 * 60 * 60 * 1000); // +4 days

  const formatDate = (ts) => {
    return new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };
  
  const formatExpected = (ts) => {
    return new Date(ts).toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: 'long' });
  };

  const status = order.status?.toUpperCase();
  const isShipped = status === 'SHIPPED' || status === 'DELIVERED';
  const isDelivered = status === 'DELIVERED';
  const isCancelled = status === 'CANCELLED';

  const stages = [
    { title: 'Order Placed', date: formatDate(orderTime), completed: true, icon: <CheckCircle size={20} /> },
    { title: 'Processing', date: formatDate(processTime), completed: status !== 'PROCESSING', icon: <Package size={20} /> },
    { title: 'Shipped', date: isShipped ? formatDate(shipTime) : `Expected ${formatDate(shipTime)}`, completed: isShipped, icon: <Truck size={20} /> },
    { title: 'Delivered', date: isDelivered ? formatDate(deliverTime) : `Expected ${formatExpected(deliverTime)}`, completed: isDelivered, icon: <MapPin size={20} /> }
  ];

  if (isCancelled) {
    stages.push({ title: 'Cancelled', date: formatDate(order.updatedAt), completed: true, icon: <CheckCircle size={20} color="red" /> });
  }

  const firstItem = order.items?.[0];
  const product = firstItem?.product;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', backgroundColor: 'white', borderRadius: '50%', boxShadow: 'var(--shadow-soft)' }}>
          <ChevronLeft size={20} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>Track Order</h1>
      </div>

      {/* Delivery Summary */}
      <div style={{ backgroundColor: isCancelled ? '#FF4B4B' : 'var(--color-primary)', color: 'white', padding: '24px', borderRadius: 'var(--border-radius-lg)', marginBottom: '24px', boxShadow: 'var(--shadow-soft)' }}>
        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '4px' }}>
          {isCancelled ? 'Status' : (isDelivered ? 'Delivered On' : 'Estimated Delivery')}
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
          {isCancelled ? 'Order Cancelled' : (isDelivered ? formatExpected(order.updatedAt) : formatExpected(deliverTime))}
        </div>
        
        {!isCancelled && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: 'var(--border-radius-md)' }}>
            <Truck size={20} />
            <div style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>
              {isDelivered ? 'Package has been delivered' : (isShipped ? 'In transit to destination' : 'Preparing for shipment')}
            </div>
          </div>
        )}
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
                backgroundColor: stage.completed ? (isCancelled && index === stages.length - 2 ? '#FF4B4B' : 'var(--color-primary)') : '#EAEAEA',
                zIndex: 1
              }} />
            )}
            
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: stage.completed ? (stage.title === 'Cancelled' ? '#FF4B4B' : 'var(--color-primary)') : 'white',
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
              <div style={{ fontWeight: stage.completed ? '700' : '500', color: stage.completed ? (stage.title === 'Cancelled' ? '#FF4B4B' : 'var(--color-text)') : 'var(--color-text-muted)' }}>{stage.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{stage.date}</div>
            </div>
          </div>
        ))}
      </div>

      {product && (
        <>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Shipment Details</h2>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              {product.images && product.images[0] && (
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{product.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Qty: {firstItem.quantity}</div>
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{ flex: 1, padding: '16px', backgroundColor: 'white', border: '1px solid #EAEAEA', borderRadius: 'var(--border-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
          <Copy size={18} /> {order.order_number}
        </button>
        <button style={{ flex: 1, padding: '16px', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', border: 'none', borderRadius: 'var(--border-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
          <MessageCircle size={18} /> Support
        </button>
      </div>

    </div>
  )
}
