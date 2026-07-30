import React, { useState } from 'react';
import { FAQ } from '../../types';
import { HelpCircle, Plus, Trash2, Edit2, X } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface AdminFAQsViewProps {
  faqs: FAQ[];
  onFAQsUpdated: () => void;
}

export const AdminFAQsView: React.FC<AdminFAQsViewProps> = ({ faqs, onFAQsUpdated }) => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General'
  });

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '', category: 'General' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category || 'General' });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this question?')) {
      StorageService.deleteFAQ(id);
      showToast('FAQ deleted');
      onFAQsUpdated();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    if (editingFaq) {
      StorageService.updateFAQ({ ...editingFaq, ...formData });
      showToast('FAQ updated');
    } else {
      StorageService.addFAQ(formData);
      showToast('Added new FAQ');
    }

    setIsModalOpen(false);
    onFAQsUpdated();
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            FAQs Management
          </h2>
          <p className="text-xs text-gray-500">
            Edit questions and answers shown on the customer support section.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold bg-emerald-50 text-[#2E7D32] px-2.5 py-0.5 rounded-full">
                {faq.category || 'General'}
              </span>
              <h4 className="font-poppins font-bold text-sm text-[#355E3B]">{faq.question}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => handleOpenEdit(faq)} className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(faq.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg">
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
                {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Answer *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#2E7D32] text-white py-2.5 rounded-xl font-semibold">
                Save FAQ
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
