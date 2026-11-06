export interface LocationPoint {
  address: string;
  latitude: number;
  longitude: number;
}

export type VehicleCategory = 'Bike' | 'Auto' | 'Royale Cab' | 'Priority Cab' | 'Sputo SUV';

export interface VehicleOption {
  id: string;
  name: string;
  category: VehicleCategory;
  tag: string;
  description: string;
  fare: number;
  originalFare?: number;
  etaMin: number;
  capacity: number;
  ac: boolean;
  icon: string;
  features: string[];
}

export interface QuoteData {
  quoteId: string;
  pickup: LocationPoint;
  drop: LocationPoint;
  distanceKm: number;
  durationMin: number;
  vehicles: VehicleOption[];
}

export interface DriverDetails {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalTrips: number;
  vehiclePlate: string;
  vehicleModel: string;
  photoUrl: string;
  badge: string;
}

export interface DriverLocation {
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  updatedAt?: any;
}

export interface RideData {
  id: string;
  pickup: LocationPoint;
  drop: LocationPoint;
  vehicleType: VehicleCategory;
  paymentMethod: 'cash' | 'upi';
  fare: number;
  distanceKm: number;
  durationMin: number;
  quoteId: string;
  status: 'requested' | 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
  otp: string;
  driverId?: string;
  driver?: DriverDetails;
  createdAt: any;
  acceptedAt?: any;
  completedAt?: any;
}

export interface CaptainApplication {
  fullName: string;
  phone: string;
  city: string;
  vehicleType: VehicleCategory;
  licenseNumber: string;
  vehicleNumber: string;
}

