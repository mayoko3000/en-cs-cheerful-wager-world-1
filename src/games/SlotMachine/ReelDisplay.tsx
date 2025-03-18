
import React from 'react';
import Reel from './Reel';

interface ReelDisplayProps {
  results: string[];
  spinning: boolean;
}

const ReelDisplay: React.FC<ReelDisplayProps> = ({ results, spinning }) => {
  return (
    <div className="bg-gradient-to-b from-amber-950/70 to-amber-800/70 p-5 rounded-lg flex justify-center space-x-4 h-48 mb-6 border-2 border-yellow-600/80 shadow-inner">
      {results.map((symbol, index) => (
        <Reel 
          key={index} 
          symbol={symbol} 
          spinning={spinning} 
          delay={index * 200} 
        />
      ))}
    </div>
  );
};

export default ReelDisplay;
