import React, { useState } from 'react'
import { Minus, Plus, Trash2, Tag, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

export default function CartScreen() {
  const navigate = useNavigate();
  const { cart: items, updateQuantity, removeFromCart, clearCart } = useStore();

  const handleUpdateQuantity = (id, color, size, delta, currentQuantity) => {
    updateQuantity(id, color, size, currentQuantity + delta);
  }

  const removeItem = (id, color, size) => {
    removeFromCart(id, color, size);
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Shopping Cart</h1>
        {items.length > 0 && (
          <button onClick={clearCart} style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: '500', textDecoration: 'underline' }}>
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
          <p>Your cart is empty.</p>
          <Link to="/categories" style={{ color: 'var(--color-primary)', fontWeight: '600', marginTop: '16px', display: 'inline-block' }}>Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '16px', backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', backgroundColor: '#F5F5F5', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.3', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</h3>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{item.color} | {item.size || 'OS'}</p>
                    </div>
                    <button onClick={() => removeItem(item.id, item.color, item.size)} style={{ color: '#FF4B4B', padding: '4px' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: '700', fontSize: '16px' }}>₹{item.price}</div>
                    
                    {/* Quantity Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-background)', padding: '4px 8px', borderRadius: 'var(--border-radius-pill)' }}>
                      <button onClick={() => handleUpdateQuantity(item.id, item.color, item.size, -1, item.quantity)} style={{ padding: '2px', color: 'var(--color-text-muted)' }}><Minus size={14} /></button>
                      <span style={{ fontSize: '14px', fontWeight: '600', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.color, item.size, 1, item.quantity)} style={{ padding: '2px', color: 'var(--color-text)' }}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'white', padding: '0 16px', borderRadius: 'var(--border-radius-pill)', boxShadow: 'var(--shadow-soft)' }}>
              <Tag size={18} color="var(--color-text-muted)" />
              <input type="text" placeholder="Promo Code" style={{ border: 'none', outline: 'none', padding: '16px 0', width: '100%', fontSize: '14px' }} />
            </div>
            <button style={{ backgroundColor: 'var(--color-text)', color: 'white', padding: '0 24px', borderRadius: 'var(--border-radius-pill)', fontWeight: '600', fontSize: '14px' }}>
              Apply
            </button>
          </div>

          {/* Order Summary */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>₹{shipping.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
              <span>Tax (8%)</span>
              <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>₹{tax.toFixed(2)}</span>
            </div>
            
            <div style={{ borderTop: '1px dashed #EAEAEA', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', fontSize: '16px' }}>Total</span>
              <span style={{ fontWeight: '800', fontSize: '20px', color: 'var(--color-primary)' }}>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="btn-primary" 
            style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', padding: '18px 24px' }}
          >
            <span>Proceed to Checkout</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>₹{total.toFixed(2)} <ChevronRight size={18} /></span>
          </button>
        </>
      )}
    </div>
  )
}
