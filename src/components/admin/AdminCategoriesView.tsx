import React, { useState } from 'react';
import { Category } from '../../types';
import { Tag, Plus, Edit2, Trash2, X } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface AdminCategoriesViewProps {
  categories: Category[];
  onCategoriesUpdated: () => void;
}

export const AdminCategoriesView: React.FC<AdminCategoriesViewProps> = ({
  categories,
  onCategoriesUpdated
}) => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    count: 0
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      count: 10
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCategory(c);
    setFormData({
      name: c.name,
      description: c.description || '',
      image: c.image,
      count: c.count || 10
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      StorageService.deleteCategory(id);
      showToast(`Category "${name}" deleted`);
      onCategoriesUpdated();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCategory) {
      StorageService.updateCategory({
        ...editingCategory,
        ...formData
      });
      showToast(`Category "${formData.name}" updated`);
    } else {
      StorageService.addCategory(formData);
      showToast(`Added category "${formData.name}"`);
    }

    setIsModalOpen(false);
    onCategoriesUpdated();
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            Categories Management
          </h2>
          <p className="text-xs text-gray-500">
            Organize plant inventory into user-friendly collections.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl border border-emerald-100 shadow-xs p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-xl object-cover border border-emerald-100" />
              <div>
                <h3 className="font-poppins font-bold text-sm text-[#355E3B]">{cat.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{cat.description}</p>
                <span className="text-[10px] font-semibold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  {cat.count || 12} Varieties
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button onClick={() => handleOpenEdit(cat)} className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cat.id, cat.name)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <h3 className="font-poppins font-bold text-base text-[#355E3B]">
                {editingCategory ? 'Edit Category' : 'New Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#2E7D32] text-white py-2.5 rounded-xl font-semibold">
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
