"use client";

import React from 'react';
import { Zap, Shield, Bike, Car, Package, Clock, CheckCircle2, Award } from 'lucide-react';

const MARQUEE_ITEMS = [
  { icon: Zap, text: "2-5 MIN DOORSTEP PICKUP" },
  { icon: Shield, text: "₹0 ZERO SURGE PRICING" },
  { icon: Award, text: "4-DIGIT GOLDEN START OTP" },
  { icon: Bike, text: "FASTEST SPUTO BIKE TAXI" },
  { icon: Car, text: "DEPENDABLE SPUTO AUTO" },
  { icon: Car, text: "CHILLED AC ROYALE CABS" },
  { icon: Car, text: "SPUTO 6-SEATER SUV" },
  { icon: Package, text: "60-MIN PARCEL EXPRESS" },
  { icon: CheckCircle2, text: "FREE PASSENGER INSURANCE" },
  { icon: Zap, text: "BHARAT MOVES ON SPUTO" },
];

export default function LiveMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#F9D024] border-y-2 border-stone-900 py-3 shadow-md select-none">
      {/* Subtle diagonal stripes pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {/* Render twice for seamless loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 mx-6 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap"
            >
              <div className="w-5 h-5 rounded-full bg-stone-950 flex items-center justify-center text-[#F9D024]">
                <Icon className="w-3 h-3 stroke-[3]" />
              </div>
              <span>{item.text}</span>
              <span className="text-stone-950/40 text-base font-black ml-4">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

