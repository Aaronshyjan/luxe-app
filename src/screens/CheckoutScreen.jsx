import React, { useState } from 'react'
import { MapPin, ChevronRight, CreditCard, Banknote, ShieldCheck } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import useStore from '../store/useStore'

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart, addOrder } = useStore();
  const buyNowItem = location.state?.buyNowItem;
  const itemsToCheckout = buyNowItem ? [buyNowItem] : cart;
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    name: 'Aditya Sharma',
    line1: '42 Residency Road, Apartment 3B',
    line2: 'Bangalore, Karnataka 560025',
    phone: '+91 98765 43210'
  });

  const subtotal = itemsToCheckout.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = itemsToCheckout.length > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (itemsToCheckout.length === 0) return;

    const newOrder = {
      id: `#LX-${Math.floor(1000000 + Math.random() * 9000000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      amount: total,
      image: itemsToCheckout[0]?.image, // Use the first item's image as the order image thumbnail
      items: itemsToCheckout.length
    };

    addOrder(newOrder);
    
    // Only clear the cart if we were checking out the actual cart
    if (!buyNowItem) {
      clearCart();
    }
    
    navigate('/order-success');
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px', paddingBottom: '100px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Checkout</h1>

      {/* Delivery Address */}
      <section style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Delivery Address</h2>
          <button 
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            style={{ color: 'var(--color-primary)', fontSize: '14px', fontWeight: '500' }}>
            {isEditingAddress ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        {isEditingAddress ? (
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="text" 
              value={address.name} 
              onChange={(e) => setAddress({...address, name: e.target.value})}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #EAEAEA', fontSize: '14px', outline: 'none' }}
              placeholder="Full Name"
            />
            <input 
              type="text" 
              value={address.line1} 
              onChange={(e) => setAddress({...address, line1: e.target.value})}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #EAEAEA', fontSize: '14px', outline: 'none' }}
              placeholder="Address Line 1"
            />
            <input 
              type="text" 
              value={address.line2} 
              onChange={(e) => setAddress({...address, line2: e.target.value})}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #EAEAEA', fontSize: '14px', outline: 'none' }}
              placeholder="City, State, PIN"
            />
            <input 
              type="text" 
              value={address.phone} 
              onChange={(e) => setAddress({...address, phone: e.target.value})}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #EAEAEA', fontSize: '14px', outline: 'none' }}
              placeholder="Phone Number"
            />
            <button 
              onClick={() => setIsEditingAddress(false)}
              style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '12px', borderRadius: 'var(--border-radius-pill)', fontWeight: '600', marginTop: '8px' }}>
              Save Address
            </button>
          </div>
        ) : (
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '10px', borderRadius: '50%', color: 'var(--color-primary)' }}>
              <MapPin size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{address.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '4px' }}>
                {address.line1}<br/>
                {address.line2}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: '500' }}>{address.phone}</p>
            </div>
          </div>
        )}
      </section>

      {/* Payment Methods */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Payment Method</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Credit Card */}
          <div 
            onClick={() => setPaymentMethod('card')}
            style={{ 
              backgroundColor: 'white', 
              padding: '16px', 
              borderRadius: 'var(--border-radius-lg)', 
              boxShadow: 'var(--shadow-soft)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              border: paymentMethod === 'card' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            <div style={{ 
              width: '20px', height: '20px', borderRadius: '50%', 
              border: paymentMethod === 'card' ? '6px solid var(--color-primary)' : '2px solid #EAEAEA',
              transition: 'all 0.2s'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <CreditCard size={20} color={paymentMethod === 'card' ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
              <span style={{ fontWeight: '500' }}>Credit / Debit Card</span>
            </div>
          </div>

          {/* UPI */}
          <div 
            onClick={() => setPaymentMethod('upi')}
            style={{ 
              backgroundColor: 'white', 
              padding: '16px', 
              borderRadius: 'var(--border-radius-lg)', 
              boxShadow: 'var(--shadow-soft)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              border: paymentMethod === 'upi' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            <div style={{ 
              width: '20px', height: '20px', borderRadius: '50%', 
              border: paymentMethod === 'upi' ? '6px solid var(--color-primary)' : '2px solid #EAEAEA',
              transition: 'all 0.2s'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ fontWeight: '700', color: paymentMethod === 'upi' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontSize: '16px', fontStyle: 'italic' }}>UPI</div>
              <span style={{ fontWeight: '500' }}>Google Pay / Apple Pay</span>
            </div>
          </div>

          {/* COD */}
          <div 
            onClick={() => setPaymentMethod('cod')}
            style={{ 
              backgroundColor: 'white', 
              padding: '16px', 
              borderRadius: 'var(--border-radius-lg)', 
              boxShadow: 'var(--shadow-soft)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              border: paymentMethod === 'cod' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            <div style={{ 
              width: '20px', height: '20px', borderRadius: '50%', 
              border: paymentMethod === 'cod' ? '6px solid var(--color-primary)' : '2px solid #EAEAEA',
              transition: 'all 0.2s'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <Banknote size={20} color={paymentMethod === 'cod' ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
              <span style={{ fontWeight: '500' }}>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Trust Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-success)', marginTop: '32px', marginBottom: '16px' }}>
        <ShieldCheck size={20} />
        <span style={{ fontSize: '13px', fontWeight: '500' }}>Secure Checkout - 256-bit Encryption</span>
      </div>

      {/* Sticky Bottom Actions */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        padding: '16px 24px', 
        backgroundColor: 'white', 
        borderTop: '1px solid #EAEAEA',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '700' }}>Total</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-primary)' }}>₹{total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handlePlaceOrder}
            style={{ 
              width: '100%',
              padding: '16px', 
              borderRadius: 'var(--border-radius-pill)', 
              backgroundColor: 'var(--color-primary)', 
              color: 'white', 
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}
