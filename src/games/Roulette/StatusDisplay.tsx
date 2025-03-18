
import { motion } from 'framer-motion';
import { Coins, Trophy } from 'lucide-react';

interface StatusDisplayProps {
  balance: number;
  lastWin: number;
}

const StatusDisplay = ({ balance, lastWin }: StatusDisplayProps) => {
  return (
    <div className="flex justify-between items-center mb-6 gap-4">
      <div className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 rounded-lg shadow-inner border border-gray-700">
        <div className="flex items-center">
          <Coins className="h-5 w-5 mr-2 text-yellow-500" />
          <p className="text-sm font-medium text-gray-300">Balance</p>
        </div>
        <p className="text-2xl font-bold">{balance} <span className="text-xs font-normal text-gray-400">chips</span></p>
      </div>
      
      {lastWin > 0 && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black p-3 rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-900" />
            <p className="text-sm font-medium text-yellow-900">Won</p>
          </div>
          <p className="text-2xl font-bold">{lastWin} <span className="text-xs font-normal text-yellow-900">chips</span></p>
        </motion.div>
      )}
    </div>
  );
};

export default StatusDisplay;
