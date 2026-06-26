import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WishlistScreen() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #EAEAEA' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', marginLeft: '-8px' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Wishlist</h1>
      </div>

      <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <Heart size={48} color="#ccc" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '8px' }}>Your Wishlist is Empty</h2>
        <p style={{ fontSize: '14px' }}>Save items you love to easily find them later.</p>
        <button 
          onClick={() => navigate('/categories')}
          style={{ marginTop: '24px', padding: '12px 24px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--border-radius-pill)', fontWeight: '600' }}
        >
          Explore Products
        </button>
      </div>
    </div>
  );
}
