import { Building2, Award, Users, Shield } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';

export function About() {
  return (
    <div>
      <PropertyHero
        title="About Very Good Estates"
        subtitle="Leading the way in AI-powered property investment"
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-light text-white mb-6">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              At Very Good Estates, we're revolutionizing property investment through cutting-edge AI technology 
              and deep market insights. Our mission is to empower investors with the tools and knowledge they 
              need to make informed decisions in the UK property market.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Founded by a team of property experts and technology innovators, we combine decades of real estate 
              experience with advanced artificial intelligence to provide unparalleled market analysis and 
              investment opportunities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <Award className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Excellence</h3>
              <p className="text-gray-400">Setting the standard in property investment analysis</p>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <Users className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Community</h3>
              <p className="text-gray-400">Building a network of successful investors</p>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <Shield className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Trust</h3>
              <p className="text-gray-400">Providing reliable, data-driven insights</p>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <Building2 className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Innovation</h3>
              <p className="text-gray-400">Leading with AI-powered analytics</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
              <h3 className="text-xl font-light text-white mb-4">Market Analysis</h3>
              <p className="text-gray-400">
                Our AI algorithms analyze millions of data points to provide accurate market insights and predictions.
              </p>
            </div>
            <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
              <h3 className="text-xl font-light text-white mb-4">Investment Strategy</h3>
              <p className="text-gray-400">
                Expert guidance on building and optimizing your property investment portfolio.
              </p>
            </div>
            <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
              <h3 className="text-xl font-light text-white mb-4">Property Sourcing</h3>
              <p className="text-gray-400">
                Access to exclusive opportunities and off-market properties across the UK.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-light text-white mb-8">Our Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-light text-gold-400 mb-2">£2.5B+</div>
              <div className="text-gray-400">Properties Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-light text-gold-400 mb-2">15K+</div>
              <div className="text-gray-400">Active Investors</div>
            </div>
            <div>
              <div className="text-4xl font-light text-gold-400 mb-2">95%</div>
              <div className="text-gray-400">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-light text-gold-400 mb-2">24/7</div>
              <div className="text-gray-400">Market Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}