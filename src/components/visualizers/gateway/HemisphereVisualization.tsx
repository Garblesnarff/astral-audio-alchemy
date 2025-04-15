
import React from 'react';
import { motion } from 'framer-motion';

interface HemisphereVisualizationProps {
  pulsateSpeed: number;
}

const HemisphereVisualization: React.FC<HemisphereVisualizationProps> = ({ pulsateSpeed }) => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left hemisphere */}
        <motion.div
          className="absolute w-16 h-32 left-0 top-0 rounded-l-full border-l border-y border-cyan-500/30 bg-gradient-to-r from-cyan-800/20 to-cyan-600/5"
          animate={{ 
            boxShadow: ['0 0 5px rgba(6, 182, 212, 0.3)', '0 0 20px rgba(6, 182, 212, 0.5)', '0 0 5px rgba(6, 182, 212, 0.3)'] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Right hemisphere */}
        <motion.div
          className="absolute w-16 h-32 left-16 top-0 rounded-r-full border-r border-y border-indigo-500/30 bg-gradient-to-l from-indigo-800/20 to-indigo-600/5"
          animate={{ 
            boxShadow: ['0 0 5px rgba(99, 102, 241, 0.3)', '0 0 20px rgba(99, 102, 241, 0.5)', '0 0 5px rgba(99, 102, 241, 0.3)'] 
          }}
          transition={{ duration: 2, repeatDelay: 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Connection visualization */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-24 bg-white/40"
          animate={{ 
            height: [24, 32, 24],
            opacity: [0.4, 0.7, 0.4],
            boxShadow: ['0 0 3px rgba(255, 255, 255, 0.3)', '0 0 10px rgba(255, 255, 255, 0.6)', '0 0 3px rgba(255, 255, 255, 0.3)'] 
          }}
          transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default HemisphereVisualization;
