import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  Globe, 
  Scale, 
  Coins, 
  Cpu, 
  ChevronRight,
  Shield,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GlossaryTerm } from './Glossary';

type Phase = 'loading' | 'selection';

interface Group {
  id: number;
  name: string;
  color: string;
  icon: React.ReactNode;
  briefing: React.ReactNode;
}

const GROUPS: Group[] = [
  { 
    id: 1, 
    name: 'Geschichte & Entstehung', 
    color: 'text-amber-400', 
    icon: <History className="w-8 h-8" />, 
    briefing: <>Anfänge der EU: Von Kohle und Stahl (<GlossaryTerm termKey="EGKS">EGKS</GlossaryTerm>) zum <GlossaryTerm termKey="Friedensprojekt">Friedensprojekt</GlossaryTerm>.</>
  },
  { 
    id: 2, 
    name: 'Mitgliedsstaaten & Vielfalt', 
    color: 'text-cyan-400', 
    icon: <Globe className="w-8 h-8" />, 
    briefing: <>Vielfalt der 27 Länder und Leben im <GlossaryTerm termKey="Schengen-Raum">Schengen-Raum</GlossaryTerm>.</>
  },
  { 
    id: 3, 
    name: 'Institutionen & Prozesse', 
    color: 'text-purple-400', 
    icon: <Scale className="w-8 h-8" />, 
    briefing: <>Die <GlossaryTerm termKey="Institutionen">Machtzentralen</GlossaryTerm>: Wie die EU heute gemeinsam entscheidet.</>
  },
  { 
    id: 4, 
    name: 'Wirtschaft & Binnenmarkt', 
    color: 'text-emerald-400', 
    icon: <Coins className="w-8 h-8" />, 
    briefing: <><GlossaryTerm termKey="Binnenmarkt" />: Wirtschaft, Euro und freies Reisen im gemeinsamen <GlossaryTerm termKey="Wirtschaftsraum" />.</>
  },
  { 
    id: 5, 
    name: 'Herausforderungen & Zukunft', 
    color: 'text-blue-400', 
    icon: <Cpu className="w-8 h-8" />, 
    briefing: 'Zukunft der Union: Klima, Technik und neue digitale Visionen.'
  },
];

export const IntroTutorial: React.FC<{ onComplete: (groupId: number) => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>('loading');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Loading phase progression
  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('selection'), 800);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[100] overflow-y-auto scrollbar-none font-sans text-white bg-slate-950 flex flex-col items-center"
    >
      {/* Simplified Cyber Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[110] opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[60px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[60px]" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: LOADING */}
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex-1 flex items-center justify-center w-full max-w-md px-6 text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                EU Archive
              </h1>
              <p className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-[10px]">
                Analytical Database Access
              </p>
            </motion.div>

            <div className="space-y-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-mono text-cyan-500 uppercase animate-pulse">
                  System Initialization...
                </span>
                <span className="text-[10px] font-mono text-cyan-500">
                  {loadingProgress}%
                </span>
              </div>
              <div className="h-[1px] w-full bg-white/10 overflow-hidden relative">
                <motion.div 
                  className="h-full bg-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: GROUP SELECTION */}
        {phase === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-7xl px-4 md:px-8 py-12 md:py-20 flex flex-col"
          >
            <div className="text-center mb-12">

              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white mb-4">Sektor auswählen</h2>
              <p className="text-slate-400 font-medium tracking-tight">Wählen Sie einen Analysebereich für die Recherche-Einführung.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 xl:gap-4 items-stretch">
              {GROUPS.map((group, index) => (
                <motion.button
                  key={group.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onComplete(group.id)}
                  className="group relative flex flex-col bg-slate-900 rounded-2xl border border-white/10 p-6 text-left transition-all hover:bg-slate-800 overflow-hidden min-h-[160px] xl:min-h-[360px] xl:h-full"
                >
                  {/* Animated Border Glow - Simplified */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-cyan-500/30 rounded-2xl" />

                  {/* Large Stylized Group Number Background */}
                  <div className="absolute -bottom-4 -right-4 text-9xl font-black italic opacity-[0.03] group-hover:opacity-[0.07] transition-opacity select-none pointer-events-none">
                    {group.id}
                  </div>

                   {/* Header: Prominent Group ID */}
                  <div className="relative z-10 flex flex-col mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-cyan-400 font-mono text-[9px] tracking-[0.3em] uppercase font-bold truncate">Sektor Zuweisung</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    </div>
                    <div className="flex items-baseline gap-1 md:gap-2">
                       <span className="text-xl lg:text-2xl xl:text-3xl font-black italic text-white group-hover:text-cyan-400 transition-colors tracking-tighter shrink-0">GRUPPE</span>
                       <span className="text-3xl lg:text-5xl xl:text-6xl font-black italic text-cyan-500 tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">{group.id}</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="relative z-10 flex items-center xl:flex-col xl:items-start gap-4 mb-6">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-950/50 border border-white/5 flex items-center justify-center transition-all group-hover:scale-110",
                      group.color
                    )}>
                      {React.cloneElement(group.icon as React.ReactElement, { className: "w-5 h-5 lg:w-6 lg:h-6" })}
                    </div>
                    <h3 className="text-xs lg:text-sm xl:text-base font-bold text-white/90 leading-tight tracking-tight uppercase break-words">
                      {group.name}
                    </h3>
                  </div>

                  {/* Briefing Text */}
                  <p className="relative z-10 text-xs text-slate-400 leading-relaxed lg:line-clamp-none mb-8">
                    {group.briefing}
                  </p>

                  {/* Footer Action */}
                  <div className="relative z-10 mt-auto pt-4 border-t border-white/5 w-full flex items-center justify-between group-hover:border-cyan-500/20 transition-colors">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 group-hover:text-cyan-400">
                      Beitreten
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            

          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightweight Decorative Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 1 }}
          />
        ))}
      </div>
    </motion.div>
  );
};
