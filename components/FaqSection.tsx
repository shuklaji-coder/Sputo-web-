"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Sputo's server-enforced pricing work without surge surprises?",
      a: "Unlike other ride apps that artificially inflate prices up to 300% during rains or peak office rush, Sputo's Firebase Cloud Function calculates the exact distance and duration using locked municipal and transparent tariff formulas. What you see is what you pay—guaranteed."
    },
    {
      q: "What is the purpose of the 4-digit Golden Start OTP?",
      a: "The Start OTP ensures 100% passenger verification and security. Your Captain cannot physically initiate the ride meter without entering your unique 4-digit code in their ChalojiDriver app. This completely eliminates wrong passenger boardings and fraudulent trip starts."
    },
    {
      q: "What payment methods are supported?",
      a: "We support direct Cash on Drop, dynamic UPI QR scanning (Google Pay, PhonePe, Paytm, BHIM, CRED), and corporate postpaid credit lines. There is zero surcharge for digital UPI payments."
    },
    {
      q: "How are Sputo Captains vetted?",
      a: "Every Captain undergoes a mandatory 5-step screening: legal criminal record verification, valid commercial driving license check, vehicle fitness and emissions inspection, facial recognition KYC, and mandatory customer etiquette training."
    },
    {
      q: "How quickly do Captains receive their earnings?",
      a: "Captains on the Chaloji and Sputo platform receive instant daily payouts transferred directly to their verified bank accounts via IMPS every single evening at 10:00 PM, with 0% platform fee during their introductory period."
    },
    {
      q: "What should I do if I accidentally leave an item in the vehicle?",
      a: "Our 24/7 Rapid Safety & Support desk can be reached immediately at +91 80877 47774 (Call or WhatsApp). We maintain live telemetry records of your Captain's vehicle plate and will securely coordinate item retrieval within minutes."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF9C3] text-obsidian text-xs font-black uppercase tracking-wider mb-2 border border-yellow-300"
        >
          <HelpCircle className="w-4 h-4 text-obsidian" />
          <span>Got Questions?</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-black text-obsidian"
        >
          Frequently Answered Queries
        </motion.h2>
        <p className="text-xs sm:text-sm text-stone-600 font-semibold mt-1">
          Everything you need to know about our ride protocols and Captain network.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#F9D024] shadow-md ring-2 ring-yellow-400/20'
                  : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-black text-obsidian hover:text-stone-700 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="shrink-0"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-colors ${
                      isOpen ? 'text-amber-600' : 'text-stone-400'
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 font-medium leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Direct Contact Help Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8 p-4 rounded-2xl bg-[#FFFBEB] border border-yellow-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F9D024] flex items-center justify-center shrink-0 shadow-sm">
            <PhoneCall className="w-5 h-5 text-obsidian" />
          </div>
          <div>
            <p className="text-xs font-black text-obsidian">Still have a question or need emergency help?</p>
            <p className="text-[11px] text-stone-600 font-medium">Our 24x7 Support Desk is ready to assist you anytime.</p>
          </div>
        </div>
        <a
          href="tel:+918087747774"
          className="px-4 py-2 rounded-xl bg-obsidian hover:bg-stone-800 text-[#F9D024] font-black text-xs transition shadow-sm whitespace-nowrap"
        >
          Call +91 80877 47774
        </a>
      </motion.div>
    </section>
  );
}
