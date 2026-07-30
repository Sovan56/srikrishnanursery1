import React from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, Phone, ArrowRight, CheckCircle2, ShieldCheck, 
  MapPin, Star, Award, Sparkles, Building2, Trees 
} from 'lucide-react';
import { ActivePage, NurserySettings } from '../../types';

interface HeroSectionProps {
  setActivePage: (page: ActivePage) => void;
  settings: NurserySettings;
  onOpenInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActivePage,
  settings,
  onOpenInquiry
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FFF5] via-[#edf7ea] to-[#F8FFF5] pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-emerald-100">
      
      {/* Subtle Background Pattern Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-200/50 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-emerald-300/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Kannada & Location Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-emerald-100/90 text-[#2E7D32] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-emerald-300/70 shadow-xs">
              <span className="flex items-center gap-1 font-bold">
                <Sparkles className="w-4 h-4 text-[#2E7D32]" />
                {settings.kannadaName}
              </span>
              <span className="text-emerald-400">•</span>
              <span className="flex items-center gap-1 text-[#355E3B]">
                <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                Market Road, Huskur, Bengaluru
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#355E3B] tracking-tight leading-[1.12]">
              Bringing Nature <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] via-[#43A047] to-[#2E7D32]">
                Closer To You
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-poppins text-lg sm:text-xl font-medium text-[#2E7D32] flex items-center gap-2">
              <Sprout className="w-5 h-5 shrink-0 text-[#66BB6A]" />
              <span>Premium Wholesale Nursery in Bengaluru</span>
            </p>

            {/* Description */}
            <p className="text-base text-[#355E3B]/90 leading-relaxed max-w-2xl font-inter">
              Direct farm supply of healthy Areca Palms, Grafted Fruit Trees, Indoor Air-Purifiers, Blooming Flowers, and Large Architectural Plants for home gardens, villa projects, and commercial farms.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-2">
              {[
                { label: 'Premium Plants', icon: Sprout },
                { label: 'Wholesale Pricing', icon: Award },
                { label: 'Healthy Saplings', icon: Trees },
                { label: 'Trusted Nursery', icon: ShieldCheck }
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-emerald-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#43A047] shrink-0" />
                  <span className="text-xs font-semibold text-[#355E3B]">{feat.label}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => setActivePage('plants')}
                className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1b5e20] hover:to-[#2E7D32] text-white px-6 py-3.5 rounded-2xl font-semibold text-base shadow-lg shadow-emerald-900/15 hover:shadow-xl hover:shadow-emerald-900/25 transition-all duration-200 flex items-center gap-2 cursor-pointer group"
                id="hero-explore-btn"
              >
                <span>Explore Plants</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenInquiry}
                className="bg-white hover:bg-emerald-50 text-[#2E7D32] border-2 border-[#2E7D32] px-6 py-3 rounded-2xl font-semibold text-base shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
                id="hero-inquire-btn"
              >
                <span>Bulk Quote</span>
              </button>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-[#355E3B] hover:text-[#2E7D32] font-semibold text-sm px-4 py-3 rounded-2xl hover:bg-emerald-100/50 transition-colors"
                id="hero-call-btn"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-[#2E7D32]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-normal">Direct Nursery Call</div>
                  <div className="text-xs font-bold">{settings.phone}</div>
                </div>
              </a>
            </div>

            {/* Google Rating Snippet */}
            <div className="pt-4 flex items-center gap-4 border-t border-emerald-200/60">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-[#355E3B] font-medium">
                <strong className="text-sm font-bold">4.8 / 5.0</strong> based on 168+ Google Reviews from Bengaluru plant lovers
              </div>
            </div>

          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80"
                  alt="Sri Krishna Nursery & Farm Bengaluru"
                  className="w-full h-[400px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="bg-[#43A047] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Wholesale Farm Hub
                  </span>
                  <h3 className="font-poppins font-bold text-xl">
                    Sri Krishna Nursery & Farm
                  </h3>
                  <p className="text-xs text-emerald-100 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Huskur Village, Near Fruit Market, Bengaluru
                  </p>
                </div>
              </div>

              {/* Floating Stat Badge 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 z-20 hidden sm:flex"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#2E7D32]">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-poppins font-bold text-xl text-[#355E3B]">100,000+</div>
                  <div className="text-xs text-gray-500 font-medium">Healthy Plants Sold</div>
                </div>
              </motion.div>

              {/* Floating Stat Badge 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 z-20 hidden sm:flex"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-poppins font-bold text-xl text-[#355E3B]">15+ Years</div>
                  <div className="text-xs text-gray-500 font-medium">Wholesale Nursery Trust</div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
