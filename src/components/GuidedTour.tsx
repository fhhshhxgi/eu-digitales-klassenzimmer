import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, ChevronLeft, X, Play, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSounds } from './SoundProvider';

export interface TourStep {
  selector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  offsetY?: number;
}

export interface GuidedTourProps {
  steps: TourStep[];
  onComplete: () => void;
  groupId: number;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ steps, onComplete, groupId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [isReady, setIsReady] = useState(true);
  const { playTutorialStep } = useSounds();
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToCurrentStep = () => {
    const step = steps[currentStep];
    if (!step) return;

    const element = document.querySelector(step.selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      const isLarge = rect.height > window.innerHeight * 0.7;
      
      if (step.offsetY !== undefined) {
        const top = window.pageYOffset + rect.top + step.offsetY;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: (currentStep === 0 || isLarge) ? 'start' : 'center' 
        });
      }
    }
  };

  const updateCoords = () => {
    const step = steps[currentStep];
    if (!step) return;

    const element = document.querySelector(step.selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  useEffect(() => {
    // Scroll only when step changes
    scrollToCurrentStep();
    
    // Update coordinates immediately and at intervals to follow the smooth scroll
    updateCoords();
    const t1 = setTimeout(updateCoords, 100);
    const t2 = setTimeout(updateCoords, 300);
    const t3 = setTimeout(updateCoords, 600);
    const t4 = setTimeout(updateCoords, 1000);

    const handleScrollAndResize = () => {
      updateCoords();
    };

    window.addEventListener('resize', handleScrollAndResize);
    window.addEventListener('scroll', handleScrollAndResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('resize', handleScrollAndResize);
      window.removeEventListener('scroll', handleScrollAndResize);
    };
  }, [currentStep]);

  if (!isReady || !coords) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none font-sans overflow-hidden">
      {/* Background Dim */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
        style={{
          clipPath: `polygon(
            0% 0%, 
            0% 100%, 
            ${coords.left}px 100%, 
            ${coords.left}px ${coords.top}px, 
            ${coords.left + coords.width}px ${coords.top}px, 
            ${coords.left + coords.width}px ${coords.top + coords.height}px, 
            ${coords.left}px ${coords.top + coords.height}px, 
            ${coords.left}px 100%, 
            100% 100%, 
            100% 0%
          )`
        }}
      />

      {/* Target Ring */}
      <motion.div
        animate={{
          top: coords.top - 12,
          left: coords.left - 12,
          width: coords.width + 24,
          height: coords.height + 24,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute border-2 border-eu-gold/50 rounded-[2rem] z-10 box-content shadow-[0_0_40px_rgba(255,204,0,0.2)]"
      >
        {/* Animated Corner Brackets */}
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-lg" 
        />
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-lg" 
        />
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-lg" 
        />
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-lg" 
        />

        {/* Pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 bg-eu-gold/5 rounded-[2rem]"
        />
      </motion.div>

      {/* Info Card */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: 0, 
          top: (coords.height > window.innerHeight * 0.7) 
            ? Math.max(100, coords.top + 100) // Follow the top of the element but stay visible
            : (coords.top + coords.height + 32 > window.innerHeight - 300)
              ? Math.max(20, coords.top - 380) 
              : coords.top + coords.height + 32,
          left: Math.min(Math.max(coords.left + (coords.width / 2) - 160, 20), window.innerWidth - 340)
        }}
        className="absolute w-80 bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] pointer-events-auto z-20"
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-eu-gold/5 rounded-full blur-3xl -z-10" />

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-eu-gold/10 text-eu-gold border border-eu-gold/20">
            <Target className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-eu-gold uppercase tracking-[0.3em] font-bold">
              Archiv-Recherche
            </span>
            <span className="text-[10px] text-white/40 font-medium">
              Schritt {currentStep + 1} von {steps.length}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white tracking-tight leading-tight">{step.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          {step.content}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1.5">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-2 h-1 rounded-full transition-all duration-500",
                  i === currentStep ? "bg-eu-gold w-6 shadow-[0_0_10px_rgba(255,204,0,0.5)]" : "bg-white/10"
                )} 
              />
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            {currentStep > 0 && (
              <button 
                onClick={() => {
                  setCurrentStep(prev => prev - 1);
                  playTutorialStep();
                }}
                className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button 
                onClick={() => {
                  setCurrentStep(prev => prev + 1);
                  playTutorialStep();
                }}
                className="px-6 py-3 bg-eu-gold text-black text-xs font-black rounded-xl flex items-center group transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,204,0,0.3)]"
              >
                WEITER
                <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                onClick={() => {
                  onComplete();
                  playTutorialStep();
                }}
                className="px-6 py-3 bg-white text-black text-xs font-black rounded-xl flex items-center group transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                RECHERCHE STARTEN
                <Play className="w-3 h-3 ml-1 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Pointer Triangle */}
        {coords.height <= window.innerHeight * 0.7 && (
          <div className={cn(
            "absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950/90 rotate-45 border-l border-t border-white/10",
            coords.top + coords.height + 32 > window.innerHeight - 300 ? "-bottom-2 rotate-[225deg]" : "-top-2"
          )} />
        )}
      </motion.div>
    </div>
  );
};
