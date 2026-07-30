import React, { useState } from 'react';
import { FAQ, ActivePage, NurserySettings } from '../types';
import { HelpCircle, ChevronDown, Search, ChevronRight, Phone } from 'lucide-react';

interface FAQPageProps {
  faqs: FAQ[];
  settings: NurserySettings;
  setActivePage: (page: ActivePage) => void;
  onOpenInquiry: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  faqs,
  settings,
  setActivePage,
  onOpenInquiry
}) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 bg-[#F8FFF5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <button onClick={() => setActivePage('home')} className="hover:text-[#2E7D32]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2E7D32] font-semibold">FAQs</span>
        </div>

        {/* Title */}
        <div className="mb-10 space-y-2 pb-6 border-b border-emerald-200/60">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </span>
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-sm font-inter">
            Find quick answers regarding plant varieties, wholesale pricing, nursery visits, and delivery logistics.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search questions or keywords (e.g. delivery, wholesale, visit)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none bg-white shadow-xs"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-emerald-100 shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left font-poppins font-bold text-base text-[#355E3B] flex items-center justify-between gap-4 hover:text-[#2E7D32] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#F8FFF5] text-[#2E7D32] flex items-center justify-center text-xs font-bold shrink-0">
                      ?
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#2E7D32] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed font-inter border-t border-emerald-50 pt-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm text-center space-y-4">
          <h3 className="font-poppins font-bold text-xl text-[#355E3B]">
            Have a question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Call our nursery directly at <strong className="text-[#2E7D32]">{settings.phone}</strong> or send us a WhatsApp inquiry.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="bg-[#2E7D32] text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-sm flex items-center gap-2 hover:bg-[#1b5e20] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Nursery</span>
            </a>
            <button
              onClick={onOpenInquiry}
              className="bg-emerald-100 text-[#2E7D32] px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-emerald-200 transition-colors"
            >
              Submit Inquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
