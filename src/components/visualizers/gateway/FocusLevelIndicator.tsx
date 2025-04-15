
import React from 'react';
import { motion } from 'framer-motion';

interface FocusLevelIndicatorProps {
  focusLevel: string;
  pulsateSpeed: number;
}

const FocusLevelIndicator: React.FC<FocusLevelIndicatorProps> = ({ focusLevel, pulsateSpeed }) => {
  switch (focusLevel) {
    case 'focus10':
      return (
        <div className="text-cyan-300/70">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <div className="font-medium text-sm">Focus 10</div>
            <div className="text-xs opacity-70">Mind Awake, Body Asleep</div>
          </motion.div>
        </div>
      );
    case 'focus12':
      return (
        <div className="text-blue-300/70">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <div className="font-medium text-sm">Focus 12</div>
            <div className="text-xs opacity-70">Expanded Awareness</div>
          </motion.div>
        </div>
      );
    case 'focus15':
      return (
        <div className="text-indigo-300/70">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <div className="font-medium text-sm">Focus 15</div>
            <div className="text-xs opacity-70">No Time</div>
          </motion.div>
        </div>
      );
    case 'focus21':
      return (
        <div className="text-purple-300/70">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.7, 1, 0.7], 
              rotate: [0, 10, 0, -10, 0],
              filter: ['blur(0px)', 'blur(2px)', 'blur(0px)']
            }}
            transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <div className="font-medium text-sm">Focus 21</div>
            <div className="text-xs opacity-70">Other Energy Systems</div>
          </motion.div>
        </div>
      );
    default:
      return null;
  }
};

export default FocusLevelIndicator;
