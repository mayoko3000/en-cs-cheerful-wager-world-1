
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { BetType } from '@/games/Roulette/types'; // Reusing types

interface RouletteTableProps {
  onPlaceBet: (type: BetType, amount: number) => void;
  onSpin: () => void;
  selectedChipValue: number;
  bets: { type: BetType; amount: number }[];
  balance: number;
  spinning: boolean;
}

const RouletteTable = ({ 
  onPlaceBet, 
  onSpin, 
  selectedChipValue, 
  bets, 
  balance, 
  spinning 
}: RouletteTableProps) => {
  const getBetAmount = (type: BetType) => {
    const bet = bets.find(b => b.type === type);
    return bet ? bet.amount : 0;
  };
  
  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Button 
          variant="outline"
          className={`h-16 bg-red-600/30 hover:bg-red-600/50 text-white border border-red-500 ${getBetAmount('red') > 0 ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => onPlaceBet('red', selectedChipValue)}
          disabled={spinning || balance < selectedChipValue}
        >
          <div className="text-center">
            <div className="font-bold text-lg">RED</div>
            <div className="text-xs">Pays 1:1</div>
            {getBetAmount('red') > 0 && (
              <div className="mt-1 px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {getBetAmount('red')}
              </div>
            )}
          </div>
        </Button>
        
        <Button 
          variant="outline"
          className={`h-16 bg-green-600/30 hover:bg-green-600/50 text-white border border-green-500 ${getBetAmount('green') > 0 ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => onPlaceBet('green', selectedChipValue)}
          disabled={spinning || balance < selectedChipValue}
        >
          <div className="text-center">
            <div className="font-bold text-lg">0</div>
            <div className="text-xs">Pays 35:1</div>
            {getBetAmount('green') > 0 && (
              <div className="mt-1 px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {getBetAmount('green')}
              </div>
            )}
          </div>
        </Button>
        
        <Button 
          variant="outline"
          className={`h-16 bg-black hover:bg-gray-800 text-white border border-gray-500 ${getBetAmount('black') > 0 ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => onPlaceBet('black', selectedChipValue)}
          disabled={spinning || balance < selectedChipValue}
        >
          <div className="text-center">
            <div className="font-bold text-lg">BLACK</div>
            <div className="text-xs">Pays 1:1</div>
            {getBetAmount('black') > 0 && (
              <div className="mt-1 px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {getBetAmount('black')}
              </div>
            )}
          </div>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button 
          variant="outline"
          className={`h-12 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 ${getBetAmount('even') > 0 ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => onPlaceBet('even', selectedChipValue)}
          disabled={spinning || balance < selectedChipValue}
        >
          <div className="text-center flex items-center justify-between w-full">
            <span className="font-medium">EVEN</span>
            {getBetAmount('even') > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {getBetAmount('even')}
              </span>
            )}
          </div>
        </Button>
        
        <Button 
          variant="outline"
          className={`h-12 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 ${getBetAmount('odd') > 0 ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => onPlaceBet('odd', selectedChipValue)}
          disabled={spinning || balance < selectedChipValue}
        >
          <div className="text-center flex items-center justify-between w-full">
            <span className="font-medium">ODD</span>
            {getBetAmount('odd') > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {getBetAmount('odd')}
              </span>
            )}
          </div>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button 
          variant="outline"
          className={`h-12 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 ${getBetAmount('low') > 0 ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => onPlaceBet('low', selectedChipValue)}
          disabled={spinning || balance < selectedChipValue}
        >
          <div className="text-center flex items-center justify-between w-full">
            <span className="font-medium">1-18</span>
            {getBetAmount('low') > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {getBetAmount('low')}
              </span>
            )}
          </div>
        </Button>
        
        <Button 
          variant="outline"
          className={`h-12 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 ${getBetAmount('high') > 0 ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => onPlaceBet('high', selectedChipValue)}
          disabled={spinning || balance < selectedChipValue}
        >
          <div className="text-center flex items-center justify-between w-full">
            <span className="font-medium">19-36</span>
            {getBetAmount('high') > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {getBetAmount('high')}
              </span>
            )}
          </div>
        </Button>
      </div>
      
      <Button 
        className="w-full h-14 mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-lg"
        onClick={onSpin}
        disabled={spinning || bets.length === 0}
      >
        {spinning ? (
          <div className="flex items-center justify-center">
            <RotateCw className="mr-2 h-5 w-5 animate-spin" />
            <span className="animate-pulse">Spinning...</span>
          </div>
        ) : (
          "SPIN"
        )}
      </Button>
    </div>
  );
};

export default RouletteTable;
