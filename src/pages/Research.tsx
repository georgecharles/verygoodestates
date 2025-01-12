import { PropertyHero } from '@/components/PropertyHero';
import { Card } from '@/components/ui/card';
import { FileText, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const RESEARCH_REPORTS = [
  {
    id: 1,
    title: "UK Property Market Outlook 2024",
    description: "Comprehensive analysis of market trends, growth forecasts, and investment opportunities across UK regions.",
    date: "February 2024",
    type: "Market Report",
    imageUrl: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51",
    pages: 45,
    fileSize: "2.3MB",
    content: `
      <h2>Executive Summary</h2>
      <p>The UK property market continues to show resilience despite economic headwinds...</p>
      
      <h2>Market Overview</h2>
      <p>2024 presents unique opportunities in the UK property market...</p>
      
      <h2>Regional Analysis</h2>
      <p>Northern regions show particularly strong growth potential...</p>
      
      <h2>Investment Recommendations</h2>
      <p>We identify key areas for investment focus in 2024...</p>
    `
  },
  {
    id: 2,
    title: "Buy-to-Let Investment Analysis",
    description: "In-depth study of rental yields, tenant demand, and regulatory changes affecting the BTL sector.",
    date: "January 2024",
    type: "Sector Analysis",
    imageUrl: "https://images.unsplash.com/photo-1554469384-e58fac16e23a",
    pages: 32,
    fileSize: "1.8MB",
    content: `
      <h2>BTL Market Overview</h2>
      <p>The Buy-to-Let sector continues to evolve with new regulations...</p>
      
      <h2>Yield Analysis</h2>
      <p>Current rental yields across major UK cities show varying patterns...</p>
      
      <h2>Regulatory Impact</h2>
      <p>Recent and upcoming regulatory changes affecting BTL investors...</p>
    `
  },
  {
    id: 3,
    title: "Emerging Property Hotspots",
    description: "Detailed analysis of up-and-coming areas with high growth potential and regeneration plans.",
    date: "December 2023",
    type: "Location Analysis",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    pages: 28,
    fileSize: "1.5MB",
    content: `
      <h2>Growth Areas</h2>
      <p>Identifying the next wave of property hotspots across the UK...</p>
      
      <h2>Infrastructure Impact</h2>
      <p>Major infrastructure projects driving property value growth...</p>
      
      <h2>Investment Timeline</h2>
      <p>Optimal entry points for different market segments...</p>
    `
  }
];

export function Research() {
  return (
    <div>
      <PropertyHero
        title="Research & Reports"
        subtitle="Expert analysis and insights to inform your property investment decisions"
        imageUrl="https://images.unsplash.com/photo-1434626881859-194d67b2b86f"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {RESEARCH_REPORTS.map((report) => (
            <Link to={`/research/${report.id}`} key={report.id}>
              <Card className="overflow-hidden bg-navy-800/50 border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
                <div className="aspect-[16/9] relative">
                  <img 
                    src={report.imageUrl} 
                    alt={report.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-4 left-4 bg-gold-500 text-navy-950 px-3 py-1 rounded-full text-sm font-medium">
                    {report.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <FileText className="w-4 h-4" />
                    <span>{report.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{report.title}</h3>
                  <p className="text-gray-400 mb-6">{report.description}</p>
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-gold-500 text-navy-950 hover:bg-gold-600">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1 border-gold-500/20">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Stats
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}