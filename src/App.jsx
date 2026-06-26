import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import useStore from './store/useStore'
import { Menu, Bell, ShoppingBag, Home, Grid, ShoppingCart, Clock, User } from 'lucide-react'
import HomeScreen from './screens/HomeScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import CartScreen from './screens/CartScreen'
import OrdersScreen from './screens/OrdersScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProductDetailScreen from './screens/ProductDetailScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import OrderSuccessScreen from './screens/OrderSuccessScreen'
import OrderTrackingScreen from './screens/OrderTrackingScreen'
import AdminDashboardScreen from './screens/AdminDashboardScreen'
import AddressesScreen from './screens/AddressesScreen'
import PaymentMethodsScreen from './screens/PaymentMethodsScreen'
import SupportScreen from './screens/SupportScreen'
import AboutScreen from './screens/AboutScreen'
import SettingsScreen from './screens/SettingsScreen'
import WishlistScreen from './screens/WishlistScreen'

function TopAppBar() {
  const location = useLocation();
  const cart = useStore((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Hide top app bar on admin dashboard
  if (location.pathname === '/admin') return null;

  return (
    <header className="top-app-bar">
      <div className="logo">LUXE</div>
      <div className="actions">
        <button className="icon-btn">
          <Bell size={24} />
        </button>
        <Link to="/cart" className="icon-btn" style={{ position: 'relative' }}>
          <ShoppingBag size={24} />
          {cartItemCount > 0 && (
            <span className="badge" style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px' }}>
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}

function BottomNav() {
  const location = useLocation();
  const path = location.pathname;
  
  // Hide bottom nav on some screens
  if (path === '/admin' || path === '/order-success' || path.startsWith('/track')) return null;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${path === '/' ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      <Link to="/categories" className={`nav-item ${path === '/categories' ? 'active' : ''}`}>
        <Grid size={24} />
        <span>Categories</span>
      </Link>
      <Link to="/cart" className={`nav-item ${path === '/cart' ? 'active' : ''}`}>
        <ShoppingCart size={24} />
        <span>Cart</span>
      </Link>
      <Link to="/orders" className={`nav-item ${path === '/orders' ? 'active' : ''}`}>
        <Clock size={24} />
        <span>Orders</span>
      </Link>
      <Link to="/profile" className={`nav-item ${path === '/profile' ? 'active' : ''}`}>
        <User size={24} />
        <span>Profile</span>
      </Link>
    </nav>
  )
}

function App() {
  const { darkMode, biometricsEnabled } = useStore();
  const [isUnlocked, setIsUnlocked] = useState(!biometricsEnabled);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    if (biometricsEnabled) {
      setIsUnlocked(false);
    } else {
      setIsUnlocked(true);
    }
  }, [biometricsEnabled]);

  if (!isUnlocked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: 'var(--shadow-soft)' }}>
          <span style={{ fontSize: '40px' }}>👤</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>LUXE Locked</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>Use Face ID or Biometrics to unlock</p>
        <button 
          onClick={() => setIsUnlocked(true)}
          style={{ padding: '16px 32px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--border-radius-pill)', fontWeight: '600' }}>
          Simulate Face ID
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <TopAppBar />
        <main className="screen-content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/categories" element={<CategoriesScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/order-success" element={<OrderSuccessScreen />} />
            <Route path="/track/:id" element={<OrderTrackingScreen />} />
            <Route path="/admin" element={<AdminDashboardScreen />} />
            <Route path="/addresses" element={<AddressesScreen />} />
            <Route path="/payment" element={<PaymentMethodsScreen />} />
            <Route path="/support" element={<SupportScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/wishlist" element={<WishlistScreen />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
