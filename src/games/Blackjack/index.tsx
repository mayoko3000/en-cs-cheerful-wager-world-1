
import { useState } from 'react';
import HandDisplay from './HandDisplay';
import StatsDisplay from './StatsDisplay';
import ChipSelection from './ChipSelection';
import GameControls from './GameControls';
import StatisticsPanel from './components/StatisticsPanel';
import { useBlackjack } from './useBlackjack';
import { useGameHistory } from './hooks/useGameHistory';
import { calculateBlackjackPayout } from './utils/betUtils';
import './animations.css';

const Blackjack = () => {
  const [selectedChip, setSelectedChip] = useState(5);
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  
  const {
    dealerHand,
    playerHand,
    gameState,
    bet,
    balance,
    result,
    playerScore,
    dealerScore,
    stats,
    hasBlackjack,
    dealCards,
    hit,
    stand,
    resetGame
  } = useBlackjack();

  const {
    gameHistory,
    winStreak,
    bestWinStreak,
    worstLossStreak,
    addGameToHistory,
    getRecentWinRate,
    getTotalEarnings,
    getWinLossTrend
  } = useGameHistory(stats);
  
  // Add game to history when a game finishes
  if (gameState === 'finished' && result && gameHistory.length < stats.gamesPlayed) {
    const payout = result === 'win' 
      ? (hasBlackjack ? calculateBlackjackPayout(bet) : bet * 2)
      : 0;
    
    addGameToHistory(
      result,
      playerScore,
      dealerScore,
      bet,
      payout,
      hasBlackjack
    );
  }
  
  const handleSelectChip = (value: number) => {
    setSelectedChip(value);
  };

  const toggleStats = () => {
    setShowDetailedStats(!showDetailedStats);
  };
  
  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto rounded-xl">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 blackjack-bg"
      >
        <div className="absolute inset-0 bg-blue-900/30"></div>
      </div>
      
      <div className="relative z-10 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <StatsDisplay stats={stats} className="flex-1" />
          <button 
            onClick={toggleStats}
            className="px-4 py-2 bg-black/20 hover:bg-black/30 text-white text-sm rounded-md transition-colors"
          >
            {showDetailedStats ? "Hide Details" : "Show Details"}
          </button>
        </div>
        
        {showDetailedStats && (
          <StatisticsPanel 
            stats={stats}
            gameHistory={gameHistory}
            winStreak={winStreak}
            bestWinStreak={bestWinStreak}
            worstLossStreak={worstLossStreak}
            recentWinRate={getRecentWinRate()}
            totalEarnings={getTotalEarnings()}
            winLossTrend={getWinLossTrend()}
          />
        )}
        
        <div className="my-6 flex flex-col items-center">
          <div className="mb-6 w-full">
            <h3 className="text-white text-opacity-80 text-sm font-medium mb-2">Dealer's Hand</h3>
            <HandDisplay 
              hand={dealerHand}
              title="Dealer's Hand"
              score={dealerScore}
              isDealer={true}
              result={result}
              gameState={gameState}
            />
          </div>
          
          <div className="w-full">
            <h3 className="text-white text-opacity-80 text-sm font-medium mb-2">Your Hand</h3>
            <HandDisplay 
              hand={playerHand}
              title="Your Hand"
              score={playerScore}
              isDealer={false}
              result={result}
              gameState={gameState}
              hasBlackjack={hasBlackjack}
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <ChipSelection
            selectedChip={selectedChip as any}
            setChipValue={handleSelectChip}
            balance={balance}
          />
          
          <GameControls
            gameState={gameState}
            dealCards={dealCards}
            hit={hit}
            stand={stand}
            resetGame={resetGame}
          />
        </div>
      </div>
    </div>
  );
};

export default Blackjack;
