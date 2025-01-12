import { Shield } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';

export function Privacy() {
  return (
    <div>
      <PropertyHero
        title="Privacy Policy"
        subtitle="How we protect and handle your data"
        imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert">
          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-light text-white m-0">Data Protection Commitment</h2>
            </div>
            <p className="text-gray-400">
              Very Good Estates is committed to protecting your privacy and ensuring your personal information is handled securely.
              This Privacy Policy explains how we collect, use, and protect your data.
            </p>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">Information We Collect</h2>
          <p className="text-gray-400 mb-6">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Property preferences and search history</li>
            <li>Investment criteria and portfolio details</li>
            <li>Communication preferences</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">How We Use Your Information</h2>
          <p className="text-gray-400 mb-6">
            Your information helps us provide and improve our services:
          </p>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>Personalize your property search experience</li>
            <li>Provide market insights and investment recommendations</li>
            <li>Process transactions and maintain your account</li>
            <li>Communicate updates and relevant opportunities</li>
            <li>Improve our AI algorithms and predictions</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">Data Security</h2>
          <p className="text-gray-400 mb-8">
            We implement appropriate technical and organizational security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-light text-white mb-4">Your Rights</h2>
          <p className="text-gray-400 mb-6">
            Under data protection laws, you have rights including:
          </p>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>The right to access your personal data</li>
            <li>The right to rectification of inaccurate data</li>
            <li>The right to erasure of your data</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-8">
            If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
            privacy@verygoodestates.com
          </p>

          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20 text-sm text-gray-400">
            Last updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
}