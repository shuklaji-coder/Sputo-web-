"use client";

import React, { useEffect, useRef, useState } from 'react';
import { LocationPoint } from '@/lib/types';
import { POPULAR_LOCATIONS } from '@/lib/mockData';
import { MapPin, Navigation, Search, X, Loader2 } from 'lucide-react';

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: LocationPoint | null;
  onChange: (point: LocationPoint | null) => void;
  iconType: 'pickup' | 'drop';
  disabled?: boolean;
}

interface PlaceSuggestion {
  mainText: string;
  secondaryText: string;
  placeId?: string;
  point?: LocationPoint;
}

export default function LocationInput({
  label,
  placeholder,
  value,
  onChange,
  iconType,
  disabled = false,
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState<string>(value ? value.address : '');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external value
  useEffect(() => {
    if (value) {
      setInputValue(value.address);
    } else {
      setInputValue('');
    }
  }, [value]);

  // Monitor when Google Maps Places is loaded
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.google?.maps?.places) {
      setGoogleLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        setGoogleLoaded(true);
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Fetch suggestions using Google Places AutocompleteService or fallback to mockData
  const fetchSuggestions = (query: string) => {
    if (!query || query.trim().length === 0) {
      // Default initial popular hubs
      const defaults: PlaceSuggestion[] = POPULAR_LOCATIONS.slice(0, 6).map((loc) => {
        const parts = loc.address.split(',');
        return {
          mainText: parts[0]?.trim() || loc.address,
          secondaryText: parts.slice(1).join(',').trim() || 'India',
          point: loc,
        };
      });
      setSuggestions(defaults);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // If Google Places API is active on window
    if (window.google?.maps?.places?.AutocompleteService) {
      try {
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          {
            input: query,
            componentRestrictions: { country: 'in' },
            types: ['geocode', 'establishment'],
          },
          (predictions: any[] | null, status: string) => {
            setIsLoading(false);
            if (
              status === window.google?.maps?.places?.PlacesServiceStatus?.OK &&
              predictions &&
              predictions.length > 0
            ) {
              const mapped: PlaceSuggestion[] = predictions.slice(0, 7).map((p: any) => ({
                mainText: p.structured_formatting?.main_text || p.description,
                secondaryText: p.structured_formatting?.secondary_text || '',
                placeId: p.place_id,
              }));
              setSuggestions(mapped);
            } else {
              // Fallback to local landmark search
              fallbackLocalSearch(query);
            }
          }
        );
        return;
      } catch (err) {
        console.warn('Google Places prediction fallback:', err);
      }
    }

    // Fallback if Google Places service not ready yet
    fallbackLocalSearch(query);
  };

  const fallbackLocalSearch = (query: string) => {
    setIsLoading(false);
    const qLower = query.toLowerCase();
    const filtered = POPULAR_LOCATIONS.filter((loc) =>
      loc.address.toLowerCase().includes(qLower)
    );

    const results: PlaceSuggestion[] = filtered.slice(0, 6).map((loc) => {
      const parts = loc.address.split(',');
      return {
        mainText: parts[0]?.trim() || loc.address,
        secondaryText: parts.slice(1).join(',').trim() || 'India',
        point: loc,
      };
    });

    // If still no matches, allow user to set custom location pin
    if (results.length === 0) {
      results.push({
        mainText: query,
        secondaryText: 'Select to set map pin here',
        point: {
          address: query,
          latitude: 19.0760 + (Math.random() - 0.5) * 0.05,
          longitude: 72.8777 + (Math.random() - 0.5) * 0.05,
        },
      });
    }

    setSuggestions(results);
  };

  // Handle typing with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    setIsOpen(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(text);
    }, 250);
  };

  // Handle Suggestion Selection
  const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
    setIsOpen(false);
    const fullText = suggestion.secondaryText
      ? `${suggestion.mainText}, ${suggestion.secondaryText}`
      : suggestion.mainText;

    setInputValue(fullText);

    // If point is already resolved
    if (suggestion.point) {
      onChange(suggestion.point);
      return;
    }

    // Resolve coordinates using Google Geocoder if placeId exists
    if (suggestion.placeId && window.google?.maps?.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId: suggestion.placeId }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          const point: LocationPoint = {
            address: results[0].formatted_address || fullText,
            latitude: loc.lat(),
            longitude: loc.lng(),
          };
          setInputValue(point.address);
          onChange(point);
        } else {
          // Fallback coordinate
          onChange({
            address: fullText,
            latitude: 19.0760,
            longitude: 72.8777,
          });
        }
      });
    } else {
      onChange({
        address: fullText,
        latitude: 19.0760,
        longitude: 72.8777,
      });
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Get User's Current GPS Location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (window.google?.maps?.Geocoder) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            setIsLocating(false);
            if (status === 'OK' && results && results[0]) {
              const point: LocationPoint = {
                address: results[0].formatted_address,
                latitude,
                longitude,
              };
              setInputValue(point.address);
              onChange(point);
            } else {
              const point: LocationPoint = {
                address: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
                latitude,
                longitude,
              };
              setInputValue(point.address);
              onChange(point);
            }
          });
        } else {
          setIsLocating(false);
          const point: LocationPoint = {
            address: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            latitude,
            longitude,
          };
          setInputValue(point.address);
          onChange(point);
        }
      },
      (error) => {
        setIsLocating(false);
        const defaultPoint = POPULAR_LOCATIONS[0];
        setInputValue(defaultPoint.address);
        onChange(defaultPoint);
      },
      { timeout: 8000 }
    );
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <label className="text-xs font-black uppercase tracking-wider text-stone-600">
          {label}
        </label>
        {iconType === 'pickup' && (
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={disabled || isLocating}
            className="flex items-center gap-1 text-[11px] font-bold text-obsidian hover:text-stone-700 transition-colors"
          >
            <Navigation
              className={`w-3 h-3 text-[#F9D024] fill-[#F9D024] stroke-obsidian ${
                isLocating ? 'animate-spin' : ''
              }`}
            />
            {isLocating ? 'Locating...' : 'Use Current GPS'}
          </button>
        )}
      </div>

      <div
        className={`relative flex items-center bg-white rounded-2xl border transition-all duration-200 ${
          isOpen
            ? 'border-yellow-400 ring-2 ring-yellow-400/30 shadow-md'
            : 'border-stone-300 hover:border-yellow-400'
        } ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <div className="pl-4 pr-2 flex items-center justify-center">
          {iconType === 'pickup' ? (
            <div className="w-7 h-7 rounded-full bg-[#FEF9C3] border border-yellow-400 flex items-center justify-center shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#FEF9C3] border border-yellow-400 flex items-center justify-center shadow-sm">
              <MapPin className="w-4 h-4 text-obsidian stroke-[2.5]" />
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            fetchSuggestions(inputValue);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full py-3.5 pr-10 text-sm font-bold text-obsidian placeholder:text-stone-400 bg-transparent outline-none"
        />

        {isLoading ? (
          <div className="absolute right-3 p-1">
            <Loader2 className="w-4 h-4 text-[#EAB308] animate-spin" />
          </div>
        ) : inputValue ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-obsidian hover:bg-stone-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      {/* Autocomplete Suggestions Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl border border-stone-200 shadow-rapido-card overflow-hidden max-h-72 overflow-y-auto"
        >
          <div className="px-4 py-2 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-black text-stone-600 uppercase tracking-wider">
              {inputValue ? 'Search Results' : 'Popular Landmarks & Hubs'}
            </span>
            <Search className="w-3.5 h-3.5 text-stone-400" />
          </div>

          <div className="py-1">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-[#FEF9C3]/60 transition-colors border-b border-stone-100 last:border-none group"
              >
                <div className="p-1.5 rounded-lg bg-stone-100 group-hover:bg-[#F9D024] transition-colors shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-obsidian stroke-[2.5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-obsidian truncate">
                    {item.mainText}
                  </p>
                  {item.secondaryText && (
                    <p className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                      {item.secondaryText}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
