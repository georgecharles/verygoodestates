import { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  userLocation: { lat: number; lng: number } | null;
  isLoading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType>({
  userLocation: null,
  isLoading: true,
  error: null
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, isLoading, error }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);