
import { motion } from 'framer-motion';
import { Card } from './types';
import CardDisplay from './CardDisplay';

interface GameTableProps {
  playerCards: Card[];
  bankerCards: Card[];
  playerScore: number;
  bankerScore: number;
  result: string | null;
  dealing: boolean;
}

const GameTable = ({ 
  playerCards, 
  bankerCards, 
  playerScore, 
  bankerScore, 
  result,
  dealing 
}: GameTableProps) => {
  return (
    <div className="bg-green-900 rounded-xl p-4 mb-6 relative overflow-hidden border border-green-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
          backgroundSize: '20px 20px',
        }}></div>
      </div>
      
      {/* Result overlay */}
      {result && !dealing && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60 z-20"
        >
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 px-8 py-4 rounded-lg text-center transform rotate-[-5deg] shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-1">{result}</h3>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="text-xs text-yellow-900">Player</p>
                <p className="text-xl font-bold">{playerScore}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-yellow-900">Banker</p>
                <p className="text-xl font-bold">{bankerScore}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="relative z-10">
        {/* Banker area */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Banker</h3>
            <div className="bg-green-800 px-3 py-1 rounded-full text-white font-bold">
              {bankerScore}
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            {bankerCards.map((card, index) => (
              <CardDisplay 
                key={index}
                card={card}
                delay={index * 0.2}
                position="banker"
                index={index}
              />
            ))}
            
            {/* Empty placeholder cards */}
            {Array.from({ length: 3 - bankerCards.length }).map((_, index) => (
              <div 
                key={`empty-banker-${index}`}
                className="w-16 h-24 md:w-20 md:h-28 border border-dashed border-green-600/50 rounded-md"
              ></div>
            ))}
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-dashed border-green-700 my-4"></div>
        
        {/* Player area */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Player</h3>
            <div className="bg-green-800 px-3 py-1 rounded-full text-white font-bold">
              {playerScore}
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            {playerCards.map((card, index) => (
              <CardDisplay 
                key={index}
                card={card}
                delay={index * 0.2 + 0.3}
                position="player"
                index={index}
              />
            ))}
            
            {/* Empty placeholder cards */}
            {Array.from({ length: 3 - playerCards.length }).map((_, index) => (
              <div 
                key={`empty-player-${index}`}
                className="w-16 h-24 md:w-20 md:h-28 border border-dashed border-green-600/50 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTable;
