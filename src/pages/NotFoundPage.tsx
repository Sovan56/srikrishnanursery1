import React from 'react';
import { ActivePage } from '../types';
import { Sprout, Home, Search } from 'lucide-react';

interface NotFoundPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setActivePage }) => {
  return (
    <div className="min-h-[70vh] bg-[#F8FFF5] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-emerald-100 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center mx-auto shadow-inner">
          <Sprout className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold text-[#2E7D32] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            404 Error
          </span>
          <h1 className="font-poppins font-bold text-3xl text-[#355E3B]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-inter">
            Oops! The nursery page you are looking for might have been moved or doesn&apos;t exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setActivePage('home')}
            className="flex-1 bg-[#2E7D32] hover:bg-[#1b5e20] text-white py-3 rounded-xl font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => setActivePage('plants')}
            className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-[#2E7D32] py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Browse Plants</span>
          </button>
        </div>
      </div>
    </div>
  );
};
