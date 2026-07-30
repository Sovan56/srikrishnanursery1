import React from 'react';
import { WholesaleService, ActivePage } from '../types';
import { 
  Building2, Trees, Sprout, Store, Briefcase, Palmtree, 
  MessageSquare, ChevronRight, CheckCircle2 
} from 'lucide-react';

interface ServicesPageProps {
  services: WholesaleService[];
  onOpenInquiry: (serviceTitle?: string) => void;
  setActivePage: (page: ActivePage) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
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
    <div className="py-12 bg-[#F8FFF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <button onClick={() => setActivePage('home')} className="hover:text-[#2E7D32]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2E7D32] font-semibold">Wholesale Services</span>
        </div>

        {/* Title */}
        <div className="mb-12 space-y-2 pb-6 border-b border-emerald-200/60">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <Building2 className="w-3.5 h-3.5" />
            Wholesale & Commercial B2B Supply
          </span>
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Commercial Landscaping & Bulk Supply
          </h1>
          <p className="text-gray-600 text-sm font-inter">
            We partner with apartment builders, resort developers, commercial farm owners, and retail plant shops across Karnataka for bulk plant sourcing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((serv) => {
            const IconComp = getIcon(serv.iconName);
            return (
              <div
                key={serv.id}
                className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-52 bg-emerald-50">
                  <img
                    src={serv.image}
                    alt={serv.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/90 text-[#2E7D32] flex items-center justify-center shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-poppins font-bold text-xl text-[#355E3B]">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-inter">
                      {serv.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-2">
                        Target Clients & Applications
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {serv.targetClients.map((client, i) => (
                          <span key={i} className="text-[11px] font-semibold bg-[#F8FFF5] text-[#2E7D32] px-2.5 py-1 rounded-md border border-emerald-200">
                            ✓ {client}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-100">
                    <button
                      onClick={() => onOpenInquiry(serv.title)}
                      className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-3 rounded-xl font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Request Bulk Quote & Schedule Logistics</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
