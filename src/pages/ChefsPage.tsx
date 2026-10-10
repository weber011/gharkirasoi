import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChefCard } from '../components/ChefCard';
import { ChefModal } from '../components/ChefModal';
import { Chef } from '../types';
import { JAIPUR_LOCALITIES } from '../data/pricing';
import { ShieldCheck, Search, Filter, Info, Users } from 'lucide-react';

export const ChefsPage: React.FC = () => {
  const { chefs } = useApp();
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  // Filters
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [cuisineFilter, setCuisineFilter] = useState<string>('all');
  const [localityFilter, setLocalityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChefs = chefs.filter((chef) => {
    // Service filter
    if (serviceFilter !== 'all' && !chef.serviceTypes.includes(serviceFilter as any)) {
      return false;
    }
    // Cuisine filter
    if (cuisineFilter !== 'all' && !chef.cuisines.includes(cuisineFilter)) {
      return false;
    }
    // Locality filter
    if (localityFilter !== 'all' && !chef.serviceAreas.includes(localityFilter)) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = chef.name.toLowerCase().includes(q);
      const matchSpecialty = chef.specialties.some(s => s.toLowerCase().includes(q));
      const matchCuisine = chef.cuisines.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchSpecialty && !matchCuisine) return false;
    }
    return true;
  });

  return (
    <div className="section section-cream" style={{ minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <span className="badge badge-red" style={{ marginBottom: '10px' }}>
            Verified Jaipur Culinary Partners
          </span>
          <h1 style={{ fontSize: '2.4rem', color: '#171513', marginBottom: '12px' }}>
            Find Your Home Cook in Jaipur
          </h1>
          <p style={{ color: '#77716A', fontSize: '1rem', lineHeight: 1.6 }}>
            Browse verified cooks specializing in authentic Rajasthani, Marwari, Jain, and homestyle North Indian food.
          </p>
        </div>

        {/* Development Disclosure Notice */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E0D6',
          borderRadius: '10px',
          padding: '14px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          maxWidth: '820px',
          margin: '0 auto 32px'
        }}>
          <ShieldCheck size={20} color="#2E7D32" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.84rem', color: '#4A4641', lineHeight: 1.5 }}>
            <strong>Integrity Notice:</strong> The profiles below represent vetted chef archetypes operating in Mansarovar, Vaishali Nagar, and core Jaipur to demonstrate live allocation and scheduling.
          </div>
        </div>

        {/* Filters Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E6E0D6',
          padding: '20px',
          marginBottom: '36px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Search */}
            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Search by Name or Specialty:</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Ramesh, Dal Baati, Jain..."
                  className="form-control"
                  style={{ paddingLeft: '34px' }}
                />
                <Search size={16} color="#77716A" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Service Type:</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="form-control form-select"
              >
                <option value="all">All Service Types</option>
                <option value="daily">Daily Cook (Trial)</option>
                <option value="monthly">Monthly Cook</option>
                <option value="party">Party & Event Chef</option>
              </select>
            </div>

            {/* Cuisine */}
            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Cuisine:</label>
              <select
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
                className="form-control form-select"
              >
                <option value="all">All Cuisines</option>
                <option value="Rajasthani">Rajasthani</option>
                <option value="North Indian">North Indian</option>
                <option value="Jain">Jain (No Onion Garlic)</option>
                <option value="Punjabi">Punjabi</option>
                <option value="South Indian">South Indian</option>
              </select>
            </div>

            {/* Locality */}
            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Jaipur Locality:</label>
              <select
                value={localityFilter}
                onChange={(e) => setLocalityFilter(e.target.value)}
                className="form-control form-select"
              >
                <option value="all">All Jaipur Localities</option>
                {JAIPUR_LOCALITIES.map((loc) => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Chefs Grid */}
        {filteredChefs.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #E6E0D6'
          }}>
            <Users size={40} color="#77716A" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#171513', marginBottom: '8px' }}>
              No Chefs Match Your Filter Criteria
            </h3>
            <p style={{ color: '#77716A', fontSize: '0.9rem', marginBottom: '16px' }}>
              Try resetting your filters or request a custom chef match via WhatsApp.
            </p>
            <button
              onClick={() => {
                setServiceFilter('all');
                setCuisineFilter('all');
                setLocalityFilter('all');
                setSearchQuery('');
              }}
              className="btn btn-outline-dark"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}>
            {filteredChefs.map((chef) => (
              <ChefCard key={chef.id} chef={chef} onOpenDetails={setSelectedChef} />
            ))}
          </div>
        )}
      </div>

      {/* Chef Modal */}
      <ChefModal chef={selectedChef} onClose={() => setSelectedChef(null)} />
    </div>
  );
};
