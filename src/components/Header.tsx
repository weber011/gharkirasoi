import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UtensilsCrossed, 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  MessageCircle, 
  User, 
  ChevronDown,
  ShieldCheck,
  Calendar,
  ChefHat,
  Phone
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigate } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && currentRoute === '/') return true;
    if (path !== '/' && currentRoute.startsWith(path)) return true;
    return false;
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E6E0D6',
      boxShadow: '0 1px 3px rgba(13, 12, 10, 0.04)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height)',
        paddingLeft: '14px',
        paddingRight: '14px'
      }}>
        {/* Brand Logo - Never squished */}
        <div 
          onClick={() => handleNav('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            backgroundColor: '#171513',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E9C66D',
            border: '1px solid #2B2723',
            flexShrink: 0
          }}>
            <UtensilsCrossed size={20} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.18rem',
              color: '#0D0C0A',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}>
              GHAR RASOI
            </div>
            <div style={{
              fontSize: '0.64rem',
              fontWeight: 700,
              color: '#C94B42',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              Chef on Call • Jaipur
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '22px'
        }} className="desktop-nav">
          <button 
            onClick={() => handleNav('/')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: isActive('/') ? 700 : 500,
              color: isActive('/') ? '#C94B42' : '#171513',
              cursor: 'pointer',
              padding: '6px 2px'
            }}
          >
            Home
          </button>

          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button 
              onClick={() => handleNav('/services')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.92rem',
                fontWeight: currentRoute.startsWith('/services') ? 700 : 500,
                color: currentRoute.startsWith('/services') ? '#C94B42' : '#171513',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 2px'
              }}
            >
              Services <ChevronDown size={14} />
            </button>

            {servicesDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '240px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D6',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-card)',
                padding: '8px 0',
                zIndex: 950
              }}>
                <div 
                  onClick={() => handleNav('/services/daily-cook')}
                  style={{
                    padding: '10px 16px',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    color: '#171513',
                    borderBottom: '1px solid #F5F1E9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF4E6')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <div style={{ fontWeight: 600 }}>Daily Cook (Trial Visit)</div>
                  <div style={{ fontSize: '0.76rem', color: '#77716A' }}>From ₹499 / visit</div>
                </div>
                <div 
                  onClick={() => handleNav('/services/monthly-cook')}
                  style={{
                    padding: '10px 16px',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    color: '#171513',
                    borderBottom: '1px solid #F5F1E9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF4E6')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <div style={{ fontWeight: 600 }}>Monthly Home Cook</div>
                  <div style={{ fontSize: '0.76rem', color: '#77716A' }}>26 days plans from ₹7,999</div>
                </div>
                <div 
                  onClick={() => handleNav('/services/party-chef')}
                  style={{
                    padding: '10px 16px',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    color: '#171513'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF4E6')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <div style={{ fontWeight: 600 }}>Party & Event Chef</div>
                  <div style={{ fontSize: '0.76rem', color: '#77716A' }}>10–25 guests @ ₹3,500</div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => handleNav('/pricing')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: isActive('/pricing') ? 700 : 500,
              color: isActive('/pricing') ? '#C94B42' : '#171513',
              cursor: 'pointer',
              padding: '6px 2px'
            }}
          >
            Pricing
          </button>

          <button 
            onClick={() => handleNav('/menu')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: isActive('/menu') ? 700 : 500,
              color: isActive('/menu') ? '#C94B42' : '#171513',
              cursor: 'pointer',
              padding: '6px 2px'
            }}
          >
            Menu Showcase
          </button>

          <button 
            onClick={() => handleNav('/chefs')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: isActive('/chefs') ? 700 : 500,
              color: isActive('/chefs') ? '#C94B42' : '#171513',
              cursor: 'pointer',
              padding: '6px 2px'
            }}
          >
            Our Chefs
          </button>

          <button 
            onClick={() => handleNav('/contact')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: isActive('/contact') ? 700 : 500,
              color: isActive('/contact') ? '#C94B42' : '#171513',
              cursor: 'pointer',
              padding: '6px 2px'
            }}
          >
            Contact
          </button>
        </nav>

        {/* Right Header Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        }}>
          {/* Jaipur indicator (Desktop only) */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#FAF4E6',
            border: '1px solid #E6E0D6',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#7A5B0B'
          }} className="desktop-indicator">
            <MapPin size={13} color="#C94B42" />
            <span>Mansarovar, Jaipur</span>
          </div>

          {/* WhatsApp Direct CTA (Desktop only) */}
          <a
            href="https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20am%20inquiring%20about%20booking%20a%20home%20cook%20in%20Jaipur."
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-whatsapp desktop-whatsapp"
            style={{
              display: 'none',
              padding: '8px 12px'
            }}
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>

          {/* Customer Account Button (Desktop only - mobile accesses in drawer) */}
          <button
            onClick={() => handleNav('/account')}
            className="desktop-account-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              backgroundColor: '#FAF4E6',
              border: '1px solid #E6E0D6',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#171513'
            }}
            title="Customer Dashboard"
          >
            <User size={18} />
          </button>

          {/* Primary CTA - Sleek & compact on mobile */}
          <button 
            onClick={() => handleNav('/book')}
            className="btn btn-sm btn-primary header-book-btn"
            style={{
              padding: '8px 14px',
              fontSize: '0.85rem'
            }}
          >
            Book a Chef
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: '#FAF4E6',
              border: '1px solid #E6E0D6',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#171513',
              flexShrink: 0
            }}
            className="mobile-hamburger"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation - Clean, solid, and spacious */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid #E6E0D6',
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 8px 24px rgba(13, 12, 10, 0.08)'
        }}>
          {/* Quick Account & Admin shortcuts at top of drawer */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            paddingBottom: '12px',
            borderBottom: '1px solid #F0ECE4'
          }}>
            <button
              onClick={() => handleNav('/account')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #E6E0D6',
                backgroundColor: '#FAF4E6',
                color: '#171513',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <User size={14} color="#C94B42" />
              <span>My Account</span>
            </button>

            <button
              onClick={() => handleNav('/admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #E6E0D6',
                backgroundColor: '#171513',
                color: '#E9C66D',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ShieldCheck size={14} color="#E9C66D" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => handleNav('/')}
              style={{
                textAlign: 'left',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.98rem',
                color: isActive('/') ? '#C94B42' : '#171513'
              }}
            >
              Home
            </button>

            {/* Services Group */}
            <div style={{
              backgroundColor: '#FAF4E6',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#77716A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Chef Services
              </span>
              <button onClick={() => handleNav('/services/daily-cook')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#171513', fontSize: '0.88rem', fontWeight: 500 }}>
                • Daily Cook (Trial from ₹499)
              </button>
              <button onClick={() => handleNav('/services/monthly-cook')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#171513', fontSize: '0.88rem', fontWeight: 500 }}>
                • Monthly Cook (26 Days from ₹7,999)
              </button>
              <button onClick={() => handleNav('/services/party-chef')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#171513', fontSize: '0.88rem', fontWeight: 500 }}>
                • One-Day Party Chef (₹3,500)
              </button>
            </div>

            <button 
              onClick={() => handleNav('/pricing')}
              style={{
                textAlign: 'left',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.98rem',
                color: isActive('/pricing') ? '#C94B42' : '#171513'
              }}
            >
              Pricing Rate Card
            </button>

            <button 
              onClick={() => handleNav('/menu')}
              style={{
                textAlign: 'left',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.98rem',
                color: isActive('/menu') ? '#C94B42' : '#171513'
              }}
            >
              Menu & Thalis
            </button>

            <button 
              onClick={() => handleNav('/chefs')}
              style={{
                textAlign: 'left',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.98rem',
                color: isActive('/chefs') ? '#C94B42' : '#171513'
              }}
            >
              Our Chefs
            </button>

            <button 
              onClick={() => handleNav('/faq')}
              style={{
                textAlign: 'left',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.98rem',
                color: isActive('/faq') ? '#C94B42' : '#171513'
              }}
            >
              FAQs & Guidance
            </button>

            <button 
              onClick={() => handleNav('/contact')}
              style={{
                textAlign: 'left',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.98rem',
                color: isActive('/contact') ? '#C94B42' : '#171513'
              }}
            >
              Contact Jaipur Hub
            </button>
          </div>

          {/* Action CTAs inside drawer */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: '10px',
            borderTop: '1px solid #F0ECE4'
          }}>
            <a
              href="https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20would%20like%20to%20inquire%20about%20a%20cook%20service%20in%20Jaipur."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '10px' }}
            >
              <MessageCircle size={16} />
              WhatsApp Us (+91 6377100943)
            </a>

            <button
              onClick={() => handleNav('/book')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px' }}
            >
              Book a Chef Now
            </button>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-indicator { display: flex !important; }
          .desktop-whatsapp { display: inline-flex !important; }
          .desktop-account-btn { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 480px) {
          .header-book-btn {
            padding: 7px 10px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </header>
  );
};
