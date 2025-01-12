import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchLocations, searchPostcode } from "@/lib/locations";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface LocationSearchProps {
  onSearch: (location: string, coordinates?: { lat: number; lng: number }, radius?: number) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [radius, setRadius] = React.useState([5]); // Default 5 mile radius
  const suggestionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchLocations = async () => {
      if (value.length >= 1) {
        const results = await searchLocations(value);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    const timer = setTimeout(fetchLocations, 300);
    return () => clearTimeout(timer);
  }, [value]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      // Check if it's a postcode
      const postcodeResult = await searchPostcode(value);
      if (postcodeResult) {
        onSearch(value, {
          lat: postcodeResult.latitude,
          lng: postcodeResult.longitude
        }, radius[0]);
      } else {
        onSearch(value, undefined, radius[0]);
      }
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-lg">
          <Search className="text-gold-400 w-6 h-6 ml-2" />
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter location or postcode..."
            className="flex-1 border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0"
          />
          <Button 
            type="submit"
            className="bg-white text-navy-950 hover:bg-gold-500"
          >
            Search
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
          <Label className="text-white mb-2 block">Search Radius: {radius[0]} miles</Label>
          <Slider
            value={radius}
            onValueChange={setRadius}
            max={50}
            min={1}
            step={1}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>1 mile</span>
            <span>50 miles</span>
          </div>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute w-full mt-2 bg-navy-800 border border-gold-500/20 rounded-lg shadow-lg overflow-hidden z-50"
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="w-full px-4 py-2 text-left text-white hover:bg-gold-500/20 transition-colors"
              onClick={async () => {
                setValue(suggestion);
                const postcodeResult = await searchPostcode(suggestion);
                if (postcodeResult) {
                  onSearch(suggestion, {
                    lat: postcodeResult.latitude,
                    lng: postcodeResult.longitude
                  }, radius[0]);
                } else {
                  onSearch(suggestion, undefined, radius[0]);
                }
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}