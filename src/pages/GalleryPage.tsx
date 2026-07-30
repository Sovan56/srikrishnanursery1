import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage, ActivePage } from '../types';
import { Camera, Maximize2, Tag, ChevronRight } from 'lucide-react';

interface GalleryPageProps {
  gallery: GalleryImage[];
  onSelectImage: (image: GalleryImage) => void;
  setActivePage: (page: ActivePage) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
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
    <div className="py-12 bg-[#F8FFF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <button onClick={() => setActivePage('home')} className="hover:text-[#2E7D32]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2E7D32] font-semibold">Nursery Gallery</span>
        </div>

        {/* Title */}
        <div className="mb-10 space-y-2 pb-6 border-b border-emerald-200/60">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <Camera className="w-3.5 h-3.5" />
            Photo Gallery
          </span>
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Sri Krishna Nursery in Pictures
          </h1>
          <p className="text-gray-600 text-sm font-inter">
            Browse high quality photos of our plant stock, nursery beds, polyhouses, and landscape deliveries across Bengaluru.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#2E7D32] text-white shadow-sm'
                  : 'bg-white text-[#355E3B] hover:bg-emerald-100/70 border border-emerald-200/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
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
                className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-emerald-100 bg-emerald-950 cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-800 text-emerald-200">
                    <Tag className="w-3 h-3 text-emerald-400" />
                    {img.category}
                  </span>
                  <h3 className="font-poppins font-bold text-lg text-white leading-snug">
                    {img.title}
                  </h3>
                  {img.caption && (
                    <p className="text-xs text-emerald-100/80 line-clamp-2 font-inter">
                      {img.caption}
                    </p>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
