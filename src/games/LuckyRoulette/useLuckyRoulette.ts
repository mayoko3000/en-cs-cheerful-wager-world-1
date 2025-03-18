
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { BetType, Bet } from '@/games/Roulette/types'; // Reusing types

export const useLuckyRoulette = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [balance, setBalance] = useState(500);
  const [lastWin, setLastWin] = useState(0);
  const [selectedChipValue, setSelectedChipValue] = useState(10);
  
  const placeBet = (type: BetType, amount: number) => {
    if (spinning) return;
    
    if (amount > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough chips",
        variant: "destructive"
      });
      return;
    }
    
    // Check if bet already exists
    const existingBetIndex = bets.findIndex(bet => bet.type === type);
    
    if (existingBetIndex !== -1) {
      // Update existing bet
      const updatedBets = [...bets];
      updatedBets[existingBetIndex].amount += amount;
      setBets(updatedBets);
    } else {
      // Add new bet
      setBets([...bets, { type, amount }]);
    }
    
    // Deduct from balance
    setBalance(prev => prev - amount);
  };
  
  const clearBets = () => {
    if (spinning) return;
    
    // Return bet amounts to balance
    const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);
    setBalance(prev => prev + totalBet);
    setBets([]);
  };
  
  const spin = () => {
    if (spinning || bets.length === 0) return;
    
    setSpinning(true);
    setLastWin(0);
    
    // Generate random result (0-36)
    const newResult = Math.floor(Math.random() * 37);
    
    // Add extra rotations for a smooth spin effect (at least 5 full rotations)
    const extraRotations = 5 * 360;
    
    // Calculate required rotation to land on the result
    // Each number takes up 360/37 degrees on the wheel
    const segmentSize = 360 / 37;
    const resultRotation = newResult * segmentSize;
    
    // Set final rotation angle (current + extra + result)
    const newRotationAngle = rotationAngle + extraRotations + resultRotation;
    
    setRotationAngle(newRotationAngle);
    
    // Wait for animation to complete
    setTimeout(() => {
      setResult(newResult);
      setSpinning(false);
      
      // Calculate winnings
      const winnings = calculateWinnings(newResult, bets);
      if (winnings > 0) {
        setBalance(prev => prev + winnings);
        setLastWin(winnings);
        
        toast({
          title: "You won!",
          description: `You won ${winnings} chips!`,
        });
      } else {
        toast({
          title: "Better luck next time",
          description: "Try another spin!",
          variant: "destructive"
        });
      }
      
      // Clear bets
      setBets([]);
      
    }, 5000); // Match the spin animation duration
  };
  
  const calculateWinnings = (result: number, currentBets: Bet[]): number => {
    let totalWinnings = 0;
    
    // Determine result properties
    const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(result);
    const isBlack = result > 0 && !isRed;
    const isGreen = result === 0;
    const isEven = result > 0 && result % 2 === 0;
    const isOdd = result > 0 && result % 2 !== 0;
    const isHigh = result >= 19 && result <= 36;
    const isLow = result >= 1 && result <= 18;
    
    // Calculate winnings for each bet
    currentBets.forEach(bet => {
      switch (bet.type) {
        case 'red':
          if (isRed) totalWinnings += bet.amount * 2; // 1:1 payout
          break;
        case 'black':
          if (isBlack) totalWinnings += bet.amount * 2; // 1:1 payout
          break;
        case 'green':
          if (isGreen) totalWinnings += bet.amount * 36; // 35:1 payout
          break;
        case 'even':
          if (isEven) totalWinnings += bet.amount * 2; // 1:1 payout
          break;
        case 'odd':
          if (isOdd) totalWinnings += bet.amount * 2; // 1:1 payout
          break;
        case 'high':
          if (isHigh) totalWinnings += bet.amount * 2; // 1:1 payout
          break;
        case 'low':
          if (isLow) totalWinnings += bet.amount * 2; // 1:1 payout
          break;
      }
    });
    
    return totalWinnings;
  };
  
  return {
    rotationAngle,
    spinning,
    result,
    bets,
    balance,
    lastWin,
    selectedChipValue,
    placeBet,
    clearBets,
    spin,
    setSelectedChipValue
  };
};
