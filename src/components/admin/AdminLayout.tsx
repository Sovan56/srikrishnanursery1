import React, { useState } from 'react';
import { AdminTab, NurserySettings } from '../../types';
import { 
  LayoutDashboard, Sprout, Tag, Image, MessageSquare, 
  HelpCircle, Settings, User, LogOut, ExternalLink, 
  Menu, X, Bell, ShieldCheck, Mail, RefreshCw 
} from 'lucide-react';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  settings: NurserySettings;
  unreadInquiriesCount: number;
  onLogout: () => void;
  onGoToSite: () => void;
  onResetData: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  settings,
  unreadInquiriesCount,
  onLogout,
  onGoToSite,
  onResetData,
  children
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { id: AdminTab; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'plants', label: 'Plants Management', icon: Sprout },
    { id: 'categories', label: 'Categories Management', icon: Tag },
    { id: 'gallery', label: 'Nursery Gallery', icon: Image },
    { id: 'testimonials', label: 'Customer Reviews', icon: MessageSquare },
    { id: 'faqs', label: 'FAQs Management', icon: HelpCircle },
    { id: 'inquiries', label: 'Inquiries & Leads', icon: Mail, badge: unreadInquiriesCount },
    { id: 'settings', label: 'Website Settings', icon: Settings },
    { id: 'profile', label: 'Admin Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8FFF5] flex flex-col md:flex-row font-inter">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-emerald-100 min-h-screen p-5 shrink-0 justify-between shadow-xs">
        
        <div className="space-y-6">
          {/* Admin Header Branding */}
          <div className="flex items-center gap-3 pb-4 border-b border-emerald-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-50" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-sm text-[#355E3B] leading-tight">
                Sri Krishna Admin
              </h2>
              <span className="text-[10px] font-semibold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded-full">
                Nursery CMS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2E7D32] text-white shadow-sm'
                      : 'text-[#355E3B] hover:bg-emerald-50/70 hover:text-[#2E7D32]'
                  }`}
                  id={`admin-nav-${item.id}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#2E7D32]' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action Controls */}
        <div className="pt-4 border-t border-emerald-100 space-y-2">
          <button
            onClick={onGoToSite}
            className="w-full bg-[#F8FFF5] hover:bg-emerald-100 text-[#2E7D32] border border-emerald-200 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>

          <button
            onClick={onResetData}
            className="w-full text-gray-500 hover:text-amber-700 hover:bg-amber-50 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            title="Reset to original demo nursery data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full text-rose-600 hover:bg-rose-50 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-emerald-100 py-3 px-4 sm:px-8 flex items-center justify-between shadow-xs sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="font-poppins font-bold text-lg text-[#355E3B] capitalize">
              {activeTab} Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Quick Link to Public Website */}
            <button
              onClick={onGoToSite}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#2E7D32] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <span>Preview Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Admin Avatar Snippet */}
            <div className="flex items-center gap-2 pl-2 border-l border-emerald-100">
              <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                SK
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-[#355E3B]">Nursery Manager</div>
                <div className="text-[10px] text-gray-500">admin@srikrishnanursery</div>
              </div>
            </div>
          </div>

        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 top-[57px] bg-black/40 z-40" onClick={() => setMobileSidebarOpen(false)}>
            <div 
              className="bg-white w-64 h-full p-5 space-y-4 shadow-xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        activeTab === item.id
                          ? 'bg-[#2E7D32] text-white'
                          : 'text-[#355E3B] hover:bg-emerald-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-emerald-100 space-y-2">
                <button
                  onClick={onGoToSite}
                  className="w-full bg-[#F8FFF5] text-[#2E7D32] border border-emerald-200 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live Site</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full text-rose-600 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Body View */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};
