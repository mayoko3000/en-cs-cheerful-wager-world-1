
import GameCard from './game-card';
import { useEffect, useState } from 'react';

const Featured = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Automatically highlight games in sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % featuredGames.length);
      
      // Reset after one cycle
      setTimeout(() => setActiveIndex(-1), 1500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const featuredGames = [
    {
      id: 1,
      title: "Golden Fortune",
      image: "/lovable-uploads/592b4a94-6a74-43dd-945a-4e310324586c.png",
      players: 2453,
      category: "Wheel",
      popular: true,
      gameId: "fortune-wheel"
    },
    {
      id: 2,
      title: "Pirate's Treasure",
      image: "/lovable-uploads/b5d0018a-982e-4a09-afd8-d5af11493e37.png",
      players: 2189,
      category: "Adventure",
      popular: true,
      gameId: "slots"
    },
    {
      id: 3,
      title: "Texas Hold'em",
      image: "/lovable-uploads/3647cbe5-008b-4b76-abe8-2152b8131a53.png",
      players: 1892,
      category: "Poker",
      popular: true,
      gameId: "texas-holdem"
    },
    {
      id: 4,
      title: "Blackjack Pro",
      image: "/lovable-uploads/3a508639-2cb4-4b73-bb14-cbf2c04d7db3.png",
      players: 1245,
      category: "Card",
      popular: false,
      gameId: "blackjack"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 relative bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-casino-dark text-casino-highlight text-sm font-bold inline-block mb-4 neon-border">
            FEATURED SYSTEMS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">TOP-RATED SIMULATIONS</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Access our most advanced neural interfaces. Join thousands of netrunners in the ultimate digital experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredGames.map((game, index) => (
            <div 
              key={game.id} 
              className={`h-full transition-all duration-500 ${activeIndex === index ? 'scale-105 shadow-lg z-10' : ''}`}
            >
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
