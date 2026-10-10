export type ServiceType = 
  | 'daily-cook' 
  | 'monthly-cook' 
  | 'party-chef' 
  | 'custom-cooking';

export interface PricingPackage {
  id: string;
  category: 'daily' | 'monthly_single' | 'monthly_double' | 'party';
  name: string;
  hindiName: string;
  duration: string;
  peopleRange: string;
  minPeople: number;
  maxPeople: number;
  price: number;
  priceUnit: string;
  description: string;
  inclusions: string[];
  verificationNeeded?: boolean;
  notes?: string;
}

export interface CentralPricingConfig {
  dailyTrialSmall: PricingPackage; // 2-4 people ₹499
  dailyTrialLarge: PricingPackage; // 5-8 people ₹599
  monthlySingleSmall: PricingPackage; // 2-4 people ₹7,999
  monthlySingleLarge: PricingPackage; // 6+2 people ₹12,999 (needs verification)
  monthlyDoublePerPerson: number; // ₹5,000 per person
  partyChefBase: number; // ₹3,500 for 10-25 guests
  partyHelperFee: number; // ₹1,500 per helper
  outsideMansarovarConveyance: number; // ₹150
  freeConveyanceZone: string; // 'Mansarovar'
}

export interface MenuItem {
  id: string;
  name: string;
  hindiName: string;
  price: number;
  description: string;
  dishesIncluded: string[];
  dietary: 'Pure Veg' | 'Jain Available' | 'Falahari' | 'Customizable';
  category: 'Thali' | 'Traditional' | 'Quick Combo' | 'Special';
  image: string;
  popular?: boolean;
}

export interface Chef {
  id: string;
  name: string;
  experienceYears: number;
  avatar: string;
  specialties: string[];
  cuisines: string[];
  languages: string[];
  serviceAreas: string[];
  serviceTypes: ('daily' | 'monthly' | 'party')[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isAvailableToday: boolean;
  bio: string;
  signatureDishes: string[];
  gender: 'Male' | 'Female';
}

export type BookingStatus = 
  | 'Draft' 
  | 'Request Submitted' 
  | 'Availability Checking' 
  | 'Confirmed' 
  | 'Cancelled';

export interface BookingRequest {
  id: string;
  createdAt: string;
  serviceType: ServiceType;
  packageName: string;
  status: BookingStatus;
  
  // Requirements
  peopleCount: number;
  date: string;
  timeSlot: string;
  durationHours?: number;
  frequency?: 'Once' | '1 Meal/Day' | '2 Meals/Day (Lunch+Dinner)';
  startDate?: string;
  
  // Address
  address: string;
  locality: string;
  pincode: string;
  landmark?: string;
  
  // Food Preferences
  foodType: 'Pure Veg' | 'Veg + Egg' | 'Jain (No Onion Garlic)';
  cuisines: string[];
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  allergies?: string;
  specialInstructions?: string;
  
  // Party / Helper
  chefCount?: number;
  helperCount?: number;
  occasion?: string;
  
  // Contact
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredContact: 'WhatsApp' | 'Phone Call';
  
  // Pricing Snapshot (frozen at booking time)
  pricingSnapshot: {
    baseAmount: number;
    helperAmount?: number;
    conveyanceAmount: number;
    totalAmount: number;
    isCustomQuote: boolean;
    breakdown: string[];
  };
  
  // Assigned chef
  assignedChefId?: string;
  adminNotes?: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  savedAddresses: {
    id: string;
    title: string;
    fullAddress: string;
    locality: string;
    pincode: string;
  }[];
  preferences: {
    dietary: string;
    spiceLevel: string;
    favoriteCuisines: string[];
  };
  favouriteChefIds: string[];
}
