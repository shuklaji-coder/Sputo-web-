"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MapPin, ShieldCheck, Star, Sparkles, TrendingUp } from 'lucide-react';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedNumber({ value, suffix = '', prefix = '', decimals = 0 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // 1.8s smooth duration

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo easing curve for realistic speedometer feel
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(ease * value);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString('en-IN');

  return (
    <span ref={ref} className="tabular-nums tracking-tight">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      id: 'captains',
      icon: Users,
      value: 50000,
      suffix: '+',
      label: 'Verified Captains',
      subtext: 'Bike, Auto & Cab drivers earning daily with 0% commission',
      color: 'from-amber-400 to-yellow-500',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      id: 'cities',
      icon: MapPin,
      value: 15,
      suffix: '+',
      label: 'Major Metros Active',
      subtext: 'Mumbai MMR, Delhi-NCR, Pune, Bengaluru & Hyderabad',
      color: 'from-emerald-400 to-teal-500',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    },
    {
      id: 'surge',
      icon: ShieldCheck,
      prefix: '₹',
      value: 0,
      suffix: ' Surge',
      label: 'Surge Price Guarantee',
      subtext: 'Server-locked fair tariffs. Zero rain or rush hour multiplier',
      color: 'from-blue-400 to-indigo-500',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
    },
    {
      id: 'rating',
      icon: Star,
      value: 4.89,
      suffix: ' ★',
      decimals: 2,
      label: 'Passenger Trust Rating',
      subtext: 'Rated across 2,40,000+ completed rides and parcel drops',
      color: 'from-yellow-400 to-orange-500',
      badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-yellow-200/25 via-amber-100/20 to-yellow-200/25 blur-3xl pointer-events-none -z-10" />

      {/* Top Header Pill */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-black uppercase tracking-wider text-obsidian"
        >
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Real-time Network Telemetry</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-obsidian mt-2"
        >
          Powering Daily Commutes Across India
        </motion.h2>
      </div>

      {/* 4 Animated Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top Row: Icon + Glow */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-transform group-hover:rotate-6 ${item.badgeBg}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
                  Verified
                </span>
              </div>

              {/* Number Value with Rolling Counter */}
              <div>
                <div className="text-3xl sm:text-4xl font-black text-obsidian">
                  <AnimatedNumber
                    value={item.value}
                    suffix={item.suffix}
                    prefix={item.prefix}
                    decimals={item.decimals}
                  />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mt-1">
                  {item.label}
                </h3>
                <p className="text-xs text-stone-500 font-medium leading-relaxed mt-1">
                  {item.subtext}
                </p>
              </div>

              {/* Bottom Decorative Progress Bar */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-stone-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
                <Sparkles className="w-3.5 h-3.5 text-stone-600 opacity-60 group-hover:text-amber-500 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
