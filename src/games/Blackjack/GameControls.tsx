
import { Button } from '@/components/ui/button';
import { Gem, RotateCw } from 'lucide-react';
import { GameState } from './types';

export interface GameControlsProps {
  gameState: GameState;
  dealCards: () => void;
  hit: () => void;
  stand: () => void;
  resetGame: () => void;
}

const GameControls = ({ gameState, dealCards, hit, stand, resetGame }: GameControlsProps) => {
  return (
    <div className="flex gap-3">
      {gameState === 'idle' && (
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          onClick={dealCards}
        >
          <Gem className="mr-2 h-4 w-4" />
          Deal Cards
        </Button>
      )}
      
      {gameState === 'playerTurn' && (
        <>
          <Button 
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            onClick={hit}
          >
            Hit
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            onClick={stand}
          >
            Stand
          </Button>
        </>
      )}
      
      {gameState === 'dealerTurn' && (
        <Button 
          className="flex-1 bg-gray-500"
          disabled
        >
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          Dealer's turn...
        </Button>
      )}
      
      {gameState === 'finished' && (
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          onClick={resetGame}
        >
          Play Again
        </Button>
      )}
    </div>
  );
};

export default GameControls;
