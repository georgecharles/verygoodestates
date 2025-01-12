import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-gold-400" />
              <span className="text-xl font-light text-white">Very Good Estates</span>
            </div>
            <p className="text-gray-400 font-light">
              Premium property search with AI-powered valuations and market insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-light mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-gold-400 font-light">Home</a></li>
              <li><a href="/properties" className="text-gray-400 hover:text-gold-400 font-light">Properties</a></li>
              <li><a href="/market-insights" className="text-gray-400 hover:text-gold-400 font-light">Market Insights</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-gold-400 font-light">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-gold-400 font-light">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-light mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/guides" className="text-gray-400 hover:text-gold-400 font-light">Investment Guides</a></li>
              <li><a href="/calculators" className="text-gray-400 hover:text-gold-400 font-light">Property Calculators</a></li>
              <li><a href="/news" className="text-gray-400 hover:text-gold-400 font-light">Market News</a></li>
              <li><a href="/research" className="text-gray-400 hover:text-gold-400 font-light">Research Reports</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-gold-400 font-light">Blog</a></li>
              <li><a href="/webinars" className="text-gray-400 hover:text-gold-400 font-light">Webinars</a></li>
              <li><a href="/glossary" className="text-gray-400 hover:text-gold-400 font-light">Property Glossary</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-light mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400 font-light">
                <MapPin className="h-4 w-4 text-gold-400" />
                Lytchett House, 13 Freeland Park, Poole, Dorset, England, BH16 6FA
              </li>
              <li className="flex items-center gap-2 text-gray-400 font-light">
                <Phone className="h-4 w-4 text-gold-400" />
                +44 (0) 123 456 7890
              </li>
              <li className="flex items-center gap-2 text-gray-400 font-light">
                <Mail className="h-4 w-4 text-gold-400" />
                info@verygoodestates.com
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers and Links */}
        <div className="mt-12 pt-8 border-t border-gold-500/20">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-white font-light mb-4">Legal Information</h4>
              <p className="text-gray-400 text-sm font-light mb-4">
                Very Good Estates is registered in England and Wales under company number 12345678. 
                Registered Office: Lytchett House, 13 Freeland Park, Poole, Dorset, England, BH16 6FA. 
                VAT Registration Number: GB 123 4567 89.
              </p>
              <p className="text-gray-400 text-sm font-light">
                Regulated by RICS. Member of The Property Ombudsman Scheme.
              </p>
            </div>
            <div>
              <h4 className="text-white font-light mb-4">Investment Disclaimer</h4>
              <p className="text-gray-400 text-sm font-light">
                Property investment carries risks and the value of investments can go down as well as up. 
                Past performance is not a reliable indicator of future results. Our property valuations and 
                market insights are estimates based on available data and should not be relied upon for any 
                investment decisions. Always seek independent financial advice before making any investment.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-light">
              © 2024 Very Good Estates. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-gold-400 font-light">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-gold-400 font-light">Terms of Service</a>
              <a href="/cookies" className="text-gray-400 hover:text-gold-400 font-light">Cookie Policy</a>
              <a href="/accessibility" className="text-gray-400 hover:text-gold-400 font-light">Accessibility</a>
              <a href="/modern-slavery" className="text-gray-400 hover:text-gold-400 font-light">Modern Slavery Statement</a>
              <a href="/complaints" className="text-gray-400 hover:text-gold-400 font-light">Complaints Procedure</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}