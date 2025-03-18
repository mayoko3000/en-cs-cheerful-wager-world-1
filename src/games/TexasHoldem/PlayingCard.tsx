
import React from 'react';
import { Card } from './types';
import { isRedSuit } from './utils/deckUtils';

interface PlayingCardProps {
  card: Card;
  hidden?: boolean;
  className?: string;
  animationDelay?: number;
}

const PlayingCard: React.FC<PlayingCardProps> = ({ 
  card, 
  hidden = false, 
  className = '',
  animationDelay = 0
}) => {
  const { suit, value } = card;
  const isRed = isRedSuit(suit);
  
  return (
    <div 
      className={`relative w-16 h-24 rounded-md shadow-md overflow-hidden transform transition-transform duration-300 ${className}`}
      style={{ 
        animation: `dealCard 0.5s ease-out ${animationDelay}s backwards`,
        transformStyle: 'preserve-3d'
      }}
    >
      {hidden ? (
        // Card back
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
          <div className="w-12 h-16 rounded border-2 border-white/30 flex items-center justify-center">
            <div className="text-white/70 text-lg">♠♥♦♣</div>
          </div>
        </div>
      ) : (
        // Card front
        <div className="absolute inset-0 bg-white flex flex-col p-1">
          <div className={`flex items-center justify-between px-1 ${isRed ? 'text-red-600' : 'text-slate-900'}`}>
            <div className="text-sm font-bold">{value}</div>
            <div className="text-sm">{suit}</div>
          </div>
          
          <div className={`flex-grow flex items-center justify-center ${isRed ? 'text-red-600' : 'text-slate-900'}`}>
            <div className="text-2xl font-bold">{suit}</div>
          </div>
          
          <div className={`flex items-center justify-between px-1 rotate-180 ${isRed ? 'text-red-600' : 'text-slate-900'}`}>
            <div className="text-sm font-bold">{value}</div>
            <div className="text-sm">{suit}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
