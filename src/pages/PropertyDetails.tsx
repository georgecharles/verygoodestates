import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertyTimeline } from '@/components/PropertyTimeline';
import { PriceAnalysis } from '@/components/PriceAnalysis';
import { EnvironmentData } from '@/components/EnvironmentData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Bed, Bath, Square, TrendingUp, Clock, Home, MapPin, Phone, Mail, Calculator, ExternalLink, Brain } from 'lucide-react';
import type { Property } from '@/lib/types';
import { generateMockProperties } from '@/lib/mockData';
import { addToRecentlyViewed } from '@/lib/cookies';
import { useAuth } from '@/lib/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyHero } from '@/components/PropertyHero';
import { InterestRateTracker } from '@/components/InterestRateTracker';
import { MarketWidget } from '@/components/MarketWidget';
import { MapModal } from '@/components/MapModal';
import { useLocation } from '@/lib/context/location';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d.toFixed(1);
}

export function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { user, saveProperty, unsaveProperty } = useAuth();
  const { userLocation } = useLocation();
  const isSaved = user?.savedProperties.includes(id || '');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, this would be an API call
    const mockProperty = generateMockProperties(1)[0];
    setProperty(mockProperty);

    if (id) {
      addToRecentlyViewed(id);
    }

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  // Calculate distance if user has set their location
  const distance = userLocation ? calculateDistance(
    userLocation.lat,
    userLocation.lng,
    property.location.coordinates.lat,
    property.location.coordinates.lng
  ) : null;

  const handleSave = () => {
    if (!user || !id) return;
    if (isSaved) {
      unsaveProperty(id);
    } else {
      saveProperty(id);
    }
  };

  return (
    <div>
      <PropertyHero
        title={property.title}
        subtitle={property.address}
        imageUrl={property.images[0]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Property Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* AI Analysis Section */}
        <div className="mt-8">
          <div className="bg-navy-800/50 rounded-lg p-6 border border-gold-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Brain className="w-8 h-8 text-gold-400" />
                <AnimatePresence>
                  {isAnalyzing && (
                    <motion.div
                      className="absolute -inset-2 rounded-full border-2 border-gold-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div>
                <h3 className="text-xl font-light text-white">AI Market Analysis</h3>
                <p className="text-gray-400">
                  {isAnalyzing ? 'Analyzing market data...' : 'Analysis complete'}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="h-4 bg-navy-900/50 rounded animate-pulse" />
                  <div className="h-4 bg-navy-900/50 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-navy-900/50 rounded animate-pulse w-1/2" />
                </motion.div>
              ) : (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <h4 className="text-lg font-light text-white mb-4">Market Position</h4>
                    <p className="text-gray-400 mb-4">
                      Based on our analysis of recent sales data and market trends, this property is currently 
                      {property.price < property.predictedValue ? ' undervalued ' : ' priced at market value '} 
                      for its location and specifications. The area has shown consistent growth over the past 12 months, 
                      with an average appreciation rate of {property.analysis.marketTrends.priceGrowth}%.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-light text-emerald-400">
                        {property.analysis.confidence}%
                      </div>
                      <div className="text-gray-400">Confidence Score</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-white mb-4">Investment Potential</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Strong rental demand in the area</li>
                      <li>• Above average capital growth potential</li>
                      <li>• Good transport links and amenities</li>
                      <li>• High tenant retention rate</li>
                      <li>• Favorable price per square foot ratio</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Property Details */}
          <div className="md:col-span-2 space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-navy-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="market">Market Trends</TabsTrigger>
                <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <EnvironmentData
                  lat={property.location.coordinates.lat}
                  lng={property.location.coordinates.lng}
                />

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-navy-800/50 p-4 rounded-lg text-center">
                    <Bed className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{property.bedrooms}</div>
                    <div className="text-sm text-gray-400">Bedrooms</div>
                  </div>
                  <div className="bg-navy-800/50 p-4 rounded-lg text-center">
                    <Bath className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{property.bathrooms}</div>
                    <div className="text-sm text-gray-400">Bathrooms</div>
                  </div>
                  <div className="bg-navy-800/50 p-4 rounded-lg text-center">
                    <Square className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{property.sqft}</div>
                    <div className="text-sm text-gray-400">Sq Ft</div>
                  </div>
                </div>

                <div className="bg-navy-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-light text-white mb-4">Description</h3>
                  <p className="text-gray-400">{property.description}</p>
                </div>

                <PropertyTimeline data={[
                  { year: 2020, value: property.price * 0.8 },
                  { year: 2024, value: property.price },
                  { year: 2028, value: property.predictedValue }
                ]} />
              </TabsContent>

              <TabsContent value="features">
                <div className="bg-navy-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-light text-white mb-4">Property Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-400">
                        <Home className="w-4 h-4 text-gold-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="market">
                <div className="space-y-6">
                  <MarketWidget id="interest-rates" title="Interest Rate Forecast">
                    <InterestRateTracker />
                  </MarketWidget>
                </div>
              </TabsContent>

              <TabsContent value="predictions">
                <div className="space-y-6">
                  <div className="bg-navy-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-light text-white mb-4">AI Value Predictions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">1 Year Forecast</div>
                        <div className="text-2xl font-bold text-emerald-400">
                          £{(property.price * 1.05).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">5 Year Forecast</div>
                        <div className="text-2xl font-bold text-emerald-400">
                          £{(property.price * 1.25).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <div className="bg-navy-800/50 p-6 rounded-lg">
              <Button 
                onClick={handleSave}
                className="w-full mb-4 bg-gold-500 text-navy-950 hover:bg-gold-600"
              >
                <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save Property'}
              </Button>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full border-gold-500/20">
                  <Phone className="w-4 h-4 mr-2" />
                  Request Viewing
                </Button>
                <Button variant="outline" className="w-full border-gold-500/20">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Agent
                </Button>
                <Button variant="outline" className="w-full border-gold-500/20">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Mortgage
                </Button>
                {distance && (
                  <Button 
                    variant="outline" 
                    className="w-full border-gold-500/20"
                    onClick={() => setIsMapOpen(true)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions ({distance} miles)
                  </Button>
                )}
              </div>
            </div>

            {property && (
              <MapModal
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                destination={{
                  lat: property.location.coordinates.lat,
                  lng: property.location.coordinates.lng,
                  address: property.address
                }}
              />
            )}

            <PriceAnalysis analysis={{
              currentPrice: property.price,
              averagePrice: property.price * 1.1,
              medianPrice: property.price * 1.05,
              priceRating: property.price < property.predictedValue ? 'good' : 'average',
              similarProperties: [
                { address: '123 Nearby St', price: property.price * 0.95, soldDate: 'Dec 2023' },
                { address: '456 Close Rd', price: property.price * 1.05, soldDate: 'Nov 2023' },
                { address: '789 Next Ave', price: property.price * 1.02, soldDate: 'Oct 2023' }
              ]
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;