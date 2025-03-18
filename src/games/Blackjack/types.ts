
export type Suit = '♥' | '♦' | '♠' | '♣';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type Card = { 
  suit: Suit, 
  value: Value, 
  hidden?: boolean, 
  animationDelay?: number 
};

export type GameState = 'idle' | 'playing' | 'playerTurn' | 'dealerTurn' | 'finished';
export type GameResult = 'win' | 'lose' | 'push' | '';
export type ChipValue = 5 | 10 | 25 | 100;

export interface GameStats {
  wins: number;
  losses: number;
  pushes: number;
  blackjacks: number;
  gamesPlayed: number;
}
