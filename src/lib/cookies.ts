import Cookies from 'js-cookie';

interface UserSettings {
  theme?: 'light' | 'dark';
  currency?: 'GBP' | 'USD' | 'EUR';
  searchHistory?: string[];
  recentlyViewed?: string[];
  filters?: {
    priceRange?: [number, number];
    bedrooms?: number;
    propertyType?: string;
    leaseType?: string;
    fixerUpperOnly?: boolean;
  };
}

const COOKIE_NAME = 'vge_settings';
const COOKIE_EXPIRY = 365; // Days

export function saveUserSettings(settings: Partial<UserSettings>) {
  const currentSettings = getUserSettings();
  const newSettings = { ...currentSettings, ...settings };
  Cookies.set(COOKIE_NAME, JSON.stringify(newSettings), { expires: COOKIE_EXPIRY });
}

export function getUserSettings(): UserSettings {
  const settings = Cookies.get(COOKIE_NAME);
  return settings ? JSON.parse(settings) : {};
}

export function addToRecentlyViewed(propertyId: string) {
  const settings = getUserSettings();
  const recentlyViewed = settings.recentlyViewed || [];
  
  // Remove if exists and add to front
  const newRecentlyViewed = [
    propertyId,
    ...recentlyViewed.filter(id => id !== propertyId)
  ].slice(0, 10); // Keep last 10

  saveUserSettings({ recentlyViewed: newRecentlyViewed });
}

export function addToSearchHistory(location: string) {
  const settings = getUserSettings();
  const searchHistory = settings.searchHistory || [];
  
  // Remove if exists and add to front
  const newSearchHistory = [
    location,
    ...searchHistory.filter(l => l !== location)
  ].slice(0, 5); // Keep last 5

  saveUserSettings({ searchHistory: newSearchHistory });
}

export function saveFilters(filters: UserSettings['filters']) {
  const settings = getUserSettings();
  saveUserSettings({ filters: { ...settings.filters, ...filters } });
}

export function clearUserSettings() {
  Cookies.remove(COOKIE_NAME);
}