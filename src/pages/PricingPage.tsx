import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Check, 
  HelpCircle, 
  ArrowRight, 
  AlertTriangle, 
  MapPin, 
  ShieldCheck, 
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { pricingConfig, navigate, setBookingPrefill } = useApp();

  const handleBookPackage = (type: any, people = 4, frequency?: any) => {
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
          <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
            Official Rate Card • Jaipur
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#171513', marginBottom: '12px' }}>
            Transparent Chef Service Pricing
          </h1>
          <p style={{ color: '#77716A', fontSize: '1rem', lineHeight: 1.6 }}>
            Derived directly from our central rate card. No surge fees, no hidden platform commissions.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {/* Card 1: Daily Trial */}
          <div className="card-solid" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
            <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>
              Single Visit Trial
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#171513', marginBottom: '6px' }}>
              Daily Trial Cook
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#77716A', marginBottom: '18px' }}>
              Experience authentic live cooking in your home before any commitment.
            </p>

            <div style={{
              backgroundColor: '#FAF4E6',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>2 to 4 People:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', color: '#C94B42' }}>
                  ₹{pricingConfig.dailyTrialSmall.price}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>5 to 8 People:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', color: '#C94B42' }}>
                  ₹{pricingConfig.dailyTrialLarge.price}
                </span>
              </div>
            </div>

            <ul style={{ fontSize: '0.86rem', color: '#4A4641', lineHeight: 1.8, paddingLeft: '18px', marginBottom: '24px', flex: 1 }}>
              <li>2-hour complete cooking session</li>
              <li>1 fresh meal (Phulkas, Sabzi, Dal, Rice, Salad)</li>
              <li>Free conveyance in Mansarovar</li>
              <li>Full platform & hygiene clean-up</li>
            </ul>

            <button
              onClick={() => handleBookPackage('daily-cook', 4)}
              className="btn btn-outline-dark"
              style={{ width: '100%' }}
            >
              Book Daily Trial (₹{pricingConfig.dailyTrialSmall.price}) <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 2: Monthly 1-Time */}
          <div className="card-solid" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', border: '2px solid #E9C66D', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '24px',
              backgroundColor: '#171513',
              color: '#E9C66D',
              padding: '3px 10px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              Most Popular
            </div>

            <span className="badge badge-red" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>
              26 Days Regular Plan
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#171513', marginBottom: '6px' }}>
              Monthly 1-Time Cook
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#77716A', marginBottom: '18px' }}>
              1 scheduled visit every day (Lunch or Dinner) for 26 days a month.
            </p>

            <div style={{
              backgroundColor: '#FAF4E6',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>2 to 4 People:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', color: '#C94B42' }}>
                  ₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#77716A' }}>/mo</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>6+2 Vyakti:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', color: '#C94B42' }}>
                  ₹{pricingConfig.monthlySingleLarge.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#77716A' }}>/mo</span>
                </span>
              </div>
            </div>

            <ul style={{ fontSize: '0.86rem', color: '#4A4641', lineHeight: 1.8, paddingLeft: '18px', marginBottom: '24px', flex: 1 }}>
              <li>26 days of punctual home cooking</li>
              <li>Verified, dedicated cook</li>
              <li>Emergency backup chef support</li>
              <li>Free replacement within contract</li>
            </ul>

            <button
              onClick={() => handleBookPackage('monthly-cook', 4, '1 Meal/Day')}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Book Monthly Plan (₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')}) <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 3: Party Chef */}
          <div className="card-solid" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
            <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>
              Events & Parties
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#171513', marginBottom: '6px' }}>
              One-Day Party Chef
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#77716A', marginBottom: '18px' }}>
              Live home celebration chef for birthdays, anniversaries, and dinners.
            </p>

            <div style={{
              backgroundColor: '#FAF4E6',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>10–25 Guests Base:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', color: '#C94B42' }}>
                  ₹{pricingConfig.partyChefBase.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>Optional Helper:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: '#171513' }}>
                  +₹{pricingConfig.partyHelperFee.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <ul style={{ fontSize: '0.86rem', color: '#4A4641', lineHeight: 1.8, paddingLeft: '18px', marginBottom: '24px', flex: 1 }}>
              <li>5 to 7 hours of live kitchen cooking</li>
              <li>Multi-dish starter & main course prep</li>
              <li>Live chapati & snack service</li>
              <li>Complete post-party kitchen counter clean-up</li>
            </ul>

            <button
              onClick={() => handleBookPackage('party-chef', 20)}
              className="btn btn-outline-dark"
              style={{ width: '100%' }}
            >
              Book Party Chef (₹{pricingConfig.partyChefBase.toLocaleString('en-IN')}) <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="card-solid" style={{ padding: '32px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#171513' }}>
            Package Comparison & Business Rules
          </h3>

          <div className="table-responsive">
            <table className="solid-table">
              <thead>
                <tr>
                  <th>Service Details</th>
                  <th>Daily Trial (2–4 ppl)</th>
                  <th>Monthly 1-Time</th>
                  <th>Monthly 2-Time</th>
                  <th>Party Chef</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Base Price</strong></td>
                  <td>₹{pricingConfig.dailyTrialSmall.price}</td>
                  <td>₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')}</td>
                  <td>₹{pricingConfig.monthlyDoublePerPerson.toLocaleString('en-IN')} / person</td>
                  <td>₹{pricingConfig.partyChefBase.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td><strong>Duration / Frequency</strong></td>
                  <td>2 hours single visit</td>
                  <td>26 days (1 visit/day)</td>
                  <td>26 days (Lunch + Dinner)</td>
                  <td>5–7 hours live party</td>
                </tr>
                <tr>
                  <td><strong>Mansarovar Conveyance</strong></td>
                  <td>₹0 (Free)</td>
                  <td>₹0 (Free)</td>
                  <td>₹0 (Free)</td>
                  <td>₹0 (Free)</td>
                </tr>
                <tr>
                  <td><strong>Outside Mansarovar</strong></td>
                  <td>₹150</td>
                  <td>₹150</td>
                  <td>₹150</td>
                  <td>₹150</td>
                </tr>
                <tr>
                  <td><strong>Groceries & Spices</strong></td>
                  <td>By Customer</td>
                  <td>By Customer</td>
                  <td>By Customer</td>
                  <td>By Customer</td>
                </tr>
                <tr>
                  <td><strong>Gas & Utensils</strong></td>
                  <td>By Customer</td>
                  <td>By Customer</td>
                  <td>By Customer</td>
                  <td>By Customer</td>
                </tr>
                <tr>
                  <td><strong>Backup Chef Included</strong></td>
                  <td>N/A</td>
                  <td>✅ Yes</td>
                  <td>✅ Yes</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Poster conditions callout */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E0D6',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start'
        }}>
          <ShieldCheck size={28} color="#C94B42" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#171513', marginBottom: '6px' }}>
              Key Terms & Conditions from Ghar Rasoi Rate Poster
            </h4>
            <ul style={{ fontSize: '0.88rem', color: '#4A4641', paddingLeft: '18px', margin: 0, lineHeight: 1.6 }}>
              <li><strong>Conveyance Charges:</strong> Free within our primary Mansarovar hub. Standard conveyance charge applies outside Mansarovar (e.g. Vaishali Nagar, Malviya Nagar, C-Scheme).</li>
              <li><strong>Customer Inclusions:</strong> Groceries, spices, cooking oil, gas, and cookware are provided by the customer for safety, transparency, and personal brand preference.</li>
              <li><strong>Notice on Package Drafts:</strong> The 6+2 Vyakti tier (₹12,999) and Monthly 2-time (₹5,000/person) are subject to business confirmation prior to final onboarding.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
