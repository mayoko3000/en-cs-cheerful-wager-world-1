
import { useState, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { FortuneWheelSegment } from './types';

interface FortuneWheelDisplayProps {
  segments: FortuneWheelSegment[];
  rotationAngle: number;
  spinning: boolean;
}

const FortuneWheelDisplay = ({ segments, rotationAngle, spinning }: FortuneWheelDisplayProps) => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    // After initial mount, set initialLoad to false
    const timer = setTimeout(() => setInitialLoad(false), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Game background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/592b4a94-6a74-43dd-945a-4e310324586c.png" 
          alt="Fortune Wheel Background" 
          className="w-full h-full object-cover opacity-30 rounded-xl"
        />
      </div>

      {/* Static pointer marker at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 z-20">
        <div className="w-8 h-8 bg-yellow-300 transform rotate-45 -mt-4 border-4 border-amber-600 shadow-lg"></div>
      </div>
      
      {/* The actual fortune wheel */}
      <div className="relative z-10">
        <motion.div
          initial={{ rotate: initialLoad ? 0 : rotationAngle - 720 }}
          animate={{ 
            rotate: rotationAngle,
            transition: { 
              type: spinning ? "spring" : "tween",
              duration: spinning ? 5 : 0.5,
              bounce: spinning ? 0.1 : 0.2, // Reduced bounce for smoother spin
              ease: spinning ? "circOut" : "easeOut",
              damping: 60, // Higher damping for smoother motion
              stiffness: 100 // Lower stiffness for more fluid motion
            }
          }}
          className="w-full h-full origin-center transform-gpu"
        >
          {/* Wheel segments - circular design with colors */}
          <div className="relative">
            {/* Dynamic wheel segments based on data */}
            <svg viewBox="0 0 100 100" width="300" height="300" className="drop-shadow-xl">
              <circle cx="50" cy="50" r="48" fill="#F2F2F2" stroke="#D4AF37" strokeWidth="2" />
              
              {segments.map((segment, index) => {
                const angle = 360 / segments.length;
                const startAngle = index * angle;
                const endAngle = (index + 1) * angle;
                
                // Calculate path for pie slice
                const startRad = (startAngle - 90) * Math.PI / 180; 
                const endRad = (endAngle - 90) * Math.PI / 180;
                
                const x1 = 50 + 48 * Math.cos(startRad);
                const y1 = 50 + 48 * Math.sin(startRad);
                const x2 = 50 + 48 * Math.cos(endRad);
                const y2 = 50 + 48 * Math.sin(endRad);
                
                const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                
                // Alternate colors for segments
                const fillColors = [
                  "#FFD700", // Gold
                  "#E6007E", // Pink
                  "#4CAF50", // Green  
                  "#2196F3", // Blue
                  "#FF5722", // Orange
                  "#9C27B0", // Purple
                  "#FF9800", // Amber
                  "#3F51B5"  // Indigo
                ];
                
                const textRotation = startAngle + angle / 2;
                
                return (
                  <g key={index}>
                    {/* Segment path */}
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 48 48 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={fillColors[index % fillColors.length]}
                      stroke="#FFF"
                      strokeWidth="0.5"
                    />
                    
                    {/* Text for segment */}
                    <text
                      x="50"
                      y="50"
                      fill="white"
                      fontWeight="bold"
                      fontSize="6"
                      textAnchor="middle"
                      transform={`rotate(${textRotation} 50 50) translate(0 -32)`}
                    >
                      {segment.value}
                    </text>
                  </g>
                );
              })}
              
              {/* Center circle */}
              <circle cx="50" cy="50" r="8" fill="#D4AF37" stroke="#FFF" strokeWidth="2" />
              <circle cx="50" cy="50" r="4" fill="#FFD700" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Glowing effect when spinning */}
      {spinning && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent animate-spin-slow rounded-xl"></div>
      )}
    </div>
  );
};

export default FortuneWheelDisplay;
