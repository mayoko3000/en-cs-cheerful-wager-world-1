
import React from 'react';
import PlayingCard from './PlayingCard';
import { Card, GameStage } from './types';

interface CommunityCardsProps {
  cards: Card[];
  gameStage: GameStage;
}

const CommunityCards: React.FC<CommunityCardsProps> = ({ cards, gameStage }) => {
  // Determine how many cards to display based on game stage
  const visibleCards = gameStage === 'preFlop' ? 0 :
                      gameStage === 'flop' ? 3 :
                      gameStage === 'turn' ? 4 :
                      5;
  
  return (
    <div className="w-full">
      <h3 className="text-white text-opacity-80 text-sm font-medium mb-2">Community Cards</h3>
      <div className="bg-green-800/60 p-4 rounded-xl flex justify-center">
        <div className="flex gap-2 justify-center flex-wrap">
          {cards.slice(0, visibleCards).map((card, index) => (
            <PlayingCard 
              key={`community-${index}`}
              card={card}
              animationDelay={0.1 * index}
            />
          ))}
          
          {/* Placeholder cards */}
          {Array.from({ length: 5 - visibleCards }).map((_, index) => (
            <div 
              key={`placeholder-${index}`}
              className="w-16 h-24 rounded-md border-2 border-dashed border-white/20 flex items-center justify-center"
            >
              <span className="text-white/30 text-xs">
                {index === 0 && visibleCards === 0 ? 'Flop' : 
                 index === 0 && visibleCards === 3 ? 'Turn' :
                 index === 0 && visibleCards === 4 ? 'River' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityCards;
