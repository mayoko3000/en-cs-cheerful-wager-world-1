
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BetType } from './types';

interface BettingOptionsProps {
  betAmount: number;
  betType: BetType;
  setBetAmount: Dispatch<SetStateAction<number>>;
  setBetType: Dispatch<SetStateAction<BetType>>;
  balance: number;
  disabled: boolean;
}

const BettingOptions = ({ 
  betAmount, 
  betType, 
  setBetAmount, 
  setBetType, 
  balance, 
  disabled 
}: BettingOptionsProps) => {
  const handleQuickBet = (amount: number) => {
    if (amount <= balance) {
      setBetAmount(amount);
    }
  };
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setBetAmount(0);
    } else if (value > balance) {
      setBetAmount(balance);
    } else {
      setBetAmount(value);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-blue-800/30 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Place Your Bet</h3>
        
        <RadioGroup
          value={betType}
          onValueChange={(value) => setBetType(value as BetType)}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          disabled={disabled}
        >
          <div className="bg-blue-900/60 rounded-lg p-3 cursor-pointer hover:bg-blue-800/60 transition-colors">
            <RadioGroupItem value="high" id="high" className="sr-only" />
            <Label htmlFor="high" className="flex flex-col items-center cursor-pointer">
              <span className="text-xl font-bold mb-1">8-12</span>
              <span className="text-xs text-gray-300">Pays 1:1</span>
            </Label>
          </div>
          
          <div className="bg-blue-900/60 rounded-lg p-3 cursor-pointer hover:bg-blue-800/60 transition-colors">
            <RadioGroupItem value="low" id="low" className="sr-only" />
            <Label htmlFor="low" className="flex flex-col items-center cursor-pointer">
              <span className="text-xl font-bold mb-1">2-6</span>
              <span className="text-xs text-gray-300">Pays 1:1</span>
            </Label>
          </div>
          
          <div className="bg-blue-900/60 rounded-lg p-3 cursor-pointer hover:bg-blue-800/60 transition-colors">
            <RadioGroupItem value="seven" id="seven" className="sr-only" />
            <Label htmlFor="seven" className="flex flex-col items-center cursor-pointer">
              <span className="text-xl font-bold mb-1">7</span>
              <span className="text-xs text-gray-300">Pays 4:1</span>
            </Label>
          </div>
          
          <div className="bg-blue-900/60 rounded-lg p-3 cursor-pointer hover:bg-blue-800/60 transition-colors">
            <RadioGroupItem value="doubles" id="doubles" className="sr-only" />
            <Label htmlFor="doubles" className="flex flex-col items-center cursor-pointer">
              <span className="text-xl font-bold mb-1">Doubles</span>
              <span className="text-xs text-gray-300">Pays 5:1</span>
            </Label>
          </div>
          
          <div className="bg-blue-900/60 rounded-lg p-3 cursor-pointer hover:bg-blue-800/60 transition-colors">
            <RadioGroupItem value="field" id="field" className="sr-only" />
            <Label htmlFor="field" className="flex flex-col items-center cursor-pointer">
              <span className="text-xl font-bold mb-1">Field (3-10)</span>
              <span className="text-xs text-gray-300">Pays 1:1</span>
            </Label>
          </div>
          
          <div className="bg-blue-900/60 rounded-lg p-3 cursor-pointer hover:bg-blue-800/60 transition-colors">
            <RadioGroupItem value="hardway" id="hardway" className="sr-only" />
            <Label htmlFor="hardway" className="flex flex-col items-center cursor-pointer">
              <span className="text-xl font-bold mb-1">Hard way</span>
              <span className="text-xs text-gray-300">Pays 8:1</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="bg-blue-800/30 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Bet Amount</h3>
        
        <div className="flex gap-2 mb-3">
          <Button
            variant="outline"
            onClick={() => handleQuickBet(5)}
            disabled={disabled || balance < 5}
            className="flex-1 bg-blue-700/60 hover:bg-blue-600/60 text-white border-blue-500"
          >
            5
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickBet(10)}
            disabled={disabled || balance < 10}
            className="flex-1 bg-blue-700/60 hover:bg-blue-600/60 text-white border-blue-500"
          >
            10
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickBet(25)}
            disabled={disabled || balance < 25}
            className="flex-1 bg-blue-700/60 hover:bg-blue-600/60 text-white border-blue-500"
          >
            25
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickBet(50)}
            disabled={disabled || balance < 50}
            className="flex-1 bg-blue-700/60 hover:bg-blue-600/60 text-white border-blue-500"
          >
            50
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={betAmount}
            onChange={handleInput}
            min={0}
            max={balance}
            disabled={disabled}
            className="bg-blue-900/40 border-blue-700 text-white"
          />
          <Button
            variant="outline"
            onClick={() => setBetAmount(balance)}
            disabled={disabled || balance === 0}
            className="whitespace-nowrap bg-blue-700/60 hover:bg-blue-600/60 text-white border-blue-500"
          >
            Max
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BettingOptions;
