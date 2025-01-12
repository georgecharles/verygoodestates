import axios from 'axios';
import { propertyDataCache } from './cache';

const POSTCODES_API = 'https://api.postcodes.io/postcodes';

export const ukLocations = [
  // Major Cities
  "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Glasgow", "Edinburgh",
  "Bristol", "Cardiff", "Newcastle upon Tyne", "Sheffield", "Belfast", "Nottingham",
  "Southampton", "Portsmouth", "Oxford", "Cambridge", "York", "Brighton", "Leicester",
  
  // Additional Cities
  "Aberdeen", "Bath", "Bournemouth", "Bradford", "Canterbury", "Carlisle", "Chester",
  "Chichester", "Colchester", "Coventry", "Derby", "Durham", "Exeter", "Gloucester",
  "Hull", "Ipswich", "Lancaster", "Lincoln", "Norwich", "Peterborough", "Plymouth",
  "Preston", "Reading", "Salford", "Salisbury", "Stoke-on-Trent", "Sunderland",
  "Swansea", "Wakefield", "Winchester", "Wolverhampton", "Worcester",
  
  // London Areas
  "Mayfair", "Knightsbridge", "Chelsea", "Kensington", "Notting Hill", "Richmond",
  "Hampstead", "Islington", "Shoreditch", "Canary Wharf", "Greenwich", "Wimbledon",
  "Fulham", "Clapham", "Battersea", "Camden", "Hackney", "Brixton"
];

interface PostcodeResult {
  postcode: string;
  latitude: number;
  longitude: number;
  admin_district: string;
}

export async function searchPostcode(postcode: string): Promise<PostcodeResult | null> {
  const cacheKey = `postcode-${postcode}`;
  const cached = propertyDataCache.get(cacheKey) as PostcodeResult | null;
  if (cached) {
    return cached;
  }

  try {
    const response = await axios.get(`${POSTCODES_API}/${encodeURIComponent(postcode)}`);
    if (response.data.status === 200) {
      const result = {
        postcode: response.data.result.postcode,
        latitude: response.data.result.latitude,
        longitude: response.data.result.longitude,
        admin_district: response.data.result.admin_district
      };
      propertyDataCache.set(cacheKey, result);
      return result;
    }
    return null;
  } catch (error) {
    console.error('Error fetching postcode data:', error);
    return null;
  }
}

export async function autocompletePostcode(query: string): Promise<string[]> {
  if (query.length < 2) return [];

  const cacheKey = `postcode-autocomplete-${query.toLowerCase()}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${POSTCODES_API}/postcodes/${encodeURIComponent(query)}/autocomplete`);
    if (response.data.status === 200) {
      propertyDataCache.set(cacheKey, response.data.result || []);
      return response.data.result || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching postcode suggestions:', error);
    return [];
  }
}

export async function searchLocations(query: string): Promise<string[]> {
  try {
    const trimmedQuery = query.trim();
    
    try {
      // Check if it looks like a postcode
      if (/^[A-Z0-9]{2,4}\s?[0-9][A-Z]{2}$/i.test(trimmedQuery)) {
        const suggestions = await autocompletePostcode(trimmedQuery);
        return suggestions;
      }
    } catch (error) {
      // Silently handle postcode API errors and fall back to location search
    }
    
    // Search locations
    const matchingLocations = ukLocations.filter(location =>
      location.toLowerCase().includes(trimmedQuery.toLowerCase()));
    
    return matchingLocations;
  } catch (error) {
    // Avoid logging non-clonable errors
    console.error('Error searching locations');
    return [];
  }
}