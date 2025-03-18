
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SlotMachine from '@/games/SlotMachine';
import Roulette from '@/games/Roulette';
import Blackjack from '@/games/Blackjack';
import FortuneWheel from '@/games/FortuneWheel';
import TexasHoldem from '@/games/TexasHoldem';
import BaccaratKing from '@/games/BaccaratKing';
import VegasDice from '@/games/VegasDice';
import { useLocation, useNavigate } from 'react-router-dom';

const PlayGames = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<string>("fortune-wheel");
  
  // Set active game based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const gameParam = params.get('game');
    
    if (gameParam && ['fortune-wheel', 'slots', 'roulette', 'blackjack', 'texas-holdem', 'baccarat', 'vegas-dice'].includes(gameParam)) {
      setActiveGame(gameParam);
    }
  }, [location.search]);
  
  // Update URL when game changes
  const handleGameChange = (value: string) => {
    setActiveGame(value);
    navigate(`/play?game=${value}`, { replace: true });
  };
  
  return (
    <div className="pt-20 min-h-screen page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Play Our Games</h1>
          <p className="text-lg text-casino-muted max-w-2xl mx-auto">
            Select a game below and start playing. Good luck!
          </p>
        </div>
        
        <Tabs value={activeGame} onValueChange={handleGameChange}>
          <div className="flex justify-center mb-8 overflow-x-auto flex-wrap">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="fortune-wheel">Golden Fortune</TabsTrigger>
              <TabsTrigger value="slots">Pirate's Treasure</TabsTrigger>
              <TabsTrigger value="roulette">Lucky Roulette</TabsTrigger>
              <TabsTrigger value="blackjack">Blackjack Pro</TabsTrigger>
              <TabsTrigger value="texas-holdem">Texas Hold'em</TabsTrigger>
              <TabsTrigger value="baccarat">Baccarat King</TabsTrigger>
              <TabsTrigger value="vegas-dice">Vegas Dice</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <TabsContent value="fortune-wheel">
              <FortuneWheel />
            </TabsContent>
            
            <TabsContent value="slots">
              <SlotMachine />
            </TabsContent>
            
            <TabsContent value="roulette">
              <Roulette />
            </TabsContent>
            
            <TabsContent value="blackjack">
              <Blackjack />
            </TabsContent>
            
            <TabsContent value="texas-holdem">
              <TexasHoldem />
            </TabsContent>
            
            <TabsContent value="baccarat">
              <BaccaratKing />
            </TabsContent>
            
            <TabsContent value="vegas-dice">
              <VegasDice />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayGames;
