import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, User, ShieldCheck, Phone } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentRoute, navigate } = useApp();

  return (
    <div style={{
      backgroundColor: '#171513',
      color: '#E6E0D6',
      fontSize: '0.78rem',
      padding: '7px 16px',
      borderBottom: '1px solid #2B2723',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ 
          display: 'inline-block', 
          width: '7px', 
          height: '7px', 
          borderRadius: '50%', 
          backgroundColor: '#25D366' 
        }} />
        <span><strong>Jaipur Hub:</strong> Mansarovar & Core Jaipur</span>
        <span style={{ color: '#77716A' }}>|</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Phone size={12} color="#E9C66D" />
          <a href="https://wa.me/916377100943" target="_blank" rel="noreferrer" style={{ color: '#E9C66D', textDecoration: 'underline' }}>
            +91 6377100943
          </a>
        </span>
        <span style={{ color: '#77716A' }}>|</span>
        <span style={{ color: '#A39B92' }}>Demo Mode Active (All prices & data fully interactive)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {currentRoute.startsWith('/admin') ? (
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: '1px solid #443F37',
              color: '#FFF8E9',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            ← View Public Site
          </button>
        ) : (
          <button 
            onClick={() => navigate('/admin')}
            style={{
              background: '#2B2723',
              border: '1px solid #443F37',
              color: '#E9C66D',
              padding: '2px 10px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ShieldCheck size={12} />
            Admin Panel
          </button>
        )}

        {currentRoute.startsWith('/account') ? (
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: '1px solid #443F37',
              color: '#FFF8E9',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Public Site
          </button>
        ) : (
          <button 
            onClick={() => navigate('/account')}
            style={{
              background: '#2B2723',
              border: '1px solid #443F37',
              color: '#FFF8E9',
              padding: '2px 10px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <User size={12} />
            Customer Dashboard
          </button>
        )}
      </div>
    </div>
  );
};
