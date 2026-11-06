// Global Google Maps ambient types
declare global {
  namespace google {
    namespace maps {
      interface MapOptions {
        center?: { lat: number; lng: number };
        zoom?: number;
        styles?: any[];
        disableDefaultUI?: boolean;
        zoomControl?: boolean;
        gestureHandling?: string;
      }

      type MapTypeStyle = any;

      class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions);
        panTo(latLng: { lat: number; lng: number } | any): void;
        fitBounds(bounds: LatLngBounds | any, padding?: number): void;
        setMapTypeId(type: string): void;
        setOptions(options: MapOptions): void;
        addListener(eventName: string, handler: (...args: any[]) => void): void;
      }

      class TrafficLayer {
        constructor();
        setMap(map: Map | null): void;
      }

      class Marker {
        constructor(opts?: any);
        setPosition(latLng: { lat: number; lng: number } | any): void;
        getPosition(): any;
        setIcon(icon: any): void;
        setMap(map: Map | null): void;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class Point {
        constructor(x: number, y: number);
      }

      class LatLngBounds {
        constructor();
        extend(point: any): void;
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class DirectionsRenderer {
        constructor(opts?: any);
        setDirections(result: any): void;
      }

      class DirectionsService {
        constructor();
        route(request: any, callback: (result: any, status: string) => void): void;
      }

      class Geocoder {
        constructor();
        geocode(request: any, callback: (results: any[], status: string) => void): void;
      }

      enum TravelMode {
        DRIVING = 'DRIVING',
        TRANSIT = 'TRANSIT',
        WALKING = 'WALKING',
        BICYCLING = 'BICYCLING'
      }

      enum DirectionsStatus {
        OK = 'OK',
        NOT_FOUND = 'NOT_FOUND',
        ZERO_RESULTS = 'ZERO_RESULTS'
      }

      namespace SymbolPath {
        const CIRCLE: any;
        const FORWARD_CLOSED_ARROW: any;
        const BACKWARD_CLOSED_ARROW: any;
      }

      namespace places {
        class Autocomplete {
          constructor(inputField: HTMLInputElement, opts?: any);
          addListener(eventName: string, handler: () => void): void;
          getPlace(): any;
        }

        class AutocompleteService {
          constructor();
          getPlacePredictions(
            request: any,
            callback: (predictions: any[] | null, status: string) => void
          ): void;
        }

        enum PlacesServiceStatus {
          OK = 'OK',
          ZERO_RESULTS = 'ZERO_RESULTS',
          OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
          REQUEST_DENIED = 'REQUEST_DENIED',
          INVALID_REQUEST = 'INVALID_REQUEST'
        }
      }
    }
  }

  interface Window {
    google?: typeof google;
  }
}

export {};

