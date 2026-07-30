import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ, ActivePage, NurserySettings } from '../../types';
import { HelpCircle, ChevronDown, Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQ[];
  settings: NurserySettings;
  setActivePage: (page: ActivePage) => void;
  onOpenInquiry: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  settings,
  setActivePage,
  onOpenInquiry
}) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 bg-[#F8FFF5] border-b border-emerald-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Got Questions? We Have Answers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-inter">
            Everything you need to know about nursery visits, wholesale pricing, plant health, and delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-emerald-100 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left font-poppins font-bold text-base text-[#355E3B] flex items-center justify-between gap-4 hover:text-[#2E7D32] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#F8FFF5] text-[#2E7D32] flex items-center justify-center text-xs font-bold shrink-0">
                      ?
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#2E7D32] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-emerald-100' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-sm text-gray-600 leading-relaxed font-inter border-t border-emerald-50 pt-3"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Banner Card */}
        <div className="mt-12 bg-gradient-to-r from-[#2E7D32] to-[#43A047] rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-poppins font-bold text-xl">
              Still Have Questions About Plant Stock?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-inter">
              Call our nursery owner directly or drop a message on WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="bg-white text-[#2E7D32] hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-semibold text-xs shadow-sm flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {settings.phone}</span>
            </a>
            <button
              onClick={onOpenInquiry}
              className="bg-emerald-900/60 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl font-semibold text-xs border border-emerald-500/40 flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Submit Inquiry</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
