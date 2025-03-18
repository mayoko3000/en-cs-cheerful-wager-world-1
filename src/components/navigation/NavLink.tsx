
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  mobileView?: boolean;
};

const NavLink = ({ to, children, onClick, className = "", mobileView = false }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  if (mobileView) {
    return (
      <Link 
        to={to} 
        className={`px-4 py-2 rounded-md transition-all duration-300 ${
          isActive 
            ? 'bg-black/50 text-casino-neon border-l-2 border-casino-neon shadow-glow-sm' 
            : 'text-white hover:translate-x-2 hover:text-casino-neon'
        } ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link 
      to={to} 
      className={`text-lg font-medium transition-all duration-300 relative group ${
        isActive 
          ? 'text-casino-neon neon-text-small' 
          : 'text-white hover:text-casino-neon'
      } ${className}`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-casino-neon shadow-glow-sm animate-pulse"></span>
      )}
    </Link>
  );
};

export default NavLink;
