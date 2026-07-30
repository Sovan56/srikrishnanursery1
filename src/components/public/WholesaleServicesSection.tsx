import React from 'react';
import { motion } from 'motion/react';
import { WholesaleService, ActivePage } from '../../types';
import { 
  Building2, Trees, Sprout, Store, Briefcase, Palmtree, 
  ArrowRight, CheckCircle2, MessageSquare 
} from 'lucide-react';

interface WholesaleServicesSectionProps {
  services: WholesaleService[];
  onOpenInquiry: (serviceTitle?: string) => void;
  setActivePage: (page: ActivePage) => void;
}

export const WholesaleServicesSection: React.FC<WholesaleServicesSectionProps> = ({
  services,
  onOpenInquiry,
  setActivePage
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return Trees;
      case 'Building2': return Building2;
      case 'Sprout': return Sprout;
      case 'Store': return Store;
      case 'Briefcase': return Briefcase;
      case 'Palmtree': return Palmtree;
      default: return Sprout;
    }
  };

  return (
    <section id="wholesale-services" className="py-20 bg-[#F8FFF5] border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <Building2 className="w-3.5 h-3.5" />
            Wholesale & Commercial B2B Services
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Bulk Plant Solutions for Every Project
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-inter">
            From 5-acre commercial fruit orchards to apartment landscaping, we deliver healthy nursery stock with complete transport logistics.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComp = getIcon(service.iconName);
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image & Overlay Icon */}
                <div className="relative h-48 overflow-hidden bg-emerald-50">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xs text-[#2E7D32] flex items-center justify-center shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-poppins font-bold text-xl text-[#355E3B] group-hover:text-[#2E7D32] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-inter">
                      {service.description}
                    </p>

                    {/* Target clients pills */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {service.targetClients.map((client, i) => (
                        <span key={i} className="text-[11px] font-medium bg-[#F8FFF5] text-[#2E7D32] px-2.5 py-1 rounded-md border border-emerald-200/60">
                          ✓ {client}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenInquiry(service.title)}
                      className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs hover:from-[#1b5e20] hover:to-[#2E7D32] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request Bulk Quote</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
