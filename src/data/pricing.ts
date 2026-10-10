import { CentralPricingConfig } from '../types';

export const INITIAL_PRICING_CONFIG: CentralPricingConfig = {
  dailyTrialSmall: {
    id: 'daily-trial-2-4',
    category: 'daily',
    name: 'Daily Trial Visit (2–4 People)',
    hindiName: 'दैनिक ट्रायल कुक (२-४ लोग)',
    duration: '2 hours cooking session',
    peopleRange: '2 to 4 people',
    minPeople: 2,
    maxPeople: 4,
    price: 499,
    priceUnit: 'per visit',
    description: 'Fresh lunch or dinner cooked in your home kitchen. Ideal to experience our chef service before committing to a monthly plan.',
    inclusions: [
      '1 complete meal (Roti/Paratha, Sabzi, Dal, Rice/Salad)',
      'Cooked live in your kitchen',
      'Hygiene & basic cleanup of cooking counter',
      'Conveyance included inside Mansarovar'
    ],
    notes: 'Groceries, oil, spices, utensils, and gas are provided by the customer.'
  },
  dailyTrialLarge: {
    id: 'daily-trial-5-8',
    category: 'daily',
    name: 'Daily Trial Visit (5–8 People)',
    hindiName: 'दैनिक ट्रायल कुक (५-८ लोग)',
    duration: '2 to 2.5 hours session',
    peopleRange: '5 to 8 people',
    minPeople: 5,
    maxPeople: 8,
    price: 599,
    priceUnit: 'per visit',
    description: 'Perfect for larger joint families or small home gatherings seeking fresh, customized home meals.',
    inclusions: [
      '1 fresh family meal tailored to dietary preferences',
      'Custom spice levels & oil control',
      'Live cooking in your kitchen',
      'Conveyance included inside Mansarovar'
    ],
    notes: 'Groceries, oil, spices, utensils, and gas are provided by the customer.'
  },
  monthlySingleSmall: {
    id: 'monthly-single-2-4',
    category: 'monthly_single',
    name: 'Monthly 1-Time Cooking (26 Days)',
    hindiName: 'मासिक एक समय कुक (२६ दिन)',
    duration: '1 visit per day (Lunch or Dinner)',
    peopleRange: '2 to 4 people',
    minPeople: 2,
    maxPeople: 4,
    price: 7999,
    priceUnit: 'per month',
    description: 'Dedicated home cook visiting daily for 26 days a month for one meal (lunch or dinner). Verified, punctual, and trained.',
    inclusions: [
      '26 days of home cooking per month (4 weekly offs)',
      '1 meal prepared daily (Roti, 2 Sabzi/Dal, Rice, Salad)',
      'Replacement chef support in case of emergency leave',
      'Dietary & health-conscious recipes'
    ],
    notes: 'Conveyance free in Mansarovar. Groceries & gas by customer.'
  },
  monthlySingleLarge: {
    id: 'monthly-single-6-2',
    category: 'monthly_single',
    name: 'Monthly 1-Time Cooking (6+2 Vyakti)',
    hindiName: 'मासिक एक समय कुक (६+२ व्यक्ति)',
    duration: '1 visit per day (Lunch or Dinner)',
    peopleRange: '6 to 8 people',
    minPeople: 6,
    maxPeople: 8,
    price: 12999,
    priceUnit: 'per month',
    description: 'Designed for larger joint families needing generous quantities and diverse preferences.',
    inclusions: [
      '26 days of home cooking per month',
      'Full meal for 6 to 8 family members',
      'Replacement chef backup guarantee'
    ],
    verificationNeeded: true,
    notes: '⚠️ Package capacity and exact inclusions are marked for business verification.'
  },
  monthlyDoublePerPerson: 5000, // ₹5,000 per person per month for 2-time cooking (Lunch + Dinner)
  partyChefBase: 3500, // ₹3,500 for 10-25 guests (5-7 hours)
  partyHelperFee: 1500, // ₹1,500 per helper
  outsideMansarovarConveyance: 150, // ₹150 for non-Mansarovar areas
  freeConveyanceZone: 'Mansarovar'
};

// Jaipur local areas configuration
export interface JaipurLocality {
  name: string;
  pincode: string;
  isCovered: boolean;
  conveyanceFee: number;
  deliveryTimeEstimate: string;
  hubDistance: string;
}

export const JAIPUR_LOCALITIES: JaipurLocality[] = [
  { name: 'Mansarovar', pincode: '302020', isCovered: true, conveyanceFee: 0, deliveryTimeEstimate: 'Within 30 mins', hubDistance: 'Primary Hub (0 km)' },
  { name: 'Vaishali Nagar', pincode: '302021', isCovered: true, conveyanceFee: 150, deliveryTimeEstimate: 'Within 45 mins', hubDistance: '6.5 km from Hub' },
  { name: 'Malviya Nagar', pincode: '302017', isCovered: true, conveyanceFee: 150, deliveryTimeEstimate: 'Within 40 mins', hubDistance: '7.2 km from Hub' },
  { name: 'C-Scheme', pincode: '302001', isCovered: true, conveyanceFee: 150, deliveryTimeEstimate: 'Within 45 mins', hubDistance: '8.0 km from Hub' },
  { name: 'Raja Park', pincode: '302004', isCovered: true, conveyanceFee: 150, deliveryTimeEstimate: 'Within 50 mins', hubDistance: '9.4 km from Hub' },
  { name: 'Jagatpura', pincode: '302017', isCovered: true, conveyanceFee: 150, deliveryTimeEstimate: 'Within 45 mins', hubDistance: '8.8 km from Hub' },
  { name: 'Tonk Road / Gopalpura', pincode: '302018', isCovered: true, conveyanceFee: 100, deliveryTimeEstimate: 'Within 35 mins', hubDistance: '4.2 km from Hub' },
  { name: 'Vidhyadhar Nagar', pincode: '302039', isCovered: true, conveyanceFee: 150, deliveryTimeEstimate: 'Within 55 mins', hubDistance: '12 km from Hub' },
  { name: 'Civil Lines', pincode: '302006', isCovered: true, conveyanceFee: 150, deliveryTimeEstimate: 'Within 40 mins', hubDistance: '6.0 km from Hub' },
  { name: 'Nirman Nagar / Shyam Nagar', pincode: '302019', isCovered: true, conveyanceFee: 50, deliveryTimeEstimate: 'Within 25 mins', hubDistance: '2.5 km from Hub' },
  { name: 'Ajmer Road (DCM / 200 Ft)', pincode: '302024', isCovered: true, conveyanceFee: 100, deliveryTimeEstimate: 'Within 35 mins', hubDistance: '4.8 km from Hub' }
];

