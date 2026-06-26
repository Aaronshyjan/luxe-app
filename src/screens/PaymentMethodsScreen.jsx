import React, { useState } from 'react';
import { ChevronLeft, Plus, CreditCard, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodsScreen() {
  const navigate = useNavigate();
  const [methods, setMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/28',
      name: 'Aditya Sharma',
      isDefault: true,
    }
  ]);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #EAEAEA' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', marginLeft: '-8px' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Payment Methods</h1>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {methods.map(method => (
            <div key={method.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', position: 'relative' }}>
              {method.isDefault && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: 'var(--border-radius-sm)' }}>
                  DEFAULT
                </div>
              )}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--color-surface)', padding: '10px', borderRadius: '50%', color: 'var(--color-primary)' }}>
                  <CreditCard size={20} />
                </div>
                <div style={{ flex: 1, paddingRight: '60px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{method.brand} ending in {method.last4}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '4px' }}>
                    Expires {method.expiry}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{method.name}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #EAEAEA' }}>
                <button style={{ color: 'red', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button style={{ 
          marginTop: '24px',
          width: '100%',
          padding: '16px',
          border: '2px dashed #ccc',
          borderRadius: 'var(--border-radius-lg)',
          backgroundColor: 'transparent',
          color: 'var(--color-text)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Plus size={20} /> Add New Payment Method
        </button>
      </div>
    </div>
  );
}
