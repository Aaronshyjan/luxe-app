import React, { useState } from 'react'
import { ChevronLeft, Heart, Star, ChevronDown, Check, ShieldCheck, Zap, Headphones } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import apiClient from '../api/client'
import useStore from '../store/useStore'

export default function ProductDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [activeTab, setActiveTab] = useState(null);
  const [selectedColor, setSelectedColor] = useState('black');
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart, guestId } = useStore();

  const addWishlistMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post('/wishlist/add', { guestId, productId: id });
    },
    onSuccess: () => {
      alert('Added to wishlist!');
    }
  });

  const { data: rawProduct, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}`);
      return res.data.data;
    },
    enabled: !!id
  });

  const product = rawProduct ? {
    id: rawProduct.id,
    name: rawProduct.name,
    price: rawProduct.price,
    originalPrice: rawProduct.discount_price,
    image: rawProduct.images?.[0] || 'https://via.placeholder.com/150',
    brand: rawProduct.brand?.name || 'LUXE',
    description: rawProduct.description
  } : null;

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid #EAEAEA', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Product not found.</div>;
  }

  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80'
  ];

  const colors = [
    { id: 'black', value: '#1A1A1A' },
    { id: 'silver', value: '#E5E5E5' },
    { id: 'indigo', value: '#1F108E' }
  ];

  return (
    <div className="animate-fade-in" style={{ margin: '0 -24px' }}>
      {/* Custom Top Nav for Detail */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '16px 24px',
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 10
      }}>
        <button onClick={() => navigate(-1)} style={{ 
          width: '40px', height: '40px', 
          backgroundColor: 'white', 
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => addWishlistMutation.mutate()}
          disabled={addWishlistMutation.isPending}
          style={{ 
          width: '40px', height: '40px', 
          backgroundColor: 'white', 
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <Heart size={20} color={addWishlistMutation.isSuccess ? 'red' : 'black'} fill={addWishlistMutation.isSuccess ? 'red' : 'none'} />
        </button>
      </div>

      {/* Image Carousel */}
      <div style={{ position: 'relative', height: '350px', backgroundColor: '#F0F0F0' }}>
        <img src={productImages[currentImage]} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {productImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentImage(idx)}
              style={{
                width: currentImage === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentImage === idx ? 'var(--color-primary)' : 'rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '24px', backgroundColor: 'var(--color-background)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', marginTop: '-24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', maxWidth: '75%', lineHeight: '1.3' }}>{product.name}</h1>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)' }}>₹{product.price}</div>
            {product.originalPrice && (
              <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>₹{product.originalPrice}</div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', color: '#FFC107' }}>
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>4.9</span>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>(128 reviews)</span>
        </div>

        {/* Feature Cards Masonry */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', margin: '0 -24px', padding: '0 24px', scrollbarWidth: 'none' }}>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: 'var(--border-radius-lg)', minWidth: '120px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Zap size={24} color="var(--color-primary)" />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>60hr Battery</span>
          </div>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: 'var(--border-radius-lg)', minWidth: '120px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Headphones size={24} color="var(--color-primary)" />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Spatial Audio</span>
          </div>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: 'var(--border-radius-lg)', minWidth: '120px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ShieldCheck size={24} color="var(--color-primary)" />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>2 Yr Warranty</span>
          </div>
        </div>

        {/* Color Selection */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Color Selection</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            {colors.map(color => (
              <button 
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: color.value,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: selectedColor === color.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                  outline: selectedColor === color.id ? '2px solid white' : 'none',
                  outlineOffset: '-4px',
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                {selectedColor === color.id && <Check size={16} color={color.id === 'silver' ? '#000' : '#fff'} />}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div style={{ borderTop: '1px solid #EAEAEA' }}>
          <div 
            onClick={() => toggleTab('description')}
            style={{ padding: '16px 0', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontWeight: '600' }}>Product Description</span>
            <ChevronDown size={20} style={{ transform: activeTab === 'description' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </div>
          {activeTab === 'description' && (
            <div style={{ padding: '16px 0', color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '14px' }}>
              {product.description}
            </div>
          )}

          <div 
            onClick={() => toggleTab('specs')}
            style={{ padding: '16px 0', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontWeight: '600' }}>Specifications</span>
            <ChevronDown size={20} style={{ transform: activeTab === 'specs' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </div>
          {activeTab === 'specs' && (
            <div style={{ padding: '16px 0', color: 'var(--color-text-muted)', fontSize: '14px' }}>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>Bluetooth 5.2</li>
                <li>Weight: 250g</li>
                <li>USB-C Fast Charging</li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Padding for sticky bottom */}
        <div style={{ height: '80px' }}></div>
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
        gap: '12px',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', gap: '12px', width: '100%' }}>
          <button 
            onClick={() => {
              addToCart(product, 1, selectedColor, 'default');
              navigate('/cart');
            }}
            style={{ 
            flex: 1, 
            padding: '16px', 
            borderRadius: 'var(--border-radius-pill)', 
            border: '2px solid var(--color-primary)', 
            color: 'var(--color-primary)', 
            fontWeight: '600',
            backgroundColor: 'transparent'
          }}>
            Add To Cart
          </button>
          <button 
            onClick={() => {
              const buyNowItem = { ...product, quantity: 1, color: selectedColor, size: 'default' };
              navigate('/checkout', { state: { buyNowItem } });
            }}
            style={{ 
            flex: 1, 
            padding: '16px', 
            borderRadius: 'var(--border-radius-pill)', 
            backgroundColor: 'var(--color-primary)', 
            color: 'white', 
            fontWeight: '600'
          }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
