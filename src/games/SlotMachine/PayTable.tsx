
import { PayTableProps } from './types';

const PayTable = ({}: PayTableProps) => {
  return (
    <div className="text-xs text-yellow-200 text-center mb-6 bg-blue-950/50 p-3 rounded-lg border border-yellow-600/60 shadow-inner">
      <p>Three of a kind: 🏴‍☠️=100x | 💰=50x | Others=25x</p>
      <p>Two of a kind: 10x | Bet: 5 gold coins</p>
    </div>
  );
};

export default PayTable;
