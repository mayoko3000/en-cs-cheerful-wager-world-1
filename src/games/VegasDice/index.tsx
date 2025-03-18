
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, RotateCw, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { useVegasDice } from './useVegasDice';
import DiceDisplay from './DiceDisplay';
import BettingOptions from './BettingOptions';

const VegasDice = () => {
  const {
    dice,
    rolling,
    balance,
    bet,
    betType,
    lastWin,
    rollDice,
    setBetAmount,
    setBetType,
    addBalance
  } = useVegasDice();
  
  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      <div className="h-16 bg-gradient-to-r from-blue-700 to-blue-600 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white m-0 tracking-wide">VEGAS DICE</h2>
      </div>
      
      <CardContent className="p-6">
        {/* Balance display */}
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
        
        {/* Dice display */}
        <div className="px-4 py-6 bg-gradient-to-b from-blue-800/50 to-blue-900/50 rounded-xl backdrop-blur-sm my-4">
          <DiceDisplay dice={dice} rolling={rolling} />
        </div>
        
        {/* Betting options */}
        <BettingOptions 
          betAmount={bet}
          betType={betType}
          setBetAmount={setBetAmount}
          setBetType={setBetType}
          balance={balance}
          disabled={rolling}
        />
        
        {/* Roll button */}
        <Button 
          className="w-full h-14 mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg"
          onClick={rollDice}
          disabled={rolling || bet === 0}
        >
          {rolling ? (
            <div className="flex items-center justify-center">
              <RotateCw className="mr-2 h-5 w-5 animate-spin" />
              <span className="animate-pulse">Rolling...</span>
            </div>
          ) : (
            "Roll Dice"
          )}
        </Button>
        
        {/* Add balance button */}
        <Button
          className="w-full h-10 mt-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium"
          onClick={addBalance}
          disabled={rolling}
        >
          Add 100 Chips
        </Button>
      </CardContent>
    </Card>
  );
};

export default VegasDice;
