import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { projectData } from '../../data/projectData';

export function Location() {
  return (
    <section id="location" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Subtle Fade-Up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-orange-sunshine">
            <MapPin className="w-3.5 h-3.5" />
            <span>STRATEGIC CONNECTIVITY</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald">
            Location & Key Distances
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted font-normal">
            Periyanaickenpalayam along the Coimbatore–Mettupalayam Highway.
          </p>
        </motion.div>

        {/* Stacked on Mobile, 2-Column on LG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Left Column: Key Landmarks with Live Proximity Radar Pulses */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4 flex flex-col justify-between">
            <div className="space-y-2.5">
              {projectData.locationAdvantages.map((loc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-warmwhite p-3 sm:p-3.5 rounded-xl border border-border-light flex items-center justify-between hover:border-emerald/50 hover:translate-x-1 active:scale-98 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="p-1.5 rounded-lg bg-sage-soft text-emerald flex-shrink-0 group-hover:bg-emerald group-hover:text-white transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-charcoal-dark truncate group-hover:text-emerald transition-colors">
                        {loc.landmark}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-charcoal-muted truncate">
                        {loc.description}
                      </p>
                    </div>
                  </div>

                  {/* Distance Pill with Live Proximity Radar Dot */}
                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald bg-sage-soft/90 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-radar-pulse" />
                    <span>{loc.distance}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile-Friendly Full-Width Directions Button with Shimmer Sweep */}
            <div className="pt-1">
              <a
                href="https://maps.google.com/?q=Periyanaickenpalayam+Coimbatore+United+Public+School"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary relative overflow-hidden btn-shimmer-sweep min-h-[46px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold shadow-md text-center active:scale-95 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Responsive Google Maps Embed with Elevation Shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="h-64 sm:h-80 lg:h-full min-h-[260px] sm:min-h-[340px] rounded-2xl overflow-hidden border-2 sm:border-4 border-white shadow-lg bg-white flex flex-col group hover:shadow-xl transition-shadow duration-300">
              <iframe
                title="Mahadev Enclave Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15659.882483868516!2d76.9312!3d11.1465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f78d6556e409%3A0xbb58a88147d3c063!2sPeriyanaickenpalayam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full flex-1 border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-3 bg-white border-t border-border-light flex items-center justify-between text-[11px] sm:text-xs text-charcoal-muted">
                <span className="font-semibold text-emerald">Periyanaickenpalayam, CBE</span>
                <span>Opp. United Public School</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
