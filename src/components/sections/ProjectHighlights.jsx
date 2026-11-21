import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trees,
  MapPin,
  Building2,
  ShieldCheck,
  Mountain,
  GraduationCap,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { projectData } from '../../data/projectData';

function AnimatedCounter({ value, duration = 1.4 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  
  const numMatch = value.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || targetNum === 0) return;

    let startTime = null;
    let animId = null;

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(ease * targetNum));

      if (progress < 1) {
        animId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(targetNum);
      }
    };

    animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [isInView, targetNum, duration]);

  return (
    <span ref={ref}>
      {isInView ? displayValue : 0}
      {suffix}
    </span>
  );
}

export function ProjectHighlights() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
      case 'Compass': return <Compass className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
      default: return <CheckCircle2 className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform duration-200" />;
    }
  };

  return (
    <section id="highlights" className="py-12 sm:py-16 lg:py-20 bg-sage-soft/50 border-b border-sage-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Subtle Fade-Up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-orange-sunshine">
            PROJECT OVERVIEW & ADVANTAGES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald">
            Key Numbers & Highlights
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted font-normal">
            Essential facts and infrastructure highlights of Mahadev Enclave.
          </p>
        </motion.div>

        {/* 1. Animated Key Statistics: 2-Column Mobile Grid with Animated Glowing Rings */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {projectData.statistics.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
              className="bg-white p-4 sm:p-5 rounded-xl border border-border-light shadow-sm hover:border-emerald/50 hover:shadow-md transition-all text-center sm:text-left relative overflow-hidden group active:scale-95"
            >
              {/* Subtle Ambient Radial Highlight on Hover/Touch */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-sunshine/10 via-emerald/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-300" />

              <div className="flex items-baseline justify-center sm:justify-start gap-1 mb-1 relative z-10">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald group-hover:text-emerald-dark transition-colors">
                  <AnimatedCounter value={stat.value} duration={1.5} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-orange-sunshine uppercase tracking-wide">
                  {stat.unit}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-charcoal-dark relative z-10">
                {stat.label}
              </h3>
              <p className="text-[11px] sm:text-xs text-charcoal-muted mt-0.5 line-clamp-1 relative z-10">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 2. Highlights Cards: 2-Column Grid on Tablet/Mobile with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {projectData.highlights.map((hl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
              className="bg-white p-4 sm:p-5 rounded-xl border border-border-light shadow-sm hover:border-emerald hover:shadow-md hover:-translate-y-1 active:scale-98 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-sage-soft flex items-center justify-center flex-shrink-0 group-hover:bg-emerald/10 transition-colors">
                  {getIcon(hl.icon)}
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-emerald group-hover:text-emerald-dark transition-colors">
                  {hl.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  {hl.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-border-light/60 flex items-center gap-1.5 text-[11px] font-semibold text-orange-sunshine">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-sunshine" />
                <span>Verified Project Feature</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
