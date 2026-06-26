import React from 'react'

export default function PlaceholderScreen({ name }) {
  return (
    <div className="animate-fade-in" style={{ padding: '40px 0', textAlign: 'center' }}>
      <h2>{name}</h2>
      <p style={{ color: 'var(--color-text-muted)', marginTop: '12px' }}>Work in progress.</p>
    </div>
  )
}
