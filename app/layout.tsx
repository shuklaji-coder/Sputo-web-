import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F9D024',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sputo.in'),
  title: {
    default: 'SPUTO — Traffic Ka Chakkar Chhodo, Sputo Pakdo | Quick Bike Taxi, Auto & Cabs',
    template: '%s | SPUTO Royale Mobility'
  },
  description: 'Beat city traffic with Sputo. Real-time server-enforced pricing for Bike Taxi, Auto & Cabs with verified Captains, ₹0 surge guarantee, 2-min priority dispatch, and instant 4-digit start OTP.',
  keywords: [
    'sputo',
    'sputo app',
    'sputo royale',
    'sputo bike taxi',
    'sputo cab booking',
    'sputo auto rickshaw',
    'rohan shukla sputo',
    'rohan shukla chaloji',
    'rapido alternative',
    'ola uber alternative',
    'zero surge cab',
    'mumbai cab booking',
    'pune bike taxi',
    'delhi ncr auto',
    'ride booking app india'
  ],
  authors: [{ name: 'Rohan Shukla', url: 'https://www.linkedin.com/in/rohan-shukla-0b8889321/' }],
  creator: 'Rohan Shukla',
  publisher: 'Sputo Royale Mobility Pvt Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://sputo.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sputo.in',
    title: 'SPUTO — Traffic Ka Chakkar Chhodo, Sputo Pakdo',
    description: 'India\'s honest ride-hailing app with ₹0 surge, 2-min priority dispatch & verified Captains. Book Bike Taxi, Auto & Cabs across India.',
    siteName: 'SPUTO Royale Mobility',
    images: [
      {
        url: '/images/sputo-fleet.jpg',
        width: 1200,
        height: 630,
        alt: 'Sputo Fleet - Bike Taxi, Auto, Royale Cab & SUV',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPUTO — Traffic Ka Chakkar Chhodo, Sputo Pakdo',
    description: 'Book Bike Taxi, Auto & Cabs with ₹0 Surge, 2-Min Pickup & Verified Captains.',
    images: ['/images/sputo-fleet.jpg'],
    creator: '@SputoBharat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/sputo-fleet.jpg',
    apple: '/images/sputo-fleet.jpg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCg9fShNFTiJMIREhwBggb1vlvh8cuuQCI";

  // JSON-LD Structured Data Schema for Google Knowledge Graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://sputo.in/#organization',
        name: 'Sputo Royale Mobility Pvt Ltd',
        url: 'https://sputo.in',
        logo: 'https://sputo.in/images/sputo-fleet.jpg',
        founder: {
          '@type': 'Person',
          name: 'Rohan Shukla',
          jobTitle: 'Founder & CEO',
          sameAs: 'https://www.linkedin.com/in/rohan-shukla-0b8889321/'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-80877-47774',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['Hindi', 'English', 'Marathi']
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sputo.in/#website',
        url: 'https://sputo.in',
        name: 'SPUTO',
        description: 'Traffic Ka Chakkar Chhodo, Sputo Pakdo. Quick Bike Taxi, Auto & Cabs across India.',
        publisher: { '@id': 'https://sputo.in/#organization' }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F9D024" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
