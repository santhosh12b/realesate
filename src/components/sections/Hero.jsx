import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, ShieldCheck, Mountain, Trees } from 'lucide-react';
import { projectData } from '../../data/projectData';

export function Hero() {
  return (
    <section id="hero" className="relative bg-warmwhite pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Content with Staggered Entrance */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Developer & Approval Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-sage-soft/80 border border-sage-border text-emerald text-[11px] sm:text-xs font-semibold uppercase tracking-wider shadow-sm">
                {projectData.developer}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-border-light text-emerald text-[11px] sm:text-xs font-semibold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-sunshine" />
                <span>{projectData.reraStatus}</span>
              </span>
            </motion.div>

            {/* Project Name & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="space-y-1 sm:space-y-2"
            >
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-emerald leading-[1.1]">
                {projectData.name}
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-orange-sunshine italic">
                {projectData.tagline}
              </p>
            </motion.div>

            {/* Clear Location Tag */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="flex items-center gap-2 text-xs sm:text-sm text-charcoal-muted font-medium"
            >
              <MapPin className="w-4 h-4 text-orange-sunshine flex-shrink-0 animate-bounce" style={{ animationDuration: '3s' }} />
              <span>{projectData.location} (Opp. United Public School)</span>
            </motion.div>

            {/* Short 1-2 Line Project Overview */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="text-sm sm:text-base text-charcoal-dark/90 leading-relaxed max-w-xl"
            >
              A 53-acre master-planned residential and commercial plotted township situated just 1 km from the Western Ghats foothills with 8-ft gated perimeter security.
            </motion.p>

            {/* Mobile-Friendly Full-Width CTA Buttons with Shimmer Sweep */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <a
                href="#enquiry"
                className="btn-primary relative overflow-hidden btn-shimmer-sweep min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm sm:text-base font-semibold shadow-md text-center active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Site Visit</span>
              </a>

              <a
                href="#highlights"
                className="btn-outline min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm sm:text-base font-semibold text-center active:scale-95 transition-all hover:translate-x-0.5"
              >
                <span>Explore Highlights</span>
                <ArrowRight className="w-4 h-4 text-orange-sunshine" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Properly Cropped Project Image with Floating Parallax Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-white group">
              <div className="overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[420px]">
                <img
                  src="/assets/banner.png"
                  alt="Mahadev Enclave 53-Acre Master Township Layout"
                  className="w-full h-full object-cover animate-hero-zoom origin-center"
                  onError={(e) => {
                    e.target.src = '/assets/p1.jpg';
                  }}
                />
              </div>

              {/* Mobile Delight: Floating Trust Pill 1 (Top-Right) */}
              <div className="absolute top-3.5 right-3.5 z-20 animate-float-pill">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-lg text-[10px] sm:text-xs font-bold text-emerald">
                  <Mountain className="w-3.5 h-3.5 text-orange-sunshine" />
                  <span>1 km to Foothills</span>
                </div>
              </div>

              {/* Mobile Delight: Floating Trust Pill 2 (Bottom-Left) */}
              <div className="absolute bottom-16 left-3.5 z-20 animate-float-pill-delayed">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/95 backdrop-blur-md border border-white/20 shadow-lg text-[10px] sm:text-xs font-bold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-sunshine" />
                  <span>8-Ft Gated Wall</span>
                </div>
              </div>

              {/* Minimal Bottom Photo Badge */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-dark/95 via-emerald-dark/45 to-transparent p-4 sm:p-5 text-white pointer-events-none">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-orange-sunshine">
                  Authentic Township Layout
                </span>
                <h2 className="font-serif text-base sm:text-xl text-white font-normal mt-0.5">
                  53 Acres • 899 DTCP Approved Plots
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
