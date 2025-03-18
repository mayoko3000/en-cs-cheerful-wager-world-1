
import { Button } from '@/components/ui/button';
import { ChipValue } from './types';

export interface ChipSelectionProps {
  selectedChip: number;
  setChipValue: (value: number) => void;
  balance: number;
}

const ChipSelection = ({ selectedChip, setChipValue, balance }: ChipSelectionProps) => {
  return (
    <div className="flex justify-center mb-4 gap-2">
      <Button 
        className={`h-12 w-12 rounded-full p-0 ${selectedChip === 5 ? 'ring-2 ring-yellow-300' : ''}`}
        style={{ background: 'linear-gradient(to bottom, #ff5c5c, #cc0000)' }}
        onClick={() => setChipValue(5)}
        disabled={balance < 5}
      >
        <span className="text-white font-bold">5</span>
      </Button>
      <Button 
        className={`h-12 w-12 rounded-full p-0 ${selectedChip === 10 ? 'ring-2 ring-yellow-300' : ''}`}
        style={{ background: 'linear-gradient(to bottom, #5c8aff, #0044cc)' }}
        onClick={() => setChipValue(10)}
        disabled={balance < 10}
      >
        <span className="text-white font-bold">10</span>
      </Button>
      <Button 
        className={`h-12 w-12 rounded-full p-0 ${selectedChip === 25 ? 'ring-2 ring-yellow-300' : ''}`}
        style={{ background: 'linear-gradient(to bottom, #5cff5c, #00cc00)' }}
        onClick={() => setChipValue(25)}
        disabled={balance < 25}
      >
        <span className="text-white font-bold">25</span>
      </Button>
      <Button 
        className={`h-12 w-12 rounded-full p-0 ${selectedChip === 100 ? 'ring-2 ring-yellow-300' : ''}`}
        style={{ background: 'linear-gradient(to bottom, #ffdb5c, #ffa500)' }}
        onClick={() => setChipValue(100)}
        disabled={balance < 100}
      >
        <span className="text-white font-bold">100</span>
      </Button>
    </div>
  );
};

export default ChipSelection;
