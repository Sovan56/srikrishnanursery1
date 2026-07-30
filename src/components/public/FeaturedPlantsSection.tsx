import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plant, ActivePage } from '../../types';
import { 
  Sprout, Search, Filter, MessageSquare, Sun, Droplets, 
  CheckCircle2, Flame, ArrowRight, X 
} from 'lucide-react';

interface FeaturedPlantsSectionProps {
  plants: Plant[];
  onOpenInquiry: (plantName?: string) => void;
  setActivePage: (page: ActivePage) => void;
  selectedCategoryFilter?: string;
}

export const FeaturedPlantsSection: React.FC<FeaturedPlantsSectionProps> = ({
  plants,
  onOpenInquiry,
  setActivePage,
  selectedCategoryFilter = 'All'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryOptions = [
    'All',
    'Indoor Plants',
    'Outdoor Plants',
    'Fruit Plants & Saplings',
    'Flower Plants',
    'Palm Trees',
    'Medicinal & Herbal'
  ];

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesCategory = activeCategory === 'All' || plant.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(plant.category.toLowerCase());
      const matchesSearch = 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (plant.kannadaName && plant.kannadaName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        plant.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [plants, activeCategory, searchQuery]);

  return (
    <section id="featured-plants" className="py-20 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            Featured Nursery Stock
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Our Popular Plants & Saplings
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-inter">
            Select high quality nursery varieties cultivated for maximum survival and robust growth in South India.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#F8FFF5] p-4 rounded-2xl border border-emerald-100">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search plant name (e.g. Areca Palm, Mango)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categoryOptions.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#2E7D32] text-white shadow-sm'
                      : 'bg-white text-[#355E3B] hover:bg-emerald-100/60 border border-emerald-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Plant Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-16 bg-[#F8FFF5] rounded-3xl border border-dashed border-emerald-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-[#2E7D32]">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="font-poppins font-bold text-lg text-[#355E3B]">
              No Plants Found Matching &quot;{searchQuery}&quot;
            </h3>
            <p className="text-xs text-gray-500">
              Try searching for another plant variety or reset your filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-2 text-xs font-semibold text-[#2E7D32] underline"
            >
              Clear Search & Show All Plants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredPlants.map((plant) => (
                <motion.div
                  key={plant.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image & Badges */}
                  <div className="relative h-52 overflow-hidden bg-emerald-50">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Popular badge */}
                    {plant.isPopular && (
                      <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Popular
                      </span>
                    )}

                    {/* Availability badge */}
                    <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm ${
                      plant.availability === 'In Stock'
                        ? 'bg-emerald-800 text-white'
                        : plant.availability === 'Bulk Only'
                        ? 'bg-amber-800 text-white'
                        : 'bg-emerald-950 text-emerald-200'
                    }`}>
                      {plant.availability}
                    </span>

                    {/* Category pill */}
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#2E7D32] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      {plant.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-poppins font-bold text-base text-[#355E3B] group-hover:text-[#2E7D32] transition-colors leading-snug">
                          {plant.name}
                        </h3>
                        {plant.kannadaName && (
                          <p className="text-xs text-[#2E7D32] font-semibold mt-0.5">
                            {plant.kannadaName}
                          </p>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {plant.shortDescription}
                      </p>
                    </div>

                    {/* Care Specs if available */}
                    {(plant.sunlight || plant.watering) && (
                      <div className="flex items-center gap-3 text-[11px] text-gray-500 bg-[#F8FFF5] p-2 rounded-xl border border-emerald-100">
                        {plant.sunlight && (
                          <div className="flex items-center gap-1" title="Sunlight Requirement">
                            <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="truncate">{plant.sunlight}</span>
                          </div>
                        )}
                        {plant.watering && (
                          <div className="flex items-center gap-1" title="Watering Frequency">
                            <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="truncate">{plant.watering}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price & Action Button */}
                    <div className="pt-2 border-t border-emerald-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400 font-medium block">Wholesale Rate</span>
                        <span className="text-xs font-bold text-[#2E7D32]">
                          {plant.wholesalePrice || 'Call for Quote'}
                        </span>
                      </div>

                      <button
                        onClick={() => onOpenInquiry(plant.name)}
                        className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1b5e20] hover:to-[#2E7D32] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        id={`enquire-plant-${plant.id}`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire</span>
                      </button>
                    </div>

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* View All Plants Footer Action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActivePage('plants')}
            className="bg-[#F8FFF5] hover:bg-emerald-100 text-[#2E7D32] border border-emerald-300 font-semibold px-6 py-3 rounded-2xl text-sm shadow-xs transition-colors inline-flex items-center gap-2"
          >
            <span>Explore All 200+ Plants in Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
