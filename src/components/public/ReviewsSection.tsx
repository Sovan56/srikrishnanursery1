import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial, ActivePage } from '../../types';
import { 
  Star, Quote, CheckCircle2, ThumbsUp, Plus, X, 
  MapPin, User, MessageSquareText 
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface ReviewsSectionProps {
  testimonials: Testimonial[];
  setActivePage: (page: ActivePage) => void;
  onReviewAdded?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  testimonials,
  setActivePage,
  onReviewAdded
}) => {
  const { showToast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    rating: 5,
    review: '',
    customerType: 'Retail Buyer' as const
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) {
      showToast('Please provide your name and review', 'error');
      return;
    }

    StorageService.addTestimonial({
      name: newReview.name,
      location: newReview.location || 'Bengaluru',
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: newReview.rating,
      review: newReview.review,
      status: 'Published',
      customerType: newReview.customerType
    });

    showToast('Thank you! Your review has been published.');
    setIsAddModalOpen(false);
    setNewReview({
      name: '',
      location: '',
      rating: 5,
      review: '',
      customerType: 'Retail Buyer'
    });
    if (onReviewAdded) onReviewAdded();
  };

  return (
    <section id="reviews" className="py-20 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Verified Google Reviews
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
              What Our Customers Say
            </h2>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-poppins font-bold text-xl text-[#355E3B]">4.8 / 5.0</span>
              <span className="text-gray-500 text-sm font-medium">(168+ Reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
            <button
              onClick={() => setActivePage('testimonials')}
              className="bg-[#F8FFF5] hover:bg-emerald-100 text-[#2E7D32] border border-emerald-300 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              All Reviews
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -4 }}
              className="bg-[#F8FFF5] p-6 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-emerald-200 absolute top-4 right-4 pointer-events-none" />

              <div className="space-y-3">
                {/* Rating Stars & Customer Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {t.customerType && (
                    <span className="text-[11px] font-semibold bg-emerald-100 text-[#2E7D32] px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {t.customerType}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-inter italic">
                  &quot;{t.review}&quot;
                </p>
              </div>

              {/* Reviewer Info Footer */}
              <div className="pt-4 border-t border-emerald-200/60 flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#355E3B] flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#43A047]" />
                  </h4>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{t.location || 'Bengaluru'}</span>
                    <span className="text-gray-300">•</span>
                    <span>{t.date}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Leave a Review Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-4">
                <h3 className="font-poppins font-bold text-lg text-[#355E3B]">
                  Share Your Experience
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Suresh Gowda"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Location / Area in Bengaluru
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarjapur, HSR Layout"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Customer Type
                  </label>
                  <select
                    value={newReview.customerType}
                    onChange={(e) => setNewReview({ ...newReview, customerType: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none bg-[#F8FFF5]"
                  >
                    <option value="Retail Buyer">Retail Home Gardener</option>
                    <option value="Farm Owner">Commercial Farm Owner</option>
                    <option value="Landscaper">Landscape Designer / Builder</option>
                    <option value="Bulk Client">Bulk Office / Resort Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share how healthy the plants were and your nursery experience..."
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
