import React from 'react';
import { Chef } from '../types';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, Heart, MapPin, Award, ArrowRight } from 'lucide-react';

interface ChefCardProps {
  chef: Chef;
  onOpenDetails: (chef: Chef) => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onOpenDetails }) => {
  const { customerProfile, toggleFavouriteChef, setBookingPrefill, navigate } = useApp();
  const isFav = customerProfile.favouriteChefIds.includes(chef.id);

  const handleQuickBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookingPrefill({
      assignedChefId: chef.id,
      cuisines: chef.cuisines.slice(0, 2),
      serviceType: chef.serviceTypes.includes('daily') ? 'daily-cook' : 'party-chef'
    });
    navigate('/book');
  };

  return (
    <div 
      className="card-solid"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => onOpenDetails(chef)}
    >
      {/* Top Image & Overlays */}
      <div style={{ position: 'relative', height: '220px', backgroundColor: '#FAF4E6' }}>
        <img
          src={chef.avatar}
          alt={chef.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Favorite heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavouriteChef(chef.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          title={isFav ? 'Remove from favorites' : 'Add to favorite chefs'}
        >
          <Heart size={18} color={isFav ? '#C94B42' : '#77716A'} fill={isFav ? '#C94B42' : 'none'} />
        </button>

        {/* Verification tag */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          padding: '3px 8px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#171513',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
        }}>
          <ShieldCheck size={14} color="#2E7D32" />
          <span>Verified Cook (Demo Profile)</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div>
            <h4 style={{ fontSize: '1.15rem', color: '#171513', marginBottom: '2px' }}>
              {chef.name}
            </h4>
            <div style={{ fontSize: '0.8rem', color: '#77716A', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Award size={13} color="#C94B42" />
              <span>{chef.experienceYears} Years Culinary Experience</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            backgroundColor: '#FAF4E6',
            padding: '3px 7px',
            borderRadius: '4px',
            border: '1px solid #E6E0D6'
          }}>
            <Star size={13} color="#E9C66D" fill="#E9C66D" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171513' }}>
              {chef.rating}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#77716A' }}>
              ({chef.reviewCount})
            </span>
          </div>
        </div>

        {/* Cuisines Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '10px 0' }}>
          {chef.cuisines.map((c) => (
            <span key={c} style={{
              fontSize: '0.72rem',
              backgroundColor: '#F5F1E9',
              color: '#4A4641',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {c}
            </span>
          ))}
        </div>

        {/* Service Localities */}
        <div style={{ fontSize: '0.78rem', color: '#77716A', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
          <MapPin size={13} color="#C94B42" style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {chef.serviceAreas.join(', ')}
          </span>
        </div>

        {/* Bottom Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid #F0ECE4' }}>
          <button
            onClick={() => onOpenDetails(chef)}
            className="btn btn-sm btn-outline-dark"
            style={{ flex: 1 }}
          >
            Full Profile
          </button>
          <button
            onClick={handleQuickBook}
            className="btn btn-sm btn-primary"
            style={{ flex: 1 }}
          >
            Request Chef
          </button>
        </div>
      </div>
    </div>
  );
};
