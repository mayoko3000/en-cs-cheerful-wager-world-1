
import React from 'react';
import PlayingCard from './PlayingCard';
import { Player, GameStage } from './types';
import { Coins, User, Crown } from 'lucide-react';

interface PlayerDisplayProps {
  player: Player;
  gameStage: GameStage;
  isCurrentPlayer: boolean;
  winners: number[];
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ 
  player, 
  gameStage,
  isCurrentPlayer,
  winners
}) => {
  const { id, name, cards, chips, betAmount, folded, isAllIn, isDealer, isSmallBlind, isBigBlind, handRank } = player;
  
  const isShowdown = gameStage === 'showdown';
  const isWinner = winners.includes(id);
  
  return (
    <div className={`bg-slate-800/60 rounded-xl p-3 flex flex-col ${isCurrentPlayer ? 'ring-2 ring-yellow-400 animate-pulse-soft' : ''} ${isWinner ? 'bg-green-800/60' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="text-white font-medium">{name}</div>
          
          {/* Player status indicators */}
          <div className="flex gap-1">
            {isDealer && (
              <div className="bg-white text-xs px-1 rounded text-slate-800 flex items-center">
                <Crown size={12} className="mr-0.5 text-yellow-500" />
                D
              </div>
            )}
            {isSmallBlind && (
              <div className="bg-white text-xs px-1 rounded text-slate-800">
                SB
              </div>
            )}
            {isBigBlind && (
              <div className="bg-white text-xs px-1 rounded text-slate-800">
                BB
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-white">
          <Coins size={16} className="text-yellow-400" />
          <span>{chips}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {cards.map((card, index) => (
            <PlayingCard 
              key={`player-${id}-card-${index}`}
              card={card}
              hidden={id !== 0 && !isShowdown}
              animationDelay={0.2 + (0.1 * index)}
            />
          ))}
        </div>
        
        {/* Player action indicators */}
        <div className="flex flex-col items-end">
          {betAmount > 0 && (
            <div className="bg-yellow-400/80 text-slate-900 px-2 py-1 rounded-full text-xs font-medium">
              Bet: {betAmount}
            </div>
          )}
          {folded && (
            <div className="bg-red-500/80 text-white px-2 py-1 rounded-full text-xs font-medium">
              Folded
            </div>
          )}
          {isAllIn && (
            <div className="bg-purple-500/80 text-white px-2 py-1 rounded-full text-xs font-medium">
              All In
            </div>
          )}
          {isShowdown && !folded && handRank && (
            <div className="bg-blue-500/80 text-white px-2 py-1 rounded-full text-xs font-medium mt-1">
              {handRank}
            </div>
          )}
          {isWinner && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold mt-1 animate-bounce">
              Winner
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDisplay;
