import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sprout, CheckCircle2, Phone, Mail, User, Package, MessageSquareText } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from './ToastContainer';
import confetti from 'canvas-confetti';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlant?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedPlant = ''
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirementType: 'Wholesale Bulk Order' as const,
    plantType: preselectedPlant,
    quantity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedPlant) {
      setFormData(prev => ({ ...prev, plantType: preselectedPlant }));
    }
  }, [preselectedPlant]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      StorageService.addInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'N/A',
        requirementType: formData.requirementType,
        plantType: formData.plantType || 'General Inquiry',
        quantity: formData.quantity || 'N/A',
        message: formData.message || 'No additional message.'
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      showToast('Inquiry submitted successfully! Our nursery team will call you shortly.');

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore fallback
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      requirementType: 'Wholesale Bulk Order',
      plantType: '',
      quantity: '',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-lg leading-tight">
                Wholesale Inquiry
              </h3>
              <p className="text-xs text-emerald-100">
                Sri Krishna Nursery & Farm | Bengaluru
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/90"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-poppins font-bold text-xl text-[#355E3B]">
                Thank You, {formData.name}!
              </h4>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Your inquiry has been logged in our nursery system. Our owner or sales manager will call you at <strong className="text-[#2E7D32]">{formData.phone}</strong> shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="bg-[#2E7D32] text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-[#1b5e20] transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Inquiry Category *
                </label>
                <select
                  value={formData.requirementType}
                  onChange={(e) => setFormData({ ...formData, requirementType: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#2E7D32] focus:outline-none bg-emerald-50/30"
                >
                  <option value="Wholesale Bulk Order">Wholesale Bulk Order (Farmers/Resellers)</option>
                  <option value="Landscape Project">Landscape & Villa Project Supply</option>
                  <option value="Retail Purchase">Retail Home & Balcony Purchase</option>
                  <option value="General Query">General Inquiry / Nursery Visit</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Suresh Gowda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 99000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Plant Variety / Name
                  </label>
                  <div className="relative">
                    <Sprout className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Areca Palm, Mango Sapling"
                      value={formData.plantType}
                      onChange={(e) => setFormData({ ...formData, plantType: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Quantity Required
                  </label>
                  <div className="relative">
                    <Package className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. 100 pots / 20 saplings"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Requirement Details / Location
                </label>
                <div className="relative">
                  <MessageSquareText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    placeholder="Tell us about delivery location in Bengaluru, pot sizes, or garden requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1b5e20] hover:to-[#2E7D32] text-white py-3 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry To Nursery</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-gray-500">
                🔒 We respect your privacy. No spam. Direct call from Sri Krishna Nursery.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
