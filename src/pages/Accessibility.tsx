import { Accessibility as AccessibilityIcon } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';

export function Accessibility() {
  return (
    <div>
      <PropertyHero
        title="Accessibility Statement"
        subtitle="Our commitment to digital inclusion"
        imageUrl="https://images.unsplash.com/photo-1573497620053-ea5300f94f21"
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert">
          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AccessibilityIcon className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-light text-white m-0">Our Commitment</h2>
            </div>
            <p className="text-gray-400">
              Very Good Estates is committed to ensuring digital accessibility for people with disabilities.
              We continually improve the user experience for everyone and apply the relevant accessibility standards.
            </p>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">Conformance Status</h2>
          <p className="text-gray-400 mb-8">
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve
            accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA,
            and Level AAA. Very Good Estates is partially conformant with WCAG 2.1 level AA.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">Accessibility Features</h2>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>Text resizing without loss of functionality</li>
            <li>Color contrast compliance</li>
            <li>Alternative text for images</li>
            <li>Clear heading structure</li>
            <li>Consistent navigation</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">Feedback</h2>
          <p className="text-gray-400 mb-8">
            We welcome your feedback on the accessibility of Very Good Estates. Please contact us at:
            accessibility@verygoodestates.com
          </p>

          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20 text-sm text-gray-400">
            Last updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
}