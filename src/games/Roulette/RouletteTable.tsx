
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bet } from './types';

interface RouletteTableProps {
  onPlaceBet: (number: number, type: string) => void;
  onClearBets: () => void;
  onSpin: () => void;
  selectedBetType: string;
  betAmount: number;
  bets: Bet[];
  balance: number;
  spinning: boolean;
}

const RouletteTable: React.FC<RouletteTableProps> = ({ 
  onPlaceBet, 
  onClearBets, 
  onSpin, 
  selectedBetType, 
  betAmount, 
  bets, 
  balance, 
  spinning 
}) => {
  // Generate numbers 1-36 plus 0
  const numbers = [0, ...Array.from({ length: 36 }, (_, i) => i + 1)];
  
  // Determine if a number has a bet on it
  const hasBet = (number: number) => {
    return bets.some(bet => 
      (bet.type === 'number' && bet.value === number) || 
      (bet.type === 'red' && [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number)) ||
      (bet.type === 'black' && [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].includes(number)) ||
      (bet.type === 'even' && number % 2 === 0 && number !== 0) ||
      (bet.type === 'odd' && number % 2 !== 0) ||
      (bet.type === '1-18' && number >= 1 && number <= 18) ||
      (bet.type === '19-36' && number >= 19 && number <= 36)
    );
  };
  
  const isRed = (number: number) => {
    return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number);
  };
  
  return (
    <div className="bg-green-800 p-6 rounded-xl border-4 border-yellow-900/70 shadow-lg">
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Button 
          variant="outline" 
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() => onPlaceBet(0, 'red')}
          disabled={spinning || balance < betAmount}
        >
          Red
        </Button>
        <Button 
          variant="outline" 
          className="bg-black hover:bg-gray-800 text-white"
          onClick={() => onPlaceBet(0, 'black')}
          disabled={spinning || balance < betAmount}
        >
          Black
        </Button>
        <Button 
          variant="outline" 
          className="bg-green-700 hover:bg-green-800 text-white"
          onClick={() => onPlaceBet(0, 'even')}
          disabled={spinning || balance < betAmount}
        >
          Even
        </Button>
        <Button 
          variant="outline" 
          className="bg-green-700 hover:bg-green-800 text-white"
          onClick={() => onPlaceBet(0, 'odd')}
          disabled={spinning || balance < betAmount}
        >
          Odd
        </Button>
        <Button 
          variant="outline" 
          className="bg-green-700 hover:bg-green-800 text-white"
          onClick={() => onPlaceBet(0, '1-18')}
          disabled={spinning || balance < betAmount}
        >
          1-18
        </Button>
        <Button 
          variant="outline" 
          className="bg-green-700 hover:bg-green-800 text-white"
          onClick={() => onPlaceBet(0, '19-36')}
          disabled={spinning || balance < betAmount}
        >
          19-36
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-6">
        <div className="col-span-1 flex items-center justify-center">
          <button 
            className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
              hasBet(0) ? 'bg-yellow-400 text-black' : 'bg-green-600 text-white'
            } hover:bg-green-500`}
            onClick={() => onPlaceBet(0, 'number')}
            disabled={spinning || balance < betAmount}
          >
            0
          </button>
        </div>
        
        <div className="col-span-2 grid grid-cols-6 gap-1">
          {numbers.slice(1).map(number => (
            <button 
              key={number}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                hasBet(number) ? 'bg-yellow-400 text-black' : 
                isRed(number) ? 'bg-red-600 text-white' : 'bg-black text-white'
              } hover:opacity-80`}
              onClick={() => onPlaceBet(number, 'number')}
              disabled={spinning || balance < betAmount}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between gap-4">
        <Button
          variant="default"
          className="bg-yellow-600 hover:bg-yellow-700 flex-1 h-12"
          onClick={onSpin}
          disabled={spinning || bets.length === 0}
        >
          SPIN
        </Button>
        
        <Button
          variant="outline"
          className="flex-1 h-12 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          onClick={onClearBets}
          disabled={spinning || bets.length === 0}
        >
          CLEAR BETS
        </Button>
      </div>
    </div>
  );
};

export default RouletteTable;
