
import { Card, GameResult } from '../types';
import { toast } from '@/components/ui/use-toast';

export const calculateScore = (hand: Card[]): number => {
  let score = 0;
  let aces = 0;
  
  for (const card of hand) {
    if (card.hidden) continue;
    
    if (card.value === 'A') {
      aces++;
      score += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }
  
  // Adjust aces if needed
  while (score > 21 && aces > 0) {
    score -= 10; // Count an ace as 1 instead of 11
    aces--;
  }
  
  return score;
};

export const determineWinner = (playerScore: number, dealerScore: number): GameResult => {
  if (dealerScore > 21) {
    // Dealer busts
    return 'win';
  } else if (playerScore > dealerScore) {
    // Player wins
    return 'win';
  } else if (playerScore < dealerScore) {
    // Dealer wins
    return 'lose';
  } else {
    // Push
    return 'push';
  }
};

export const showResultToast = (result: GameResult, bet: number): void => {
  if (result === 'win') {
    toast({
      title: "You win!",
      description: "You win " + bet * 2 + " chips.",
    });
  } else if (result === 'lose') {
    toast({
      title: "Dealer wins",
      description: "Dealer's hand is better.",
      variant: "destructive"
    });
  } else if (result === 'push') {
    toast({
      title: "Push",
      description: "It's a tie. Your bet is returned.",
    });
  }
};

export const checkForBlackjack = (score: number): boolean => {
  return score === 21;
};
