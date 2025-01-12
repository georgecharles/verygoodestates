import { useState } from 'react';
import { Calculator, PoundSterling, TrendingUp, Home } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';
import { MarketWidget } from '@/components/MarketWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateMortgage, calculateBTLReturns, calculateSAReturns } from '@/lib/calculators';

export function PropertyCalculators() {
  const [activeTab, setActiveTab] = useState('mortgage');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Mortgage Calculator State
  const [mortgageParams, setMortgageParams] = useState({
    propertyPrice: 250000,
    deposit: 50000,
    interestRate: 4.5,
    term: 25
  });

  // BTL Calculator State
  const [btlParams, setBtlParams] = useState({
    propertyPrice: 250000,
    deposit: 50000,
    interestRate: 4.5,
    term: 25,
    monthlyRent: 1200,
    managementFee: 10,
    maintenanceCost: 1,
    insuranceCost: 30,
    voidPeriods: 1
  });

  // Calculate results
  const mortgageResults = calculateMortgage(mortgageParams);
  const btlResults = calculateBTLReturns(btlParams);

  return (
    <div>
      <PropertyHero
        title="Property Investment Calculators"
        subtitle="Make informed decisions with our comprehensive investment tools"
        imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
      />

      <div className={`max-w-7xl mx-auto px-4 py-16 ${isFullscreen ? 'fixed inset-0 bg-navy-950 z-50 overflow-auto' : ''}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-navy-800">
            <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
            <TabsTrigger value="btl">Buy-to-Let</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="mortgage" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <MarketWidget id="mortgage-calculator" title="Mortgage Calculator">
                <div className="p-6 space-y-4">
                  <div>
                    <Label>Property Price</Label>
                    <Input
                      type="number"
                      value={mortgageParams.propertyPrice}
                      onChange={(e) => setMortgageParams(prev => ({
                        ...prev,
                        propertyPrice: parseFloat(e.target.value)
                      }))}
                      className="bg-navy-800 border-gold-500/20"
                    />
                  </div>
                  <div>
                    <Label>Deposit</Label>
                    <Input
                      type="number"
                      value={mortgageParams.deposit}
                      onChange={(e) => setMortgageParams(prev => ({
                        ...prev,
                        deposit: parseFloat(e.target.value)
                      }))}
                      className="bg-navy-800 border-gold-500/20"
                    />
                  </div>
                  <div>
                    <Label>Interest Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={mortgageParams.interestRate}
                      onChange={(e) => setMortgageParams(prev => ({
                        ...prev,
                        interestRate: parseFloat(e.target.value)
                      }))}
                      className="bg-navy-800 border-gold-500/20"
                    />
                  </div>
                  <div>
                    <Label>Term (years)</Label>
                    <Input
                      type="number"
                      value={mortgageParams.term}
                      onChange={(e) => setMortgageParams(prev => ({
                        ...prev,
                        term: parseInt(e.target.value)
                      }))}
                      className="bg-navy-800 border-gold-500/20"
                    />
                  </div>
                </div>
              </MarketWidget>

              <MarketWidget id="mortgage-results" title="Results">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Monthly Payment</div>
                      <div className="text-xl font-semibold text-white">
                        £{mortgageResults.monthlyPayment.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Total Interest</div>
                      <div className="text-xl font-semibold text-white">
                        £{mortgageResults.totalInterest.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </MarketWidget>
            </div>
          </TabsContent>

          <TabsContent value="btl" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <MarketWidget id="btl-calculator" title="Buy-to-Let Calculator">
                <div className="p-6 space-y-4">
                  <div>
                    <Label>Property Price</Label>
                    <Input
                      type="number"
                      value={btlParams.propertyPrice}
                      onChange={(e) => setBtlParams(prev => ({
                        ...prev,
                        propertyPrice: parseFloat(e.target.value)
                      }))}
                      className="bg-navy-800 border-gold-500/20"
                    />
                  </div>
                  <div>
                    <Label>Monthly Rent</Label>
                    <Input
                      type="number"
                      value={btlParams.monthlyRent}
                      onChange={(e) => setBtlParams(prev => ({
                        ...prev,
                        monthlyRent: parseFloat(e.target.value)
                      }))}
                      className="bg-navy-800 border-gold-500/20"
                    />
                  </div>
                  <div>
                    <Label>Management Fee (%)</Label>
                    <Input
                      type="number"
                      value={btlParams.managementFee}
                      onChange={(e) => setBtlParams(prev => ({
                        ...prev,
                        managementFee: parseFloat(e.target.value)
                      }))}
                      className="bg-navy-800 border-gold-500/20"
                    />
                  </div>
                </div>
              </MarketWidget>

              <MarketWidget id="btl-results" title="Results">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Annual Income</div>
                      <div className="text-xl font-semibold text-white">
                        £{btlResults.annualIncome.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Net Yield</div>
                      <div className="text-xl font-semibold text-white">
                        {btlResults.yieldNet.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              </MarketWidget>
            </div>
          </TabsContent>

          <TabsContent value="development" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <MarketWidget id="development-calculator" title="Development Calculator">
                <div className="p-6 text-center">
                  <p className="text-gray-400">Coming soon</p>
                </div>
              </MarketWidget>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <div className="grid md:grid-cols-3 gap-8">
              <MarketWidget id="comparison-calculator" title="Investment Comparison">
                <div className="p-6 text-center">
                  <p className="text-gray-400">Coming soon</p>
                </div>
              </MarketWidget>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}