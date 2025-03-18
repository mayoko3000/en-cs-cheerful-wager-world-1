
import { CreditDisplayProps } from './types';

const CreditDisplay = ({ credits, winAmount }: CreditDisplayProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <span className="text-yellow-300 font-semibold drop-shadow-md">Gold Coins: {credits}</span>
      </div>
      {winAmount > 0 && (
        <span className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-3 py-1 rounded-full font-bold animate-pulse shadow-lg">
          +{winAmount}
        </span>
      )}
    </div>
  );
};

export default CreditDisplay;
