
import { useState, useEffect } from 'react';
import { Symbol } from './types';
import { toast } from '@/components/ui/use-toast';

// All possible symbols
const symbols: Symbol[] = [
  'seven', 'bar', 'cherry', 'lemon', 'watermelon', 'bell', 'diamond', 'wild'
];

// Symbol weights (higher = more common)
const symbolWeights: Record<Symbol, number> = {
  'seven': 1,
  'bar': 2,
  'cherry': 4,
  'lemon': 4,
  'watermelon': 3,
  'bell': 3,
  'diamond': 2,
  'wild': 1
};

// Symbol payouts (multiplier of bet)
const symbolPayouts: Record<Symbol, number> = {
  'seven': 10,
  'bar': 5,
  'cherry': 3,
  'lemon': 2,
  'watermelon': 4,
  'bell': 3,
  'diamond': 8,
  'wild': 15
};

export const useMegaSlots = () => {
  // Initial state with 3 reels of 3 symbols each
  const [reels, setReels] = useState<Symbol[][]>(
    Array(3).fill(0).map(() => (
      Array(3).fill(0).map(() => getRandomSymbol())
    ))
  );
  
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(200);
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState(0);
  const [winningLines, setWinningLines] = useState<number[][]>([]);
  
  // Get a random symbol based on weights
  function getRandomSymbol(): Symbol {
    const totalWeight = Object.values(symbolWeights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const symbol of symbols) {
      if (random < symbolWeights[symbol]) {
        return symbol;
      }
      random -= symbolWeights[symbol];
    }
    
    return 'cherry'; // Default fallback
  }
  
  // Spin the reels
  const spinReels = () => {
    if (balance < bet) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough coins to play",
        variant: "destructive"
      });
      return;
    }
    
    // Deduct bet from balance
    setBalance(prevBalance => prevBalance - bet);
    setSpinning(true);
    setLastWin(0);
    setWinningLines([]);
    
    // Simulate spinning animation
    setTimeout(() => {
      // Generate new random symbols
      const newReels: Symbol[][] = Array(3).fill(0).map(() => (
        Array(3).fill(0).map(() => getRandomSymbol())
      ));
      
      setReels(newReels);
      setSpinning(false);
      
      // Check for wins
      const { totalWin, winningCombinations } = calculateWinnings(newReels, bet);
      
      if (totalWin > 0) {
        setLastWin(totalWin);
        setBalance(prevBalance => prevBalance + totalWin);
        setWinningLines(winningCombinations);
        
        toast({
          title: totalWin >= bet * 5 ? "BIG WIN!" : "You won!",
          description: `You won ${totalWin} coins!`,
        });
      }
    }, 1500);
  };
  
  // Calculate winnings based on the reel positions
  const calculateWinnings = (currentReels: Symbol[][], currentBet: number) => {
    let totalWin = 0;
    const winningCombinations: number[][] = [];
    
    // Define paylines (horizontal, diagonal, etc.)
    const paylines = [
      // Horizontal lines
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      
      // Diagonal lines
      [0, 4, 8], // top left to bottom right
      [6, 4, 2]  // bottom left to top right
    ];
    
    // Check each payline
    paylines.forEach(line => {
      const symbols: Symbol[] = [];
      const positions: number[] = [];
      
      // Get symbols on this payline
      line.forEach(position => {
        const reelIndex = Math.floor(position / 3);
        const symbolIndex = position % 3;
        symbols.push(currentReels[reelIndex][symbolIndex]);
        positions.push(position);
      });
      
      // Count symbols and check for wins
      const symbolCounts: Record<Symbol, number> = symbols.reduce((counts, symbol) => {
        counts[symbol] = (counts[symbol] || 0) + 1;
        return counts;
      }, {} as Record<Symbol, number>);
      
      // Check if we have 3 of a kind or wilds
      for (const symbol of Object.keys(symbolCounts) as Symbol[]) {
        if (symbol === 'wild') continue; // Handle wilds separately
        
        const count = symbolCounts[symbol];
        const wildcards = symbolCounts['wild'] || 0;
        
        // 3 of a kind or 2 + wildcard
        if (count + wildcards >= 3) {
          const multiplier = symbolPayouts[symbol];
          const win = currentBet * multiplier;
          totalWin += win;
          winningCombinations.push(positions);
          break; // Only count the highest win per line
        }
      }
      
      // Special case: 3 wilds
      if (symbolCounts['wild'] === 3) {
        const win = currentBet * symbolPayouts['wild'];
        totalWin += win;
        winningCombinations.push(positions);
      }
    });
    
    return { totalWin, winningCombinations };
  };
  
  // Adjust the bet amount
  const adjustBet = (change: number) => {
    const newBet = bet + change;
    if (newBet >= 5 && newBet <= 100) {
      setBet(newBet);
    }
  };
  
  // Add credits to balance
  const addCredits = () => {
    setBalance(prevBalance => prevBalance + 100);
    toast({
      title: "Credits added",
      description: "100 coins added to your balance",
    });
  };
  
  return {
    reels,
    spinning,
    balance,
    bet,
    lastWin,
    winningLines,
    spinReels,
    adjustBet,
    addCredits
  };
};
