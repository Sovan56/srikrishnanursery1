import React, { useState } from 'react';
import { Testimonial, ActivePage } from '../types';
import { 
  Star, Quote, CheckCircle2, MapPin, Plus, ChevronRight, X 
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { useToast } from '../components/common/ToastContainer';

interface TestimonialsPageProps {
  testimonials: Testimonial[];
  setActivePage: (page: ActivePage) => void;
  onReviewAdded: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
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

    showToast('Thank you! Your review has been added.');
    setIsAddModalOpen(false);
    setNewReview({
      name: '',
      location: '',
      rating: 5,
      review: '',
      customerType: 'Retail Buyer'
    });
    onReviewAdded();
  };

  return (
    <div className="py-12 bg-[#F8FFF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <button onClick={() => setActivePage('home')} className="hover:text-[#2E7D32]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2E7D32] font-semibold">Customer Reviews</span>
        </div>

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-emerald-200/60">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              ⭐ 4.8 Rating (168+ Reviews)
            </span>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
              Customer Reviews & Feedback
            </h1>
            <p className="text-gray-600 text-sm font-inter">
              Read authentic feedback from farm owners, landscape developers, and retail buyers across Bengaluru.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-5 py-3 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-emerald-200 absolute top-4 right-4 pointer-events-none" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {t.customerType && (
                    <span className="text-[11px] font-semibold bg-emerald-50 text-[#2E7D32] px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {t.customerType}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-inter italic">
                  &quot;{t.review}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-100 flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                  }}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-100"
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

            </div>
          ))}
        </div>

      </div>

      {/* Write review modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-4">
              <h3 className="font-poppins font-bold text-lg text-[#355E3B]">
                Write a Review
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
                  Full Name *
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
                  Location in Bengaluru
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarjapur Road"
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Star Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewReview({ ...newReview, rating: s })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${s <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Customer Category
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
                  placeholder="Tell us about your experience..."
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-2.5 rounded-xl font-semibold text-sm cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
