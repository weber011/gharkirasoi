import React from 'react';
import { useApp } from '../context/AppContext';
import { User, ShieldCheck, Phone, MapPin } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentRoute, navigate } = useApp();

  return (
    <div style={{
      backgroundColor: '#171513',
      color: '#E6E0D6',
      fontSize: '0.75rem',
      padding: '6px 16px',
      borderBottom: '1px solid #2B2723',
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        paddingLeft: '8px',
        paddingRight: '8px'
      }}>
        {/* Left Info: Compact on mobile, full on desktop */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ 
            display: 'inline-block', 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            backgroundColor: '#25D366',
            flexShrink: 0
          }} />
          <span style={{ fontWeight: 600, color: '#FFF8E9' }}>Jaipur Hub: Mansarovar</span>
          <span style={{ color: '#554F47' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <Phone size={11} color="#E9C66D" />
            <a href="https://wa.me/916377100943" target="_blank" rel="noreferrer" style={{ color: '#E9C66D', fontWeight: 600 }}>
              6377100943
            </a>
          </span>
          <span className="desktop-banner-info" style={{ color: '#77716A' }}>|</span>
          <span className="desktop-banner-info" style={{ color: '#A39B92' }}>
            Demo Mode Active (Live pricing & interactive booking)
          </span>
        </div>

        {/* Right Quick Portals: Desktop only (accessible via mobile drawer on mobile) */}
        <div className="desktop-banner-actions" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        }}>
          {currentRoute.startsWith('/admin') ? (
            <button 
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: '1px solid #443F37',
                color: '#FFF8E9',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              ← Public Site
            </button>
          ) : (
            <button 
              onClick={() => navigate('/admin')}
              style={{
                background: '#2B2723',
                border: '1px solid #443F37',
                color: '#E9C66D',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ShieldCheck size={11} />
              Admin
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
                fontSize: '0.72rem',
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
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <User size={11} />
              Dashboard
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-banner-info,
          .desktop-banner-actions {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
