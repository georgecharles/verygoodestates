interface MarketData {
  averagePrice: number;
  priceGrowth: number;
  demandScore: number;
  investmentRating: number;
}

interface NeighborhoodStats {
  crimeRate: number;
  schoolRating: number;
  transportScore: number;
  amenityScore: number;
}

const MARKET_DATA: Record<string, MarketData> = {
  "London": {
    averagePrice: 750000,
    priceGrowth: 5.2,
    demandScore: 8.5,
    investmentRating: 9
  },
  "Manchester": {
    averagePrice: 350000,
    priceGrowth: 6.8,
    demandScore: 9.0,
    investmentRating: 8.5
  },
  // Add more cities as needed
};

const NEIGHBORHOOD_STATS: Record<string, NeighborhoodStats> = {
  "London": {
    crimeRate: 2.5,
    schoolRating: 8.5,
    transportScore: 9.0,
    amenityScore: 9.5
  },
  "Manchester": {
    crimeRate: 3.0,
    schoolRating: 8.0,
    transportScore: 8.5,
    amenityScore: 8.0
  },
  // Add more cities as needed
};

export function getMarketData(location: string): MarketData {
  return (
    MARKET_DATA[location] || {
      averagePrice: 500000,
      priceGrowth: 5.0,
      demandScore: 7.0,
      investmentRating: 7.5,
    }
  );
}

export function getNeighborhoodStats(location: string): NeighborhoodStats {
  return (
    NEIGHBORHOOD_STATS[location] || {
      crimeRate: 3.0,
      schoolRating: 7.5,
      transportScore: 7.0,
      amenityScore: 7.0,
    }
  );
}