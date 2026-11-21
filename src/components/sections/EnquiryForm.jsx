import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { projectData } from '../../data/projectData';

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    interestedIn: 'Residential Plot',
    visitDate: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile Number is required';
    } else if (!/^[0-9+\s()-]{10,15}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid 10-digit number';
    }
    if (!formData.visitDate) {
      errs.visitDate = 'Please select a visit date';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 500);
    }
  };

  return (
    <section id="enquiry" className="py-12 sm:py-16 lg:py-20 bg-warmwhite border-b border-border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Outreach & Project Assurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-5 sm:space-y-6"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-orange-sunshine">
                <Calendar className="w-3.5 h-3.5" />
                <span>BOOK YOUR SITE VISIT</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald">
                Schedule an On-Site Inspection
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Connect directly with Athipoo Properties to explore available plots and confirm your visit date.
              </p>
            </div>

            {/* Direct Contact Cards with Touch-Friendly Tap Targets */}
            <div className="space-y-3">
              {/* Call Now Card */}
              <a
                href={`tel:${projectData.phone.replace(/\s+/g, '')}`}
                className="bg-white p-3.5 sm:p-4 rounded-xl border border-border-light hover:border-emerald flex items-center justify-between transition-all group shadow-sm hover:shadow-md min-h-[56px] active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-orange-sunshine" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-semibold text-charcoal-muted uppercase">
                      Call Developer Direct
                    </div>
                    <div className="text-sm sm:text-base font-bold text-emerald group-hover:text-emerald-dark">
                      {projectData.phone}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-orange-sunshine group-hover:translate-x-1 transition-transform">Call →</span>
              </a>

              {/* WhatsApp Us Card */}
              <a
                href={`https://wa.me/${projectData.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Athipoo%20Properties,%20I%20am%20interested%20in%20Mahadev%20Enclave%20plots.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3.5 sm:p-4 rounded-xl border border-border-light hover:border-emerald flex items-center justify-between transition-all group shadow-sm hover:shadow-md min-h-[56px] active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-semibold text-charcoal-muted uppercase">
                      Chat on WhatsApp
                    </div>
                    <div className="text-sm sm:text-base font-bold text-emerald group-hover:text-emerald-dark">
                      Instant Plot Details
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#25D366] group-hover:translate-x-1 transition-transform">Chat →</span>
              </a>
            </div>

            {/* Timing Badge */}
            <div className="p-3.5 rounded-xl bg-sage-soft border border-sage-border text-xs text-charcoal-dark space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-emerald">
                <Clock className="w-3.5 h-3.5 text-orange-sunshine" />
                <span>Visiting Hours: 9:00 AM — 6:30 PM (All 7 Days)</span>
              </div>
              <p className="text-[11px] text-charcoal-muted">
                Free pickup from Periyanaickenpalayam bus stop upon prior confirmation.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Mobile-Optimized Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-5 sm:p-8 rounded-2xl border border-border-light shadow-md relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* Celebration Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="py-8 text-center space-y-3"
                  >
                    <div className="relative w-16 h-16 mx-auto">
                      <span className="absolute inset-0 rounded-full bg-emerald/20 animate-ping" />
                      <div className="relative w-16 h-16 rounded-full bg-emerald text-white flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-10 h-10 text-orange-sunshine" />
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-emerald">
                      Visit Request Received!
                    </h3>

                    <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong className="text-charcoal-dark">{formData.fullName}</strong>. Our Athipoo team will call you at <strong className="text-charcoal-dark">{formData.phone}</strong> to confirm timings for <strong className="text-charcoal-dark">{formData.visitDate}</strong>.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            fullName: '',
                            phone: '',
                            interestedIn: 'Residential Plot',
                            visitDate: '',
                            message: '',
                          });
                        }}
                        className="text-xs font-semibold uppercase tracking-wider text-emerald hover:text-emerald-dark underline"
                      >
                        Book Another Visit
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald mb-2">
                      Schedule Your Free Tour
                    </h3>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal-dark uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full bg-warmwhite/40 border rounded-lg px-3.5 py-2.5 text-base text-charcoal-dark focus:outline-none focus:ring-4 focus:ring-emerald/15 focus:border-emerald transition-all shadow-sm ${
                          errors.fullName ? 'border-red-400' : 'border-border-light'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-500">{errors.fullName}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal-dark uppercase tracking-wide">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full bg-warmwhite/40 border rounded-lg px-3.5 py-2.5 text-base text-charcoal-dark focus:outline-none focus:ring-4 focus:ring-emerald/15 focus:border-emerald transition-all shadow-sm ${
                          errors.phone ? 'border-red-400' : 'border-border-light'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Interested In & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal-dark uppercase tracking-wide">
                          Interested In
                        </label>
                        <select
                          value={formData.interestedIn}
                          onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                          className="w-full bg-warmwhite/40 border border-border-light rounded-lg px-3.5 py-2.5 text-base text-charcoal-dark focus:outline-none focus:ring-4 focus:ring-emerald/15 focus:border-emerald transition-all shadow-sm"
                        >
                          <option value="Residential Plot">Residential Plot</option>
                          <option value="Road-Facing Commercial Plot">Commercial Plot</option>
                          <option value="Both Residential & Commercial">Both</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal-dark uppercase tracking-wide">
                          Preferred Visit Date *
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.visitDate}
                          onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                          className={`w-full bg-warmwhite/40 border rounded-lg px-3.5 py-2.5 text-base text-charcoal-dark focus:outline-none focus:ring-4 focus:ring-emerald/15 focus:border-emerald transition-all shadow-sm ${
                            errors.visitDate ? 'border-red-400' : 'border-border-light'
                          }`}
                        />
                        {errors.visitDate && <p className="text-[11px] text-red-500">{errors.visitDate}</p>}
                      </div>
                    </div>

                    {/* Message (Optional) */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal-dark uppercase tracking-wide">
                        Message (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Preferred plot size or any questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-warmwhite/40 border border-border-light rounded-lg px-3.5 py-2.5 text-base text-charcoal-dark focus:outline-none focus:ring-4 focus:ring-emerald/15 focus:border-emerald transition-all shadow-sm resize-none"
                      />
                    </div>

                    {/* Submit Button with Shimmer Sweep */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary relative overflow-hidden btn-shimmer-sweep min-h-[48px] w-full py-3.5 rounded-lg text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                      >
                        {isSubmitting ? (
                          <span>Submitting Request...</span>
                        ) : (
                          <span>Schedule My Free Site Visit</span>
                        )}
                      </button>
                      <p className="text-[10px] sm:text-[11px] text-center text-charcoal-muted mt-2">
                        Confidential & zero spam. Athipoo Properties will contact you directly.
                      </p>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
