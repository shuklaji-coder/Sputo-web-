"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, KeyRound, PhoneCall, Star, Award, Zap } from 'lucide-react';

export default function RoyalPerks() {
  const perks = [
    {
      icon: <Award className="w-6 h-6 text-obsidian" />,
      title: "Zero Surge Multipliers",
      desc: "Never suffer 3x surge gouging during rain or rush hours. Fares are computed via transparent server rates."
    },
    {
      icon: <Zap className="w-6 h-6 text-obsidian fill-[#F9D024]" />,
      title: "Fastest Traffic Bypass",
      desc: "Navigate through congested bottlenecks quickly with agile verified Bike Taxis and doorstep Autos."
    },
    {
      icon: <KeyRound className="w-6 h-6 text-obsidian" />,
      title: "4-Digit Start OTP Guard",
      desc: "Trips cannot begin without your personal OTP handshake, ensuring you never step into the wrong vehicle."
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-obsidian" />,
      title: "24/7 Rapid Safety Desk",
      desc: "Instant live emergency assistance and route telemetry monitored by our rapid-response central control room."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Enter Pickup & Destination",
      desc: "Use high-precision satellite autocomplete or 1-tap popular routes to select your exact destination."
    },
    {
      num: "02",
      title: "Choose Bike, Auto, or Cab",
      desc: "Review upfront transparent pricing with zero bargaining and zero hidden surcharges."
    },
    {
      num: "03",
      title: "Share OTP & Enjoy Your Ride",
      desc: "Track your Captain live on Google Maps, verify the 4-digit OTP, and arrive safely at your destination."
    }
  ];

  const testimonials = [
    {
      name: "Adv. Meera Singhania",
      role: "High Court Counsel, Mumbai",
      quote: "Sputo is my preferred ride between court hearings and Nariman Point offices. The AC is chilled, the drivers are respectful, and the billing is always honest.",
      rating: 5
    },
    {
      name: "Rohan Deshmukh",
      role: "Tech Lead, BKC Financial Center",
      quote: "Sputo Bike saves me at least 40 minutes every evening through the Western Express Highway gridlock. Best commuter decision I've made.",
      rating: 5
    },
    {
      name: "Dr. Ananya Roy",
      role: "Consultant Neurologist, Powai, Mumbai",
      quote: "The 4-digit OTP security and live ride share link gives me complete peace of mind during late-night hospital shifts. Unmatched safety standard.",
      rating: 5
    }
  ];

  return (
    <section id="safety" className="py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Perks Grid */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-obsidian bg-[#FEF9C3] px-4 py-1.5 rounded-full border border-yellow-300">
            Why Commuters Choose Sputo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-obsidian mt-3">
            Built for Certainty & Safety.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-semibold">
            We redesigned urban transit from the ground up to replace ride-cancellation frustration with pure certainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {perks.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-stone-50 p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-rapido-card hover:border-yellow-400 transition-all cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] border border-yellow-300 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-lg font-black text-obsidian mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section 2: How It Works */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-obsidian">
              Three Simple Steps to Move
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-semibold mt-1">
              From web tap to boarding in under three minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative p-8 rounded-3xl bg-stone-50 border border-stone-200 shadow-sm hover:shadow-rapido-card hover:border-yellow-400 transition-all"
              >
                <span className="text-5xl font-black text-stone-200 absolute top-6 right-6">
                  {st.num}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-[#F9D024] text-obsidian font-black flex items-center justify-center mb-5 shadow-sm">
                  {st.num}
                </div>
                <h4 className="text-lg font-black text-obsidian mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-obsidian bg-[#FEF9C3] px-3.5 py-1 rounded-full border border-yellow-300">
              Patron Reviews
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-obsidian mt-3">
              Trusted by Daily Commuters
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-stone-50 border border-stone-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F9D024] text-obsidian" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 font-medium italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <p className="text-sm font-black text-obsidian">
                    {t.name}
                  </p>
                  <p className="text-[11px] font-semibold text-stone-500 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
