
import { Card as CardType } from './types';

interface PlayingCardProps {
  card: CardType;
  index?: number;
  total?: number;
}

const PlayingCard = ({ card, index = 0, total = 1 }: PlayingCardProps) => {
  const isRedSuit = (suit: string): boolean => {
    return suit === '♥' || suit === '♦';
  };

  return (
    <div 
      className={`relative w-14 h-20 rounded-md ${card.hidden ? 'bg-blue-900' : 'bg-white'} shadow-md transform transition-all`}
      style={{ 
        transform: `rotate(${(index - total/2) * 5}deg)`,
        animation: card.animationDelay !== undefined ? `fadeIn 0.5s ease-out ${card.animationDelay}ms both` : 'none'
      }}
    >
      {!card.hidden && (
        <>
          <div className={`absolute top-1 left-1 text-sm font-bold ${isRedSuit(card.suit) ? 'text-red-600' : 'text-black'}`}>
            {card.value}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            <span className={isRedSuit(card.suit) ? 'text-red-600' : 'text-black'}>
              {card.suit}
            </span>
          </div>
          <div className={`absolute bottom-1 right-1 text-sm font-bold ${isRedSuit(card.suit) ? 'text-red-600' : 'text-black'}`}>
            {card.value}
          </div>
        </>
      )}
      {card.hidden && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-2xl">🂠</span>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
