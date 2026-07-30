import React from 'react';
import { motion } from 'motion/react';
import { Category, ActivePage } from '../../types';
import { ArrowRight, Sprout, Tag } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Category[];
  setActivePage: (page: ActivePage) => void;
  onSelectCategory?: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  setActivePage,
  onSelectCategory
}) => {
  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    setActivePage('plants');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="categories" className="py-20 bg-[#F8FFF5] border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              <Sprout className="w-3.5 h-3.5" />
              Nursery Collections
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
              Explore Plant Categories
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-inter">
              Browse our complete range of wholesale indoor, outdoor, fruit, flower, and palm varieties.
            </p>
          </div>

          <button
            onClick={() => setActivePage('plants')}
            className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1b5e20] font-semibold text-sm bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-xs hover:shadow-md transition-all self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => handleCategoryClick(cat.name)}
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden bg-emerald-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {cat.kannadaName && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#2E7D32] text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {cat.kannadaName}
                  </span>
                )}

                {cat.plantCount && (
                  <span className="absolute bottom-3 right-3 bg-emerald-900/80 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3 text-emerald-300" />
                    {cat.plantCount}+ Varieties
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-poppins font-bold text-lg text-[#355E3B] group-hover:text-[#2E7D32] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#2E7D32]">
                  <span>Explore Collection</span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 group-hover:bg-[#2E7D32] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