export function checkJaipurServiceArea(query: string): { covered: boolean; locality?: JaipurLocality; note: string } {
  const clean = query.trim().toLowerCase();
  if (!clean) return { covered: false, note: 'Please enter a locality or pincode in Jaipur' };
  
  const match = JAIPUR_LOCALITIES.find(
    loc => loc.name.toLowerCase().includes(clean) || loc.pincode === clean
  );
  
  if (match) {
    return {
      covered: true,
      locality: match,
      note: match.conveyanceFee === 0 
        ? `✅ Full coverage in ${match.name}! Zero extra conveyance charges (Primary Service Hub).`
        : `✅ Covered in ${match.name}! Standard ₹${match.conveyanceFee} conveyance charge applies outside Mansarovar.`
    };
  }
  
  return {
    covered: false,
    note: `We currently prioritize Mansarovar and core Jaipur zones. We can often arrange customized chef coverage for your area on WhatsApp!`
  };
}

export function calculateQuote(
  config: CentralPricingConfig,
  params: {
    serviceType: string;
    peopleCount: number;
    frequency?: string;
    locality?: string;
    helperCount?: number;
    chefCount?: number;
  }
) {
  const { serviceType, peopleCount, frequency, locality, helperCount = 0, chefCount = 1 } = params;
  const isMansarovar = !locality || locality.toLowerCase().includes('mansarovar');
  const conveyance = isMansarovar ? 0 : config.outsideMansarovarConveyance;

  let base = 0;
  let breakdown: string[] = [];
  let isCustom = false;
  let packageName = '';

  if (serviceType === 'daily-cook') {
    if (peopleCount <= 4) {
      base = config.dailyTrialSmall.price;
      packageName = config.dailyTrialSmall.name;
      breakdown.push(`Daily Trial (2–4 people): ₹${base}`);
    } else {
      base = config.dailyTrialLarge.price;
      packageName = config.dailyTrialLarge.name;
      breakdown.push(`Daily Trial (5–8 people): ₹${base}`);
    }
  } else if (serviceType === 'monthly-cook') {
    if (frequency === '2 Meals/Day (Lunch+Dinner)') {
      // Monthly two-time: ₹5,000 per person per month
      base = config.monthlyDoublePerPerson * Math.max(2, peopleCount);
      packageName = `Monthly 2-Time Cooking (${peopleCount} People, 26 Days)`;
      breakdown.push(`2-Time Cooking (${peopleCount} people @ ₹${config.monthlyDoublePerPerson}/person): ₹${base}`);
      breakdown.push(`⚠️ Note: Multi-person calculation subject to business confirmation.`);
    } else {
      // Monthly one-time
      if (peopleCount <= 4) {
        base = config.monthlySingleSmall.price;
        packageName = config.monthlySingleSmall.name;
        breakdown.push(`Monthly 1-Time Cooking (2–4 people, 26 days): ₹${base}`);
      } else {
        base = config.monthlySingleLarge.price;
        packageName = config.monthlySingleLarge.name;
        breakdown.push(`Monthly 1-Time Cooking (6+2 Vyakti, 26 days): ₹${base}`);
        breakdown.push(`⚠️ Note: 6+2 Vyakti package subject to business confirmation.`);
      }
    }
  } else if (serviceType === 'party-chef') {
    base = config.partyChefBase * Math.max(1, chefCount);
    packageName = `One-Day Party Chef (${chefCount} Chef${chefCount > 1 ? 's' : ''}, 5–7 hrs)`;
    breakdown.push(`Party Chef Base (${chefCount} chef, 10–25 guests): ₹${base}`);
  } else {
    isCustom = true;
    packageName = 'Custom Cooking Requirement';
    breakdown.push('Custom requirement — Quotation confirmed after reviewing details.');
  }

  const helperTotal = helperCount * config.partyHelperFee;
  if (helperTotal > 0) {
    breakdown.push(`Optional Helper (${helperCount} × ₹${config.partyHelperFee}): ₹${helperTotal}`);
  }

  if (conveyance > 0) {
    breakdown.push(`Conveyance Charge (${locality || 'Outside Mansarovar'}): ₹${conveyance}`);
  } else {
    breakdown.push(`Conveyance: ₹0 (Mansarovar Hub)`);
  }

  breakdown.push(`Groceries & Gas: Supplied by customer`);

  return {
    packageName,
    baseAmount: base,
    helperAmount: helperTotal,
    conveyanceAmount: conveyance,
    totalAmount: isCustom ? 0 : base + helperTotal + conveyance,
    isCustomQuote: isCustom,
    breakdown
  };
}
