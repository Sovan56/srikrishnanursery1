import React from 'react';
import { NurserySettings } from '../../types';
import { 
  MapPin, Phone, Clock, Mail, MessageCircle, Navigation, 
  ExternalLink, Sparkles, Building2, CheckCircle2 
} from 'lucide-react';

interface ContactSectionProps {
  settings: NurserySettings;
  onOpenInquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  onOpenInquiry
}) => {
  return (
    <section id="contact" className="py-20 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5" />
            Nursery Location & Contact
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#355E3B]">
            Visit Sri Krishna Nursery & Farm
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-inter">
            We are conveniently located near Madduramma Temple and the Fruit Market in Huskur Village, Bengaluru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Contact Details Card */}
          <div className="lg:col-span-5 bg-[#F8FFF5] rounded-3xl p-8 border border-emerald-100 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              <div>
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider block mb-1">
                  {settings.kannadaName}
                </span>
                <h3 className="font-poppins font-bold text-2xl text-[#355E3B]">
                  {settings.businessName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Wholesale & Retail Plant Supplier
                </p>
              </div>

              {/* Address detail */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white text-[#2E7D32] flex items-center justify-center shadow-xs border border-emerald-100 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#355E3B]">
                    Nursery Address
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-inter mt-0.5">
                    {settings.address}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Sri+Krishna+Nursery+Huskur+Village+Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#2E7D32] hover:underline font-semibold mt-1"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone detail */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white text-[#2E7D32] flex items-center justify-center shadow-xs border border-emerald-100 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#355E3B]">
                    Phone / Nursery Call
                  </h4>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-sm font-bold text-[#2E7D32] hover:underline block">
                    {settings.phone}
                  </a>
                  <p className="text-[11px] text-gray-500">Available Daily for inquiries</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white text-[#2E7D32] flex items-center justify-center shadow-xs border border-emerald-100 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#355E3B]">
                    Business Hours
                  </h4>
                  <p className="text-xs text-gray-700 font-semibold mt-0.5">
                    {settings.businessHours}
                  </p>
                  <p className="text-[11px] text-[#43A047] font-medium">Open 7 Days a Week</p>
                </div>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="pt-6 border-t border-emerald-200/60 space-y-3">
              <a
                href={`https://wa.me/${settings.whatsappPhone}?text=Hello%20Sri%20Krishna%20Nursery,%20I%20am%20inquiring%20about%20plants.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-2xl font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp (+91 99003 87803)</span>
              </a>

              <button
                onClick={onOpenInquiry}
                className="w-full bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1b5e20] hover:to-[#2E7D32] text-white py-3 rounded-2xl font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                Send Wholesale Inquiry Message
              </button>
            </div>

          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-7 bg-[#F8FFF5] rounded-3xl overflow-hidden border border-emerald-100 shadow-sm flex flex-col min-h-[350px]">
            <div className="p-4 bg-emerald-100/70 border-b border-emerald-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#2E7D32]" />
                <span className="font-poppins font-bold text-xs sm:text-sm text-[#355E3B]">
                  Google Maps Location: Huskur Village, Bengaluru
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Sri+Krishna+Nursery+Huskur+Village+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#2E7D32] hover:underline flex items-center gap-1"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 relative bg-emerald-50">
              <iframe
                title="Sri Krishna Nursery Location Map"
                src={settings.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
