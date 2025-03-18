
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { ControlsProps } from './types';

const Controls = ({ onSpin, onReset, credits, winAmount, spinning }: ControlsProps) => {
  return (
    <div className="flex space-x-3">
      <Button 
        onClick={onSpin} 
        disabled={spinning}
        className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-700 hover:from-yellow-600 hover:to-amber-800 text-white font-bold border-2 border-yellow-400 shadow-lg disabled:opacity-70"
      >
        {spinning ? (
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {spinning ? "Searching..." : "Hunt Treasure (5 Coins)"}
      </Button>
      
      <Button 
        onClick={onReset} 
        variant="outline"
        className="px-3 text-yellow-300 border-yellow-500 hover:text-yellow-200 hover:border-yellow-400 bg-black/30 hover:bg-black/50"
      >
        Reset
      </Button>
    </div>
  );
};

export default Controls;
