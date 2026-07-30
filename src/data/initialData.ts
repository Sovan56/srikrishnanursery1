import { Plant, Category, GalleryImage, Testimonial, FAQ, Inquiry, WholesaleService, NurserySettings } from '../types';

export const INITIAL_SETTINGS: NurserySettings = {
  businessName: 'Sri Krishna Nursery & Farm',
  kannadaName: 'ಶ್ರೀ ಕೃಷ್ಣ ನರ್ಸರಿ ಮತ್ತು ಕೃಷಿ',
  tagline: 'Bringing Nature Closer To You | Premium Wholesale Nursery in Bengaluru',
  phone: '+91 99003 87803',
  whatsappPhone: '+919900387803',
  email: 'srikrishnanursery.bengaluru@gmail.com',
  address: '6, Market Road, Near Fruit Market, Near Madduramma Temple, Phase II, Sanjeevinagar, Huskur Village, Bengaluru, Karnataka 560099',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.987622872352!2d77.6749!3d12.8443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c6bbbbbbbbb%3A0x123456789abcdef!2sHuskur%20Village%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  businessHours: 'Open Daily: 9:00 AM – 6:00 PM',
  googleRating: 4.8,
  totalReviews: 168,
  primaryColor: '#2E7D32',
  secondaryColor: '#66BB6A',
  footerText: '© Sri Krishna Nursery & Farm. All rights reserved. Wholesale & retail supplier of premium healthy plants in Bengaluru, Karnataka.',
  facebookUrl: 'https://facebook.com/srikrishnanursery',
  instagramUrl: 'https://instagram.com/srikrishnanursery'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-indoor',
    name: 'Indoor Plants',
    kannadaName: 'ಒಳಾಂಗಣ ಸಸ್ಯಗಳು',
    description: 'Air-purifying and aesthetic houseplants perfect for homes, apartments, and corporate desks.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    plantCount: 24,
    status: 'Active'
  },
  {
    id: 'cat-outdoor',
    name: 'Outdoor Plants',
    kannadaName: 'ಹೊರಾಂಗಣ ಸಸ್ಯಗಳು',
    description: 'Sun-loving shrubs, hedges, and architectural garden plants built for tropical climates.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    plantCount: 38,
    status: 'Active'
  },
  {
    id: 'cat-fruit',
    name: 'Fruit Plants & Saplings',
    kannadaName: 'ಹಣ್ಣಿನ ಗಿಡಗಳು',
    description: 'High-yielding grafted fruit saplings including Mango, Guava, Pomegranate, Sapota & Lemon.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    plantCount: 30,
    status: 'Active'
  },
  {
    id: 'cat-flower',
    name: 'Flower Plants',
    kannadaName: 'ಹೂವಿನ ಗಿಡಗಳು',
    description: 'Vibrant blooming roses, hibiscus, jasmine, bougainvillea, and seasonal flowering plants.',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    plantCount: 42,
    status: 'Active'
  },
  {
    id: 'cat-palms',
    name: 'Palm Trees',
    kannadaName: 'ತಾಳೆ ಮರಗಳು',
    description: 'Areca palms, Royal palms, Fox Tail palms, and Cycas for avenue and landscape lining.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    plantCount: 15,
    status: 'Active'
  },
  {
    id: 'cat-landscape',
    name: 'Landscape Plants',
    kannadaName: 'ಲ್ಯಾಂಡ್ಸ್ಕೇಪ್ ಸಸ್ಯಗಳು',
    description: 'Ground covers, ornamental grasses, privacy hedges, and large specimen trees for builders.',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80',
    plantCount: 28,
    status: 'Active'
  },
  {
    id: 'cat-medicinal',
    name: 'Medicinal & Herbal',
    kannadaName: 'ಔಷಧೀಯ ಸಸ್ಯಗಳು',
    description: 'Traditional Ayurvedic plants including Tulsi, Neem, Aloe Vera, Insulin plant, and Lemongrass.',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=800&q=80',
    plantCount: 18,
    status: 'Active'
  },
  {
    id: 'cat-hanging',
    name: 'Hanging Plants & Succulents',
    kannadaName: 'ನೇತಾಡುವ ಸಸ್ಯಗಳು',
    description: 'Trailing creepers, Boston ferns, Money plants, and low-maintenance succulents for balconies.',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    plantCount: 20,
    status: 'Active'
  }
];

