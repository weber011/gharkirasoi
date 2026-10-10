import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CentralPricingConfig, 
  BookingRequest, 
  Chef, 
  MenuItem, 
  CustomerProfile 
} from '../types';
import { INITIAL_PRICING_CONFIG } from '../data/pricing';
import { INITIAL_CHEFS } from '../data/chefs';
import { INITIAL_MENU_ITEMS } from '../data/menu';

const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'GR-2026-1042',
    createdAt: '2026-10-09T14:30:00Z',
    serviceType: 'daily-cook',
    packageName: 'Daily Trial Visit (2–4 People)',
    status: 'Confirmed',
    peopleCount: 4,
    date: '2026-10-12',
    timeSlot: '07:30 PM - 09:30 PM (Dinner)',
    durationHours: 2,
    frequency: 'Once',
    address: 'Plot 42, Ward 27, Sector 3, Mansarovar',
    locality: 'Mansarovar',
    pincode: '302020',
    landmark: 'Near Galaxy Cinema',
    foodType: 'Pure Veg',
    cuisines: ['Rajasthani', 'North Indian'],
    spiceLevel: 'Medium',
    customerName: 'Pooja Agarwal',
    customerPhone: '9829012345',
    customerEmail: 'pooja.agarwal@example.com',
    preferredContact: 'WhatsApp',
    pricingSnapshot: {
      baseAmount: 499,
      conveyanceAmount: 0,
      totalAmount: 499,
      isCustomQuote: false,
      breakdown: [
        'Daily Trial (2–4 people): ₹499',
        'Conveyance: ₹0 (Mansarovar Hub)',
        'Groceries & Gas: Supplied by customer'
      ]
    },
    assignedChefId: 'chef-ramesh-sharma',
    adminNotes: 'Assigned Chef Ramesh Sharma. Verified phone contact via WhatsApp.'
  },
  {
    id: 'GR-2026-1043',
    createdAt: '2026-10-10T09:15:00Z',
    serviceType: 'monthly-cook',
    packageName: 'Monthly 1-Time Cooking (26 Days)',
    status: 'Availability Checking',
    peopleCount: 3,
    date: '2026-10-15',
    timeSlot: '07:00 AM - 08:30 AM (Breakfast & Lunch Prep)',
    frequency: '1 Meal/Day',
    startDate: '2026-10-15',
    address: 'B-14, Vaishali Heights, Amrapali Marg',
    locality: 'Vaishali Nagar',
    pincode: '302021',
    foodType: 'Jain (No Onion Garlic)',
    cuisines: ['Jain', 'North Indian'],
    spiceLevel: 'Mild',
    customerName: 'Kunal Jain',
    customerPhone: '9414098765',
    preferredContact: 'WhatsApp',
    pricingSnapshot: {
      baseAmount: 7999,
      conveyanceAmount: 150,
      totalAmount: 8149,
      isCustomQuote: false,
      breakdown: [
        'Monthly 1-Time Cooking (2–4 people, 26 days): ₹7999',
        'Conveyance Charge (Vaishali Nagar): ₹150',
        'Groceries & Gas: Supplied by customer'
      ]
    },
    assignedChefId: 'chef-sunita-devi',
    adminNotes: 'Checking Chef Sunita morning availability for Jain cooking.'
  },
  {
    id: 'GR-2026-1044',
    createdAt: '2026-10-10T11:45:00Z',
    serviceType: 'party-chef',
    packageName: 'One-Day Party Chef (1 Chef, 5–7 hrs)',
    status: 'Request Submitted',
    peopleCount: 22,
    date: '2026-10-24',
    timeSlot: '04:00 PM - 10:00 PM (Dinner Party)',
    chefCount: 1,
    helperCount: 1,
    occasion: 'Daughter\'s 10th Birthday Celebration',
    address: 'House 88, Near Central Park, C-Scheme',
    locality: 'C-Scheme',
    pincode: '302001',
    foodType: 'Pure Veg',
    cuisines: ['North Indian', 'Punjabi'],
    spiceLevel: 'Medium',
    customerName: 'Rajesh Meena',
    customerPhone: '9783112233',
    preferredContact: 'Phone Call',
    pricingSnapshot: {
      baseAmount: 3500,
      helperAmount: 1500,
      conveyanceAmount: 150,
      totalAmount: 5150,
      isCustomQuote: false,
      breakdown: [
        'Party Chef Base (1 chef, 10–25 guests): ₹3500',
        'Optional Helper (1 × ₹1500): ₹1500',
        'Conveyance Charge (C-Scheme): ₹150',
        'Groceries & Gas: Supplied by customer'
      ]
    },
    adminNotes: 'High priority event. Follow-up needed for starter menu details.'
  }
];

const INITIAL_CUSTOMER: CustomerProfile = {
  id: 'cust-alex-demo',
  name: 'Gaurav Sharma',
  phone: '6377100943',
  email: 'gaurav.sharma@example.com',
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Home (Mansarovar)',
      fullAddress: 'Plot 104, Madhyam Marg, Sector 5, Mansarovar',
      locality: 'Mansarovar',
      pincode: '302020'
    },
    {
      id: 'addr-2',
      title: 'Office / Studio',
      fullAddress: 'A-22, Queens Road, Vaishali Nagar',
      locality: 'Vaishali Nagar',
      pincode: '302021'
    }
  ],
  preferences: {
    dietary: 'Pure Veg',
    spiceLevel: 'Medium',
    favoriteCuisines: ['Rajasthani', 'North Indian', 'Jain']
  },
  favouriteChefIds: ['chef-ramesh-sharma', 'chef-sunita-devi']
};

