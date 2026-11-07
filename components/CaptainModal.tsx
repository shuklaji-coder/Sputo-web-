"use client";

import React, { useState } from 'react';
import { CheckCircle2, Shield, DollarSign, Award, Car, X, Zap } from 'lucide-react';
import { VehicleCategory } from '@/lib/types';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const leadId = `lead_${Date.now().toString(36)}_${cleanPhone.slice(-4) || 'driver'}`;

      // Real write to Firestore captain_leads collection
      await setDoc(doc(db, 'captain_leads', leadId), {
        leadId,
        fullName,
        phone: cleanPhone,
        city,
        vehicleType,
        licenseNumber,
        vehicleNumber,
        status: 'pending_kyc',
        createdAt: serverTimestamp(),
        source: 'sputo_web_partner_form'
      });
      console.log('Driver application successfully recorded in Firestore:', leadId);
    } catch (err: any) {
      console.warn('Firestore captain lead notice:', err.message);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
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
              Welcome to the Sputo Captain registry. Our fleet onboarding team will review your credentials and reach out via WhatsApp at +91 {phone} within 4 working hours.
            </p>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1.5">
              <p className="font-black text-obsidian">Next Onboarding Milestones:</p>
              <p className="text-stone-600">1. WhatsApp KYC Document upload (Aadhaar, Driving License & RC)</p>
              <p className="text-stone-600">2. Free physical vehicle inspection & Sputo yellow helmet kit</p>
              <p className="text-stone-600">3. Driver App Activation & ₹1,000 Joining Bonus</p>
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
                <span>Sputo Driver Partner Network</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-obsidian">
                Become a Sputo Captain
              </h3>
              <p className="text-xs text-stone-500 font-semibold mt-1">
                Earn up to ₹45,000 - ₹65,000/month with zero commission for your introductory period.
              </p>
              <div className="mt-2.5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.chaloji.driver&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-black text-amber-800 hover:text-obsidian underline"
                >
                  <span>Already registered? Download Driver Partner App on Google Play →</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-obsidian focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-obsidian focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                    Operating City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-obsidian focus:ring-2 focus:ring-yellow-400 outline-none bg-white"
                  >
                    <option value="Mumbai">Mumbai MMR</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                    Vehicle Category
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as VehicleCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-obsidian focus:ring-2 focus:ring-yellow-400 outline-none bg-white"
                  >
                    <option value="Bike">Bike Taxi (Two-Wheeler)</option>
                    <option value="Auto">Auto Rickshaw (Three-Wheeler)</option>
                    <option value="Royale Cab">Sedan Cab (Dzire / Etios)</option>
                    <option value="Priority Cab">Priority Cab (Swift / Aura)</option>
                    <option value="Sputo SUV">SUV (Ertiga / Innova)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                    Driving License Number
                  </label>
                  <input
                    type="text"
                    required
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. MH0220200012345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-obsidian focus:ring-2 focus:ring-yellow-400 outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                    Vehicle Number Plate
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. MH 02 CD 9999"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-obsidian focus:ring-2 focus:ring-yellow-400 outline-none uppercase font-mono"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1.5 text-stone-700">
                <div className="flex items-center gap-1.5 font-black text-amber-900">
                  <Award className="w-4 h-4" />
                  <span>Sputo Captain Benefits:</span>
                </div>
                <p>• 100% daily earnings directly in your bank account via UPI</p>
                <p>• Zero commission introductory guarantee + daily ride incentives</p>
                <p>• ₹5,00,000 accidental medical insurance coverage</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
                ) : (
                  <span>Submit Captain Onboarding Application</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
