import React, { useState } from 'react';
import { GalleryImage } from '../../types';
import { Image, Plus, Trash2, X, Tag } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface AdminGalleryViewProps {
  gallery: GalleryImage[];
  onGalleryUpdated: () => void;
}

export const AdminGalleryView: React.FC<AdminGalleryViewProps> = ({
  gallery,
  onGalleryUpdated
}) => {
  const { showToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    category: 'Nursery Layout' as const,
    caption: ''
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete photo "${title}"?`)) {
      StorageService.deleteGalleryImage(id);
      showToast(`Deleted gallery photo "${title}"`);
      onGalleryUpdated();
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url || !formData.title) return;

    StorageService.addGalleryImage(formData);
    showToast(`Added photo "${formData.title}"`);
    setIsAddOpen(false);
    setFormData({ url: '', title: '', category: 'Nursery Layout', caption: '' });
    onGalleryUpdated();
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            Nursery Gallery Management
          </h2>
          <p className="text-xs text-gray-500">
            Upload and tag high-resolution photos of plant beds, polyhouses, and landscape sites.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-xs group relative">
            <div className="h-44 bg-emerald-50 relative">
              <img
                src={img.url}
                alt={img.title}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(img.id, img.title)}
                className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-80 group-hover:opacity-100 shadow-sm transition-opacity"
                title="Delete Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3 space-y-1">
              <span className="text-[10px] font-bold bg-emerald-50 text-[#2E7D32] px-2 py-0.5 rounded-full inline-block">
                {img.category}
              </span>
              <h4 className="font-poppins font-bold text-xs text-[#355E3B] truncate">{img.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <h3 className="font-poppins font-bold text-base text-[#355E3B]">Upload Photo</h3>
              <button onClick={() => setIsAddOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grafted Mango Polyhouse"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Category Tag</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-[#F8FFF5]"
                >
                  <option value="Nursery Layout">Nursery Layout</option>
                  <option value="Saplings">Saplings</option>
                  <option value="Fruit Trees">Fruit Trees</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Landscape Projects">Landscape Projects</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  placeholder="Details about plant age or nursery section..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#2E7D32] text-white py-2.5 rounded-xl font-semibold">
                Add to Gallery
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
