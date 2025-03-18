
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { GameStage, BettingAction } from './types';

interface BettingControlsProps {
  gameStage: GameStage;
  currentPlayerIndex: number;
  currentBet: number;
  playerChips: number;
  playerBet: number;
  onAction: (action: BettingAction, betAmount?: number) => void;
}

const BettingControls: React.FC<BettingControlsProps> = ({
  gameStage,
  currentPlayerIndex,
  currentBet,
  playerChips,
  playerBet,
  onAction
}) => {
  const [betAmount, setBetAmount] = useState(10);
  const isPlayerTurn = currentPlayerIndex === 0;
  const callAmount = currentBet - playerBet;
  
  // Disable controls if it's not the player's turn or the game is in showdown
  const isDisabled = !isPlayerTurn || gameStage === 'showdown' || gameStage === 'idle';
  
  // Determine available actions
  const canCheck = currentBet === playerBet;
  const canCall = currentBet > playerBet;
  const canRaise = playerChips > callAmount;
  
  // Set minimum and maximum bet amounts
  const minBet = currentBet > 0 ? currentBet * 2 : 10;
  const maxBet = playerChips;
  
  return (
    <div className="mt-4 bg-slate-800/80 rounded-xl p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">Betting Controls</h3>
          
          {/* Pot and current bet display */}
          <div className="text-white text-sm">
            {currentBet > 0 && (
              <span className="mr-2 bg-yellow-600/70 px-2 py-1 rounded">
                Current Bet: {currentBet}
              </span>
            )}
            {callAmount > 0 && isPlayerTurn && (
              <span className="bg-blue-600/70 px-2 py-1 rounded">
                Call: {callAmount}
              </span>
            )}
          </div>
        </div>
        
        {/* Basic action buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            variant="outline"
            className="bg-red-500/20 hover:bg-red-500 hover:text-white border-red-500/50"
            disabled={isDisabled}
            onClick={() => onAction('fold')}
          >
            Fold
          </Button>
          
          <Button
            variant="outline"
            className="bg-blue-500/20 hover:bg-blue-500 hover:text-white border-blue-500/50"
            disabled={isDisabled || !canCheck}
            onClick={() => onAction('check')}
          >
            Check
          </Button>
          
          <Button
            variant="outline"
            className="bg-green-500/20 hover:bg-green-500 hover:text-white border-green-500/50"
            disabled={isDisabled || !canCall}
            onClick={() => onAction('call')}
          >
            Call {callAmount}
          </Button>
          
          <Button
            variant="outline"
            className="bg-purple-500/20 hover:bg-purple-500 hover:text-white border-purple-500/50"
            disabled={isDisabled || !canRaise}
            onClick={() => onAction(currentBet === 0 ? 'bet' : 'raise', betAmount)}
          >
            {currentBet === 0 ? 'Bet' : 'Raise'} {betAmount}
          </Button>
        </div>
        
        {/* Bet amount slider */}
        {canRaise && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Bet Amount</span>
              <span className="text-white text-sm">{betAmount}</span>
            </div>
            <Slider
              value={[betAmount]}
              min={minBet}
              max={maxBet}
              step={5}
              onValueChange={(values) => setBetAmount(values[0])}
              disabled={isDisabled || !canRaise}
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>Min: {minBet}</span>
              <span>Max: {maxBet}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BettingControls;
