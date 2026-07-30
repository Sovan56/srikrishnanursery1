import React, { useState } from 'react';
import { Inquiry } from '../../types';
import { Mail, Phone, MessageSquare, Trash2, Eye, X, CheckCircle2, MessageCircle } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useToast } from '../common/ToastContainer';

interface AdminInquiriesViewProps {
  inquiries: Inquiry[];
  onInquiriesUpdated: () => void;
}

export const AdminInquiriesView: React.FC<AdminInquiriesViewProps> = ({
  inquiries,
  onInquiriesUpdated
}) => {
  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filtered = inquiries.filter((i) => {
    if (statusFilter === 'All') return true;
    return i.status === statusFilter;
  });

  const handleStatusChange = (id: string, newStatus: 'New' | 'In Touch' | 'Completed') => {
    StorageService.updateInquiryStatus(id, newStatus);
    showToast(`Updated inquiry status to "${newStatus}"`);
    onInquiriesUpdated();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete inquiry from ${name}?`)) {
      StorageService.deleteInquiry(id);
      showToast('Inquiry deleted');
      onInquiriesUpdated();
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            Inquiries & Customer Leads
          </h2>
          <p className="text-xs text-gray-500">
            Incoming wholesale price inquiries and callback requests from the website.
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-gray-300 bg-[#F8FFF5] font-semibold text-[#355E3B]"
        >
          <option value="All">All Inquiries ({inquiries.length})</option>
          <option value="New">New ({inquiries.filter(i => i.status === 'New').length})</option>
          <option value="In Touch">In Touch ({inquiries.filter(i => i.status === 'In Touch').length})</option>
          <option value="Completed">Completed ({inquiries.filter(i => i.status === 'Completed').length})</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FFF5] text-[#355E3B] font-bold uppercase tracking-wider text-[10px] border-b border-emerald-100">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Phone Number</th>
                <th className="p-3.5">Requirement</th>
                <th className="p-3.5">Plant & Quantity</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-gray-700">
              {filtered.map((inq) => (
                <tr key={inq.id} className="hover:bg-emerald-50/50">
                  <td className="p-3.5 text-gray-400 whitespace-nowrap">{inq.createdAt}</td>
                  <td className="p-3.5 font-bold text-[#355E3B]">{inq.name}</td>
                  <td className="p-3.5">
                    <a
                      href={`tel:${inq.phone}`}
                      className="font-bold text-[#2E7D32] hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{inq.phone}</span>
                    </a>
                  </td>
                  <td className="p-3.5 font-medium">{inq.requirementType}</td>
                  <td className="p-3.5">
                    <span className="font-semibold text-gray-800">{inq.plantType || 'General'}</span>
                    {inq.quantity && <span className="text-gray-400 block text-[11px]">{inq.quantity}</span>}
                  </td>
                  <td className="p-3.5">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        inq.status === 'New'
                          ? 'bg-rose-100 text-rose-700 border-rose-200'
                          : inq.status === 'In Touch'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Touch">In Touch</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right space-x-1">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg"
                      title="View inquiry detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Sri%20Krishna%20Nursery%20regarding%20your%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg inline-block"
                      title="Reply via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </a>
                    <button
                      onClick={() => handleDelete(inq.id, inq.name)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Delete inquiry"
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

      {/* Inquiry Detail View Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-emerald-100 space-y-4 relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <h3 className="font-poppins font-bold text-lg text-[#355E3B]">
                Inquiry Details
              </h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#F8FFF5] p-3 rounded-xl border border-emerald-100">
                <div>
                  <span className="text-gray-400 block font-medium">Customer Name</span>
                  <span className="font-bold text-[#355E3B] text-sm">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Phone Number</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-[#2E7D32] text-sm hover:underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 block font-medium">Requirement Type</span>
                  <span className="font-semibold text-gray-800">{selectedInquiry.requirementType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Email</span>
                  <span className="font-semibold text-gray-800">{selectedInquiry.email || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 block font-medium">Plant Variety</span>
                  <span className="font-semibold text-gray-800">{selectedInquiry.plantType || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Quantity</span>
                  <span className="font-semibold text-gray-800">{selectedInquiry.quantity || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block font-medium mb-1">Customer Message / Delivery Notes</span>
                <p className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-700 leading-relaxed italic">
                  &quot;{selectedInquiry.message}&quot;
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex-1 bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Customer</span>
                </a>

                <a
                  href={`https://wa.me/91${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedInquiry.name)},%20this%20is%20Sri%20Krishna%20Nursery.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
