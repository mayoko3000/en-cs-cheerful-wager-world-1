
import { useState } from 'react';
import { GameState, GameResult, GameStats, Card, ChipValue } from '../types';
import { getInitialStats } from '../utils/statsUtils';

export const useGameState = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(200);
  const [result, setResult] = useState<GameResult>('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stats, setStats] = useState<GameStats>(getInitialStats());
  const [hasBlackjack, setHasBlackjack] = useState(false);
  const [selectedChip, setSelectedChip] = useState<ChipValue>(10);

  return {
    // State
    deck,
    setDeck,
    playerHand,
    setPlayerHand,
    dealerHand,
    setDealerHand,
    gameState,
    setGameState,
    playerScore,
    setPlayerScore,
    dealerScore,
    setDealerScore,
    bet,
    setBet,
    balance,
    setBalance,
    result,
    setResult,
    soundEnabled,
    setSoundEnabled,
    stats,
    setStats,
    hasBlackjack,
    setHasBlackjack,
    selectedChip,
    setSelectedChip
  };
};
