import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Plant, Category, ActivePage } from '../types';
import { 
  Sprout, Search, Filter, MessageSquare, Sun, Droplets, 
  Flame, ChevronRight, X, ArrowLeft, Tag 
} from 'lucide-react';

interface PlantsPageProps {
  plants: Plant[];
  categories: Category[];
  setActivePage: (page: ActivePage) => void;
  onOpenInquiry: (plantName?: string) => void;
  initialCategoryFilter?: string;
}

export const PlantsPage: React.FC<PlantsPageProps> = ({
  plants,
  categories,
  setActivePage,
  onOpenInquiry,
  initialCategoryFilter = 'All'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [selectedPlantDetail, setSelectedPlantDetail] = useState<Plant | null>(null);

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesCategory = 
        selectedCategory === 'All' || 
        plant.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
        selectedCategory.toLowerCase().includes(plant.category.toLowerCase());
      
      const matchesSearch = 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (plant.kannadaName && plant.kannadaName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        plant.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesAvailability = 
        availabilityFilter === 'All' || plant.availability === availabilityFilter;

      return matchesCategory && matchesSearch && matchesAvailability;
    });
  }, [plants, selectedCategory, searchQuery, availabilityFilter]);

  return (
    <div className="py-12 bg-[#F8FFF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <button onClick={() => setActivePage('home')} className="hover:text-[#2E7D32]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2E7D32] font-semibold">Plants Catalog</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-emerald-200/60">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              <Sprout className="w-3.5 h-3.5" />
              Sri Krishna Nursery Catalog
            </span>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B] mt-2">
              Wholesale Plant Inventory
            </h1>
            <p className="text-gray-600 text-sm font-inter mt-1">
              Explore 200+ varieties of healthy nursery saplings cultivated for Indian climates.
            </p>
          </div>

          <div className="bg-white px-4 py-2.5 rounded-2xl border border-emerald-200 text-xs font-semibold text-[#2E7D32] shadow-xs flex items-center gap-2 self-start md:self-auto">
            <span>Showing {filteredPlants.length} Varieties</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm mb-10 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search plant name, Kannada name, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
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

            {/* Category Select */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none bg-[#F8FFF5] font-medium text-[#355E3B]"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Select */}
            <div className="md:col-span-3">
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none bg-[#F8FFF5] font-medium text-[#355E3B]"
              >
                <option value="All">All Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Bulk Only">Bulk Only</option>
                <option value="Pre-Order">Pre-Order</option>
              </select>
            </div>

          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
            <span className="text-xs font-semibold text-gray-500 shrink-0">Quick Filter:</span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#2E7D32] text-white font-bold'
                  : 'bg-emerald-50 text-[#355E3B] hover:bg-emerald-100'
              }`}
            >
              All Plants
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.name)}
                className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                  selectedCategory === c.name
                    ? 'bg-[#2E7D32] text-white font-bold'
                    : 'bg-emerald-50 text-[#355E3B] hover:bg-emerald-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

        </div>

        {/* Plants Product Grid */}
        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center mx-auto">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="font-poppins font-bold text-xl text-[#355E3B]">
              No Plants Match Your Filter Criteria
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Try searching with a broader keyword or reset the category and availability filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setAvailabilityFilter('All'); }}
              className="bg-[#2E7D32] text-white px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-[#1b5e20] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <motion.div
                key={plant.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image */}
                <div 
                  className="relative h-56 overflow-hidden bg-emerald-50 cursor-pointer"
                  onClick={() => setSelectedPlantDetail(plant)}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {plant.isPopular && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Flame className="w-3 h-3" />
                      Popular
                    </span>
                  )}

                  <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm ${
                    plant.availability === 'In Stock'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-amber-800 text-white'
                  }`}>
                    {plant.availability}
                  </span>

                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#2E7D32] text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                    {plant.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => setSelectedPlantDetail(plant)}
                      className="font-poppins font-bold text-base text-[#355E3B] group-hover:text-[#2E7D32] transition-colors cursor-pointer leading-snug"
                    >
                      {plant.name}
                    </h3>

                    {plant.kannadaName && (
                      <p className="text-xs text-[#2E7D32] font-semibold">
                        {plant.kannadaName}
                      </p>
                    )}

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {plant.shortDescription}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-emerald-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-medium block">Wholesale Rate</span>
                      <span className="text-xs font-bold text-[#2E7D32]">
                        {plant.wholesalePrice || 'Contact Us'}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenInquiry(plant.name)}
                      className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Plant Detail Drawer/Modal if clicked */}
      {selectedPlantDetail && (
        <div 
          className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPlantDetail(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-emerald-100 space-y-4 max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPlantDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-60 rounded-2xl overflow-hidden bg-emerald-50">
              <img
                src={selectedPlantDetail.image}
                alt={selectedPlantDetail.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="text-xs font-semibold bg-emerald-100 text-[#2E7D32] px-3 py-1 rounded-full">
                {selectedPlantDetail.category}
              </span>
              <h3 className="font-poppins font-bold text-2xl text-[#355E3B] mt-2">
                {selectedPlantDetail.name}
              </h3>
              {selectedPlantDetail.kannadaName && (
                <p className="text-sm font-semibold text-[#2E7D32] mt-0.5">
                  {selectedPlantDetail.kannadaName}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedPlantDetail.description || selectedPlantDetail.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F8FFF5] p-3 rounded-xl border border-emerald-100">
              <div>
                <span className="text-gray-400 block font-medium">Availability</span>
                <span className="font-bold text-[#2E7D32]">{selectedPlantDetail.availability}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Wholesale Rate</span>
                <span className="font-bold text-[#2E7D32]">{selectedPlantDetail.wholesalePrice || 'On Request'}</span>
              </div>
              {selectedPlantDetail.sunlight && (
                <div>
                  <span className="text-gray-400 block font-medium">Sunlight</span>
                  <span className="font-semibold text-gray-700">{selectedPlantDetail.sunlight}</span>
                </div>
              )}
              {selectedPlantDetail.watering && (
                <div>
                  <span className="text-gray-400 block font-medium">Watering</span>
                  <span className="font-semibold text-gray-700">{selectedPlantDetail.watering}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  const pName = selectedPlantDetail.name;
                  setSelectedPlantDetail(null);
                  onOpenInquiry(pName);
                }}
                className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Wholesale Inquiry for this Plant</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
