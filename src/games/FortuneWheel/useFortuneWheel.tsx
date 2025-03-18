
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { FortuneWheelSegment } from './types';

export const useFortuneWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [credits, setCredits] = useState(100);
  const [prizeHistory, setPrizeHistory] = useState<number[]>([]);
  
  const segments: FortuneWheelSegment[] = [
    { value: 10, color: 'bg-blue-500' },
    { value: 20, color: 'bg-green-500' },
    { value: 5, color: 'bg-red-500' },
    { value: 50, color: 'bg-purple-500' },
    { value: 15, color: 'bg-indigo-500' },
    { value: 30, color: 'bg-cyan-500' },
    { value: 0, color: 'bg-gray-500' },
    { value: 100, color: 'bg-yellow-500' },
  ];
  
  const spinWheel = () => {
    if (credits < 10) {
      toast({
        title: "Not enough credits",
        description: "You need at least 10 coins to spin the wheel",
        variant: "destructive"
      });
      return;
    }
    
    setCredits(prev => prev - 10);
    setCurrentPrize(0);
    setSpinning(true);
    
    // Calculate random stopping position
    const segmentAngle = 360 / segments.length;
    const randomSegmentIndex = Math.floor(Math.random() * segments.length);
    const randomSegment = segments[randomSegmentIndex];
    
    // Random offset within segment for more realistic stop
    const offset = Math.random() * (segmentAngle * 0.6) + (segmentAngle * 0.2);
    
    // Add more rotations for a smoother, longer spin animation
    // Use 3-5 full rotations for a more satisfying spin
    const fullRotations = 3 + Math.floor(Math.random() * 2); // 3-4 full rotations
    const stopAngle = (fullRotations * 360) + (randomSegmentIndex * segmentAngle) + offset;
    
    // Update rotation angle
    setRotationAngle(prevAngle => prevAngle + stopAngle);
    
    // End spinning and update prizes after animation
    setTimeout(() => {
      setSpinning(false);
      
      // Prize determined by segment
      const prize = randomSegment.value;
      
      setCurrentPrize(prize);
      setPrizeHistory(prev => [...prev, prize]);
      setCredits(prev => prev + prize);
      
      // Show toast for win
      if (prize > 0) {
        toast({
          title: prize >= 50 ? "JACKPOT!" : "You won!",
          description: `You won ${prize} coins!`,
          variant: "default",
        });
      } else {
        toast({
          title: "Better luck next time",
          description: "Spin again for a chance to win!",
        });
      }
    }, 5000); // Match the CSS transition duration
  };
  
  const addCredits = () => {
    setCredits(prev => prev + 100);
    toast({
      title: "Credits added",
      description: "100 coins added to your balance",
    });
  };
  
  return {
    spinning,
    segments,
    currentPrize,
    credits,
    rotationAngle,
    spinWheel,
    addCredits,
    prizeHistory
  };
};
