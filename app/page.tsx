"use client";
import React, { useState } from 'react';

export default function GreedMeter() {
  const [value, setValue] = useState(50);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0f172a', 
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        The Greed Meter
      </h1>
      
      <div style={{ 
        width: '300px', 
        height: '300px', 
        borderRadius: '50%', 
        border: '10px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        fontWeight: 'bold',
        position: 'relative',
        background: conic-gradient(#ef4444 ${value}%, #22c55e ${value}% 100%)
      }}>
        <div style={{ 
          position: 'absolute', 
          width: '260px', 
          height: '260px', 
          backgroundColor: '#0f172a', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {value}%
        </div>
      </div>

      <div style={{ marginTop: '2rem', width: '100%', maxWidth: '400px' }}>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => setValue(parseInt(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '1rem' }}>
          Real-time Market Sentiment Analysis
        </p>
      </div>

      <div style={{ marginTop: '3rem', padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
        <h3>Espace AdSense</h3>
        <p style={{ color: '#64748b' }}>La publicité s'affichera ici.</p>
      </div>
    </div>
  );
}
