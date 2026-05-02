import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 35); // ~3.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-[#000103] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambience - Increased contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,51,153,0.3)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,204,0,0.08)_0%,transparent_50%)]" />
      
      {/* Central Composition */}
      <div className="relative flex flex-col items-center">
        
        {/* The Orbiting Stars System */}
        <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
          
          {/* Orbit rings (visual guides) */}
          <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
          <div className="absolute inset-0 border border-white/10 rounded-full" />
          
          {/* Rotating Container for 12 stars */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -ml-2 -mt-2"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-100px)`
                }}
              >
                {/* 5-Pointed Star Icon */}
                <motion.div
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut" 
                  }}
                  className="text-eu-gold drop-shadow-[0_0_8px_rgba(255,204,0,0.8)]"
                >
                  <Star size={16} fill="currentColor" />
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Pulsating Central Core (The Square/Diamond) */}
          <div className="relative z-20 w-16 h-16 animate-pulse-glow flex items-center justify-center">
             <div className="w-full h-full bg-eu-gold rounded-sm flex items-center justify-center shadow-[0_0_35px_rgba(255,204,0,0.6)]">
               <div className="w-full h-full bg-eu-dark/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  {/* Counter-rotate the E to keep it upright while the container pulses/rotates */}
                  <span className="text-white font-black text-2xl italic select-none -rotate-45 mt-0.5">E</span>
               </div>
             </div>
          </div>
        </div>

        {/* Textual UI */}
        <div className="text-center relative z-10 w-80">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white font-black italic uppercase text-4xl mb-2 tracking-[0.4em] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              EUROPA
            </h1>
            <p className="text-[11px] text-eu-gold/70 uppercase font-black tracking-[0.6em] mb-10">
              Infrastruktur wird geladen
            </p>
          </motion.div>
          
          {/* Progress Bar with Glow */}
          <div className="relative">
            <div className="w-full h-[4px] bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-eu-gold"
                style={{ 
                   width: `${progress}%`,
                   boxShadow: '0 0 20px #ffcc00'
                }}
              />
            </div>
            {/* Ambient glow behind progress */}
            <div className="absolute inset-x-0 -bottom-4 h-8 bg-eu-gold/10 blur-xl -z-10 rounded-full" />
          </div>
          
          <div className="mt-6 flex justify-between items-center px-2 font-mono text-[10px] uppercase tracking-widest">
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-eu-gold"
            >
              • Processing
            </motion.span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Modern UI Accents */}
      <div className="absolute top-0 left-0 w-full p-10 flex justify-between items-start pointer-events-none">
        <div className="w-6 h-6 border-t-2 border-l-2 border-eu-gold/40" />
        <div className="text-[11px] text-white/20 font-mono tracking-[0.2em]">EU_OS_RECON_ALPHA_04</div>
        <div className="w-6 h-6 border-t-2 border-r-2 border-eu-gold/40" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-10 flex justify-between items-end pointer-events-none">
        <div className="w-6 h-6 border-b-2 border-l-2 border-eu-gold/40" />
        <div className="text-[9px] text-white/5 font-mono max-w-[120px] text-left leading-tight">
          ESTABLISHING SECURE CONNECTION...
          <br />STATUS: NOMINAL
        </div>
        <div className="w-6 h-6 border-b-2 border-r-2 border-eu-gold/40" />
      </div>
    </motion.div>
  );
}

