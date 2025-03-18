
import React from 'react';
import Hero from '@/components/Hero';
import Featured from '@/components/Featured';
import Features from '@/components/Features';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="page-transition bg-gray-900">
      <Hero />
      <Featured />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
