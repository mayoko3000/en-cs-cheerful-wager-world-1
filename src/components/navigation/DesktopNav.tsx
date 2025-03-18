
import React from 'react';
import { Button } from "@/components/ui/button";
import NavLink from './NavLink';

const DesktopNav = () => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/play">Play</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/support">Support</NavLink>
      </nav>
      
      <div className="hidden md:flex items-center space-x-4">
        <Button 
          variant="ghost" 
          className="text-white hover:text-casino-neon hover:bg-black/30 transition-colors relative overflow-hidden group"
        >
          <span className="relative z-10">Log In</span>
          <span className="absolute bottom-0 left-0 w-full h-0 bg-black/20 transition-all duration-300 group-hover:h-full -z-0"></span>
        </Button>
        <Button 
          className="bg-casino-neon hover:bg-casino-blue text-black font-bold transition-all duration-300 transform hover:scale-105 shadow-glow-sm"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

export default DesktopNav;
