
export const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
export const greenNumbers = [0];
export const betTypes: BetType[] = ['red', 'black', 'green', 'even', 'odd', 'high', 'low'];

import { BetType } from './types';

export const getBetTypeColor = (type: BetType): string => {
  switch (type) {
    case 'red': return 'bg-red-600';
    case 'black': return 'bg-black';
    case 'green': return 'bg-green-600';
    case 'even': return 'bg-casino-blue';
    case 'odd': return 'bg-casino-purple';
    case 'high': return 'bg-casino-neon';
    case 'low': return 'bg-casino-pink';
    default: return 'bg-gray-600';
  }
};

export const getResultColor = (num: number): string => {
  if (num === 0) return 'bg-green-600';
  return redNumbers.includes(num) ? 'bg-red-600' : 'bg-gray-900';
};
