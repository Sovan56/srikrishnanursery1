import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Tag, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../../types';

interface LightboxModalProps {
  image: GalleryImage | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  image,
  onClose,
  onNext,
  onPrev
}) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[9995] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-5xl w-full bg-[#1b2b1e] rounded-2xl overflow-hidden border border-emerald-800 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white/90 hover:bg-black hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous / Next controls */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 md:right-[320px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image Display Area */}
          <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[450px]">
            <img
              src={image.url}
              alt={image.title}
              className="max-h-[70vh] w-auto max-w-full object-contain"
            />
          </div>

          {/* Sidebar / Info */}
          <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-emerald-950 text-emerald-100 border-t md:border-t-0 md:border-l border-emerald-900">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-800 text-emerald-200 border border-emerald-700 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-400" />
                  {image.category}
                </span>
              </div>

              <h3 className="font-poppins font-bold text-xl text-white">
                {image.title}
              </h3>

              {image.caption && (
                <p className="text-sm text-emerald-200/90 leading-relaxed">
                  {image.caption}
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-emerald-900 flex items-center justify-between text-xs text-emerald-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Nursery Photo</span>
              </span>
              <span>Sri Krishna Nursery</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
