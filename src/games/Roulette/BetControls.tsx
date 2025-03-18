
import { Button } from '@/components/ui/button';
import { CirclePlus, CircleMinus, Trash2, ChevronsUpDown } from 'lucide-react';
import { BetType, Bet } from './types';
import { betTypes, getBetTypeColor } from './constants';

interface BetControlsProps {
  selectedBetType: BetType;
  setSelectedBetType: (type: BetType) => void;
  betAmount: number;
  adjustBetAmount: (amount: number) => void;
  balance: number;
  placeBet: () => void;
  spinning: boolean;
  bets: Bet[];
  clearBets: () => void;
}

const BetControls = ({
  selectedBetType,
  setSelectedBetType,
  betAmount,
  adjustBetAmount,
  balance,
  placeBet,
  spinning,
  bets,
  clearBets
}: BetControlsProps) => {
  return (
    <div className="mb-6">
      <div className="p-4 bg-gradient-to-b from-gray-800/70 to-gray-900/70 rounded-xl backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-white text-lg mb-3 font-semibold">Select Bet Type</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {betTypes.map((type) => (
            <Button
              key={type}
              className={`capitalize ${getBetTypeColor(type)} ${selectedBetType === type ? 'ring-2 ring-yellow-400 shadow-lg' : ''} transition-all duration-200 transform hover:scale-105`}
              onClick={() => setSelectedBetType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-gray-900/80 px-4 py-2 rounded-lg border border-gray-700">
            <Button
              size="sm"
              variant="ghost"
              className="text-white h-8 w-8 p-0 hover:bg-gray-700"
              onClick={() => adjustBetAmount(-5)}
              disabled={betAmount <= 5}
            >
              <CircleMinus className="h-5 w-5" />
            </Button>
            
            <span className="mx-3 text-xl font-bold text-white">{betAmount}</span>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white h-8 w-8 p-0 hover:bg-gray-700"
              onClick={() => adjustBetAmount(5)}
              disabled={betAmount >= 100 || betAmount >= balance}
            >
              <CirclePlus className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            onClick={placeBet}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold"
            disabled={spinning || betAmount > balance}
          >
            Place Bet
          </Button>
        </div>
      </div>
      
      {/* Active bets */}
      {bets.length > 0 && (
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-4 rounded-xl mb-4 mt-4 backdrop-blur-sm border border-gray-700/50">
          <div className="flex justify-between mb-3">
            <h3 className="text-white font-semibold flex items-center">
              <ChevronsUpDown className="h-4 w-4 mr-1 text-yellow-500" /> 
              Active Bets
            </h3>
            <Button 
              variant="ghost"
              size="sm"
              className="h-7 text-red-400 hover:text-red-300 hover:bg-red-900/30"
              onClick={clearBets}
              disabled={spinning}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {bets.map((bet, index) => (
              <div 
                key={index}
                className={`${getBetTypeColor(bet.type)} px-3 py-1.5 rounded-lg flex items-center shadow-md`}
              >
                <span className="text-white font-medium capitalize mr-2">{bet.type}</span>
                <span className="text-white font-bold bg-black/30 px-2 py-0.5 rounded">{bet.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BetControls;
