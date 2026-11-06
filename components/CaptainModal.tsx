"use client";

import React, { useState } from 'react';
import { CheckCircle2, Shield, DollarSign, Award, Car, X, Zap } from 'lucide-react';
import { VehicleCategory } from '@/lib/types';

interface CaptainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CaptainModal({ isOpen, onClose }: CaptainModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [vehicleType, setVehicleType] = useState<VehicleCategory>('Bike');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setLicenseNumber('');
    setVehicleNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-obsidian hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FEF9C3] border-2 border-[#F9D024] text-obsidian flex items-center justify-center mx-auto shadow-rapido">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-obsidian">
              Application Transmitted!
            </h3>
            <p className="text-xs text-stone-600 font-medium max-w-md mx-auto">
              Welcome to the Chaloji Captain registry. Our fleet onboarding team will review your documents and reach out via WhatsApp at +91 {phone} within 4 working hours.
            </p>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1.5">
              <p className="font-black text-obsidian">Next Onboarding Milestones:</p>
              <p className="text-stone-600">1. WhatsApp KYC Document upload (Aadhaar, DL & RC)</p>
              <p className="text-stone-600">2. Free physical vehicle inspection & yellow helmet kit</p>
              <p className="text-stone-600">3. ChalojiDriver App Activation & ₹1,000 Joining Bonus</p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.chaloji.driver&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-2xl bg-obsidian text-white font-black text-xs uppercase tracking-wider hover:bg-stone-800 transition text-center shadow-md"
              >
                Download Driver App
              </a>
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#F9D024] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF9C3] text-obsidian text-[11px] font-black uppercase tracking-wider mb-2 border border-yellow-300">
                <Zap className="w-3.5 h-3.5 fill-[#F9D024] stroke-obsidian" />
                <span>Chaloji & Sputo Driver Network</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-obsidian">
                Become a Sputo Captain
              </h3>
              <p className="text-xs text-stone-500 font-semibold mt-1">
                Earn up to ₹45,000 - ₹65,000/month with zero commission for your first 30 days.
              </p>
              <div className="mt-2.5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.chaloji.driver&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-[#FEF9C3] text-stone-700 hover:text-obsidian text-[11px] font-bold border border-stone-200 transition"
                >
                  <span>Direct Download: Captain App on Google Play →</span>
                </a>
              </div>
            </div>

            {/* Quick Benefits Banner */}
            <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <DollarSign className="w-4 h-4 text-obsidian mx-auto mb-1 stroke-[2.5]" />
                <p className="text-[10px] font-black text-obsidian">Instant Daily Payout</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <Award className="w-4 h-4 text-obsidian mx-auto mb-1 stroke-[2.5]" />
                <p className="text-[10px] font-black text-obsidian">0% Commission 30D</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <Shield className="w-4 h-4 text-emerald-600 mx-auto mb-1 stroke-[2.5]" />
                <p className="text-[10px] font-black text-obsidian">Health & Life Cover</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full text-xs font-bold px-3.5 py-3 rounded-xl border border-stone-300 bg-white outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">
                    WhatsApp Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98200 12345"
                    className="w-full text-xs font-bold px-3.5 py-3 rounded-xl border border-stone-300 bg-white outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">
                    Operational City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs font-bold px-3.5 py-3 rounded-xl border border-stone-300 bg-white outline-none"
                  >
                    <option value="Mumbai">Mumbai MMR</option>
                    <option value="Pune">Pune & PCMC</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">
                    Vehicle Category
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as VehicleCategory)}
                    className="w-full text-xs font-bold px-3.5 py-3 rounded-xl border border-stone-300 bg-white outline-none"
                  >
                    <option value="Bike">Sputo Bike Taxi</option>
                    <option value="Auto">Sputo Auto Rickshaw</option>
                    <option value="Royale Cab">Sputo Royale Cab (Sedan / AC)</option>
                    <option value="Priority Cab">⚡ Priority Express Cab (Fast Dispatch)</option>
                    <option value="Sputo SUV">Sputo 6-Seater SUV (Innova / Ertiga)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">
                    Driving License Number
                  </label>
                  <input
                    type="text"
                    required
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="MH02 20180012345"
                    className="w-full text-xs font-bold px-3.5 py-3 rounded-xl border border-stone-300 bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="MH 02 ER 8829"
                    className="w-full text-xs font-bold px-3.5 py-3 rounded-xl border border-stone-300 bg-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 px-6 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Car className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit Captain Application</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
