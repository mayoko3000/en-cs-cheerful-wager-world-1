
import { useState, useEffect } from 'react';
import { GameResult, GameStats } from '../types';

export interface GameHistoryEntry {
  id: number;
  result: GameResult;
  playerScore: number;
  dealerScore: number;
  bet: number;
  payout: number;
  hasBlackjack: boolean;
  timestamp: number;
}

export const useGameHistory = (stats: GameStats) => {
  const [gameHistory, setGameHistory] = useState<GameHistoryEntry[]>([]);
  const [winStreak, setWinStreak] = useState(0);
  const [bestWinStreak, setBestWinStreak] = useState(0);
  const [currentLossStreak, setCurrentLossStreak] = useState(0);
  const [worstLossStreak, setWorstLossStreak] = useState(0);

  // Add a new game to history
  const addGameToHistory = (
    result: GameResult,
    playerScore: number,
    dealerScore: number,
    bet: number,
    payout: number,
    hasBlackjack: boolean
  ) => {
    if (result === '') return; // Don't add games that haven't finished
    
    const newEntry: GameHistoryEntry = {
      id: gameHistory.length + 1,
      result,
      playerScore,
      dealerScore,
      bet,
      payout,
      hasBlackjack,
      timestamp: Date.now()
    };
    
    const newHistory = [...gameHistory, newEntry].slice(-20); // Keep only last 20 games
    setGameHistory(newHistory);
    
    // Update streaks
    if (result === 'win') {
      const newWinStreak = winStreak + 1;
      setWinStreak(newWinStreak);
      setBestWinStreak(Math.max(bestWinStreak, newWinStreak));
      setCurrentLossStreak(0);
    } else if (result === 'lose') {
      const newLossStreak = currentLossStreak + 1;
      setCurrentLossStreak(newLossStreak);
      setWorstLossStreak(Math.max(worstLossStreak, newLossStreak));
      setWinStreak(0);
    } else {
      // Push doesn't affect streaks
      setWinStreak(0);
      setCurrentLossStreak(0);
    }
  };

  // Reset all history
  const resetHistory = () => {
    setGameHistory([]);
    setWinStreak(0);
    setBestWinStreak(0);
    setCurrentLossStreak(0);
    setWorstLossStreak(0);
  };

  // Calculate win rate over the last n games
  const getRecentWinRate = (lastNGames: number = 10): number => {
    if (gameHistory.length === 0) return 0;
    
    const recentGames = gameHistory.slice(-Math.min(lastNGames, gameHistory.length));
    const wins = recentGames.filter(game => game.result === 'win').length;
    
    return Math.round((wins / recentGames.length) * 100);
  };

  // Get total earnings from history
  const getTotalEarnings = (): number => {
    return gameHistory.reduce((sum, game) => {
      if (game.result === 'win') {
        return sum + game.payout;
      } else if (game.result === 'lose') {
        return sum - game.bet;
      }
      return sum; // Push returns bet, no change
    }, 0);
  };

  // Get data for win/loss trend chart
  const getWinLossTrend = () => {
    if (gameHistory.length === 0) return [];
    
    return gameHistory.map((game, index) => ({
      game: index + 1,
      result: game.result === 'win' ? 1 : game.result === 'lose' ? -1 : 0
    }));
  };

  return {
    gameHistory,
    winStreak,
    bestWinStreak,
    currentLossStreak,
    worstLossStreak,
    addGameToHistory,
    resetHistory,
    getRecentWinRate,
    getTotalEarnings,
    getWinLossTrend
  };
};
