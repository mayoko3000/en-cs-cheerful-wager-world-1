
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Coins, RotateCw, PlayCircle } from 'lucide-react';
import { useFortuneWheel } from './useFortuneWheel';
import FortuneWheelDisplay from './FortuneWheelDisplay';
import PrizeDisplay from './PrizeDisplay';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const FortuneWheel = () => {
  const {
    spinning,
    segments,
    currentPrize,
    credits,
    rotationAngle,
    spinWheel,
    addCredits,
    prizeHistory
  } = useFortuneWheel();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isFullPage, setIsFullPage] = useState(false);
  
  // Check if we're on the dedicated game page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsFullPage(params.get('game') === 'fortune-wheel');
  }, [location.search]);

  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 relative">
      {/* Background image visible beneath content */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <img 
          src="/lovable-uploads/592b4a94-6a74-43dd-945a-4e310324586c.png" 
          alt="Fortune Wheel Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center relative z-10">
        <h2 className="text-3xl font-bold text-white m-0 tracking-wide">GOLDEN FORTUNE</h2>
      </div>
      
      <CardContent className="p-6 relative z-10">
        {/* Balance Display */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 rounded-lg shadow-inner border border-gray-700">
            <div className="flex items-center">
              <Coins className="h-5 w-5 mr-2 text-yellow-500" />
              <p className="text-sm font-medium text-gray-300">Balance</p>
            </div>
            <p className="text-2xl font-bold">{credits} <span className="text-xs font-normal text-gray-400">coins</span></p>
          </div>
          
          {currentPrize > 0 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 ml-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <ChevronRight className="h-5 w-5 mr-2 text-yellow-900" />
                <p className="text-sm font-medium text-yellow-900">Won</p>
              </div>
              <p className="text-2xl font-bold">{currentPrize} <span className="text-xs font-normal text-yellow-900">coins</span></p>
            </motion.div>
          )}
        </div>
        
        {/* Wheel Display with improved visuals */}
        <div className="px-4 py-6 bg-gradient-to-b from-purple-800/70 to-purple-900/70 rounded-xl backdrop-blur-sm my-4 shadow-lg border border-purple-700/30">
          <FortuneWheelDisplay 
            segments={segments}
            rotationAngle={rotationAngle}
            spinning={spinning}
          />
        </div>
        
        {/* Prize Display */}
        <PrizeDisplay prizeHistory={prizeHistory} />
        
        {/* Game Controls */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            className="h-14 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold text-lg"
            onClick={addCredits}
            disabled={spinning}
          >
            Add 100 Coins
          </Button>
          
          <Button 
            className="h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg group"
            onClick={spinWheel}
            disabled={spinning || credits < 10}
          >
            {spinning ? (
              <div className="flex items-center justify-center">
                <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                <span className="animate-pulse">Spinning...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 transform group-hover:rotate-90 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  <line x1="12" y1="8" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Spin to Win! (10 Coins)</span>
              </div>
            )}
          </Button>
        </div>
        
        {/* Play button for home page (only show when not on the full game page) */}
        {!isFullPage && (
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/play?game=fortune-wheel')}
              className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-base"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Play Full Game
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FortuneWheel;
