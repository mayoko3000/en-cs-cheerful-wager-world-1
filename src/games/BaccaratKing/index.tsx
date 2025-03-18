
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBaccaratKing } from './useBaccaratKing';
import GameTable from './GameTable';
import CardDisplay from './CardDisplay';
import BetOptions from './BetOptions';

const BaccaratKing = () => {
  const {
    gameState,
    playerCards,
    bankerCards,
    playerScore,
    bankerScore,
    balance,
    bets,
    lastWin,
    roundResult,
    dealing,
    placeBet,
    clearBets,
    dealCards,
    addBalance
  } = useBaccaratKing();
  
  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="h-16 bg-gradient-to-r from-green-800 to-green-900 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white m-0 tracking-wide">BACCARAT KING</h2>
      </div>
      
      <CardContent className="p-6">
        {/* Balance display */}
        <div className="flex justify-between items-center mb-6">
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
              className="flex-1 ml-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <p className="text-sm font-medium text-yellow-900">Won</p>
              </div>
              <p className="text-2xl font-bold">{lastWin} <span className="text-xs font-normal text-yellow-900">chips</span></p>
            </motion.div>
          )}
        </div>
        
        {/* Game table with cards */}
        <GameTable 
          playerCards={playerCards}
          bankerCards={bankerCards}
          playerScore={playerScore}
          bankerScore={bankerScore}
          result={roundResult}
          dealing={dealing}
        />
        
        {/* Betting options */}
        <BetOptions 
          disabled={gameState !== 'betting' || dealing}
          bets={bets}
          balance={balance}
          placeBet={placeBet}
          clearBets={clearBets}
        />
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            variant="outline"
            className="h-12 bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
            onClick={addBalance}
            disabled={dealing}
          >
            Add 100 Chips
          </Button>
          
          <Button 
            className="h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold"
            onClick={dealCards}
            disabled={gameState === 'result' || dealing || (gameState === 'betting' && Object.values(bets).every(bet => bet === 0))}
          >
            {dealing ? (
              <div className="flex items-center justify-center">
                <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                <span className="animate-pulse">Dealing...</span>
              </div>
            ) : gameState === 'result' ? (
              "New Round"
            ) : (
              "Deal Cards"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaccaratKing;
