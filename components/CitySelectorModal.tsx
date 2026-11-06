"use client";

import React from 'react';
import { MapPin, X, Check, Building2 } from 'lucide-react';
import { LocationPoint } from '@/lib/types';

interface CitySelectorModalProps {
  isOpen: boolean;
  selectedCity: string;
  onSelectCity: (city: string, defaultPickup: LocationPoint, defaultDrop: LocationPoint) => void;
  onClose: () => void;
}

export const CITIES_DATA = [
  {
    name: "Mumbai MMR",
    tagline: "Financial Capital & Coast",
    hubs: "BKC, Airport T2, Nariman Point, Powai",
    defaultPickup: {
      address: "Bandra Kurla Complex (BKC), G Block, Mumbai",
      latitude: 19.0657,
      longitude: 72.8687
    },
    defaultDrop: {
      address: "Chhatrapati Shivaji Maharaj Intl Airport (T2), Mumbai",
      latitude: 19.0896,
      longitude: 72.8656
    }
  },
  {
    name: "Bengaluru",
    tagline: "Silicon Valley of India",
    hubs: "Indiranagar, Koramangala, Whitefield, Bellandur",
    defaultPickup: {
      address: "100 Feet Road, Indiranagar, Bengaluru",
      latitude: 12.9784,
      longitude: 77.6408
    },
    defaultDrop: {
      address: "Kempegowda International Airport (BLR), Devanahalli",
      latitude: 13.1986,
      longitude: 77.7066
    }
  },
  {
    name: "Delhi NCR",
    tagline: "National Capital Region",
    hubs: "Cyber City Gurugram, Connaught Place, Noida Sector 62",
    defaultPickup: {
      address: "DLF Cyber City, Building 10, Gurugram",
      latitude: 28.4950,
      longitude: 77.0895
    },
    defaultDrop: {
      address: "Indira Gandhi International Airport (T3), New Delhi",
      latitude: 28.5562,
      longitude: 77.1000
    }
  },
  {
    name: "Pune",
    tagline: "Oxford of the East & Tech Hub",
    hubs: "Koregaon Park, Hinjewadi Phase 1, Viman Nagar",
    defaultPickup: {
      address: "North Main Road, Koregaon Park, Pune",
      latitude: 18.5362,
      longitude: 73.8958
    },
    defaultDrop: {
      address: "Pune International Airport, Lohegaon, Pune",
      latitude: 18.5822,
      longitude: 73.9197
    }
  },
  {
    name: "Hyderabad",
    tagline: "City of Pearls & Cyberabad",
    hubs: "HITEC City, Gachibowli, Jubilee Hills",
    defaultPickup: {
      address: "HITEC City Main Road, Madhapur, Hyderabad",
      latitude: 17.4474,
      longitude: 78.3762
    },
    defaultDrop: {
      address: "Rajiv Gandhi Intl Airport (HYD), Shamshabad",
      latitude: 17.2403,
      longitude: 78.4294
    }
  }
];

export default function CitySelectorModal({
  isOpen,
  selectedCity,
  onSelectCity,
  onClose
}: CitySelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/75 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
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
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-obsidian">
            Select Your City
          </h3>
          <p className="text-xs text-stone-500 font-semibold mt-1">
            Choose your operating city for tailored tariffs, local routes, and instantaneous Captain dispatch.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {CITIES_DATA.map((c, idx) => {
            const isSelected = selectedCity.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectCity(c.name, c.defaultPickup, c.defaultDrop);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#FEF9C3] text-obsidian border-2 border-[#F9D024] shadow-rapido'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-obsidian'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#F9D024] text-obsidian' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-obsidian">
                      {c.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-stone-500">
                      {c.tagline} • <span className="italic">{c.hubs}</span>
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#F9D024] text-obsidian flex items-center justify-center font-black">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
