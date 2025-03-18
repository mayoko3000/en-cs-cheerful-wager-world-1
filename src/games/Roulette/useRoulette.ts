
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Bet, BetType } from './types';
import { redNumbers, greenNumbers } from './constants';

export const useRoulette = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [balance, setBalance] = useState(500);
  const [selectedBetType, setSelectedBetType] = useState<BetType>('red');
  const [betAmount, setBetAmount] = useState(10);
  const [lastWin, setLastWin] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  
  const placeBet = (number: number, type: string) => {
    if (betAmount <= 0) {
      toast({
        title: "Invalid bet",
        description: "Bet amount must be greater than 0",
        variant: "destructive"
      });
      return;
    }
    
    if (betAmount > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough chips",
        variant: "destructive"
      });
      return;
    }
    
    // Create the new bet with proper typing
    const newBet: Bet = { 
      type: type as BetType, 
      amount: betAmount 
    };
    
    // Add value property for number bets
    if (type === 'number') {
      newBet.value = number;
    }
    
    // Check if bet of this type already exists
    const existingBetIndex = bets.findIndex(bet => {
      if (bet.type === type) {
        // For number bets, also check the value
        if (type === 'number') {
          return bet.value === number;
        }
        return true;
      }
      return false;
    });
    
    if (existingBetIndex !== -1) {
      // Update existing bet
      const updatedBets = [...bets];
      updatedBets[existingBetIndex].amount += betAmount;
      setBets(updatedBets);
    } else {
      // Add new bet
      setBets([...bets, newBet]);
    }
    
    setBalance(balance - betAmount);
    
    toast({
      title: "Bet placed",
      description: `${betAmount} chips on ${type}${type === 'number' ? ' ' + number : ''}`,
    });
  };
  
  const clearBets = () => {
    const totalBets = bets.reduce((total, bet) => total + bet.amount, 0);
    setBalance(balance + totalBets);
    setBets([]);
    
    toast({
      title: "Bets cleared",
      description: "All bets have been returned to your balance",
    });
  };
  
  const spin = () => {
    if (bets.length === 0) {
      toast({
        title: "No bets placed",
        description: "Place at least one bet before spinning",
        variant: "destructive"
      });
      return;
    }
    
    setSpinning(true);
    setLastWin(0);
    
    // Generate random result
    const spinResult = Math.floor(Math.random() * 37);
    
    // Calculate total rotation (at least 5 full rotations + position)
    const baseRotation = 5 * 360;
    const positionRotation = (spinResult / 37) * 360;
    const totalRotation = baseRotation + positionRotation;
    
    // Start the spinning animation
    setRotationAngle(totalRotation);
    
    // Set the result after animation completes
    setTimeout(() => {
      setResult(spinResult);
      setSpinning(false);
      calculateWinnings(spinResult);
    }, 5000);
  };
  
  const calculateWinnings = (spinResult: number) => {
    let totalWin = 0;
    
    bets.forEach(bet => {
      let win = 0;
      
      switch (bet.type) {
        case 'red':
          if (redNumbers.includes(spinResult)) {
            win = bet.amount * 2;
          }
          break;
        case 'black':
          if (!redNumbers.includes(spinResult) && !greenNumbers.includes(spinResult)) {
            win = bet.amount * 2;
          }
          break;
        case 'green':
          if (greenNumbers.includes(spinResult)) {
            win = bet.amount * 36;
          }
          break;
        case 'even':
          if (spinResult !== 0 && spinResult % 2 === 0) {
            win = bet.amount * 2;
          }
          break;
        case 'odd':
          if (spinResult !== 0 && spinResult % 2 !== 0) {
            win = bet.amount * 2;
          }
          break;
        case 'high':
          if (spinResult >= 19 && spinResult <= 36) {
            win = bet.amount * 2;
          }
          break;
        case 'low':
          if (spinResult >= 1 && spinResult <= 18) {
            win = bet.amount * 2;
          }
          break;
        case 'number':
          if (bet.value === spinResult) {
            win = bet.amount * 36;
          }
          break;
        case '1-18':
          if (spinResult >= 1 && spinResult <= 18) {
            win = bet.amount * 2;
          }
          break;
        case '19-36':
          if (spinResult >= 19 && spinResult <= 36) {
            win = bet.amount * 2;
          }
          break;
      }
      
      totalWin += win;
    });
    
    if (totalWin > 0) {
      setBalance(balance + totalWin);
      setLastWin(totalWin);
      
      toast({
        title: "You won!",
        description: `You won ${totalWin} chips!`,
      });
    } else {
      toast({
        title: "No win",
        description: "Better luck next spin",
        variant: "destructive"
      });
    }
    
    // Clear bets after spin
    setBets([]);
  };
  
  const adjustBetAmount = (amount: number) => {
    const newAmount = Math.max(5, Math.min(100, betAmount + amount));
    setBetAmount(newAmount);
  };

  return {
    spinning,
    result,
    bets,
    balance,
    selectedBetType,
    betAmount,
    lastWin,
    rotationAngle,
    placeBet,
    clearBets,
    spin,
    setSelectedBetType,
    adjustBetAmount
  };
};
