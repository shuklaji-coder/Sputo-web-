"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, ShieldCheck, ArrowRight, Award, Zap } from 'lucide-react';
import { VehicleCategory } from '@/lib/types';

interface EarningsCalculatorProps {
  onOpenCaptainModal: () => void;
}

export default function EarningsCalculator({ onOpenCaptainModal }: EarningsCalculatorProps) {
  const [vehicle, setVehicle] = useState<VehicleCategory>('Bike');
  const [hours, setHours] = useState<number>(8);

  // Hourly base earnings model
  const hourlyRates: Record<VehicleCategory, number> = {
    Bike: 160,
    Auto: 220,
    'Royale Cab': 310,
    'Priority Cab': 360,
    'Sputo SUV': 440,
  };

  const dailyEarnings = hourlyRates[vehicle] * hours;
  const monthlyEarnings = Math.round(dailyEarnings * 26); // 26 working days

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-14 border border-stone-200 shadow-rapido-card overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Pitch & Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black uppercase tracking-wider border border-yellow-300">
              <Zap className="w-4 h-4 fill-[#F9D024] stroke-obsidian" />
              <span>Drive With Sputo Captain Partner Network</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-obsidian leading-tight">
              Earn With Dignity. <br />
              <span className="text-obsidian underline decoration-[#F9D024] decoration-8 underline-offset-4">
                Daily Bank Settlements.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 font-semibold max-w-xl leading-relaxed">
              Drive with dignity across Mumbai MMR. Choose your own flexible driving hours, enjoy 0% introductory platform commission, and earn guaranteed weekly performance bonuses.
            </p>

            {/* Vehicle Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-stone-600">
                1. Select What You Drive
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {(['Bike', 'Auto', 'Royale Cab', 'Priority Cab', 'Sputo SUV'] as VehicleCategory[]).map((v, idx) => (
                  <motion.button
                    key={v}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setVehicle(v)}
                    className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-black border transition-all text-center ${vehicle === v
                        ? 'bg-[#F9D024] text-obsidian border-yellow-400 shadow-rapido'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                      } ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
                  >
                    {v}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hours Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-stone-600">
                <span>2. Hours You Wish to Drive Daily</span>
                <span className="text-obsidian font-black text-sm bg-[#FEF9C3] px-3 py-1 rounded-full border border-yellow-300">
                  {hours} Hours / Day
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={12}
                step={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-yellow-500 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-bold text-stone-400 px-1">
                <span>4 hrs (Part-time)</span>
                <span>8 hrs (Standard)</span>
                <span>12 hrs (Full-time)</span>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>₹5 Lakh Accidental Cover</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                <Award className="w-4 h-4 text-stone-900 shrink-0 stroke-[2.5]" />
                <span>Zero Commission 30D</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                <Clock className="w-4 h-4 text-stone-900 shrink-0 stroke-[2.5]" />
                <span>Daily 10 PM Settlements</span>
              </div>
            </div>
          </div>

          {/* Right Column: Earnings Display Card with Hover Lift (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-3xl bg-stone-900 text-white border-2 border-stone-800 shadow-rapido-card text-center relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F9D024] text-obsidian flex items-center justify-center mx-auto mb-4 font-black shadow-rapido">
                <DollarSign className="w-7 h-7 stroke-[2.5]" />
              </div>

              <span className="text-[11px] uppercase font-black tracking-widest text-[#F9D024]">
                Estimated Monthly Revenue
              </span>

              <div className="text-4xl sm:text-5xl font-black text-white mt-2 mb-1">
                ₹{monthlyEarnings.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-stone-400">/mo*</span>
              </div>

              <p className="text-xs text-stone-400 font-semibold">
                Approx. ₹{dailyEarnings.toLocaleString('en-IN')} per day for {hours} driving hours
              </p>

              <div className="my-6 pt-5 border-t border-stone-800 space-y-2 text-xs text-left text-stone-300">
                <div className="flex justify-between">
                  <span>Introductory Platform Fee</span>
                  <span className="font-bold text-[#F9D024]">0% (Waived)</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Fuel & Performance Bonus</span>
                  <span className="font-bold text-emerald-400">+₹3,500/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Settlement Schedule</span>
                  <span className="font-bold text-white">Daily 10:00 PM Direct IMPS</span>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenCaptainModal}
                className="w-full py-4 px-6 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-sm uppercase tracking-wider shadow-rapido transition flex items-center justify-center gap-2"
              >
                <span>Register as Captain in 60s</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </motion.button>

              <p className="text-[10px] text-stone-500 mt-3 font-semibold">
                *Estimated gross revenue based on real Mumbai MMR fleet averages.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
