import axios from 'axios';
import { propertyDataCache } from './cache';

const PATMA_API_KEY = '7f7659b9659c2a3d7945b859bab7036efd0ce865';
const PATMA_API_URL = 'https://app.patma.co.uk/api/v1';

export async function searchProperties(location: string) {
  const cacheKey = `patma-${location}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${PATMA_API_URL}/properties/search`, {
      params: { location },
      headers: { 'X-API-Key': PATMA_API_KEY }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Patma:', error);
    return null;
  }
}

export async function getPropertyDetails(id: string) {
  const cacheKey = `patma-property-${id}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${PATMA_API_URL}/properties/${id}`, {
      headers: { 'X-API-Key': PATMA_API_KEY }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    return null;
  }
}