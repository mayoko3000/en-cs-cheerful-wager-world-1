
import { motion } from 'framer-motion';
import { Card } from './types';

interface CardDisplayProps {
  card: Card;
  delay: number;
  position: 'player' | 'banker';
  index: number;
}

const CardDisplay = ({ card, delay, position, index }: CardDisplayProps) => {
  // Helper function to get suit symbol and color
  const getSuitDisplay = (suit: string) => {
    switch (suit) {
      case 'hearts':
        return { symbol: '♥', color: 'text-red-600' };
      case 'diamonds':
        return { symbol: '♦', color: 'text-red-600' };
      case 'clubs':
        return { symbol: '♣', color: 'text-black' };
      case 'spades':
        return { symbol: '♠', color: 'text-black' };
      default:
        return { symbol: '?', color: 'text-gray-600' };
    }
  };
  
  // Helper function to format card value
  const getCardValue = (value: string) => {
    switch (value) {
      case 'ace': return 'A';
      case 'jack': return 'J';
      case 'queen': return 'Q';
      case 'king': return 'K';
      default: return value;
    }
  };
  
  const { symbol, color } = getSuitDisplay(card.suit);
  const cardValue = getCardValue(card.value);
  
  // Calculate baccarat value
  const getBaccaratValue = (value: string) => {
    if (['jack', 'queen', 'king', '10'].includes(value)) return 0;
    if (value === 'ace') return 1;
    return parseInt(value);
  };
  
  const baccaratValue = getBaccaratValue(card.value);
  
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: position === 'player' ? 100 : -100,
      rotateY: 180,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: { 
        delay, 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };
  
  return (
    <motion.div
      className="w-16 h-24 md:w-20 md:h-28 bg-white rounded-md shadow-md relative perspective"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Card face */}
      <div className="absolute inset-0 rounded-md bg-white p-2 flex flex-col">
        {/* Top left value and suit */}
        <div className={`text-left ${color}`}>
          <div className="text-sm font-bold leading-none">{cardValue}</div>
          <div className="text-lg leading-none">{symbol}</div>
        </div>
        
        {/* Center suit large */}
        <div className={`flex-grow flex items-center justify-center ${color}`}>
          <div className="text-4xl">{symbol}</div>
        </div>
        
        {/* Bottom right value and suit - rotated */}
        <div className={`text-right ${color} rotate-180`}>
          <div className="text-sm font-bold leading-none">{cardValue}</div>
          <div className="text-lg leading-none">{symbol}</div>
        </div>
        
        {/* Baccarat value indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-green-800 text-white text-xs px-1 rounded-full">
          {baccaratValue}
        </div>
      </div>
    </motion.div>
  );
};

export default CardDisplay;
