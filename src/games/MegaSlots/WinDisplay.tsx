
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface WinDisplayProps {
  lastWin: number;
}

const WinDisplay = ({ lastWin }: WinDisplayProps) => {
  if (lastWin <= 0) {
    return (
      <div className="h-16 flex items-center justify-center">
        <p className="text-gray-400 text-center">Spin to win!</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg mb-4 flex items-center justify-center"
    >
      <div className="flex items-center space-x-2">
        <Trophy className="h-6 w-6 text-yellow-900" />
        <div>
          <p className="text-sm font-medium text-yellow-900">You Won</p>
          <p className="text-2xl font-bold text-black">{lastWin} coins</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WinDisplay;
