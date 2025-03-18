
import { useState, useEffect } from 'react';
import { Card, Bets, GameState } from './types';

// Create a deck of cards
const createDeck = (): Card[] => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
  const deck: Card[] = [];
  
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  
  return deck;
};

// Shuffle the deck
const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get card value for Baccarat scoring
const getCardValue = (card: Card): number => {
  if (['jack', 'queen', 'king', '10'].includes(card.value)) return 0;
  if (card.value === 'ace') return 1;
  return parseInt(card.value);
};

// Calculate hand score
const calculateScore = (cards: Card[]): number => {
  const sum = cards.reduce((total, card) => total + getCardValue(card), 0);
  return sum % 10; // Baccarat scoring: only the last digit matters
};

// Determine winner based on scores
const determineWinner = (playerScore: number, bankerScore: number): 'player' | 'banker' | 'tie' => {
  if (playerScore > bankerScore) return 'player';
  if (bankerScore > playerScore) return 'banker';
  return 'tie';
};

// Calculate winnings based on bets and result
const calculateWinnings = (bets: Bets, result: 'player' | 'banker' | 'tie'): number => {
  let winnings = 0;
  
  if (result === 'player' && bets.player > 0) {
    winnings += bets.player * 2; // 1:1 payout
  }
  
  if (result === 'banker' && bets.banker > 0) {
    winnings += bets.banker * 1.95; // 0.95:1 payout (5% commission)
  }
  
  if (result === 'tie' && bets.tie > 0) {
    winnings += bets.tie * 9; // 8:1 payout
  }
  
  return winnings;
};

export const useBaccaratKing = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [bets, setBets] = useState<Bets>({ player: 0, banker: 0, tie: 0 });
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [bankerCards, setBankerCards] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [bankerScore, setBankerScore] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>('betting');
  const [lastWin, setLastWin] = useState<number>(0);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [dealing, setDealing] = useState<boolean>(false);

  // Place a bet
  const placeBet = (type: keyof Bets, amount: number) => {
    if (gameState !== 'betting') return;
    
    // Ensure the player has enough balance
    if (amount > 0 && balance < amount) return;
    
    const newBets = { ...bets };
    newBets[type] += amount;
    
    // Update balance
    setBalance(prevBalance => prevBalance - amount);
    setBets(newBets);
  };

  // Clear all bets
  const clearBets = () => {
    if (gameState !== 'betting') return;
    
    // Refund bets to balance
    const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    setBalance(prevBalance => prevBalance + totalBet);
    setBets({ player: 0, banker: 0, tie: 0 });
  };

  // Deal cards and resolve the round
  const dealCards = async () => {
    if (gameState === 'dealing') return;
    
    const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    if (gameState === 'betting' && totalBet === 0) return;
    
    setRoundResult(null);
    setDealing(true);
    
    if (gameState === 'result') {
      // Start a new round
      setPlayerCards([]);
      setBankerCards([]);
      setGameState('betting');
      setBets({ player: 0, banker: 0, tie: 0 });
      setDealing(false);
      return;
    }
    
    setGameState('dealing');
    
    // Reset
    let newDeck = [...deck];
    if (newDeck.length < 10) {
      newDeck = shuffleDeck(createDeck());
    }
    
    // Deal initial cards (2 each)
    const newPlayerCards: Card[] = [];
    const newBankerCards: Card[] = [];
    
    // First card to player
    newPlayerCards.push(newDeck.pop()!);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // First card to banker
    newBankerCards.push(newDeck.pop()!);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Second card to player
    newPlayerCards.push(newDeck.pop()!);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Second card to banker
    newBankerCards.push(newDeck.pop()!);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setPlayerCards(newPlayerCards);
    setBankerCards(newBankerCards);
    
    // Calculate initial scores
    const pScore = calculateScore(newPlayerCards);
    const bScore = calculateScore(newBankerCards);
    
    setPlayerScore(pScore);
    setBankerScore(bScore);
    
    // Baccarat rules for drawing a third card
    let finalPlayerCards = [...newPlayerCards];
    let finalBankerCards = [...newBankerCards];
    
    // Player draws a third card if score is 0-5
    if (pScore <= 5) {
      const thirdCard = newDeck.pop()!;
      finalPlayerCards.push(thirdCard);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPScore = calculateScore(finalPlayerCards);
      setPlayerCards(finalPlayerCards);
      setPlayerScore(newPScore);
      
      // Banker drawing rules based on player's third card
      const playerThirdCardValue = getCardValue(thirdCard);
      
      if (
        (bScore <= 2) || 
        (bScore === 3 && playerThirdCardValue !== 8) ||
        (bScore === 4 && playerThirdCardValue >= 2 && playerThirdCardValue <= 7) ||
        (bScore === 5 && playerThirdCardValue >= 4 && playerThirdCardValue <= 7) ||
        (bScore === 6 && playerThirdCardValue >= 6 && playerThirdCardValue <= 7)
      ) {
        const bankerThirdCard = newDeck.pop()!;
        finalBankerCards.push(bankerThirdCard);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newBScore = calculateScore(finalBankerCards);
        setBankerCards(finalBankerCards);
        setBankerScore(newBScore);
      }
    } 
    // If player stands, banker draws with score 0-5
    else if (bScore <= 5) {
      const bankerThirdCard = newDeck.pop()!;
      finalBankerCards.push(bankerThirdCard);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newBScore = calculateScore(finalBankerCards);
      setBankerCards(finalBankerCards);
      setBankerScore(newBScore);
    }
    
    // Update deck
    setDeck(newDeck);
    
    // Update final scores
    const finalPScore = calculateScore(finalPlayerCards);
    const finalBScore = calculateScore(finalBankerCards);
    
    // Determine winner
    const winner = determineWinner(finalPScore, finalBScore);
    
    // Calculate winnings
    const winnings = calculateWinnings(bets, winner);
    
    // Update balance with winnings
    if (winnings > 0) {
      setBalance(prevBalance => prevBalance + winnings);
      setLastWin(winnings);
    } else {
      setLastWin(0);
    }
    
    // Display result
    let resultText = '';
    if (winner === 'player') {
      resultText = 'Player Wins!';
    } else if (winner === 'banker') {
      resultText = 'Banker Wins!';
    } else {
      resultText = 'Tie!';
    }
    
    setRoundResult(resultText);
    
    // End round
    setGameState('result');
    setDealing(false);
  };

  // Add balance (for demo purposes)
  const addBalance = () => {
    setBalance(prevBalance => prevBalance + 100);
  };

  return {
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
  };
};
