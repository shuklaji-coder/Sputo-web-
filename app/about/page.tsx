"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Crown,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Scale,
  Compass,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  CheckCircle2,
  Target,
  Users,
  Award,
  Shield,
  Quote,
  MapPin,
  Clock,
  Car,
  Bike,
  Zap,
  TrendingUp,
  Star,
  Check,
  Activity,
  Navigation,
  KeyRound
} from 'lucide-react';
import Footer from '@/components/Footer';
import SputoLogoIcon from '@/components/SputoLogoIcon';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'riders' | 'captains' | 'cities'>('riders');

  // Floating animation variants
  const floatUp = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatDown = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 5.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-obsidian selection:bg-[#F9D024] selection:text-obsidian overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#F9D024] text-obsidian flex items-center justify-center shadow-rapido transition-transform group-hover:scale-105 border border-yellow-400">
              <SputoLogoIcon className="w-6 h-6 text-obsidian" stripeColor="#F9D024" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-obsidian">
                  SPUTO
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-[#F9D024] text-obsidian border border-yellow-400">
                  ROYALE
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase font-bold text-stone-500">
                Bharat Moves on Sputo
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-stone-700">
            <Link href="/" className="hover:text-obsidian transition-colors">
              Home
            </Link>
            <Link href="/#fleet" className="hover:text-obsidian transition-colors">
              Fleet Showcase
            </Link>
            <Link href="/about" className="text-obsidian font-extrabold border-b-2 border-[#F9D024] pb-0.5">
              About & Founder
            </Link>
            <Link href="/#app-download" className="hover:text-obsidian transition-colors">
              App
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#booking-engine"
              className="px-5 py-2.5 rounded-xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian text-xs font-black uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center gap-2 transition hover:scale-105 active:scale-95"
            >
              <span>Book Ride</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>
      </header>

      {/* RICH DYNAMIC HERO SECTION (Filled with animated cards, glowing gradients & live telemetries) */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#F9D024]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-28 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Vision & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black border border-yellow-300 shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-600 fill-amber-600 animate-bounce" />
              <span>THE SPUTO STORY • ZERO SURGE REVOLUTION</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight leading-[1.15]"
            >
              Fair Rides.{' '}
              <span className="relative inline-block text-obsidian">
                <span className="relative z-10">Zero Haggling.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#F9D024] -rotate-1 -z-0 rounded" />
              </span>{' '}
              <br className="hidden sm:inline" />
              True Dignity For Bharat.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              We built Sputo so no commuter stands stranded in the rain bargaining with meters, and no hardworking Captain pays 35% commission. A transparent, server-enforced platform engineered for daily India.
            </motion.p>

            {/* Quick Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-obsidian shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                Upfront Digital Meter
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-obsidian shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                Zero Cancellation Panic
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-obsidian shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                Captain Dignity & Lowest Cut
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#founder-story"
                className="px-6 py-3.5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center gap-2 hover:scale-105 active:scale-95 transition"
              >
                <span>Read The Founder's Journey</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
              <Link
                href="/#booking-engine"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-obsidian font-black text-xs uppercase tracking-wider border border-stone-300 shadow-sm transition hover:scale-105 active:scale-95"
              >
                Book Sputo Ride
              </Link>
            </motion.div>

            {/* Mini Trust Metrics */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-obsidian tracking-tight">50K+</p>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Captains</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">₹0</p>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Surge Charge</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#F59E0B] tracking-tight">4.89★</p>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Patron Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Floating Interactive Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background Halo */}
            <div className="relative w-full max-w-md">
              {/* Central Hero Visual Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-2xl relative overflow-hidden"
              >
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-obsidian uppercase tracking-wider">
                      Sputo Live Telemetry
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-[#B45309] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Active System
                  </span>
                </div>

                {/* Main Image Showcase */}
                <div className="rounded-2xl overflow-hidden mt-3 relative h-64 sm:h-72 group">
                  <img
                    src="/images/sputo-auto-showcase.jpg"
                    alt="Sputo Fleet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F9D024] text-obsidian text-[10px] font-black uppercase">
                        Doorstep Auto
                      </span>
                      <span className="text-xs font-bold text-stone-200">
                        Zero Meter Haggling
                      </span>
                    </div>
                    <p className="text-sm font-black text-white mt-1">
                      Real-time Captain matching in narrow lanes
                    </p>
                  </div>
                </div>

                {/* Sub-bar with Live OTP & Price Lock */}
                <div className="mt-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#F9D024] flex items-center justify-center text-obsidian font-black text-xs">
                      <KeyRound className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Ride Start OTP</p>
                      <p className="text-sm font-black text-obsidian font-mono tracking-widest">8 2 4 1</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Meter Locked</p>
                    <p className="text-sm font-black text-emerald-600">₹14.00 / km</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 1 (Top Left): 24x7 SOS */}
              <motion.div
                variants={floatUp}
                animate="animate"
                className="absolute -top-3 left-1 sm:-top-6 sm:-left-8 bg-white/95 backdrop-blur-md p-2 sm:p-3.5 rounded-2xl border border-stone-200 shadow-xl flex items-center gap-2 sm:gap-3 z-20"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-xs font-black text-obsidian">ISO 9001 Safety</p>
                  <p className="text-[10px] text-stone-500 font-semibold">24x7 Emergency SOS</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Bottom Right): Top 5% Captain */}
              <motion.div
                variants={floatDown}
                animate="animate"
                className="absolute -bottom-3 right-1 sm:-bottom-6 sm:-right-8 bg-white/95 backdrop-blur-md p-2 sm:p-3.5 rounded-2xl border border-stone-200 shadow-xl flex items-center gap-2 sm:gap-3 z-20"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F9D024] text-obsidian flex items-center justify-center shadow-sm font-black shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-obsidian stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-black text-obsidian">Top 5% Captains</p>
                    <span className="text-[10px] bg-yellow-100 text-amber-800 px-1 rounded font-bold">4.89★</span>
                  </div>
                  <p className="text-[10px] text-stone-500 font-semibold">Polite & Verified</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE TICKER (High-energy startup strip) */}
      <section className="bg-obsidian text-stone-300 py-4 border-y border-stone-800 overflow-hidden shadow-inner">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-xs font-bold tracking-widest uppercase">
          <span className="flex items-center gap-2 text-[#F9D024]">
            <SputoLogoIcon className="w-4 h-4 text-[#F9D024]" stripeColor="#1C1917" />
            BUILT FOR 1.4 BILLION INDIANS
          </span>
          <span className="text-stone-600">•</span>
          <span>NO METER HAGGLING</span>
          <span className="text-stone-600">•</span>
          <span className="text-emerald-400">100% UPFRONT FARE LOCK</span>
          <span className="text-stone-600">•</span>
          <span>CAPTAIN DIGNITY & SAME-DAY PAYOUTS</span>
          <span className="text-stone-600">•</span>
          <span className="text-[#F9D024]">ZERO SURGE MULTIPLIERS</span>
          <span className="text-stone-600">•</span>
          <span>4-DIGIT SECURE RIDE OTP</span>
          <span className="text-stone-600">•</span>
          <span>MUMBAI MMR • SOUTH MUMBAI • BKC • THANE • NAVI MUMBAI</span>
        </div>
      </section>

      {/* THE STORY (Interactive Problem vs Sputo Breakthrough) */}
      <section id="founder-story" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#B45309] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            Genesis & Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-obsidian mt-3">
            Why Sputo Was Born
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-semibold">
            The story of how a 45-minute roadside argument turned into an uncompromising mission to fix urban mobility.
          </p>
        </div>

        {/* Problem vs Sputo Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* The Broken Reality */}
          <div className="bg-white rounded-3xl p-8 border-2 border-red-100 shadow-sm space-y-5 relative">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black">
              ✕
            </div>
            <h3 className="text-2xl font-black text-obsidian">
              The Broken Commute Reality
            </h3>
            <ul className="space-y-3.5 text-sm text-stone-600 font-medium">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Roadside Refusal & Haggling:</strong> Autos demanding 3x the meter or refusing to go into narrow city lanes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Surge Multiplier Traps:</strong> Traditional apps jacking up prices to ₹400 for a 4km ride the moment it rains.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Drivers Being Squeezed:</strong> Hardworking drivers losing 30-35% commission to foreign tech aggregators.
                </span>
              </li>
            </ul>
          </div>

          {/* The Sputo Solution */}
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-rapido-card space-y-5 relative bg-gradient-to-br from-white via-emerald-50/20 to-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black text-obsidian">
              The Sputo Blueprint
            </h3>
            <ul className="space-y-3.5 text-sm text-stone-600 font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Locked Upfront Pricing:</strong> What you see on screen is locked. Zero extra demands at drop-off.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Surge Guarantee:</strong> Transparent standard kilometer rates whether it is sunny or pouring rain.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Captain Dignity & Instant Cashout:</strong> Lowest commission in India with direct daily UPI settlements.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Founding Philosophy Banner */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-white border border-stone-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F9D024]/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-4 text-center">
            <Quote className="w-12 h-12 text-[#F9D024] mx-auto opacity-80" />
            <p className="text-lg sm:text-2xl font-bold leading-relaxed text-stone-100 italic">
              "We didn't set out to build an algorithm to maximize surge profits. We set out to give commuters their peace of mind back, and to give Captains a platform where their sweat is honored with dignity."
            </p>
            <p className="text-xs uppercase tracking-widest text-[#F9D024] font-black pt-2">
              — Sputo Founding Manifesto
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER & LEADERSHIP PROFILE (Grand, verified & prestigious) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-obsidian bg-[#FEF9C3] px-4 py-1.5 rounded-full border border-yellow-300">
            Leadership Behind The Mission
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-obsidian mt-3">
            Meet the Founder
          </h2>
          <p className="mt-3 text-sm text-stone-600 font-semibold">
            Hands-on leadership committed to honest, affordable mobility for every Indian.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-stone-200 shadow-rapido-card relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#F9D024]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Founder Portrait with Floating Glass Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Yellow rim glow on hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#F9D024] to-amber-300 rounded-3xl blur-xl opacity-50 group-hover:opacity-85 transition duration-500" />
                <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-stone-100 w-72 sm:w-80 h-[430px]">
                  <img
                    src="/images/founder.jpg"
                    alt="Founder & CEO - Sputo Royale"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating founder badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-obsidian">
                        Rohan Shukla
                      </p>
                      <p className="text-[10px] text-stone-500 font-bold">
                        Founder & CEO • Sputo Royale
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#F9D024] flex items-center justify-center text-obsidian shadow-sm">
                      <Crown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Vision & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black mb-3 border border-yellow-300">
                  <Crown className="w-3.5 h-3.5 text-obsidian stroke-[2.5]" />
                  <span>FOUNDER & CHIEF EXECUTIVE OFFICER</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-obsidian tracking-tight">
                  Rohan Shukla
                </h3>
                <p className="text-sm font-bold text-stone-500 mt-1">
                  Founder & CEO • Sputo Royale Mobility
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-700 italic text-sm sm:text-base leading-relaxed font-medium">
                "When I look at our roads every morning, I see ambitious college students, hardworking mothers, and corporate workers rushing to build Bharat. They don't deserve stress over cab cancellations or meter fights. Sputo is our personal promise to make their journey dependable, honest, and safe."
              </div>

              {/* Founder Pillars */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-obsidian">
                      No Driver Refusal Policy
                    </p>
                    <p className="text-xs text-stone-500">
                      Our dispatch system matches rides with drivers heading along optimal routes to guarantee pickup.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-obsidian">
                      Direct Payouts to Captains
                    </p>
                    <p className="text-xs text-stone-500">
                      Every rupee earned goes straight to Captain wallets daily without weekly withholding.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-obsidian">
                      Rigorous Safety & Vehicle Audits
                    </p>
                    <p className="text-xs text-stone-500">
                      Clean vehicles, sanitized helmets, and mandatory KYC verification for all Captains.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Handles */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/rohan-shukla-0b8889321/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-[#0077B5] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm hover:scale-105 active:scale-95"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  <span>Connect with Rohan on LinkedIn</span>
                </a>
                <a
                  href="mailto:rohan@sputoroyale.com"
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 border border-stone-200 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>rohan@sputoroyale.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 CORE PILLARS OF SPUTO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-obsidian bg-[#FEF9C3] px-4 py-1.5 rounded-full border border-yellow-300">
            Our Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-obsidian mt-3">
            What Governs Every Sputo Trip
          </h2>
          <p className="mt-3 text-sm text-stone-600 font-semibold">
            Three principles etched into our technology, algorithms, and driver training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-rapido-card hover:border-yellow-400 hover:shadow-xl transition-all space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF9C3] text-obsidian flex items-center justify-center border border-yellow-300 shadow-sm group-hover:scale-110 transition-transform">
              <Scale className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-obsidian">
              1. Zero Meter Haggling
            </h3>
            <p className="text-sm text-stone-600 font-medium leading-relaxed">
              No roadside negotiations or meter disputes. What you see on your phone before tapping book is the exact locked digital fare.
            </p>
            <ul className="space-y-2 text-xs font-bold text-stone-700 pt-3 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Upfront digital price lock</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero hidden cancellation fees</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-rapido-card hover:border-yellow-400 hover:shadow-xl transition-all space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-sm group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-obsidian">
              2. Captain Dignity & Welfare
            </h3>
            <p className="text-sm text-stone-600 font-medium leading-relaxed">
              Captains are our respected partners, not commodities. We charge the lowest commission in India and settle earnings directly to their bank accounts daily.
            </p>
            <ul className="space-y-2 text-xs font-bold text-stone-700 pt-3 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant daily UPI wallet settlement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>₹5 Lakh accidental insurance cover</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-rapido-card hover:border-yellow-400 hover:shadow-xl transition-all space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shadow-sm group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-obsidian">
              3. Radical Safety & Tracking
            </h3>
            <p className="text-sm text-stone-600 font-medium leading-relaxed">
              Every ride is secured by a unique 4-digit start OTP, real-time GPS telemetry, and 24x7 emergency SOS integrated directly with city law enforcement.
            </p>
            <ul className="space-y-2 text-xs font-bold text-stone-700 pt-3 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4-digit ride authentication OTP</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct 112 police emergency link</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION (Rapido Yellow Banner) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#F9D024] rounded-3xl p-8 sm:p-14 border-2 border-yellow-400 shadow-rapido flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <span className="text-[11px] font-black uppercase tracking-widest text-obsidian bg-white px-3.5 py-1.5 rounded-full border border-yellow-500 shadow-sm">
              JOIN THE MOBILITY REVOLUTION
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-obsidian leading-tight">
              Ready for a Commute Without Haggling?
            </h3>
            <p className="text-sm text-stone-800 font-semibold leading-relaxed">
              Whether you want to zoom past peak traffic on a Bike Taxi or cruise comfortably in a Royale Cab, your Captain is waiting.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#booking-engine"
              className="px-7 py-4 rounded-2xl bg-obsidian hover:bg-stone-800 text-white text-xs font-black uppercase tracking-wider shadow-xl flex items-center gap-2 transition hover:scale-105 active:scale-95"
            >
              <span>Book Your First Ride</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
            <Link
              href="/"
              className="px-7 py-4 rounded-2xl bg-white hover:bg-stone-50 text-obsidian text-xs font-black uppercase tracking-wider border border-yellow-500 shadow-sm transition hover:scale-105 active:scale-95"
            >
              <span>Back To Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating 1-Tap WhatsApp Booking Pill */}
      <WhatsAppFloat />
    </div>
  );
}
