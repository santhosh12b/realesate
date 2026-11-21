import React from 'react';
import { motion } from 'framer-motion';
import { projectData } from '../../data/projectData';
import { Sparkles } from 'lucide-react';

export function Amenities() {
  return (
    <section id="amenities" className="py-12 sm:py-16 lg:py-20 bg-warmwhite border-b border-border-light overflow-hidden">
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMUNITY LIFESTYLE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald">
            15+ Planned Amenities
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted font-normal">
            Thoughtfully integrated sports, wellness, and social spaces for your family.
          </p>
        </motion.div>

        {/* Mobile-First: 2-Column Grid on Mobile with Staggered Entrance & Touch Spotlight */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {projectData.amenities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
              className="bg-white rounded-xl overflow-hidden border border-border-light shadow-sm hover:border-emerald hover:shadow-lg hover:-translate-y-1 active:scale-98 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Amenity Image with smooth touch zoom */}
              <div className="relative aspect-[4/3] sm:h-36 md:h-40 overflow-hidden bg-sage-soft">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 group-active:scale-105"
                  onError={(e) => {
                    e.target.src = '/assets/p1.jpg';
                  }}
                />
                <span className="absolute top-2 right-2 bg-emerald/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm group-hover:bg-orange-sunshine transition-colors duration-300">
                  {item.category}
                </span>
              </div>

              {/* Amenity Content */}
              <div className="p-3 sm:p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-emerald group-hover:text-emerald-dark transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-charcoal-muted line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
