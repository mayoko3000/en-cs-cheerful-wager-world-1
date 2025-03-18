
import { ChipValue } from '../types';
import { toast } from '@/components/ui/use-toast';

export const validateBet = (bet: number, balance: number): boolean => {
  if (balance < bet) {
    toast({
      title: "Insufficient balance",
      description: "You don't have enough chips to place this bet.",
      variant: "destructive"
    });
    return false;
  }
  return true;
};

export const adjustBet = (currentBet: number, amount: number, balance: number): number => {
  return Math.max(5, Math.min(balance, currentBet + amount));
};

export const calculateBlackjackPayout = (bet: number): number => {
  return Math.floor(bet * 2.5);
};
