import React, { useState } from 'react'
import { Search, Filter, ArrowUpDown, Heart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/client'

export default function CategoriesScreen() {
  const categories = ['All', 'Audio', 'Watches', 'Accessories', 'Tech', 'Fashion', 'Home'];
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await apiClient.get('/products');
      return res.data.data;
    }
  });

  const products = data?.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.discount_price,
    image: p.images?.[0] || 'https://via.placeholder.com/150',
    discount: p.discount_price ? 'Sale' : null,
    category: p.category?.name || 'All'
  })) || [];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Categories</h1>
      
      {/* Search Bar */}
      <div className="search-bar" style={{ marginBottom: '16px' }}>
        <Search size={20} color="var(--color-text-muted)" />
        <input type="text" placeholder="Search premium products..." />
      </div>

      {/* Filter & Sort Actions */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px', 
          padding: '12px', 
          backgroundColor: 'white', 
          borderRadius: 'var(--border-radius-md)', 
          border: '1px solid #EAEAEA',
          fontWeight: '500'
        }}>
          <Filter size={18} /> Filters
        </button>
        <button style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px', 
          padding: '12px', 
          backgroundColor: 'white', 
          borderRadius: 'var(--border-radius-md)', 
          border: '1px solid #EAEAEA',
          fontWeight: '500'
        }}>
          <ArrowUpDown size={18} /> Sort By
        </button>
      </div>

      {/* Categories Scroll */}
      <div className="categories-scroll" style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '16px',
        scrollbarWidth: 'none',
        margin: '0 -24px',
        padding: '0 24px 16px 24px'
      }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--border-radius-pill)',
              backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'white',
              color: activeCategory === cat ? 'white' : 'var(--color-text-muted)',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              boxShadow: activeCategory === cat ? 'var(--shadow-soft)' : 'none',
              border: activeCategory === cat ? 'none' : '1px solid #EAEAEA'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        {isLoading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <div style={{ width: '24px', height: '24px', border: '3px solid #EAEAEA', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px auto' }}></div>
            <div style={{ color: 'var(--color-text-muted)' }}>Loading products...</div>
          </div>
        ) : error ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#FF4B4B' }}>
            Failed to load products. Please ensure your backend is running.
          </div>
        ) : filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card" style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-soft)',
            position: 'relative',
            display: 'block'
          }}>
            {/* Discount Badge */}
            {product.discount && (
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontSize: '10px',
                fontWeight: '700',
                padding: '4px 8px',
                borderRadius: 'var(--border-radius-sm)',
                zIndex: 10
              }}>
                {product.discount}
              </div>
            )}
            
            {/* Wishlist Button */}
            <button style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(4px)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <Heart size={16} color="var(--color-text-muted)" />
            </button>

            {/* Product Image */}
            <div style={{ height: '160px', overflow: 'hidden' }}>
              <img 
                src={product.image} 
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Product Info */}
            <div style={{ padding: '12px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4', height: '36px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {product.name}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '16px' }}>₹{product.price}</div>
                  {product.originalPrice && (
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice}
                    </div>
                  )}
                </div>
                <button style={{
                  backgroundColor: 'var(--color-text)',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
          No products found in this category.
        </div>
      )}
    </div>
  )
}
