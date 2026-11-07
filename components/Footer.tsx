"use client";

import React from 'react';
import { Crown, Shield, Phone, Mail, MapPin } from 'lucide-react';
import SputoLogoIcon from '@/components/SputoLogoIcon';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F9D024] flex items-center justify-center shadow-rapido text-obsidian font-black">
                <SputoLogoIcon className="w-6 h-6 text-obsidian" stripeColor="#F9D024" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                SPUTO ROYALE
              </span>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-medium">
              India's premier server-enforced ride dispatch platform. Built upon verified Captain networks to provide guaranteed transparent fares, zero meter haggling, and verified mobility for millions of daily commuters.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#F9D024]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                ISO 9001 Certified Safety
              </span>
              <span className="text-stone-600">•</span>
              <span>24/7 SOS Operations</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-white">
              Services
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li>
                <a href="/about" className="text-[#F9D024] hover:text-white transition font-bold">
                  About Sputo & Founder
                </a>
              </li>
              <li>
                <a href="/#booking-engine" className="hover:text-white transition">
                  Book Bike Taxi
                </a>
              </li>
              <li>
                <a href="#booking-engine" className="hover:text-white transition">
                  Book Sputo Auto
                </a>
              </li>
              <li>
                <a href="#booking-engine" className="hover:text-white transition">
                  Book Royale Cab
                </a>
              </li>
              <li>
                <a href="#booking-engine" className="hover:text-white transition">
                  Send Parcel Express
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.rohan3543.chaloji&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Download Rider App (Play Store)
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.chaloji.driver&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Download Captain App (Play Store)
                </a>
              </li>
            </ul>
          </div>

          {/* Cities Covered */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-white">
              Metros
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F9D024]" />
                <span>Mumbai MMR (BKC, Airport T2)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F9D024]" />
                <span>Bengaluru (Indiranagar, Whitefield)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F9D024]" />
                <span>Delhi NCR (Cyber City, Noida)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F9D024]" />
                <span>Pune (Koregaon Park, Hinjewadi)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F9D024]" />
                <span>Hyderabad (HITEC City)</span>
              </li>
            </ul>
          </div>

          {/* Contact Helpline */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-white">
              Helpline Desk
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F9D024]" />
                <a href="tel:+918087747774" className="hover:text-white transition font-bold text-white">
                  Customer Care: +91 80877 47774
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F9D024]" />
                <span>support@sputoroyale.com</span>
              </li>
              <li className="pt-2 text-[11px] text-stone-500">
                Operating 24/7/365 with national emergency police liaison.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} Sputo Royale Mobility Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/about" className="hover:text-white transition">About Us</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Safety Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
