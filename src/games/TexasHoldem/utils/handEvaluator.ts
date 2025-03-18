
import { Card, PokerHand } from '../types';
import { getCardValue } from './deckUtils';

// Count the occurrences of each card value in a hand
const countValues = (cards: Card[]): Map<number, number> => {
  const counts = new Map<number, number>();
  cards.forEach(card => {
    const value = getCardValue(card);
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return counts;
};

// Check for a flush (all cards of the same suit)
const hasFlush = (cards: Card[]): boolean => {
  const suits = new Set(cards.map(card => card.suit));
  return suits.size === 1;
};

// Check for a straight (5 cards in sequence)
const hasStraight = (cards: Card[]): boolean => {
  const values = cards.map(card => getCardValue(card)).sort((a, b) => a - b);
  
  // Check for A-5 straight
  if (values.includes(14) && values.includes(2) && values.includes(3) && 
      values.includes(4) && values.includes(5)) {
    return true;
  }
  
  // Regular straight check
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i + 1] !== values[i] + 1) {
      return false;
    }
  }
  return true;
};

// Evaluate a 5-card hand and return the hand ranking
export const evaluateHand = (cards: Card[]): PokerHand => {
  if (cards.length !== 5) {
    throw new Error('Hand must contain exactly 5 cards');
  }
  
  const isFlush = hasFlush(cards);
  const isStraight = hasStraight(cards);
  
  // Check for royal flush
  if (isFlush && isStraight) {
    const values = cards.map(card => getCardValue(card));
    if (values.includes(10) && values.includes(11) && values.includes(12) && 
        values.includes(13) && values.includes(14)) {
      return 'Royal Flush';
    }
    return 'Straight Flush';
  }
  
  const valueCounts = countValues(cards);
  const counts = Array.from(valueCounts.values());
  
  // Check for four of a kind
  if (counts.includes(4)) {
    return 'Four of a Kind';
  }
  
  // Check for full house
  if (counts.includes(3) && counts.includes(2)) {
    return 'Full House';
  }
  
  if (isFlush) {
    return 'Flush';
  }
  
  if (isStraight) {
    return 'Straight';
  }
  
  // Check for three of a kind
  if (counts.includes(3)) {
    return 'Three of a Kind';
  }
  
  // Check for two pair
  if (counts.filter(count => count === 2).length === 2) {
    return 'Two Pair';
  }
  
  // Check for pair
  if (counts.includes(2)) {
    return 'Pair';
  }
  
  return 'High Card';
};

// Find best 5-card hand from 7 cards (player's 2 cards + 5 community cards)
export const findBestHand = (playerCards: Card[], communityCards: Card[]): {
  hand: Card[],
  handRank: PokerHand
} => {
  const allCards = [...playerCards, ...communityCards];
  
  // Generate all possible 5-card combinations from the 7 cards
  const combinations: Card[][] = [];
  
  for (let i = 0; i < allCards.length - 4; i++) {
    for (let j = i + 1; j < allCards.length - 3; j++) {
      for (let k = j + 1; k < allCards.length - 2; k++) {
        for (let l = k + 1; l < allCards.length - 1; l++) {
          for (let m = l + 1; m < allCards.length; m++) {
            combinations.push([
              allCards[i], allCards[j], allCards[k], allCards[l], allCards[m]
            ]);
          }
        }
      }
    }
  }
  
  // Evaluate each combination
  const evaluatedHands = combinations.map(hand => ({
    hand,
    handRank: evaluateHand(hand)
  }));
  
  // Rank hands
  const handRankings: Record<PokerHand, number> = {
    'Royal Flush': 10,
    'Straight Flush': 9,
    'Four of a Kind': 8,
    'Full House': 7,
    'Flush': 6,
    'Straight': 5,
    'Three of a Kind': 4,
    'Two Pair': 3,
    'Pair': 2,
    'High Card': 1
  };
  
  // Sort hands by rank
  evaluatedHands.sort((a, b) => 
    handRankings[b.handRank] - handRankings[a.handRank]
  );
  
  return evaluatedHands[0];
};

// Determine the winner between multiple players
export const determineWinner = (players: {
  id: number, 
  cards: Card[], 
  folded: boolean
}[], communityCards: Card[]): number[] => {
  // Filter out folded players
  const activePlayers = players.filter(player => !player.folded);
  
  if (activePlayers.length === 1) {
    return [activePlayers[0].id];
  }
  
  // Evaluate each player's hand
  const evaluatedPlayers = activePlayers.map(player => {
    const { handRank } = findBestHand(player.cards, communityCards);
    return {
      id: player.id,
      handRank
    };
  });
  
  // Rank hands
  const handRankings: Record<PokerHand, number> = {
    'Royal Flush': 10,
    'Straight Flush': 9,
    'Four of a Kind': 8,
    'Full House': 7,
    'Flush': 6,
    'Straight': 5,
    'Three of a Kind': 4,
    'Two Pair': 3,
    'Pair': 2,
    'High Card': 1
  };
  
  // Find the highest hand rank
  const highestRank = Math.max(...evaluatedPlayers.map(player => 
    handRankings[player.handRank]
  ));
  
  // Find all players with the highest hand rank
  const winners = evaluatedPlayers
    .filter(player => handRankings[player.handRank] === highestRank)
    .map(player => player.id);
  
  return winners;
};
