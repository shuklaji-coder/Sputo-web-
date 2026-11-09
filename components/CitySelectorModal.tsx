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
    name: "Mumbai MMR (All Zones)",
    tagline: "Complete Metropolitan Coverage",
    hubs: "BKC, Airport T2, CSMT, Dadar, Powai",
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
    name: "South & Central Mumbai",
    tagline: "Island City, Heritage & CBD",
    hubs: "Nariman Point, CSMT, Lower Parel, Dadar",
    defaultPickup: {
      address: "Nariman Point Business District, South Mumbai",
      latitude: 18.9256,
      longitude: 72.8242
    },
    defaultDrop: {
      address: "Lower Parel, High Street Phoenix / Palladium, Mumbai",
      latitude: 18.9950,
      longitude: 72.8258
    }
  },
  {
    name: "Western Suburbs",
    tagline: "Coastal Belt & Airport Corridor",
    hubs: "Bandra, Juhu, Andheri, Malad, Borivali",
    defaultPickup: {
      address: "Andheri West, Link Road, Mumbai",
      latitude: 19.1363,
      longitude: 72.8277
    },
    defaultDrop: {
      address: "Chhatrapati Shivaji Maharaj Intl Airport (T2), Mumbai",
      latitude: 19.0896,
      longitude: 72.8656
    }
  },
  {
    name: "Thane & Central Suburbs",
    tagline: "Eastern Express & Tech Corridors",
    hubs: "Thane West, Powai, Ghatkopar, Mulund",
    defaultPickup: {
      address: "Thane West, Viviana Mall, Eastern Express Highway",
      latitude: 19.2089,
      longitude: 72.9712
    },
    defaultDrop: {
      address: "Hiranandani Gardens, Central Avenue, Powai, Mumbai",
      latitude: 19.1197,
      longitude: 72.9051
    }
  },
  {
    name: "Navi Mumbai",
    tagline: "Planned Nodes & Business Hubs",
    hubs: "Vashi, Nerul, CBD Belapur, Kharghar",
    defaultPickup: {
      address: "Vashi Sector 17, Navi Mumbai",
      latitude: 19.0771,
      longitude: 72.9986
    },
    defaultDrop: {
      address: "CBD Belapur, Sector 11, Navi Mumbai",
      latitude: 19.0182,
      longitude: 73.0400
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-2xl p-5 sm:p-8 my-auto max-h-[92vh] overflow-y-auto">
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Currently Live Exclusively in Mumbai MMR
          </div>
          <h3 className="text-2xl font-black text-obsidian">
            Select Your Zone
          </h3>
          <p className="text-xs text-stone-500 font-semibold mt-1">
            Choose your operating region for tailored routes, local tariffs, and instantaneous Captain dispatch.
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

        {/* Mumbai Exclusivity Footer Note */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-semibold">
          <span>📍 Serving Island City, Suburbs, Thane & Navi Mumbai</span>
          <span className="text-stone-400 font-normal">Other metros launching soon</span>
        </div>
      </div>
    </div>
  );
}
