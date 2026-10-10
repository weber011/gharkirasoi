import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChefHat, 
  UtensilsCrossed, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  MessageCircle,
  HelpCircle,
  Users
} from 'lucide-react';

interface ServicesPageProps {
  subService?: 'daily-cook' | 'monthly-cook' | 'party-chef';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ subService }) => {
  const { pricingConfig, navigate, setBookingPrefill } = useApp();

  const handleBookService = (type: any, people = 4, frequency?: any) => {
    setBookingPrefill({
      serviceType: type,
      peopleCount: people,
      frequency
    });
    navigate('/book');
  };

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="badge badge-red" style={{ marginBottom: '10px' }}>
            Jaipur Home Chef Services
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#171513', marginBottom: '12px' }}>
            {subService === 'daily-cook' 
              ? 'Daily Home Cook & Trial Visits'
              : subService === 'monthly-cook'
              ? 'Monthly Home Cook (26 Days Plan)'
              : subService === 'party-chef'
              ? 'One-Day Party & Event Chef'
              : 'Our Chef on Call Services'}
          </h1>
          <p style={{ color: '#77716A', fontSize: '1rem', lineHeight: 1.6 }}>
            Professional culinary talent right in your Jaipur kitchen. Honest rates, zero hidden fees, and complete hygiene.
          </p>
        </div>

        {/* SECTION 1: DAILY COOK */}
        {(!subService || subService === 'daily-cook') && (
          <div className="card-solid" style={{ padding: '36px 32px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C94B42', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <Clock size={16} /> Single Session
                </div>
                <h2 style={{ fontSize: '1.85rem', color: '#171513', margin: '4px 0' }}>
                  Daily Cook (Trial Visit)
                </h2>
                <div className="hindi-text" style={{ color: '#E9C66D', fontWeight: 600, fontSize: '1rem' }}>
                  दैनिक ट्रायल कुक — आपकी रसोई, आपका स्वाद
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                  Starts at ₹{pricingConfig.dailyTrialSmall.price} / Visit
                </span>
                <div style={{ fontSize: '0.78rem', color: '#77716A', marginTop: '4px' }}>
                  Conveyance free in Mansarovar
                </div>
              </div>
            </div>

            <p style={{ color: '#4A4641', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Ideal for busy days, family visits, or trying our chef service before booking a monthly arrangement. The chef prepares a complete fresh meal (Roti/Paratha, Sabzi, Dal, Rice, Salad) live in your kitchen within 2 hours.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              backgroundColor: '#FAF4E6',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E6E0D6' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#171513', marginBottom: '4px' }}>
                  2–4 People Tier
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#C94B42', marginBottom: '6px' }}>
                  ₹{pricingConfig.dailyTrialSmall.price}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#77716A', marginBottom: '12px' }}>
                  2 hours session • Ideal for couples & nuclear families
                </div>
                <button
                  onClick={() => handleBookService('daily-cook', 4)}
                  className="btn btn-sm btn-primary"
                  style={{ width: '100%' }}
                >
                  Book 2–4 People Trial
                </button>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E6E0D6' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#171513', marginBottom: '4px' }}>
                  5–8 People Tier
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#C94B42', marginBottom: '6px' }}>
                  ₹{pricingConfig.dailyTrialLarge.price}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#77716A', marginBottom: '12px' }}>
                  2 to 2.5 hours session • Ideal for larger families
                </div>
                <button
                  onClick={() => handleBookService('daily-cook', 6)}
                  className="btn btn-sm btn-primary"
                  style={{ width: '100%' }}
                >
                  Book 5–8 People Trial
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.84rem', color: '#77716A', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#2E7D32" />
              <span>Groceries, cooking gas, spices, and utensils are supplied by the customer.</span>
            </div>
          </div>
        )}

        {/* SECTION 2: MONTHLY COOK */}
        {(!subService || subService === 'monthly-cook') && (
          <div className="card-solid" style={{ padding: '36px 32px', marginBottom: '32px', border: '2px solid #E9C66D' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
                  26 Days Service / Month
                </span>
                <h2 style={{ fontSize: '1.85rem', color: '#171513', margin: '4px 0' }}>
                  Monthly Home Cook
                </h2>
                <div className="hindi-text" style={{ color: '#C94B42', fontWeight: 600, fontSize: '1rem' }}>
                  मासिक रसोई सेवा — घर का पौष्टिक खाना हर रोज़
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-red" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                  From ₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')} / Month
                </span>
                <div style={{ fontSize: '0.78rem', color: '#77716A', marginTop: '4px' }}>
                  4 weekly off days included
                </div>
              </div>
            </div>

            <p style={{ color: '#4A4641', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              A dedicated, background-verified cook visits daily for 26 days each month. We maintain strict hygiene, customized oil/spice levels, and ensure replacement backup cooks if your designated chef takes emergency leave.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              backgroundColor: '#FAF4E6',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              {/* Option A: Monthly 1-Time */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '8px', border: '1px solid #E6E0D6' }}>
                <span className="badge badge-dark" style={{ marginBottom: '6px' }}>1 Visit Daily (Lunch OR Dinner)</span>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#171513' }}>
                  2–4 People Household
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#C94B42', margin: '6px 0' }}>
                  ₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#77716A' }}>/ month</span>
                </div>
                <ul style={{ fontSize: '0.82rem', color: '#4A4641', paddingLeft: '16px', lineHeight: 1.6, marginBottom: '14px' }}>
                  <li>26 days of daily hot cooking</li>
                  <li>Pure vegetarian or Jain specialty</li>
                  <li>Guaranteed replacement backup</li>
                </ul>
                <button
                  onClick={() => handleBookService('monthly-cook', 4, '1 Meal/Day')}
                  className="btn btn-sm btn-primary"
                  style={{ width: '100%' }}
                >
                  Book 1-Time Monthly (₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')})
                </button>
              </div>

              {/* Option B: Monthly 2-Time */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '8px', border: '1px solid #E6E0D6' }}>
                <span className="badge badge-gold" style={{ marginBottom: '6px' }}>2 Visits Daily (Lunch AND Dinner)</span>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#171513' }}>
                  Twice-Daily Family Cooking
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#C94B42', margin: '6px 0' }}>
                  ₹{pricingConfig.monthlyDoublePerPerson.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#77716A' }}>/ person / month</span>
                </div>
                <ul style={{ fontSize: '0.82rem', color: '#4A4641', paddingLeft: '16px', lineHeight: 1.6, marginBottom: '14px' }}>
                  <li>2 complete visits: Morning/Lunch + Evening/Dinner</li>
                  <li>Fresh chapatis & rotis for both sessions</li>
                  <li>Subject to household tier confirmation</li>
                </ul>
                <button
                  onClick={() => handleBookService('monthly-cook', 3, '2 Meals/Day (Lunch+Dinner)')}
                  className="btn btn-sm btn-primary"
                  style={{ width: '100%' }}
                >
                  Book 2-Time Monthly
                </button>
              </div>
            </div>

            {/* Verification note on larger package */}
            <div style={{
              backgroundColor: '#FFF9F0',
              border: '1px solid #E9C66D',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '0.84rem',
              color: '#7A5B0B',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>Notice regarding 6+2 Vyakti plan (₹12,999/mo):</strong> This larger household package is preserved from the original pricing poster and subject to final capacity confirmation during consultation.
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: PARTY CHEF */}
        {(!subService || subService === 'party-chef') && (
          <div className="card-solid" style={{ padding: '36px 32px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C94B42', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <ChefHat size={16} /> Celebration & Catering
                </div>
                <h2 style={{ fontSize: '1.85rem', color: '#171513', margin: '4px 0' }}>
                  One-Day Party & Event Chef
                </h2>
                <div className="hindi-text" style={{ color: '#E9C66D', fontWeight: 600, fontSize: '1rem' }}>
                  पार्टी एवं उत्सव रसोइया — घर पर होटल जैसा स्वाद
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                  ₹{pricingConfig.partyChefBase.toLocaleString('en-IN')} / Chef
                </span>
                <div style={{ fontSize: '0.78rem', color: '#77716A', marginTop: '4px' }}>
                  10 to 25 Guests (5–7 Hours)
                </div>
              </div>
            </div>

            <p style={{ color: '#4A4641', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Host birthdays, anniversaries, kitty parties, or festival feasts without stressing over the kitchen. Our senior event chefs manage multi-course menus, live counters, appetizers, and main course courses live in your home.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ border: '1px solid #E6E0D6', borderRadius: '8px', padding: '16px', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#171513', marginBottom: '4px' }}>
                  Base Chef Fee: ₹{pricingConfig.partyChefBase.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#77716A' }}>
                  Covers 1 head chef for 5 to 7 hours cooking session for 10–25 guests.
                </div>
              </div>

              <div style={{ border: '1px solid #E6E0D6', borderRadius: '8px', padding: '16px', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#171513', marginBottom: '4px' }}>
                  Optional Helper: ₹{pricingConfig.partyHelperFee.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#77716A' }}>
                  Assists with vegetable chopping, prep work, and live serving.
                </div>
              </div>

              <div style={{ border: '1px solid #E6E0D6', borderRadius: '8px', padding: '16px', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#171513', marginBottom: '4px' }}>
                  Custom Party Menus
                </div>
                <div style={{ fontSize: '0.82rem', color: '#77716A' }}>
                  Dal Baati Churma, Paneer Tikka counters, Punjabi feasts, or Chinese starters.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleBookService('party-chef', 20)}
                className="btn btn-primary"
              >
                Book One-Day Party Chef <ArrowRight size={16} />
              </button>
              <a
                href="https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20am%20inquiring%20about%20a%20party%20chef%20in%20Jaipur."
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={16} /> WhatsApp Event Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
