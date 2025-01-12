// Mock data constants
export const LOCATIONS = [
  "Mayfair",
  "Knightsbridge",
  "Chelsea",
  "Kensington",
  "Notting Hill",
  "Richmond",
  "Hampstead",
  "Islington",
  "Shoreditch",
  "Canary Wharf"
];

export const PROPERTY_TYPES = [
  "apartment",
  "house",
  "penthouse",
  "maisonette",
  "townhouse"
];

export const LEASE_TYPES = [
  "freehold",
  "leasehold",
  "share of freehold"
];

export const FEATURES = [
  "Underfloor Heating",
  "Private Garden",
  "Roof Terrace",
  "Concierge Service",
  "Parking Space",
  "Lift Access",
  "Period Features",
  "Smart Home System",
  "Air Conditioning",
  "High Ceilings",
  "Open-Plan Living",
  "Balcony"
];

// High-quality property images from Unsplash
export const PROPERTY_IMAGES = [
  [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
    "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
  ]
];

// Update the generateMockProperties function
export function generateMockProperties(count: number = 10) {
  return Array.from({ length: count }, (_, i) => {
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const propertyType = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
    const leaseType = LEASE_TYPES[Math.floor(Math.random() * LEASE_TYPES.length)];
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const bathrooms = Math.floor(Math.random() * bedrooms) + 1;
    const sqft = Math.floor(Math.random() * 3000) + 500;
    const basePrice = Math.floor(Math.random() * 4000000) + 500000;
    const pricePerSqft = Math.floor(basePrice / sqft);
    const isFixerUpper = Math.random() > 0.7;
    const growthRate = Math.floor(Math.random() * 8) + 3;
    const isMortgageable = Math.random() > 0.2;
    const renovationCosts = isFixerUpper ? {
      total: Math.floor(Math.random() * 100000) + 20000,
      structural: Math.floor(Math.random() * 50000) + 10000,
      interior: Math.floor(Math.random() * 30000) + 5000,
      exterior: Math.floor(Math.random() * 20000) + 5000
    } : null;

    // Generate mock coordinates near London
    const lat = 51.5074 + (Math.random() - 0.5) * 0.1;
    const lng = -0.1278 + (Math.random() - 0.5) * 0.1;

    return {
      id: i + 1,
      title: `${bedrooms} Bedroom ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} in ${location}`,
      address: `${Math.floor(Math.random() * 200) + 1} ${location}, London`,
      price: basePrice,
      pricePerSqft,
      predictedValue: Math.floor(basePrice * (1 + (growthRate / 100) * 5)),
      bedrooms,
      bathrooms,
      sqft,
      isFixerUpper,
      images: PROPERTY_IMAGES[Math.floor(Math.random() * PROPERTY_IMAGES.length)],
      renovationCosts,
      leaseType,
      leaseYears: leaseType === 'leasehold' ? Math.floor(Math.random() * 900) + 100 : undefined,
      description: `A stunning ${bedrooms} bedroom ${propertyType} situated in the heart of ${location}. This exceptional property offers spacious living accommodation throughout and has been finished to an extremely high standard.`,
      features: [...FEATURES].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 4),
      isMortgageable,
      estimatedRevenue: Math.floor(basePrice * (Math.random() * 0.005 + 0.003)),
      estimatedSaleDate: `${new Date(Date.now() + Math.floor(Math.random() * 6 + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' })} ${new Date().getFullYear()}`,
      location: {
        coordinates: { lat, lng },
        postcode: `SW${Math.floor(Math.random() * 20) + 1} ${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      },
      analysis: {
        confidence: Math.floor(Math.random() * 20) + 75,
        structuralIssues: isFixerUpper && Math.random() > 0.5,
        outdatedInterior: isFixerUpper || Math.random() > 0.7,
        exteriorDamage: isFixerUpper && Math.random() > 0.7,
        marketTrends: {
          priceGrowth: growthRate,
          demandScore: Math.floor(Math.random() * 3) + 7,
          investmentRating: Math.floor(Math.random() * 3) + 6
        }
      }
    };
  });
}