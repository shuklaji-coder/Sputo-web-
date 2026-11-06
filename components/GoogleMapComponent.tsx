"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LocationPoint, DriverLocation, VehicleCategory } from '@/lib/types';
import { Navigation, Compass, MapPin, Layers, Crosshair, Car, Bike, AlertCircle } from 'lucide-react';

interface GoogleMapProps {
  pickup: LocationPoint | null;
  drop: LocationPoint | null;
  driverLocation?: DriverLocation | null;
  vehicleType?: VehicleCategory;
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

// Custom clean Rapido-inspired Google Map styling
const RAPIDO_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }, { weight: 3 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#1e293b" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0f172a" }, { weight: 2 }]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }] // Turn off cluttering commercial icons
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#dcfce7" }, { visibility: "on" }] // Soft mint green parks
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e2e8f0" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#fef08a" }] // Subtle yellow for highways
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#facc15" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#f1f5f9" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#bae6fd" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0369a1" }]
  }
];

// Real user-provided top-down vehicle sprite assets
interface VehicleMarkerMeta {
  src: string;
  width: number;
  height: number;
}

const VEHICLE_MARKER_MAP: Record<VehicleCategory, VehicleMarkerMeta> = {
  Bike: {
    src: '/markers/marker-bike.png',
    width: 36,
    height: 52,
  },
  Auto: {
    src: '/markers/marker-auto.png',
    width: 38,
    height: 52,
  },
  'Royale Cab': {
    src: '/markers/marker-cab.png',
    width: 34,
    height: 68,
  },
  'Priority Cab': {
    src: '/markers/marker-cab.png',
    width: 34,
    height: 68,
  },
  'Sputo SUV': {
    src: '/markers/marker-cab-alt.png',
    width: 38,
    height: 74,
  },
};

// Rotated marker canvas cache for 60fps performance
const rotatedMarkerCache = new Map<string, string>();

