import { LocationPoint, DriverDetails } from './types';

export const POPULAR_LOCATIONS: LocationPoint[] = [
  // Mumbai Hubs
  {
    address: "Bandra Kurla Complex (BKC), G Block, Mumbai",
    latitude: 19.0657,
    longitude: 72.8687,
  },
  {
    address: "Chhatrapati Shivaji Maharaj Intl Airport (T2), Mumbai",
    latitude: 19.0896,
    longitude: 72.8656,
  },
  {
    address: "Chhatrapati Shivaji Terminus (CSMT), Fort, Mumbai",
    latitude: 18.9401,
    longitude: 72.8354,
  },
  {
    address: "Dadar Railway Station, West, Mumbai",
    latitude: 19.0178,
    longitude: 72.8478,
  },
  {
    address: "Andheri West, Link Road, Mumbai",
    latitude: 19.1363,
    longitude: 72.8277,
  },
  {
    address: "Nariman Point Business District, South Mumbai",
    latitude: 18.9256,
    longitude: 72.8242,
  },
  {
    address: "Hiranandani Gardens, Central Avenue, Powai, Mumbai",
    latitude: 19.1197,
    longitude: 72.9051,
  },
  {
    address: "Juhu Tara Road, Near Hotel Sea Princess, Juhu, Mumbai",
    latitude: 19.0988,
    longitude: 72.8267,
  },
  {
    address: "Thane West, Viviana Mall, Eastern Express Highway",
    latitude: 19.2089,
    longitude: 72.9712,
  },
  {
    address: "Vashi Sector 17, Navi Mumbai",
    latitude: 19.0771,
    longitude: 72.9986,
  },
  {
    address: "Borivali West, Shimpoli Road, Mumbai",
    latitude: 19.2307,
    longitude: 72.8567,
  },
  {
    address: "Lower Parel, High Street Phoenix / Palladium, Mumbai",
    latitude: 18.9950,
    longitude: 72.8258,
  },
  {
    address: "Ghatkopar West, R City Mall & Metro, Mumbai",
    latitude: 19.0998,
    longitude: 72.9163,
  },
  {
    address: "Malad West, Inorbit Mall, Link Road, Mumbai",
    latitude: 19.1868,
    longitude: 72.8347,
  },
  {
    address: "CBD Belapur, Sector 11, Navi Mumbai",
    latitude: 19.0182,
    longitude: 73.0400,
  },
  {
    address: "Goregaon East, NESCO IT Park, WEH, Mumbai",
    latitude: 19.1551,
    longitude: 72.8550,
  },
  {
    address: "Kharghar, Central Park / Hiranandani, Navi Mumbai",
    latitude: 19.0473,
    longitude: 73.0699,
  },
];

export const MOCK_CAPTAINS: Record<string, DriverDetails> = {
  Bike: {
    id: "capt_bike_901",
    name: "Captain Aarav Solanki",
    phone: "+91 98201 44892",
    rating: 4.94,
    totalTrips: 1820,
    vehiclePlate: "MH 01 BZ 4040",
    vehicleModel: "Royal Enfield Hunter 350 (Matte Emerald)",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    badge: "Gold Wing Elite"
  },
  Auto: {
    id: "capt_auto_412",
    name: "Captain Imran Mansuri",
    phone: "+91 98190 22314",
    rating: 4.91,
    totalTrips: 3410,
    vehiclePlate: "MH 03 CG 7712",
    vehicleModel: "Bajaj RE Maxima (Royal Mint Green)",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    badge: "Master Navigator"
  },
  "Royale Cab": {
    id: "capt_cab_789",
    name: "Captain Vikramaditya Rathore",
    phone: "+91 98209 77890",
    rating: 4.98,
    totalTrips: 4230,
    vehiclePlate: "MH 02 ER 8829",
    vehicleModel: "Chilled AC Honda City ZX (Pearl White)",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    badge: "Royale Concierge Captain"
  },
  "Sputo SUV": {
    id: "capt_suv_555",
    name: "Captain Harish Choudhary",
    phone: "+91 98334 11209",
    rating: 4.96,
    totalTrips: 3890,
    vehiclePlate: "MH 02 DX 7007",
    vehicleModel: "Toyota Innova Crysta ZX 7-Seater (Emerald)",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80",
    badge: "Executive Fleet Master"
  }
};

// Calculate Haversine distance in KM
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.max(1.2, Math.round(d * 10) / 10);
}

