import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyHero } from '@/components/PropertyHero';

export function Subscription() {
  const plans = [
    {
      name: 'Basic',
      price: '£9.99',
      period: 'month',
      features: [
        'Basic property search',
        'Market insights',
        'Save up to 5 properties',
        'Email support'
      ]
    },
    {
      name: 'Premium',
      price: '£29.99',
      period: 'month',
      features: [
        'Advanced property search',
        'Detailed market analysis',
        'Unlimited saved properties',
        'Investment predictions',
        'Priority support',
        'Property alerts',
        'Portfolio tracking'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '£99.99',
      period: 'month',
      features: [
        'All Premium features',
        'API access',
        'Custom reports',
        'Dedicated account manager',
        'Team collaboration',
        'White-label options',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div>
      <PropertyHero
        title="Upgrade Your Investment Journey"
        subtitle="Choose the perfect plan to unlock your property investment potential"
        imageUrl="https://images.unsplash.com/photo-1579621970795-87facc2f976d"
      >
        <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
        <dotlottie-player 
          src="https://lottie.host/33f6f966-dec6-4644-9352-1332624ca281/Bb8pT0BiYr.lottie" 
          background="transparent" 
          speed="1" 
          style={{ width: '300px', height: '300px', margin: '0 auto' }}
          loop 
          autoplay
        ></dotlottie-player>
      </PropertyHero>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-navy-800/50 rounded-lg p-8 border ${
                plan.recommended
                  ? 'border-gold-500 ring-2 ring-gold-500/20'
                  : 'border-gold-500/20'
              }`}
            >
              {plan.recommended && (
                <div className="bg-gold-500 text-navy-950 text-sm font-semibold px-3 py-1 rounded-full w-fit mb-4">
                  Recommended
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold-400">{plan.price}</span>
                <span className="text-gray-400">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-gold-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.recommended
                    ? 'bg-gold-500 text-navy-950 hover:bg-gold-600'
                    : 'bg-navy-900 text-white hover:bg-navy-800'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}