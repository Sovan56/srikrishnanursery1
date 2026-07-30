import React from 'react';
import { ActivePage, NurserySettings, Plant, Category, GalleryImage, Testimonial, FAQ, WholesaleService } from '../types';
import { HeroSection } from '../components/public/HeroSection';
import { AboutSection } from '../components/public/AboutSection';
import { CategoriesSection } from '../components/public/CategoriesSection';
import { FeaturedPlantsSection } from '../components/public/FeaturedPlantsSection';
import { WhyChooseUsSection } from '../components/public/WhyChooseUsSection';
import { GallerySection } from '../components/public/GallerySection';
import { WholesaleServicesSection } from '../components/public/WholesaleServicesSection';
import { ReviewsSection } from '../components/public/ReviewsSection';
import { FAQSection } from '../components/public/FAQSection';
import { ContactSection } from '../components/public/ContactSection';
import { InquiryFormSection } from '../components/public/InquiryFormSection';

interface HomePageProps {
  setActivePage: (page: ActivePage) => void;
  settings: NurserySettings;
  plants: Plant[];
  categories: Category[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  services: WholesaleService[];
  onOpenInquiry: (plantName?: string) => void;
  onSelectGalleryImage: (img: GalleryImage) => void;
  onSelectCategoryFilter: (categoryName: string) => void;
  onReviewAdded: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActivePage,
  settings,
  plants,
  categories,
  gallery,
  testimonials,
  faqs,
  services,
  onOpenInquiry,
  onSelectGalleryImage,
  onSelectCategoryFilter,
  onReviewAdded
}) => {
  return (
    <div className="space-y-0">
      <HeroSection
        setActivePage={setActivePage}
        settings={settings}
        onOpenInquiry={onOpenInquiry}
      />

      <AboutSection />

      <CategoriesSection
        categories={categories}
        setActivePage={setActivePage}
        onSelectCategory={onSelectCategoryFilter}
      />

      <FeaturedPlantsSection
        plants={plants}
        onOpenInquiry={onOpenInquiry}
        setActivePage={setActivePage}
      />

      <WhyChooseUsSection />

      <GallerySection
        gallery={gallery}
        onSelectImage={onSelectGalleryImage}
        setActivePage={setActivePage}
      />

      <WholesaleServicesSection
        services={services}
        onOpenInquiry={onOpenInquiry}
        setActivePage={setActivePage}
      />

      <ReviewsSection
        testimonials={testimonials}
        setActivePage={setActivePage}
        onReviewAdded={onReviewAdded}
      />

      <FAQSection
        faqs={faqs}
        settings={settings}
        setActivePage={setActivePage}
        onOpenInquiry={onOpenInquiry}
      />

      <ContactSection
        settings={settings}
        onOpenInquiry={onOpenInquiry}
      />

      <InquiryFormSection />
    </div>
  );
};
