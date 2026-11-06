import React from 'react';

interface SputoLogoIconProps {
  className?: string;
  roadColor?: string;
  stripeColor?: string;
}

/**
 * Sputo 'S' Highway Monogram:
 * A bold, modern letter 'S' sculpted like an aerodynamic curving highway
 * with a high-contrast center lane divider stripe.
 */
export default function SputoLogoIcon({
  className = "w-6 h-6",
  roadColor = "currentColor",
  stripeColor = "#F9D024",
}: SputoLogoIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sputo Road Monogram"
    >
      {/* Outer Asphalt Highway Track */}
      <path
        d="M18.8 6.5C18.8 4.6 17.1 3.2 15 3.2H9C6.2 3.2 4 5.4 4 8.2C4 11 6.2 12.2 9 12.2H15C17.8 12.2 20 13.4 20 16.2C20 19 17.8 21.2 15 21.2H8.5C6.4 21.2 4.8 19.7 4.8 17.8"
        stroke={roadColor}
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Dashed Highway Lane Divider */}
      <path
        d="M18.8 6.5C18.8 4.6 17.1 3.2 15 3.2H9C6.2 3.2 4 5.4 4 8.2C4 11 6.2 12.2 9 12.2H15C17.8 12.2 20 13.4 20 16.2C20 19 17.8 21.2 15 21.2H8.5C6.4 21.2 4.8 19.7 4.8 17.8"
        stroke={stripeColor}
        strokeWidth="1.2"
        strokeDasharray="2.2 2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

