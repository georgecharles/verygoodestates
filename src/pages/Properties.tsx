import { useState, useEffect } from 'react';
import { PropertyHero } from '@/components/PropertyHero';
import { PropertyFilters, type PropertyFilters as Filters } from '@/components/PropertyFilters';
import { PropertySort } from '@/components/PropertySort';
import PropertyCard from '@/components/PropertyCard';
import { generateMockProperties } from '@/lib/mockData';
import type { Property } from '@/lib/types';
import { motion } from 'framer-motion';

export function Properties() {
  const [sortBy, setSortBy] = useState('price_asc');
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000000],
    bedrooms: null,
    propertyType: 'all',
    leaseType: 'all',
    fixerUpperOnly: false,
    mortgageableOnly: false,
    maxRenovationCost: null,
    minYield: null
  });

  const applyFilters = (props: Property[], currentFilters: Filters) => {
    const filtered = props.filter(property => {
      if (property.price < currentFilters.priceRange[0] || property.price > currentFilters.priceRange[1]) {
        return false;
      }

      if (currentFilters.bedrooms && property.bedrooms !== currentFilters.bedrooms) {
        return false;
      }

      if (currentFilters.propertyType !== 'all' && property.propertyType !== currentFilters.propertyType) {
        return false;
      }

      if (currentFilters.leaseType !== 'all' && property.leaseType !== currentFilters.leaseType) {
        return false;
      }

      if (currentFilters.fixerUpperOnly && !property.isFixerUpper) {
        return false;
      }

      if (currentFilters.mortgageableOnly && !property.isMortgageable) {
        return false;
      }

      if (currentFilters.maxRenovationCost && property.renovationCosts?.total > currentFilters.maxRenovationCost) {
        return false;
      }

      if (currentFilters.minYield) {
        const rentalYield = (property.estimatedRevenue * 12 / property.price) * 100;
        if (rentalYield < currentFilters.minYield) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
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

    setFilteredProperties(sorted);
  };

  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      const mockProperties = generateMockProperties(20);
      setProperties(mockProperties);
      applyFilters(mockProperties, filters);
      setIsLoading(false);
    };

    loadProperties();
  }, [filters, sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterChange = (filters: Filters) => {
    setFilters(filters);
  };

  return (
    <div>
      <PropertyHero
        title="Premium Properties"
        subtitle="Discover exceptional properties in the UK's most sought-after locations"
        imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <PropertyFilters onFilterChange={handleFilterChange} />

        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-400">
            {filteredProperties.length} properties found
          </div>
          <PropertySort value={sortBy} onChange={setSortBy} />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-navy-800/50 rounded-lg h-[400px]"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}