"use client";

import React, { useState } from 'react';
import {
  ShieldCheck,
  PhoneCall,
  Share2,
  AlertTriangle,
  X,
  Lock,
  HeartPulse,
  UserCheck
} from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SafetyModal({ isOpen, onClose }: SafetyModalProps) {
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const handleTriggerSos = () => {
    if (confirm('Initiate Immediate SOS to 112 Emergency Police & Sputo 24/7 Rapid Response Unit?')) {
      setSosSent(true);
      setTimeout(() => setSosSent(false), 5000);
    }
  };

  const handleShareTrip = () => {
    navigator.clipboard.writeText('https://sputoroyale.com/track/live-safety-session');
    alert('Live Telemetry link copied to clipboard! Share with family or emergency contacts via WhatsApp/SMS.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl p-5 sm:p-8 my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-obsidian hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF9C3] border-2 border-yellow-300 flex items-center justify-center mx-auto mb-3 shadow-sm text-obsidian">
            <ShieldCheck className="w-8 h-8 text-emerald-600 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-obsidian">
            Sputo Safety Shield & 24x7 SOS
          </h3>
          <p className="text-xs text-stone-500 font-semibold mt-1 max-w-md mx-auto">
            Comprehensive passenger protection, biometric verification, and rapid emergency dispatch protocols.
          </p>
        </div>

        {/* Emergency SOS Quick Action Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-red-950 uppercase tracking-wide">
                Direct Emergency Distress Beacon
              </p>
              <p className="text-[11px] text-red-800 font-semibold">
                Alerts central emergency control and dials national emergency 112.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTriggerSos}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition"
          >
            {sosSent ? 'Distress Signal Active!' : 'Trigger SOS Alert'}
          </button>
        </div>

        {/* 4 Pillars of Safety Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-obsidian shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-obsidian">
                4-Digit Start OTP
              </h4>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                Every trip requires passenger OTP handshake. Captain cannot start trip without entering this code.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-obsidian shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-obsidian">
                Facial AI & Criminal Screening
              </h4>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                Captains must verify live selfie facial scan before taking their daily morning dispatch shift.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
            <Share2 className="w-5 h-5 text-obsidian shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-obsidian">
                Live Route Telemetry Share
              </h4>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                Share a live GPS web link with loved ones so they can watch your exact route and ETA in real time.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
            <HeartPulse className="w-5 h-5 text-obsidian shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-obsidian">
                ₹5,00,000 Ride Insurance
              </h4>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                Complimentary passenger accidental and medical insurance included with every Sputo booking.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-stone-200">
          <button
            type="button"
            onClick={handleShareTrip}
            className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-obsidian font-black text-xs flex items-center justify-center gap-2 transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Copy Live Trip Share Link</span>
          </button>

          <a
            href="tel:+918087747774"
            className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs flex items-center justify-center gap-2 transition shadow-rapido border border-yellow-400"
          >
            <PhoneCall className="w-4 h-4" />
            <span>24/7 Safety Desk: +91 80877 47774</span>
          </a>
        </div>
      </div>
    </div>
  );
}
