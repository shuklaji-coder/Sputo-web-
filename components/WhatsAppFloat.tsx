"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const whatsappUrl = "https://wa.me/918087747774?text=Hi%20Sputo,%20I%20want%20to%20book%20a%20ride.%20Please%20help%20me%20with%20pickup.";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
      {/* Floating Action Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative shadow-2xl rounded-full"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl transition-all border-2 border-white/30"
          aria-label="Book Ride on WhatsApp"
        >
          {/* Animated WhatsApp Icon */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <svg
              className="w-6 h-6 fill-white relative z-10"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.3.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.233-.244-.585-.492-.506-.677-.515-.175-.009-.376-.009-.576-.009s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.909 1.228 3.109c.15.2 2.121 3.239 5.14 4.542.718.309 1.279.494 1.716.633.722.23 1.378.197 1.898.119.58-.088 1.78-.727 2.03-1.429.25-.702.25-1.303.175-1.429-.075-.125-.276-.2-.576-.35z" />
              <path d="M12 2a9.93 9.93 0 0 0-8.549 15.006L2 22l5.12-1.343A9.934 9.934 0 1 0 12 2zm0 18.17a8.21 8.21 0 0 1-4.186-1.144l-.3-.178-3.1.813.827-3.023-.195-.311A8.23 8.23 0 1 1 12 20.17z" />
            </svg>
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-[10px] font-black tracking-wider uppercase text-white/90 leading-tight">
              Book on WhatsApp
            </p>
            <p className="text-xs font-black tracking-tight text-white leading-tight">
              +91 80877 47774
            </p>
          </div>

          <span className="sm:hidden text-xs font-black text-white">
            Book on WhatsApp
          </span>
        </a>

        {/* Close button for user control */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-stone-900 text-stone-300 hover:text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow"
          title="Dismiss WhatsApp button"
        >
          <X className="w-3 h-3" />
        </button>
      </motion.div>
    </div>
  );
}

