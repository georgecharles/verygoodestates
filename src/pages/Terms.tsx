import { Scale } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';

export function Terms() {
  return (
    <div>
      <PropertyHero
        title="Terms of Service"
        subtitle="The rules and guidelines for using our platform"
        imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert">
          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-light text-white m-0">Legal Agreement</h2>
            </div>
            <p className="text-gray-400">
              By accessing or using Very Good Estates' services, you agree to be bound by these Terms of Service.
              Please read them carefully before using our platform.
            </p>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">1. Service Description</h2>
          <p className="text-gray-400 mb-8">
            Very Good Estates provides an AI-powered property investment platform that includes property listings,
            market analysis, and investment insights. Our services are intended for informational purposes only
            and should not be considered as financial advice.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">2. User Obligations</h2>
          <p className="text-gray-400 mb-6">You agree to:</p>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Use the service in compliance with applicable laws</li>
            <li>Not misuse or attempt to manipulate our platform</li>
            <li>Respect intellectual property rights</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">3. Investment Risks</h2>
          <p className="text-gray-400 mb-8">
            Property investment carries risks. The value of investments can go down as well as up. Past performance
            is not a reliable indicator of future results. Always seek independent financial advice before making
            investment decisions.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">4. Intellectual Property</h2>
          <p className="text-gray-400 mb-8">
            All content, features, and functionality of our platform are owned by Very Good Estates and are
            protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-400 mb-8">
            Very Good Estates shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use or inability to use our services.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">6. Modifications</h2>
          <p className="text-gray-400 mb-8">
            We reserve the right to modify these terms at any time. Continued use of our platform after any
            modifications indicates your acceptance of the updated terms.
          </p>

          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20 text-sm text-gray-400">
            Last updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
}