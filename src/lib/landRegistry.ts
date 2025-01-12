import axios from 'axios';
import { propertyDataCache } from './cache';

const BASE_URL = 'https://landregistry.data.gov.uk/data/ppi';

interface LandRegistryPrice {
  amount: number;
  date: string;
  transactionId: string;
}

interface PropertyHistory {
  prices: LandRegistryPrice[];
  averagePrice: number;
  priceChange: number;
}

export async function getPropertyHistory(postcode: string): Promise<PropertyHistory> {
  const cacheKey = `land-registry-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    // SPARQL query to get property prices in the postcode area
    const query = `
      PREFIX lrppi: <http://landregistry.data.gov.uk/def/ppi/>
      PREFIX lrcommon: <http://landregistry.data.gov.uk/def/common/>
      
      SELECT ?amount ?date ?transactionId
      WHERE {
        ?transaction lrppi:propertyAddress ?address ;
                    lrppi:pricePaid ?amount ;
                    lrppi:transactionDate ?date ;
                    lrppi:transactionId ?transactionId .
        ?address lrcommon:postcode "${postcode}" .
      }
      ORDER BY DESC(?date)
      LIMIT 100
    `;

    const response = await axios.get(`${BASE_URL}/query`, {
      params: {
        output: 'json',
        query: encodeURIComponent(query)
      }
    });

    const prices = response.data.results.bindings.map((result: any) => ({
      amount: parseFloat(result.amount.value),
      date: result.date.value,
      transactionId: result.transactionId.value
    }));

    // Calculate statistics
    const averagePrice = prices.reduce((sum, price) => sum + price.amount, 0) / prices.length;
    const oldestPrice = prices[prices.length - 1]?.amount;
    const newestPrice = prices[0]?.amount;
    const priceChange = oldestPrice ? ((newestPrice - oldestPrice) / oldestPrice) * 100 : 0;

    const result = {
      prices,
      averagePrice,
      priceChange
    };

    propertyDataCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching land registry data:', error);
    return {
      prices: [],
      averagePrice: 0,
      priceChange: 0
    };
  }
}

export async function getAreaPrices(postcode: string): Promise<{
  averagePrice: number;
  medianPrice: number;
  transactions: number;
}> {
  const cacheKey = `land-registry-area-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    // SPARQL query to get area statistics
    const query = `
      PREFIX lrppi: <http://landregistry.data.gov.uk/def/ppi/>
      PREFIX lrcommon: <http://landregistry.data.gov.uk/def/common/>
      
      SELECT (AVG(?amount) AS ?averagePrice) (COUNT(?transaction) AS ?transactions)
      WHERE {
        ?transaction lrppi:propertyAddress ?address ;
                    lrppi:pricePaid ?amount ;
                    lrppi:transactionDate ?date .
        ?address lrcommon:postcode ?postcode .
        FILTER(REGEX(?postcode, "^${postcode.split(' ')[0]}"))
        FILTER(?date >= "${new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}"^^xsd:date)
      }
    `;

    const response = await axios.get(`${BASE_URL}/query`, {
      params: {
        output: 'json',
        query: encodeURIComponent(query)
      }
    });

    const result = {
      averagePrice: parseFloat(response.data.results.bindings[0].averagePrice.value),
      medianPrice: 0, // Calculated from a separate query if needed
      transactions: parseInt(response.data.results.bindings[0].transactions.value)
    };

    propertyDataCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching area prices:', error);
    return {
      averagePrice: 0,
      medianPrice: 0,
      transactions: 0
    };
  }
}