interface AppContextType {
  currentRoute: string;
  navigate: (route: string) => void;
  pricingConfig: CentralPricingConfig;
  updatePricingConfig: (config: CentralPricingConfig) => void;
  resetPricingConfig: () => void;
  bookings: BookingRequest[];
  addBooking: (booking: BookingRequest) => void;
  updateBookingStatus: (id: string, status: BookingRequest['status'], adminNotes?: string, assignedChefId?: string) => void;
  chefs: Chef[];
  updateChef: (chef: Chef) => void;
  menuItems: MenuItem[];
  updateMenuItem: (item: MenuItem) => void;
  customerProfile: CustomerProfile;
  updateCustomerProfile: (profile: Partial<CustomerProfile>) => void;
  toggleFavouriteChef: (chefId: string) => void;
  bookingPrefill: Partial<BookingRequest> | null;
  setBookingPrefill: (prefill: Partial<BookingRequest> | null) => void;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  chatbotInitialPrompt: string;
  openChatbotWithPrompt: (prompt?: string) => void;
  activeChefModalId: string | null;
  setActiveChefModalId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation: read initial from window.location.pathname or hash
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('/')) return hash;
      const path = window.location.pathname;
      return path && path !== '/' ? path : '/';
    }
    return '/';
  });

  // Central pricing configuration
  const [pricingConfig, setPricingConfig] = useState<CentralPricingConfig>(() => {
    const saved = localStorage.getItem('ghar_rasoi_pricing');
    return saved ? JSON.parse(saved) : INITIAL_PRICING_CONFIG;
  });

  // Bookings list
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('ghar_rasoi_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Chefs list
  const [chefs, setChefs] = useState<Chef[]>(() => {
    const saved = localStorage.getItem('ghar_rasoi_chefs');
    return saved ? JSON.parse(saved) : INITIAL_CHEFS;
  });

  // Menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('ghar_rasoi_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Customer profile
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem('ghar_rasoi_customer');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMER;
  });

  // Booking prefill state (e.g. from Chef Matcher or AI Assistant)
  const [bookingPrefill, setBookingPrefill] = useState<Partial<BookingRequest> | null>(null);

  // Chatbot floating widget state
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [chatbotInitialPrompt, setChatbotInitialPrompt] = useState<string>('');

  // Active Chef Modal
  const [activeChefModalId, setActiveChefModalId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ghar_rasoi_pricing', JSON.stringify(pricingConfig));
  }, [pricingConfig]);

  useEffect(() => {
    localStorage.setItem('ghar_rasoi_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ghar_rasoi_chefs', JSON.stringify(chefs));
  }, [chefs]);

  useEffect(() => {
    localStorage.setItem('ghar_rasoi_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('ghar_rasoi_customer', JSON.stringify(customerProfile));
  }, [customerProfile]);

  // Window history popstate listener
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('/')) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute(window.location.pathname || '/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updatePricingConfig = (config: CentralPricingConfig) => {
    setPricingConfig(config);
  };

  const resetPricingConfig = () => {
    setPricingConfig(INITIAL_PRICING_CONFIG);
  };

  const addBooking = (booking: BookingRequest) => {
    setBookings(prev => [booking, ...prev]);
  };

  const updateBookingStatus = (
    id: string, 
    status: BookingRequest['status'], 
    adminNotes?: string, 
    assignedChefId?: string
  ) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status,
          ...(adminNotes !== undefined ? { adminNotes } : {}),
          ...(assignedChefId !== undefined ? { assignedChefId } : {})
        };
      }
      return b;
    }));
  };

  const updateChef = (updatedChef: Chef) => {
    setChefs(prev => prev.map(c => c.id === updatedChef.id ? updatedChef : c));
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(m => m.id === item.id ? item : m));
  };

  const updateCustomerProfile = (profile: Partial<CustomerProfile>) => {
    setCustomerProfile(prev => ({ ...prev, ...profile }));
  };

  const toggleFavouriteChef = (chefId: string) => {
    setCustomerProfile(prev => {
      const exists = prev.favouriteChefIds.includes(chefId);
      return {
        ...prev,
        favouriteChefIds: exists 
          ? prev.favouriteChefIds.filter(id => id !== chefId)
          : [...prev.favouriteChefIds, chefId]
      };
    });
  };

  const openChatbotWithPrompt = (prompt?: string) => {
    if (prompt) {
      setChatbotInitialPrompt(prompt);
    }
    setIsChatbotOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigate,
        pricingConfig,
        updatePricingConfig,
        resetPricingConfig,
        bookings,
        addBooking,
        updateBookingStatus,
        chefs,
        updateChef,
        menuItems,
        updateMenuItem,
        customerProfile,
        updateCustomerProfile,
        toggleFavouriteChef,
        bookingPrefill,
        setBookingPrefill,
        isChatbotOpen,
        setIsChatbotOpen,
        chatbotInitialPrompt,
        openChatbotWithPrompt,
        activeChefModalId,
        setActiveChefModalId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
