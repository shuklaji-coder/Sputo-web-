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
  // Delhi NCR
  {
    address: "Cyber City, DLF Phase 2, Gurugram, Delhi NCR",
    latitude: 28.4950,
    longitude: 77.0895,
  },
  {
    address: "Connaught Place (CP), Inner Circle, New Delhi",
    latitude: 28.6315,
    longitude: 77.2167,
  },
  {
    address: "Indira Gandhi International Airport (T3), New Delhi",
    latitude: 28.5562,
    longitude: 77.1000,
  },
  {
    address: "Sector 18, Atta Market, Noida, Uttar Pradesh",
    latitude: 28.5708,
    longitude: 77.3260,
  },
  {
    address: "Hauz Khas Village, New Delhi",
    latitude: 28.5535,
    longitude: 77.1945,
  },
  // Bengaluru Hubs
  {
    address: "Indiranagar 100 Feet Road, Bengaluru",
    latitude: 12.9784,
    longitude: 77.6408,
  },
  {
    address: "Koramangala 5th Block, Sony World Signal, Bengaluru",
    latitude: 12.9352,
    longitude: 77.6245,
  },
  {
    address: "Whitefield, ITPL Main Road, Bengaluru",
    latitude: 12.9855,
    longitude: 77.7317,
  },
  {
    address: "Kempegowda International Airport (BLR), Devanahalli, Bengaluru",
    latitude: 13.1986,
    longitude: 77.7066,
  },
  {
    address: "MG Road, Brigade Road Junction, Bengaluru",
    latitude: 12.9756,
    longitude: 77.6066,
  },
  // Pune Hubs
  {
    address: "Hinjewadi IT Park, Phase 1, Pune",
    latitude: 18.5913,
    longitude: 73.7389,
  },
  {
    address: "Koregaon Park, North Main Road, Pune",
    latitude: 18.5362,
    longitude: 73.8939,
  },
  {
    address: "Viman Nagar, Phoenix Marketcity, Pune",
    latitude: 18.5626,
    longitude: 73.9168,
  },
  // Hyderabad Hubs
  {
    address: "HITEC City, Cyber Towers, Madhapur, Hyderabad",
    latitude: 17.4504,
    longitude: 78.3808,
  },
  {
    address: "Gachibowli, Financial District, Hyderabad",
    latitude: 17.4401,
    longitude: 78.3489,
  },
  {
    address: "Rajiv Gandhi International Airport (RGIA), Shamshabad, Hyderabad",
    latitude: 17.2403,
    longitude: 78.4294,
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

