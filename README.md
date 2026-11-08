# SPUTO ROYALE — Luxury Web Ride-Booking & Captain Dispatch Platform

A next-generation, high-performance Web Ride-Booking and Mobility Marketing Website for **Sputo** built with **Next.js 14, React 18, Tailwind CSS, and Firebase v10**, infused with **Rapido-inspired** high-converting UX architecture and a **Royal Sovereign Luxury Theme**.

---

## 🎨 1. Brand Design System (Luxury Theme)
- **Base Surfaces**: Champagne Pearl White (`#FDFBF7`), Crisp Card White (`#FFFFFF` with 85% opacity, `backdrop-blur 24px`)
- **Primary Brand Accent**: Deep Royal Emerald Green (`#064E3B`, `#10B981`) for CTAs, active route lines, and selected tabs
- **Royal Accents**: Champagne Gold (`#C9A86A`, `#E5C384`) for stars, badges, OTP chips, and borders
- **Text**: Obsidian Charcoal (`#0F172A`) for daylight outdoor legibility
- **Shadows**: Soft ambient floating shadows (`rgba(6, 78, 59, 0.08)`)

---

## ⚙️ 2. Exact Firebase Web Configuration (`lib/firebase.ts`)

```typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCxcvgBI9GiaUoHv1gisdt13uy-O_VdSwA",
  authDomain: "chalojii-79c99.firebaseapp.com",
  projectId: "chalojii-79c99",
  storageBucket: "chalojii-79c99.firebasestorage.app",
  messagingSenderId: "126168413815",
  appId: "1:126168413815:web:chaloji_web_app"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'asia-south1');
```

---

## 🛣️ 3. Core Backend & Booking Workflow

1. **Fare Estimation (Server-Enforced):**
   - User inputs Pickup & Drop locations (Google Places Autocomplete with API Key: `AIzaSyCg9fShNFTiJMIREhwBggb1vlvh8cuuQCI`).
   - Calls Firebase Cloud Function: `httpsCallable(functions, 'getRideQuote')` with `{ pickup, drop }`.
   - Real-time pricing for Bike, Auto, Royale Cab & Sputo SUV across Mumbai MMR.
   - 1-Tap Quick Route Presets (BKC ➔ Airport T2, Nariman Point ➔ BKC, Thane ➔ Vashi).

2. **User Authentication:**
   - Phone Number + OTP verification using `RecaptchaVerifier` and `signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)`.
   - 1-Click VIP Patron Quick Login for instant test verification.

3. **Ride Creation & Driver Dispatch:**
   - Calls Firebase Cloud Function: `httpsCallable(functions, 'createRide')` with payload:
     ```json
     {
       "pickup": { "address": "...", "latitude": 19.0178, "longitude": 72.8478 },
       "drop": { "address": "...", "latitude": 19.0657, "longitude": 72.8687 },
       "vehicleType": "Bike",
       "paymentMethod": "cash",
       "quoteId": "quote_123"
     }
     ```
   - Cloud Function creates the ride in `rides/{rideId}`, generates a 4-digit start OTP, and alerts nearby drivers on the `ChalojiDriver` mobile app.

4. **Real-time Live Tracking Listener (`onSnapshot`):**
   - Listen to `doc(db, 'rides', rideId)`:
     * `status === 'requested'`: Pulsing sonar radar animation ("Connecting with nearby captains...").
     * `status === 'accepted'`: Captain Card (Name, Phone, Rating 4.9★, Vehicle Plate) + Golden **Start OTP** chip!
     * Listen to `doc(db, 'driverLocations', driverId)`: Animate vehicle moving on Google Maps along the Deep Royal Emerald route.
     * `status === 'completed'`: Trip completion receipt with UPI QR code scan-and-pay & Cash option + 5-star rating.

---

## ⚡ 4. Rapido-Inspired 20-Year UI/UX Additions
- **Coverage**: Mumbai MMR Exclusive Live Launch (Island City, Western & Central Suburbs, Thane & Navi Mumbai).
- **Service Pillars**: Sputo Bike Taxi, Sputo Auto, Sputo Royale Cab, and Sputo SUV.
- **Interactive Captain Earnings Calculator**: Interactive slider (4 to 12 hrs/day) dynamically calculating daily & monthly potential revenue with instant 60s application modal.
- **Sputo for Business (Corporate Mobility)**: Centralized monthly GST invoices, postpaid credit lines, and team expense management.
- **Interactive FAQ Accordion**: Addresses passenger and captain questions.
- **App Download Section with Live QR Code Scanner**: Links to iOS & Android apps.

---

## 🚀 5. Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

