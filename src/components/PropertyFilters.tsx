import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  priceRange: [number, number];
  bedrooms: number | null;
  propertyType: string;
  leaseType: string;
  fixerUpperOnly: boolean;
  mortgageableOnly: boolean;
  maxRenovationCost: number | null;
  minYield: number | null;
}

const MAX_PRICE = 10000000; // £10M
const MAX_RENOVATION = 1000000; // £1M

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [0, 2000000],
    bedrooms: null,
    propertyType: 'all',
    leaseType: 'all',
    fixerUpperOnly: false,
    mortgageableOnly: false,
    maxRenovationCost: null,
    minYield: null
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`;
    }
    return `£${(value / 1000).toFixed(0)}k`;
  };

  return (
    <div className="bg-navy-800/50 border border-gold-500/20 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-gold-400" />
        <h3 className="text-lg font-semibold text-white">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="text-center">
            <Label className="text-sm text-gray-300 mb-2 block">Price Range</Label>
            <div className="px-3">
              <Slider
                defaultValue={[0, 2000000]}
                max={MAX_PRICE}
                step={100000}
                value={filters.priceRange}
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev,
                  priceRange: value as [number, number] 
                }))}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Label className="text-sm text-gray-300 mb-2 block">Max Renovation Cost</Label>
            <div className="px-3">
              <Slider
                defaultValue={[0]}
                max={MAX_RENOVATION}
                step={50000}
                value={[filters.maxRenovationCost || 0]}
                onValueChange={([value]) => setFilters(prev => ({ 
                  ...prev,
                  maxRenovationCost: value 
                }))}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>£0</span>
                <span>{formatPrice(filters.maxRenovationCost || MAX_RENOVATION)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <Label className="text-sm text-gray-300 mb-2 block">Bedrooms</Label>
              <Select
                value={filters.bedrooms?.toString() || 'any'}
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev,
                  bedrooms: value === 'any' ? null : parseInt(value) 
                }))}
              >
                <SelectTrigger className="bg-navy-900 border-gold-500/20">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-center">
              <Label className="text-sm text-gray-300 mb-2 block">Property Type</Label>
              <Select
                value={filters.propertyType}
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev,
                  propertyType: value 
                }))}
              >
                <SelectTrigger className="bg-navy-900 border-gold-500/20">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="maisonette">Maisonette</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-300">Fixer Upper Only</Label>
              <Switch
                checked={filters.fixerUpperOnly}
                onCheckedChange={(checked) => setFilters(prev => ({
                  ...prev,
                  fixerUpperOnly: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-300">Mortgageable Only</Label>
              <Switch
                checked={filters.mortgageableOnly}
                onCheckedChange={(checked) => setFilters(prev => ({
                  ...prev,
                  mortgageableOnly: checked
                }))}
              />
            </div>
          </div>

          <div className="text-center">
            <Label className="text-sm text-gray-300 mb-2 block">Minimum Yield</Label>
            <Select
              value={filters.minYield?.toString() || 'any'}
              onValueChange={(value) => setFilters(prev => ({ 
                ...prev,
                minYield: value === 'any' ? null : parseFloat(value) 
              }))}
            >
              <SelectTrigger className="bg-navy-900 border-gold-500/20">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="4">4%+</SelectItem>
                <SelectItem value="5">5%+</SelectItem>
                <SelectItem value="6">6%+</SelectItem>
                <SelectItem value="7">7%+</SelectItem>
                <SelectItem value="8">8%+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}