import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Mountain } from 'lucide-react';

export function ProjectOverview() {
  const points = [
    "53-Acre Master Plotted Township in Periyanaickenpalayam, Coimbatore.",
    "899 DTCP and RERA approved residential & commercial plots.",
    "Continuous 8-feet high perimeter compound wall with 24/7 guarded security.",
    "Situated just 1 km from Western Ghats foothills with abundant groundwater.",
    "Directly opposite United Public School (CBSE) on main access road.",
    "Clear legal titles, immediate registration readiness & bank loan eligibility."
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-warmwhite border-b border-border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Entrance Arch Photo with Directional Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-3"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 sm:border-4 border-white bg-white group">
              <img
                src="/assets/athipoo-entrance-arch.jpg"
                alt="Mahadev Enclave Athipoo Properties Grand Entrance Arch Gate"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={(e) => {
                  e.target.src = '/assets/p1.jpg';
                }}
              />
              <div className="absolute top-3 left-3 bg-emerald text-white text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded shadow-md">
                Grand Entrance Arch Gate
              </div>
            </div>

            {/* Quick 2-Column Info Pills with Micro-Elevation */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-white p-3 rounded-xl border border-border-light flex items-center gap-2 shadow-sm hover:border-emerald/40 transition-all">
                <ShieldCheck className="w-4 h-4 text-emerald flex-shrink-0" />
                <span className="text-xs font-bold text-emerald">8-Ft Compound Wall</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-border-light flex items-center gap-2 shadow-sm hover:border-emerald/40 transition-all">
                <Mountain className="w-4 h-4 text-emerald flex-shrink-0" />
                <span className="text-xs font-bold text-emerald">1 km to Foothills</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean, Concise Bullet Overview with Sequential Checkmark Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="space-y-1.5">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-orange-sunshine">
                ABOUT THE TOWNSHIP
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald leading-tight">
                Designed for Secure & Scenic Living
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-dark font-normal leading-relaxed">
                Mahadev Enclave by Athipoo Properties offers carefully zoned plots ready for immediate villa construction or commercial investment along the Coimbatore–Mettupalayam corridor.
              </p>
            </div>

            {/* Sequential Animated Bullet Points */}
            <div className="space-y-2.5 pt-1">
              {points.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-dark/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-orange-sunshine flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
