import React, { useState, useEffect } from 'react';
import { ActivePage, NurserySettings } from '../../types';
import { 
  Sprout, Phone, MessageSquare, Menu, X, ShieldCheck, 
  MapPin, Clock, Star, Search, ChevronRight 
} from 'lucide-react';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  settings: NurserySettings;
  onOpenInquiry: (plantName?: string) => void;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  settings,
  onOpenInquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'plants', label: 'Plants Catalog' },
    { id: 'gallery', label: 'Nursery Gallery' },
    { id: 'services', label: 'Wholesale Services' },
    { id: 'testimonials', label: 'Customer Reviews' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-[#2E7D32] text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-emerald-50 text-xs">
            <span className="flex items-center gap-1 font-medium bg-emerald-800/60 px-2 py-0.5 rounded-full border border-emerald-600/40">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>4.8 Rating (168+ Reviews)</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>Market Road, Huskur Village, Bengaluru</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Daily 9:00 AM – 6:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs ml-auto sm:ml-0">
            <a 
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 hover:text-emerald-200 transition-colors font-medium"
              id="top-call-link"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-emerald-500">|</span>
            <button 
              onClick={() => handleNavClick('admin')} 
              className="flex items-center gap-1 bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 px-2.5 py-0.5 rounded-full transition-colors text-xs border border-emerald-500/40"
              id="header-admin-demo-btn"
              title="Open Admin Dashboard UI"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Owner Admin Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 py-3' 
          : 'bg-[#F8FFF5] py-4 border-b border-emerald-100/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="header-logo-brand"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-300">
              <Sprout className="w-6 h-6 text-emerald-50" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-lg sm:text-xl text-[#355E3B] leading-tight tracking-tight flex items-center gap-2">
                {settings.businessName}
              </h1>
              <p className="text-xs text-[#2E7D32] font-semibold tracking-wide">
                {settings.kannadaName}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-[#355E3B]">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl transition-all duration-200 relative ${
                    isActive 
                      ? 'text-[#2E7D32] font-semibold bg-emerald-50 border border-emerald-200/60' 
                      : 'hover:text-[#2E7D32] hover:bg-emerald-50/50'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenInquiry()}
              className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1b5e20] hover:to-[#2E7D32] text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-emerald-900/15 hover:shadow-lg hover:shadow-emerald-900/25 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              id="header-inquire-btn"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Bulk Inquiry</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#355E3B] hover:bg-emerald-100/60 transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] bg-black/30 backdrop-blur-xs z-40" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="bg-white border-b border-emerald-100 p-6 shadow-2xl flex flex-col gap-3 max-h-[calc(100vh-100px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pb-3 border-b border-emerald-100 flex items-center justify-between">
              <div>
                <p className="font-poppins font-bold text-base text-[#355E3B]">{settings.businessName}</p>
                <p className="text-xs text-[#2E7D32] font-semibold">{settings.kannadaName}</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-[#2E7D32] px-2.5 py-1 rounded-full">
                Wholesale Nursery
              </span>
            </div>

            <nav className="flex flex-col gap-1 py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-left font-medium text-sm transition-colors ${
                    activePage === item.id
                      ? 'bg-emerald-50 text-[#2E7D32] font-semibold border border-emerald-200'
                      : 'text-[#355E3B] hover:bg-emerald-50/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-600" />
                </button>
              ))}
            </nav>

            <div className="pt-3 border-t border-emerald-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white py-3 rounded-xl font-medium text-sm shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Wholesale Inquiry</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full bg-emerald-100 text-[#2E7D32] hover:bg-emerald-200 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open Admin Dashboard UI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
