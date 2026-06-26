import React, { useState } from 'react';
import { ChevronLeft, Bell, Moon, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { 
    darkMode, setDarkMode, 
    biometricsEnabled, setBiometricsEnabled,
    notificationsEnabled, setNotificationsEnabled,
    promoEmails, setPromoEmails
  } = useStore();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #EAEAEA' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', marginLeft: '-8px' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Settings</h1>
      </div>

      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '8px' }}>Preferences</h2>
        
        <div style={{ backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', marginBottom: '32px', overflow: 'hidden' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #EAEAEA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ color: 'var(--color-primary)' }}><Bell size={20} /></div>
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Push Notifications</span>
            </div>
            <div 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              style={{ width: '44px', height: '24px', backgroundColor: notificationsEnabled ? 'var(--color-primary)' : '#EAEAEA', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: notificationsEnabled ? '22px' : '2px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #EAEAEA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ color: 'var(--color-primary)' }}><Moon size={20} /></div>
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Dark Mode</span>
            </div>
            <div 
              onClick={() => setDarkMode(!darkMode)}
              style={{ width: '44px', height: '24px', backgroundColor: darkMode ? 'var(--color-primary)' : '#EAEAEA', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: darkMode ? '22px' : '2px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ color: 'var(--color-primary)' }}><Globe size={20} /></div>
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Language</span>
            </div>
            <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>English (US)</span>
          </div>
        </div>

        <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '8px' }}>Privacy & Security</h2>
        
        <div style={{ backgroundColor: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)', marginBottom: '32px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #EAEAEA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ color: 'var(--color-primary)' }}><Shield size={20} /></div>
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Face ID / Biometrics</span>
            </div>
            <div 
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
              style={{ width: '44px', height: '24px', backgroundColor: biometricsEnabled ? 'var(--color-primary)' : '#EAEAEA', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: biometricsEnabled ? '22px' : '2px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Promotional Emails</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Receive offers and updates</span>
            </div>
            <div 
              onClick={() => setPromoEmails(!promoEmails)}
              style={{ width: '44px', height: '24px', backgroundColor: promoEmails ? 'var(--color-primary)' : '#EAEAEA', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: promoEmails ? '22px' : '2px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
