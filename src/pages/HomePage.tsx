import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SmartChefMatcher } from '../components/SmartChefMatcher';
import { JaipurServiceChecker } from '../components/JaipurServiceChecker';
import { ChefCard } from '../components/ChefCard';
import { ChefModal } from '../components/ChefModal';
import { Chef } from '../types';
import { 
  UtensilsCrossed, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  HeartHandshake, 
  ChefHat, 
  Flame, 
  ChevronRight,
  PhoneCall,
  CalendarDays
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { pricingConfig, chefs, menuItems, navigate, openChatbotWithPrompt } = useApp();
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  return (
    <div>
      {/* 1. HERO SECTION (Using supplied hero-bg.jpeg) */}
      <section style={{
        position: 'relative',
        minHeight: '620px',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(to right, rgba(13, 12, 10, 0.92) 0%, rgba(13, 12, 10, 0.78) 55%, rgba(13, 12, 10, 0.45) 100%), url('/assets/hero-bg.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        color: '#FFFFFF',
        padding: '80px 0'
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            {/* Jaipur Hub Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(233, 198, 109, 0.15)',
              border: '1px solid #E9C66D',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#E9C66D',
              marginBottom: '20px'
            }}>
              <MapPin size={15} color="#E9C66D" />
              <span>JAIPUR'S TRUSTED CHEF ON CALL • MANSAROVAR HUB</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              color: '#FFF8E9',
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: '16px'
            }}>
              Your Kitchen. <br />
              Your Taste. <br />
              <span style={{ color: '#E9C66D' }}>Your Chef.</span>
            </h1>

            {/* Hindi Tagline */}
            <p className="hindi-text" style={{
              fontSize: '1.25rem',
              color: '#F4EFE6',
              fontWeight: 500,
              marginBottom: '12px'
            }}>
              घर जैसा स्वाद, हर थाली में प्यार।
            </p>

            {/* Supporting Copy */}
            <p style={{
              fontSize: '1.05rem',
              color: '#D4CDC3',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}>
              Book a verified home chef in Jaipur for everyday meals, monthly cooking, family dinners, or your next celebration. Cooked fresh in your kitchen, customized to your taste.
            </p>

            {/* Hero CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button
                onClick={() => {
                  const element = document.getElementById('smart-chef-matcher');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-lg btn-primary"
              >
                Find My Chef <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate('/services')}
                className="btn btn-lg btn-outline-light"
              >
                Explore Services
              </button>
            </div>

            {/* Trust highlights */}
            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              paddingTop: '20px',
              fontSize: '0.85rem',
              color: '#E6E0D6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#E9C66D" />
                <span>Daily Trial from ₹{pricingConfig.dailyTrialSmall.price}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#E9C66D" />
                <span>Monthly 26-Day Plans</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#E9C66D" />
                <span>Pure Veg & Jain Specialized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUOTE & CULINARY ARTISTRY SECTION (Using supplied chef-quote.jpeg) */}
      <section className="section section-white" style={{ borderBottom: '1px solid #E6E0D6' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Chef Quote Image with solid framing */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-elevated)',
              border: '2px solid #E6E0D6',
              backgroundColor: '#C94B42',
              maxHeight: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="/assets/chef-quote.jpeg"
                alt="Ghar Rasoi Chef Flame Cooking"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  maxHeight: '480px'
                }}
              />
            </div>

            {/* Quote and Brand Manifesto */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#C94B42',
                fontWeight: 700,
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '12px'
              }}>
                <Flame size={16} /> Authentic Home Kitchen Philosophy
              </div>

              <blockquote style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                lineHeight: 1.35,
                color: '#171513',
                marginBottom: '16px',
                fontWeight: 700
              }}>
                “Cooking is an act of love. When a chef steps into your kitchen, it transforms simple groceries into an authentic ghar ka khana feast.”
              </blockquote>

              <p className="hindi-text" style={{
                fontSize: '1.2rem',
                color: '#C94B42',
                fontWeight: 600,
                marginBottom: '18px'
              }}>
                ताज़ा खाना, आपकी रसोई, आपका स्वाद।
              </p>

              <p style={{ color: '#4A4641', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '24px' }}>
                At Ghar Rasoi, we believe no restaurant delivery can ever compete with the nourishing aroma of piping hot rotis coming straight off your own tawa. Our trained chefs bring punctuality, hygiene, and regional mastery right to your doorstep in Jaipur.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openChatbotWithPrompt('Can I book a trial visit for my home in Jaipur?')}
                  className="btn btn-outline-dark"
                >
                  <Sparkles size={16} color="#C94B42" /> Ask Rasoi Assistant
                </button>
                <a
                  href="https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20would%20like%20to%20learn%20more%20about%20your%20chef%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={16} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROUD JAIPUR HIGHLIGHT BANNER (Using supplied best-chef-jaipur.png) */}
      <section className="section section-cream" style={{ padding: '48px 0', borderBottom: '1px solid #E6E0D6' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #E9C66D',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center'
          }}>
            <div style={{ padding: '32px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                ⭐ Jaipur's #1 Choice
              </span>
              <h2 style={{ fontSize: '1.85rem', color: '#171513', marginBottom: '12px' }}>
                Dedicated to Jaipur Families
              </h2>
              <p style={{ color: '#4A4641', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                From everyday homestyle phulkas in Mansarovar to grand Dal Baati Churma banquets in Vaishali Nagar and C-Scheme, Ghar Rasoi is proud to be Jaipur's go-to on-call chef network.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/chefs')} className="btn btn-primary">
                  Meet Our Chefs <ArrowRight size={16} />
                </button>
                <button onClick={() => navigate('/pricing')} className="btn btn-outline-dark">
                  View Rate Card
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#FFFDF9' }}>
              <img
                src="/assets/best-chef-jaipur.png"
                alt="Best Chef Service in Jaipur"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  margin: '0 auto',
                  borderRadius: '12px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES OVERVIEW */}
      <section className="section section-white">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <span className="badge badge-red" style={{ marginBottom: '10px' }}>
              Transparent Services
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#171513', marginBottom: '12px' }}>
              Choose the Service You Need
            </h2>
            <p style={{ color: '#77716A', fontSize: '0.95rem' }}>
              Whether you need cooking support for a single busy day, a monthly 26-day cook, or an anniversary feast, we have you covered.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Service 1: Daily Trial */}
            <div className="card-solid" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#FAF4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C94B42' }}>
                  <Clock size={24} />
                </div>
                <span className="badge badge-gold">₹{pricingConfig.dailyTrialSmall.price} / Visit</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Daily Cook (Trial Visit)</h3>
              <p style={{ fontSize: '0.88rem', color: '#77716A', marginBottom: '18px', flex: 1 }}>
                2-hour live home cooking session. Test our chef before booking a monthly arrangement. Phulkas, sabzi, dal & rice made fresh.
              </p>
              <ul style={{ fontSize: '0.84rem', color: '#4A4641', paddingLeft: '16px', marginBottom: '22px', lineHeight: 1.7 }}>
                <li>2–4 people: ₹{pricingConfig.dailyTrialSmall.price}</li>
                <li>5–8 people: ₹{pricingConfig.dailyTrialLarge.price}</li>
                <li>Conveyance free in Mansarovar</li>
              </ul>
              <button onClick={() => navigate('/services/daily-cook')} className="btn btn-outline-dark" style={{ width: '100%' }}>
                Daily Cook Details <ChevronRight size={16} />
              </button>
            </div>

            {/* Service 2: Monthly Home Cook */}
            <div className="card-solid" style={{ padding: '28px', display: 'flex', flexDirection: 'column', border: '2px solid #E9C66D', position: 'relative' }}>
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
                Most Popular in Jaipur
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#FAF4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#171513' }}>
                  <CalendarDays size={24} />
                </div>
                <span className="badge badge-gold">From ₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')}/mo</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Monthly Home Cook</h3>
              <p style={{ fontSize: '0.88rem', color: '#77716A', marginBottom: '18px', flex: 1 }}>
                26 days of continuous verified home cooking per month (4 weekly offs). Choose 1 meal daily or twice daily (Lunch + Dinner).
              </p>
              <ul style={{ fontSize: '0.84rem', color: '#4A4641', paddingLeft: '16px', marginBottom: '22px', lineHeight: 1.7 }}>
                <li>1-Time Daily (2–4 ppl): ₹{pricingConfig.monthlySingleSmall.price.toLocaleString('en-IN')}</li>
                <li>2-Time (Lunch & Dinner): ₹{pricingConfig.monthlyDoublePerPerson.toLocaleString('en-IN')}/person</li>
                <li>Verified cook + backup support</li>
              </ul>
              <button onClick={() => navigate('/services/monthly-cook')} className="btn btn-primary" style={{ width: '100%' }}>
                Monthly Cook Plans <ChevronRight size={16} />
              </button>
            </div>

            {/* Service 3: Party Chef */}
            <div className="card-solid" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#FAF4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C94B42' }}>
                  <ChefHat size={24} />
                </div>
                <span className="badge badge-gold">₹{pricingConfig.partyChefBase.toLocaleString('en-IN')}</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Party & Event Chef</h3>
              <p style={{ fontSize: '0.88rem', color: '#77716A', marginBottom: '18px', flex: 1 }}>
                Live chef on call for birthdays, family gatherings, and house parties. 5 to 7 hours of cooking for 10 to 25 guests.
              </p>
              <ul style={{ fontSize: '0.84rem', color: '#4A4641', paddingLeft: '16px', marginBottom: '22px', lineHeight: 1.7 }}>
                <li>10–25 guests: ₹{pricingConfig.partyChefBase.toLocaleString('en-IN')} per chef</li>
                <li>Optional kitchen helper: ₹{pricingConfig.partyHelperFee.toLocaleString('en-IN')}</li>
                <li>Multi-course menus & live counters</li>
              </ul>
              <button onClick={() => navigate('/services/party-chef')} className="btn btn-outline-dark" style={{ width: '100%' }}>
                Party Chef Details <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SMART CHEF MATCHER SECTION */}
      <section className="section section-cream">
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <SmartChefMatcher />
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="section section-white">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
              Easy 4-Step Process
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#171513', marginBottom: '12px' }}>
              How Ghar Rasoi Works
            </h2>
            <p style={{ color: '#77716A', fontSize: '0.95rem' }}>
              A straightforward, transparent home cooking booking journey.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                step: '01',
                title: 'Select Service & Schedule',
                desc: 'Pick your cooking visit type, date, time slot, and number of family members or guests.'
              },
              {
                step: '02',
                title: 'Set Dietary Rules',
                desc: 'Choose pure veg, strict Jain, sattvic, spice tolerance, and cuisine favorites.'
              },
              {
                step: '03',
                title: 'Verified Chef Assigned',
                desc: 'We match a police-verified, hygiene-trained local chef in your Jaipur neighborhood.'
              },
              {
                step: '04',
                title: 'Fresh Hot Meals at Home',
                desc: 'Chef cooks live in your kitchen using your ingredients, spices, and cookware.'
              }
            ].map((item) => (
              <div key={item.step} className="card-solid" style={{ padding: '24px', position: 'relative' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  color: '#FAF4E6',
                  lineHeight: 1,
                  marginBottom: '12px'
                }}>
                  {item.step}
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#171513' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#77716A', margin: 0, lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CHEF DISCOVERY PREVIEW */}
      <section className="section section-cream">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
            <div>
              <span className="badge badge-red" style={{ marginBottom: '8px' }}>
                Local Jaipur Talent
              </span>
              <h2 style={{ fontSize: '2rem', color: '#171513', margin: 0 }}>
                Meet Our Verified Home Chefs
              </h2>
            </div>
            <button onClick={() => navigate('/chefs')} className="btn btn-outline-dark">
              View All Chefs Directory <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {chefs.slice(0, 3).map((chef) => (
              <ChefCard key={chef.id} chef={chef} onOpenDetails={setSelectedChef} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. MENU SHOWCASE PREVIEW */}
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                Culinary Repertoire
              </span>
              <h2 style={{ fontSize: '2rem', color: '#171513', margin: 0 }}>
                Signature Dishes Our Chefs Prepare
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#77716A', marginTop: '6px' }}>
                From our black-and-gold poster menu. Cooked fresh in your kitchen with your groceries.
              </p>
            </div>
            <button onClick={() => navigate('/menu')} className="btn btn-outline-dark">
              Full Menu Showcase <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {menuItems.slice(0, 3).map((dish) => (
              <div key={dish.id} className="card-solid" style={{ overflow: 'hidden' }}>
                <div style={{ height: '180px', position: 'relative' }}>
                  <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: '#171513',
                    color: '#FFF8E9',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '0.82rem'
                  }}>
                    ₹{dish.price}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#171513', marginBottom: '4px' }}>
                    {dish.name} <span className="hindi-text" style={{ fontSize: '0.9rem', color: '#C94B42' }}>({dish.hindiName})</span>
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#77716A', marginBottom: '10px', lineHeight: 1.5 }}>
                    {dish.description}
                  </p>
                  <div style={{ fontSize: '0.76rem', color: '#4A4641' }}>
                    <strong>Includes:</strong> {dish.dishesIncluded.slice(0, 3).join(', ')}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. JAIPUR SERVICE AREA CHECKER */}
      <section className="section section-cream">
        <div className="container">
          <JaipurServiceChecker />
        </div>
      </section>

      {/* 10. WHY CHOOSE GHAR RASOI */}
      <section className="section section-white">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="badge badge-red" style={{ marginBottom: '10px' }}>
              Why Ghar Rasoi
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#171513', marginBottom: '12px' }}>
              Not Food Delivery. Real Home Chefs.
            </h2>
            <p style={{ color: '#77716A', fontSize: '0.95rem' }}>
              We bring the luxury and health benefits of personal kitchen cooking directly to your family.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                icon: ShieldCheck,
                title: 'Background Verified Chefs',
                desc: 'Identity, address verification, reference checks, and culinary skill assessments before induction.'
              },
              {
                icon: HeartHandshake,
                title: 'Your Ingredients, Your Oil',
                desc: 'Cooked with your trusted cooking oils, spices, and groceries. Ideal for diabetic, child, and senior health.'
              },
              {
                icon: Sparkles,
                title: 'Pure Kitchen Hygiene',
                desc: 'Clean hands, clean counters, organized utensils. Post-cooking kitchen platform wipe-down included.'
              },
              {
                icon: UtensilsCrossed,
                title: 'Strict Dietary Separation',
                desc: 'Pure veg sanctity and zero contamination for strict Jain and religious fast (Falahari) traditions.'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card-solid" style={{ padding: '24px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    backgroundColor: '#FAF4E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#C94B42',
                    marginBottom: '16px'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: '1.12rem', color: '#171513', marginBottom: '8px' }}>
                    {feature.title}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: '#77716A', margin: 0, lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION PREVIEW */}
      <section className="section section-cream">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
              Clear Answers
            </span>
            <h2 style={{ fontSize: '2rem', color: '#171513', marginBottom: '10px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#77716A', fontSize: '0.92rem' }}>
              Everything you need to know about our home chef service in Jaipur.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                q: 'Do your chefs bring groceries or vegetables?',
                a: 'No. Ghar Rasoi charges exclusively for culinary service. Groceries, cooking gas, utensils, and oil are provided by the client so you have 100% control over ingredient freshness and brand.'
              },
              {
                q: 'What areas in Jaipur do you serve?',
                a: 'Our primary operations hub is based in Mansarovar (302020) where conveyance is completely free. We also actively serve Vaishali Nagar, Malviya Nagar, C-Scheme, Raja Park, Tonk Road, Jagatpura, and surrounding areas with a standard ₹150 conveyance fee.'
              },
              {
                q: 'What if my monthly cook takes emergency leave?',
                a: 'Under our monthly 26-day contract, if your designated cook has an emergency absence, our operations team coordinates a replacement backup chef.'
              },
              {
                q: 'Can the chef cook strict Jain food without onion and garlic?',
                a: 'Yes, absolutely. We have dedicated cooks trained in authentic Jain, Sattvic, and Marwari kitchen traditions who honor complete sanctity.'
              }
            ].map((faq, i) => (
              <div key={i} className="card-solid" style={{ padding: '20px 24px' }}>
                <h4 style={{ fontSize: '1rem', color: '#171513', marginBottom: '8px' }}>
                  {faq.q}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4A4641', margin: 0, lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <button onClick={() => navigate('/faq')} className="btn btn-outline-dark">
              View All FAQs <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 12. WHATSAPP & DIRECT CONTACT CTA */}
      <section className="section-dark section" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <h2 style={{ fontSize: '2.3rem', color: '#FFF8E9', marginBottom: '14px' }}>
            Ready to Enjoy Fresh Home Meals?
          </h2>
          <p style={{ color: '#C5BEB5', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
            Book a trial visit today or speak directly with our Jaipur culinary coordinator.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/book')} className="btn btn-lg btn-primary">
              Book a Chef Now
            </button>
            <a
              href="https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20want%20to%20book%20a%20home%20cook%20in%20Jaipur."
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg btn-whatsapp"
            >
              <MessageCircle size={18} /> WhatsApp (+91 6377100943)
            </a>
          </div>
        </div>
      </section>

      {/* Active Chef Modal */}
      <ChefModal chef={selectedChef} onClose={() => setSelectedChef(null)} />
    </div>
  );
};
