import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage, ActivePage } from '../../types';
import { Camera, Maximize2, Tag, ArrowRight } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryImage[];
  onSelectImage: (image: GalleryImage) => void;
  setActivePage: (page: ActivePage) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  gallery,
  onSelectImage,
  setActivePage
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Nursery Layout', 'Saplings', 'Fruit Trees', 'Flowering', 'Landscape Projects'];

  const filteredGallery = gallery.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <section id="gallery" className="py-20 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              <Camera className="w-3.5 h-3.5" />
              Real Nursery Photos
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
              Nursery & Farm Gallery
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-inter">
              Explore real photos of our Huskur village plant polyhouses, fruit sapling beds, and landscape deliveries.
            </p>
          </div>

          <button
            onClick={() => setActivePage('gallery')}
            className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1b5e20] font-semibold text-sm bg-[#F8FFF5] px-4 py-2.5 rounded-xl border border-emerald-200 shadow-xs hover:shadow-md transition-all self-start md:self-auto"
          >
            <span>Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#2E7D32] text-white shadow-sm'
                  : 'bg-[#F8FFF5] text-[#355E3B] hover:bg-emerald-100/70 border border-emerald-200/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGallery.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectImage(img)}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-emerald-100 bg-emerald-900 cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Hover overlay icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-700/80 text-emerald-100 border border-emerald-600/40">
                    <Tag className="w-3 h-3 text-emerald-300" />
                    {img.category}
                  </span>
                  <h3 className="font-poppins font-bold text-base text-white leading-snug">
                    {img.title}
                  </h3>
                  {img.caption && (
                    <p className="text-xs text-emerald-100/80 line-clamp-1 font-inter">
                      {img.caption}
                    </p>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
