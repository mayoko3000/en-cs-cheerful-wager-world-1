
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="font-bold text-xl md:text-2xl text-white relative overflow-hidden">
            Lucky Social Spins
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-casino-highlight transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
        </Link>
        
        {/* Desktop Navigation Components */}
        <DesktopNav />
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 transition-transform duration-200 hover:scale-110"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} className="animate-spin-once" /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Component */}
      <MobileNav isOpen={isMenuOpen} onLinkClick={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
