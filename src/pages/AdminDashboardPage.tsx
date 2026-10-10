import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingStatus, Chef, MenuItem } from '../types';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Phone,
  MessageCircle,
  Search,
  Filter,
  Save,
  RotateCcw
} from 'lucide-react';

export const AdminDashboardPage: React.FC<{ subPage?: string }> = ({ subPage }) => {
  const { 
    bookings, 
    updateBookingStatus, 
    pricingConfig, 
    updatePricingConfig, 
    resetPricingConfig,
    chefs, 
    updateChef,
    menuItems, 
    updateMenuItem, 
    navigate 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'chefs' | 'pricing' | 'menu'>(
    (subPage as any) || 'overview'
  );

  // Booking filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Editing pricing local state
  const [editablePricing, setEditablePricing] = useState({ ...pricingConfig });
  const [pricingSavedMessage, setPricingSavedMessage] = useState(false);

  // Status options
  const statusOptions: BookingStatus[] = [
    'Draft',
    'Request Submitted',
    'Availability Checking',
    'Confirmed',
    'Cancelled'
  ];

  // Metrics
  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed')
    .reduce((acc, curr) => acc + curr.pricingSnapshot.totalAmount, 0);

  const pendingCount = bookings.filter(b => b.status === 'Request Submitted' || b.status === 'Availability Checking').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchId = b.id.toLowerCase().includes(q);
      const matchName = b.customerName.toLowerCase().includes(q);
      const matchPhone = b.customerPhone.includes(q);
      const matchLocality = b.locality.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchLocality) return false;
    }
    return true;
  });

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    updatePricingConfig(editablePricing);
    setPricingSavedMessage(true);
    setTimeout(() => setPricingSavedMessage(false), 3000);
  };

  return (
    <div className="section section-cream" style={{ minHeight: '85vh', paddingBottom: '80px' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{
          backgroundColor: '#171513',
          color: '#FFF8E9',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '3px solid #E9C66D'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E9C66D', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <ShieldCheck size={16} /> Operational Dispatch Portal
            </div>
            <h1 style={{ color: '#FFF8E9', fontSize: '1.85rem', margin: '4px 0' }}>
              Ghar Rasoi Jaipur Administration
            </h1>
            <p style={{ color: '#A39B92', fontSize: '0.86rem', margin: 0 }}>
              Mansarovar Operations Center • Real-Time Booking Management & Central Pricing Configuration
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/')} className="btn btn-sm btn-outline-light">
              ← Public Site
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid #E6E0D6',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '📊 Dashboard Overview' },
            { id: 'bookings', label: `📋 Bookings (${bookings.length})` },
            { id: 'pricing', label: '💰 Central Pricing Config' },
            { id: 'chefs', label: `👨‍🍳 Chefs Management (${chefs.length})` },
            { id: 'menu', label: `🍲 Menu Showcase (${menuItems.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 20px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #C94B42' : '3px solid transparent',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#C94B42' : '#171513',
                cursor: 'pointer',
                fontSize: '0.94rem',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div className="card-solid" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#77716A', fontWeight: 600, textTransform: 'uppercase' }}>
                  Total Booking Requests
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#171513', margin: '6px 0' }}>
                  {bookings.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#2E7D32' }}>
                  All-time received in Jaipur
                </div>
              </div>

              <div className="card-solid" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#77716A', fontWeight: 600, textTransform: 'uppercase' }}>
                  Pending Verification
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ED6C02', margin: '6px 0' }}>
                  {pendingCount}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#77716A' }}>
                  Awaiting chef allocation
                </div>
              </div>

              <div className="card-solid" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#77716A', fontWeight: 600, textTransform: 'uppercase' }}>
                  Confirmed Bookings
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#2E7D32', margin: '6px 0' }}>
                  {confirmedCount}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#2E7D32' }}>
                  Active chef visits scheduled
                </div>
              </div>

              <div className="card-solid" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#77716A', fontWeight: 600, textTransform: 'uppercase' }}>
                  Confirmed Booking Revenue
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#C94B42', margin: '6px 0' }}>
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#77716A' }}>
                  Excludes grocery supplies
                </div>
              </div>
            </div>

            {/* Recent Bookings Quick Table */}
            <div className="card-solid" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#171513', margin: 0 }}>
                  Recent Booking Requests
                </h3>
                <button onClick={() => setActiveTab('bookings')} className="btn btn-sm btn-outline-dark">
                  View All ({bookings.length})
                </button>
              </div>

              <div className="table-responsive">
                <table className="solid-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Customer</th>
                      <th>Service Package</th>
                      <th>Date</th>
                      <th>Locality</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id}>
                        <td><strong>{b.id}</strong></td>
                        <td>
                          <div><strong>{b.customerName}</strong></div>
                          <div style={{ fontSize: '0.78rem', color: '#77716A' }}>{b.customerPhone}</div>
                        </td>
                        <td>{b.packageName}</td>
                        <td>{b.date}</td>
                        <td>{b.locality}</td>
                        <td><strong>₹{b.pricingSnapshot.totalAmount.toLocaleString('en-IN')}</strong></td>
                        <td>
                          <span className={`badge ${
                            b.status === 'Confirmed' ? 'badge-success' :
                            b.status === 'Availability Checking' ? 'badge-warning' :
                            b.status === 'Request Submitted' ? 'badge-gold' : 'badge-dark'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div>
            {/* Filter & Search Bar */}
            <div className="card-solid" style={{ padding: '18px 24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by ID, name, phone, or locality..."
                    className="form-control"
                    style={{ paddingLeft: '34px' }}
                  />
                  <Search size={16} color="#77716A" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#77716A', fontWeight: 600 }}>Filter Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-control form-select"
                    style={{ width: '200px' }}
                  >
                    <option value="all">All Statuses ({bookings.length})</option>
                    {statusOptions.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bookings List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {filteredBookings.map((b) => (
                <div key={b.id} className="card-solid" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#171513' }}>
                          Ref #{b.id}
                        </span>
                        <span className={`badge ${
                          b.status === 'Confirmed' ? 'badge-success' :
                          b.status === 'Availability Checking' ? 'badge-warning' :
                          b.status === 'Request Submitted' ? 'badge-gold' : 'badge-dark'
                        }`}>
                          {b.status}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#77716A' }}>
                          Submitted: {new Date(b.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', color: '#C94B42', margin: '4px 0' }}>
                        {b.packageName}
                      </h3>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#77716A' }}>Live Frozen Snapshot</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#171513' }}>
                        ₹{b.pricingSnapshot.totalAmount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '12px',
                    fontSize: '0.85rem',
                    backgroundColor: '#FAF4E6',
                    padding: '14px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <span style={{ color: '#77716A' }}>Customer Name:</span><br />
                      <strong>{b.customerName}</strong> (<a href={`tel:${b.customerPhone}`} style={{ color: '#C94B42', textDecoration: 'underline' }}>{b.customerPhone}</a>)
                    </div>
                    <div>
                      <span style={{ color: '#77716A' }}>Schedule:</span><br />
                      <strong>📅 {b.date} • {b.timeSlot}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#77716A' }}>Address:</span><br />
                      <strong>📍 {b.address}, {b.locality}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#77716A' }}>Dietary & Cuisines:</span><br />
                      <strong>{b.foodType} ({b.cuisines?.join(', ')})</strong>
                    </div>
                  </div>

                  {/* Operational Controls: Status Changer & Chef Assignment */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '16px',
                    paddingTop: '14px',
                    borderTop: '1px solid #E6E0D6',
                    alignItems: 'center'
                  }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Update Booking Status:</label>
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                        className="form-control form-select"
                        style={{ padding: '8px 12px', fontSize: '0.86rem' }}
                      >
                        {statusOptions.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Assign Local Jaipur Chef:</label>
                      <select
                        value={b.assignedChefId || ''}
                        onChange={(e) => updateBookingStatus(b.id, b.status, b.adminNotes, e.target.value)}
                        className="form-control form-select"
                        style={{ padding: '8px 12px', fontSize: '0.86rem' }}
                      >
                        <option value="">-- Unassigned --</option>
                        {chefs.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.serviceAreas[0]})</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
                      <a
                        href={`https://wa.me/91${b.customerPhone}?text=Namaste%20${encodeURIComponent(b.customerName)},%20this%20is%20Ghar%20Rasoi%20regarding%20booking%20${b.id}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-whatsapp"
                      >
                        <MessageCircle size={14} /> WhatsApp Customer
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CENTRAL PRICING CONFIGURATION */}
        {activeTab === 'pricing' && (
          <div className="card-solid" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
                  Single Source of Truth
                </span>
                <h3 style={{ fontSize: '1.6rem', color: '#171513', margin: '4px 0' }}>
                  Central Pricing Configuration
                </h3>
                <p style={{ color: '#77716A', fontSize: '0.88rem', margin: 0 }}>
                  Editing these rates immediately updates the website rate cards, Smart Matcher, AI Chatbot, and Booking Wizard across the entire platform.
                </p>
              </div>

              <button
                type="button"
                onClick={resetPricingConfig}
                className="btn btn-sm btn-outline-dark"
              >
                <RotateCcw size={14} /> Reset to Poster Defaults
              </button>
            </div>

            {pricingSavedMessage && (
              <div style={{
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                padding: '12px 18px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={18} /> Central pricing synchronized successfully!
              </div>
            )}

            <form onSubmit={handleSavePricing}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '28px'
              }}>
                {/* Daily Small */}
                <div style={{ backgroundColor: '#FAF4E6', padding: '18px', borderRadius: '10px', border: '1px solid #E6E0D6' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#171513' }}>Daily Trial (2–4 People)</h4>
                  <div className="form-group">
                    <label className="form-label">Price per visit (₹):</label>
                    <input
                      type="number"
                      value={editablePricing.dailyTrialSmall.price}
                      onChange={(e) => setEditablePricing({
                        ...editablePricing,
                        dailyTrialSmall: { ...editablePricing.dailyTrialSmall, price: parseInt(e.target.value) || 0 }
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Daily Large */}
                <div style={{ backgroundColor: '#FAF4E6', padding: '18px', borderRadius: '10px', border: '1px solid #E6E0D6' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#171513' }}>Daily Trial (5–8 People)</h4>
                  <div className="form-group">
                    <label className="form-label">Price per visit (₹):</label>
                    <input
                      type="number"
                      value={editablePricing.dailyTrialLarge.price}
                      onChange={(e) => setEditablePricing({
                        ...editablePricing,
                        dailyTrialLarge: { ...editablePricing.dailyTrialLarge, price: parseInt(e.target.value) || 0 }
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Monthly Single Small */}
                <div style={{ backgroundColor: '#FAF4E6', padding: '18px', borderRadius: '10px', border: '1px solid #E6E0D6' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#171513' }}>Monthly 1-Time (2–4 People, 26 Days)</h4>
                  <div className="form-group">
                    <label className="form-label">Price per month (₹):</label>
                    <input
                      type="number"
                      value={editablePricing.monthlySingleSmall.price}
                      onChange={(e) => setEditablePricing({
                        ...editablePricing,
                        monthlySingleSmall: { ...editablePricing.monthlySingleSmall, price: parseInt(e.target.value) || 0 }
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Monthly Single Large */}
                <div style={{ backgroundColor: '#FAF4E6', padding: '18px', borderRadius: '10px', border: '1px solid #E6E0D6' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#171513' }}>Monthly 1-Time (6+2 Vyakti, 26 Days)</h4>
                  <div className="form-group">
                    <label className="form-label">Price per month (₹):</label>
                    <input
                      type="number"
                      value={editablePricing.monthlySingleLarge.price}
                      onChange={(e) => setEditablePricing({
                        ...editablePricing,
                        monthlySingleLarge: { ...editablePricing.monthlySingleLarge, price: parseInt(e.target.value) || 0 }
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Party Chef Base */}
                <div style={{ backgroundColor: '#FAF4E6', padding: '18px', borderRadius: '10px', border: '1px solid #E6E0D6' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#171513' }}>One-Day Party Chef (10–25 Guests)</h4>
                  <div className="form-group">
                    <label className="form-label">Base Fee (₹):</label>
                    <input
                      type="number"
                      value={editablePricing.partyChefBase}
                      onChange={(e) => setEditablePricing({
                        ...editablePricing,
                        partyChefBase: parseInt(e.target.value) || 0
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Party Helper Fee */}
                <div style={{ backgroundColor: '#FAF4E6', padding: '18px', borderRadius: '10px', border: '1px solid #E6E0D6' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#171513' }}>Optional Party Helper Fee</h4>
                  <div className="form-group">
                    <label className="form-label">Fee per helper (₹):</label>
                    <input
                      type="number"
                      value={editablePricing.partyHelperFee}
                      onChange={(e) => setEditablePricing({
                        ...editablePricing,
                        partyHelperFee: parseInt(e.target.value) || 0
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Conveyance outside Mansarovar */}
                <div style={{ backgroundColor: '#FAF4E6', padding: '18px', borderRadius: '10px', border: '1px solid #E6E0D6' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#171513' }}>Conveyance Outside Mansarovar</h4>
                  <div className="form-group">
                    <label className="form-label">Fee (₹):</label>
                    <input
                      type="number"
                      value={editablePricing.outsideMansarovarConveyance}
                      onChange={(e) => setEditablePricing({
                        ...editablePricing,
                        outsideMansarovarConveyance: parseInt(e.target.value) || 0
                      })}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary btn-lg">
                  <Save size={18} /> Save & Deploy Live Pricing
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: CHEFS MANAGEMENT */}
        {activeTab === 'chefs' && (
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Chef Roster & Status</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {chefs.map((chef) => (
                <div key={chef.id} className="card-solid" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '12px' }}>
                    <img src={chef.avatar} alt={chef.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '1.05rem', margin: 0 }}>{chef.name}</h4>
                      <div style={{ fontSize: '0.78rem', color: '#77716A' }}>{chef.experienceYears} Years Exp • ⭐ {chef.rating}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#4A4641', marginBottom: '14px' }}>
                    <div><strong>Specialties:</strong> {chef.specialties.slice(0, 2).join(', ')}</div>
                    <div><strong>Localities:</strong> {chef.serviceAreas.join(', ')}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #E6E0D6' }}>
                    <button
                      type="button"
                      onClick={() => updateChef({ ...chef, isAvailableToday: !chef.isAvailableToday })}
                      className={`btn btn-sm ${chef.isAvailableToday ? 'btn-outline-dark' : 'btn-secondary'}`}
                      style={{ fontSize: '0.78rem' }}
                    >
                      {chef.isAvailableToday ? '🟢 Available Today' : '🔴 On Leave'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MENU SHOWCASE */}
        {activeTab === 'menu' && (
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Menu Platters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {menuItems.map((item) => (
                <div key={item.id} className="card-solid" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '1.05rem', margin: 0 }}>{item.name}</h4>
                    <span style={{ fontWeight: 800, color: '#C94B42' }}>₹{item.price}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#77716A', marginBottom: '10px' }}>{item.description}</p>
                  <div style={{ fontSize: '0.78rem', color: '#4A4641' }}>
                    <strong>Items:</strong> {item.dishesIncluded.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
