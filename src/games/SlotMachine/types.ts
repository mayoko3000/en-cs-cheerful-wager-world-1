
export interface SlotMachineProps {
  // Add any props if needed in the future
}

export interface ReelProps {
  symbol: string; // Now expects an emoji string
  spinning: boolean;
  delay?: number; // Adding delay property
}

export interface SlotResultsProps {
  results: string[];
  spinning: boolean;
}

export interface ControlsProps {
  onSpin: () => void;
  onReset: () => void;
  credits: number;
  winAmount: number;
  spinning: boolean;
}

export interface PayTableProps {
  // Add any props if needed in the future
}

export interface CreditDisplayProps {
  credits: number;
  winAmount: number;
}
