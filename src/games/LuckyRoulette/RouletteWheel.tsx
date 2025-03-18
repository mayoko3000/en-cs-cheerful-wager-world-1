
import { useRef, useEffect } from 'react';
import { getResultColor } from '@/games/Roulette/constants'; // Reusing utility functions

interface RouletteWheelProps {
  rotationAngle: number;
  spinning: boolean;
  result: number | null;
}

const RouletteWheel = ({ rotationAngle, spinning, result }: RouletteWheelProps) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // Add shine effect when spinning
  useEffect(() => {
    if (spinning && wheelRef.current) {
      wheelRef.current.classList.add('animate-pulse-soft');
    } else if (wheelRef.current) {
      wheelRef.current.classList.remove('animate-pulse-soft');
    }
  }, [spinning]);
  
  return (
    <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img 
          src="/lovable-uploads/e9fd6019-dd12-4e43-8b29-02dadbce4204.png" 
          alt="Lucky Roulette Background" 
          className="w-full h-full object-cover opacity-25"
        />
      </div>
      
      {/* Outer shadow and glow */}
      <div className="absolute inset-[10%] rounded-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] -z-10"></div>
      
      {/* Main wheel */}
      <div 
        ref={wheelRef}
        className="w-[80%] h-[80%] rounded-full border-8 border-yellow-700/80 bg-gray-800 relative overflow-hidden shadow-inner transform transition-transform"
        style={{ 
          transform: `rotate(${rotationAngle}deg)`,
          transition: spinning ? 'transform 5s cubic-bezier(0.32, 0.15, 0.27, 0.95)' : 'none',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
        }}
      >
        {/* Create wheel segments */}
        {Array.from({ length: 37 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute top-0 left-0 right-0 bottom-0 ${getResultColor(i)} opacity-90 shadow-inner`}
            style={{
              clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos((i + 1) * 2 * Math.PI / 37)}% ${50 - 50 * Math.sin((i + 1) * 2 * Math.PI / 37)}%)`,
              transform: `rotate(${i * (360 / 37)}deg)`,
            }}
          >
            <span 
              className="absolute text-white font-bold text-sm"
              style={{
                left: '50%',
                top: '10%',
                transform: 'translateX(-50%)',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)'
              }}
            >
              {i}
            </span>
          </div>
        ))}
        
        {/* Inner wheel rim */}
        <div className="absolute inset-[10%] rounded-full border-4 border-yellow-700/60 bg-transparent z-10"></div>
      </div>
      
      {/* Wheel center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5 h-1/5 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 border-4 border-yellow-700/80 z-10 flex items-center justify-center shadow-lg">
        {result !== null && !spinning && (
          <span className="font-bold text-2xl text-white">{result}</span>
        )}
      </div>
      
      {/* Ball */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-20"
        style={{ 
          filter: 'drop-shadow(0 0 4px rgba(255,255,255,1))'
        }}
      ></div>
      
      {/* Marker triangle */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-yellow-500 z-30"></div>
    </div>
  );
};

export default RouletteWheel;
