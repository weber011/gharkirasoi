import { MenuItem } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'mini-combo',
    name: 'Mini Combo',
    hindiName: 'मिनी कॉम्बो',
    price: 99,
    category: 'Quick Combo',
    dietary: 'Pure Veg',
    description: 'A light, quick, everyday home-style meal cooked fresh with minimal oil and comforting taste.',
    dishesIncluded: ['4 Tawa Phulkas / Rotis', 'Seasonal Subzi of your choice', 'Panchmel Dal Tadka', 'Pickle & Salad'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    popular: false
  },
  {
    id: 'ghar-ki-thali',
    name: 'Ghar Ki Thali',
    hindiName: 'घर की थाली',
    price: 199,
    category: 'Thali',
    dietary: 'Pure Veg',
    description: 'The quintessential wholesome Rajasthani home platter. Warm, nourishing, and made with traditional love.',
    dishesIncluded: ['4 Desi Ghee Phulkas', '1 Paneer or Dry Seasonal Subzi', '1 Dal Fry / Dal Tadka', 'Jeera Rice', 'Home Raita / Papad'],
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'special-thali',
    name: 'Special Thali',
    hindiName: 'स्पेशल थाली',
    price: 250,
    category: 'Thali',
    dietary: 'Pure Veg',
    description: 'An elevated feast with richer gravies, premium breads, and sweet finishing touch.',
    dishesIncluded: ['4 Ghee Rotis or Missi Rotis', 'Shahi Paneer / Kadai Paneer', 'Pindi Chole / Mix Veg', 'Dal Makhani', 'Jeera Pulao', 'Boondi Raita', 'Gulab Jamun (1 pc)'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'deluxe-thali',
    name: 'Deluxe Thali',
    hindiName: 'डीलक्स थाली',
    price: 299,
    category: 'Thali',
    dietary: 'Pure Veg',
    description: 'Grand home banquet experience crafted by our senior culinary chefs for celebratory family dinners.',
    dishesIncluded: ['4 Lachha Parathas / Rotis', 'Paneer Butter Masala', 'Dum Aloo Rajasthani', 'Dal Tadka Special', 'Peas Pulao', 'Pineapple Raita', 'Roasted Papad', 'Hot Moong Dal Halwa'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    popular: false
  },
  {
    id: 'falahari-thali',
    name: 'Falahari Thali',
    hindiName: 'फलाहारी थाली (व्रत स्पेशल)',
    price: 199,
    category: 'Special',
    dietary: 'Falahari',
    description: 'Strict fast-compliant sattvic preparation made with sendha namak, desi ghee, and pure ingredients.',
    dishesIncluded: ['Kuttu / Singhare ke Parathe (3 pcs)', 'Sukhi Jeera Aloo (Sendha Namak)', 'Samak Rice Kheer', 'Cucumber Dahi Raita', 'Falahari Chutney'],
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    popular: false
  },
  {
    id: 'dal-baati-churma',
    name: 'Dal Baati Churma Special',
    hindiName: 'पारंपरिक दाल बाटी चूरमा',
    price: 300,
    category: 'Traditional',
    dietary: 'Pure Veg',
    description: 'The pride of Rajasthan prepared authentically over slow flame with pure desi ghee and rich condiments.',
    dishesIncluded: ['4 Crispy Ghee-Dipped Baatis', 'Spicy Panchmel Urad Dal', 'Desi Ghee Gond/Wheat Churma', 'Gatta Sabzi', 'Lehsun Ki Chutney', 'Chaas / Buttermilk'],
    image: 'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80',
    popular: true
  }
];
