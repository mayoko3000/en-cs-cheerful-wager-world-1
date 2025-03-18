
import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="font-bold text-xl text-casino-neon neon-text">CYBER CASINO NETWORK</div>
            <p className="text-gray-400 mt-2">Digital entertainment evolved.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <Link to="/about" className="text-gray-400 hover:text-casino-neon transition-colors">About</Link>
            <Link to="/games" className="text-gray-400 hover:text-casino-purple transition-colors">Games</Link>
            <Link to="/terms" className="text-gray-400 hover:text-casino-blue transition-colors">Terms</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-casino-pink transition-colors">Privacy</Link>
            <Link to="/support" className="text-gray-400 hover:text-casino-neon transition-colors">Support</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Info className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-400">Important Disclaimer</h3>
                <div className="mt-2 text-sm text-gray-300">
                  <p className="mb-2">
                    CYBER CASINO NETWORK is a virtual entertainment platform designed for amusement purposes only. All games on this platform operate using fictional virtual currency that has <span className="font-semibold text-yellow-200">NO REAL-WORLD VALUE</span> and cannot be exchanged for real money or items of monetary value.
                  </p>
                  <p className="mb-2">
                    Our games are intended for adult audiences (18+) and simulate casino experiences for entertainment only. We do not promote or encourage real gambling activities. Cyber Casino Network does not offer any opportunity to win real money or prizes.
                  </p>
                  <p>
                    By using this platform, you acknowledge that you understand this is a simulation and agree to our <Link to="/terms" className="text-blue-400 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CYBER CASINO NETWORK. All rights reserved.</p>
            <div className="flex items-center justify-center mt-3 text-xs text-gray-600">
              <Shield className="h-3 w-3 mr-1" />
              <p>Responsible gaming practices encouraged. Play for fun, not profit.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
