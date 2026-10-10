import React from 'react';
import { Chef } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Languages, 
  Check, 
  ArrowRight, 
  Heart,
  Phone
} from 'lucide-react';

interface ChefModalProps {
  chef: Chef | null;
  onClose: () => void;
}

export const ChefModal: React.FC<ChefModalProps> = ({ chef, onClose }) => {
  const { customerProfile, toggleFavouriteChef, setBookingPrefill, navigate } = useApp();
  if (!chef) return null;

  const isFav = customerProfile.favouriteChefIds.includes(chef.id);

  const handleBook = () => {
    setBookingPrefill({
      assignedChefId: chef.id,
      cuisines: chef.cuisines.slice(0, 2),
      serviceType: chef.serviceTypes.includes('daily') ? 'daily-cook' : 'party-chef'
    });
    onClose();
    navigate('/book');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: 0 }}
      >
        {/* Header with image */}
        <div style={{ position: 'relative', height: '260px', backgroundColor: '#171513' }}>
          <img
            src={chef.avatar}
            alt={chef.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <X size={20} />
          </button>

          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            right: '20px',
            color: '#FFFFFF'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#2E7D32',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '6px'
            }}>
              <ShieldCheck size={14} /> Background Verified Chef (Demo Profile)
            </div>
            <h2 style={{ color: '#FFFFFF', fontSize: '1.6rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
              {chef.name}
            </h2>
          </div>
        </div>

        {/* Body content */}
        <div style={{ padding: '24px' }}>
          {/* Quick Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            backgroundColor: '#FAF4E6',
            borderRadius: '10px',
            padding: '14px',
            border: '1px solid #E6E0D6',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#77716A' }}>Experience</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#171513' }}>
                {chef.experienceYears} Years
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#77716A' }}>Customer Rating</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#171513', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                <Star size={14} color="#E9C66D" fill="#E9C66D" />
                <span>{chef.rating}</span>
                <span style={{ fontSize: '0.75rem', color: '#77716A' }}>({chef.reviewCount})</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#77716A' }}>Primary Hub</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#171513' }}>
                Mansarovar
              </div>
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '6px' }}>About the Chef</h4>
            <p style={{ fontSize: '0.88rem', color: '#4A4641', lineHeight: 1.6 }}>
              {chef.bio}
            </p>
          </div>

          {/* Signature Dishes */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '8px' }}>Signature Specialties & Dishes</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {chef.signatureDishes.map((dish) => (
                <span key={dish} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E6E0D6',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: '#171513'
                }}>
                  <Check size={14} color="#2E7D32" /> {dish}
                </span>
              ))}
            </div>
          </div>

          {/* Areas & Languages */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            fontSize: '0.84rem',
            color: '#77716A',
            marginBottom: '24px',
            backgroundColor: '#F9F6F0',
            padding: '12px',
            borderRadius: '8px'
          }}>
            <div>
              <strong style={{ color: '#171513' }}>Service Localities:</strong> {chef.serviceAreas.join(', ')}
            </div>
            <div>
              <strong style={{ color: '#171513' }}>Languages Spoken:</strong> {chef.languages.join(', ')}
            </div>
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid #E6E0D6'
          }}>
            <button
              onClick={() => toggleFavouriteChef(chef.id)}
              className="btn btn-outline-dark"
              style={{ padding: '12px 16px' }}
              title={isFav ? 'Remove favorite' : 'Add favorite'}
            >
              <Heart size={18} color={isFav ? '#C94B42' : '#77716A'} fill={isFav ? '#C94B42' : 'none'} />
            </button>

            <a
              href={`https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20am%20interested%20in%20booking%20${encodeURIComponent(chef.name)}.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <Phone size={16} /> WhatsApp Inquiry
            </a>

            <button
              onClick={handleBook}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              Request to Book This Chef <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
