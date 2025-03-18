
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMegaSlots } from './useMegaSlots';
import SlotDisplay from './SlotDisplay';
import WinDisplay from './WinDisplay';
import BetControls from './BetControls';

const MegaSlots = () => {
  const {
    reels,
    spinning,
    balance,
    bet,
    lastWin,
    winningLines,
    spinReels,
    adjustBet,
    addCredits
  } = useMegaSlots();
  
  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900">
      <div className="h-16 bg-gradient-to-r from-purple-700 to-purple-600 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white m-0 tracking-wide">MEGA SLOTS</h2>
      </div>
      
      <CardContent className="p-6">
        {/* Balance and Win display */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 rounded-lg shadow-inner border border-gray-700">
            <div className="flex items-center">
              <Coins className="h-5 w-5 mr-2 text-yellow-500" />
              <p className="text-sm font-medium text-gray-300">Balance</p>
            </div>
            <p className="text-2xl font-bold">{balance} <span className="text-xs font-normal text-gray-400">coins</span></p>
          </div>
        </div>
        
        {/* Slot display */}
        <div className="bg-gradient-to-b from-purple-800/50 to-purple-900/50 rounded-xl p-4 mb-4 shadow-inner">
          <SlotDisplay reels={reels} spinning={spinning} winningLines={winningLines} />
        </div>
        
        {/* Win display */}
        <WinDisplay lastWin={lastWin} />
        
        {/* Bet controls */}
        <BetControls bet={bet} adjustBet={adjustBet} disabled={spinning} />
        
        {/* Spin button */}
        <Button 
          className="w-full h-14 mt-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg transition-all"
          onClick={spinReels}
          disabled={spinning || balance < bet}
        >
          {spinning ? (
            <div className="flex items-center justify-center">
              <RotateCw className="mr-2 h-5 w-5 animate-spin" />
              <span className="animate-pulse">Spinning...</span>
            </div>
          ) : (
            "SPIN"
          )}
        </Button>
        
        {/* Add credits button */}
        <Button
          variant="outline"
          className="w-full mt-4 border-purple-500 hover:bg-purple-800/30 text-white"
          onClick={addCredits}
          disabled={spinning}
        >
          Add 100 Coins
        </Button>
      </CardContent>
    </Card>
  );
};

export default MegaSlots;