export const INITIAL_PLANTS: Plant[] = [
  {
    id: 'plant-1',
    name: 'Areca Palm (Chrysalidocarpus lutescens)',
    kannadaName: 'ಅಡಿಕೆ ತಾಳೆ (Areca Palm)',
    category: 'Palm Trees',
    shortDescription: 'Lush tropical air-purifying palm, extremely popular for homes, office lobbies & resort landscaping.',
    description: 'Areca Palm is a favorite indoor and outdoor landscape palm plant in Bengaluru. Features feathery arching fronds. Tolerates partial shade and filters indoor toxins.',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹120 – ₹450 / pot',
    retailPrice: '₹220 – ₹650',
    availability: 'In Stock',
    isPopular: true,
    minOrderQuantity: 10,
    sunlight: 'Bright indirect light',
    watering: 'Moderate (2-3 times/week)',
    createdAt: '2026-01-10'
  },
  {
    id: 'plant-2',
    name: 'Golden Money Plant (Epipremnum aureum)',
    kannadaName: 'ಮನಿ ಪ್ಲಾಂಟ್ (Money Plant)',
    category: 'Indoor Plants',
    shortDescription: 'Hardy trailing creeper with heart-shaped leaves. Symbolic of luck and prosperity.',
    description: 'Golden Pothos / Money Plant thrives effortlessly in Bengaluru climate. Ideal for moss sticks, hanging baskets, and glass bottles.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹40 – ₹180',
    retailPrice: '₹80 – ₹280',
    availability: 'In Stock',
    isPopular: true,
    minOrderQuantity: 15,
    sunlight: 'Low to medium light',
    watering: 'Low (once a week)',
    createdAt: '2026-01-12'
  },
  {
    id: 'plant-3',
    name: 'Snake Plant / Sansevieria Trifasciata',
    kannadaName: 'ಸ್ನೇಕ್ ಪ್ಲಾಂಟ್ (Snake Plant)',
    category: 'Indoor Plants',
    shortDescription: 'Oxygen-producing powerhouse that thrives on neglect. Modern architectural silhouette.',
    description: 'Produces oxygen 24/7. High indoor filtration capacity. Extremely hardy variety available in variegated yellow edges.',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹90 – ₹300',
    retailPrice: '₹160 – ₹450',
    availability: 'In Stock',
    isPopular: true,
    minOrderQuantity: 10,
    sunlight: 'Low to direct light',
    watering: 'Very Low (every 10 days)',
    createdAt: '2026-01-15'
  },
  {
    id: 'plant-4',
    name: 'Grafted Alphonso Mango Sapling',
    kannadaName: 'ಅಲ್ಫೋನ್ಸೋ ಮಾವಿನ ಸಸಿ',
    category: 'Fruit Plants & Saplings',
    shortDescription: 'Premium grafted mango variety producing sweet aromatic king-of-mangoes fruit.',
    description: 'High survival rate grafted saplings from authentic parent stock. Starts fruiting within 2.5–3 years of farm planting.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹140 – ₹280',
    retailPrice: '₹250 – ₹420',
    availability: 'In Stock',
    isPopular: true,
    minOrderQuantity: 25,
    sunlight: 'Full direct sunlight',
    watering: 'Regular when young',
    createdAt: '2026-01-18'
  },
  {
    id: 'plant-5',
    name: 'Taiwan Pink Guava Sapling',
    kannadaName: 'ತೈವಾನ್ ಸೀಬೆ ಗಿಡ (Guava)',
    category: 'Fruit Plants & Saplings',
    shortDescription: 'Dwarf guava variety yielding large sweet pink pulp guavas almost year-round.',
    description: 'High demand commercial orchard and home garden variety. Heavy yield and quick harvest cycles.',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹80 – ₹160',
    retailPrice: '₹150 – ₹260',
    availability: 'In Stock',
    isPopular: true,
    minOrderQuantity: 20,
    sunlight: 'Full sunlight',
    watering: 'Moderate',
    createdAt: '2026-01-20'
  },
  {
    id: 'plant-6',
    name: 'Button Rose & Kashmiri Rose',
    kannadaName: 'ಗುಲಾಬಿ ಗಿಡ (Rose Plant)',
    category: 'Flower Plants',
    shortDescription: 'Continuous blooming fragrant roses available in vibrant red, pink, yellow, and white colors.',
    description: 'Rooted healthy rose bushes ready for garden bedding and pot planting. Disease resistant varieties.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹35 – ₹90',
    retailPrice: '₹70 – ₹160',
    availability: 'In Stock',
    isPopular: true,
    minOrderQuantity: 30,
    sunlight: 'Full morning sun',
    watering: 'Daily light watering',
    createdAt: '2026-01-22'
  },
  {
    id: 'plant-7',
    name: 'Hybrid Hibiscus (Shoeblack plant)',
    kannadaName: 'ದಾಸವಾಳ ಗಿಡ (Hibiscus)',
    category: 'Flower Plants',
    shortDescription: 'Large double and single petal blooms in radiant crimson red, coral, and orange.',
    description: 'Low-maintenance flowering shrub perfect for Indian worship rituals and perimeter garden fencing.',
    image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹45 – ₹110',
    retailPrice: '₹90 – ₹180',
    availability: 'In Stock',
    isPopular: false,
    minOrderQuantity: 20,
    sunlight: 'Full sun',
    watering: 'Regular',
    createdAt: '2026-01-25'
  },
  {
    id: 'plant-8',
    name: 'Holy Tulsi / Krishna Tulsi Sapling',
    kannadaName: 'ಕೃಷ್ಣ ತುಳಸಿ ಗಿಡ (Tulsi)',
    category: 'Medicinal & Herbal',
    shortDescription: 'Sacred medicinal plant revered for immunity boosting, tea aroma, and spiritual blessings.',
    description: 'Strong aromatic dark purple-green leaf Tulsi. Grown organic in high quality soil mix.',
    image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹20 – ₹45',
    retailPrice: '₹40 – ₹90',
    availability: 'In Stock',
    isPopular: true,
    minOrderQuantity: 20,
    sunlight: 'Bright morning light',
    watering: 'Daily moist soil',
    createdAt: '2026-01-28'
  },
  {
    id: 'plant-9',
    name: 'Royal Foxtail Palm Tree',
    kannadaName: 'ಫಾಕ್ಸ್ ಟೈಲ್ ಪಾಮ್',
    category: 'Palm Trees',
    shortDescription: 'Majestic ornamental landscape palm with bushy fox-tail fronds. Ideal for main entry gates.',
    description: 'Specimen size palms for villa projects, gated communities, and highway land developments.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹350 – ₹1800',
    retailPrice: '₹600 – ₹2800',
    availability: 'Bulk Only',
    isPopular: false,
    minOrderQuantity: 5,
    sunlight: 'Direct sun',
    watering: 'Moderate',
    createdAt: '2026-02-01'
  },
  {
    id: 'plant-10',
    name: 'Ficus Benjamina (Weeping Fig)',
    kannadaName: 'ಫಿಕಸ್ ಗಿಡ (Ficus)',
    category: 'Outdoor Plants',
    shortDescription: 'Dense lush green foliage bush perfect for hedge boundary, topiary shapes and avenues.',
    description: 'Fast growing, easily trimmed hedge plant widely specified by landscape architects.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹60 – ₹220',
    retailPrice: '₹120 – ₹350',
    availability: 'In Stock',
    isPopular: false,
    minOrderQuantity: 15,
    sunlight: 'Full sun to partial shade',
    watering: 'Regular',
    createdAt: '2026-02-05'
  },
  {
    id: 'plant-11',
    name: 'Monstera Deliciosa (Swiss Cheese Plant)',
    kannadaName: 'ಮಾನ್‌ಸ್ಟೆರಾ (Monstera)',
    category: 'Indoor Plants',
    shortDescription: 'Trendy tropical plant with broad perforated split leaves. Aesthetic statement interior piece.',
    description: 'High-grade large leaf Monstera conditioned for apartment living spaces.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹280 – ₹750',
    retailPrice: '₹450 – ₹1200',
    availability: 'Pre-Order',
    isPopular: true,
    minOrderQuantity: 5,
    sunlight: 'Filtered bright light',
    watering: 'Weekly',
    createdAt: '2026-02-10'
  },
  {
    id: 'plant-12',
    name: 'Paper Flower (Bougainvillea Hybrid)',
    kannadaName: 'ಕಾಗದದ ಹೂವು (Bougainvillea)',
    category: 'Flower Plants',
    shortDescription: 'Drought-tolerant blooming climber featuring explosive purple, magenta, white, and yellow colors.',
    description: 'Ideal for archways, balcony grills, wall cascading, and low water garden borders in Bengaluru.',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    wholesalePrice: '₹40 – ₹120',
    retailPrice: '₹80 – ₹220',
    availability: 'In Stock',
    isPopular: false,
    minOrderQuantity: 20,
    sunlight: 'Full direct sun',
    watering: 'Low water requirement',
    createdAt: '2026-02-12'
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Main Wholesale Nursery Display Area',
    category: 'Nursery Layout',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    caption: 'Over 5 acres of potted plants and shaded green net sections at Huskur Village, Bengaluru.',
    createdAt: '2026-01-01'
  },
  {
    id: 'gal-2',
    title: 'Areca Palm & Indoor Plant Polyhouse',
    category: 'Saplings',
    url: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Thousands of healthy, acclimated Areca Palms ready for farm loading and city distribution.',
    createdAt: '2026-01-05'
  },
  {
    id: 'gal-3',
    title: 'Grafted Mango & Fruit Tree Section',
    category: 'Fruit Trees',
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Authentic grafted fruit saplings sorted by age and root bag size.',
    createdAt: '2026-01-10'
  },
  {
    id: 'gal-4',
    title: 'Vibrant Flower Bed Section',
    category: 'Flowering',
    url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fresh blooming roses, hibiscus, and seasonal flowers fertilized organically.',
    createdAt: '2026-01-15'
  },
  {
    id: 'gal-5',
    title: 'Apartment Landscape Project Supply',
    category: 'Landscape Projects',
    url: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
    caption: 'Bulk delivery of shrubs, palms, and turf grass for a gated community in Sarjapur, Bengaluru.',
    createdAt: '2026-01-20'
  },
  {
    id: 'gal-6',
    title: 'Indoor Air Purifier Display Corner',
    category: 'Nursery Layout',
    url: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80',
    caption: 'Monstera, Snake Plants, and Money Plants arranged for walkthrough retail buyers.',
    createdAt: '2026-01-25'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Suresh Gowda',
    location: 'Sarjapur Road, Bengaluru',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'Purchased 400 Areca Palms and grafted Mango saplings for my 2-acre farm land near Hosur road. Sri Krishna Nursery provided genuine wholesale prices and healthy saplings. All plants caught root smoothly!',
    date: '2 weeks ago',
    status: 'Published',
    customerType: 'Farm Owner'
  },
  {
    id: 'rev-2',
    name: 'Ananya Reddy',
    location: 'HSR Layout, Bengaluru',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'Best nursery in Bengaluru for indoor potted plants. The staff guided us on sunlight and soil mix for our apartment balcony garden. Prices are far reasonable compared to city plant shops.',
    date: '1 month ago',
    status: 'Published',
    customerType: 'Retail Buyer'
  },
  {
    id: 'rev-3',
    name: 'Venkatesh Kumar (VK Landscapers)',
    location: 'Electronic City, Bengaluru',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'We regularly source bulk shrubs, palms, and turf grass for commercial builder projects from Sri Krishna Nursery. Extremely reliable stock, bulk discounts, and prompt truck delivery.',
    date: '3 weeks ago',
    status: 'Published',
    customerType: 'Landscaper'
  },
  {
    id: 'rev-4',
    name: 'Dr. Ramesh Rao',
    location: 'Jayanagar, Bengaluru',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'Visited their Huskur village location near Madduramma temple. Very polite owners, massive collection of fruit trees and herbal plants. Highly recommended wholesale plant destination!',
    date: '2 months ago',
    status: 'Published',
    customerType: 'Retail Buyer'
  },
  {
    id: 'rev-5',
    name: 'Pooja Hegde',
    location: 'Whitefield, Bengaluru',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'Ordered 50 Snake plants and Money plants for our office space renovation. Delivery was smooth and plants came in super healthy condition. 10/10 experience.',
    date: '1 week ago',
    status: 'Published',
    customerType: 'Bulk Client'
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What types of plants do you sell at Sri Krishna Nursery?',
    answer: 'We supply a comprehensive variety of plants including Indoor houseplants, Outdoor garden shrubs, Grafted fruit saplings (Mango, Guava, Sapota, Lemon), Blooming flower plants (Roses, Hibiscus, Bougainvillea), Palm trees (Areca, Foxtail, Royal), Landscape hedges, and Ayurvedic medicinal plants.',
    category: 'General',
    status: 'Active'
  },
  {
    id: 'faq-2',
    question: 'Do you provide wholesale pricing for bulk buyers?',
    answer: 'Yes! We are primarily a wholesale nursery farm. We offer steep discounts for bulk orders placed by landscapers, farmers, builders, apartment associations, corporate offices, and retail shop resellers.',
    category: 'Pricing & Orders',
    status: 'Active'
  },
  {
    id: 'faq-3',
    question: 'Can I visit the nursery directly in Bengaluru?',
    answer: 'Absoltely! You are welcome to visit us daily between 9:00 AM – 6:00 PM. We are located at 6, Market Road, Near Fruit Market, Near Madduramma Temple, Phase II, Sanjeevinagar, Huskur Village, Bengaluru.',
    category: 'Visiting',
    status: 'Active'
  },
  {
    id: 'faq-4',
    question: 'Do you deliver plants across Bengaluru and Karnataka?',
    answer: 'Yes, we arrange mini-truck and vehicle transport for bulk orders across Bengaluru city, urban districts, and neighboring regions in Karnataka & Tamil Nadu.',
    category: 'Delivery',
    status: 'Active'
  },
  {
    id: 'faq-5',
    question: 'How do I place a bulk inquiry or custom landscaping request?',
    answer: 'You can submit the Inquiry Form directly on this website, call us at +91 99003 87803, or message us on WhatsApp. Our nursery experts will provide an instant custom quote.',
    category: 'Pricing & Orders',
    status: 'Active'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    name: 'Manjunath K',
    phone: '+91 98450 12345',
    email: 'manju.farm@gmail.com',
    requirementType: 'Wholesale Bulk Order',
    plantType: 'Areca Palm & Grafted Mango',
    quantity: '250 Saplings',
    message: 'Looking for 200 Areca Palms (3ft height) and 50 Alphonso mango saplings for farm planting near Attibele. Please send quote with delivery charges.',
    status: 'New',
    createdAt: '2026-07-28 10:30 AM'
  },
  {
    id: 'inq-102',
    name: 'Kavitha Swamy',
    phone: '+91 97312 98765',
    email: 'kavitha.villa@outlook.com',
    requirementType: 'Landscape Project',
    plantType: 'Outdoor Shrubs & Ground Covers',
    quantity: 'Villa Garden Setup',
    message: 'Need complete landscaping supply for a 30x40 villa front garden in Electronic City Phase 1. Would like a nursery expert to advise.',
    status: 'In Touch',
    createdAt: '2026-07-26 03:15 PM'
  }
];

