"use client";

import React from 'react';
import { X, Clock, MapPin, Receipt, Star, RotateCcw, Download } from 'lucide-react';
import { RideData } from '@/lib/types';

interface RideHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRebook: (pickupAddress: string, dropAddress: string) => void;
}

const PAST_MOCK_RIDES = [
  {
    id: "sp_ride_88291",
    date: "Yesterday, 07:45 PM",
    pickup: "Bandra Kurla Complex (BKC), G Block, Mumbai",
    drop: "Chhatrapati Shivaji Maharaj Intl Airport (T2), Mumbai",
    vehicleType: "Bike Taxi",
    fare: 95,
    captain: "Captain Aarav Solanki",
    rating: 5,
    status: "Completed"
  },
  {
    id: "sp_ride_77140",
    date: "04 Nov 2026, 09:15 AM",
    pickup: "Hiranandani Gardens, Central Ave, Powai",
    drop: "Nesco IT Park, Western Express Hwy, Goregaon",
    vehicleType: "Sputo Auto",
    fare: 140,
    captain: "Captain Imran Mansuri",
    rating: 5,
    status: "Completed"
  },
  {
    id: "sp_ride_61902",
    date: "01 Nov 2026, 08:30 PM",
    pickup: "Nariman Point Business District, Mumbai",
    drop: "Juhu Tara Road, Juhu Beach",
    vehicleType: "Royale Cab (AC)",
    fare: 285,
    captain: "Captain Vikramaditya Rathore",
    rating: 5,
    status: "Completed"
  }
];

export default function RideHistoryModal({
  isOpen,
  onClose,
  onRebook
}: RideHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl p-5 sm:p-8 my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-obsidian hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF9C3] border-2 border-yellow-300 flex items-center justify-center mx-auto mb-3 shadow-sm text-obsidian font-black">
            <Clock className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-black text-obsidian">
            My Trips & Invoices
          </h3>
          <p className="text-xs text-stone-500 font-semibold mt-1">
            Review completed journeys, download GST tax receipts, or rebook instantly.
          </p>
        </div>

        {/* Trips List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {PAST_MOCK_RIDES.map((r, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-500">
                    {r.date} • {r.vehicleType}
                  </span>
                  <p className="text-xs font-bold text-obsidian">
                    Invoice #{r.id}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-obsidian">
                    ₹{r.fare}
                  </span>
                  <span className="block text-[10px] font-black text-emerald-600">
                    Paid via UPI
                  </span>
                </div>
              </div>

              {/* Route */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0" />
                  <p className="text-stone-700 font-medium">
                    <strong className="text-obsidian">From:</strong> {r.pickup}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F9D024] mt-1 shrink-0 border border-stone-600" />
                  <p className="text-stone-700 font-medium">
                    <strong className="text-obsidian">To:</strong> {r.drop}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                <span className="text-stone-600 font-semibold">
                  Driver: <strong className="text-obsidian">{r.captain}</strong> (5.0 ★)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Tax invoice for ${r.id} downloaded.`)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-700 font-bold hover:bg-stone-50 transition flex items-center gap-1.5 text-[11px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onRebook(r.pickup, r.drop);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black transition flex items-center gap-1.5 text-[11px] shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Rebook</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
