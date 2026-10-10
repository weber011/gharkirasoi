import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Users, 
  Calendar, 
  MapPin, 
  Utensils, 
  HelpCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { calculateQuote, JAIPUR_LOCALITIES } from '../data/pricing';

export const SmartChefMatcher: React.FC = () => {
  const { pricingConfig, navigate, setBookingPrefill } = useApp();
  
  // Step in quiz: 1 to 4
  const [step, setStep] = useState(1);

  // User selections
  const [serviceType, setServiceType] = useState<'daily-cook' | 'monthly-cook' | 'party-chef' | 'custom-cooking'>('daily-cook');
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [frequency, setFrequency] = useState<string>('Once');
  const [mealTime, setMealTime] = useState<string>('Dinner');
  const [dietary, setDietary] = useState<string>('Pure Veg');
  const [locality, setLocality] = useState<string>('Mansarovar');

  // Calculate live recommendation from shared central pricing
  const quoteResult = calculateQuote(pricingConfig, {
    serviceType,
    peopleCount: householdSize,
    frequency: serviceType === 'monthly-cook' ? frequency : undefined,
    locality
  });

  const handleApplyToBooking = () => {
    setBookingPrefill({
      serviceType,
      packageName: quoteResult.packageName,
      peopleCount: householdSize,
      frequency: serviceType === 'monthly-cook' ? (frequency as any) : 'Once',
      locality,
      foodType: (dietary === 'Jain' ? 'Jain (No Onion Garlic)' : 'Pure Veg') as any,
      pricingSnapshot: {
        baseAmount: quoteResult.baseAmount,
        helperAmount: quoteResult.helperAmount,
        conveyanceAmount: quoteResult.conveyanceAmount,
        totalAmount: quoteResult.totalAmount,
        isCustomQuote: quoteResult.isCustomQuote,
        breakdown: quoteResult.breakdown
      }
    });
    navigate('/book');
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #E6E0D6',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden'
    }} id="smart-chef-matcher">
      {/* Quiz Top Header */}
      <div style={{
        backgroundColor: '#FAF4E6',
        padding: '20px 24px',
        borderBottom: '1px solid #E6E0D6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: '#C94B42',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#171513', margin: 0 }}>
              Smart Chef Matcher & Price Calculator
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#77716A', margin: 0 }}>
              Answer 3 simple questions to get your exact configured rate in Jaipur
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: s === step ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: s === step ? '#C94B42' : s < step ? '#171513' : '#E6E0D6',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#77716A', marginLeft: '6px' }}>
            Step {step} of 4
          </span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* STEP 1: Service Type */}
        {step === 1 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', color: '#171513' }}>
              1. What kind of chef or cooking service are you looking for?
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '18px' }}>
              Select the service type that fits your current requirement:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              marginBottom: '24px'
            }}>
              {[
                {
                  id: 'daily-cook',
                  title: 'Daily Trial Visit',
                  badge: 'From ₹499',
                  desc: '1-time cooking visit to experience the chef in your kitchen before monthly commitment.'
                },
                {
                  id: 'monthly-cook',
                  title: 'Monthly Home Cook',
                  badge: '26 Days / Month',
                  desc: 'Permanent verified cook visiting once or twice daily for wholesome home meals.'
                },
                {
                  id: 'party-chef',
                  title: 'Party & Event Chef',
                  badge: '₹3,500 (10–25 Guests)',
                  desc: 'Live celebration cooking for birthdays, anniversaries, family get-togethers (5-7 hrs).'
                },
                {
                  id: 'custom-cooking',
                  title: 'Custom Requirement',
                  badge: 'Personalized',
                  desc: 'Special diet, post-recovery cooking, or customized guest sizes.'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setServiceType(item.id as any)}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: serviceType === item.id ? '2px solid #C94B42' : '1px solid #E6E0D6',
                    backgroundColor: serviceType === item.id ? '#FDF8F7' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.98rem', color: '#171513' }}>
                      {item.title}
                    </span>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                      {item.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#77716A', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setStep(2)}
                className="btn btn-primary"
              >
                Next: Household Size <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Household / Guest Size */}
        {step === 2 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', color: '#171513' }}>
              {serviceType === 'party-chef' 
                ? '2. How many guests are you expecting at the event?' 
                : '2. How many members are there in your household?'}
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '18px' }}>
              {serviceType === 'party-chef'
                ? 'Standard package covers 10 to 25 guests. Larger gatherings can add extra helper assistance.'
                : 'Prices in our central poster are structured for 2–4 people and 5–8 people.'}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              marginBottom: '24px'
            }}>
              {serviceType === 'party-chef' ? (
                [
                  { label: '10–15 Guests', val: 12 },
                  { label: '16–20 Guests', val: 18 },
                  { label: '21–25 Guests', val: 24 },
                  { label: '25+ Guests', val: 30 }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setHouseholdSize(item.val)}
                    style={{
                      padding: '16px 12px',
                      borderRadius: '8px',
                      border: householdSize === item.val ? '2px solid #C94B42' : '1px solid #E6E0D6',
                      backgroundColor: householdSize === item.val ? '#FDF8F7' : '#FFFFFF',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#171513',
                      fontSize: '0.92rem'
                    }}
                  >
                    {item.label}
                  </button>
                ))
              ) : (
                [
                  { label: '1–2 Members', val: 2 },
                  { label: '3–4 Members', val: 4 },
                  { label: '5–6 Members', val: 6 },
                  { label: '7–8 Members', val: 8 }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setHouseholdSize(item.val)}
                    style={{
                      padding: '16px 12px',
                      borderRadius: '8px',
                      border: householdSize === item.val ? '2px solid #C94B42' : '1px solid #E6E0D6',
                      backgroundColor: householdSize === item.val ? '#FDF8F7' : '#FFFFFF',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#171513',
                      fontSize: '0.92rem'
                    }}
                  >
                    {item.label}
                  </button>
                ))
              )}
            </div>

            {serviceType === 'monthly-cook' && (
              <div style={{
                marginBottom: '20px',
                padding: '14px',
                backgroundColor: '#FAF4E6',
                borderRadius: '8px',
                border: '1px solid #E6E0D6'
              }}>
                <label className="form-label" style={{ marginBottom: '8px' }}>
                  Cooking Frequency (Monthly Cook):
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setFrequency('1 Meal/Day')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: frequency === '1 Meal/Day' ? '2px solid #C94B42' : '1px solid #E6E0D6',
                      backgroundColor: frequency === '1 Meal/Day' ? '#FFFFFF' : 'transparent',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    1 Meal / Day (Lunch or Dinner)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('2 Meals/Day (Lunch+Dinner)')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: frequency === '2 Meals/Day (Lunch+Dinner)' ? '2px solid #C94B42' : '1px solid #E6E0D6',
                      backgroundColor: frequency === '2 Meals/Day (Lunch+Dinner)' ? '#FFFFFF' : 'transparent',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    2 Meals / Day (Lunch + Dinner)
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setStep(1)}
                className="btn btn-outline-dark"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn btn-primary"
              >
                Next: Dietary & Area <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Dietary & Jaipur Locality */}
        {step === 3 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', color: '#171513' }}>
              3. Dietary Preference & Jaipur Locality
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#77716A', marginBottom: '18px' }}>
              We match chefs strictly based on your cuisine and kitchen traditions.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <label className="form-label">Dietary Preference:</label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="form-control form-select"
                >
                  <option value="Pure Veg">Pure Veg (Standard Homestyle)</option>
                  <option value="Jain">Jain (Strict No Onion & No Garlic)</option>
                  <option value="Rajasthani Special">Rajasthani Traditional (Gatta, Daal Baati)</option>
                  <option value="Low-Oil">Healthy / Low-Oil & Diabetic Friendly</option>
                </select>
              </div>

              <div>
                <label className="form-label">Your Jaipur Locality:</label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="form-control form-select"
                >
                  {JAIPUR_LOCALITIES.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name} ({loc.conveyanceFee === 0 ? 'Free Hub Conveyance' : `+₹${loc.conveyanceFee} conveyance`})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setStep(2)}
                className="btn btn-outline-dark"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="btn btn-primary"
              >
                View Recommendation & Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Live Recommendation & Quote */}
        {step === 4 && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#2E7D32',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '8px'
            }}>
              <CheckCircle2 size={18} />
              <span>Recommended Package Match</span>
            </div>

            <div style={{
              backgroundColor: '#FAF6EE',
              border: '2px solid #E9C66D',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: '#171513', marginBottom: '4px' }}>
                    {quoteResult.packageName}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-gold">📍 {locality}</span>
                    <span className="badge badge-red">🥗 {dietary}</span>
                    <span className="badge badge-dark">👥 {householdSize} {serviceType === 'party-chef' ? 'Guests' : 'Family Members'}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#77716A', textTransform: 'uppercase' }}>
                    Total Transparent Quote
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#C94B42'
                  }}>
                    {quoteResult.isCustomQuote ? 'Custom Quotation' : `₹${quoteResult.totalAmount.toLocaleString('en-IN')}`}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#77716A' }}>
                    {serviceType.startsWith('monthly') ? 'per month (26 days)' : 'per visit'}
                  </div>
                </div>
              </div>

              {/* Rationale & Breakdown */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '14px',
                border: '1px solid #E6E0D6',
                fontSize: '0.86rem'
              }}>
                <div style={{ fontWeight: 600, color: '#171513', marginBottom: '8px' }}>
                  Transparent Cost & Inclusions Breakdown:
                </div>
                <ul style={{ paddingLeft: '18px', color: '#4A4641', lineHeight: 1.6, margin: 0 }}>
                  {quoteResult.breakdown.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <button
                onClick={() => setStep(3)}
                className="btn btn-outline-dark"
              >
                <ArrowLeft size={16} /> Adjust Answers
              </button>

              <button
                onClick={handleApplyToBooking}
                className="btn btn-primary btn-lg"
                style={{ flex: 1, maxWidth: '320px' }}
              >
                Proceed to Book This Chef <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
