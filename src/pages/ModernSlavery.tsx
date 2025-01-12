import { ShieldAlert } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';

export function ModernSlavery() {
  return (
    <div>
      <PropertyHero
        title="Modern Slavery Statement"
        subtitle="Our commitment to preventing modern slavery and human trafficking"
        imageUrl="https://images.unsplash.com/photo-1521791055366-0d553872125f"
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert">
          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-light text-white m-0">Our Position</h2>
            </div>
            <p className="text-gray-400">
              Very Good Estates has a zero-tolerance approach to modern slavery and human trafficking.
              We are committed to acting ethically and with integrity in all our business dealings and relationships.
            </p>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">Our Business</h2>
          <p className="text-gray-400 mb-8">
            As a property investment platform, we work with various suppliers, partners, and contractors.
            We are committed to ensuring that modern slavery is not taking place anywhere in our business
            or our supply chain.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">Due Diligence</h2>
          <p className="text-gray-400 mb-6">Our due diligence processes include:</p>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>Supplier vetting and assessment</li>
            <li>Regular audits and inspections</li>
            <li>Staff training and awareness</li>
            <li>Whistleblowing procedures</li>
            <li>Risk assessments</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">Training</h2>
          <p className="text-gray-400 mb-8">
            We provide training to our staff to ensure a high level of understanding of the risks of modern
            slavery and human trafficking in our business and supply chains.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">Reporting Concerns</h2>
          <p className="text-gray-400 mb-8">
            We encourage anyone with concerns about modern slavery to report them to:
            compliance@verygoodestates.com
          </p>

          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20 text-sm text-gray-400">
            Last updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
}