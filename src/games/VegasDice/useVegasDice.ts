
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { BetType } from './types';

export const useVegasDice = () => {
  const [dice, setDice] = useState<number[]>([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [balance, setBalance] = useState(200);
  const [bet, setBet] = useState(10);
  const [betType, setBetType] = useState<BetType>('high');
  const [lastWin, setLastWin] = useState(0);
  
  const rollDice = () => {
    if (bet > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough chips to place this bet",
        variant: "destructive"
      });
      return;
    }
    
    if (bet <= 0) {
      toast({
        title: "Invalid bet",
        description: "Please place a bet before rolling",
        variant: "destructive"
      });
      return;
    }
    
    // Deduct bet amount from balance
    setBalance(prev => prev - bet);
    setRolling(true);
    
    // Simulate dice roll animation
    setTimeout(() => {
      // Generate random dice values
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      const sum = die1 + die2;
      
      setDice([die1, die2]);
      setRolling(false);
      
      // Calculate winnings
      let winnings = 0;
      const isDoubles = die1 === die2;
      
      switch (betType) {
        case 'high':
          if (sum >= 8 && sum <= 12) {
            winnings = bet * 2; // 1:1 payout
          }
          break;
        case 'low':
          if (sum >= 2 && sum <= 6) {
            winnings = bet * 2; // 1:1 payout
          }
          break;
        case 'seven':
          if (sum === 7) {
            winnings = bet * 5; // 4:1 payout
          }
          break;
        case 'doubles':
          if (isDoubles) {
            winnings = bet * 6; // 5:1 payout
          }
          break;
        case 'field':
          if (sum >= 3 && sum <= 10) {
            winnings = bet * 2; // 1:1 payout
          }
          break;
        case 'hardway':
          if (isDoubles && sum >= 4 && sum <= 10 && sum % 2 === 0) {
            winnings = bet * 9; // 8:1 payout
          }
          break;
      }
      
      // Update balance with winnings
      if (winnings > 0) {
        setBalance(prev => prev + winnings);
        setLastWin(winnings);
        
        toast({
          title: "You won!",
          description: `You won ${winnings} chips!`,
        });
      } else {
        setLastWin(0);
        toast({
          title: "Better luck next time",
          description: "Try another roll!",
          variant: "destructive"
        });
      }
    }, 1500);
  };
  
  const setBetAmount = (amount: number) => {
    setBet(amount);
  };
  
  const addBalance = () => {
    setBalance(prev => prev + 100);
    toast({
      title: "Chips added",
      description: "100 chips added to your balance",
    });
  };
  
  return {
    dice,
    rolling,
    balance,
    bet,
    betType,
    lastWin,
    rollDice,
    setBetAmount,
    setBetType,
    addBalance
  };
};
