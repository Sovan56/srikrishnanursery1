import React, { useState, useEffect } from 'react';
import { ActivePage, AdminTab, NurserySettings, Plant, Category, GalleryImage, Testimonial, FAQ, WholesaleService, Inquiry } from './types';
import { StorageService } from './services/storage';
import { ToastProvider } from './components/common/ToastContainer';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWidgets } from './components/common/FloatingWidgets';
import { InquiryModal } from './components/common/InquiryModal';
import { LightboxModal } from './components/common/LightboxModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { PlantsPage } from './pages/PlantsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServicesPage } from './pages/ServicesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Views
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AdminPlantsView } from './components/admin/AdminPlantsView';
import { AdminCategoriesView } from './components/admin/AdminCategoriesView';
import { AdminGalleryView } from './components/admin/AdminGalleryView';
import { AdminTestimonialsView } from './components/admin/AdminTestimonialsView';
import { AdminFAQsView } from './components/admin/AdminFAQsView';
import { AdminInquiriesView } from './components/admin/AdminInquiriesView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';
import { AdminProfileView } from './components/admin/AdminProfileView';

export function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Data State loaded from LocalStorage
  const [settings, setSettings] = useState<NurserySettings>(StorageService.getSettings());
  const [plants, setPlants] = useState<Plant[]>(StorageService.getPlants());
  const [categories, setCategories] = useState<Category[]>(StorageService.getCategories());
  const [gallery, setGallery] = useState<GalleryImage[]>(StorageService.getGallery());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(StorageService.getTestimonials());
  const [faqs, setFaqs] = useState<FAQ[]>(StorageService.getFAQs());
  const [services, setServices] = useState<WholesaleService[]>(StorageService.getServices());
  const [inquiries, setInquiries] = useState<Inquiry[]>(StorageService.getInquiries());

  // Modals state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [preselectedPlant, setPreselectedPlant] = useState<string | undefined>(undefined);
  const [selectedLightboxImg, setSelectedLightboxImg] = useState<GalleryImage | null>(null);
  const [categoryFilterForCatalog, setCategoryFilterForCatalog] = useState<string>('All');

  // Reload data helper
  const refreshData = () => {
    setSettings(StorageService.getSettings());
    setPlants(StorageService.getPlants());
    setCategories(StorageService.getCategories());
    setGallery(StorageService.getGallery());
    setTestimonials(StorageService.getTestimonials());
    setFaqs(StorageService.getFAQs());
    setServices(StorageService.getServices());
    setInquiries(StorageService.getInquiries());
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo data back to factory defaults?')) {
      StorageService.resetToDefaults();
      refreshData();
    }
  };

  const handleOpenInquiry = (plantName?: string) => {
    setPreselectedPlant(plantName);
    setIsInquiryModalOpen(true);
  };

  const handleSelectCategoryFilter = (categoryName: string) => {
    setCategoryFilterForCatalog(categoryName);
    setActivePage('plants');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // If in Admin Mode
  if (activePage === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <ToastProvider>
          <AdminLogin
            onLoginSuccess={() => setIsAdminLoggedIn(true)}
            onBackToSite={() => setActivePage('home')}
          />
        </ToastProvider>
      );
    }

    const unreadInquiriesCount = inquiries.filter(i => i.status === 'New').length;

    return (
      <ToastProvider>
        <AdminLayout
          activeTab={adminTab}
          setActiveTab={setAdminTab}
          settings={settings}
          unreadInquiriesCount={unreadInquiriesCount}
          onLogout={() => {
            setIsAdminLoggedIn(false);
            setActivePage('home');
          }}
          onGoToSite={() => setActivePage('home')}
          onResetData={handleResetDemoData}
        >
          {adminTab === 'dashboard' && (
            <AdminDashboardView
              plants={plants}
              categories={categories}
              gallery={gallery}
              testimonials={testimonials}
              inquiries={inquiries}
              onNavigateTab={setAdminTab}
            />
          )}

          {adminTab === 'plants' && (
            <AdminPlantsView
              plants={plants}
              categories={categories}
              onPlantsUpdated={refreshData}
            />
          )}

          {adminTab === 'categories' && (
            <AdminCategoriesView
              categories={categories}
              onCategoriesUpdated={refreshData}
            />
          )}

          {adminTab === 'gallery' && (
            <AdminGalleryView
              gallery={gallery}
              onGalleryUpdated={refreshData}
            />
          )}

          {adminTab === 'testimonials' && (
            <AdminTestimonialsView
              testimonials={testimonials}
              onTestimonialsUpdated={refreshData}
            />
          )}

          {adminTab === 'faqs' && (
            <AdminFAQsView
              faqs={faqs}
              onFAQsUpdated={refreshData}
            />
          )}

          {adminTab === 'inquiries' && (
            <AdminInquiriesView
              inquiries={inquiries}
              onInquiriesUpdated={refreshData}
            />
          )}

          {adminTab === 'settings' && (
            <AdminSettingsView
              settings={settings}
              onSettingsUpdated={refreshData}
              onResetData={handleResetDemoData}
            />
          )}

          {adminTab === 'profile' && (
            <AdminProfileView />
          )}
        </AdminLayout>
      </ToastProvider>
    );
  }

  // Public Web Pages Layout
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8FFF5] flex flex-col font-inter text-gray-800 antialiased selection:bg-[#2E7D32] selection:text-white">
        
        {/* Navigation Header */}
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          settings={settings}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* Main Body View */}
        <main className="flex-1">
          {activePage === 'home' && (
            <HomePage
              setActivePage={setActivePage}
              settings={settings}
              plants={plants}
              categories={categories}
              gallery={gallery}
              testimonials={testimonials}
              faqs={faqs}
              services={services}
              onOpenInquiry={handleOpenInquiry}
              onSelectGalleryImage={setSelectedLightboxImg}
              onSelectCategoryFilter={handleSelectCategoryFilter}
              onReviewAdded={refreshData}
            />
          )}

          {activePage === 'plants' && (
            <PlantsPage
              plants={plants}
              categories={categories}
              setActivePage={setActivePage}
              onOpenInquiry={handleOpenInquiry}
              initialCategoryFilter={categoryFilterForCatalog}
            />
          )}

          {activePage === 'gallery' && (
            <GalleryPage
              gallery={gallery}
              onSelectImage={setSelectedLightboxImg}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'services' && (
            <ServicesPage
              services={services}
              onOpenInquiry={handleOpenInquiry}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'testimonials' && (
            <TestimonialsPage
              testimonials={testimonials}
              setActivePage={setActivePage}
              onReviewAdded={refreshData}
            />
          )}

          {activePage === 'faqs' && (
            <FAQPage
              faqs={faqs}
              settings={settings}
              setActivePage={setActivePage}
              onOpenInquiry={() => handleOpenInquiry()}
            />
          )}

          {activePage === 'contact' && (
            <ContactPage
              settings={settings}
              setActivePage={setActivePage}
              onOpenInquiry={() => handleOpenInquiry()}
            />
          )}

          {activePage === '404' && (
            <NotFoundPage setActivePage={setActivePage} />
          )}
        </main>

        {/* Footer */}
        <Footer
          settings={settings}
          setActivePage={setActivePage}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* Floating Quick Action Widgets (Call, WhatsApp, Scroll Top) */}
        <FloatingWidgets settings={settings} />

        {/* Inquiry Form Modal */}
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          prefilledPlantName={preselectedPlant}
        />

        {/* Gallery Image Lightbox */}
        <LightboxModal
          image={selectedLightboxImg}
          onClose={() => setSelectedLightboxImg(null)}
        />

      </div>
    </ToastProvider>
  );
}

export default App;
