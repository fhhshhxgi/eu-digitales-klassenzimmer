import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-eu-dark flex flex-col items-center justify-center"
    >
      <div className="relative w-16 h-16">
        {/* Statischer Kreis (Basis) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-eu-gold/20 rounded-full"
        />
        {/* Rotierender Spinner-Effekt (Sekundär) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-eu-gold rounded-full"
        />
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="mt-4 text-[10px] uppercase tracking-[0.4em] font-black text-white"
      >
        Wird geladen
      </motion.p>
    </motion.div>
  );
}
