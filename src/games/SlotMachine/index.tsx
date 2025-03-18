
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ReelDisplay from './ReelDisplay';
import Controls from './Controls';
import { useSlotMachine } from './useSlotMachine';

const SlotMachine = () => {
  const { 
    spinning, 
    results, 
    credits, 
    winAmount, 
    handleSpin, 
    resetCredits 
  } = useSlotMachine();
  
  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="h-16 bg-gradient-to-r from-yellow-600 to-yellow-800 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white m-0 tracking-wide">PIRATE'S TREASURE</h2>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 rounded-lg shadow-inner border border-gray-700">
            <p className="text-sm font-medium text-gray-300">Gold Coins</p>
            <p className="text-2xl font-bold">{credits}</p>
          </div>
          
          {winAmount > 0 && (
            <div className="flex-1 ml-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black p-3 rounded-lg">
              <p className="text-sm font-medium text-yellow-900">Win</p>
              <p className="text-2xl font-bold">{winAmount}</p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl mb-6 border border-amber-900/30">
          <ReelDisplay
            results={results}
            spinning={spinning}
          />
        </div>
        
        <Controls
          onSpin={handleSpin}
          onReset={resetCredits}
          credits={credits}
          winAmount={winAmount}
          spinning={spinning}
        />
      </CardContent>
    </Card>
  );
};

export default SlotMachine;
