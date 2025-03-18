
import { motion } from 'framer-motion';

interface DiceDisplayProps {
  dice: number[];
  rolling: boolean;
}

const DiceDisplay = ({ dice, rolling }: DiceDisplayProps) => {
  return (
    <div className="flex justify-center gap-8 py-8">
      {dice.map((die, index) => (
        <motion.div
          key={index}
          className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center relative"
          animate={rolling ? { 
            rotateX: [0, 360, 720, 1080], 
            rotateY: [0, 360, 720, 1080] 
          } : {}}
          transition={{ 
            duration: rolling ? 1.5 : 0.5,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-1 rounded-lg bg-gradient-to-tr from-blue-100 to-white"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {renderDieFace(die)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const renderDieFace = (value: number) => {
  const dotClass = "w-3 h-3 bg-blue-900 rounded-full";
  
  switch (value) {
    case 1:
      return (
        <div className="grid place-items-center w-full h-full">
          <div className={dotClass}></div>
        </div>
      );
    case 2:
      return (
        <div className="grid grid-cols-2 w-full h-full p-4">
          <div className="flex justify-start items-start">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-end items-end">
            <div className={dotClass}></div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-4">
          <div className="col-start-1 row-start-1 flex justify-start items-start">
            <div className={dotClass}></div>
          </div>
          <div className="col-start-2 row-start-2 flex justify-center items-center">
            <div className={dotClass}></div>
          </div>
          <div className="col-start-3 row-start-3 flex justify-end items-end">
            <div className={dotClass}></div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full p-4">
          <div className="flex justify-start items-start">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-end items-start">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-start items-end">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-end items-end">
            <div className={dotClass}></div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-4">
          <div className="col-start-1 row-start-1 flex justify-start items-start">
            <div className={dotClass}></div>
          </div>
          <div className="col-start-3 row-start-1 flex justify-end items-start">
            <div className={dotClass}></div>
          </div>
          <div className="col-start-2 row-start-2 flex justify-center items-center">
            <div className={dotClass}></div>
          </div>
          <div className="col-start-1 row-start-3 flex justify-start items-end">
            <div className={dotClass}></div>
          </div>
          <div className="col-start-3 row-start-3 flex justify-end items-end">
            <div className={dotClass}></div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="grid grid-cols-2 grid-rows-3 w-full h-full p-4">
          <div className="flex justify-start items-start">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-end items-start">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-start items-center">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-end items-center">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-start items-end">
            <div className={dotClass}></div>
          </div>
          <div className="flex justify-end items-end">
            <div className={dotClass}></div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default DiceDisplay;
