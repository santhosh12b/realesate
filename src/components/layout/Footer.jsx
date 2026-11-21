import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { projectData } from '../../data/projectData';

export function Footer() {
  return (
    <footer className="bg-emerald text-warmwhite pt-12 sm:pt-16 pb-20 sm:pb-16 border-t border-emerald-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-white/15">
          {/* Column 1: Brand Logo & Intro */}
          <div className="space-y-4">
            <a href="#hero" className="inline-block">
              <img
                src="/assets/logo2.png"
                alt="Athipoo Properties"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo2 fails
                  e.target.src = '/assets/logo1.png';
                  e.target.className = 'h-10 sm:h-12 w-auto object-contain brightness-0 invert';
                }}
              />
            </a>
            <p className="text-xs text-warmwhite/80 leading-relaxed max-w-xs">
              Trusted real estate developer in Coimbatore delivering legally approved, high-value gated plotted communities.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-orange-sunshine text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{projectData.reraStatus}</span>
            </div>
          </div>

          {/* Column 2: Project Key Facts */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-white/15 pb-2">
              Mahadev Enclave
            </h4>
            <div className="space-y-1.5 text-xs text-warmwhite/80">
              <p><strong className="text-white">Scale:</strong> 53-Acre Master Township</p>
              <p><strong className="text-white">Plots:</strong> 899 Approved Sites</p>
              <p><strong className="text-white">Security:</strong> 8-Ft Perimeter Wall</p>
              <p><strong className="text-white">Location:</strong> Periyanaickenpalayam</p>
              <p><strong className="text-white">Opposite:</strong> United Public School (CBSE)</p>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-white/15 pb-2">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 text-xs text-warmwhite/80">
              <li><a href="#hero" className="hover:text-orange-sunshine transition-colors">Home</a></li>
              <li><a href="#highlights" className="hover:text-orange-sunshine transition-colors">Highlights & Stats</a></li>
              <li><a href="#about" className="hover:text-orange-sunshine transition-colors">About Township</a></li>
              <li><a href="#video" className="hover:text-orange-sunshine transition-colors">Project Films</a></li>
              <li><a href="#amenities" className="hover:text-orange-sunshine transition-colors">15+ Amenities</a></li>
              <li><a href="#location" className="hover:text-orange-sunshine transition-colors">Location & Map</a></li>
              <li><a href="#enquiry" className="hover:text-orange-sunshine transition-colors">Schedule Site Visit</a></li>
            </ul>
          </div>

          {/* Column 4: Direct Developer Contact */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-white/15 pb-2">
              Contact Developer
            </h4>
            <div className="space-y-2.5 text-xs text-warmwhite/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-sunshine flex-shrink-0 mt-0.5" />
                <span>Periyanaickenpalayam, Coimbatore, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-sunshine flex-shrink-0" />
                <a href={`tel:${projectData.phone.replace(/\s+/g, '')}`} className="hover:text-white font-semibold transition-colors">
                  {projectData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-sunshine flex-shrink-0" />
                <a href={`mailto:${projectData.email}`} className="hover:text-white transition-colors">
                  {projectData.email}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${projectData.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Athipoo%20Properties,%20I%20am%20interested%20in%20visiting%20Mahadev%20Enclave.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] text-white rounded text-xs font-semibold hover:bg-[#20ba59] active:scale-95 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Address (with right padding so floating WhatsApp button never overlaps) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-warmwhite/60 text-center sm:text-left sm:pr-36">
          <div>
            © {new Date().getFullYear()} Athipoo Properties. All rights reserved. DTCP & RERA Approved.
          </div>
          <div>
            Periyanaickenpalayam, Coimbatore (Opp. United Public School)
          </div>
        </div>
      </div>
    </footer>
  );
}
