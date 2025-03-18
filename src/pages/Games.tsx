
import { useState } from 'react';
import GameCard from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Games = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleGames, setVisibleGames] = useState(8);
  
  const allGames = [
    {
      id: 1,
      title: "Golden Fortune",
      image: "/lovable-uploads/592b4a94-6a74-43dd-945a-4e310324586c.png",
      players: 3127,
      category: "Wheel",
      popular: true,
      gameId: "fortune-wheel"
    },
    {
      id: 2,
      title: "Pirate's Treasure",
      image: "/lovable-uploads/b5d0018a-982e-4a09-afd8-d5af11493e37.png",
      players: 2189,
      category: "Adventure",
      popular: true,
      gameId: "slots"
    },
    {
      id: 3,
      title: "Texas Hold'em",
      image: "/lovable-uploads/3647cbe5-008b-4b76-abe8-2152b8131a53.png",
      players: 1892,
      category: "Poker",
      popular: true,
      gameId: "texas-holdem"
    },
    {
      id: 4,
      title: "Blackjack Pro",
      image: "/lovable-uploads/3a508639-2cb4-4b73-bb14-cbf2c04d7db3.png",
      players: 1245,
      category: "Card",
      popular: false,
      gameId: "blackjack"
    },
    {
      id: 5,
      title: "Lucky Roulette",
      image: "/lovable-uploads/e9fd6019-dd12-4e43-8b29-02dadbce4204.png",
      players: 982,
      category: "Table",
      popular: false,
      gameId: "roulette"
    },
    {
      id: 6,
      title: "Mega Slots",
      image: "/lovable-uploads/5178d5d2-8c40-40df-aace-0b304f1776df.png",
      players: 763,
      category: "Slots",
      popular: false,
      gameId: "slots"
    },
    {
      id: 7,
      title: "Baccarat King",
      image: "/lovable-uploads/29de2121-8a36-4c50-bff0-7c66feeab64d.png",
      players: 521,
      category: "Card",
      popular: false,
      gameId: "baccarat"
    },
    {
      id: 8,
      title: "Jackpot City",
      image: "/lovable-uploads/58b8e19d-4449-4dcf-8e18-8bd4e45fa136.png",
      players: 1102,
      category: "Slots",
      popular: false,
      gameId: "slots"
    },
    {
      id: 9,
      title: "Vegas Dice",
      image: "/lovable-uploads/7c0cca92-bba1-41e3-9680-6eb1720feb0b.png",
      players: 689,
      category: "Dice",
      popular: false,
      gameId: "vegas-dice"
    },
    {
      id: 10,
      title: "Royal Flush",
      image: "/lovable-uploads/3647cbe5-008b-4b76-abe8-2152b8131a53.png",
      players: 543,
      category: "Poker",
      popular: false,
      gameId: "texas-holdem"
    },
    {
      id: 11,
      title: "Diamond Rush",
      image: "/lovable-uploads/b5d0018a-982e-4a09-afd8-d5af11493e37.png",
      players: 412,
      category: "Adventure",
      popular: false,
      gameId: "slots"
    },
    {
      id: 12,
      title: "Fortune Spins",
      image: "/lovable-uploads/592b4a94-6a74-43dd-945a-4e310324586c.png",
      players: 367,
      category: "Wheel",
      popular: false,
      gameId: "fortune-wheel"
    }
  ];
  
  const categories = ["All", "Wheel", "Slots", "Card", "Table", "Dice", "Poker", "Adventure"];
  
  const filteredGames = (category: string) => {
    let games = allGames;
    
    if (category !== "All") {
      games = games.filter(game => game.category === category);
    }
    
    if (searchQuery) {
      games = games.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return games.slice(0, visibleGames);
  };
  
  const handleLoadMore = () => {
    setVisibleGames(prev => {
      const newValue = prev + 4;
      if (newValue >= allGames.length) {
        toast({
          title: "All games loaded",
          description: "You've reached the end of our game collection",
        });
      }
      return newValue;
    });
  };
  
  return (
    <div className="pt-20 min-h-screen page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Games</h1>
          <p className="text-lg text-casino-muted max-w-2xl mx-auto">
            Discover our wide selection of social casino games. Find your favorites and start playing now.
          </p>
        </div>
        
        <div className="mb-8 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search games..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-white data-[state=active]:text-casino-highlight"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              {filteredGames(category).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredGames(category).map((game) => (
                    <div key={game.id} className="h-full">
                      <GameCard {...game} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-500">No games found</h3>
                  <p className="text-gray-400 mt-2">Try a different search or category</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12 text-center">
          {visibleGames < allGames.length && (
            <Button
              variant="outline"
              className="border-casino-muted hover:border-casino-highlight text-casino-dark transition-all duration-300"
              onClick={handleLoadMore}
            >
              Load More Games
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Games;
