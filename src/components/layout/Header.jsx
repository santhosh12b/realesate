import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { projectData } from '../../data/projectData';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track global page scroll progress for top reading bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "Highlights", href: "#highlights", id: "highlights" },
    { label: "About", href: "#about", id: "about" },
    { label: "Video", href: "#video", id: "video" },
    { label: "Amenities", href: "#amenities", id: "amenities" },
    { label: "Location", href: "#location", id: "location" },
    { label: "Contact", href: "#enquiry", id: "enquiry" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'highlights', 'about', 'video', 'amenities', 'location', 'enquiry'];
      const scrollPos = window.scrollY + 160;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-border-light'
          : 'bg-white/95 border-border-light'
      }`}
    >
      {/* Top Reading Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald via-orange-sunshine to-emerald origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Official Clean Logo */}
          <a href="#hero" className="flex items-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95 duration-200">
            <img
              src="/assets/logo1.png"
              alt="Athipoo Properties"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap py-1 relative ${
                    isActive
                      ? 'text-emerald'
                      : 'text-charcoal-dark/75 hover:text-emerald'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-sunshine rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-5 flex-shrink-0">
            <a
              href={`tel:${projectData.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald hover:text-emerald-dark px-2 py-1.5 transition-colors group"
            >
              <div className="relative">
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span className="relative block w-2 h-2 rounded-full bg-green-500" />
              </div>
              <Phone className="w-3.5 h-3.5 text-orange-sunshine group-hover:scale-110 transition-transform" />
              <span>{projectData.phone}</span>
            </a>

            <a
              href="#enquiry"
              className="btn-primary relative overflow-hidden btn-shimmer-sweep flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded text-xs sm:text-sm font-semibold shadow-sm whitespace-nowrap active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </a>
          </div>

          {/* Mobile Right Controls: Compact Call Button + Hamburger */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={`tel:${projectData.phone.replace(/\s+/g, '')}`}
              className="p-2 rounded-full bg-sage-soft text-emerald hover:bg-emerald hover:text-white transition-all active:scale-90 relative"
              aria-label="Call Athipoo Properties"
            >
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <Phone className="w-4 h-4 text-orange-sunshine" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-emerald hover:text-emerald-dark transition-all active:scale-90 min-w-[40px] min-h-[40px] flex items-center justify-center rounded"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Smooth Animated Reveal */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white/98 backdrop-blur-lg border-b border-border-light px-5 py-5 space-y-4 shadow-xl"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2.5 px-3 rounded-lg flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-sage-soft text-emerald font-bold translate-x-1'
                      : 'text-charcoal-dark hover:bg-warmwhite hover:text-emerald'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-orange-sunshine" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-border-light space-y-2.5">
            <a
              href={`tel:${projectData.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald py-2.5 border border-sage-border rounded-lg bg-sage-soft/40 active:scale-95"
            >
              <Phone className="w-4 h-4 text-orange-sunshine" />
              <span>Call: {projectData.phone}</span>
            </a>

            <a
              href="#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary btn-shimmer-sweep relative overflow-hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-center active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Free Site Visit</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
