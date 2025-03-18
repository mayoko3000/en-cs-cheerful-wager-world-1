
import { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, TrendingDown, CircleDollarSign, History, 
  BarChart as BarChartIcon, PieChart as PieChartIcon, 
  FileChartLine, Award
} from 'lucide-react';
import { GameStats } from '../types';
import { calculateWinRate, calculateBlackjackRate } from '../utils/statsUtils';
import { GameHistoryEntry } from '../hooks/useGameHistory';
import StatCard from './StatCard';

interface StatisticsPanelProps {
  stats: GameStats;
  gameHistory: GameHistoryEntry[];
  winStreak: number;
  bestWinStreak: number;
  worstLossStreak: number;
  recentWinRate: number;
  totalEarnings: number;
  winLossTrend: { game: number; result: number }[];
}

const COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b'];

const StatisticsPanel = ({
  stats,
  gameHistory,
  winStreak,
  bestWinStreak,
  worstLossStreak,
  recentWinRate,
  totalEarnings,
  winLossTrend
}: StatisticsPanelProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data for the pie chart
  const distributionData = [
    { name: 'Wins', value: stats.wins },
    { name: 'Losses', value: stats.losses },
    { name: 'Pushes', value: stats.pushes },
    { name: 'Blackjacks', value: stats.blackjacks }
  ].filter(item => item.value > 0);

  return (
    <div className="mb-6">
      <h2 className="text-white text-xl font-bold mb-4">Game Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <StatCard 
          icon={<TrendingUp className="w-full h-full text-blue-400" />}
          label="Current Streak"
          value={winStreak > 0 ? `${winStreak} Wins` : 
                 winStreak === 0 && worstLossStreak === 0 ? "No Streak" : 
                 `${worstLossStreak} Losses`}
          className={winStreak > 0 ? "bg-gradient-to-br from-green-900/40 to-green-700/20" : 
                     "bg-gradient-to-br from-red-900/40 to-red-700/20"}
          valueClassName={winStreak > 0 ? "text-green-300" : "text-red-300"}
        />
        
        <StatCard 
          icon={<Award className="w-full h-full text-yellow-400" />}
          label="Best Streak"
          value={`${bestWinStreak} Wins`}
          className="bg-gradient-to-br from-yellow-900/40 to-yellow-700/20"
          valueClassName="text-yellow-300"
        />
        
        <StatCard 
          icon={<FileChartLine className="w-full h-full text-purple-400" />}
          label="Recent Win Rate"
          value={`${recentWinRate}%`}
          subValue="Last 10 games"
          className="bg-gradient-to-br from-purple-900/40 to-purple-700/20"
          valueClassName="text-purple-300"
        />
        
        <StatCard 
          icon={<CircleDollarSign className="w-full h-full text-green-400" />}
          label="Net Earnings"
          value={totalEarnings}
          className={totalEarnings >= 0 ? 
                     "bg-gradient-to-br from-green-900/40 to-green-700/20" : 
                     "bg-gradient-to-br from-red-900/40 to-red-700/20"}
          valueClassName={totalEarnings >= 0 ? "text-green-300" : "text-red-300"}
        />
      </div>
      
      <Card className="bg-black/20 border-none text-white overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="p-2 bg-black/40">
            <TabsList className="grid grid-cols-4 bg-black/40">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-white"
              >
                <PieChartIcon className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="trend" 
                className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger 
                value="distribution" 
                className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-white"
              >
                <BarChartIcon className="h-4 w-4 mr-2" />
                Distribution
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-white"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="p-4">
            <TabsContent value="overview" className="mt-0">
              <div className="h-64">
                {stats.gamesPlayed > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} games`, '']}
                        contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60">
                    Play some games to see statistics
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="trend" className="mt-0">
              <div className="h-64">
                {winLossTrend.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={winLossTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        dataKey="game" 
                        stroke="#888" 
                        label={{ value: 'Game', position: 'insideBottom', fill: '#888' }} 
                      />
                      <YAxis 
                        stroke="#888" 
                        ticks={[-1, 0, 1]} 
                        tickFormatter={(value) => value === 1 ? 'Win' : value === 0 ? 'Push' : 'Loss'}
                      />
                      <Tooltip 
                        formatter={(value) => [value === 1 ? 'Win' : value === 0 ? 'Push' : 'Loss', 'Result']}
                        contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="result" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={{ fill: '#22c55e', r: 4 }}
                        activeDot={{ r: 6, fill: '#f59e0b' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60">
                    Play some games to see trends
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="distribution" className="mt-0">
              <div className="h-64">
                {stats.gamesPlayed > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Wins', value: stats.wins, color: '#22c55e' },
                      { name: 'Losses', value: stats.losses, color: '#ef4444' },
                      { name: 'Pushes', value: stats.pushes, color: '#3b82f6' },
                      { name: 'Blackjacks', value: stats.blackjacks, color: '#f59e0b' }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        formatter={(value) => [`${value} games`, '']}
                        contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
                      />
                      <Bar dataKey="value">
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60">
                    Play some games to see distribution
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="h-64 overflow-auto pr-2">
                {gameHistory.length > 0 ? (
                  <div className="space-y-2">
                    {[...gameHistory].reverse().map((game) => (
                      <div 
                        key={game.id} 
                        className={`p-2 rounded ${
                          game.result === 'win' ? 'bg-green-900/30' : 
                          game.result === 'lose' ? 'bg-red-900/30' : 
                          'bg-blue-900/30'
                        } flex justify-between items-center`}
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {game.result === 'win' ? 'Win' : 
                             game.result === 'lose' ? 'Loss' : 
                             'Push'}
                             {game.hasBlackjack ? ' (Blackjack!)' : ''}
                          </div>
                          <div className="text-xs text-white/60">
                            Player: {game.playerScore} | Dealer: {game.dealerScore}
                          </div>
                        </div>
                        <div className={`text-right ${
                          game.result === 'win' ? 'text-green-400' : 
                          game.result === 'lose' ? 'text-red-400' : 
                          'text-blue-400'
                        }`}>
                          <div className="text-sm font-medium">
                            Bet: {game.bet}
                          </div>
                          <div className="text-xs">
                            {game.result === 'win' ? `+${game.payout}` : 
                             game.result === 'lose' ? `-${game.bet}` : 
                             '±0'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60">
                    Play some games to see history
                  </div>
                )}
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default StatisticsPanel;
