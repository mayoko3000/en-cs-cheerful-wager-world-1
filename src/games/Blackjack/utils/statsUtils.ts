
import { GameStats, GameResult } from '../types';

/**
 * Updates the game statistics based on the game result
 * @param currentStats Current game statistics
 * @param result Game result (win, lose, push)
 * @param hasBlackjack Whether the player had a blackjack
 * @returns Updated game statistics
 */
export const updateStats = (
  currentStats: GameStats, 
  result: GameResult, 
  hasBlackjack: boolean = false
): GameStats => {
  const updatedStats = { ...currentStats, gamesPlayed: currentStats.gamesPlayed + 1 };
  
  if (result === 'win') {
    updatedStats.wins += 1;
    if (hasBlackjack) {
      updatedStats.blackjacks += 1;
    }
  } else if (result === 'lose') {
    updatedStats.losses += 1;
  } else if (result === 'push') {
    updatedStats.pushes += 1;
  }
  
  return updatedStats;
};

/**
 * Calculates the win rate percentage
 * @param stats Game statistics
 * @returns Win rate as a percentage
 */
export const calculateWinRate = (stats: GameStats): number => {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.wins / stats.gamesPlayed) * 100);
};

/**
 * Resets game statistics to initial values
 * @returns Fresh game statistics object
 */
export const getInitialStats = (): GameStats => ({
  wins: 0,
  losses: 0,
  pushes: 0,
  blackjacks: 0,
  gamesPlayed: 0,
});

/**
 * Calculates the blackjack rate (percentage of wins that were blackjacks)
 * @param stats Game statistics
 * @returns Blackjack rate as a percentage
 */
export const calculateBlackjackRate = (stats: GameStats): number => {
  if (stats.wins === 0) return 0;
  return Math.round((stats.blackjacks / stats.wins) * 100);
};

/**
 * Calculates the push rate (percentage of games that ended in a push)
 * @param stats Game statistics
 * @returns Push rate as a percentage
 */
export const calculatePushRate = (stats: GameStats): number => {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.pushes / stats.gamesPlayed) * 100);
};

/**
 * Calculates the loss rate percentage
 * @param stats Game statistics
 * @returns Loss rate as a percentage
 */
export const calculateLossRate = (stats: GameStats): number => {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.losses / stats.gamesPlayed) * 100);
};
