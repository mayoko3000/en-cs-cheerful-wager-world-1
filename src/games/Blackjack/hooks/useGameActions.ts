
import { toast } from '@/components/ui/use-toast';
import { Card, GameState, GameResult, GameStats, ChipValue } from '../types';
import { createNewDeck, drawCard } from '../utils/deckUtils';
import { calculateScore, determineWinner, checkForBlackjack } from '../utils/gameLogic';
import { validateBet, calculateBlackjackPayout } from '../utils/betUtils';
import { updateStats } from '../utils/statsUtils';
import { useSound } from '../useSound';

export interface GameStateProps {
  deck: Card[];
  setDeck: (deck: Card[]) => void;
  playerHand: Card[];
  setPlayerHand: (hand: Card[]) => void;
  dealerHand: Card[];
  setDealerHand: (hand: Card[]) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  playerScore: number;
  setPlayerScore: (score: number) => void;
  dealerScore: number;
  setDealerScore: (score: number) => void;
  bet: number;
  setBet: (bet: number) => void;
  balance: number;
  setBalance: (balance: number) => void;
  result: GameResult;
  setResult: (result: GameResult) => void;
  stats: GameStats;
  setStats: (stats: GameStats) => void;
  hasBlackjack: boolean;
  setHasBlackjack: (hasBlackjack: boolean) => void;
  soundEnabled: boolean;
}

export const useGameActions = ({
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
  stats,
  setStats,
  hasBlackjack,
  setHasBlackjack,
  soundEnabled
}: GameStateProps) => {
  const { dealSound, winSound, loseSound, cardSound, playSound } = useSound(soundEnabled);
  
  const resetDeck = () => {
    setDeck(createNewDeck());
  };

  const dealCards = () => {
    if (!validateBet(bet, balance)) return;

    setBalance(balance - bet);
    setResult('');
    setGameState('playing');
    setHasBlackjack(false);
    
    const newDeck = [...deck];
    
    // Add animation delays to cards
    const playerCard1 = drawCard(newDeck);
    playerCard1.animationDelay = 0;
    
    const dealerCard1 = drawCard(newDeck);
    dealerCard1.animationDelay = 300;
    
    const playerCard2 = drawCard(newDeck);
    playerCard2.animationDelay = 600;
    
    const dealerCard2 = drawCard(newDeck);
    dealerCard2.hidden = true;
    dealerCard2.animationDelay = 900;
    
    const newPlayerHand = [playerCard1, playerCard2];
    const newDealerHand = [dealerCard1, dealerCard2];
    
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    
    const pScore = calculateScore(newPlayerHand);
    setPlayerScore(pScore);
    setDealerScore(calculateScore([newDealerHand[0]])); // Only count visible cards
    
    playSound(dealSound.current);
    
    // Check for blackjack
    if (checkForBlackjack(pScore)) {
      handlePlayerBlackjack(newDealerHand);
    } else {
      setGameState('playerTurn');
    }
  };

  const handlePlayerBlackjack = (dealerCards: Card[]) => {
    setHasBlackjack(true);
    const updatedStats = updateStats(stats, 'win', true);
    setStats(updatedStats);
    
    // Reveal dealer's hidden card after a delay
    setTimeout(() => {
      const updatedDealerHand = dealerCards.map(card => ({ ...card, hidden: false }));
      setDealerHand(updatedDealerHand);
      const dScore = calculateScore(updatedDealerHand);
      setDealerScore(dScore);
      
      if (dScore === 21) {
        // Push if dealer also has blackjack
        setResult('push');
        setBalance(balance + bet);
        setStats({
          ...stats,
          pushes: stats.pushes + 1,
          gamesPlayed: stats.gamesPlayed + 1
        });
        toast({
          title: "Push!",
          description: "Both you and the dealer have Blackjack. Your bet has been returned.",
        });
      } else {
        // Player wins with blackjack (pays 3:2)
        const blackjackPayout = calculateBlackjackPayout(bet);
        setResult('win');
        setBalance(balance + blackjackPayout);
        toast({
          title: "Blackjack!",
          description: `You win ${blackjackPayout} chips with a Blackjack!`,
        });
        playSound(winSound.current);
      }
      
      setGameState('finished');
    }, 1500);
  };

  const hit = () => {
    if (gameState !== 'playerTurn') return;
    
    const newDeck = [...deck];
    const newCard = drawCard(newDeck);
    const newHand = [...playerHand, newCard];
    const newScore = calculateScore(newHand);
    
    playSound(cardSound.current);
    
    setDeck(newDeck);
    setPlayerHand(newHand);
    setPlayerScore(newScore);
    
    if (newScore > 21) {
      playerBusts();
    }
  };

  const playerBusts = () => {
    setGameState('finished');
    setResult('lose');
    playSound(loseSound.current);
    
    // Update stats
    const updatedStats = updateStats(stats, 'lose');
    setStats(updatedStats);
    
    toast({
      title: "Bust!",
      description: "Your hand exceeded 21. Dealer wins.",
      variant: "destructive"
    });
  };

  const stand = () => {
    if (gameState !== 'playerTurn') return;
    
    // Reveal dealer's hidden card
    const updatedDealerHand = dealerHand.map(card => ({ ...card, hidden: false }));
    setDealerHand(updatedDealerHand);
    setDealerScore(calculateScore(updatedDealerHand));
    setGameState('dealerTurn');
    
    playSound(cardSound.current);
    
    // Start dealer's turn
    dealerPlay(updatedDealerHand);
  };

  const dealerPlay = (initialHand: Card[]) => {
    let currentDealerHand = [...initialHand];
    let currentDeck = [...deck];
    let currentScore = calculateScore(currentDealerHand);
    
    const dealerTurn = async () => {
      while (currentScore < 17) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newCard = drawCard(currentDeck);
        currentDealerHand = [...currentDealerHand, newCard];
        currentScore = calculateScore(currentDealerHand);
        
        setDealerHand([...currentDealerHand]);
        setDealerScore(currentScore);
        setDeck([...currentDeck]);
        playSound(cardSound.current);
      }
      
      finishGame(playerScore, currentScore);
    };
    
    dealerTurn();
  };

  const finishGame = (pScore: number, dScore: number) => {
    setGameState('finished');
    
    const gameResult = determineWinner(pScore, dScore);
    setResult(gameResult);
    
    // Update stats
    const updatedStats = updateStats(stats, gameResult);
    setStats(updatedStats);
    
    // Handle payouts
    if (gameResult === 'win') {
      setBalance(balance + bet * 2);
      playSound(winSound.current);
      toast({
        title: "You win!",
        description: dScore > 21 
          ? "Dealer busts! You win " + bet * 2 + " chips."
          : "Your hand beats the dealer! You win " + bet * 2 + " chips.",
      });
    } else if (gameResult === 'push') {
      setBalance(balance + bet); // Return bet
      toast({
        title: "Push",
        description: "It's a tie. Your bet is returned.",
      });
    } else {
      playSound(loseSound.current);
      toast({
        title: "Dealer wins",
        description: "Dealer's hand is better.",
        variant: "destructive"
      });
    }
  };

  const resetGame = () => {
    setGameState('idle');
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    resetDeck();
  };

  return {
    dealCards,
    hit,
    stand,
    resetGame,
    resetDeck
  };
};
