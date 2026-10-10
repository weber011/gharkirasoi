import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { checkJaipurServiceArea, JAIPUR_LOCALITIES } from '../data/pricing';

export const JaipurServiceChecker: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ReturnType<typeof checkJaipurServiceArea> | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setResult(checkJaipurServiceArea(query));
  };

  const handleSelectTag = (name: string) => {
    setQuery(name);
    setResult(checkJaipurServiceArea(name));
  };

  return (
    <div style={{
      backgroundColor: '#FAF4E6',
      border: '1px solid #E6E0D6',
      borderRadius: '16px',
      padding: '32px 24px',
      boxShadow: 'var(--shadow-card)'
    }} id="service-area-checker">
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E0D6',
          borderRadius: '9999px',
          padding: '4px 12px',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#C94B42',
          marginBottom: '14px'
        }}>
          <MapPin size={14} />
          <span>Jaipur Locality & Pincode Checker</span>
        </div>

        <h3 style={{ fontSize: '1.6rem', marginBottom: '8px', color: '#171513' }}>
          Check Chef Availability in Your Jaipur Area
        </h3>
        <p style={{ fontSize: '0.92rem', color: '#77716A', marginBottom: '22px' }}>
          Our primary operations hub is based in <strong>Mansarovar (302020)</strong>. Enter your colony or pincode below to check instant coverage:
        </p>

        {/* Input Form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '16px', maxWidth: '520px', margin: '0 auto 16px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter e.g. Mansarovar, Vaishali Nagar, 302020..."
            className="form-control"
            style={{ padding: '12px 16px' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 20px' }}>
            <Search size={18} /> Check
          </button>
        </form>

        {/* Popular Tags */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: '#77716A' }}>Quick checks:</span>
          {['Mansarovar', 'Vaishali Nagar', 'Malviya Nagar', 'C-Scheme', 'Raja Park', 'Tonk Road'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSelectTag(tag)}
              style={{
                fontSize: '0.76rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D6',
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: 'pointer',
                color: '#171513'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Result Feedback */}
        {result && (
          <div style={{
            backgroundColor: result.covered ? '#FFFFFF' : '#FFF9F8',
            border: result.covered ? '2px solid #2E7D32' : '2px solid #C94B42',
            borderRadius: '12px',
            padding: '18px',
            textAlign: 'left',
            marginTop: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              {result.covered ? (
                <CheckCircle2 size={24} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <AlertCircle size={24} color="#C94B42" style={{ flexShrink: 0, marginTop: '2px' }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#171513', marginBottom: '4px' }}>
                  {result.covered ? 'Active Service Area' : 'Custom Coverage Request'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#4A4641', lineHeight: 1.5, marginBottom: '8px' }}>
                  {result.note}
                </div>
                {result.locality && (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#77716A' }}>
                    <span>Pincode: <strong>{result.locality.pincode}</strong></span>
                    <span>•</span>
                    <span>Proximity: <strong>{result.locality.hubDistance}</strong></span>
                    <span>•</span>
                    <span>Response Time: <strong>{result.locality.deliveryTimeEstimate}</strong></span>
                  </div>
                )}
                {!result.covered && (
                  <a
                    href={`https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20I%20am%20looking%20for%20chef%20service%20in%20${encodeURIComponent(query)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-whatsapp"
                    style={{ marginTop: '8px' }}
                  >
                    <Phone size={14} /> Request Chef in Your Area via WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
