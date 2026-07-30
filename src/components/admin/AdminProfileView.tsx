import React, { useState } from 'react';
import { User, KeyRound, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useToast } from '../common/ToastContainer';

export const AdminProfileView: React.FC = () => {
  const { showToast } = useToast();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      showToast('New passwords do not match', 'error');
      return;
    }
    showToast('Admin password updated successfully!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      
      <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] text-white flex items-center justify-center font-bold text-2xl shadow-md">
          SK
        </div>
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#355E3B]">
            Nursery Owner / Admin
          </h2>
          <p className="text-xs text-[#2E7D32] font-semibold">
            Sri Krishna Nursery & Farm Manager
          </p>
          <span className="text-[10px] text-gray-400 font-medium block mt-1">
            Email: admin@srikrishnanursery.com • Phone: +91 99003 87803
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
        <h3 className="font-poppins font-bold text-base text-[#355E3B] flex items-center gap-2 pb-2 border-b border-emerald-50">
          <KeyRound className="w-4 h-4 text-[#2E7D32]" />
          <span>Change Password</span>
        </h3>

        <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2E7D32] text-white py-2.5 rounded-xl font-semibold cursor-pointer"
          >
            Update Credentials
          </button>
        </form>
      </div>

    </div>
  );
};
