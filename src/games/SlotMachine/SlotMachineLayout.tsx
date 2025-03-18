
import React from 'react';

interface SlotMachineLayoutProps {
  children: React.ReactNode;
}

const SlotMachineLayout = ({ children }: SlotMachineLayoutProps) => {
  return (
    <div className="relative min-h-[550px] w-full max-w-md mx-auto overflow-hidden rounded-xl">
      <div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900 to-indigo-900 z-0"
      >
        <div className="absolute inset-0 cyberpunk-grid bg-black/40 backdrop-blur-[1px]"></div>
      </div>
      
      <div className="relative z-10 p-6 flex flex-col items-center">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold text-casino-neon drop-shadow-md neon-text">DIGITAL PLUNDER</h2>
        </div>
        
        <div className="w-full mb-6 bg-black/70 p-6 rounded-xl border-2 border-casino-blue/70 shadow-lg backdrop-blur-sm neon-border">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlotMachineLayout;
