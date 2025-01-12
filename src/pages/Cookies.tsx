import { Cookie } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';

export function Cookies() {
  return (
    <div>
      <PropertyHero
        title="Cookie Policy"
        subtitle="How we use cookies to improve your experience"
        imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert">
          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-light text-white m-0">About Cookies</h2>
            </div>
            <p className="text-gray-400">
              We use cookies and similar technologies to provide, protect, and improve our services.
              This policy explains how and why we use these technologies and the choices you have.
            </p>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">What are Cookies?</h2>
          <p className="text-gray-400 mb-8">
            Cookies are small data files stored on your browser or device. They help us remember your preferences,
            understand how you use our platform, and improve your experience.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">Types of Cookies We Use</h2>
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-light text-white mb-2">Essential Cookies</h3>
              <p className="text-gray-400">
                Required for the platform to function. They help with navigation and accessing secure areas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-2">Functional Cookies</h3>
              <p className="text-gray-400">
                Remember your preferences and personalization choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-2">Analytics Cookies</h3>
              <p className="text-gray-400">
                Help us understand how visitors interact with our platform.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-2">Marketing Cookies</h3>
              <p className="text-gray-400">
                Used to deliver relevant advertisements and track their effectiveness.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">Managing Cookies</h2>
          <p className="text-gray-400 mb-6">
            You can control cookies through your browser settings. However, disabling certain cookies may limit
            your ability to use some features of our platform.
          </p>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>Chrome: Settings → Privacy and Security → Cookies</li>
            <li>Firefox: Options → Privacy & Security → Cookies</li>
            <li>Safari: Preferences → Privacy → Cookies</li>
            <li>Edge: Settings → Privacy & Security → Cookies</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">Updates to This Policy</h2>
          <p className="text-gray-400 mb-8">
            We may update this Cookie Policy to reflect changes in our practices or for operational, legal, or
            regulatory reasons.
          </p>

          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20 text-sm text-gray-400">
            Last updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
}