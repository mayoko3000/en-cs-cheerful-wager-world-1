
import { ChipValue } from '../types';
import { adjustBet as adjustBetAmount } from '../utils/betUtils';

export interface BetManagementProps {
  bet: number;
  setBet: (bet: number) => void;
  balance: number;
  selectedChip: ChipValue;
  setSelectedChip: (chip: ChipValue) => void;
}

export const useBetManagement = ({
  bet,
  setBet,
  balance,
  selectedChip,
  setSelectedChip
}: BetManagementProps) => {
  const adjustBet = (amount: number) => {
    setBet(adjustBetAmount(bet, amount, balance));
  };

  const setChipValue = (value: ChipValue) => {
    setSelectedChip(value);
    if (value <= balance) {
      setBet(value);
    }
  };

  return {
    adjustBet,
    setChipValue
  };
};
