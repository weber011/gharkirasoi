import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  MapPin, 
  Heart, 
  Calendar, 
  Clock, 
  Settings, 
  Plus, 
  Trash2, 
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CustomerAccountPage: React.FC<{ subTab?: string }> = ({ subTab }) => {
  const { customerProfile, updateCustomerProfile, bookings, chefs, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'bookings' | 'preferences' | 'addresses' | 'favourites'>(
    (subTab as any) || 'bookings'
  );

  // Address add modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newLocality, setNewLocality] = useState('Mansarovar');
  const [newPincode, setNewPincode] = useState('302020');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim() || !newTitle.trim()) return;

    const newAddr = {
      id: `addr-${Date.now()}`,
      title: newTitle,
      fullAddress: newAddress,
      locality: newLocality,
      pincode: newPincode
    };

    updateCustomerProfile({
      savedAddresses: [...customerProfile.savedAddresses, newAddr]
    });

    setNewTitle('');
    setNewAddress('');
    setShowAddressModal(false);
  };

  const handleRemoveAddress = (id: string) => {
    updateCustomerProfile({
      savedAddresses: customerProfile.savedAddresses.filter(a => a.id !== id)
    });
  };

  const favChefs = chefs.filter(c => customerProfile.favouriteChefIds.includes(c.id));

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Profile Header */}
        <div className="card-solid" style={{ padding: '28px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#171513',
                color: '#E9C66D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 800
              }}>
                {customerProfile.name.charAt(0)}
              </div>
              <div>
                <h1 style={{ fontSize: '1.75rem', color: '#171513', margin: 0 }}>
                  {customerProfile.name}
                </h1>
                <div style={{ fontSize: '0.86rem', color: '#77716A', display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <span>📱 +91 {customerProfile.phone}</span>
                  <span>•</span>
                  <span>📍 Mansarovar, Jaipur</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/book')} className="btn btn-primary">
              Book New Chef <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Account Nav Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #E6E0D6',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'bookings', label: `My Bookings (${bookings.length})` },
            { id: 'preferences', label: 'Dietary Preferences' },
            { id: 'addresses', label: `Saved Addresses (${customerProfile.savedAddresses.length})` },
            { id: 'favourites', label: `Favourite Chefs (${favChefs.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 18px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #C94B42' : '3px solid transparent',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#C94B42' : '#171513',
                cursor: 'pointer',
                fontSize: '0.92rem',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {bookings.length === 0 ? (
              <div className="card-solid" style={{ padding: '48px', textAlign: 'center' }}>
                <Calendar size={36} color="#77716A" style={{ margin: '0 auto 12px' }} />
                <h3>No Bookings Found</h3>
                <p style={{ color: '#77716A', marginBottom: '16px' }}>You haven't requested any chef appointments yet.</p>
                <button onClick={() => navigate('/book')} className="btn btn-primary">Book a Chef Now</button>
              </div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="card-solid" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#171513' }}>
                          Ref #{b.id}
                        </span>
                        <span className={`badge ${
                          b.status === 'Confirmed' ? 'badge-success' :
                          b.status === 'Availability Checking' ? 'badge-warning' :
                          b.status === 'Request Submitted' ? 'badge-gold' : 'badge-dark'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#C94B42' }}>
                        {b.packageName}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#77716A' }}>Snapshot Rate</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#171513' }}>
                        ₹{b.pricingSnapshot.totalAmount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    fontSize: '0.85rem',
                    color: '#4A4641',
                    backgroundColor: '#FAF4E6',
                    padding: '14px',
                    borderRadius: '8px',
                    marginBottom: '14px'
                  }}>
                    <div>
                      <span style={{ color: '#77716A' }}>Scheduled Date & Time:</span><br />
                      <strong>📅 {b.date} • {b.timeSlot}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#77716A' }}>Jaipur Location:</span><br />
                      <strong>📍 {b.address}, {b.locality}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#77716A' }}>Dietary & Guests:</span><br />
                      <strong>🥗 {b.foodType} ({b.peopleCount} Members)</strong>
                    </div>
                    <div>
                      <span style={{ color: '#77716A' }}>Assigned Chef:</span><br />
                      <strong>{b.assignedChefId ? chefs.find(c => c.id === b.assignedChefId)?.name : 'Pending Allocation'}</strong>
                    </div>
                  </div>

                  {b.adminNotes && (
                    <div style={{ fontSize: '0.8rem', color: '#77716A', marginBottom: '12px', fontStyle: 'italic' }}>
                      Operations Note: {b.adminNotes}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <a
                      href={`https://wa.me/916377100943?text=Namaste%20Ghar%20Rasoi,%20inquiring%20about%20booking%20ref%20${b.id}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-whatsapp"
                    >
                      <MessageCircle size={14} /> WhatsApp Support
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PREFERENCES */}
        {activeTab === 'preferences' && (
          <div className="card-solid" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Saved Cooking Preferences</h3>
            <p style={{ fontSize: '0.88rem', color: '#77716A', marginBottom: '24px' }}>
              These rules are automatically passed to matched chefs whenever you book.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Primary Dietary Rule:</label>
                <select
                  value={customerProfile.preferences.dietary}
                  onChange={(e) => updateCustomerProfile({
                    preferences: { ...customerProfile.preferences, dietary: e.target.value }
                  })}
                  className="form-control form-select"
                >
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Jain (No Onion Garlic)">Jain (No Onion, No Garlic)</option>
                  <option value="Veg + Egg">Veg + Egg</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Spice Level:</label>
                <select
                  value={customerProfile.preferences.spiceLevel}
                  onChange={(e) => updateCustomerProfile({
                    preferences: { ...customerProfile.preferences, spiceLevel: e.target.value }
                  })}
                  className="form-control form-select"
                >
                  <option value="Mild">Mild (Kids & Seniors)</option>
                  <option value="Medium">Medium (Balanced)</option>
                  <option value="Spicy">Spicy (Authentic Rajasthani)</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} />
              <span>Preferences automatically saved to your profile</span>
            </div>
          </div>
        )}

        {/* TAB 3: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Saved Jaipur Kitchen Addresses</h3>
              <button onClick={() => setShowAddressModal(true)} className="btn btn-sm btn-primary">
                <Plus size={14} /> Add New Address
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {customerProfile.savedAddresses.map((addr) => (
                <div key={addr.id} className="card-solid" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#171513' }}>{addr.title}</div>
                    <button
                      onClick={() => handleRemoveAddress(addr.id)}
                      style={{ background: 'none', border: 'none', color: '#C94B42', cursor: 'pointer' }}
                      title="Delete address"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#4A4641', marginBottom: '8px' }}>{addr.fullAddress}</p>
                  <div style={{ fontSize: '0.8rem', color: '#77716A' }}>
                    📍 {addr.locality}, Jaipur ({addr.pincode})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FAVOURITE CHEFS */}
        {activeTab === 'favourites' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Preferred Jaipur Chefs</h3>
            {favChefs.length === 0 ? (
              <div className="card-solid" style={{ padding: '40px', textAlign: 'center' }}>
                <Heart size={32} color="#77716A" style={{ margin: '0 auto 8px' }} />
                <p style={{ color: '#77716A' }}>No favorite chefs bookmarked yet.</p>
                <button onClick={() => navigate('/chefs')} className="btn btn-outline-dark">Browse Chefs</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {favChefs.map((chef) => (
                  <div key={chef.id} className="card-solid" style={{ padding: '18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={chef.avatar} alt={chef.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#171513' }}>{chef.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#77716A' }}>{chef.experienceYears} Years • {chef.serviceAreas[0]}</div>
                      <button
                        onClick={() => {
                          navigate('/book');
                        }}
                        className="btn btn-sm btn-outline-dark"
                        style={{ marginTop: '8px', fontSize: '0.75rem', padding: '4px 8px' }}
                      >
                        Book Chef
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Address Modal */}
        {showAddressModal && (
          <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Add New Kitchen Address</h3>
              <form onSubmit={handleAddAddress}>
                <div className="form-group">
                  <label className="form-label">Address Label (e.g. Home, Parents, Farmhouse):</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="form-control"
                    placeholder="e.g. Mansarovar Home"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Address / Flat / Plot:</label>
                  <textarea
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    required
                    className="form-control"
                    rows={3}
                    placeholder="e.g. Plot 24, Kaveri Path, Mansarovar"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Locality:</label>
                    <input
                      type="text"
                      value={newLocality}
                      onChange={(e) => setNewLocality(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pincode:</label>
                    <input
                      type="text"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button type="button" onClick={() => setShowAddressModal(false)} className="btn btn-outline-dark">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
