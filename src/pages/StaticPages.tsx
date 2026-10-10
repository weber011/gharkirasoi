import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  HeartHandshake, 
  UtensilsCrossed, 
  Award, 
  Clock 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
            Rooted in Rajasthan
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#171513', marginBottom: '12px' }}>
            About Ghar Rasoi — Chef on Call
          </h1>
          <p className="hindi-text" style={{ fontSize: '1.2rem', color: '#C94B42', fontWeight: 600 }}>
            घर जैसा स्वाद, हर थाली में प्यार।
          </p>
        </div>

        <div className="card-solid" style={{ padding: '36px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#171513', marginBottom: '16px' }}>
            Our Story & Mission
          </h2>
          <p style={{ color: '#4A4641', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '20px' }}>
            Ghar Rasoi was born in Jaipur to solve a fundamental problem faced by modern households: the longing for genuine, nutritious, hygienic home-cooked meals without the daily strain of kitchen management or the unhealthiness of restaurant food delivery.
          </p>
          <p style={{ color: '#4A4641', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '20px' }}>
            Operating primarily out of our operations hub in <strong>Mansarovar, Jaipur</strong>, we bridge the gap between skilled local home chefs and families across Jaipur. Our chefs prepare food live in your kitchen, adhering strictly to your choice of cooking oils, spice levels, and religious food traditions (including pure vegetarian and strict Jain recipes).
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          <div className="card-solid" style={{ padding: '24px' }}>
            <ShieldCheck size={28} color="#C94B42" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Police & Identity Verified</h4>
            <p style={{ fontSize: '0.86rem', color: '#77716A', margin: 0 }}>
              Every chef in our roster undergoes document verification, culinary skill assessment, and sanitation checks.
            </p>
          </div>

          <div className="card-solid" style={{ padding: '24px' }}>
            <UtensilsCrossed size={28} color="#C94B42" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Your Kitchen Ingredients</h4>
            <p style={{ fontSize: '0.86rem', color: '#77716A', margin: 0 }}>
              You supply the groceries, oils, and spices. Complete transparency over what your family consumes.
            </p>
          </div>

          <div className="card-solid" style={{ padding: '24px' }}>
            <HeartHandshake size={28} color="#C94B42" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Punctual & Dependable</h4>
            <p style={{ fontSize: '0.86rem', color: '#77716A', margin: 0 }}>
              Fixed arrival slots, dedicated cooks for monthly contracts, and backup replacement guarantees.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/book')} className="btn btn-primary btn-lg">
            Experience Ghar Rasoi
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge badge-red" style={{ marginBottom: '10px' }}>
            Get in Touch
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#171513', marginBottom: '12px' }}>
            Contact Ghar Rasoi Jaipur
          </h1>
          <p style={{ color: '#77716A', fontSize: '1rem' }}>
            We're here to answer your questions and arrange the perfect home chef.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px'
        }}>
          {/* Direct Details */}
          <div className="card-solid" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#171513' }}>
              Jaipur Operational Hub
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={20} color="#C94B42" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong>Primary Service Hub:</strong>
                  <div style={{ fontSize: '0.88rem', color: '#4A4641' }}>
                    Mansarovar, Jaipur 302020, Rajasthan, India
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={20} color="#E9C66D" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Official Contact Phone:</strong>
                  <div>
                    <a href="tel:+916377100943" style={{ color: '#171513', fontWeight: 600 }}>
                      +91 6377100943
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={20} color="#E9C66D" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Support Email:</strong>
                  <div style={{ fontSize: '0.88rem', color: '#4A4641' }}>
                    support@gharrasoi.in
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Clock size={20} color="#77716A" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Operational Hours:</strong>
                  <div style={{ fontSize: '0.88rem', color: '#4A4641' }}>
                    07:00 AM – 10:00 PM (All 7 Days)
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20have%20an%20enquiry%20regarding%20home%20chef%20services."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%' }}
            >
              <MessageCircle size={18} /> Chat Directly on WhatsApp
            </a>
          </div>

          {/* Quick Contact Form */}
          <div className="card-solid" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#171513' }}>
              Send an Enquiry
            </h3>

            {submitted ? (
              <div style={{ backgroundColor: '#E8F5E9', padding: '20px', borderRadius: '8px', color: '#2E7D32', textAlign: 'center' }}>
                <strong>Message Sent!</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Our coordinator will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="form-group">
                  <label className="form-label">Your Name:*</label>
                  <input type="text" required className="form-control" placeholder="Gaurav Sharma" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number:*</label>
                  <input type="tel" required className="form-control" placeholder="6377100943" />
                </div>
                <div className="form-group">
                  <label className="form-label">Locality in Jaipur:</label>
                  <input type="text" className="form-control" placeholder="e.g. Mansarovar, Vaishali Nagar" />
                </div>
                <div className="form-group">
                  <label className="form-label">Requirements / Message:</label>
                  <textarea className="form-control" rows={3} placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const faqs = [
    {
      q: 'Do your chefs bring raw groceries or spices?',
      a: 'No. Ghar Rasoi charges exclusively for culinary preparation. Groceries, oil, salt, spices, vegetables, and gas are provided by the customer. This gives you 100% control over the quality, brand, and healthiness of the ingredients your family eats.'
    },
    {
      q: 'What is included in the Daily Trial Cook visit?',
      a: 'A 2-hour cooking session where the chef prepares 1 complete hot meal (Roti/Paratha, Sabzi, Dal, Rice, Salad) tailored to your spice level. The chef also cleans and wipes down the cooking counter after finishing.'
    },
    {
      q: 'How does the Monthly 26-Day plan work?',
      a: 'A dedicated, verified cook visits your home once (or twice for two-meal contracts) daily. The contract includes 26 days of cooking and 4 weekly offs. In case the chef takes emergency personal leave, our operations team arranges a backup replacement chef.'
    },
    {
      q: 'Where in Jaipur do you operate?',
      a: 'Our primary hub is Mansarovar (302020) where conveyance is ₹0. We also actively serve Vaishali Nagar, Malviya Nagar, C-Scheme, Raja Park, Jagatpura, Tonk Road, Vidhyadhar Nagar, and Civil Lines with a nominal conveyance fee of ₹150.'
    },
    {
      q: 'Can I book a chef for a party or celebration?',
      a: 'Yes! Our One-Day Party Chef package covers 10 to 25 guests for 5 to 7 hours of cooking at ₹3,500. You can also add kitchen helpers at ₹1,500 per helper.'
    },
    {
      q: 'Do you offer strict Jain cooking without onion and garlic?',
      a: 'Yes, absolutely. We have dedicated cooks trained in authentic Jain, Sattvic, and Marwari kitchen traditions who honor complete sanctity.'
    }
  ];

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
            Help & Information
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#171513', marginBottom: '12px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: '#77716A', fontSize: '1rem' }}>
            Clear, honest answers about our home chef booking process.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="card-solid" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#171513', marginBottom: '8px' }}>
                {faq.q}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4A4641', margin: 0, lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => (
  <div className="section section-cream" style={{ minHeight: '85vh' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="card-solid" style={{ padding: '36px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Privacy Policy</h1>
        <p style={{ color: '#77716A', fontSize: '0.9rem', marginBottom: '24px' }}>Last Updated: October 2026</p>
        <div style={{ color: '#4A4641', fontSize: '0.92rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>At Ghar Rasoi, we respect your personal privacy. We collect your contact number, home address, and culinary preferences solely for scheduling and dispatching verified home chefs in Jaipur.</p>
          <p>We do not sell, rent, or trade your personal information to third parties. Customer contact information is shared only with the assigned chef for the purpose of locating your residence and confirming arrival time.</p>
        </div>
      </div>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="section section-cream" style={{ minHeight: '85vh' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="card-solid" style={{ padding: '36px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Terms & Conditions</h1>
        <p style={{ color: '#77716A', fontSize: '0.9rem', marginBottom: '24px' }}>Last Updated: October 2026</p>
        <div style={{ color: '#4A4641', fontSize: '0.92rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p><strong>1. Nature of Service:</strong> Ghar Rasoi acts as a home-chef on call service platform. The fee charged covers chef culinary preparation and hygiene maintenance.</p>
          <p><strong>2. Customer Inclusions:</strong> All groceries, cooking oil, spices, LPG gas, cookware, and water are provided by the client.</p>
          <p><strong>3. Service Areas:</strong> Mansarovar, Jaipur is our primary hub with free conveyance. Other Jaipur zones are subject to configured conveyance charges.</p>
        </div>
      </div>
    </div>
  </div>
);
