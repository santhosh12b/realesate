import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { ProjectHighlights } from './components/sections/ProjectHighlights';
import { ProjectOverview } from './components/sections/ProjectOverview';
import { ProjectVideo } from './components/sections/ProjectVideo';
import { Amenities } from './components/sections/Amenities';
import { Location } from './components/sections/Location';
import { EnquiryForm } from './components/sections/EnquiryForm';
import { Footer } from './components/layout/Footer';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { projectData } from './data/projectData';

export default function App() {
  const [showMobileDock, setShowMobileDock] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide mobile dock on fast scroll down, re-show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150 && currentScrollY > lastScrollY + 12) {
        // Scrolling down fast
        setShowMobileDock(false);
      } else if (currentScrollY < lastScrollY - 8 || currentScrollY < 150) {
        // Scrolling up or near top
        setShowMobileDock(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-warmwhite text-charcoal-dark font-sans flex flex-col antialiased selection:bg-orange-sunshine selection:text-white overflow-x-hidden">
      {/* 1. Header */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Project Highlights (Includes Key Statistics) */}
        <ProjectHighlights />

        {/* 4. About Mahadev Enclave */}
        <ProjectOverview />

        {/* 5. Project Video (360° Interactive 3D Reel Deck) */}
        <ProjectVideo />

        {/* 6. Amenities (2-Column Mobile Grid) */}
        <Amenities />

        {/* 7. Location Advantages */}
        <Location />

        {/* 8. Enquiry Form */}
        <EnquiryForm />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Mobile-First Luxury Floating Quick-Action Dock (< md screens) */}
      <AnimatePresence>
        {showMobileDock && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-auto sm:right-6 z-40 block md:hidden"
          >
            <div className="bg-emerald-dark/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-1.5 flex items-center justify-between gap-1.5 max-w-sm mx-auto">
              {/* Call Direct */}
              <a
                href={`tel:${projectData.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 text-white text-xs font-semibold"
                aria-label="Call Advisor"
              >
                <Phone className="w-3.5 h-3.5 text-orange-sunshine" />
                <span>Call</span>
              </a>

              {/* WhatsApp Chat */}
              <a
                href={`https://wa.me/${projectData.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Athipoo%20Properties,%20I%20am%20interested%20in%20visiting%20Mahadev%20Enclave.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 transition-all flex items-center justify-center gap-1.5 text-white text-xs font-semibold shadow-sm"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* Book Site Visit */}
              <a
                href="#enquiry"
                className="flex-1 py-2 px-2.5 rounded-xl bg-orange-sunshine hover:bg-orange-hover active:scale-95 transition-all flex items-center justify-center gap-1.5 text-white text-xs font-semibold shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Book Tour</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Floating WhatsApp Button (>= md screens) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href={`https://wa.me/${projectData.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Athipoo%20Properties,%20I%20am%20interested%20in%20visiting%20Mahadev%20Enclave.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-semibold"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
