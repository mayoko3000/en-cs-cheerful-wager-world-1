
import { Trophy } from 'lucide-react';

interface PrizeDisplayProps {
  prizeHistory: number[];
}

const PrizeDisplay = ({ prizeHistory }: PrizeDisplayProps) => {
  const lastFivePrizes = prizeHistory.slice(-5).reverse();
  
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-purple-800/30 to-purple-900/30 rounded-lg">
      <div className="flex items-center mb-2">
        <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
        <h3 className="text-lg font-semibold text-white">Recent Winnings</h3>
      </div>
      
      <div className="flex justify-center gap-2">
        {lastFivePrizes.length > 0 ? (
          lastFivePrizes.map((prize, index) => (
            <div 
              key={index} 
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold 
                ${prize >= 100 ? 'bg-yellow-500' : 
                  prize >= 50 ? 'bg-purple-500' : 
                    prize >= 25 ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
              {prize}
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No spins yet</div>
        )}
      </div>
    </div>
  );
};

export default PrizeDisplay;
