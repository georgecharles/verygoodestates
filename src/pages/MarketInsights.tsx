import { useState } from 'react';
import { Share2, Download, Bell } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketWidget } from '@/components/MarketWidget';
import {
  InterestRateTracker,
  MarketPriceWidget,
  MarketActivityWidget,
  RegionalPerformanceWidget,
  MarketSentimentWidget,
  AIPredictionsWidget,
  MarketAlertsWidget
} from '@/components/MarketWidgets';

export function MarketInsights() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Market Insights - Very Good Estates',
        text: 'Check out these real-time market insights!',
        url: window.location.href
      });
    }
  };

  const handleExport = () => {
    // In a real app, this would generate and download a PDF/Excel report
    alert('Exporting market report...');
  };

  const handleSetAlert = () => {
    // In a real app, this would open an alert configuration modal
    alert('Setting up market alerts...');
  };

  return (
    <div>
      <PropertyHero
        title="Market Insights"
        subtitle="Stay ahead with real-time market analysis and future predictions"
        imageUrl="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f"
      />

      <div className={`max-w-7xl mx-auto px-4 py-16 ${isFullscreen ? 'fixed inset-0 bg-navy-950 z-50 overflow-auto' : ''}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light text-white">Market Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gold-500/20" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="border-gold-500/20" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-gold-500/20" onClick={handleSetAlert}>
              <Bell className="w-4 h-4 mr-2" />
              Set Alert
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-navy-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <MarketWidget id="interest-rates" title="Interest Rate Forecast">
                <InterestRateTracker />
              </MarketWidget>
              
              <MarketWidget id="price-trends" title="Price Trends">
                <MarketPriceWidget />
              </MarketWidget>
              
              <div className="grid grid-cols-2 gap-6">
                <MarketWidget id="market-activity" title="Market Activity">
                  <MarketActivityWidget />
                </MarketWidget>
                
                <MarketWidget id="regional-performance" title="Regional Performance">
                  <RegionalPerformanceWidget />
                </MarketWidget>
              </div>
              
              <MarketWidget id="market-sentiment" title="Market Sentiment">
                <MarketSentimentWidget />
              </MarketWidget>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <MarketWidget id="price-trends-detailed" title="Price Trends">
                <MarketPriceWidget detailed />
              </MarketWidget>
              
              <div className="grid grid-cols-2 gap-6">
                <MarketWidget id="regional-trends" title="Regional Trends">
                  <RegionalPerformanceWidget detailed />
                </MarketWidget>
                
                <MarketWidget id="market-activity-trends" title="Market Activity">
                  <MarketActivityWidget detailed />
                </MarketWidget>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <MarketWidget id="ai-predictions" title="AI Market Predictions">
                <AIPredictionsWidget />
              </MarketWidget>
              
              <MarketWidget id="interest-rates-prediction" title="Interest Rate Forecast">
                <InterestRateTracker />
              </MarketWidget>
              
              <div className="grid grid-cols-2 gap-6">
                <MarketWidget id="price-predictions" title="Price Predictions">
                  <MarketPriceWidget predictions />
                </MarketWidget>
                
                <MarketWidget id="regional-predictions" title="Regional Predictions">
                  <RegionalPerformanceWidget predictions />
                </MarketWidget>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <MarketWidget id="market-alerts" title="Market Alerts">
                <MarketAlertsWidget />
              </MarketWidget>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}