import { useState } from 'react';
import { Menu, X, Home, Building2, TrendingUp, HelpCircle, LogIn, UserCircle, LogOut, Calculator, FileText, BookOpen, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AccountModal } from './auth/AccountModal';

export function Header({ onAuthClick }: { onAuthClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="fixed w-full z-50 bg-navy-950/95 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-gold-400" />
            <div>
              <span className="text-xl font-light text-white">Very Good Estates</span>
              <span className="hidden md:block text-xs text-gold-400">Premium Investment Search</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/properties" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
              <Building2 className="h-4 w-4" />
              Properties
            </Link>
            <Link to="/market-insights" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
              <TrendingUp className="h-4 w-4" />
              Market Insights
            </Link>
            <Link to="/calculators" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
              <Calculator className="h-4 w-4" />
              Calculators
            </Link>
            <Link to="/research" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
              <FileText className="h-4 w-4" />
              Research
            </Link>
            <Link to="/blog" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
              <BookOpen className="h-4 w-4" />
              Blog
            </Link>
            <Link to="/help" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
              <HelpCircle className="h-4 w-4" />
              Help
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/subscription" className="text-gold-400 hover:text-gold-500 flex items-center gap-2 font-light">
                  <img 
                    src="https://i.postimg.cc/Qx2WyM5k/diamond.png" 
                    alt="Diamond" 
                    className="w-4 h-4"
                  />
                  Upgrade
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white font-light">
                      <UserCircle className="h-4 w-4 mr-2" />
                      {user.firstName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-navy-800 border-gold-500/20">
                    <DropdownMenuItem onClick={() => setIsAccountModalOpen(true)} className="text-white hover:text-white hover:bg-navy-700">
                      <UserCircle className="h-4 w-4 mr-2 text-white" />
                      Manage Account
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-white hover:text-white hover:bg-navy-700">
                      <Link to="/portfolio">
                        <Heart className="h-4 w-4 mr-2 text-white" />
                        Portfolio
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="text-white hover:text-white hover:bg-navy-700">
                      <LogOut className="h-4 w-4 mr-2 text-white" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-white hover:text-gold-400 font-light" onClick={onAuthClick}>
                  Sign In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-700 hover:to-gold-500 text-navy-950 font-light"
                  onClick={onAuthClick}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gold-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link to="/properties" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                <Building2 className="h-4 w-4" />
                Properties
              </Link>
              <Link to="/market-insights" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                <TrendingUp className="h-4 w-4" />
                Market Insights
              </Link>
              <Link to="/calculators" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                <Calculator className="h-4 w-4" />
                Calculators
              </Link>
              <Link to="/research" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                <FileText className="h-4 w-4" />
                Research
              </Link>
              <Link to="/blog" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                <BookOpen className="h-4 w-4" />
                Blog
              </Link>
              <Link to="/help" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                <HelpCircle className="h-4 w-4" />
                Help
              </Link>
              {user ? (
                <div className="flex flex-col gap-2 pt-4 border-t border-gold-500/20">
                  <Link to="/subscription" className="text-gold-400 hover:text-gold-500 flex items-center gap-2 font-light">
                    <img 
                      src="https://i.postimg.cc/Qx2WyM5k/diamond.png" 
                      alt="Diamond" 
                      className="w-4 h-4"
                    />
                    Upgrade
                  </Link>
                  <Link to="/portfolio" className="text-white hover:text-gold-400 flex items-center gap-2 font-light">
                    <Heart className="h-4 w-4" />
                    Portfolio
                  </Link>
                  <Button variant="ghost" className="text-white justify-start font-light" onClick={() => setIsAccountModalOpen(true)}>
                    <UserCircle className="h-4 w-4 mr-2" />
                    Manage Account
                  </Button>
                  <Button variant="ghost" className="text-white justify-start font-light" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-gold-500/20">
                  <Button variant="ghost" className="text-white hover:text-gold-400 justify-start font-light" onClick={onAuthClick}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-700 hover:to-gold-500 text-navy-950 font-light"
                    onClick={onAuthClick}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </header>
  );
}