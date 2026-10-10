import React from 'react';
import { useApp } from './context/AppContext';
import { DemoBanner } from './components/DemoBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { MenuPage } from './pages/MenuPage';
import { ChefsPage } from './pages/ChefsPage';
import { BookingWizard } from './pages/BookingWizard';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { 
  AboutPage, 
  ContactPage, 
  FaqPage, 
  PrivacyPage, 
  TermsPage 
} from './pages/StaticPages';
import { UtensilsCrossed, ArrowLeft } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentRoute, navigate } = useApp();

  const renderRoute = () => {
    // Normalize route
    const r = currentRoute.split('?')[0].replace(/\/$/, '') || '/';

    if (r === '/') return <HomePage />;
    if (r === '/services') return <ServicesPage />;
    if (r === '/services/daily-cook') return <ServicesPage subService="daily-cook" />;
    if (r === '/services/monthly-cook') return <ServicesPage subService="monthly-cook" />;
    if (r === '/services/party-chef') return <ServicesPage subService="party-chef" />;
    if (r === '/pricing') return <PricingPage />;
    if (r === '/menu') return <MenuPage />;
    if (r === '/chefs' || r.startsWith('/chefs/')) return <ChefsPage />;
    if (r === '/book' || r.startsWith('/book/')) return <BookingWizard />;
    
    // Account routes
    if (r === '/account') return <CustomerAccountPage subTab="bookings" />;
    if (r === '/account/bookings') return <CustomerAccountPage subTab="bookings" />;
    if (r === '/account/preferences') return <CustomerAccountPage subTab="preferences" />;
    if (r === '/account/addresses') return <CustomerAccountPage subTab="addresses" />;
    if (r === '/account/favourites') return <CustomerAccountPage subTab="favourites" />;

    // Admin routes
    if (r === '/admin') return <AdminDashboardPage subPage="overview" />;
    if (r === '/admin/bookings') return <AdminDashboardPage subPage="bookings" />;
    if (r === '/admin/chefs') return <AdminDashboardPage subPage="chefs" />;
    if (r === '/admin/pricing') return <AdminDashboardPage subPage="pricing" />;
    if (r === '/admin/services' || r === '/admin/customers' || r === '/admin/analytics') {
      return <AdminDashboardPage subPage="overview" />;
    }

    // Static pages
    if (r === '/about') return <AboutPage />;
    if (r === '/contact') return <ContactPage />;
    if (r === '/faq') return <FaqPage />;
    if (r === '/privacy') return <PrivacyPage />;
    if (r === '/terms') return <TermsPage />;

    // 404 Fallback
    return (
      <div className="section section-cream" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '540px' }}>
          <div className="card-solid" style={{ padding: '48px 32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#FAF4E6',
              color: '#C94B42',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <UtensilsCrossed size={32} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#171513', marginBottom: '8px' }}>
              Page Not Found
            </h2>
            <p style={{ color: '#77716A', fontSize: '0.92rem', marginBottom: '24px' }}>
              The page you requested ({currentRoute}) does not exist or may have moved.
            </p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              <ArrowLeft size={16} /> Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DemoBanner />
      <Header />
      <main style={{ flex: 1 }}>
        {renderRoute()}
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};
