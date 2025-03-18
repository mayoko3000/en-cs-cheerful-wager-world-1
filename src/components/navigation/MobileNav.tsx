
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavLink from './NavLink';

type MobileNavProps = {
  isOpen: boolean;
  onLinkClick: () => void;
};

const MobileNav = ({ isOpen, onLinkClick }: MobileNavProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md shadow-md animate-slide-down border-t border-casino-neon/30">
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
        <NavLink to="/" mobileView onClick={onLinkClick}>Home</NavLink>
        <NavLink to="/games" mobileView onClick={onLinkClick}>Games</NavLink>
        <NavLink to="/play" mobileView onClick={onLinkClick}>Play</NavLink>
        <NavLink to="/about" mobileView onClick={onLinkClick}>About</NavLink>
        <NavLink to="/support" mobileView onClick={onLinkClick}>Support</NavLink>
        
        <div className="pt-2 flex flex-col space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-center transform transition-transform duration-200 hover:scale-102 border-casino-neon/50 text-white"
            onClick={onLinkClick}
          >
            Log In
          </Button>
          <Button 
            className="w-full justify-center bg-casino-neon hover:bg-casino-blue text-black font-bold transform transition-transform duration-200 hover:scale-102 shadow-glow-sm"
            onClick={onLinkClick}
          >
            Sign Up
          </Button>
        </div>
        
        <div className="border-t border-casino-neon/20 pt-3 mt-3 text-sm flex flex-col space-y-2">
          <Link 
            to="/terms" 
            className="text-gray-400 hover:text-casino-neon transition-colors"
            onClick={onLinkClick}
          >
            Terms & Conditions
          </Link>
          <Link 
            to="/privacy" 
            className="text-gray-400 hover:text-casino-neon transition-colors"
            onClick={onLinkClick}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
