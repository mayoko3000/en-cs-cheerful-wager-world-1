
import { Button } from '@/components/ui/button';

interface ChipSelectorProps {
  selectedChipValue: number;
  setSelectedChipValue: (value: number) => void;
  disabled: boolean;
}

const ChipSelector = ({ selectedChipValue, setSelectedChipValue, disabled }: ChipSelectorProps) => {
  const chipValues = [5, 10, 25, 100];
  
  return (
    <div className="flex justify-center gap-2 mt-4">
      {chipValues.map(value => (
        <Button
          key={value}
          variant="outline"
          size="sm"
          className={`rounded-full border-4 w-14 h-14 flex items-center justify-center
            ${
              selectedChipValue === value 
                ? 'ring-2 ring-yellow-400 border-gray-300 transform scale-110' 
                : 'border-gray-600'
            }
            ${
              value === 5 
                ? 'bg-red-600' 
                : value === 10 
                  ? 'bg-blue-600' 
                  : value === 25 
                    ? 'bg-green-600' 
                    : 'bg-purple-600'
            }
          `}
          onClick={() => setSelectedChipValue(value)}
          disabled={disabled}
        >
          <span className="text-white font-bold">{value}</span>
        </Button>
      ))}
    </div>
  );
};

export default ChipSelector;
