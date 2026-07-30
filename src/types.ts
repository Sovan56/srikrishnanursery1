export type PlantAvailability = 'In Stock' | 'Bulk Only' | 'Pre-Order' | 'Out of Stock';

export interface Plant {
  id: string;
  name: string;
  kannadaName?: string;
  category: string;
  shortDescription: string;
  description?: string;
  image: string;
  wholesalePrice?: string;
  retailPrice?: string;
  availability: PlantAvailability;
  isPopular?: boolean;
  minOrderQuantity?: number;
  sunlight?: string;
  watering?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  kannadaName?: string;
  description: string;
  image: string;
  plantCount?: number;
  count?: number;
  status: 'Active' | 'Inactive';
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Nursery Layout' | 'Saplings' | 'Fruit Trees' | 'Flowering' | 'Landscape Projects';
  url: string;
  caption?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  photo: string;
  rating: number;
  review: string;
  date: string;
  status: 'Published' | 'Pending';
  customerType?: 'Retail Buyer' | 'Landscaper' | 'Farm Owner' | 'Bulk Client';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: 'Active' | 'Draft';
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  requirementType: 'Wholesale Bulk Order' | 'Landscape Project' | 'Retail Purchase' | 'General Query';
  plantType?: string;
  quantity?: string;
  message: string;
  status: 'New' | 'In Touch' | 'Completed';
  createdAt: string;
}

export interface WholesaleService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  targetClients: string[];
}

export interface NurserySettings {
  businessName: string;
  kannadaName: string;
  tagline: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  businessHours: string;
  googleRating: number;
  totalReviews: number;
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export type ActivePage = 
  | 'home'
  | 'plants'
  | 'gallery'
  | 'services'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'admin'
  | '404';

export type AdminTab = 
  | 'dashboard'
  | 'plants'
  | 'categories'
  | 'gallery'
  | 'testimonials'
  | 'services'
  | 'faqs'
  | 'inquiries'
  | 'settings'
  | 'profile';
