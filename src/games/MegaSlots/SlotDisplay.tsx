
import { motion } from 'framer-motion';
import { Symbol } from './types';

interface SlotDisplayProps {
  reels: Symbol[][];
  spinning: boolean;
  winningLines: number[][];
}

const SlotDisplay = ({ reels, spinning, winningLines }: SlotDisplayProps) => {
  const renderSymbol = (symbol: Symbol) => {
    switch (symbol) {
      case 'seven':
        return '7️⃣';
      case 'bar':
        return '📊';
      case 'cherry':
        return '🍒';
      case 'lemon':
        return '🍋';
      case 'watermelon':
        return '🍉';
      case 'bell':
        return '🔔';
      case 'diamond':
        return '💎';
      case 'wild':
        return '⭐';
      default:
        return '❓';
    }
  };
  
  const isSymbolInWinningLine = (reelIndex: number, symbolIndex: number) => {
    return winningLines.some(line => line.includes(reelIndex * 3 + symbolIndex));
  };
  
  return (
    <div className="relative flex justify-center gap-2 md:gap-4 p-2 bg-purple-900 rounded-lg border-2 border-purple-700">
      {/* Slot machine frame */}
      <div className="absolute inset-0 rounded-lg border-8 border-purple-800 pointer-events-none"></div>
      
      {reels.map((reel, reelIndex) => (
        <div 
          key={reelIndex} 
          className="relative flex-1 h-48 md:h-64 bg-gray-900 rounded-md overflow-hidden"
        >
          <motion.div
            className="flex flex-col items-center"
            animate={spinning ? {
              y: [0, -100, -50, 0, -30, 0],
              transition: {
                duration: 1 + reelIndex * 0.3,
                ease: "easeInOut"
              }
            } : {}}
          >
            {reel.map((symbol, symbolIndex) => (
              <motion.div 
                key={symbolIndex}
                className={`flex items-center justify-center w-full h-16 md:h-[88px] text-4xl md:text-5xl
                  ${isSymbolInWinningLine(reelIndex, symbolIndex) && !spinning 
                    ? 'bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 animate-pulse' 
                    : 'bg-transparent'}`}
                animate={
                  isSymbolInWinningLine(reelIndex, symbolIndex) && !spinning ? 
                  { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } } : 
                  {}
                }
              >
                {renderSymbol(symbol)}
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
      
      {/* Payline indicator */}
      <div className="absolute left-0 top-1/2 w-2 h-2 bg-yellow-500 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-yellow-500 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute left-2 right-2 top-1/2 border-t-2 border-dashed border-yellow-500/50 transform -translate-y-1/2 z-10"></div>
    </div>
  );
};

export default SlotDisplay;
