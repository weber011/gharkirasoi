import React from 'react';
import { useApp } from '../context/AppContext';
import { UtensilsCrossed, Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer style={{
      backgroundColor: '#0D0C0A',
      color: '#A39B92',
      borderTop: '2px solid #2B2723',
      paddingTop: '64px',
      paddingBottom: '32px',
      fontSize: '0.9rem'
    }}>
      <div className="container">
        {/* Top Tagline Grid */}
        <div style={{
          paddingBottom: '40px',
          borderBottom: '1px solid #221F1B',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#1E1B17',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E9C66D',
                border: '1px solid #332F2A'
              }}>
                <UtensilsCrossed size={18} />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#FFF8E9',
                letterSpacing: '-0.02em'
              }}>
                GHAR RASOI
              </span>
            </div>
            <p className="hindi-text" style={{
              fontSize: '1.1rem',
              color: '#E9C66D',
              fontWeight: 600,
              marginBottom: '4px'
            }}>
              घर जैसा स्वाद, हर थाली में प्यार।
            </p>
            <p style={{ color: '#E6E0D6', fontSize: '0.92rem', fontStyle: 'italic' }}>
              Good food. Your kitchen. Your way.
            </p>
          </div>

          <div style={{
            backgroundColor: '#171513',
            border: '1px solid #282420',
            borderRadius: '10px',
            padding: '18px 22px'
          }}>
            <div style={{ color: '#E9C66D', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Service Clarity Notice
            </div>
            <p style={{ fontSize: '0.82rem', color: '#B5ADA4', margin: 0, lineHeight: 1.5 }}>
              Ghar Rasoi provides verified <strong>home-cook and party-chef services</strong>. Our chefs prepare fresh meals live in your home kitchen. Cooking gas, groceries, spices, and cookware are supplied by the customer.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '36px',
          paddingTop: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid #221F1B'
        }}>
          {/* Col 1: Services */}
          <div>
            <div style={{ color: '#FFF8E9', fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              Chef Services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => navigate('/services/daily-cook')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Daily Trial Visit (₹499)</button>
              <button onClick={() => navigate('/services/monthly-cook')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Monthly 1-Time Cook (₹7,999)</button>
              <button onClick={() => navigate('/services/monthly-cook')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Monthly 2-Time (Lunch & Dinner)</button>
              <button onClick={() => navigate('/services/party-chef')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>One-Day Party Chef (₹3,500)</button>
              <button onClick={() => navigate('/book')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Custom Event Cooking</button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div style={{ color: '#FFF8E9', fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              Explore
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Home</button>
              <button onClick={() => navigate('/pricing')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Transparent Pricing</button>
              <button onClick={() => navigate('/menu')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Menu Showcase</button>
              <button onClick={() => navigate('/chefs')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Our Chefs Directory</button>
              <button onClick={() => navigate('/about')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>About Ghar Rasoi</button>
              <button onClick={() => navigate('/faq')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Frequently Asked Questions</button>
            </div>
          </div>

          {/* Col 3: Portal & Support */}
          <div>
            <div style={{ color: '#FFF8E9', fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              Portals & Legal
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => navigate('/account')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Customer Dashboard</button>
              <button onClick={() => navigate('/account/bookings')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Booking History</button>
              <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: '#E9C66D', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> Admin Dashboard
              </button>
              <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Privacy Policy</button>
              <button onClick={() => navigate('/terms')} style={{ background: 'none', border: 'none', color: '#A39B92', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem' }}>Terms & Conditions</button>
            </div>
          </div>

          {/* Col 4: Jaipur Hub Contact */}
          <div>
            <div style={{ color: '#FFF8E9', fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              Jaipur Operations Hub
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#C5BEB5', fontSize: '0.85rem' }}>
                <MapPin size={16} color="#C94B42" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Primary Hub: Mansarovar, Jaipur 302020, Rajasthan, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C5BEB5', fontSize: '0.85rem' }}>
                <Phone size={16} color="#E9C66D" style={{ flexShrink: 0 }} />
                <a href="tel:+916377100943" style={{ color: '#FFF8E9' }}>+91 6377100943</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C5BEB5', fontSize: '0.85rem' }}>
                <Mail size={16} color="#E9C66D" style={{ flexShrink: 0 }} />
                <span>support@gharrasoi.in</span>
              </div>
              <a
                href="https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20have%20an%20inquiry%20regarding%20home%20chef%20services."
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-whatsapp"
                style={{ marginTop: '6px', alignSelf: 'flex-start' }}
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: '#77716A'
        }}>
          <div>
            © {new Date().getFullYear()} Ghar Rasoi — Chef on Call. All rights reserved.
          </div>
          <div>
            Mansarovar • Vaishali Nagar • Malviya Nagar • C-Scheme • Raja Park • Jaipur, Rajasthan
          </div>
        </div>
      </div>
    </footer>
  );
};
