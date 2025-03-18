
import { useEffect } from 'react';
import { ChipValue } from './types';
import { useGameState } from './hooks/useGameState';
import { useGameActions } from './hooks/useGameActions';
import { useBetManagement } from './hooks/useBetManagement';

export const useBlackjack = () => {
  // Game state management
  const gameState = useGameState();
  
  // Game actions
  const gameActions = useGameActions({
    ...gameState,
    soundEnabled: gameState.soundEnabled
  });
  
  // Bet management
  const betManagement = useBetManagement({
    bet: gameState.bet,
    setBet: gameState.setBet,
    balance: gameState.balance,
    selectedChip: gameState.selectedChip,
    setSelectedChip: gameState.setSelectedChip
  });

  // Initialize deck
  useEffect(() => {
    gameActions.resetDeck();
  }, []);
  
  const toggleSound = () => {
    gameState.setSoundEnabled(!gameState.soundEnabled);
  };

  return {
    // State
    deck: gameState.deck,
    playerHand: gameState.playerHand,
    dealerHand: gameState.dealerHand,
    gameState: gameState.gameState,
    playerScore: gameState.playerScore,
    dealerScore: gameState.dealerScore,
    bet: gameState.bet,
    balance: gameState.balance,
    result: gameState.result,
    soundEnabled: gameState.soundEnabled,
    stats: gameState.stats,
    hasBlackjack: gameState.hasBlackjack,
    selectedChip: gameState.selectedChip,
    
    // Actions
    dealCards: gameActions.dealCards,
    hit: gameActions.hit,
    stand: gameActions.stand,
    resetGame: gameActions.resetGame,
    
    // Bet management
    adjustBet: betManagement.adjustBet,
    setChipValue: betManagement.setChipValue,
    
    // Sound
    toggleSound
  };
};
