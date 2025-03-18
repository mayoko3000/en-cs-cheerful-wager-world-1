
import Reel from './Reel';
import { SlotResultsProps } from './types';

const SlotResults = ({ results, spinning }: SlotResultsProps) => {
  return (
    <div className="bg-gradient-to-b from-amber-950/70 to-amber-800/70 p-5 rounded-lg flex justify-center space-x-2 h-28 mb-6 border-2 border-yellow-600/80 shadow-inner">
      {results.map((symbol, index) => (
        <Reel key={index} symbol={symbol} spinning={spinning} />
      ))}
    </div>
  );
};

export default SlotResults;
