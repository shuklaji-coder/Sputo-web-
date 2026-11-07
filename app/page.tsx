"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroBooking from '@/components/HeroBooking';
import LiveMarquee from '@/components/LiveMarquee';
import FleetShowcase from '@/components/FleetShowcase';
import RoyalPerks from '@/components/RoyalPerks';
import EarningsCalculator from '@/components/EarningsCalculator';
import CorporateBanner from '@/components/CorporateBanner';
import AppPromo from '@/components/AppPromo';
import FounderNote from '@/components/FounderNote';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import LiveTrackingModal from '@/components/LiveTrackingModal';
import CaptainModal from '@/components/CaptainModal';
import SafetyModal from '@/components/SafetyModal';
import CitySelectorModal from '@/components/CitySelectorModal';
import RideHistoryModal from '@/components/RideHistoryModal';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { LocationPoint } from '@/lib/types';
import { POPULAR_LOCATIONS } from '@/lib/mockData';

export default function HomePage() {
  const [activeRideId, setActiveRideId] = useState<string | null>(null);
  const [isCaptainModalOpen, setIsCaptainModalOpen] = useState<boolean>(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState<boolean>(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai MMR');

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleRebook = (pickup: string, drop: string) => {
    const el = document.getElementById('booking-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-obsidian selection:bg-[#F9D024] selection:text-obsidian">
      {/* Top Navbar in White & Rapido Yellow */}
      <Navbar
        onOpenCaptainModal={() => setIsCaptainModalOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
      />

      {/* Hero Section with Live Booking Engine, Route Presets & Telemetry */}
      <HeroBooking onRideCreated={(rideId) => setActiveRideId(rideId)} />

      {/* Infinite Live Ticker Marquee (Rapido Yellow Strip) */}
      <LiveMarquee />

      {/* Fleet Showcase: Bike Taxi, Auto, Royale Cab & Parcel */}
      <FleetShowcase />

      {/* Why Choose Sputo, 3 Steps & Verified Patron Reviews */}
      <RoyalPerks />

      {/* Driver Partner Section: Interactive Earnings Calculator */}
      <EarningsCalculator onOpenCaptainModal={() => setIsCaptainModalOpen(true)} />

      {/* Sputo Corporate / Enterprise Commute Solutions */}
      <CorporateBanner />

      {/* Mobile App Download Promo with QR Code in Rapido Yellow */}
      <AppPromo />

      {/* A Compact Note from Founder Rohan Shukla */}
      <FounderNote />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Authentication Modal (Phone + OTP + 1-Click VIP Test) */}
      <AuthModal />

      {/* Live Ride Tracking Console (Requested sonar -> Accepted with Captain Card & Start OTP -> Completed receipt) */}
      <LiveTrackingModal
        rideId={activeRideId}
        onClose={() => setActiveRideId(null)}
      />

      {/* Captain Driver Partner Onboarding Modal */}
      <CaptainModal
        isOpen={isCaptainModalOpen}
        onClose={() => setIsCaptainModalOpen(false)}
      />

      {/* 24x7 Safety & SOS Shield Modal */}
      <SafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      {/* Metro City Selector Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        selectedCity={selectedCity}
        onSelectCity={handleCitySelect}
        onClose={() => setIsCityModalOpen(false)}
      />

      {/* Past Trips & Invoices Modal */}
      <RideHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onRebook={handleRebook}
      />

      {/* Floating 1-Tap WhatsApp Booking Pill */}
      <WhatsAppFloat />
    </main>
  );
}
