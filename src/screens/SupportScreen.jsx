import React from 'react';
import { ChevronLeft, Mail, MessageCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SupportScreen() {
  const navigate = useNavigate();

  const faqs = [
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery.' },
    { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all items in original condition.' },
    { q: 'How can I track my order?', a: 'Once your order ships, you will receive a tracking link via email and in the Orders section of the app.' },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #EAEAEA' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px', marginLeft: '-8px' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Help & Support</h1>
      </div>

      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Contact Us</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '10px', borderRadius: '50%', color: 'var(--color-primary)' }}>
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Live Chat</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Typically replies in minutes</p>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '10px', borderRadius: '50%', color: 'var(--color-primary)' }}>
              <Phone size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Phone Support</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>1-800-LUXE-VIP</p>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '10px', borderRadius: '50%', color: 'var(--color-primary)' }}>
              <Mail size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Email Us</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>support@luxestore.com</p>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ backgroundColor: 'white', padding: '16px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{faq.q}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
