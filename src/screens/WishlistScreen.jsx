import React from 'react';
import { ChevronLeft, Heart, Loader, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import useStore from '../store/useStore';

export default function WishlistScreen() {
  const navigate = useNavigate();
  const { guestId } = useStore();
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading, error } = useQuery({
    queryKey: ['wishlist', guestId],
    queryFn: async () => {
      const res = await apiClient.get(`/wishlist/${guestId}`);
      return res.data.data;
    }
  });

  const removeMutation = useMutation({
    mutationFn: async (productId) => {
      await apiClient.post('/wishlist/remove', { guestId, productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist', guestId]);
    }
  });

  const items = wishlist?.items || [];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #EAEAEA' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', marginLeft: '-8px' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Wishlist</h1>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Loader className="animate-spin" size={32} color="var(--color-primary)" />
        </div>
      ) : error ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Failed to load wishlist.</div>
      ) : items.length === 0 ? (
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
      ) : (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map(item => {
            const p = item.product;
            return (
              <div key={item.id} style={{ display: 'flex', gap: '16px', backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
                <Link to={`/product/${p.id}`} style={{ width: '80px', height: '80px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                  <img src={p.images?.[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Link to={`/product/${p.id}`} style={{ fontWeight: '600', marginBottom: '4px', textDecoration: 'none', color: 'inherit' }}>{p.name}</Link>
                  <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>₹{p.price}</div>
                </div>
                <button 
                  onClick={() => removeMutation.mutate(p.id)}
                  disabled={removeMutation.isPending}
                  style={{ alignSelf: 'center', padding: '12px', color: '#FF4B4B', backgroundColor: '#FFF5F5', borderRadius: '50%', border: 'none' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
