import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Lock, User, KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Demo login is admin / admin123');
    }
  };

  const handleDemoQuickLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F8FFF5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-100 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-100/50 pointer-events-none"></div>

        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8 text-emerald-50" />
          </div>
          <h2 className="font-poppins font-bold text-2xl text-[#355E3B]">
            Nursery Admin Portal
          </h2>
          <p className="text-xs text-[#2E7D32] font-semibold">
            Sri Krishna Nursery & Farm Dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-3 rounded-xl font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Login to Admin Panel</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-emerald-100 text-center space-y-3">
          <button
            onClick={handleDemoQuickLogin}
            className="w-full bg-emerald-100 hover:bg-emerald-200 text-[#2E7D32] py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>⚡ One-Click Demo Login (admin / admin123)</span>
          </button>

          <button
            onClick={onBackToSite}
            className="text-xs text-gray-500 hover:text-[#2E7D32] font-semibold flex items-center justify-center gap-1 mx-auto"
          >
            <span>Back to Public Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
