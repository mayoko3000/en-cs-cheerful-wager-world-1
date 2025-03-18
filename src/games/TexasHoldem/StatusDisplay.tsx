
import React from 'react';
import { GameStage, GameResult } from './types';
import { Award, TrendingUp, AlertCircle } from 'lucide-react';

interface StatusDisplayProps {
  gameStage: GameStage;
  result: GameResult;
  pot: number;
  stats: {
    handsWon: number;
    handsLost: number;
    bestHand: string | null;
    biggestPot: number;
    gamesPlayed: number;
  };
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ gameStage, result, pot, stats }) => {
  // Get game stage display name
  const getStageDisplayName = () => {
    switch (gameStage) {
      case 'idle': return 'Ready to Start';
      case 'preFlop': return 'Pre-Flop';
      case 'flop': return 'Flop';
      case 'turn': return 'Turn';
      case 'river': return 'River';
      case 'showdown': return 'Showdown';
      default: return '';
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Current game info */}
      <div className="bg-slate-800/60 rounded-xl p-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-blue-500 rounded-full p-1">
            <AlertCircle size={16} className="text-white" />
          </div>
          <h3 className="text-white font-medium">Game Status</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700/50 rounded-lg p-2">
            <div className="text-white/60 text-xs">Stage</div>
            <div className="text-white font-medium">{getStageDisplayName()}</div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-2">
            <div className="text-white/60 text-xs">Pot</div>
            <div className="text-white font-medium">{pot}</div>
          </div>
          
          {gameStage === 'showdown' && (
            <div className="col-span-2 bg-slate-700/50 rounded-lg p-2">
              <div className="text-white/60 text-xs">Result</div>
              <div className={`font-medium ${result === 'win' ? 'text-green-400' : result === 'lose' ? 'text-red-400' : 'text-yellow-400'}`}>
                {result === 'win' ? 'You Won!' : result === 'lose' ? 'You Lost' : 'Tie'}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Player statistics */}
      <div className="bg-slate-800/60 rounded-xl p-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-500 rounded-full p-1">
            <TrendingUp size={16} className="text-white" />
          </div>
          <h3 className="text-white font-medium">Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700/50 rounded-lg p-2">
            <div className="text-white/60 text-xs">Hands Won</div>
            <div className="text-white font-medium">{stats.handsWon}</div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-2">
            <div className="text-white/60 text-xs">Hands Lost</div>
            <div className="text-white font-medium">{stats.handsLost}</div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-2">
            <div className="text-white/60 text-xs">Win Rate</div>
            <div className="text-white font-medium">
              {stats.gamesPlayed > 0 ? Math.round((stats.handsWon / stats.gamesPlayed) * 100) : 0}%
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-2">
            <div className="text-white/60 text-xs">Best Hand</div>
            <div className="text-white font-medium">
              {stats.bestHand || 'None yet'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDisplay;
