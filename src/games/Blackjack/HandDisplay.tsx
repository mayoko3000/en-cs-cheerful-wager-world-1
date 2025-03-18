
import { Card as CardType, GameResult, GameState } from './types';
import PlayingCard from './PlayingCard';

export interface HandDisplayProps {
  title: string;
  hand: CardType[];
  score: number;
  result?: GameResult;
  gameState?: GameState;
  hasBlackjack?: boolean;
  isDealer?: boolean;
}

const HandDisplay = ({ 
  title, 
  hand, 
  score, 
  result = '', 
  gameState = 'idle', 
  hasBlackjack = false, 
  isDealer = false 
}: HandDisplayProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-white font-medium">{title} {score > 0 && `(${score})`}</p>
        
        {isDealer && result === 'win' && gameState === 'finished' && (
          <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-bold">YOU WIN!</span>
        )}
        
        {!isDealer && hasBlackjack && (
          <span className="bg-purple-500 text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">BLACKJACK!</span>
        )}
        
        {!isDealer && result === 'lose' && gameState === 'finished' && (
          <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">DEALER WINS</span>
        )}
        
        {!isDealer && result === 'push' && gameState === 'finished' && (
          <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold">PUSH</span>
        )}
      </div>
      
      <div className="min-h-[100px] bg-green-800 rounded-lg p-3 flex flex-wrap gap-2">
        {hand.map((card, index) => (
          <PlayingCard key={index} card={card} index={index} total={hand.length} />
        ))}
      </div>
    </div>
  );
};

export default HandDisplay;
