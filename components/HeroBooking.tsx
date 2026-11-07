"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationPoint, QuoteData, VehicleCategory, VehicleOption } from '@/lib/types';
import { POPULAR_LOCATIONS } from '@/lib/mockData';
import { getRideQuote, createRide } from '@/lib/bookingService';
import { useAuth } from '@/context/AuthContext';
import LocationInput from './LocationInput';
import GoogleMapComponent from './GoogleMapComponent';
import {
  ArrowUpDown,
  Car,
  Bike,
  Shield,
  CreditCard,
  Banknote,
  Sparkles,
  Clock,
  Users,
  Check,
  ChevronRight,
  Package,
  MapPin,
  Flame,
  Zap,
  Calendar
} from 'lucide-react';

interface HeroBookingProps {
  onRideCreated: (rideId: string) => void;
}

export default function HeroBooking({ onRideCreated }: HeroBookingProps) {
  const { user, openAuthModal } = useAuth();

  // Mode tab: 'ride' | 'parcel'
  const [bookingMode, setBookingMode] = useState<'ride' | 'parcel'>('ride');

  // Timing Mode: 'now' | 'schedule'
  const [timingMode, setTimingMode] = useState<'now' | 'schedule'>('now');
  const [scheduledDate, setScheduledDate] = useState<string>('tomorrow');
  const [scheduledTime, setScheduledTime] = useState<string>('08:00');

  // Initial demo locations: BKC to Mumbai Airport T2
  const [pickup, setPickup] = useState<LocationPoint | null>(POPULAR_LOCATIONS[0]);
  const [drop, setDrop] = useState<LocationPoint | null>(POPULAR_LOCATIONS[1]);

  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('Bike');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi'>('cash');
  const [isQuoting, setIsQuoting] = useState<boolean>(false);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Parcel details
  const [parcelSize, setParcelSize] = useState<'small' | 'medium' | 'large'>('small');
  const [recipientPhone, setRecipientPhone] = useState<string>('');

  // Popular quick route presets for 1-tap estimation (Rapido style)
  const routePresets = [
    {
      label: "BKC ➔ Airport T2",
      pickup: POPULAR_LOCATIONS[0],
      drop: POPULAR_LOCATIONS[1]
    },
    {
      label: "Nariman Point ➔ BKC",
      pickup: POPULAR_LOCATIONS[5],
      drop: POPULAR_LOCATIONS[0]
    },
    {
      label: "Andheri West ➔ Airport T2",
      pickup: POPULAR_LOCATIONS[4],
      drop: POPULAR_LOCATIONS[1]
    },
    {
      label: "Thane ➔ Vashi Navi Mumbai",
      pickup: POPULAR_LOCATIONS[8],
      drop: POPULAR_LOCATIONS[9]
    }
  ];

  // Fetch real-time server-enforced quote whenever pickup or drop updates
  useEffect(() => {
    let isCancelled = false;

    async function fetchQuote() {
      if (!pickup || !drop) {
        setQuote(null);
        return;
      }
      setIsQuoting(true);
      setErrorMessage(null);

      try {
        const quoteData = await getRideQuote(pickup, drop);
        if (!isCancelled) {
          setQuote(quoteData);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setErrorMessage('Unable to retrieve fare quotes. Please retry.');
        }
      } finally {
        if (!isCancelled) {
          setIsQuoting(false);
        }
      }
    }

    fetchQuote();

    return () => {
      isCancelled = true;
    };
  }, [pickup, drop]);

  // Swap pickup & drop
  const handleSwapLocations = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  // 1-tap route preset selection
  const handleSelectPreset = (presetPickup: LocationPoint, presetDrop: LocationPoint) => {
    setPickup(presetPickup);
    setDrop(presetDrop);
  };

  // Handle Ride Booking
  const handleBookRide = async () => {
    if (!pickup || !drop) {
      setErrorMessage('Please select both pickup and drop destinations.');
      return;
    }

    if (!user) {
      openAuthModal();
      return;
    }

    if (!quote) {
      setErrorMessage('Awaiting server-verified fare quote...');
      return;
    }

    const currentOption = quote.vehicles.find((v) => v.category === selectedVehicle) || quote.vehicles[0];

    setIsBooking(true);
    setErrorMessage(null);

    try {
      // Server-enforced ride creation via Firebase Cloud Function
      const response = await createRide({
        pickup,
        drop,
        vehicleType: selectedVehicle,
        paymentMethod,
        quoteId: quote.quoteId,
        fare: currentOption.fare,
        distanceKm: quote.distanceKm,
        durationMin: quote.durationMin
      });

      if (response && response.rideId) {
        onRideCreated(response.rideId);
      } else {
        throw new Error('Failed to create ride dispatch order.');
      }
    } catch (err: any) {
      console.error('Ride booking error:', err);
      setErrorMessage(err.message || 'Ride dispatch error. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const currentOption = quote?.vehicles.find((v) => v.category === selectedVehicle);

  return (
    <section id="booking-engine" className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Rapido Yellow ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-gradient-to-r from-yellow-200/40 via-yellow-100/30 to-yellow-200/40 blur-3xl pointer-events-none -z-10" />

      {/* Hero Header: 2 Columns (Headline on Left, Sputo Fleet Image on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        {/* Left Column: Headline & Value Prop (6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-6 space-y-4 text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9C3] border border-yellow-300 text-obsidian text-xs font-black uppercase tracking-wider shadow-sm hover:scale-105 transition-transform cursor-default">
            <Zap className="w-4 h-4 text-stone-900 fill-[#F9D024]" />
            <span>Bharat Moves on Sputo • Lowest Fares Guaranteed</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight leading-[1.12]">
            Traffic Ka Chakkar Chhodo, <br className="hidden sm:inline" />
            <span className="text-obsidian underline decoration-[#F9D024] decoration-8 underline-offset-4">
              Sputo Pakdo.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-semibold max-w-xl">
            Na koi khit-khit, na surge pricing. Doorstep pickup in Bike Taxi, Auto & Cabs across Mumbai MMR (Mumbai, Thane & Navi Mumbai).
          </p>

          {/* 1-Tap Popular Route Presets Chips with Micro-interactions */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-stone-500 uppercase tracking-wider text-[11px] mr-1">
              POPULAR:
            </span>
            {routePresets.map((r, i) => (
              <motion.button
                key={i}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectPreset(r.pickup, r.drop)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FEF9C3] border border-stone-200 hover:border-yellow-400 text-stone-800 font-bold shadow-sm transition-colors"
              >
                ⚡ {r.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Full Sputo Fleet Image with Levitation Animation (6 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-6 relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-rapido-card group hover:shadow-2xl transition-all duration-300"
          >
            <img
              src="/images/sputo-fleet.jpg"
              alt="Sputo Fleet - Bike Taxi, Auto Rickshaw & Cab in BKC Mumbai"
              className="w-full h-auto object-contain rounded-3xl transition-transform duration-700 group-hover:scale-102"
            />

            {/* Floating Top Badge with pulsing beacon */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-sm text-xs font-black text-obsidian">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Doorstep in 2-5 Mins</span>
            </div>

            {/* Floating Bottom Badge */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-stone-900/90 text-white backdrop-blur-md text-xs font-bold shadow-md flex items-center gap-2 border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-[#F9D024]" />
                <span>BKC Mumbai Hub</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-[#F9D024] text-obsidian text-xs font-black shadow-md border border-yellow-400">
                4.9 ★ Captains
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Grid: Booking Engine Card & Live Map Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Booking Wizard (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-rapido-card border border-stone-200 relative">
          {/* Mode & Timing Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100 mb-5">
            {/* Service Type Switcher */}
            <div className="inline-flex p-1 rounded-2xl bg-stone-100 border border-stone-200">
              <button
                type="button"
                onClick={() => setBookingMode('ride')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black transition ${
                  bookingMode === 'ride'
                    ? 'bg-[#F9D024] text-obsidian shadow-sm'
                    : 'text-stone-600 hover:text-obsidian'
                }`}
              >
                <Bike className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Daily Ride</span>
              </button>
              <button
                type="button"
                onClick={() => setBookingMode('parcel')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black transition ${
                  bookingMode === 'parcel'
                    ? 'bg-[#F9D024] text-obsidian shadow-sm'
                    : 'text-stone-600 hover:text-obsidian'
                }`}
              >
                <Package className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Parcel</span>
              </button>
            </div>

            {/* Ride Now vs Schedule Later Switcher */}
            <div className="inline-flex p-1 rounded-2xl bg-stone-100 border border-stone-200">
              <button
                type="button"
                onClick={() => setTimingMode('now')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                  timingMode === 'now'
                    ? 'bg-obsidian text-white shadow-sm'
                    : 'text-stone-600 hover:text-obsidian'
                }`}
              >
                <Zap className="w-3 h-3 fill-[#F9D024] text-[#F9D024]" />
                <span>Ride Now</span>
              </button>
              <button
                type="button"
                onClick={() => setTimingMode('schedule')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                  timingMode === 'schedule'
                    ? 'bg-[#F9D024] text-obsidian shadow-sm border border-yellow-400'
                    : 'text-stone-600 hover:text-obsidian'
                }`}
              >
                <Calendar className="w-3 h-3 stroke-[2.5]" />
                <span>Schedule Later</span>
              </button>
            </div>
          </div>

          {/* Schedule Configuration Bar */}
          {timingMode === 'schedule' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3.5 rounded-2xl bg-[#FEF9C3] border border-yellow-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-obsidian"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-obsidian stroke-[2.5] shrink-0" />
                <div>
                  <p className="text-xs font-black">Advance Airport & Morning Commute Lock</p>
                  <p className="text-[11px] text-stone-700 font-medium">Guaranteed pickup with zero cancellation penalty.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-bold text-obsidian outline-none shadow-sm cursor-pointer"
                >
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="day_after">Day After</option>
                </select>

                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-bold text-obsidian outline-none shadow-sm cursor-pointer font-mono"
                />
              </div>
            </motion.div>
          )}

          {/* Location Inputs with Swap Button */}
          <div className="space-y-3 relative mb-6">
            <LocationInput
              label={bookingMode === 'parcel' ? 'Sender Pickup Point' : 'Pickup Location'}
              placeholder="Enter pickup address, office, or landmark..."
              value={pickup}
              onChange={setPickup}
              iconType="pickup"
            />

            {/* Swap Button */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
              <button
                type="button"
                onClick={handleSwapLocations}
                className="w-10 h-10 rounded-full bg-white border border-stone-300 shadow-md flex items-center justify-center hover:bg-[#FEF9C3] hover:border-yellow-400 transition transform hover:rotate-180 duration-300"
                title="Swap Pickup and Drop"
              >
                <ArrowUpDown className="w-4 h-4 text-obsidian" />
              </button>
            </div>

            <LocationInput
              label={bookingMode === 'parcel' ? 'Recipient Drop Address' : 'Drop Destination'}
              placeholder="Enter destination address, metro station, or society..."
              value={drop}
              onChange={setDrop}
              iconType="drop"
            />
          </div>

          {/* Parcel specific inputs if Parcel mode active */}
          {bookingMode === 'parcel' && (
            <div className="mb-6 p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-obsidian uppercase tracking-wider">
                  Package Size
                </span>
                <span className="text-[11px] text-stone-500 font-semibold">Max 15 kg</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', label: 'Docs / Keys', weight: '< 1 kg' },
                  { id: 'medium', label: 'Box / Food', weight: '< 5 kg' },
                  { id: 'large', label: 'Large Bag', weight: '< 15 kg' },
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setParcelSize(pkg.id as any)}
                    className={`p-2.5 rounded-xl text-center border transition ${
                      parcelSize === pkg.id
                        ? 'bg-[#FEF9C3] border-[#F9D024] font-black text-obsidian'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <p className="text-xs">{pkg.label}</p>
                    <p className="text-[10px] text-stone-500 font-semibold">{pkg.weight}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Category Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 px-1">
              <label className="text-xs font-black uppercase tracking-wider text-stone-600">
                Choose Sputo Service
              </label>
              {isQuoting && (
                <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#F9D024] animate-ping" />
                  Calculating live meter rates...
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
              {quote ? (
                quote.vehicles.map((veh, idx) => {
                  const isSelected = selectedVehicle === veh.category;
                  return (
                    <motion.div
                      key={veh.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVehicle(veh.category)}
                      className={`cursor-pointer rounded-2xl p-2.5 sm:p-3.5 transition-all duration-200 border relative flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-[#FFFBEB] border-2 border-[#F9D024] shadow-rapido ring-4 ring-yellow-400/25'
                          : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-yellow-200 shadow-sm'
                      } ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
                    >
                      {/* Priority Tag for Fastest Booking with subtle bounce */}
                      {veh.category === 'Priority Cab' && (
                        <motion.div
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{ repeat: Infinity, duration: 2.5 }}
                          className="absolute -top-2.5 left-2 px-2 py-0.5 rounded-full bg-amber-400 text-obsidian text-[9px] font-black uppercase tracking-wider shadow-sm border border-amber-500 flex items-center gap-1 z-10"
                        >
                          <Zap className="w-2.5 h-2.5 fill-obsidian stroke-obsidian" />
                          <span>Fastest</span>
                        </motion.div>
                      )}

                      {/* Top Row: Icon/Image + Capacity */}
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all p-0.5 overflow-hidden ${
                            isSelected
                              ? 'bg-[#F9D024] text-obsidian shadow-sm scale-105'
                              : 'bg-stone-100 text-stone-700 group-hover:bg-amber-50'
                          }`}
                        >
                          {veh.category === 'Bike' && (
                            <motion.img
                              whileHover={{ x: 4, scale: 1.08 }}
                              transition={{ type: "spring", stiffness: 350, damping: 20 }}
                              src="/images/fleet/bike-cutout.png"
                              alt="Bike Taxi"
                              className="w-full h-full object-contain"
                            />
                          )}
                          {veh.category === 'Auto' && (
                            <motion.img
                              whileHover={{ x: 4, scale: 1.08 }}
                              transition={{ type: "spring", stiffness: 350, damping: 20 }}
                              src="/images/fleet/auto-cutout.png"
                              alt="Sputo Auto"
                              className="w-full h-full object-contain"
                            />
                          )}
                          {veh.category === 'Royale Cab' && (
                            <motion.img
                              whileHover={{ x: 4, scale: 1.08 }}
                              transition={{ type: "spring", stiffness: 350, damping: 20 }}
                              src="/images/fleet/priority-cab.png"
                              alt="Royale Cab"
                              className="w-full h-full object-contain"
                            />
                          )}
                          {veh.category === 'Priority Cab' && (
                            <motion.div
                              whileHover={{ x: 4, scale: 1.08 }}
                              transition={{ type: "spring", stiffness: 350, damping: 20 }}
                              className="relative w-full h-full flex items-center justify-center"
                            >
                              <img src="/images/fleet/priority-cab.png" alt="Priority Cab" className="w-full h-full object-contain" />
                            </motion.div>
                          )}
                          {veh.category === 'Sputo SUV' && (
                            <motion.img
                              whileHover={{ x: 4, scale: 1.08 }}
                              transition={{ type: "spring", stiffness: 350, damping: 20 }}
                              src="/images/fleet/suv-innova.png"
                              alt="Sputo SUV"
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full">
                          <Users className="w-3 h-3 text-stone-500" />
                          <span>{veh.capacity}</span>
                        </div>
                      </div>

                      {/* Middle: Name + ETA */}
                      <div className="mt-2.5">
                        <h3 className="font-black text-xs sm:text-sm text-obsidian line-clamp-1">
                          {veh.name}
                        </h3>
                        <p className="text-[10px] text-stone-500 font-medium line-clamp-1 mt-0.5">
                          {veh.tag}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-stone-800">
                          <Clock className="w-3 h-3 text-stone-600" />
                          <span>{veh.etaMin} mins</span>
                        </div>
                      </div>

                      {/* Bottom: Fare + Discount */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-black text-obsidian">
                            ₹{veh.fare}
                          </span>
                          {veh.originalFare && (
                            <span className="text-[10px] text-stone-400 line-through ml-1 font-semibold">
                              ₹{veh.originalFare}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#F9D024] text-obsidian flex items-center justify-center shadow-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                // Shimmer Skeleton (5 cards)
                [1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-36 rounded-2xl bg-stone-100 animate-pulse border border-stone-200"
                  />
                ))
              )}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-6 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-black uppercase tracking-wider text-obsidian">
                Payment Method
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  paymentMethod === 'cash'
                    ? 'bg-[#F9D024] text-obsidian shadow-sm border border-yellow-400'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Banknote className="w-3.5 h-3.5" />
                <span>Cash on Drop</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  paymentMethod === 'upi'
                    ? 'bg-[#F9D024] text-obsidian shadow-sm border border-yellow-400'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>UPI / QR Code</span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* Main Action Button - Full Rapido Yellow with spring animations */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookRide}
            disabled={isBooking || isQuoting || !quote}
            className="w-full py-4 px-6 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-base tracking-wide uppercase shadow-rapido border border-yellow-400 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group"
          >
            {/* Animated shimmer highlight beam */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {isBooking ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
                <span>{timingMode === 'schedule' ? 'Locking Advance Schedule...' : 'Finding Nearby Captains...'}</span>
              </>
            ) : (
              <>
                {timingMode === 'schedule' ? (
                  <Calendar className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Zap className="w-5 h-5 stroke-[2.5]" />
                )}
                <span>
                  {timingMode === 'schedule'
                    ? `Schedule ${selectedVehicle} for ${scheduledDate === 'today' ? 'Today' : scheduledDate === 'tomorrow' ? 'Tomorrow' : 'Later'} at ${scheduledTime}`
                    : `Book Sputo ${selectedVehicle}`}{' '}
                  {currentOption ? `(₹${currentOption.fare})` : ''}
                </span>
                <ChevronRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>

          <p className="mt-3 text-center text-[11px] text-stone-500 font-semibold">
            Zero surge guarantee • 4-Digit Golden Start OTP • Free passenger insurance
          </p>

          {/* WhatsApp Direct Booking Alternative */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-center">
            <a
              href="https://wa.me/918087747774?text=Hi%20Sputo,%20I%20want%20to%20book%20a%20ride.%20Please%20help%20me%20with%20pickup."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-emerald-700 transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Book directly via WhatsApp: <strong className="text-obsidian underline">+91 80877 47774</strong> →</span>
            </a>
          </div>
        </div>

        {/* Right Column: Live Interactive Google Map (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-3 sm:p-4 border border-stone-200 shadow-rapido-card flex flex-col relative group">
            {/* Map Header Status */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-obsidian uppercase tracking-wider">
                  Live Route Telemetry
                </span>
              </div>

              {quote ? (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] border border-yellow-300 text-obsidian text-xs font-extrabold shadow-sm">
                  <span>{quote.distanceKm} km</span>
                  <span className="text-stone-300">•</span>
                  <span>~{quote.durationMin} mins</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-stone-500">
                  Select Pickup & Drop
                </span>
              )}
            </div>

            {/* Google Map Viewport */}
            <div className="w-full h-[400px] sm:h-[470px] rounded-2xl overflow-hidden border border-stone-200">
              <GoogleMapComponent
                pickup={pickup}
                drop={drop}
                vehicleType={selectedVehicle}
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>

          {/* Quick Perks Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
              <p className="text-lg font-black text-obsidian">4.9 ★</p>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
                Vetted Captains
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
              <p className="text-lg font-black text-obsidian">₹0</p>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
                Zero Surge Spikes
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
              <p className="text-lg font-black text-obsidian">4-Digit</p>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
                Start OTP Guard
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
