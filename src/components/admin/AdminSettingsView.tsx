import React, { useState } from 'react';
import { NurserySettings } from '../../types';
import { Settings, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface AdminSettingsViewProps {
  settings: NurserySettings;
  onSettingsUpdated: () => void;
  onResetData: () => void;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({
  settings,
  onSettingsUpdated,
  onResetData
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<NurserySettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateSettings(formData);
    showToast('Website Settings updated successfully!');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
    onSettingsUpdated();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            Website & Business Settings
          </h2>
          <p className="text-xs text-gray-500">
            Configure nursery information, phone numbers, location address, and map embeds.
          </p>
        </div>

        <button
          onClick={onResetData}
          className="text-gray-500 hover:text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Defaults</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 space-y-6">
        
        <div className="space-y-4">
          <h3 className="font-poppins font-bold text-sm text-[#355E3B] pb-2 border-b border-emerald-50">
            Nursery Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Business Name (English)</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Business Name (Kannada Script)</label>
              <input
                type="text"
                required
                value={formData.kannadaName}
                onChange={(e) => setFormData({ ...formData, kannadaName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-poppins font-bold text-sm text-[#355E3B] pb-2 border-b border-emerald-50">
            Contact & Operating Hours
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Phone Number (Call Hotline)</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">WhatsApp Number (with country code)</label>
              <input
                type="text"
                required
                value={formData.whatsappPhone}
                onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Business Hours</label>
              <input
                type="text"
                required
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Google Rating Badge Text</label>
              <input
                type="text"
                required
                value={formData.ratingText}
                onChange={(e) => setFormData({ ...formData, ratingText: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-poppins font-bold text-sm text-[#355E3B] pb-2 border-b border-emerald-50">
            Location & Map Settings
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nursery Address in Bengaluru</label>
              <textarea
                rows={2}
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Google Maps Embed URL</label>
              <input
                type="url"
                required
                value={formData.mapEmbedUrl}
                onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                <span>Settings Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save All Website Settings</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
