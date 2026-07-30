import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { MessageSquare, Plus, Trash2, Edit2, Star, Check, X } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface AdminTestimonialsViewProps {
  testimonials: Testimonial[];
  onTestimonialsUpdated: () => void;
}

export const AdminTestimonialsView: React.FC<AdminTestimonialsViewProps> = ({
  testimonials,
  onTestimonialsUpdated
}) => {
  const { showToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    review: '',
    customerType: 'Retail Buyer' as const,
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete review from "${name}"?`)) {
      StorageService.deleteTestimonial(id);
      showToast(`Deleted review from ${name}`);
      onTestimonialsUpdated();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review) return;

    StorageService.addTestimonial({
      ...formData,
      status: 'Published'
    });
    showToast(`Added review from ${formData.name}`);
    setIsAddOpen(false);
    onTestimonialsUpdated();
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            Customer Reviews Management
          </h2>
          <p className="text-xs text-gray-500">
            Manage feedback shown on the public Google Reviews section.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FFF5] text-[#355E3B] font-bold uppercase tracking-wider text-[10px] border-b border-emerald-100">
              <tr>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5">Customer Type</th>
                <th className="p-3.5">Review Snippet</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-gray-700">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-emerald-50/50">
                  <td className="p-3.5 font-bold text-[#355E3B]">{t.name}</td>
                  <td className="p-3.5">{t.location || 'Bengaluru'}</td>
                  <td className="p-3.5">
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {t.rating}.0
                    </span>
                  </td>
                  <td className="p-3.5 font-medium">{t.customerType || 'Retail'}</td>
                  <td className="p-3.5 line-clamp-1 max-w-xs">{t.review}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <h3 className="font-poppins font-bold text-base text-[#355E3B]">Add Testimonial</h3>
              <button onClick={() => setIsAddOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-[#F8FFF5]"
                >
                  <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                  <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Review Text *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#2E7D32] text-white py-2.5 rounded-xl font-semibold">
                Save Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