export const INITIAL_SERVICES: WholesaleService[] = [
  {
    id: 'serv-1',
    title: 'Landscape & Villa Projects',
    description: 'Turnkey plant supply for residential villas, private gardens, and estate parks with healthy acclimated stock.',
    iconName: 'Trees',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80',
    targetClients: ['Villa Owners', 'Architects', 'Landscape Designers']
  },
  {
    id: 'serv-2',
    title: 'Apartment & Gated Society Fencing',
    description: 'Bulk hedges, privacy bamboo, bougainvillea fencing, and ornamental avenue palms for residential complexes.',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    targetClients: ['RWA Associations', 'Facility Managers', 'Builders']
  },
  {
    id: 'serv-3',
    title: 'Commercial Farm & Orchard Supply',
    description: 'Certified high-yield grafted fruit saplings (Mango, Guava, Sapota, Pomegranate) for commercial agricultural farms.',
    iconName: 'Sprout',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    targetClients: ['Farmers', 'Agri-investors', 'Farmhouse Owners']
  },
  {
    id: 'serv-4',
    title: 'Retail Shop & Garden Center Resupply',
    description: 'Weekly wholesale supply of indoor potted houseplants, hanging pots, and ceramic planters for city flower shops.',
    iconName: 'Store',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    targetClients: ['Retail Nurseries', 'Garden Centers', 'Plant Resellers']
  },
  {
    id: 'serv-5',
    title: 'Corporate & Office Greenery',
    description: 'Low-maintenance air-purifying indoor plants, desk pots, and lobby planters for IT parks and office buildings.',
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    targetClients: ['IT Parks', 'Co-working Spaces', 'Corporate Offices']
  },
  {
    id: 'serv-6',
    title: 'Resort & Hotel Landscaping',
    description: 'Exotic tropical palms, flowering shrubs, and water garden aquatic plants for hospitality properties.',
    iconName: 'Palmtree',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    targetClients: ['Resorts', 'Boutique Hotels', 'Event Venues']
  }
];
