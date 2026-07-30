import React from 'react';
import { ActivePage, NurserySettings } from '../types';
import { ContactSection } from '../components/public/ContactSection';
import { ChevronRight } from 'lucide-react';

interface ContactPageProps {
  settings: NurserySettings;
  setActivePage: (page: ActivePage) => void;
  onOpenInquiry: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  settings,
  setActivePage,
  onOpenInquiry
}) => {
  return (
    <div className="py-12 bg-[#F8FFF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <button onClick={() => setActivePage('home')} className="hover:text-[#2E7D32]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2E7D32] font-semibold">Contact & Location</span>
        </div>

        <ContactSection
          settings={settings}
          onOpenInquiry={onOpenInquiry}
        />

      </div>
    </div>
  );
};
