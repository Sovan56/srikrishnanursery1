import React from 'react';
import { ActivePage, NurserySettings } from '../../types';
import { 
  Sprout, Phone, Mail, MapPin, Clock, MessageCircle, 
  ExternalLink, ArrowUpRight, ShieldCheck 
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  settings: NurserySettings;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, settings, onOpenInquiry }) => {
  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white shadow-lg">
                <Sprout className="w-7 h-7 text-emerald-50" />
              </div>
              <div>
                <h2 className="font-poppins font-bold text-xl text-white tracking-wide">
                  {settings.businessName}
                </h2>
                <p className="text-sm text-emerald-400 font-semibold">
                  {settings.kannadaName}
                </p>
              </div>
            </div>

            <p className="text-emerald-200/80 text-sm leading-relaxed max-w-md">
              Bengaluru&apos;s trusted wholesale plant nursery supplying healthy indoor plants, grafted fruit saplings, flowering shrubs, palm trees, and landscape greenery at unbeatable farm-direct prices.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ⭐ 4.8 Rating (168+ Google Reviews)
              </span>
              <span className="bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold">
                Wholesale & Retail
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${settings.whatsappPhone}?text=Hello%20Sri%20Krishna%20Nursery,%20I%20would%20like%20to%20inquire%20about%20plants.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Nursery</span>
              </a>
              <button
                onClick={() => handleNavClick('admin')}
                className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/80 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="View Admin Dashboard UI"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h3 className="font-poppins font-semibold text-white text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm text-emerald-200/90">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('plants')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Explore All Plants</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('gallery')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Nursery Gallery</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Wholesale Services</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('testimonials')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Customer Reviews</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>FAQs</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Location & Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Plant Categories */}
          <div className="space-y-3">
            <h3 className="font-poppins font-semibold text-white text-base">Plant Categories</h3>
            <ul className="space-y-2 text-sm text-emerald-200/90">
              <li>
                <button onClick={() => handleNavClick('plants')} className="hover:text-emerald-300 transition-colors">
                  Areca & Landscape Palms
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('plants')} className="hover:text-emerald-300 transition-colors">
                  Grafted Fruit Saplings
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('plants')} className="hover:text-emerald-300 transition-colors">
                  Indoor Potted Plants
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('plants')} className="hover:text-emerald-300 transition-colors">
                  Roses & Blooming Flowers
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('plants')} className="hover:text-emerald-300 transition-colors">
                  Ayurvedic Herbal Plants
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('plants')} className="hover:text-emerald-300 transition-colors">
                  Hedge & Boundary Shrubs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Contact */}
          <div className="space-y-3">
            <h3 className="font-poppins font-semibold text-white text-base">Visit Nursery</h3>
            <ul className="space-y-3 text-sm text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors text-xs font-semibold">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs">{settings.businessHours}</span>
              </li>
              <li className="pt-2">
                <a
                  href="https://maps.google.com/?q=Sri+Krishna+Nursery+Huskur+Village+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white font-medium underline underline-offset-4"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>{settings.footerText}</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNavClick('admin')} className="hover:text-emerald-200 transition-colors">
              Owner Admin Demo Login
            </button>
            <span>•</span>
            <button onClick={onOpenInquiry} className="hover:text-emerald-200 transition-colors">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
