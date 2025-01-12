import { Mail, Phone, MessageSquare, FileText, HelpCircle } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';
import { Button } from '@/components/ui/button';

export function Help() {
  return (
    <div>
      <PropertyHero
        title="Help & Support"
        subtitle="Get the assistance you need with our comprehensive support resources"
        imageUrl="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Quick Help */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
            <Phone className="w-8 h-8 text-gold-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-4">Call Us</h3>
            <p className="text-gray-400 mb-6">
              Speak directly with our support team for immediate assistance.
            </p>
            <Button className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
              +44 (0) 123 456 7890
            </Button>
          </div>

          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
            <Mail className="w-8 h-8 text-gold-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-4">Email Support</h3>
            <p className="text-gray-400 mb-6">
              Send us your questions and we'll respond within 24 hours.
            </p>
            <Button className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
              support@verygoodestates.com
            </Button>
          </div>

          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
            <MessageSquare className="w-8 h-8 text-gold-400 mb-4" />
            <h3 className="text-xl font-light text-white mb-4">Live Chat</h3>
            <p className="text-gray-400 mb-6">
              Chat with our team in real-time for quick answers.
            </p>
            <Button className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
              Start Chat
            </Button>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <h3 className="text-lg font-light text-white mb-4">How accurate are your AI predictions?</h3>
              <p className="text-gray-400">
                Our AI models achieve over 85% accuracy in predicting property values and market trends,
                based on extensive historical data and real-time market indicators.
              </p>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <h3 className="text-lg font-light text-white mb-4">What data sources do you use?</h3>
              <p className="text-gray-400">
                We combine data from Land Registry, major property portals, economic indicators,
                and local market research to provide comprehensive insights.
              </p>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <h3 className="text-lg font-light text-white mb-4">How often is data updated?</h3>
              <p className="text-gray-400">
                Our property data and market insights are updated in real-time, with comprehensive
                market reports published monthly.
              </p>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <h3 className="text-lg font-light text-white mb-4">Can I export property data?</h3>
              <p className="text-gray-400">
                Premium subscribers can export property data, market reports, and custom analysis
                in various formats including PDF and Excel.
              </p>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div>
          <h2 className="text-2xl font-light text-white mb-8">Help Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Button variant="outline" className="h-auto py-6 border-gold-500/20">
              <div className="text-center">
                <FileText className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <span className="block text-white">Guides & Tutorials</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-6 border-gold-500/20">
              <div className="text-center">
                <HelpCircle className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <span className="block text-white">Account Help</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-6 border-gold-500/20">
              <div className="text-center">
                <MessageSquare className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <span className="block text-white">Community</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-6 border-gold-500/20">
              <div className="text-center">
                <Mail className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <span className="block text-white">Contact Us</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}