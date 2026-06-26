import React from 'react'
import { Settings, Heart, MapPin, CreditCard, HelpCircle, Info, LayoutDashboard, ChevronRight, LogOut, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProfileScreen() {
  const menuItems = [
    { title: 'My Orders', subtitle: 'Check your order status', icon: <Package size={20} />, link: '/orders' },
    { title: 'Wishlist', subtitle: 'Your saved items', icon: <Heart size={20} />, link: '/wishlist' },
    { title: 'Delivery Addresses', subtitle: 'Manage your saved addresses', icon: <MapPin size={20} />, link: '/addresses' },
    { title: 'Payment Methods', subtitle: 'Manage your payment options', icon: <CreditCard size={20} />, link: '/payment' },
  ];

  const supportItems = [
    { title: 'Help & Support', subtitle: 'FAQs and customer support', icon: <HelpCircle size={20} />, link: '/support' },
    { title: 'About LUXE', subtitle: 'App version, Legal & Privacy', icon: <Info size={20} />, link: '/about' },
    { title: 'Settings', subtitle: 'App preferences and notifications', icon: <Settings size={20} />, link: '/settings' },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingTop: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Profile</h1>

      {/* Guest Card */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)' }}>👤</div>
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Welcome to LUXE</h2>
          <button style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '8px 16px', borderRadius: 'var(--border-radius-pill)', fontSize: '14px', fontWeight: '600' }}>
            Sign In / Register
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '8px' }}>Account</h3>
      <div style={{ backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', marginBottom: '24px', overflow: 'hidden' }}>
        {menuItems.map((item, idx) => (
          <Link to={item.link} key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: idx < menuItems.length - 1 ? '1px solid #EAEAEA' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ color: 'var(--color-primary)' }}>{item.icon}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '500' }}>{item.title}</span>
                {item.subtitle && <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{item.subtitle}</span>}
              </div>
            </div>
            <ChevronRight size={20} color="var(--color-text-muted)" />
          </Link>
        ))}
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '8px' }}>Support & Settings</h3>
      <div style={{ backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', marginBottom: '24px', overflow: 'hidden' }}>
        {supportItems.map((item, idx) => (
          <Link to={item.link} key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: idx < supportItems.length - 1 ? '1px solid #EAEAEA' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ color: 'var(--color-text-muted)' }}>{item.icon}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '500' }}>{item.title}</span>
                {item.subtitle && <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{item.subtitle}</span>}
              </div>
            </div>
            <ChevronRight size={20} color="var(--color-text-muted)" />
          </Link>
        ))}
      </div>



    </div>
  )
}
