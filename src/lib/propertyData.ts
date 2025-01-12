import axios from 'axios';
import { propertyDataCache } from './cache';

const API_KEY = 'your-propertydata-api-key';
const BASE_URL = 'https://api.propertydata.co.uk/v1';

interface DevelopmentCalculation {
  purchasePrice: number;
  renovationCost: number;
  otherCosts: number;
  expectedSalePrice: number;
}

interface GDVParams {
  postcode: string;
  squareFeet: number;
  propertyType: string;
  condition: string;
}

export async function calculateDevelopment(params: DevelopmentCalculation) {
  const cacheKey = `dev-calc-${JSON.stringify(params)}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/development-calculator`, {
      params: {
        key: API_KEY,
        ...params
      }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error calculating development:', error);
    return null;
  }
}

export async function calculateGDV(params: GDVParams) {
  const cacheKey = `gdv-${JSON.stringify(params)}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/development-gdv`, {
      params: {
        key: API_KEY,
        ...params
      }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error calculating GDV:', error);
    return null;
  }
}

export async function getFloodRisk(postcode: string) {
  const cacheKey = `flood-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/flood-risk`, {
      params: {
        key: API_KEY,
        postcode
      }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting flood risk:', error);
    return null;
  }
}

export async function getGrowthForecast(postcode: string) {
  const cacheKey = `growth-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/growth`, {
      params: {
        key: API_KEY,
        postcode
      }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting growth forecast:', error);
    return null;
  }
}

export async function getHouseholdIncome(postcode: string) {
  const cacheKey = `income-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/household-income`, {
      params: {
        key: API_KEY,
        postcode
      }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting household income:', error);
    return null;
  }
}

export async function getPropertyInfo(postcode: string) {
  const cacheKey = `info-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/property-info`, {
      params: {
        key: API_KEY,
        postcode
      }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting property info:', error);
    return null;
  }
}

export async function getHMORents(postcode: string) {
  const cacheKey = `hmo-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/rents-hmo`, {
      params: {
        key: API_KEY,
        postcode
      }
    });

    propertyDataCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting HMO rents:', error);
    return null;
  }
}