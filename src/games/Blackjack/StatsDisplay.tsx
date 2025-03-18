
import { GameStats } from './types';
import { Award, CircleMinus, Coins, Clock, Repeat } from 'lucide-react';
import StatCard from './components/StatCard';

export interface StatsDisplayProps {
  stats: GameStats;
  className?: string;
}

const StatsDisplay = ({ stats, className }: StatsDisplayProps) => {
  // Calculate win rate percentage
  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.wins / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 ${className || ''}`}>
      <StatCard 
        icon={<Award className="w-full h-full text-green-400" />}
        label="Wins"
        value={stats.wins}
        className="bg-gradient-to-br from-green-900/40 to-green-700/20"
        valueClassName="text-green-300"
      />
      
      <StatCard 
        icon={<CircleMinus className="w-full h-full text-red-400" />}
        label="Losses"
        value={stats.losses}
        className="bg-gradient-to-br from-red-900/40 to-red-700/20"
        valueClassName="text-red-300"
      />
      
      <StatCard 
        icon={<Coins className="w-full h-full text-yellow-400" />}
        label="Blackjacks"
        value={stats.blackjacks}
        className="bg-gradient-to-br from-yellow-900/40 to-yellow-700/20"
        valueClassName="text-yellow-300"
      />
      
      <StatCard 
        icon={<Repeat className="w-full h-full text-blue-400" />}
        label="Pushes"
        value={stats.pushes}
        className="bg-gradient-to-br from-blue-900/40 to-blue-700/20"
        valueClassName="text-blue-300"
      />
      
      <StatCard 
        icon={<Clock className="w-full h-full text-purple-400" />}
        label={`Games (${winRate}% Win)`}
        value={stats.gamesPlayed}
        className="bg-gradient-to-br from-purple-900/40 to-purple-700/20"
        valueClassName="text-purple-300"
      />
    </div>
  );
};

export default StatsDisplay;
