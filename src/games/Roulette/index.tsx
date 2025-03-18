
import { Card, CardContent } from '@/components/ui/card';
import { useRoulette } from './useRoulette';
import RouletteTable from './RouletteTable';
import RouletteWheel from './RouletteWheel';
import BetOptions from './BetOptions';
import StatusDisplay from './StatusDisplay';
import { BetType } from './types';

const Roulette = () => {
  const {
    spinning,
    result,
    bets,
    balance,
    selectedBetType,
    betAmount,
    lastWin,
    rotationAngle,
    placeBet,
    clearBets,
    spin,
    setSelectedBetType,
    adjustBetAmount
  } = useRoulette();
  
  // Create a wrapper function to handle the type conversion
  const handleSetSelectedBetType = (type: string) => {
    setSelectedBetType(type as BetType);
  };
  
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
            
            <BetOptions 
              selectedBetType={selectedBetType}
              setSelectedBetType={handleSetSelectedBetType}
              betAmount={betAmount}
              adjustBetAmount={adjustBetAmount}
              disabled={spinning}
            />
          </div>
          
          <div>
            <RouletteTable 
              onPlaceBet={placeBet}
              onClearBets={clearBets}
              onSpin={spin}
              selectedBetType={selectedBetType}
              betAmount={betAmount}
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

export default Roulette;
