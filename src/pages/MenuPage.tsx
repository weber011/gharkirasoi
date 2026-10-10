import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';
import { UtensilsCrossed, Check, ArrowRight, Info, Sparkles, Filter } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { menuItems, navigate, setBookingPrefill } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Thali', 'Traditional', 'Quick Combo', 'Special'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleBookDish = (dish: MenuItem) => {
    setBookingPrefill({
      specialInstructions: `Customer requested recipe style: ${dish.name} (${dish.hindiName}).`,
      serviceType: 'daily-cook',
      foodType: dish.dietary === 'Falahari' ? 'Pure Veg' : dish.dietary === 'Jain Available' ? 'Jain (No Onion Garlic)' : 'Pure Veg'
    });
    navigate('/book');
  };

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
            Black & Gold Culinary Showcase
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#171513', marginBottom: '12px' }}>
            Menu & Thali Showcase
          </h1>
          <p className="hindi-text" style={{ fontSize: '1.15rem', color: '#C94B42', fontWeight: 600, marginBottom: '8px' }}>
            पारंपरिक राजस्थानी एवं घर का पौष्टिक स्वाद
          </p>
          <p style={{ color: '#77716A', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Inspired by our traditional Ghar Rasoi menu poster. These showcase signature homestyle combinations our chefs prepare fresh in your kitchen.
          </p>
        </div>

        {/* Distinction Notice */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E0D6',
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          maxWidth: '820px',
          margin: '0 auto 36px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <Info size={20} color="#C94B42" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: '#4A4641', lineHeight: 1.5 }}>
            <strong>Culinary Clarity:</strong> Our chefs cook these authentic dishes right at your home using your kitchen ingredients. Menu rates also guide ready-made meal combos or party planning.
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: selectedCategory === cat ? '2px solid #171513' : '1px solid #E6E0D6',
                backgroundColor: selectedCategory === cat ? '#171513' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFF8E9' : '#171513',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {filteredItems.map((dish) => (
            <div key={dish.id} className="card-solid" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Dish Image */}
              <div style={{ position: 'relative', height: '220px', backgroundColor: '#FAF4E6' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#171513',
                  color: '#E9C66D',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  border: '1px solid #2B2723'
                }}>
                  ₹{dish.price}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#2E7D32',
                  border: '1px solid #E6E0D6'
                }}>
                  🟢 {dish.dietary}
                </div>
              </div>

              {/* Dish Content */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#171513', margin: 0 }}>
                    {dish.name}
                  </h3>
                  <span className="hindi-text" style={{ fontSize: '0.95rem', color: '#C94B42', fontWeight: 600 }}>
                    {dish.hindiName}
                  </span>
                </div>

                <p style={{ fontSize: '0.84rem', color: '#77716A', marginBottom: '16px', lineHeight: 1.5 }}>
                  {dish.description}
                </p>

                {/* Inclusions */}
                <div style={{
                  backgroundColor: '#FAF4E6',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  marginBottom: '20px',
                  fontSize: '0.82rem'
                }}>
                  <div style={{ fontWeight: 700, color: '#171513', marginBottom: '6px' }}>
                    What's in this platter:
                  </div>
                  <ul style={{ paddingLeft: '16px', color: '#4A4641', margin: 0, lineHeight: 1.6 }}>
                    {dish.dishesIncluded.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={() => handleBookDish(dish)}
                    className="btn btn-outline-dark"
                    style={{ width: '100%', fontSize: '0.86rem' }}
                  >
                    Request Chef for This Menu <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
