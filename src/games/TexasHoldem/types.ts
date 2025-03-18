
export type Suit = '♥' | '♦' | '♠' | '♣';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type Card = { 
  suit: Suit, 
  value: Value, 
  hidden?: boolean,
  animationDelay?: number
};

export type PokerHand = 'High Card' | 'Pair' | 'Two Pair' | 'Three of a Kind' | 'Straight' | 
  'Flush' | 'Full House' | 'Four of a Kind' | 'Straight Flush' | 'Royal Flush';

export type GameStage = 'idle' | 'preFlop' | 'flop' | 'turn' | 'river' | 'showdown';
export type GameResult = 'win' | 'lose' | 'tie' | '';
export type BettingAction = 'check' | 'bet' | 'call' | 'raise' | 'fold';

export interface Player {
  id: number;
  name: string;
  cards: Card[];
  chips: number;
  betAmount: number;
  folded: boolean;
  isAllIn: boolean;
  isDealer?: boolean;
  isSmallBlind?: boolean;
  isBigBlind?: boolean;
  handRank?: PokerHand;
  isActive: boolean;
}

export interface GameStats {
  handsWon: number;
  handsLost: number;
  bestHand: PokerHand | null;
  biggestPot: number;
  gamesPlayed: number;
}
