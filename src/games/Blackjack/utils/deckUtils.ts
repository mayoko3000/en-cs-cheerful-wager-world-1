
import { Card, Suit, Value } from '../types';

export const createNewDeck = (): Card[] => {
  const suits: Suit[] = ['♥', '♦', '♠', '♣'];
  const values: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const newDeck: Card[] = [];
  
  for (const suit of suits) {
    for (const value of values) {
      newDeck.push({ suit, value });
    }
  }
  
  // Shuffle the deck
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  
  return newDeck;
};

export const drawCard = (deckToDrawFrom: Card[]): Card => {
  return deckToDrawFrom.pop() || { suit: '♥', value: 'A' }; // Fallback shouldn't happen
};
