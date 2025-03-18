
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-casino-dark to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text animate-flicker">READY TO CONNECT?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Create your free account now and receive 5000 digital tokens to start your journey.
          </p>
          <Button 
            size="lg" 
            className="bg-casino-neon hover:bg-casino-blue text-gray-900 font-bold transition-all duration-300 group neon-border"
          >
            INITIALIZE ACCOUNT
            <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
