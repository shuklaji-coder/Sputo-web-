"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import SputoLogoIcon from '@/components/SputoLogoIcon';
import Link from 'next/link';
import {
  Phone,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Car,
  MapPin,
  Clock,
  ChevronDown,
  Zap,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  onOpenCaptainModal: () => void;
  onOpenSafetyModal: () => void;
  onOpenHistoryModal: () => void;
  selectedCity: string;
  onOpenCityModal: () => void;
}

export default function Navbar({
  onOpenCaptainModal,
  onOpenSafetyModal,
  onOpenHistoryModal,
  selectedCity,
  onOpenCityModal
}: NavbarProps) {
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const cityShortName = selectedCity.split(' ')[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo & Desktop City Selector */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            {/* Sputo Yellow 'S' Road Monogram Emblem */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F9D024] text-obsidian flex items-center justify-center shadow-rapido transition-transform group-hover:scale-105 border border-yellow-400 shrink-0">
              <SputoLogoIcon className="w-5 h-5 sm:w-7 sm:h-7 text-obsidian" stripeColor="#F9D024" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-obsidian">
                  SPUTO
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full bg-[#F9D024] text-obsidian border border-yellow-400 shrink-0">
                  ROYALE
                </span>
              </div>
              <p className="hidden sm:block text-[10px] tracking-wider uppercase font-bold text-stone-500 truncate">
                Bharat Moves on Sputo
              </p>
            </div>
          </Link>

          {/* Desktop Active City Selector Button */}
          <button
            type="button"
            onClick={onOpenCityModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-[#FEF9C3] border border-stone-200 hover:border-yellow-400 text-xs font-bold text-obsidian shadow-sm transition shrink-0"
            title="Change City"
          >
            <MapPin className="w-3.5 h-3.5 text-stone-700" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-3 h-3 text-stone-500" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-bold text-stone-700">
          <a
            href="/#booking-engine"
            className="hover:text-obsidian transition-colors"
          >
            Book Ride
          </a>
          <a
            href="/#fleet"
            className="hover:text-obsidian transition-colors flex items-center gap-1.5"
          >
            <Car className="w-4 h-4 text-stone-600" />
            <span>Fleet</span>
          </a>
          <Link
            href="/about"
            className="hover:text-obsidian transition-colors"
          >
            About Us
          </Link>
          <button
            type="button"
            onClick={onOpenSafetyModal}
            className="hover:text-obsidian transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Safety 24x7</span>
          </button>
          <button
            type="button"
            onClick={onOpenCaptainModal}
            className="hover:text-obsidian transition-colors flex items-center gap-1.5 text-obsidian font-extrabold"
          >
            <span className="w-2 h-2 rounded-full bg-[#F9D024] animate-pulse" />
            <span>Become Captain</span>
          </button>
          <a
            href="/#app-download"
            className="hover:text-obsidian transition-colors"
          >
            Download App
          </a>
        </nav>

        {/* Right Actions: Desktop & Tablet */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="tel:+918087747774"
            className="hidden xl:flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-obsidian px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 transition"
          >
            <Phone className="w-3.5 h-3.5 text-stone-800" />
            <span>24x7: +91 80877 47774</span>
          </a>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-yellow-400 transition"
              >
                <div className="w-8 h-8 rounded-full bg-[#F9D024] text-obsidian flex items-center justify-center font-black text-xs">
                  {user.phoneNumber ? user.phoneNumber.slice(-2) : 'SP'}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-obsidian truncate max-w-[110px]">
                    {user.phoneNumber || user.displayName || 'Patron'}
                  </p>
                  <p className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                    Member
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-stone-200 shadow-rapido-card py-2 z-50">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-obsidian">Logged In</p>
                    <p className="text-[11px] text-stone-500 truncate">
                      {user.phoneNumber || 'User'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenHistoryModal();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-stone-800 hover:bg-stone-50 flex items-center gap-2 transition"
                  >
                    <Clock className="w-3.5 h-3.5 text-stone-600" />
                    <span>My Trips & Receipts</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition border-t border-stone-100 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-extrabold text-xs tracking-wider shadow-rapido border border-yellow-400 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <UserIcon className="w-4 h-4 stroke-[2.5]" />
              <span>SIGN IN</span>
            </button>
          )}

          {/* Tablet Hamburger (hidden on lg and above) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-obsidian hover:bg-stone-100 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Action Controls (< 640px) */}
        <div className="flex sm:hidden items-center gap-1.5 shrink-0">
          {/* Compact Mobile City Pill */}
          <button
            type="button"
            onClick={onOpenCityModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-bold text-obsidian active:scale-95 transition"
            title="Switch City"
          >
            <MapPin className="w-3 h-3 text-stone-700 shrink-0" />
            <span className="truncate max-w-[55px]">{cityShortName}</span>
          </button>

          {/* Mobile User Profile Button or Sign In Button */}
          {user ? (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-8 h-8 rounded-full bg-[#F9D024] text-obsidian flex items-center justify-center text-xs font-black border border-yellow-400 shadow-sm"
              title="Open Account Menu"
            >
              {user.phoneNumber ? user.phoneNumber.slice(-2) : 'SP'}
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-3 py-1.5 rounded-xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian text-xs font-black shadow-sm border border-yellow-400 active:scale-95 transition"
            >
              Sign In
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl text-obsidian hover:bg-stone-100 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Full-Width Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 sm:px-6 py-5 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4">
          {/* User Account Status Card in Drawer */}
          {user ? (
            <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#F9D024] text-obsidian font-black flex items-center justify-center shrink-0 border border-yellow-400 shadow-sm">
                  {user.phoneNumber ? user.phoneNumber.slice(-2) : 'SP'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-obsidian truncate">
                    {user.phoneNumber || user.displayName || 'Sputo Rider'}
                  </p>
                  <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                    Verified Member
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-black shrink-0 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 flex items-center justify-center gap-2 transition"
            >
              <UserIcon className="w-4 h-4 stroke-[2.5]" />
              <span>Sign In with Mobile</span>
            </button>
          )}

          {/* City Selector in Drawer */}
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-600" />
              <span className="text-xs font-bold text-obsidian">Current Metro:</span>
              <span className="text-xs font-black text-amber-700">{selectedCity}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCityModal();
              }}
              className="text-xs font-black text-obsidian underline"
            >
              Change
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1 text-sm font-bold border-t border-stone-100 pt-3">
            <a
              href="/#booking-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 text-obsidian flex items-center justify-between transition"
            >
              <span>Book Sputo Ride</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </a>

            <a
              href="/#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 text-obsidian flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-stone-600" />
                <span>Fleet: Bike, Auto, Cab & SUV</span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </a>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 text-amber-800 font-extrabold flex items-center justify-between transition"
            >
              <span>About Sputo & Founder (Rohan Shukla)</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSafetyModal();
              }}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 text-left text-obsidian flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>24x7 Safety & SOS Shield</span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHistoryModal();
              }}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 text-left text-obsidian flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-600" />
                <span>My Trips & Tax Invoices</span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCaptainModal();
              }}
              className="py-2.5 px-3 rounded-xl bg-[#FFFBEB] text-left text-obsidian font-extrabold flex items-center justify-between border border-yellow-300 transition my-1"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 fill-[#F9D024]" />
                <span>Become a Sputo Captain (0% Commission)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>

            <a
              href="/#app-download"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 text-obsidian flex items-center justify-between transition"
            >
              <span>Download Android Apps</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </a>
          </nav>

          {/* 24x7 Customer Care Card in Drawer */}
          <div className="pt-3 border-t border-stone-100">
            <a
              href="tel:+918087747774"
              className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-yellow-300 flex items-center justify-between gap-3 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F9D024] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-obsidian stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-stone-500">24x7 Rapid Helpline</p>
                  <p className="text-xs font-black text-obsidian">+91 80877 47774</p>
                </div>
              </div>
              <span className="text-[11px] font-black text-amber-700">Call Now →</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
