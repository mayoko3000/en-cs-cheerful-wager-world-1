
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { Bets } from './types';

interface BetOptionsProps {
  bets: Bets;
  balance: number;
  placeBet: (type: keyof Bets, amount: number) => void;
  clearBets: () => void;
  disabled: boolean;
}

const BetOptions = ({ bets, balance, placeBet, clearBets, disabled }: BetOptionsProps) => {
  const betOptions = [
    { 
      type: 'player' as keyof Bets, 
      label: 'Player', 
      payout: '1:1',
      color: 'blue' 
    },
    { 
      type: 'banker' as keyof Bets, 
      label: 'Banker', 
      payout: '0.95:1',
      color: 'red' 
    },
    { 
      type: 'tie' as keyof Bets, 
      label: 'Tie', 
      payout: '8:1',
      color: 'green' 
    }
  ];
  
  const increaseBet = (type: keyof Bets, amount: number) => {
    if (balance >= amount) {
      placeBet(type, amount);
    }
  };
  
  const decreaseBet = (type: keyof Bets, amount: number) => {
    if (bets[type] >= amount) {
      placeBet(type, -amount);
    }
  };
  
  const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Place Your Bets</h3>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Total bet: <span className="font-bold text-white">{totalBet}</span></span>
          <Button
            variant="outline"
            size="sm"
            onClick={clearBets}
            disabled={disabled || totalBet === 0}
            className="h-8 text-xs border-gray-600 hover:bg-gray-700"
          >
            Clear Bets
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {betOptions.map(option => (
          <div
            key={option.type}
            className={`bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4 border ${
              option.color === 'blue' ? 'border-blue-600' :
              option.color === 'red' ? 'border-red-600' : 'border-green-600'
            }`}
          >
            <div className="text-center mb-2">
              <h4 className={`text-lg font-bold ${
                option.color === 'blue' ? 'text-blue-400' :
                option.color === 'red' ? 'text-red-400' : 'text-green-400'
              }`}>
                {option.label}
              </h4>
              <p className="text-xs text-gray-400">Pays {option.payout}</p>
            </div>
            
            <div className="bg-gray-800 rounded p-2 mb-3 text-center">
              <span className="text-lg font-bold text-white">{bets[option.type]}</span>
              <span className="text-xs text-gray-400 ml-1">chips</span>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => decreaseBet(option.type, 5)}
                disabled={disabled || bets[option.type] < 5}
                className={`flex-1 h-8 border-gray-600 ${
                  option.color === 'blue' ? 'hover:border-blue-500' :
                  option.color === 'red' ? 'hover:border-red-500' : 'hover:border-green-500'
                }`}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => increaseBet(option.type, 5)}
                disabled={disabled || balance < 5}
                className={`flex-1 h-8 border-gray-600 ${
                  option.color === 'blue' ? 'hover:border-blue-500' :
                  option.color === 'red' ? 'hover:border-red-500' : 'hover:border-green-500'
                }`}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => increaseBet(option.type, 10)}
                disabled={disabled || balance < 10}
                className={`flex-1 h-8 border-gray-600 text-xs ${
                  option.color === 'blue' ? 'hover:border-blue-500' :
                  option.color === 'red' ? 'hover:border-red-500' : 'hover:border-green-500'
                }`}
              >
                +10
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => increaseBet(option.type, 25)}
                disabled={disabled || balance < 25}
                className={`flex-1 h-8 border-gray-600 text-xs ${
                  option.color === 'blue' ? 'hover:border-blue-500' :
                  option.color === 'red' ? 'hover:border-red-500' : 'hover:border-green-500'
                }`}
              >
                +25
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetOptions;
