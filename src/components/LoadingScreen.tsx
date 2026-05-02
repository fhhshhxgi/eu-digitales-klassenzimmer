import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#000103] flex flex-col items-center justify-center p-6"
    >
      <div className="relative">
        {/* Animated Rings */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-eu-gold/20 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-32 h-32 border-2 border-eu-blue/30 rounded-full border-t-eu-gold border-r-eu-gold"
        />
        
        {/* Central Logo Symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-eu-gold rounded-sm rotate-45 animate-pulse shadow-[0_0_20px_rgba(255,204,0,0.4)]" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-white font-black italic tracking-[0.3em] uppercase text-xl mb-2">EUROPA</h2>
        <div className="flex items-center justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 bg-eu-gold rounded-full"
            />
          ))}
        </div>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-4">Wird initialisiert</p>
      </motion.div>
    </motion.div>
  );
}
