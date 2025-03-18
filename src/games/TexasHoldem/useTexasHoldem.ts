
import { useState, useEffect } from 'react';
import { Card, GameStage, GameResult, Player, GameStats, BettingAction } from './types';
import { createDeck, dealCards } from './utils/deckUtils';
import { determineWinner, findBestHand } from './utils/handEvaluator';

export const useTexasHoldem = () => {
  // Game state
  const [deck, setDeck] = useState<Card[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStage, setGameStage] = useState<GameStage>('idle');
  const [pot, setPot] = useState(0);
  const [result, setResult] = useState<GameResult>('');
  const [winners, setWinners] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentBet, setCurrentBet] = useState(0);
  const [minRaise, setMinRaise] = useState(10);
  
  // Game statistics
  const [stats, setStats] = useState<GameStats>({
    handsWon: 0,
    handsLost: 0,
    bestHand: null,
    biggestPot: 0,
    gamesPlayed: 0
  });
  
  // Initialize game with players
  const initializeGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    
    // Create players (1 human player + 3 AI opponents)
    const initialPlayers: Player[] = [
      {
        id: 0,
        name: 'You',
        cards: [],
        chips: 1000,
        betAmount: 0,
        folded: false,
        isAllIn: false,
        isDealer: true,
        isActive: true
      },
      {
        id: 1,
        name: 'Bob',
        cards: [],
        chips: 1000,
        betAmount: 0,
        folded: false,
        isAllIn: false,
        isSmallBlind: true,
        isActive: true
      },
      {
        id: 2,
        name: 'Alice',
        cards: [],
        chips: 1000,
        betAmount: 0,
        folded: false,
        isAllIn: false,
        isBigBlind: true,
        isActive: true
      },
      {
        id: 3,
        name: 'Charlie',
        cards: [],
        chips: 1000,
        betAmount: 0,
        folded: false,
        isAllIn: false,
        isActive: true
      }
    ];
    
    setPlayers(initialPlayers);
    setCommunityCards([]);
    setPot(0);
    setCurrentBet(0);
    setMinRaise(10);
    setGameStage('idle');
    setResult('');
    setWinners([]);
  };
  
  // Start a new hand
  const startHand = () => {
    if (gameStage !== 'idle') return;
    
    // Reset player states
    setPlayers(prevPlayers => 
      prevPlayers.map(player => ({
        ...player,
        cards: [],
        betAmount: 0,
        folded: false,
        isAllIn: false,
        handRank: undefined
      }))
    );
    
    // Deal cards to players
    const newDeck = createDeck();
    let remainingDeck = [...newDeck];
    const updatedPlayers = [...players];
    
    for (let i = 0; i < players.length; i++) {
      const { cards, remainingDeck: newRemainingDeck } = dealCards(remainingDeck, 2);
      updatedPlayers[i].cards = cards;
      remainingDeck = newRemainingDeck;
    }
    
    setDeck(remainingDeck);
    setPlayers(updatedPlayers);
    setCommunityCards([]);
    setPot(0);
    
    // Post blinds
    const smallBlindIdx = players.findIndex(p => p.isSmallBlind);
    const bigBlindIdx = players.findIndex(p => p.isBigBlind);
    
    const smallBlindAmount = 5;
    const bigBlindAmount = 10;
    
    // Process small blind
    placeBet(smallBlindIdx, smallBlindAmount);
    
    // Process big blind
    placeBet(bigBlindIdx, bigBlindAmount);
    
    setCurrentBet(bigBlindAmount);
    setMinRaise(bigBlindAmount);
    
    // Set first player to act (after big blind)
    setCurrentPlayerIndex((bigBlindIdx + 1) % players.length);
    
    // Start the pre-flop stage
    setGameStage('preFlop');
    setStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1
    }));
  };
  
  // Place a bet for a player
  const placeBet = (playerIndex: number, amount: number) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      const player = updatedPlayers[playerIndex];
      
      // Cap the bet at the player's remaining chips
      const actualBet = Math.min(amount, player.chips);
      
      // Update player's chips and bet amount
      player.chips -= actualBet;
      player.betAmount += actualBet;
      
      // Check if player is all in
      if (player.chips === 0) {
        player.isAllIn = true;
      }
      
      return updatedPlayers;
    });
    
    // Add the bet to the pot
    setPot(prevPot => prevPot + Math.min(amount, players[playerIndex].chips));
  };
  
  // Handle player's betting action
  const handleAction = (action: BettingAction, betAmount = 0) => {
    if (currentPlayerIndex !== 0) return; // Only handle actions for the human player
    
    const player = players[currentPlayerIndex];
    
    switch (action) {
      case 'fold':
        setPlayers(prevPlayers => {
          const updatedPlayers = [...prevPlayers];
          updatedPlayers[currentPlayerIndex].folded = true;
          return updatedPlayers;
        });
        break;
        
      case 'check':
        // Check is only valid if no bet is pending
        if (currentBet > player.betAmount) return;
        break;
        
      case 'call':
        // Call the current bet
        const callAmount = currentBet - player.betAmount;
        if (callAmount <= 0) return;
        
        placeBet(currentPlayerIndex, callAmount);
        break;
        
      case 'bet':
        // Place a bet (first bet in the round)
        if (currentBet > 0 || betAmount < minRaise) return;
        
        placeBet(currentPlayerIndex, betAmount);
        setCurrentBet(betAmount);
        setMinRaise(betAmount);
        break;
        
      case 'raise':
        // Raise the current bet
        const raiseTotal = currentBet + betAmount;
        const raiseAmount = raiseTotal - player.betAmount;
        
        if (raiseAmount < minRaise) return;
        
        placeBet(currentPlayerIndex, raiseAmount);
        setCurrentBet(raiseTotal);
        setMinRaise(betAmount);
        break;
    }
    
    // Move to the next player
    nextPlayer();
  };
  
  // AI player decision logic
  const makeAIDecision = (playerIndex: number) => {
    const player = players[playerIndex];
    if (player.folded || player.isAllIn) {
      nextPlayer();
      return;
    }
    
    // Simple AI logic
    const callAmount = currentBet - player.betAmount;
    const randomAction = Math.random();
    
    // Decision based on game stage and random factor
    setTimeout(() => {
      if (callAmount > player.chips / 2) {
        // Too expensive, likely fold
        if (randomAction < 0.7) {
          // Fold
          setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers[playerIndex].folded = true;
            return updatedPlayers;
          });
        } else {
          // Call
          placeBet(playerIndex, callAmount);
        }
      } else if (callAmount === 0) {
        // No bet to call, check or bet
        if (randomAction < 0.7) {
          // Check
        } else {
          // Bet
          const betAmount = Math.floor(minRaise + Math.random() * minRaise);
          placeBet(playerIndex, betAmount);
          setCurrentBet(player.betAmount + betAmount);
          setMinRaise(betAmount);
        }
      } else {
        // There's a bet to call
        if (randomAction < 0.5) {
          // Call
          placeBet(playerIndex, callAmount);
        } else if (randomAction < 0.8) {
          // Raise
          const raiseAmount = Math.floor(minRaise + Math.random() * minRaise);
          placeBet(playerIndex, callAmount + raiseAmount);
          setCurrentBet(currentBet + raiseAmount);
          setMinRaise(raiseAmount);
        } else {
          // Fold
          setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers[playerIndex].folded = true;
            return updatedPlayers;
          });
        }
      }
      
      // Move to next player
      nextPlayer();
    }, 1000); // Delay to simulate thinking
  };
  
  // Move to the next player
  const nextPlayer = () => {
    // Count active players (not folded and not all-in)
    const activePlayers = players.filter(p => !p.folded && !p.isAllIn);
    
    if (activePlayers.length <= 1) {
      // Only one active player left or everyone has acted
      progressToNextStage();
      return;
    }
    
    // Check if the round of betting is complete
    const everyoneHasActed = players.every(player => 
      player.folded || player.isAllIn || player.betAmount === currentBet
    );
    
    if (everyoneHasActed) {
      progressToNextStage();
      return;
    }
    
    // Find next player who hasn't folded or gone all-in
    let nextPlayerIdx = (currentPlayerIndex + 1) % players.length;
    while (players[nextPlayerIdx].folded || players[nextPlayerIdx].isAllIn) {
      nextPlayerIdx = (nextPlayerIdx + 1) % players.length;
    }
    
    setCurrentPlayerIndex(nextPlayerIdx);
    
    // If next player is AI, make their decision
    if (nextPlayerIdx !== 0) {
      makeAIDecision(nextPlayerIdx);
    }
  };
  
  // Progress to the next stage of the game
  const progressToNextStage = () => {
    // Reset betting for the new round
    setPlayers(prevPlayers => 
      prevPlayers.map(player => ({
        ...player,
        betAmount: 0
      }))
    );
    setCurrentBet(0);
    
    switch (gameStage) {
      case 'preFlop':
        // Deal the flop (first 3 community cards)
        const { cards: flopCards, remainingDeck: postFlopDeck } = dealCards(deck, 3);
        setCommunityCards(flopCards);
        setDeck(postFlopDeck);
        setGameStage('flop');
        break;
        
      case 'flop':
        // Deal the turn (4th community card)
        const { cards: [turnCard], remainingDeck: postTurnDeck } = dealCards(deck, 1);
        setCommunityCards(prevCards => [...prevCards, turnCard]);
        setDeck(postTurnDeck);
        setGameStage('turn');
        break;
        
      case 'turn':
        // Deal the river (5th community card)
        const { cards: [riverCard], remainingDeck: postRiverDeck } = dealCards(deck, 1);
        setCommunityCards(prevCards => [...prevCards, riverCard]);
        setDeck(postRiverDeck);
        setGameStage('river');
        break;
        
      case 'river':
        // Showdown - determine the winner
        handleShowdown();
        break;
    }
    
    // Reset current player to first active player after dealer
    if (gameStage !== 'river') {
      let nextPlayerIdx = 0;
      while (players[nextPlayerIdx].folded || players[nextPlayerIdx].isAllIn) {
        nextPlayerIdx = (nextPlayerIdx + 1) % players.length;
      }
      setCurrentPlayerIndex(nextPlayerIdx);
      
      // If next player is AI, make their decision
      if (nextPlayerIdx !== 0) {
        makeAIDecision(nextPlayerIdx);
      }
    }
  };
  
  // Handle the showdown
  const handleShowdown = () => {
    // All community cards should be dealt by now
    if (communityCards.length !== 5) return;
    
    // Determine the winners
    const winnerIds = determineWinner(
      players.map(p => ({ id: p.id, cards: p.cards, folded: p.folded })),
      communityCards
    );
    
    setWinners(winnerIds);
    
    // Split the pot among winners
    const winningsPerPlayer = Math.floor(pot / winnerIds.length);
    
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        if (winnerIds.includes(player.id)) {
          return {
            ...player,
            chips: player.chips + winningsPerPlayer
          };
        }
        return player;
      });
    });
    
    // Update stats
    const playerWon = winnerIds.includes(0);
    
    if (playerWon) {
      const { handRank } = findBestHand(players[0].cards, communityCards);
      
      setStats(prev => ({
        ...prev,
        handsWon: prev.handsWon + 1,
        bestHand: !prev.bestHand || 
          handRankValue(handRank) > handRankValue(prev.bestHand) ? 
          handRank : prev.bestHand,
        biggestPot: Math.max(prev.biggestPot, pot)
      }));
      
      setResult('win');
    } else {
      setStats(prev => ({
        ...prev,
        handsLost: prev.handsLost + 1
      }));
      
      setResult('lose');
    }
    
    setGameStage('showdown');
  };
  
  // Helper to convert hand rank to numeric value
  const handRankValue = (rank: string | null) => {
    const rankings = {
      'High Card': 1,
      'Pair': 2,
      'Two Pair': 3,
      'Three of a Kind': 4,
      'Straight': 5,
      'Flush': 6,
      'Full House': 7,
      'Four of a Kind': 8,
      'Straight Flush': 9,
      'Royal Flush': 10
    };
    
    return rank ? rankings[rank as keyof typeof rankings] : 0;
  };
  
  // Reset the game for a new hand
  const resetHand = () => {
    // Rotate dealer position and blinds
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      
      // Find current positions
      const dealerIdx = updatedPlayers.findIndex(p => p.isDealer);
      const smallBlindIdx = updatedPlayers.findIndex(p => p.isSmallBlind);
      const bigBlindIdx = updatedPlayers.findIndex(p => p.isBigBlind);
      
      // Remove current positions
      updatedPlayers[dealerIdx].isDealer = false;
      updatedPlayers[smallBlindIdx].isSmallBlind = false;
      updatedPlayers[bigBlindIdx].isBigBlind = false;
      
      // Set new positions
      const newDealerIdx = (dealerIdx + 1) % updatedPlayers.length;
      const newSmallBlindIdx = (newDealerIdx + 1) % updatedPlayers.length;
      const newBigBlindIdx = (newSmallBlindIdx + 1) % updatedPlayers.length;
      
      updatedPlayers[newDealerIdx].isDealer = true;
      updatedPlayers[newSmallBlindIdx].isSmallBlind = true;
      updatedPlayers[newBigBlindIdx].isBigBlind = true;
      
      return updatedPlayers;
    });
    
    setGameStage('idle');
    setResult('');
    setWinners([]);
  };
  
  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  // Initialize the game when the component mounts
  useEffect(() => {
    initializeGame();
  }, []);
  
  // Auto-trigger AI decisions when it's their turn
  useEffect(() => {
    if (gameStage !== 'idle' && gameStage !== 'showdown' && currentPlayerIndex !== 0) {
      makeAIDecision(currentPlayerIndex);
    }
  }, [currentPlayerIndex, gameStage]);
  
  return {
    // Game state
    players,
    communityCards,
    gameStage,
    pot,
    currentPlayerIndex,
    currentBet,
    result,
    winners,
    stats,
    
    // Player actions
    handleAction,
    startHand,
    resetHand,
    toggleSound,
    soundEnabled
  };
};
