
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { BetType } from './types';

interface BetOptionsProps {
  selectedBetType: string;
  setSelectedBetType: (type: string) => void;
  betAmount: number;
  adjustBetAmount: (amount: number) => void;
  disabled: boolean;
}

const BetOptions: React.FC<BetOptionsProps> = ({
  selectedBetType,
  setSelectedBetType,
  betAmount,
  adjustBetAmount,
  disabled
}) => {
  const betTypes = [
    { value: 'number', label: 'Single Number (35:1)' },
    { value: 'red', label: 'Red (1:1)' },
    { value: 'black', label: 'Black (1:1)' },
    { value: 'even', label: 'Even (1:1)' },
    { value: 'odd', label: 'Odd (1:1)' },
    { value: '1-18', label: '1-18 (1:1)' },
    { value: '19-36', label: '19-36 (1:1)' }
  ];
  
  const chipValues = [5, 10, 25, 50, 100];
  
  return (
    <Card className="bg-gray-800 border-none shadow-xl">
      <CardContent className="p-4">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-3">Bet Type</h3>
          
          <RadioGroup 
            value={selectedBetType} 
            onValueChange={setSelectedBetType}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
            disabled={disabled}
          >
            {betTypes.map((bet) => (
              <div key={bet.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={bet.value} 
                  id={bet.value}
                  className="border-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <Label htmlFor={bet.value} className="text-white cursor-pointer">
                  {bet.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Bet Amount: ${betAmount}</h3>
          
          <Slider
            defaultValue={[betAmount]}
            max={100}
            min={5}
            step={5}
            onValueChange={(value) => adjustBetAmount(value[0])}
            disabled={disabled}
            className="mb-4"
          />
          
          <div className="flex flex-wrap gap-2 justify-between">
            {chipValues.map((value) => (
              <Button
                key={value}
                variant={betAmount === value ? "default" : "outline"}
                onClick={() => adjustBetAmount(value)}
                disabled={disabled}
                className={`relative overflow-hidden ${
                  betAmount === value 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'border-gray-500 text-white hover:bg-gray-700'
                }`}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%'
                }}
              >
                ${value}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetOptions;
