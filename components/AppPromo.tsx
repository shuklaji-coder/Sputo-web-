"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, ShieldCheck, Zap } from 'lucide-react';

export default function AppPromo() {
  return (
    <section id="app-download" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#F9D024] p-6 sm:p-10 lg:p-16 text-obsidian relative overflow-hidden border border-yellow-400 shadow-rapido">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-obsidian text-xs font-black uppercase tracking-wider shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-[#F9D024] stroke-obsidian" />
              <span>Official Sputo Mobile App</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-obsidian leading-tight">
              Book in 2 Taps. <br />
              Anytime, Anywhere.
            </h2>

            <p className="text-obsidian/85 text-sm sm:text-base font-semibold leading-relaxed max-w-xl">
              Download the official Sputo Patron app on Google Play. Enjoy 1-tap fast rebooking, live Captain route telemetry, cashless UPI direct payments, and 24x7 SOS emergency coordination.
            </p>

            {/* In-app highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Zap className="w-4 h-4 text-obsidian fill-[#F9D024]" />
                </div>
                <p className="text-xs font-bold text-obsidian">
                  Sub-second live Captain GPS polling
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-obsidian stroke-[2.5]" />
                </div>
                <p className="text-xs font-bold text-obsidian">
                  Instant SOS alert to police & 24x7 control room
                </p>
              </div>
            </div>

            {/* Google Play Store Links (User App & Driver App) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://play.google.com/store/apps/details?id=com.rohan3543.chaloji&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-obsidian text-white font-extrabold text-xs uppercase tracking-wider hover:bg-stone-800 transition shadow-md flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center">
                  <Download className="w-4 h-4 text-[#F9D024]" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-stone-300 font-bold leading-none tracking-widest uppercase">RIDER APP</p>
                  <p className="text-xs font-black mt-0.5">Google Play (User App)</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://play.google.com/store/apps/details?id=com.chaloji.driver&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white text-obsidian font-extrabold text-xs uppercase tracking-wider hover:bg-stone-50 transition shadow-md flex items-center gap-3 border border-stone-200"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FEF9C3] flex items-center justify-center">
                  <Download className="w-4 h-4 text-obsidian" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-stone-500 font-bold leading-none tracking-widest uppercase">CAPTAIN APP</p>
                  <p className="text-xs font-black mt-0.5">Google Play (Driver App)</p>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Floating Scan QR with laser scanner line */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.rohan3543.chaloji&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="p-6 rounded-3xl bg-white text-obsidian text-center border-2 border-stone-200 shadow-rapido-card max-w-xs group hover:shadow-2xl hover:border-yellow-400 transition-all block cursor-pointer"
            >
              <div className="relative w-36 h-36 mx-auto bg-stone-900 p-3 rounded-2xl flex flex-col items-center justify-center text-white mb-3 shadow-inner overflow-hidden">
                <QrCode className="w-24 h-24 text-[#F9D024]" />
                
                {/* Laser scan line effect */}
                <motion.div
                  animate={{ top: ['10%', '85%', '10%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-2 right-2 h-0.5 bg-[#F9D024] shadow-[0_0_10px_#F9D024]"
                />

                <span className="text-[9px] font-mono tracking-widest text-[#F9D024] mt-1 font-black">
                  GOOGLE PLAY
                </span>
              </div>
              <p className="text-sm font-black text-obsidian flex items-center justify-center gap-1.5">
                <span>Scan or Tap to Install</span>
              </p>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                Download directly from Google Play Store for Android.
              </p>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
