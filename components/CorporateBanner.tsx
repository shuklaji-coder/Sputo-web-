"use client";

import React, { useState } from 'react';
import { Building2, FileCheck2, CreditCard, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CorporateBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-stone-900 border border-stone-800 text-white p-6 sm:p-10 lg:p-12 shadow-rapido-card relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#F9D024] text-xs font-black uppercase tracking-wider border border-yellow-400/40">
              <Building2 className="w-3.5 h-3.5" />
              <span>Sputo Corporate Mobility</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Enterprise Commute & Client Transit Solutions.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Consolidate your company's airport transfers, team late-night drops, and client shuttles with automated monthly GST credit invoices, zero surge spikes, and custom expense policies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="flex items-center gap-2.5 text-xs font-bold text-stone-300">
                <FileCheck2 className="w-4 h-4 text-[#F9D024] shrink-0 stroke-[2.5]" />
                <span>Single Monthly GST Invoice</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-stone-300">
                <CreditCard className="w-4 h-4 text-[#F9D024] shrink-0 stroke-[2.5]" />
                <span>Corporate Postpaid Credit</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-stone-300">
                <ShieldCheck className="w-4 h-4 text-[#F9D024] shrink-0 stroke-[2.5]" />
                <span>Priority VIP Allocation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-stone-700 text-center">
            <h4 className="text-lg font-black text-white mb-1">
              Request Corporate Demo
            </h4>
            <p className="text-xs text-stone-300 mb-4">
              Get an instant enterprise consultation & custom tariff sheet.
            </p>

            {submitted ? (
              <div className="py-4 text-[#F9D024] font-black text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Our Corporate Manager will email you within 2 hrs.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work.email@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-obsidian text-xs font-bold outline-none placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider transition shadow-rapido flex items-center justify-center gap-2"
                >
                  <span>Connect with Enterprise Desk</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
