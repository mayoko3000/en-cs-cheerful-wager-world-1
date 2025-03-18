
import { useRef, useEffect } from 'react';
import { getResultColor } from './constants';

interface RouletteWheelProps {
  rotationAngle: number;
  spinning: boolean;
  result: number | null;
}

const RouletteWheel = ({ rotationAngle, spinning, result }: RouletteWheelProps) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (spinning && wheelRef.current) {
      wheelRef.current.classList.add('shine-effect');
    } else if (wheelRef.current) {
      wheelRef.current.classList.remove('shine-effect');
    }
  }, [spinning]);
  
  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      {/* Main wheel container */}
      <div className="absolute w-[95%] h-[95%] rounded-full bg-gray-900 border-8 border-[#222] flex items-center justify-center shadow-xl overflow-hidden">
        {/* Outer number ring */}
        <div 
          ref={wheelRef}
          className="absolute w-[95%] h-[95%] rounded-full overflow-hidden neon-border"
          style={{ 
            transform: `rotate(${rotationAngle}deg)`,
            transition: spinning ? 'transform 5s cubic-bezier(0.32, 0.15, 0.27, 0.95)' : 'none',
          }}
        >
          {/* Number segments */}
          {Array.from({ length: 37 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute top-0 left-0 right-0 bottom-0 ${getResultColor(i)} border-t border-gray-300/20`}
              style={{
                clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos((i + 1) * 2 * Math.PI / 37)}% ${50 - 50 * Math.sin((i + 1) * 2 * Math.PI / 37)}%)`,
                transform: `rotate(${i * (360 / 37)}deg)`,
              }}
            >
              <div 
                className="absolute text-white font-bold"
                style={{
                  left: '50%',
                  top: '15%',
                  transform: 'translateX(-50%) rotate(180deg)',
                  fontSize: '0.9rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                }}
              >
                {i}
              </div>
            </div>
          ))}
        </div>

        {/* Inner decorative ring */}
        <div className="absolute w-[70%] h-[70%] rounded-full bg-[#222] border-4 border-[#333] flex items-center justify-center">
          <div className="absolute w-[85%] h-[85%] rounded-full bg-[#111] flex items-center justify-center">
            {/* Decorative pattern */}
            <div className="absolute inset-0 rounded-full">
              {Array.from({ length: 18 }).map((_, i) => (
                <div 
                  key={`pattern-${i}`}
                  className="absolute top-1/2 left-1/2 h-[50%] w-[2px] bg-casino-blue/30"
                  style={{ 
                    transform: `translate(-50%, 0) rotate(${i * 20}deg)`,
                    transformOrigin: 'top' 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Center cap with logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] rounded-full bg-[#222] border-4 border-[#444] shadow-lg flex items-center justify-center z-10">
          {result !== null && !spinning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-2xl text-white">{result}</span>
            </div>
          ) : (
            <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-casino-blue to-casino-dark flex items-center justify-center">
              <span className="text-xs text-white font-bold">NEURO-WHEEL</span>
            </div>
          )}
        </div>
      </div>

      {/* Ball marker */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 clip-triangle bg-casino-neon z-20 shadow-md"></div>
    </div>
  );
};

export default RouletteWheel;
