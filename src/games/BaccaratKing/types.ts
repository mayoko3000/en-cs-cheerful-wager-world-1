
export interface Card {
  suit: string;
  value: string;
}

export interface Bets {
  player: number;
  banker: number;
  tie: number;
}

export type GameState = 'betting' | 'dealing' | 'result';
