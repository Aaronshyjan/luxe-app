import React from 'react';
import { ChevronLeft, Info, Shield, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutScreen() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #EAEAEA' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', marginLeft: '-8px' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '700' }}>About LUXE</h1>
      </div>

      <div style={{ padding: '24px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800', margin: '0 auto 16px' }}>
          L
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>LUXE</h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>Version 1.0.0</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ color: 'var(--color-primary)' }}><FileText size={20} /></div>
            <div style={{ flex: 1, fontSize: '15px', fontWeight: '500' }}>Terms of Service</div>
            <ChevronLeft size={20} style={{ transform: 'rotate(180deg)', color: 'var(--color-text-muted)' }} />
          </div>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ color: 'var(--color-primary)' }}><Shield size={20} /></div>
            <div style={{ flex: 1, fontSize: '15px', fontWeight: '500' }}>Privacy Policy</div>
            <ChevronLeft size={20} style={{ transform: 'rotate(180deg)', color: 'var(--color-text-muted)' }} />
          </div>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ color: 'var(--color-primary)' }}><Info size={20} /></div>
            <div style={{ flex: 1, fontSize: '15px', fontWeight: '500' }}>Open Source Licenses</div>
            <ChevronLeft size={20} style={{ transform: 'rotate(180deg)', color: 'var(--color-text-muted)' }} />
          </div>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '40px' }}>
          © 2026 LUXE Technologies Inc.<br/>All rights reserved.
        </p>
      </div>
    </div>
  );
}
