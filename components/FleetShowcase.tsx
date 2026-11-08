"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Car, Shield, Wind, Sparkles, Check, ArrowRight, Zap } from 'lucide-react';

export default function FleetShowcase() {
  const [activeTab, setActiveTab] = useState<'bike' | 'auto' | 'cab' | 'priority' | 'suv'>('bike');

  return (
    <section id="fleet" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-obsidian bg-[#FEF9C3] px-4 py-1.5 rounded-full border border-yellow-300">
          Services That Move Bharat
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-obsidian mt-3">
          Reliable Commutes for Every Need.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 font-semibold">
          Whether you want to bypass traffic jams or travel in chilled AC comfort, choose from our high-rated verified fleet.
        </p>
      </div>

      {/* Fleet Tabs (Pro-Designer Liquid Spring Switcher - Horizontally scrollable on mobile) */}
      <div className="flex justify-start sm:justify-center mb-8 overflow-x-auto no-scrollbar py-2 px-1">
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-100 border border-stone-200 shadow-sm shrink-0 gap-1 relative">
          {[
            { id: 'bike' as const, label: 'Bike Taxi', icon: Bike },
            { id: 'auto' as const, label: 'Sputo Auto', icon: Car },
            { id: 'cab' as const, label: 'Royale Cab', icon: Car },
            { id: 'priority' as const, label: '⚡ Priority', icon: Zap },
            { id: 'suv' as const, label: 'Sputo SUV', icon: Car },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-colors ${
                  isCurrent ? 'text-obsidian' : 'text-stone-700 hover:text-obsidian'
                }`}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="fleetActivePill"
                    className="absolute inset-0 bg-[#F9D024] rounded-xl shadow-rapido border border-yellow-400 -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${tab.id === 'priority' ? 'fill-amber-500 stroke-obsidian' : 'stroke-[2.5]'}`} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Fleet Showcase Content Card with AnimatePresence */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-stone-200 shadow-rapido-card overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
        {activeTab === 'bike' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Column (Order 2 on Mobile, Order 1 on Desktop) */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black border border-yellow-300">
                <Bike className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>#1 Commuter Traffic Buster</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-obsidian">
                Sputo Bike Taxi
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                Beat the bumper-to-bumper city jams with the quickest solo ride. Our verified Captains carry sanitized helmets and hairnets for your daily safety and hygiene.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Beat Heavy Traffic</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Save 30-45 mins on peak routes</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Sanitized Helmet</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Clean protective gear provided</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Most Affordable</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Starts at ₹25 base fare</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Ride Insurance</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Comprehensive accident cover</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-4">
                <a
                  href="#booking-engine"
                  className="px-6 py-3.5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center gap-2"
                >
                  <span>Book Bike Taxi Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </a>
                <span className="text-xs font-black text-obsidian">
                  From ₹9.5/km • Zero Surge
                </span>
              </div>
            </div>

            {/* Image Column (Order 1 on Mobile so it is visible first, Order 2 on Desktop) */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-stone-200 shadow-lg bg-stone-100">
                <img
                  src="/images/bike-taxi-showcase.jpg"
                  alt="Sputo Bike Taxi"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/bike-taxi-showcase.jpg')) {
                      target.src = '/bike-taxi-showcase.jpg';
                    }
                  }}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'auto' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black border border-yellow-300">
                <Car className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Doorstep Auto With No Meter Haggling</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-obsidian">
                Sputo Auto
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                Enjoy transparent meter rates without roadside rejections or arguments. Clean auto-rickshaws with guaranteed digital UPI billing and doorstep pickup.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Zero Bargaining</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Locked digital fare upfront</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">City Agility</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Direct access to narrow lanes</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Cashless QR</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Instant GPay / PhonePe payment</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">3-Seater Comfort</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Spacious seat with luggage room</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-4">
                <a
                  href="#booking-engine"
                  className="px-6 py-3.5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center gap-2"
                >
                  <span>Book Sputo Auto</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </a>
                <span className="text-xs font-black text-obsidian">
                  From ₹14/km • Dependable Meter Rate
                </span>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-stone-200 shadow-lg bg-stone-100">
                <img
                  src="/images/sputo-auto-showcase.jpg"
                  alt="Sputo Auto"
                  loading="eager"
                  decoding="async"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black border border-yellow-300">
                <Car className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Executive AC Sedan Comfort</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-obsidian">
                Sputo Royale Cab
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                Whisper-quiet sedans and spacious hatchbacks with guaranteed chilled climate control, courteous 4.9★ Captains, and spacious boots for airport suitcases.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Wind className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Chilled AC On Always</p>
                    <p className="text-[11px] text-stone-500 font-semibold">No driver refusal for AC</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Top 5% Captains</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Minimum 4.85★ rating threshold</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Spacious Boot</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Room for 3+ large bags</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Lowest Cancellation</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Guaranteed pickup reliability</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-4">
                <a
                  href="#booking-engine"
                  className="px-6 py-3.5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center gap-2"
                >
                  <span>Book Royale Cab Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </a>
                <span className="text-xs font-black text-obsidian">
                  From ₹21/km • AC Included
                </span>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-stone-200 shadow-lg bg-stone-100">
                <img
                  src="/images/sputo-cab-showcase.jpg"
                  alt="Royale Cab"
                  loading="eager"
                  decoding="async"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'priority' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-obsidian text-xs font-black border border-amber-300">
                <Zap className="w-3.5 h-3.5 fill-amber-500 stroke-obsidian" />
                <span>Guaranteed 2-Min Pickup • Zero Driver Refusal</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-obsidian">
                ⚡ Sputo Priority Cab & SUV
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                In a rush for an airport flight, railway departure, or urgent meeting? Sputo Priority locks the closest 4.9★ Captain with lightning radar dispatch and zero driver cancellation.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Lightning 2-Min Dispatch</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Immediate radar lock to nearest cab</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Zero Cancellation</p>
                    <p className="text-[11px] text-stone-500 font-semibold">100% pickup fulfillment guarantee</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Top 1% Captains</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Minimum 4.9★ rating threshold</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Wind className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Chilled AC Always</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Strict zero-AC refusal policy</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-4">
                <a
                  href="#booking-engine"
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-amber-500 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-obsidian stroke-obsidian" />
                  <span>Book Priority Ride Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </a>
                <span className="text-xs font-black text-obsidian">
                  From ₹24/km • Guaranteed Fastest
                </span>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-stone-200 shadow-lg bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 p-6 sm:p-8 flex flex-col items-center justify-center text-white relative">
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-obsidian text-xs font-black">
                  <Zap className="w-3.5 h-3.5 fill-obsidian stroke-obsidian" />
                  <span>EXPRESS DISPATCH</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-stone-800/80 rounded-2xl p-4 border border-stone-700 text-center group hover:border-amber-400 transition">
                    <img
                      src="/images/fleet/priority-cab.png"
                      alt="Priority Cab"
                      loading="eager"
                      className="w-full h-28 sm:h-36 object-contain group-hover:scale-105 transition-transform"
                    />
                    <p className="text-xs font-black text-white mt-2">Priority Swift Sedan</p>
                    <p className="text-[10px] text-amber-400 font-bold">4 Passengers • Chilled AC</p>
                  </div>
                  <div className="bg-stone-800/80 rounded-2xl p-4 border border-stone-700 text-center group hover:border-amber-400 transition">
                    <img
                      src="/images/fleet/priority-suv.png"
                      alt="Priority SUV"
                      loading="eager"
                      className="w-full h-28 sm:h-36 object-contain group-hover:scale-105 transition-transform"
                    />
                    <p className="text-xs font-black text-white mt-2">Priority 6-Seater SUV</p>
                    <p className="text-[10px] text-amber-400 font-bold">6 Passengers • Heavy Boot</p>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 font-semibold mt-4 text-center">
                  Equipped with live priority radar matching for airport, office rush, and emergency travels.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black border border-yellow-300">
                <Car className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>6-Seater Family & Heavy Luggage Power</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-obsidian">
                Sputo SUV
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                Traveling with family, colleagues, or oversized luggage? Book premium 6-seater Innova Crysta, Maruti Ertiga, or Kia Carens with dual climate AC and top-tier senior Captains.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">6 Passenger Seating</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Spacious 3-row comfort</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Heavy Luggage Room</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Fits 4+ large suitcases</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Dual Chilled AC</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Rear roof air vents</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <div>
                    <p className="text-xs font-bold text-obsidian">Airport & Outstation</p>
                    <p className="text-[11px] text-stone-500 font-semibold">Highway & city cruise certified</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-4">
                <a
                  href="#booking-engine"
                  className="px-6 py-3.5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center gap-2"
                >
                  <span>Book Sputo SUV Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </a>
                <span className="text-xs font-black text-obsidian">
                  From ₹28.5/km • Guaranteed 6-Seater
                </span>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-stone-200 shadow-lg bg-stone-100">
                <img
                  src="/images/sputo-suv-showcase.jpg"
                  alt="Sputo SUV"
                  loading="eager"
                  decoding="async"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        )}
        </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
