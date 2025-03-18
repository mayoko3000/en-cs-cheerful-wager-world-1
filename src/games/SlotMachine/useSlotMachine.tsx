
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useSlotMachine = () => {
  const [reels] = useState<string[][]>([
    ['🏴‍☠️', '💰', '🗝️', '⚓', '🔱'],
    ['🏴‍☠️', '💰', '🗝️', '⚓', '🔱'],
    ['🏴‍☠️', '💰', '🗝️', '⚓', '🔱'],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState<string[]>(['🏴‍☠️', '🏴‍☠️', '🏴‍☠️']);
  const [credits, setCredits] = useState(100);
  const [winAmount, setWinAmount] = useState(0);

  const handleSpin = () => {
    if (credits < 5) {
      toast({
        title: "Not enough credits",
        description: "Please add more credits to play.",
        variant: "destructive"
      });
      return;
    }
    
    setCredits(prev => prev - 5);
    setWinAmount(0);
    setSpinning(true);
    
    const spinDuration = 2000;
    const startTime = Date.now();
    
    const spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      if (progress >= 1) {
        clearInterval(spinInterval);
        finalizeSpin();
        return;
      }
      
      const randomReels = reels.map(reel => 
        reel.map(() => reel[Math.floor(Math.random() * reel.length)])
      );
      setResults(randomReels.map(reel => reel[0]));
    }, 100);
  };

  const finalizeSpin = () => {
    const finalResults = reels.map(reel => 
      reel[Math.floor(Math.random() * reel.length)]
    );
    
    setResults(finalResults);
    setSpinning(false);
    
    calculateWin(finalResults);
  };

  const calculateWin = (results: string[]) => {
    let winnings = 0;
    
    if (results[0] === results[1] && results[1] === results[2]) {
      if (results[0] === '🏴‍☠️') {
        winnings = 100;
      } else if (results[0] === '💰') {
        winnings = 50;
      } else {
        winnings = 25;
      }
    } else if (
      results[0] === results[1] || 
      results[1] === results[2] || 
      results[0] === results[2]
    ) {
      winnings = 10;
    }
    
    if (winnings > 0) {
      setWinAmount(winnings);
      setCredits(prev => prev + winnings);
      
      const message = winnings >= 50 
        ? "TREASURE FOUND!" 
        : "You won!";
      
      toast({
        title: message,
        description: `You won ${winnings} gold coins!`,
        variant: "default",
      });
    }
  };

  const resetCredits = () => {
    setCredits(100);
    toast({
      title: "Credits reset",
      description: "Your gold coins have been reset to 100.",
    });
  };

  return {
    spinning,
    results,
    credits,
    winAmount,
    handleSpin,
    resetCredits
  };
};
