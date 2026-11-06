"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import SputoLogoIcon from '@/components/SputoLogoIcon';
import {
  Crown,
  Phone,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Car,
  Sparkles,
  MapPin,
  Clock,
  ChevronDown
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

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & City Pill */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 group">
            {/* Sputo Yellow 'S' Road Monogram Emblem */}
            <div className="w-12 h-12 rounded-2xl bg-[#F9D024] text-obsidian flex items-center justify-center shadow-rapido transition-transform group-hover:scale-105 border border-yellow-400">
              <SputoLogoIcon className="w-7 h-7 text-obsidian" stripeColor="#F9D024" />
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
          </a>

          {/* Active City Selector Button */}
          <button
            type="button"
            onClick={onOpenCityModal}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-[#FEF9C3] border border-stone-200 hover:border-yellow-400 text-xs font-bold text-obsidian shadow-sm transition"
          >
            <MapPin className="w-3.5 h-3.5 text-stone-700" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-3 h-3 text-stone-500" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-stone-700">
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
          <a
            href="/about"
            className="hover:text-obsidian transition-colors"
          >
            About Us
          </a>
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

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+918087747774"
            className="hidden xl:flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-obsidian px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 transition"
          >
            <Phone className="w-3.5 h-3.5 text-stone-800" />
            <span>24x7 Helpline: +91 80877 47774</span>
          </a>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-yellow-400 transition"
              >
                <div className="w-8 h-8 rounded-full bg-[#F9D024] text-obsidian flex items-center justify-center font-black text-xs">
                  {user.phoneNumber ? user.phoneNumber.slice(-2) : 'SP'}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-obsidian truncate max-w-[120px]">
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
                    className="w-full text-left px-4 py-2 text-xs text-stone-800 hover:bg-stone-50 flex items-center gap-2 transition"
                  >
                    <Clock className="w-3.5 h-3.5 text-stone-600" />
                    <span>My Trips & Receipts</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition border-t border-stone-100 mt-1"
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-extrabold text-xs tracking-wider shadow-rapido border border-yellow-400 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <UserIcon className="w-4 h-4 stroke-[2.5]" />
              <span>SIGN IN</span>
            </button>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenCityModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 border border-stone-200 text-[11px] font-bold text-obsidian"
          >
            <MapPin className="w-3 h-3 text-stone-700" />
            <span>{selectedCity.split(' ')[0]}</span>
          </button>

          {user ? (
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-8 h-8 rounded-full bg-[#F9D024] text-obsidian flex items-center justify-center text-xs font-black"
            >
              {user.phoneNumber ? user.phoneNumber.slice(-2) : 'SP'}
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-3 py-1.5 rounded-xl bg-[#F9D024] text-obsidian text-xs font-black"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-obsidian hover:bg-black/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-3 text-sm font-bold">
            <a
              href="/#booking-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-obsidian hover:text-stone-600"
            >
              Book Ride
            </a>
            <a
              href="/#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-obsidian hover:text-stone-600"
            >
              Fleet Showcase
            </a>
            <a
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-obsidian font-bold text-[#B45309] hover:text-stone-600"
            >
              About Sputo & Founder
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSafetyModal();
              }}
              className="py-2 text-left text-obsidian hover:text-stone-600"
            >
              Safety 24x7
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCaptainModal();
              }}
              className="py-2 text-left text-obsidian font-extrabold flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#F9D024]" />
              <span>Become a Sputo Captain</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHistoryModal();
              }}
              className="py-2 text-left text-obsidian hover:text-stone-600"
            >
              My Trips & Receipts
            </button>
            <a
              href="#app-download"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-obsidian hover:text-stone-600"
            >
              Download Mobile App
            </a>
            <a
              href="tel:+918087747774"
              className="py-2 text-obsidian font-bold flex items-center gap-2 text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-stone-700" />
              <span>Customer Care: +91 80877 47774</span>
            </a>
          </nav>

          {user && (
            <div className="pt-3 border-t border-stone-200">
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-xs font-bold text-red-600 bg-red-50 rounded-xl"
              >
                Sign Out ({user.phoneNumber || 'User'})
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
