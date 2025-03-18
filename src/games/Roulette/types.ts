
export type BetType = 'red' | 'black' | 'green' | 'even' | 'odd' | 'high' | 'low' | 'number' | '1-18' | '19-36';

export interface Bet {
  type: BetType;
  amount: number;
  value?: number; // Adding the value property for number bets
}

export interface RouletteProps {
  // Add any props if needed in the future
}
