// Add to existing types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  savedProperties: string[];
  preferences?: {
    location?: {
      address: string;
      postcode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
}

export interface PropertyLocation {
  coordinates: {
    lat: number;
    lng: number;
  };
  postcode: string;
  distance?: number;
  directionsUrl?: string;
}

// Update Property interface
export interface Property {
  // ... existing properties ...
  location: PropertyLocation;
}