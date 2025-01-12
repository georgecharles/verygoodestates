import { Building2, TrendingUp, PieChart, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth';
import { generateMockProperties } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface PropertyHeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  children?: React.ReactNode;
}

export function PropertyHero({ title, subtitle, imageUrl, children }: PropertyHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { user } = useAuth();
  const [portfolioStats, setPortfolioStats] = useState<{
    totalValue: number;
    potentialProfit: number;
    averageYield: number;
    predictedGrowth: number;
  } | null>(null);

  useEffect(() => {
    if (user?.savedProperties.length) {
      // In a real app, this would be an API call
      const savedProperties = generateMockProperties(10)
        .filter(p => user.savedProperties.includes(p.id.toString()));

      const stats = savedProperties.reduce((acc, property) => {
        const annualRent = property.estimatedRevenue * 12;
        const yield_ = (annualRent / property.price) * 100;
        const potentialProfit = property.predictedValue - property.price;

        return {
          totalValue: acc.totalValue + property.price,
          potentialProfit: acc.potentialProfit + potentialProfit,
          averageYield: acc.averageYield + yield_,
          predictedGrowth: acc.predictedGrowth + ((property.predictedValue - property.price) / property.price) * 100
        };
      }, {
        totalValue: 0,
        potentialProfit: 0,
        averageYield: 0,
        predictedGrowth: 0
      });

      // Calculate averages
      const propertyCount = savedProperties.length || 1; // Prevent division by zero
      stats.averageYield /= propertyCount;
      stats.predictedGrowth /= propertyCount;

      setPortfolioStats(stats);
    }
  }, [user?.savedProperties]);

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-navy-950 to-navy-900">
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          imageLoaded ? 'opacity-10' : 'opacity-0'
        }`} 
      >
        <img 
          src={imageUrl} 
          alt=""
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <Building2 className="w-16 h-16 text-gold-400 mx-auto mb-6" />
        <motion.h1 
          className="text-4xl md:text-5xl font-light text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

{((user?.savedProperties?.length ?? 0) > 0) && portfolioStats && (
  <motion.div
    className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <div className="col-span-4 text-center mb-4">
      <h2 className="text-2xl font-light text-white">Your Current Portfolio Value</h2>
    </div>
    <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
      <Calculator className="w-6 h-6 text-gold-400 mx-auto mb-2" />
      <div className="text-2xl font-light text-white">
        £{portfolioStats.totalValue.toLocaleString()}
      </div>
      <div className="text-sm text-gray-400">Portfolio Value</div>
    </div>
    <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
      <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
      <div className="text-2xl font-light text-emerald-400">
        £{portfolioStats.potentialProfit.toLocaleString()}
      </div>
      <div className="text-sm text-gray-400">Potential Profit</div>
    </div>
    <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
      <PieChart className="w-6 h-6 text-gold-400 mx-auto mb-2" />
      <div className="text-2xl font-light text-white">
        {portfolioStats.averageYield.toFixed(1)}%
      </div>
      <div className="text-sm text-gray-400">Average Yield</div>
    </div>
    <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
      <TrendingUp className="w-6 h-6 text-gold-400 mx-auto mb-2" />
      <div className="text-2xl font-light text-white">
        {portfolioStats.predictedGrowth.toFixed(1)}%
      </div>
      <div className="text-sm text-gray-400">Predicted Growth</div>
    </div>
  </motion.div>
)}

        {children}
      </div>
    </div>
  );
}