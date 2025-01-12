import { AlertTriangle, CheckCircle, MinusCircle, TrendingUp, TrendingDown, Scale, FileText, Gavel } from 'lucide-react';
import type { PropertyPriceAnalysis } from '@/lib/types';

interface PriceAnalysisProps {
  analysis: PropertyPriceAnalysis;
}

export function PriceAnalysis({ analysis }: PriceAnalysisProps) {
  const getRatingIcon = () => {
    switch (analysis.priceRating) {
      case 'good':
        return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case 'bad':
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      default:
        return <MinusCircle className="w-6 h-6 text-yellow-400" />;
    }
  };

  const getRatingText = () => {
    switch (analysis.priceRating) {
      case 'good':
        return 'Good value for the area';
      case 'bad':
        return 'Above market value';
      default:
        return 'Average market value';
    }
  };

  const priceVsAverage = ((analysis.currentPrice - analysis.averagePrice) / analysis.averagePrice) * 100;

  return (
    <div className="bg-navy-800/50 rounded-lg p-6 border border-gold-500/20">
      <div className="flex items-center gap-3 mb-6">
        {getRatingIcon()}
        <div>
          <h3 className="text-xl font-light text-white">{getRatingText()}</h3>
          <p className="text-sm text-gray-400">Based on recent sales and market data</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <div className="text-sm text-gray-400 mb-1">Current Price</div>
          <div className="text-lg font-semibold text-white">
            £{analysis.currentPrice.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Area Average</div>
          <div className="text-lg font-semibold text-white flex items-center gap-2">
            £{analysis.averagePrice.toLocaleString()}
            {priceVsAverage < 0 ? (
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingUp className="w-4 h-4 text-red-400" />
            )}
          </div>
          <div className="text-sm text-gray-400">
            {Math.abs(priceVsAverage).toFixed(1)}% {priceVsAverage < 0 ? 'below' : 'above'} average
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Area Median</div>
          <div className="text-lg font-semibold text-white">
            £{analysis.medianPrice.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-gray-400">Legal Costs</span>
          </div>
          <div className="text-lg font-semibold text-white">£2,500 - £3,500</div>
          <ul className="text-sm text-gray-400 mt-2">
            <li>• Conveyancing fees</li>
            <li>• Searches and surveys</li>
            <li>• Land registry fees</li>
          </ul>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Gavel className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-gray-400">Admin Costs</span>
          </div>
          <div className="text-lg font-semibold text-white">£1,000 - £1,500</div>
          <ul className="text-sm text-gray-400 mt-2">
            <li>• Agent fees</li>
            <li>• Mortgage arrangement</li>
            <li>• Insurance</li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-light text-white mb-4">Recent Sales Nearby</h4>
        <div className="space-y-4">
          {analysis.similarProperties.map((property, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gold-500/10">
              <div className="text-gray-300">{property.address}</div>
              <div>
                <div className="text-white font-semibold">£{property.price.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Sold {property.soldDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}