import React, { useState } from 'react';
import { Plant, Category } from '../../types';
import { 
  Sprout, Plus, Edit2, Trash2, Search, X, Check, Flame, Filter, Eye 
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface AdminPlantsViewProps {
  plants: Plant[];
  categories: Category[];
  onPlantsUpdated: () => void;
}

export const AdminPlantsView: React.FC<AdminPlantsViewProps> = ({
  plants,
  categories,
  onPlantsUpdated
}) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    kannadaName: '',
    category: categories[0]?.name || 'Indoor Plants',
    shortDescription: '',
    description: '',
    image: '',
    wholesalePrice: '',
    retailPrice: '',
    availability: 'In Stock' as const,
    isPopular: false,
    sunlight: 'Partial Shade',
    watering: 'Moderate'
  });

  const filteredPlants = plants.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          (p.kannadaName && p.kannadaName.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setEditingPlant(null);
    setFormData({
      name: '',
      kannadaName: '',
      category: categories[0]?.name || 'Indoor Plants',
      shortDescription: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      wholesalePrice: '₹100 – ₹300',
      retailPrice: '₹180 – ₹450',
      availability: 'In Stock',
      isPopular: false,
      sunlight: 'Bright indirect light',
      watering: 'Moderate (2 times/week)'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plant: Plant) => {
    setEditingPlant(plant);
    setFormData({
      name: plant.name,
      kannadaName: plant.kannadaName || '',
      category: plant.category,
      shortDescription: plant.shortDescription,
      description: plant.description || '',
      image: plant.image,
      wholesalePrice: plant.wholesalePrice || '',
      retailPrice: plant.retailPrice || '',
      availability: plant.availability,
      isPopular: plant.isPopular || false,
      sunlight: plant.sunlight || '',
      watering: plant.watering || ''
    });
    setIsModalOpen(true);
  };

  const handleDeletePlant = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      StorageService.deletePlant(id);
      showToast(`Deleted plant "${name}"`);
      onPlantsUpdated();
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Plant name is required', 'error');
      return;
    }

    if (editingPlant) {
      StorageService.updatePlant({
        ...editingPlant,
        ...formData
      });
      showToast(`Updated "${formData.name}" successfully`);
    } else {
      StorageService.addPlant(formData);
      showToast(`Added new plant "${formData.name}"`);
    }

    setIsModalOpen(false);
    onPlantsUpdated();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            Plants Management
          </h2>
          <p className="text-xs text-gray-500">
            Manage your nursery catalog, wholesale rates, and plant stock availability.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Plant</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search plant name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-60">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none bg-[#F8FFF5] font-semibold text-[#355E3B]"
          >
            <option value="All">All Categories ({plants.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plants Table */}
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FFF5] text-[#355E3B] font-bold uppercase tracking-wider text-[10px] border-b border-emerald-100">
              <tr>
                <th className="p-3.5">Plant Image</th>
                <th className="p-3.5">Plant Name & Kannada Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Wholesale Price</th>
                <th className="p-3.5">Availability</th>
                <th className="p-3.5 text-center">Popular</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-gray-700">
              {filteredPlants.map((plant) => (
                <tr key={plant.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="p-3.5">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-100 shadow-xs"
                    />
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-[#355E3B] text-xs">{plant.name}</div>
                    {plant.kannadaName && (
                      <div className="text-[11px] text-[#2E7D32] font-semibold">{plant.kannadaName}</div>
                    )}
                  </td>
                  <td className="p-3.5 font-medium">{plant.category}</td>
                  <td className="p-3.5 font-bold text-[#2E7D32]">{plant.wholesalePrice || 'N/A'}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      plant.availability === 'In Stock'
                        ? 'bg-emerald-100 text-[#2E7D32]'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {plant.availability}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    {plant.isPopular ? (
                      <span className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full text-[10px] border border-amber-200">
                        <Flame className="w-3 h-3" /> Yes
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px]">No</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(plant)}
                      className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                      title="Edit plant"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePlant(plant.id, plant.name)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete plant"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-emerald-100 space-y-4 max-h-[90vh] overflow-y-auto relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <h3 className="font-poppins font-bold text-lg text-[#355E3B]">
                {editingPlant ? 'Edit Plant Details' : 'Add New Plant to Nursery'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Plant Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Areca Palm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Kannada Script Name</label>
                  <input
                    type="text"
                    placeholder="ಅಡಿಕೆ ತಾಳೆ"
                    value={formData.kannadaName}
                    onChange={(e) => setFormData({ ...formData, kannadaName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] bg-[#F8FFF5]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Availability</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] bg-[#F8FFF5]"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Bulk Only">Bulk Only</option>
                    <option value="Pre-Order">Pre-Order</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Wholesale Price Range</label>
                  <input
                    type="text"
                    placeholder="₹120 – ₹450 / pot"
                    value={formData.wholesalePrice}
                    onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Retail Price Range</label>
                  <input
                    type="text"
                    placeholder="₹220 – ₹650"
                    value={formData.retailPrice}
                    onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Plant Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Lush tropical air-purifying plant..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPopularCheck"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="w-4 h-4 text-[#2E7D32] rounded focus:ring-2 focus:ring-[#2E7D32]"
                />
                <label htmlFor="isPopularCheck" className="font-semibold text-gray-700 cursor-pointer">
                  Mark as Popular / Featured Variety
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-2.5 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  {editingPlant ? 'Save Changes' : 'Create Plant Entry'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
