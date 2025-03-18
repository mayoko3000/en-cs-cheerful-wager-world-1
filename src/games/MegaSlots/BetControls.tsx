
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface BetControlsProps {
  bet: number;
  adjustBet: (amount: number) => void;
  disabled: boolean;
}

const BetControls = ({ bet, adjustBet, disabled }: BetControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => adjustBet(-5)}
        disabled={disabled || bet <= 5}
        className="h-10 w-10 rounded-full bg-purple-900 border-purple-600 hover:bg-purple-800 text-white"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <div className="w-24 h-10 bg-purple-900/80 rounded-full border border-purple-600 flex items-center justify-center">
        <span className="font-bold text-white">{bet}</span>
        <span className="text-xs text-gray-300 ml-1">coins</span>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => adjustBet(5)}
        disabled={disabled}
        className="h-10 w-10 rounded-full bg-purple-900 border-purple-600 hover:bg-purple-800 text-white"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BetControls;
