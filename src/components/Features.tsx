
import React from 'react';
import { Terminal, Trophy, Cpu } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Terminal className="h-8 w-8 text-casino-neon" />,
      title: "Instant Boot",
      description: "No neural downloads needed. Boot instantly in your browser with optimized netcode."
    },
    {
      icon: <Trophy className="h-8 w-8 text-casino-pink" />,
      title: "Daily Tournaments",
      description: "Compete against other netrunners in daily tournaments to win digital rewards."
    },
    {
      icon: <Cpu className="h-8 w-8 text-casino-purple" />,
      title: "Neural Connection",
      description: "Sync with friends, join private channels, and share your achievements."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 cyberpunk-grid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">WHY CHOOSE CYBER CASINO</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Experience next-gen entertainment on our cutting-edge digital platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-casino-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-casino-highlight group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-800 p-3 rounded-full mb-4 neon-border group-hover:animate-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:neon-text">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
