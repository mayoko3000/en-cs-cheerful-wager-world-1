
import { Card, CardContent } from '@/components/ui/card';
import { useLuckyRoulette } from './useLuckyRoulette';
import RouletteTable from './RouletteTable';
import RouletteWheel from './RouletteWheel';
import ChipSelector from './ChipSelector';
import BetTracker from './BetTracker';
import StatusDisplay from '@/games/Roulette/StatusDisplay'; // Reusing component

const LuckyRoulette = () => {
  const {
    spinning,
    result,
    bets,
    balance,
    selectedChipValue,
    lastWin,
    rotationAngle,
    placeBet,
    clearBets,
    spin,
    setSelectedChipValue
  } = useLuckyRoulette();
  
  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="h-16 bg-gradient-to-r from-red-800 to-red-900 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white m-0 tracking-wide">LUCKY ROULETTE</h2>
      </div>
      
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <StatusDisplay balance={balance} lastWin={lastWin} />
            
            <div className="px-4 py-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl backdrop-blur-sm my-4">
              <RouletteWheel 
                rotationAngle={rotationAngle} 
                spinning={spinning} 
                result={result} 
              />
            </div>
            
            <ChipSelector 
              selectedChipValue={selectedChipValue}
              setSelectedChipValue={setSelectedChipValue}
              disabled={spinning}
            />
          </div>
          
          <div>
            <BetTracker 
              bets={bets}
              clearBets={clearBets}
              spinning={spinning}
            />
            
            <RouletteTable 
              onPlaceBet={placeBet}
              onSpin={spin}
              selectedChipValue={selectedChipValue}
              bets={bets}
              balance={balance}
              spinning={spinning}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LuckyRoulette;
