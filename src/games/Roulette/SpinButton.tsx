
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface SpinButtonProps {
  spin: () => void;
  spinning: boolean;
  betsExist: boolean;
}

const SpinButton = ({ spin, spinning, betsExist }: SpinButtonProps) => {
  return (
    <Button 
      className="w-full h-14 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-lg border-b-4 border-red-900 hover:border-red-950 transition-all duration-200"
      onClick={spin}
      disabled={spinning || !betsExist}
    >
      {spinning ? (
        <div className="flex items-center justify-center">
          <RotateCw className="mr-2 h-5 w-5 animate-spin" />
          <span className="animate-pulse">Spinning...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="mr-1">Spin The Wheel</span>
          <span className="text-yellow-300">!</span>
        </div>
      )}
    </Button>
  );
};

export default SpinButton;
