
import { Card, Suit, Value } from '../types';

// Create a new deck of cards
export const createDeck = (): Card[] => {
  const suits: Suit[] = ['♥', '♦', '♠', '♣'];
  const values: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return shuffleDeck(deck);
};

// Shuffle the deck
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Deal a specified number of cards from the deck
export const dealCards = (deck: Card[], numCards: number): { cards: Card[], remainingDeck: Card[] } => {
  const cards = deck.slice(0, numCards);
  const remainingDeck = deck.slice(numCards);
  return { cards, remainingDeck };
};

// Get the value of a card (for comparing cards)
export const getCardValue = (card: Card): number => {
  const valueMap: Record<Value, number> = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
  };
  return valueMap[card.value];
};

// Get the color of a card based on its suit
export const getCardColor = (suit: Suit): string => {
  return suit === '♥' || suit === '♦' ? 'text-red-600' : 'text-slate-900';
};

// Check if the suit is red
export const isRedSuit = (suit: Suit): boolean => {
  return suit === '♥' || suit === '♦';
};
