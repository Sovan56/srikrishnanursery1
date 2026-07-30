import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { NurserySettings } from '../../types';

interface FloatingWidgetsProps {
  settings: NurserySettings;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ settings }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sri Krishna Nursery & Farm!\nI visited your website and would like to inquire about wholesale plant availability and pricing.`
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white text-[#2E7D32] shadow-lg border border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:scale-110 active:scale-95 transition-all duration-200 group"
          aria-label="Scroll to top"
          title="Scroll to top"
          id="scroll-to-top-btn"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Floating Call Button */}
      <a
        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
        className="pointer-events-auto w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-200 group"
        aria-label="Call Nursery"
        title={`Call ${settings.phone}`}
        id="floating-call-btn"
      >
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings.whatsappPhone}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-200 group border-2 border-white"
        aria-label="Chat on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="font-poppins font-semibold text-xs sm:text-sm tracking-wide pr-1 hidden sm:inline">
          WhatsApp Us
        </span>
      </a>

    </div>
  );
};
