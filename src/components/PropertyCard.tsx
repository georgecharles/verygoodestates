import { Heart, Bed, Bath, Square, TrendingUp, Clock, Building2, PoundSterling, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/context/auth';
import type { Property } from '@/lib/types';

interface PropertyCardProps extends Property {
  onUnsave?: () => void;
}

export function PropertyCard({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  sqft,
  images,
  isFixerUpper,
  estimatedRevenue,
  estimatedSaleDate,
  analysis,
  renovationCosts,
  leaseType,
  leaseYears,
  isMortgageable,
  location,
  onUnsave,
}: PropertyCardProps) {
  const { user, saveProperty, unsaveProperty } = useAuth();
  const isSaved = user?.savedProperties.includes(id.toString());

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      if (isSaved) {
        if (onUnsave) {
          onUnsave();
        } else {
          unsaveProperty(id.toString());
        }
      } else {
        saveProperty(id.toString());
      }
    }
  };

  const getInvestmentLabels = () => {
    const labels = [];
    
    // BRRR Strategy
    if (isFixerUpper) {
      labels.push({
        text: 'BRRR',
        tooltip: 'Buy, Refurbish, Refinance, Rent - Suitable for value-add strategy through renovation',
        color: 'bg-emerald-500'
      });
    }
    
    // HMO Potential
    if (estimatedRevenue > price * 0.008) { // Over 8% yield
      labels.push({
        text: 'HMO Potential',
        tooltip: 'High yield potential suitable for House in Multiple Occupation conversion',
        color: 'bg-blue-500'
      });
    }
    
    // Short-term Accommodation
    if (location?.coordinates?.lat > 51.5 && location?.coordinates?.lng < -0.1) {
      labels.push({
        text: 'SA Opportunity',
        tooltip: 'Prime location for Short-term Accommodation / Holiday Let strategy',
        color: 'bg-purple-500'
      });
    }

    // Rent to Rent Potential
    if (estimatedRevenue > price * 0.006 && !isFixerUpper) {
      labels.push({
        text: 'R2R',
        tooltip: 'Rent to Rent - Potential for subletting strategy with good rental margins',
        color: 'bg-orange-500'
      });
    }

    // Lease Type Label
    labels.push({
      text: leaseType.charAt(0).toUpperCase() + leaseType.slice(1),
      tooltip: `${leaseType === 'leasehold' ? `${leaseYears} years remaining` : 'Freehold property'}`,
      color: 'bg-gold-500'
    });

    // Mortgageability
    if (isMortgageable) {
      labels.push({
        text: 'Mortgageable',
        tooltip: 'Property meets standard lending criteria',
        color: 'bg-teal-500'
      });
    }

    return labels;
  };

  return (
    <Link to={`/property/${id}`} className="block">
      <div className="bg-navy-800/50 rounded-lg overflow-hidden border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
        <div className="relative">
          <img
            src={images[0]}
            alt={title}
            className="w-full aspect-[4/3] object-cover"
          />
          <button
            onClick={handleSave}
            className="absolute top-4 right-4 p-2 rounded-full bg-navy-900/80 hover:bg-navy-900 text-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-red-500' : ''}`} />
          </button>
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <TooltipProvider>
              {getInvestmentLabels().map((label, index) => (
                <Tooltip key={`${label.text}-${index}`}>
                  <TooltipTrigger asChild>
                    <Badge 
                      className={`${label.color} text-white hover:${label.color} flex items-center gap-1 cursor-help`}
                    >
                      {label.text}
                      <HelpCircle className="w-3 h-3" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="bg-navy-900 text-white border-gold-500/20 max-w-xs"
                  >
                    <p className="max-w-xs">
                      {label.tooltip}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400">{address}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">£{price.toLocaleString()}</div>
              <div className="text-sm text-gray-400">£{Math.round(price/sqft).toLocaleString()}/sqft</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Bed className="w-5 h-5 text-gold-400 mx-auto mb-1" />
              <span className="text-white">{bedrooms}</span>
            </div>
            <div className="text-center">
              <Bath className="w-5 h-5 text-gold-400 mx-auto mb-1" />
              <span className="text-white">{bathrooms}</span>
            </div>
            <div className="text-center">
              <Square className="w-5 h-5 text-gold-400 mx-auto mb-1" />
              <span className="text-white">{sqft}</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-gold-500/20 pt-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
                Monthly Revenue
              </div>
              <div className="text-emerald-400">£{estimatedRevenue.toLocaleString()}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 text-gold-400 mr-2" />
                Est. Sale
              </div>
              <div className="text-white">{estimatedSaleDate}</div>
            </div>
            <div className="flex justify-between text-sm">
              {renovationCosts && (
                <div className="flex items-center text-gray-400">
                  <PoundSterling className="w-4 h-4 text-gold-400 mr-2" />
                  Renovation Cost
                </div>
              )}
              {renovationCosts && (
                <div className="text-white">£{renovationCosts.total.toLocaleString()}</div>
              )}
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <Building2 className="w-4 h-4 text-gold-400 mr-2" />
                AI Confidence
              </div>
              <div className="text-white">{analysis.confidence}%</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;