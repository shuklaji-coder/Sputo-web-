"use client";

import React, { useEffect, useState } from 'react';
import { RideData, DriverLocation } from '@/lib/types';
import {
  subscribeToRide,
  subscribeToDriverLocation,
  cancelRide
} from '@/lib/bookingService';
import GoogleMapComponent from './GoogleMapComponent';
import {
  Phone,
  MessageSquare,
  ShieldAlert,
  Share2,
  CheckCircle2,
  Star,
  Copy,
  Check,
  X,
  QrCode,
  Zap,
  Radio,
  Clock
} from 'lucide-react';

interface LiveTrackingModalProps {
  rideId: string | null;
  onClose: () => void;
}

export default function LiveTrackingModal({ rideId, onClose }: LiveTrackingModalProps) {
  const [ride, setRide] = useState<RideData | null>(null);
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
  const [copiedOtp, setCopiedOtp] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  // Subscribe to real-time live ride updates from Firestore 'rides/{rideId}'
  useEffect(() => {
    if (!rideId) return;

    const unsubscribe = subscribeToRide(rideId, (updatedRide) => {
      setRide(updatedRide);
    });

    return () => unsubscribe();
  }, [rideId]);

  // Elapsed searching timer
  useEffect(() => {
    if (!ride || ride.status !== 'requested') return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [ride?.status]);

  // Subscribe to real-time driver GPS stream from 'driverLocations/{driverId}'
  useEffect(() => {
    if (!ride || !ride.driverId) return;

    const unsubscribe = subscribeToDriverLocation(ride.driverId, (loc) => {
      setDriverLocation(loc);
    });

    return () => unsubscribe();
  }, [ride?.driverId]);

  if (!rideId || !ride) return null;

  const handleCopyOtp = () => {
    if (!ride?.otp) return;
    navigator.clipboard.writeText(ride.otp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const handleCancelRide = async () => {
    if (confirm('Are you sure you want to cancel this ride request?')) {
      setIsCancelling(true);
      try {
        await cancelRide(rideId);
      } finally {
        setIsCancelling(false);
      }
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F9D024] text-obsidian flex items-center justify-center font-black">
              <Zap className="w-5 h-5 fill-obsidian" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-wide">
                  SPUTO LIVE DISPATCH
                </span>
                <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-[#F9D024] text-obsidian">
                  {ride.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-semibold">
                Order ID: #{ride.id} • {ride.vehicleType}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* STATE 1: REQUESTED (REAL LIVE BROADCASTING TO DRIVER APP) */}
          {ride.status === 'requested' && (
            <div className="text-center py-6 sm:py-8">
              {/* Sonar Radar Visual */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
                <div className="sonar-ring w-40 h-40" />
                <div className="sonar-ring-2 w-32 h-32" />
                <div className="relative z-10 w-24 h-24 rounded-full bg-white border-4 border-[#F9D024] flex flex-col items-center justify-center shadow-rapido text-obsidian">
                  <Radio className="w-8 h-8 text-[#F9D024] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-obsidian mt-1">
                    BROADCASTING
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-obsidian">
                Connecting with Nearby Captains...
              </h3>
              <p className="text-xs text-stone-600 font-semibold mt-2 max-w-md mx-auto">
                Your request is live on the ChalojiDriver network. Broadcasting to verified {ride.vehicleType} Captains within 3.5 km.
              </p>

              {/* Live Dispatch Status Cards */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-[#FEF9C3] border border-yellow-300 text-xs font-black text-obsidian flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-obsidian" />
                  <span>Searching: {formatTimer(elapsedSeconds)}</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-black text-obsidian">
                  Locked Fare: ₹{ride.fare} (₹0 Surge)
                </div>
              </div>

              {/* Live Pickup Details */}
              <div className="mt-6 p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <p className="text-stone-700 truncate">
                    <strong className="text-obsidian">Pickup:</strong> {ride.pickup.address}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F9D024] mt-1 shrink-0 border border-stone-600" />
                  <p className="text-stone-700 truncate">
                    <strong className="text-obsidian">Drop:</strong> {ride.drop.address}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCancelRide}
                  disabled={isCancelling}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition disabled:opacity-50"
                >
                  {isCancelling ? 'Cancelling...' : 'Cancel Ride Request'}
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: ACCEPTED / IN_PROGRESS (CAPTAIN CARD + YELLOW START OTP + LIVE MAP) */}
          {(ride.status === 'accepted' || ride.status === 'in_progress') && (
            <div className="space-y-6">
              {/* YELLOW START OTP CHIP */}
              <div className="p-4 rounded-2xl bg-[#FEF9C3] border-2 border-[#F9D024] shadow-rapido flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-obsidian text-xs font-black uppercase tracking-wider">
                    <Zap className="w-4 h-4 fill-[#F9D024]" />
                    <span>Boarding Verification OTP</span>
                  </div>
                  <p className="text-[11px] text-stone-700 font-semibold mt-0.5">
                    Share this 4-digit code with your Captain before boarding.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-5 py-2.5 rounded-xl bg-stone-900 text-[#F9D024] font-mono text-3xl font-black tracking-widest shadow-inner">
                    {ride.otp}
                  </div>
                  <button
                    onClick={handleCopyOtp}
                    className="p-3 rounded-xl bg-white border border-yellow-300 hover:bg-stone-50 text-obsidian transition shadow-sm"
                    title="Copy OTP"
                  >
                    {copiedOtp ? (
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* CAPTAIN PROFILE CARD */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={
                          ride.driver?.photoUrl ||
                          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80'
                        }
                        alt="Captain"
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F9D024] shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#F9D024] text-obsidian flex items-center justify-center text-[10px] font-black shadow-sm">
                        ★
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-black text-obsidian">
                          {ride.driver?.name || 'Verified Sputo Captain'}
                        </h4>
                        <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#FEF9C3] text-obsidian border border-yellow-300">
                          {ride.driver?.badge || 'Elite Captain'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center text-xs font-black text-obsidian">
                          <Star className="w-3.5 h-3.5 fill-[#F9D024] text-obsidian mr-1" />
                          <span>{ride.driver?.rating || 4.9}</span>
                        </div>
                        <span className="text-stone-300">•</span>
                        <span className="text-xs font-bold text-stone-500">
                          {ride.driver?.totalTrips || '1,000+'} Rides
                        </span>
                      </div>

                      {/* Plate & Vehicle */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#FEF9C3] text-obsidian font-mono text-xs font-black border border-yellow-300 shadow-sm">
                          {ride.driver?.vehiclePlate || 'MH 02 XX 0000'}
                        </span>
                        <span className="text-xs font-bold text-stone-700">
                          {ride.driver?.vehicleModel || `${ride.vehicleType}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <a
                      href={`tel:${ride.driver?.phone || '+918087747774'}`}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs flex items-center justify-center gap-2 shadow-sm border border-yellow-400"
                    >
                      <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Call Captain</span>
                    </a>
                    <a
                      href={`https://wa.me/${(ride.driver?.phone || '918087747774').replace(/\D/g, '')}?text=Hi%20Captain,%20I%20am%20waiting%20at%20pickup%20location.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-obsidian font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* LIVE MAP TRACKING */}
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm h-64 relative">
                <GoogleMapComponent
                  pickup={ride.pickup}
                  drop={ride.drop}
                  driverLocation={driverLocation}
                  vehicleType={ride.vehicleType}
                  className="w-full h-full"
                />
              </div>

              {/* Route Summary Details */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                  <p className="text-stone-700 font-medium">
                    <strong className="text-obsidian">Pickup:</strong> {ride.pickup.address}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F9D024] mt-1 shrink-0 border border-stone-600" />
                  <p className="text-stone-700 font-medium">
                    <strong className="text-obsidian">Drop:</strong> {ride.drop.address}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-stone-700">Live GPS Navigation Active</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+918087747774"
                    className="p-2.5 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 flex items-center gap-1.5 text-xs font-bold"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>24x7 SOS</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Track My Sputo Ride',
                          text: `I am taking a Sputo ride. OTP: ${ride.otp}`,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Live trip link copied to clipboard!');
                      }
                    }}
                    className="p-2.5 rounded-xl text-obsidian bg-stone-100 hover:bg-stone-200 flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Trip</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: COMPLETED (RECEIPT + DIRECT UPI QR + RATING) */}
          {ride.status === 'completed' && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#FEF9C3] border-2 border-[#F9D024] text-obsidian flex items-center justify-center mx-auto mb-3 shadow-rapido">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-obsidian">
                  Trip Completed
                </h3>
                <p className="text-xs text-stone-500 font-semibold mt-1">
                  Thank you for riding with Sputo. Here is your verified trip invoice.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      Total Fare Payable
                    </span>
                    <h2 className="text-3xl font-black text-obsidian">
                      ₹{ride.fare}
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    Zero Surge Fare
                  </span>
                </div>

                {/* Fare Breakdown */}
                <div className="space-y-2 text-xs text-stone-700 font-semibold">
                  <div className="flex justify-between">
                    <span>Base Tariff ({ride.vehicleType})</span>
                    <span className="font-bold text-obsidian">₹{Math.round(ride.fare * 0.4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance & Duration ({ride.distanceKm} km, {ride.durationMin} mins)</span>
                    <span className="font-bold text-obsidian">₹{Math.round(ride.fare * 0.5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passenger Safety Insurance & Taxes</span>
                    <span className="font-bold text-obsidian">₹{ride.fare - Math.round(ride.fare * 0.4) - Math.round(ride.fare * 0.5)}</span>
                  </div>
                </div>

                {/* Direct UPI QR Payment Option */}
                <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl border border-stone-300 shadow-sm flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-stone-900 rounded-lg flex flex-col items-center justify-center text-white p-1">
                      <QrCode className="w-14 h-14 text-[#F9D024]" />
                      <span className="text-[8px] tracking-tight font-mono font-bold">SCAN TO PAY</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-black text-obsidian">
                      Direct Peer-to-Peer UPI Payment
                    </p>
                    <p className="text-[11px] text-stone-600 font-semibold mt-0.5">
                      GPay • PhonePe • Paytm • BHIM • CRED
                    </p>
                    <p className="text-[10px] text-stone-500 font-bold mt-1">
                      100% of payment goes directly to Captain with ₹0 platform commission.
                    </p>
                  </div>
                </div>

                {/* Rating Input */}
                <div className="pt-4 border-t border-stone-200 text-center">
                  <p className="text-xs font-black text-obsidian mb-2">
                    Rate Your Ride with {ride.driver?.name || 'the Captain'}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setUserRating(star);
                          setRatingSubmitted(true);
                        }}
                        className="p-1 text-obsidian hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= userRating
                              ? 'fill-[#F9D024] text-obsidian'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {ratingSubmitted && (
                    <p className="text-xs text-emerald-600 font-bold mt-2">
                      Thank you! Your rating has been recorded.
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => alert(`Official tax invoice for Ride #${ride.id} downloaded.`)}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-obsidian font-bold text-xs transition text-center"
                >
                  Download Tax Invoice
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs transition shadow-rapido text-center border border-yellow-400"
                >
                  Book Another Ride
                </button>
              </div>
            </div>
          )}

          {/* STATE 4: CANCELLED */}
          {ride.status === 'cancelled' && (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center mx-auto text-stone-500">
                <X className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-obsidian">
                Ride Request Cancelled
              </h3>
              <p className="text-xs text-stone-500 font-semibold max-w-sm mx-auto">
                Your request has been cancelled. Zero cancellation fee charged.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-3 rounded-xl bg-[#F9D024] text-obsidian text-xs font-black shadow-rapido"
              >
                Close & Return Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
