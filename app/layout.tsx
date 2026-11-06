import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'SPUTO — Traffic Ka Chakkar Chhodo, Sputo Pakdo | Quick Bike Taxi, Auto & Cabs',
  description: 'Beat city traffic with Sputo. Real-time server-quoted pricing for Bike Taxi, Auto & Cabs with verified Captains, ₹0 surge, and instant 4-digit start OTP.',
  keywords: ['ride booking', 'sputo', 'rapido bike taxi', 'cab booking', 'auto rickshaw', 'sputo app'],
  authors: [{ name: 'Sputo Bharat' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F9D024',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCg9fShNFTiJMIREhwBggb1vlvh8cuuQCI";

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places,geometry`}
          async
          defer
        />
      </head>
      <body className="bg-[#FAF9F5] text-obsidian min-h-screen antialiased selection:bg-[#F9D024] selection:text-black">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
