// Add to existing interfaces at the top
interface RenovationEstimate {
  totalCost: number;
  breakdown: {
    structural: number;
    interior: number;
    exterior: number;
  };
}

// Add to existing PropertyAnalysis interface
interface PropertyAnalysis {
  isFixerUpper: boolean;
  confidence: number;
  details: {
    structuralIssues: boolean;
    outdatedInterior: boolean;
    exteriorDamage: boolean;
    potentialValue: number;
    renovationEstimate: RenovationEstimate;
  };
}

// Add this function at the bottom
function calculateRenovationCosts(
  propertyPrice: number,
  analysis: {
    structuralIssues: boolean;
    outdatedInterior: boolean;
    exteriorDamage: boolean;
  }
): RenovationEstimate {
  const baseRate = propertyPrice * 0.15; // Base renovation rate is 15% of property value
  
  const structural = analysis.structuralIssues ? baseRate * 0.5 : 0;
  const interior = analysis.outdatedInterior ? baseRate * 0.3 : 0;
  const exterior = analysis.exteriorDamage ? baseRate * 0.2 : 0;
  
  return {
    totalCost: structural + interior + exterior,
    breakdown: {
      structural,
      interior,
      exterior
    }
  };
}

// Modify the analyzeProperty function to include renovation estimates
export async function analyzeProperty(
  imageUrls: string[],
  location: string,
  currentPrice: number
): Promise<PropertyAnalysis> {
  const imageAnalysis = await analyzeMultipleImages(imageUrls);
  const marketData = getMarketData(location);
  const neighborhoodStats = getNeighborhoodStats(location);

  const renovationEstimate = calculateRenovationCosts(currentPrice, imageAnalysis.details);

  return {
    ...imageAnalysis,
    details: {
      ...imageAnalysis.details,
      potentialValue: calculateMarketAdjustedPotentialValue(
        imageAnalysis.details.potentialValue,
        marketData,
        neighborhoodStats,
        currentPrice
      ),
      renovationEstimate
    },
  };
}