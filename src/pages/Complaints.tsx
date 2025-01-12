import { MessageSquare } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';

export function Complaints() {
  return (
    <div>
      <PropertyHero
        title="Complaints Procedure"
        subtitle="How we handle and resolve complaints"
        imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert">
          <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-light text-white m-0">Our Approach</h2>
            </div>
            <p className="text-gray-400">
              At Very Good Estates, we are committed to providing the highest level of service.
              If you're not satisfied, we want to hear about it so we can put things right.
            </p>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">How to Complain</h2>
          <p className="text-gray-400 mb-6">You can submit a complaint through:</p>
          <ul className="list-disc text-gray-400 ml-6 mb-8">
            <li>Email: complaints@verygoodestates.com</li>
            <li>Phone: +44 (0) 123 456 7890</li>
            <li>Post: Complaints Department, Very Good Estates, Lytchett House, 13 Freeland Park</li>
            <li>Online form: Available in your account dashboard</li>
          </ul>

          <h2 className="text-2xl font-light text-white mb-4">Our Process</h2>
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-light text-white mb-2">1. Acknowledgment</h3>
              <p className="text-gray-400">
                We'll acknowledge your complaint within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-2">2. Investigation</h3>
              <p className="text-gray-400">
                We'll investigate your complaint thoroughly and gather all relevant information.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-2">3. Resolution</h3>
              <p className="text-gray-400">
                We aim to resolve complaints within 8 business days.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-2">4. Final Response</h3>
              <p className="text-gray-400">
                You'll receive a detailed response explaining our findings and resolution.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-light text-white mb-4">External Resolution</h2>
          <p className="text-gray-400 mb-8">
            If you're not satisfied with our response, you can refer your complaint to:
            The Property Ombudsman
          </p>

          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20 text-sm text-gray-400">
            Last updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
}