
import { ReelProps } from './types';

const Reel = ({ symbol, spinning, delay = 0 }: ReelProps) => {
  return (
    <div 
      className="flex-1 bg-gradient-to-b from-amber-100 to-amber-300 rounded-md flex items-center justify-center p-2 shadow-inner border border-amber-400"
      style={{
        transform: spinning ? `translateY(${Math.random() * 20 - 10}px)` : 'none',
        transition: `transform 0.1s ease-in-out ${delay}ms`
      }}
    >
      <span className="text-4xl">{symbol}</span>
    </div>
  );
};

export default Reel;
