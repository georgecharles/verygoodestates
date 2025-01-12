import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { BetaModal } from '@/components/BetaModal';
import { AuthProvider } from '@/lib/context/auth';
import { LocationProvider } from '@/lib/context/location';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Home } from '@/pages/Home';
import { Properties } from '@/pages/Properties';
import { PropertyDetails } from '@/pages/PropertyDetails';
import { MarketInsights } from '@/pages/MarketInsights';
import { PropertyCalculators } from '@/pages/PropertyCalculators';
import { Research } from '@/pages/Research';
import { ResearchPost } from '@/pages/ResearchPost';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Portfolio } from '@/pages/Portfolio';
import { Help } from '@/pages/Help';
import { About } from '@/pages/About';
import { Privacy } from '@/pages/Privacy';
import { Terms } from '@/pages/Terms';
import { Cookies } from '@/pages/Cookies';
import { Accessibility } from '@/pages/Accessibility';
import { ModernSlavery } from '@/pages/ModernSlavery';
import { Complaints } from '@/pages/Complaints';
import { Subscription } from '@/pages/Subscription';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-navy-950">
            <Header onAuthClick={() => setIsAuthModalOpen(true)} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/market-insights" element={<MarketInsights />} />
                  <Route path="/calculators" element={<PropertyCalculators />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/research/:id" element={<ResearchPost />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/modern-slavery" element={<ModernSlavery />} />
                  <Route path="/complaints" element={<Complaints />} />
                  <Route path="/subscription" element={<Subscription />} />
                </Routes>
              </motion.div>
            </AnimatePresence>

            <Footer />

            <AuthModal 
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              onSuccess={(user) => {
                setIsAuthModalOpen(false);
              }}
            />

            <BetaModal />
          </div>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}