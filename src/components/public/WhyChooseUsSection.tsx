import React from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, Award, Truck, HeartHandshake, ShieldCheck, 
  Sparkles, Layers, ThumbsUp, CheckCircle2 
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const reasons = [
    {
      icon: Sprout,
      title: 'Healthy & Rooted Plants',
      description: 'Cultivated in high-grade nutrient-rich red soil mix with strong root systems for instant adaptation.'
    },
    {
      icon: Award,
      title: 'Affordable Wholesale Pricing',
      description: 'Farm-direct pricing without middleman markups, giving unmatched value for bulk buyers & retailers.'
    },
    {
      icon: Truck,
      title: 'Wholesale Transport Supply',
      description: 'Safe loading and mini-truck delivery service across Bengaluru, Hosur, Ramanagara & South Karnataka.'
    },
    {
      icon: HeartHandshake,
      title: 'Expert Nursery Guidance',
      description: 'Our experienced team helps you pick the right species for your soil type, sunlight, and irrigation.'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Guaranteed',
      description: 'Grafted from high-performing parent plants with guaranteed high fruit yield and bloom longevity.'
    },
    {
      icon: Layers,
      title: 'Large 200+ Variety Stock',
      description: 'Huge inventory of palms, indoor houseplants, fruit trees, roses, topiary shrubs, and ground cover grass.'
    },
    {
      icon: Sparkles,
      title: 'Turnkey Landscape Supply',
      description: 'End-to-end plant bulk supply for apartment builders, villa developments, and corporate IT parks.'
    },
    {
      icon: ThumbsUp,
      title: '168+ ⭐ 4.8 Customer Trust',
      description: 'Consistently top-rated by farmers, home gardeners, landscape architects, and plant resellers.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#F8FFF5] border-b border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            Why Sri Krishna Nursery
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Why Bengaluru Trusts Our Nursery
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-inter">
            We take pride in providing genuine quality, honest wholesale pricing, and long-term garden guidance.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F8FFF5] text-[#2E7D32] flex items-center justify-center border border-emerald-100 shadow-xs">
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-poppins font-bold text-base text-[#355E3B]">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-inter">
                    {reason.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#43A047]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
