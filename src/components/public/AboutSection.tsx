import React from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, Award, Users, Trees, Heart, ShieldCheck, 
  CheckCircle2, MapPin, Truck, Sparkles 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '15+', icon: Award, desc: 'Serving Bengaluru & Karnataka' },
    { label: 'Plants Sold', value: '100k+', icon: Trees, desc: 'Wholesale & Retail Farm Supply' },
    { label: 'Plant Varieties', value: '200+', icon: Sprout, desc: 'Indoor, Fruit, Flower & Palms' },
    { label: 'Happy Customers', value: '15,000+', icon: Users, desc: 'Farmers, Builders & Home Gardeners' }
  ];

  const highlights = [
    'Direct Farm Wholesale Pricing',
    'Rooted & Acclimated Healthy Saplings',
    'Authentic Grafted Fruit Tree Varieties',
    'Bulk Supply for Builders & Landscapers',
    'Expert Guidance on Soil & Fertilization',
    'Prompt Delivery Across Bengaluru & State'
  ];

  return (
    <section id="about-us" className="py-20 bg-white border-b border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
            About Sri Krishna Nursery & Farm
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Nurturing Bengaluru with Greenery for Over 15 Years
          </h2>
          <p className="text-gray-600 text-base leading-relaxed font-inter">
            Situated near Madduramma Temple and the Fruit Market at Huskur Village, we are one of Bengaluru’s most trusted wholesale nurseries.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Nursery Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-50 bg-emerald-100">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80"
                alt="Sri Krishna Nursery Farm Layout"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=900&q=80';
                }}
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  Huskur Village Nursery Hub
                </div>
                <h3 className="font-poppins font-bold text-xl">
                  5+ Acres of Lush Nursery Beds & Polyhouses
                </h3>
              </div>
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#2E7D32] text-white p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-300 shrink-0" />
                <div>
                  <h4 className="font-poppins font-bold text-sm">100% Quality Guaranteed</h4>
                  <p className="text-xs text-emerald-100">Pest-free, high-survival rate saplings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-poppins font-bold text-2xl text-[#355E3B]">
                Your Complete One-Stop Destination for Wholesale & Retail Plants
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                At <strong>Sri Krishna Nursery & Farm (ಶ್ರೀ ಕೃಷ್ಣ ನರ್ಸರಿ ಮತ್ತು ಕೃಷಿ)</strong>, we believe every garden, apartment balcony, farm, and corporate landscape deserves healthy, resilient plants that thrive effortlessly in South Indian climate.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Whether you are a commercial farmer planting 500 Mango saplings, a landscape developer searching for Areca Palms, or a home gardener picking indoor air-purifying pots, our experienced team provides personalized care, competitive wholesale rates, and expert planting advice.
              </p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#43A047] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#355E3B]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2E7D32] bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                <MapPin className="w-4 h-4 text-[#2E7D32]" />
                <span>Visit Us: Sanjeevinagar, Huskur Village, Bengaluru</span>
              </div>
            </div>

          </div>

        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#F8FFF5] p-6 rounded-2xl border border-emerald-100 text-center space-y-2 shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-[#2E7D32] flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="font-poppins font-extrabold text-3xl text-[#355E3B]">
                  {stat.value}
                </div>
                <div className="font-poppins font-bold text-sm text-[#2E7D32]">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
