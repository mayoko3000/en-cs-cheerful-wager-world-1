
import React from 'react';
import { useTexasHoldem } from './useTexasHoldem';
import CommunityCards from './CommunityCards';
import PlayerDisplay from './PlayerDisplay';
import BettingControls from './BettingControls';
import StatusDisplay from './StatusDisplay';
import { Button } from '@/components/ui/button';
import { PlayCircle, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import './styles.css';

const TexasHoldem: React.FC = () => {
  const {
    players,
    communityCards,
    gameStage,
    pot,
    currentPlayerIndex,
    currentBet,
    result,
    winners,
    stats,
    handleAction,
    startHand,
    resetHand,
    toggleSound,
    soundEnabled
  } = useTexasHoldem();
  
  // Safety check - if players array is empty or undefined, provide fallback
  const humanPlayer = players && players.length > 0 ? players[0] : { id: 0, chips: 0, betAmount: 0 };
  
  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-90 z-0 poker-bg" 
      >
        <div className="absolute inset-0 bg-slate-900/20"></div>
      </div>
      
      <div className="relative z-10 p-4 md:p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Texas Hold'em Poker</h2>
          
          <div className="flex gap-2">
            {/* Sound toggle button */}
            <Button 
              variant="outline" 
              size="icon"
              className="bg-white/10 text-white border-0 hover:bg-white/20"
              onClick={toggleSound}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </Button>
            
            {/* Game control buttons */}
            {gameStage === 'idle' ? (
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={startHand}
              >
                <PlayCircle size={18} />
                Start Hand
              </Button>
            ) : gameStage === 'showdown' ? (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={resetHand}
              >
                <RotateCcw size={18} />
                Next Hand
              </Button>
            ) : null}
          </div>
        </div>
        
        {/* Game status and statistics */}
        <StatusDisplay 
          gameStage={gameStage}
          result={result}
          pot={pot}
          stats={stats}
        />
        
        {/* Community cards */}
        <div className="my-4">
          <CommunityCards 
            cards={communityCards}
            gameStage={gameStage}
          />
        </div>
        
        {/* Pot display */}
        <div className="bg-yellow-600/40 text-white text-center py-2 rounded-lg mb-4">
          <span className="font-medium">Current Pot: {pot}</span>
        </div>
        
        {/* Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {players && players.map(player => (
            <PlayerDisplay 
              key={player.id}
              player={player}
              gameStage={gameStage}
              isCurrentPlayer={currentPlayerIndex === player.id}
              winners={winners || []}
            />
          ))}
        </div>
        
        {/* Betting controls for human player */}
        <BettingControls 
          gameStage={gameStage}
          currentPlayerIndex={currentPlayerIndex}
          currentBet={currentBet}
          playerChips={humanPlayer.chips}
          playerBet={humanPlayer.betAmount}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default TexasHoldem;
