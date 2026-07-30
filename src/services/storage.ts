import { 
  Plant, Category, GalleryImage, Testimonial, FAQ, Inquiry, NurserySettings, WholesaleService 
} from '../types';
import { 
  INITIAL_SETTINGS, INITIAL_CATEGORIES, INITIAL_PLANTS, 
  INITIAL_GALLERY, INITIAL_TESTIMONIALS, INITIAL_FAQS, INITIAL_INQUIRIES, INITIAL_SERVICES 
} from '../data/initialData';

const KEYS = {
  SETTINGS: 'sk_nursery_settings',
  CATEGORIES: 'sk_nursery_categories',
  PLANTS: 'sk_nursery_plants',
  GALLERY: 'sk_nursery_gallery',
  TESTIMONIALS: 'sk_nursery_testimonials',
  FAQS: 'sk_nursery_faqs',
  INQUIRIES: 'sk_nursery_inquiries',
  ADMIN_AUTH: 'sk_nursery_admin_auth',
};

// Helper for local storage read/write
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

export const StorageService = {
  // Settings
  getSettings: (): NurserySettings => getItem(KEYS.SETTINGS, INITIAL_SETTINGS),
  saveSettings: (settings: NurserySettings) => setItem(KEYS.SETTINGS, settings),
  updateSettings: (settings: NurserySettings) => setItem(KEYS.SETTINGS, settings),

  // Services
  getServices: (): WholesaleService[] => INITIAL_SERVICES,
  getWholesaleServices: (): WholesaleService[] => INITIAL_SERVICES,

  // Categories
  getCategories: (): Category[] => getItem(KEYS.CATEGORIES, INITIAL_CATEGORIES),
  saveCategories: (categories: Category[]) => setItem(KEYS.CATEGORIES, categories),
  addCategory: (category: Omit<Category, 'id'>) => {
    const categories = StorageService.getCategories();
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`
    };
    const updated = [newCategory, ...categories];
    StorageService.saveCategories(updated);
    return newCategory;
  },
  updateCategory: (category: Category) => {
    const categories = StorageService.getCategories();
    const updated = categories.map(c => c.id === category.id ? category : c);
    StorageService.saveCategories(updated);
  },
  deleteCategory: (id: string) => {
    const categories = StorageService.getCategories();
    const updated = categories.filter(c => c.id !== id);
    StorageService.saveCategories(updated);
  },

  // Plants
  getPlants: (): Plant[] => {
    const plants: Plant[] = getItem(KEYS.PLANTS, INITIAL_PLANTS);
    return plants.map(p => {
      if (p.image?.includes('photo-1599598425947-020645009081')) {
        return { ...p, image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80' };
      }
      if (p.image?.includes('photo-1536511151690-366050b1d848')) {
        return { ...p, image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80' };
      }
      return p;
    });
  },
  savePlants: (plants: Plant[]) => setItem(KEYS.PLANTS, plants),
  addPlant: (plant: Omit<Plant, 'id' | 'createdAt'>) => {
    const plants = StorageService.getPlants();
    const newPlant: Plant = {
      ...plant,
      id: `plant-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newPlant, ...plants];
    StorageService.savePlants(updated);
    return newPlant;
  },
  updatePlant: (plant: Plant) => {
    const plants = StorageService.getPlants();
    const updated = plants.map(p => p.id === plant.id ? plant : p);
    StorageService.savePlants(updated);
  },
  deletePlant: (id: string) => {
    const plants = StorageService.getPlants();
    const updated = plants.filter(p => p.id !== id);
    StorageService.savePlants(updated);
  },

  // Gallery
  getGallery: (): GalleryImage[] => {
    const gallery: GalleryImage[] = getItem(KEYS.GALLERY, INITIAL_GALLERY);
    return gallery.map(g => {
      if (g.url?.includes('photo-1599598425947-020645009081')) {
        return { ...g, url: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=1200&q=80' };
      }
      return g;
    });
  },
  saveGallery: (gallery: GalleryImage[]) => setItem(KEYS.GALLERY, gallery),
  addGalleryItem: (item: Omit<GalleryImage, 'id' | 'createdAt'>) => {
    const gallery = StorageService.getGallery();
    const newItem: GalleryImage = {
      ...item,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...gallery];
    StorageService.saveGallery(updated);
    return newItem;
  },
  addGalleryImage: (item: Omit<GalleryImage, 'id' | 'createdAt'>) => StorageService.addGalleryItem(item),
  deleteGalleryItem: (id: string) => {
    const gallery = StorageService.getGallery();
    const updated = gallery.filter(g => g.id !== id);
    StorageService.saveGallery(updated);
  },
  deleteGalleryImage: (id: string) => StorageService.deleteGalleryItem(id),

  // Testimonials
  getTestimonials: (): Testimonial[] => getItem(KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS),
  saveTestimonials: (testimonials: Testimonial[]) => setItem(KEYS.TESTIMONIALS, testimonials),
  addTestimonial: (t: Omit<Testimonial, 'id' | 'date'>) => {
    const testimonials = StorageService.getTestimonials();
    const newT: Testimonial = {
      ...t,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    const updated = [newT, ...testimonials];
    StorageService.saveTestimonials(updated);
    return newT;
  },
  updateTestimonial: (t: Testimonial) => {
    const testimonials = StorageService.getTestimonials();
    const updated = testimonials.map(item => item.id === t.id ? t : item);
    StorageService.saveTestimonials(updated);
  },
  deleteTestimonial: (id: string) => {
    const testimonials = StorageService.getTestimonials();
    const updated = testimonials.filter(t => t.id !== id);
    StorageService.saveTestimonials(updated);
  },

  // FAQs
  getFAQs: (): FAQ[] => getItem(KEYS.FAQS, INITIAL_FAQS),
  saveFAQs: (faqs: FAQ[]) => setItem(KEYS.FAQS, faqs),
  addFAQ: (faq: Omit<FAQ, 'id'>) => {
    const faqs = StorageService.getFAQs();
    const newFaq: FAQ = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    const updated = [...faqs, newFaq];
    StorageService.saveFAQs(updated);
    return newFaq;
  },
  updateFAQ: (faq: FAQ) => {
    const faqs = StorageService.getFAQs();
    const updated = faqs.map(f => f.id === faq.id ? faq : f);
    StorageService.saveFAQs(updated);
  },
  deleteFAQ: (id: string) => {
    const faqs = StorageService.getFAQs();
    const updated = faqs.filter(f => f.id !== id);
    StorageService.saveFAQs(updated);
  },

  // Inquiries
  getInquiries: (): Inquiry[] => getItem(KEYS.INQUIRIES, INITIAL_INQUIRIES),
  saveInquiries: (inquiries: Inquiry[]) => setItem(KEYS.INQUIRIES, inquiries),
  addInquiry: (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const inquiries = StorageService.getInquiries();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newInquiry: Inquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: formattedDate
    };
    const updated = [newInquiry, ...inquiries];
    StorageService.saveInquiries(updated);
    return newInquiry;
  },
  updateInquiryStatus: (id: string, status: Inquiry['status']) => {
    const inquiries = StorageService.getInquiries();
    const updated = inquiries.map(i => i.id === id ? { ...i, status } : i);
    StorageService.saveInquiries(updated);
  },
  deleteInquiry: (id: string) => {
    const inquiries = StorageService.getInquiries();
    const updated = inquiries.filter(i => i.id !== id);
    StorageService.saveInquiries(updated);
  },

  // Admin Authentication
  isAdminLoggedIn: (): boolean => getItem(KEYS.ADMIN_AUTH, false),
  setAdminLoggedIn: (status: boolean) => setItem(KEYS.ADMIN_AUTH, status),

  // Reset to initial demo data
  resetToDefaults: () => {
    setItem(KEYS.SETTINGS, INITIAL_SETTINGS);
    setItem(KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setItem(KEYS.PLANTS, INITIAL_PLANTS);
    setItem(KEYS.GALLERY, INITIAL_GALLERY);
    setItem(KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
    setItem(KEYS.FAQS, INITIAL_FAQS);
    setItem(KEYS.INQUIRIES, INITIAL_INQUIRIES);
  }
};
