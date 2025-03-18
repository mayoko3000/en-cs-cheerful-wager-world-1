
import { Users } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

interface GameCardInfoProps {
  title: string;
  category: string;
  players: number;
}

const GameCardInfo = ({ title, category, players }: GameCardInfoProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg group-hover:text-casino-highlight transition-colors duration-300">{title}</h3>
        <FavoriteButton />
      </div>
      
      <div className="flex items-center text-sm text-casino-muted mb-1">
        <span className="bg-blue-50 text-casino-highlight px-2 py-0.5 rounded text-xs font-medium transform transition-transform group-hover:scale-105">
          {category}
        </span>
        <div className="flex items-center ml-auto">
          <Users className="h-4 w-4 mr-1 animate-pulse-soft" />
          <span>{players}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCardInfo;