function getRotatedMarkerIcon(
  src: string,
  width: number,
  height: number,
  heading: number = 0
): Promise<string> {
  const normAngle = Math.round(((heading % 360) + 360) % 360);
  const cacheKey = `${src}_${width}_${height}_${normAngle}`;

  if (rotatedMarkerCache.has(cacheKey)) {
    return Promise.resolve(rotatedMarkerCache.get(cacheKey)!);
  }

  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(src);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const maxDim = Math.ceil(Math.sqrt(width * width + height * height)) + 4;
      const canvas = document.createElement('canvas');
      canvas.width = maxDim;
      canvas.height = maxDim;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(src);
        return;
      }

      ctx.translate(maxDim / 2, maxDim / 2);
      ctx.rotate((normAngle * Math.PI) / 180);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);

      try {
        const dataUrl = canvas.toDataURL('image/png');
        rotatedMarkerCache.set(cacheKey, dataUrl);
        resolve(dataUrl);
      } catch (e) {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

export default function GoogleMapComponent({
  pickup,
  drop,
  driverLocation,
  vehicleType = 'Bike',
  className = "w-full h-full min-h-[380px] rounded-3xl",
  onMapClick,
}: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const pickupMarkerRef = useRef<google.maps.Marker | null>(null);
  const dropMarkerRef = useRef<google.maps.Marker | null>(null);
  const driverMarkerRef = useRef<google.maps.Marker | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);
  const nearbyCaptainsMarkersRef = useRef<google.maps.Marker[]>([]);

  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isTrafficActive, setIsTrafficActive] = useState<boolean>(false);
  const [mapMode, setMapMode] = useState<'street' | 'satellite'>('street');
  const [nearbyCount, setNearbyCount] = useState<number>(4);

  // Monitor Google Maps ready state
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      if (window.google?.maps) {
        setMapLoaded(true);
        clearInterval(interval);
      }
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!window.google?.maps) {
        setLoadError(true);
      }
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Initialize Map Instance
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || !window.google) return;

    if (!mapInstanceRef.current) {
      const defaultCenter = pickup
        ? { lat: pickup.latitude, lng: pickup.longitude }
        : { lat: 19.0657, lng: 72.8687 }; // BKC Mumbai

      const map = new google.maps.Map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 13,
        styles: RAPIDO_MAP_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'greedy',
      });

      // Signature Dual Stroke Directions Line
      const renderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#111827', // Obsidian outer casing
          strokeOpacity: 0.95,
          strokeWeight: 6,
        },
      });

      mapInstanceRef.current = map;
      directionsRendererRef.current = renderer;
      trafficLayerRef.current = new google.maps.TrafficLayer();

      // Click listener if requested
      if (onMapClick) {
        map.addListener('click', (e: any) => {
          if (e.latLng) {
            onMapClick(e.latLng.lat(), e.latLng.lng());
          }
        });
      }
    }
  }, [mapLoaded, onMapClick]);

  // Toggle Traffic Layer
  const handleToggleTraffic = () => {
    if (!trafficLayerRef.current || !mapInstanceRef.current) return;
    if (isTrafficActive) {
      trafficLayerRef.current.setMap(null);
      setIsTrafficActive(false);
    } else {
      trafficLayerRef.current.setMap(mapInstanceRef.current);
      setIsTrafficActive(true);
    }
  };

  // Toggle Satellite vs Street
  const handleToggleMapMode = () => {
    if (!mapInstanceRef.current) return;
    if (mapMode === 'street') {
      mapInstanceRef.current.setMapTypeId('satellite');
      mapInstanceRef.current.setOptions({ styles: [] });
      setMapMode('satellite');
    } else {
      mapInstanceRef.current.setMapTypeId('roadmap');
      mapInstanceRef.current.setOptions({ styles: RAPIDO_MAP_STYLES });
      setMapMode('street');
    }
  };

  // Recenter Map on Route
  const handleFitRoute = () => {
    if (!mapInstanceRef.current || !pickup || !window.google) return;

    if (pickup && drop) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(pickup.latitude, pickup.longitude));
      bounds.extend(new google.maps.LatLng(drop.latitude, drop.longitude));
      mapInstanceRef.current.fitBounds(bounds, 70);
    } else {
      mapInstanceRef.current.panTo({ lat: pickup.latitude, lng: pickup.longitude });
    }
  };

  // Update Pickup Marker with Golden Pulse Pin
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    if (pickup) {
      const pos = { lat: pickup.latitude, lng: pickup.longitude };
      const pickupSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="18" fill="rgba(249, 208, 36, 0.35)"/>
          <circle cx="21" cy="21" r="11" fill="#F9D024" stroke="#111827" stroke-width="3"/>
          <circle cx="21" cy="21" r="4.5" fill="#111827"/>
        </svg>
      `)}`;

      if (!pickupMarkerRef.current) {
        pickupMarkerRef.current = new google.maps.Marker({
          position: pos,
          map: mapInstanceRef.current,
          title: `Pickup: ${pickup.address}`,
          icon: {
            url: pickupSvg,
            scaledSize: new google.maps.Size(42, 42),
            anchor: new google.maps.Point(21, 21),
          },
        });
      } else {
        pickupMarkerRef.current.setPosition(pos);
      }
      mapInstanceRef.current.panTo(pos);
    } else if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setMap(null);
      pickupMarkerRef.current = null;
    }
  }, [pickup, mapLoaded]);

  // Update Drop Marker with Flag Pin
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    if (drop) {
      const pos = { lat: drop.latitude, lng: drop.longitude };
      const dropSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46" viewBox="0 0 38 46">
          <path d="M19 0C8.5 0 0 8.5 0 19c0 14 19 27 19 27s19-13 19-27C38 8.5 29.5 0 19 0z" fill="#111827" stroke="#F9D024" stroke-width="2.5"/>
          <circle cx="19" cy="18" r="6" fill="#F9D024"/>
        </svg>
      `)}`;

      if (!dropMarkerRef.current) {
        dropMarkerRef.current = new google.maps.Marker({
          position: pos,
          map: mapInstanceRef.current,
          title: `Drop: ${drop.address}`,
          icon: {
            url: dropSvg,
            scaledSize: new google.maps.Size(38, 46),
            anchor: new google.maps.Point(19, 44),
          },
        });
      } else {
        dropMarkerRef.current.setPosition(pos);
      }
    } else if (dropMarkerRef.current) {
      dropMarkerRef.current.setMap(null);
      dropMarkerRef.current = null;
    }
  }, [drop, mapLoaded]);

  // Spawn Simulated Roaming Captains near pickup location (Using Real Top-Down Sprites)
  useEffect(() => {
    if (!mapInstanceRef.current || !pickup || !window.google) return;

    let isCancelled = false;

    // Clear old nearby captains
    nearbyCaptainsMarkersRef.current.forEach((m) => m.setMap(null));
    nearbyCaptainsMarkersRef.current = [];

    const meta = VEHICLE_MARKER_MAP[vehicleType] || VEHICLE_MARKER_MAP.Bike;

    // Offsets around pickup with natural road headings
    const captainOffsets = [
      { dLat: 0.0032, dLng: 0.0025, heading: 45 },
      { dLat: -0.0038, dLng: 0.0029, heading: 135 },
      { dLat: 0.0026, dLng: -0.0039, heading: 225 },
      { dLat: -0.0024, dLng: -0.0031, heading: 315 },
      { dLat: 0.0048, dLng: -0.0011, heading: 85 },
    ];

    async function spawnCaptains() {
      const markers: google.maps.Marker[] = [];
      const maxDim = Math.ceil(Math.sqrt(meta.width * meta.width + meta.height * meta.height)) + 4;

      for (let i = 0; i < captainOffsets.length; i++) {
        const offset = captainOffsets[i];
        const iconUrl = await getRotatedMarkerIcon(meta.src, meta.width, meta.height, offset.heading);
        if (isCancelled || !mapInstanceRef.current) return;

        const pos = {
          lat: pickup!.latitude + offset.dLat,
          lng: pickup!.longitude + offset.dLng,
        };

        const marker = new google.maps.Marker({
          position: pos,
          map: mapInstanceRef.current,
          title: `Nearby Sputo ${vehicleType} Captain #${i + 1}`,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(maxDim, maxDim),
            anchor: new google.maps.Point(maxDim / 2, maxDim / 2),
          },
        });

        markers.push(marker);
      }

      nearbyCaptainsMarkersRef.current = markers;
      setNearbyCount(markers.length);
    }

    spawnCaptains();

    // Subtle drift animation for realism
    const driftInterval = setInterval(() => {
      nearbyCaptainsMarkersRef.current.forEach((m) => {
        const curPos = m.getPosition();
        if (curPos) {
          const latJitter = (Math.random() - 0.5) * 0.0003;
          const lngJitter = (Math.random() - 0.5) * 0.0003;
          m.setPosition({
            lat: curPos.lat() + latJitter,
            lng: curPos.lng() + lngJitter,
          });
        }
      });
    }, 3500);

    return () => {
      isCancelled = true;
      clearInterval(driftInterval);
      nearbyCaptainsMarkersRef.current.forEach((m) => m.setMap(null));
    };
  }, [pickup, vehicleType, mapLoaded]);

  // Compute Route & Fit Bounds
  useEffect(() => {
    if (!mapInstanceRef.current || !directionsRendererRef.current || !window.google) return;

    if (pickup && drop) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: pickup.latitude, lng: pickup.longitude },
          destination: { lat: drop.latitude, lng: drop.longitude },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRendererRef.current?.setDirections(result);
          } else {
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(new google.maps.LatLng(pickup.latitude, pickup.longitude));
            bounds.extend(new google.maps.LatLng(drop.latitude, drop.longitude));
            mapInstanceRef.current?.fitBounds(bounds, 70);
          }
        }
      );
    } else {
      directionsRendererRef.current?.setDirections({ routes: [] } as any);
    }
  }, [pickup, drop, mapLoaded]);

  // Track Moving Driver Position during live ride using Real Vehicle Sprite
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    let isCancelled = false;

    if (driverLocation) {
      const pos = { lat: driverLocation.latitude, lng: driverLocation.longitude };
      const meta = VEHICLE_MARKER_MAP[vehicleType] || VEHICLE_MARKER_MAP.Bike;
      const heading = driverLocation.heading || 0;
      const maxDim = Math.ceil(Math.sqrt(meta.width * meta.width + meta.height * meta.height)) + 4;

      getRotatedMarkerIcon(meta.src, meta.width, meta.height, heading).then((iconUrl) => {
        if (isCancelled || !mapInstanceRef.current) return;

        if (!driverMarkerRef.current) {
          driverMarkerRef.current = new google.maps.Marker({
            position: pos,
            map: mapInstanceRef.current,
            title: `Your Sputo ${vehicleType} Captain`,
            icon: {
              url: iconUrl,
              scaledSize: new google.maps.Size(maxDim, maxDim),
              anchor: new google.maps.Point(maxDim / 2, maxDim / 2),
            },
          });
        } else {
          driverMarkerRef.current.setPosition(pos);
          driverMarkerRef.current.setIcon({
            url: iconUrl,
            scaledSize: new google.maps.Size(maxDim, maxDim),
            anchor: new google.maps.Point(maxDim / 2, maxDim / 2),
          });
        }
        mapInstanceRef.current.panTo(pos);
      });
    } else if (driverMarkerRef.current) {
      driverMarkerRef.current.setMap(null);
      driverMarkerRef.current = null;
    }

    return () => {
      isCancelled = true;
    };
  }, [driverLocation, vehicleType, mapLoaded]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Real Google Map Canvas Viewport */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px] bg-[#f8fafc]" />

      {/* Visual Fallback Vector schematic if Google Maps script is loading or blocked */}
      {(!mapLoaded || loadError) && (
        <div className="absolute inset-0 bg-[#F8FAFC] flex flex-col items-center justify-between p-4 sm:p-5 select-none overflow-hidden">
          {/* Subtle simulated street grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

          {/* Top telemetry status strip */}
          <div className="relative z-10 w-full flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-obsidian">
                High-Precision GPS Route Radar
              </span>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FEF9C3] text-obsidian border border-yellow-300">
              Live Dispatch Active
            </span>
          </div>

          {/* SVG Animated Road & Route Path */}
          <div className="relative w-full flex-1 flex items-center justify-center my-1">
            <svg className="w-full max-w-md h-44 sm:h-52" viewBox="0 0 400 200">
              {/* Concentric Radar Sonar Rings */}
              <circle cx="200" cy="100" r="40" fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="200" cy="100" r="80" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <circle cx="200" cy="100" r="120" fill="none" stroke="#F1F5F9" strokeWidth="1" opacity="0.4" />

              {/* Road Outer Shadow/Casing */}
              <path
                d="M 50,135 Q 160,35 220,105 T 350,65"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Road Asphalt */}
              <path
                d="M 50,135 Q 160,35 220,105 T 350,65"
                fill="none"
                stroke="#334155"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Animated Glowing Yellow Highway Centerline */}
              <path
                d="M 50,135 Q 160,35 220,105 T 350,65"
                fill="none"
                stroke="#F9D024"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                className="animate-[pulse_1.8s_ease-in-out_infinite]"
              />

              {/* Pickup Point Node */}
              <g transform="translate(50, 135)">
                <circle r="16" fill="#FEF08A" opacity="0.6" className="animate-ping" />
                <circle r="8" fill="#F9D024" stroke="#111827" strokeWidth="2.5" />
                <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="900" fill="#111827">PICKUP</text>
              </g>

              {/* Drop Point Node */}
              <g transform="translate(350, 65)">
                <circle r="14" fill="#111827" opacity="0.15" className="animate-ping" />
                <circle r="8" fill="#111827" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="22" textAnchor="middle" fontSize="10" fontWeight="900" fill="#111827">DROP</text>
              </g>

              {/* Nearby Simulated Captain Ping Nodes */}
              <g transform="translate(130, 80)">
                <circle r="4" fill="#10B981" />
                <circle r="9" fill="none" stroke="#10B981" opacity="0.6" className="animate-ping" />
              </g>
              <g transform="translate(260, 135)">
                <circle r="4" fill="#10B981" />
                <circle r="9" fill="none" stroke="#10B981" opacity="0.6" className="animate-ping" />
              </g>
              <g transform="translate(285, 45)">
                <circle r="4" fill="#10B981" />
                <circle r="9" fill="none" stroke="#10B981" opacity="0.6" className="animate-ping" />
              </g>
            </svg>

            {/* Traveling Vehicle on the Map */}
            <motion.div
              animate={{
                x: [-125, -20, 40, 120, -125],
                y: [15, -40, 5, -35, 15],
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute z-20 pointer-events-none"
            >
              <div className="relative">
                <span className="animate-ping absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
                <div className="w-11 h-11 rounded-2xl bg-[#FEF9C3] border-2 border-[#F9D024] shadow-lg flex items-center justify-center p-1.5 backdrop-blur-sm">
                  <img
                    src={
                      vehicleType === 'Bike'
                        ? '/images/fleet/bike-cutout.png'
                        : vehicleType === 'Auto'
                        ? '/images/fleet/auto-cutout.png'
                        : vehicleType === 'Sputo SUV'
                        ? '/images/fleet/suv-innova.png'
                        : '/images/fleet/priority-cab.png'
                    }
                    alt={vehicleType}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Telemetry Footer Info */}
          <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#FEF9C3] flex items-center justify-center border border-yellow-300 shrink-0">
                <Navigation className="w-4 h-4 text-obsidian animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-500">
                  Calibrated Route Telemetry
                </p>
                <p className="text-xs font-black text-obsidian truncate">
                  {pickup && drop
                    ? `${pickup.address.split(',')[0]} ➔ ${drop.address.split(',')[0]}`
                    : 'Connecting high-precision satellite route engine...'}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                ₹0 SURGE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Map Controls HUD */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Left: Nearby Captains Beacon Pill */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-black text-obsidian tracking-wider">
            {nearbyCount} Captains Nearby
          </span>
        </div>

        {/* Right: Map Action Buttons (Traffic, Satellite, Fit) */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Traffic Toggle */}
          <button
            type="button"
            onClick={handleToggleTraffic}
            title="Toggle Live Traffic Congestion"
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm border ${
              isTrafficActive
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-white/95 text-stone-800 hover:bg-stone-100 border-stone-200'
            }`}
          >
            🚦 {isTrafficActive ? 'Traffic ON' : 'Traffic'}
          </button>

          {/* Satellite Mode Switcher */}
          <button
            type="button"
            onClick={handleToggleMapMode}
            title="Toggle Satellite Imagery"
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm border ${
              mapMode === 'satellite'
                ? 'bg-[#F9D024] text-obsidian border-yellow-400 font-black'
                : 'bg-white/95 text-stone-800 hover:bg-stone-100 border-stone-200'
            }`}
          >
            🛰️ {mapMode === 'satellite' ? 'Satellite' : 'Map'}
          </button>

          {/* Recenter / Fit Button */}
          {pickup && (
            <button
              type="button"
              onClick={handleFitRoute}
              title="Recenter and Fit Route Bounds"
              className="p-1.5 rounded-full bg-white/95 text-obsidian hover:bg-[#FEF9C3] border border-stone-200 shadow-sm transition hover:scale-105"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Driver Speed Telemetry Badge (During Active Dispatch) */}
      {driverLocation && (
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#F9D024] text-obsidian backdrop-blur-md px-4 py-2 rounded-2xl border border-yellow-400 shadow-rapido">
          <Navigation className="w-4 h-4 fill-obsidian animate-bounce" />
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-wider text-obsidian/75">
              Live Telemetry
            </p>
            <p className="text-xs font-black">
              Captain Moving at {driverLocation.speed || 28} km/h
            </p>
          </div>
        </div>
      )}

      {/* Bottom Right Route Summary Pill */}
      {pickup && drop && (
        <div className="absolute bottom-4 right-4 z-10 bg-stone-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold border border-stone-800 shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F9D024] animate-pulse" />
          <span>Verified GPS Navigation</span>
        </div>
      )}
    </div>
  );
}
