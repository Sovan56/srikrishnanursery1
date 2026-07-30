import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Sprout, CheckCircle2, User, Phone, Mail, Package, MessageSquareText } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';
import confetti from 'canvas-confetti';

export const InquiryFormSection: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirementType: 'Wholesale Bulk Order' as const,
    plantType: '',
    quantity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      showToast('Inquiry submitted! Our nursery sales team will call you shortly.');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // fallback
      }
    }, 600);
  };

  return (
    <section id="inquiry-form-section" className="py-20 bg-[#F8FFF5] border-b border-emerald-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl">
          
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              <Sprout className="w-3.5 h-3.5 text-[#2E7D32]" />
              Wholesale & Bulk Price Inquiry
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#355E3B]">
              Get an Instant Wholesale Quote
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-inter">
              Fill out your plant requirements below and our nursery experts will send you customized wholesale rates and truck logistics estimates.
            </p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-emerald-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#355E3B]">
                Inquiry Received!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your inquiry has been dispatched to Sri Krishna Nursery & Farm in Huskur Village, Bengaluru. We will call you at <span className="text-[#2E7D32] font-bold">{formData.phone}</span> today.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
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
                  }}
                  className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Inquiry Requirement Type *
                </label>
                <select
                  value={formData.requirementType}
                  onChange={(e) => setFormData({ ...formData, requirementType: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#2E7D32] focus:outline-none bg-[#F8FFF5]"
                >
                  <option value="Wholesale Bulk Order">Wholesale Bulk Order (Farmers / Resellers)</option>
                  <option value="Landscape Project">Landscape & Villa Project Supply</option>
                  <option value="Retail Purchase">Retail Home & Balcony Plants</option>
                  <option value="General Query">General Query / Nursery Visit</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Gowda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 99003 87803"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Plant Type / Variety
                  </label>
                  <div className="relative">
                    <Sprout className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Areca Palm, Grafted Mango, Rose"
                      value={formData.plantType}
                      onChange={(e) => setFormData({ ...formData, plantType: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Quantity Required
                  </label>
                  <div className="relative">
                    <Package className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. 100 pots / 50 saplings"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Requirement Details / Delivery Location in Karnataka
                </label>
                <div className="relative">
                  <MessageSquareText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    placeholder="Specify pot height, target land location, or any custom landscaping query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1b5e20] hover:to-[#2E7D32] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  id="inquiry-form-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Wholesale Price Quote</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
