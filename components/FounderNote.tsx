"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Crown, Quote, ArrowRight, Linkedin, Sparkles } from 'lucide-react';

export default function FounderNote() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-stone-200 shadow-rapido-card relative overflow-hidden group hover:border-yellow-400 transition-all"
      >
        {/* Subtle decorative accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FEF9C3]/50 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative z-10">
          {/* Founder Compact Photo */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-md bg-stone-100">
              <img
                src="/images/founder.jpg"
                alt="Rohan Shukla - Founder & CEO"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F9D024] border-2 border-white flex items-center justify-center text-obsidian shadow-sm">
              <Crown className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Founder Note Content */}
          <div className="space-y-3.5 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF9C3] text-obsidian text-[11px] font-black uppercase tracking-wider border border-yellow-300">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>A Note from Our Founder</span>
              </span>
              <span className="text-xs font-bold text-stone-500 hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
                Building Honest Mobility for Bharat
              </span>
            </div>

            <p className="text-stone-800 text-sm sm:text-base font-semibold leading-relaxed italic">
              "Every morning across our cities, millions step out hoping for a reliable, hassle-free ride. No one should have to plead with an auto driver or pay 3x surge just because it's raining. Sputo is our personal promise to bring back honesty, transparency, and dignity for both commuters and Captains."
            </p>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
              <div>
                <p className="text-sm font-black text-obsidian tracking-tight">
                  Rohan Shukla
                </p>
                <p className="text-xs font-bold text-stone-500">
                  Founder & CEO • Sputo Royale Mobility
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <a
                  href="https://www.linkedin.com/in/rohan-shukla-0b8889321/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-[#0077B5] hover:text-white text-stone-700 text-xs font-bold flex items-center gap-1.5 border border-stone-200 transition-colors shadow-sm"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <Link
                  href="/about"
                  className="px-3.5 py-1.5 rounded-xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian text-xs font-black flex items-center gap-1.5 border border-yellow-400 shadow-sm transition hover:scale-105 active:scale-95"
                >
                  <span>Our Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

