
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { BetType } from '@/games/Roulette/types'; // Reusing types

interface BetTrackerProps {
  bets: { type: BetType; amount: number }[];
  clearBets: () => void;
  spinning: boolean;
}

const BetTracker = ({ bets, clearBets, spinning }: BetTrackerProps) => {
  const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);
  
  const formatBetType = (type: BetType) => {
    switch (type) {
      case 'red': return 'Red';
      case 'black': return 'Black';
      case 'green': return 'Zero (0)';
      case 'even': return 'Even';
      case 'odd': return 'Odd';
      case 'high': return 'High (19-36)';
      case 'low': return 'Low (1-18)';
      default: return type;
    }
  };
  
  if (bets.length === 0) {
    return (
      <div className="bg-gray-800/80 p-4 rounded-lg mb-4">
        <p className="text-gray-400 text-center">No bets placed yet. Select a chip and place your bets!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800/80 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-semibold">Your Bets</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:text-white"
          onClick={clearBets}
          disabled={spinning}
        >
          <Trash className="h-4 w-4 mr-1" />
          <span>Clear</span>
        </Button>
      </div>
      
      <div className="space-y-2 mb-3 max-h-36 overflow-y-auto">
        {bets.map((bet, index) => (
          <div key={index} className="flex justify-between items-center text-sm bg-gray-700/50 p-2 rounded">
            <span className="text-gray-300">{formatBetType(bet.type)}</span>
            <span className="font-medium text-white">{bet.amount} chips</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
        <span className="text-gray-300">Total Bet:</span>
        <span className="font-bold text-yellow-400">{totalBet} chips</span>
      </div>
    </div>
  );
};

export default BetTracker;
