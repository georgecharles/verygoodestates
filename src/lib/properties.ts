import { propertyDataCache } from './cache';
import { generateMockProperties } from './mockData';

export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  pricePerSqft: number;
  predictedValue: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  isFixerUpper: boolean;
  imageUrl: string;
  leaseType: 'freehold' | 'leasehold' | 'share of freehold';
  leaseYears?: number;
  analysis: {
    confidence: number;
    structuralIssues: boolean;
    outdatedInterior: boolean;
    exteriorDamage: boolean;
    marketTrends: {
      priceGrowth: number;
      demandScore: number;
      investmentRating: number;
    };
  };
}

export interface PropertySearchParams {
  location: string;
  page: number;
  sortBy: 'price_asc' | 'price_desc' | 'newest';
  pageSize?: number;
}

export async function fetchProperties({ 
  location, 
  page = 1, 
  sortBy = 'price_asc',
  pageSize = 9 
}: PropertySearchParams): Promise<{ properties: Property[]; hasMore: boolean }> {
  if (!location) return { properties: [], hasMore: false };

  try {
    const cacheKey = `${location}-${page}-${sortBy}`;
    const cached = propertyDataCache.get(cacheKey);
    if (cached) return cached;

    // Generate mock properties instead of using Patma API
    const properties = generateMockProperties(pageSize);
    
    // Sort properties
    const sortedProperties = sortProperties(properties, sortBy);

    // Paginate results
    const start = (page - 1) * pageSize;
    const paginatedProperties = sortedProperties.slice(start, start + pageSize);

    const result = { 
      properties: paginatedProperties, 
      hasMore: start + pageSize < sortedProperties.length 
    };
    
    propertyDataCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching properties:', error instanceof Error ? error.message : 'Unknown error');
    return { properties: [], hasMore: false };
  }
}

function sortProperties(properties: Property[], sortBy: string): Property[] {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });
}