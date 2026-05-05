import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Factory, Zap, AlertTriangle, 
  Play, RefreshCcw, TrendingUp, Cpu, Info, 
  ArrowRight, Sword, Hammer, Bird, Boxes, 
  Flame, Target, Globe, Unlock, Activity,
  Eye, Radar, Cog, Search
} from 'lucide-react';
import { useSounds } from './SoundProvider';

// Resource Particle Component
const ResourceParticle = ({ side, isActive }: { side: 'left' | 'right', isActive: boolean }) => {
  const startX = side === 'left' ? -180 : 180;
  
  return (
    <motion.div
      initial={{ x: startX, y: 0, opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ 
        x: 0, 
        opacity: [0, 1, 1, 0],
        scale: [0.4, 1, 1, 0.4],
        rotate: side === 'left' ? 360 : -360
      }}
      transition={{ 
        duration: isActive ? 1.5 : 2.5, 
        repeat: Infinity, 
        ease: "linear",
        delay: Math.random() * 2
      }}
      className={`absolute z-10 p-1.5 rounded-lg border shadow-lg backdrop-blur-sm ${
        isActive
        ? 'bg-eu-gold/20 border-eu-gold/50 text-eu-gold' 
        : 'bg-white/10 border-white/20 text-white/40'
      }`}
    >
      <div className="flex flex-col items-center">
        {Math.random() > 0.5 ? <Boxes size={12} /> : <Zap size={12} />}
      </div>
    </motion.div>
  );
};

export const SteelCoalVisual = () => {
  const [isAuthorityActive, setIsAuthorityActive] = useState(false);
  const [productionType, setProductionType] = useState<'civil' | 'military'>('civil');
  const [tension, setTension] = useState(0);
  const [prosperity, setProsperity] = useState(20);
  const [resistance, setResistance] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const { playClick, playSuccess } = useSounds();

  // Simulation logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isAuthorityActive) {
      interval = setInterval(() => {
        if (productionType === 'military') {
          // In "National mode", choosing military is seen as a threat
          setTension(prev => Math.min(prev + 5, 100)); 
          setProsperity(prev => Math.max(prev - 1.2, 0));
          setResistance(prev => Math.max(prev - 2, 0)); // Military build-up can satisfy nationalists
        } else {
          // Even in civil mode, without the plan, suspicion remains high
          setTension(prev => Math.max(prev - 1, 10)); // Base tension exists
          setProsperity(prev => Math.min(prev + 0.5, 40));
          setResistance(prev => Math.max(prev - 1, 0));
        }
      }, 500);
    } else {
      interval = setInterval(() => {
        // The Plan forces transparency and cooperation
        setTension(prev => Math.max(prev - 8, 0)); 
        setProsperity(prev => Math.min(prev + 2.5, 100));
        // Sovereignty loss increases political resistance
        setResistance(prev => Math.min(prev + 3, 100));
        
        if (productionType === 'military') setProductionType('civil');
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAuthorityActive, productionType]);

  const toggleAuthority = () => {
    if (!isAuthorityActive) {
      playSuccess();
    } else {
      playClick();
    }
    setIsAuthorityActive(!isAuthorityActive);
  };

  const getStatusText = () => {
    if (isAuthorityActive) {
      if (resistance > 80) return "POLITISCHER DRUCK: Nationalisten fordern Souveränität zurück. Die Gemeinschaft wackelt.";
      return "SYSTEMISCHE BREMSE: Vergemeinschaftung macht heimliche Rüstung extrem riskant und unrentabel.";
    }
    if (productionType === 'military') {
      return "NATIONALES WETTRÜSTEN: Ressourcen fließen in Waffen. Der Nachbar reagiert mit Misstrauen.";
    }
    return "SOUVERÄNE ISOLATION: Ohne gemeinsame Aufsicht bleibt die Angst vor der geheimen Rüstung des Anderen.";
  };

  return (
    <div className="relative w-full bg-eu-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl min-h-[600px] lg:min-h-[520px] flex flex-col group">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none transition-colors duration-1000">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[180px] rounded-full -translate-y-1/2 translate-x-1/2 transition-colors duration-1000 ${
          tension > 50 && !isAuthorityActive ? 'bg-red-900/40' : 'bg-eu-blue/10'
        }`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] blur-[180px] rounded-full translate-y-1/2 -translate-x-1/2 transition-colors duration-1000 ${
          isAuthorityActive ? 'bg-eu-gold/20' : 'bg-white/5'
        }`} />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-eu-dark/98 backdrop-blur-2xl flex items-center justify-center p-6 lg:p-10"
          >
            <div className="max-w-xl space-y-6 text-center">
              <div className="relative inline-block">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -inset-6 bg-eu-gold/10 blur-3xl rounded-full" 
                />
                <div className="relative w-16 h-16 bg-eu-gold/20 rounded-2xl flex items-center justify-center mx-auto border-2 border-eu-gold/30 shadow-2xl">
                  <Activity className="text-eu-gold" size={32} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                  DER <span className="text-eu-gold">SCHUMAN-PLAN</span>
                </h5>
                <p className="text-slate-300 font-light leading-relaxed text-base lg:text-lg">
                  Der Schuman-Plan war ein <span className="text-white font-bold">systemischer Filter</span>. 
                  In dieser Simulation siehst du, wie eine <span className="text-eu-gold font-bold italic">transnationale Kontrolle</span> den Weg zum Krieg strukturell erschwert, aber politischen Widerstand erzeugt.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                 <button 
                  onClick={() => { playClick(); setShowTutorial(false); }}
                  className="group relative w-full py-4 bg-eu-gold text-eu-dark font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all text-xl shadow-[0_20px_60px_rgba(255,204,0,0.3)] overflow-hidden"
                >
                  SIMULATION STARTEN <ArrowRight size={20} />
                </button>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Beinhaltet Elemente politischer Reibung</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Simulation Section */}
      <div className="relative z-10 grow flex flex-col p-5 lg:p-8">
        
        {/* Header Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-eu-gold animate-soft-glow" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-eu-gold/60 italic">Sicherheits-Ebene: Supranational</span>
            </div>
            <h4 className="text-2xl lg:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
              STRUKTUR <span className="text-eu-gold">DES FRIEDENS</span>
            </h4>
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={() => { playClick(); setShowTutorial(true); }}
               className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all tracking-[0.2em]"
             >
               Historik
             </button>
             <button 
              onClick={() => {
                playClick();
                setIsAuthorityActive(false);
                setTension(0);
                setProsperity(20);
                setResistance(0);
                setProductionType('civil');
              }}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 border border-white/10 transition-all"
             >
              <RefreshCcw size={14} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center grow">
          
          {/* Dashboard Left - Telemetry */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full py-4 space-y-8 lg:space-y-0 lg:pl-10">
            <div className="space-y-6">
              {/* Tension Meter */}
              <div className="space-y-1.5 lg:-translate-x-8">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${tension > 50 && !isAuthorityActive ? 'text-red-500' : 'text-white/40'}`}>Eskalation</span>
                  </div>
                  <span className="text-xl font-black text-white italic tracking-tighter">{tension}%</span>
                </div>
                <div className="h-2.5 bg-black/50 rounded-lg overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    className={`h-full rounded-md transition-colors duration-1000 ${
                      tension > 70 && !isAuthorityActive ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)]' : 'bg-white/20'
                    }`}
                    animate={{ width: `${tension}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>

              {/* Prosperity Meter */}
              <div className="space-y-1.5 lg:-translate-x-8">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${prosperity > 60 ? 'text-eu-gold' : 'text-white/40'}`}>Wohlstand</span>
                  </div>
                  <span className="text-xl font-black text-white italic tracking-tighter">{Math.round(prosperity)}%</span>
                </div>
                <div className="h-2.5 bg-black/50 rounded-lg overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-eu-gold to-yellow-200 rounded-md"
                    animate={{ width: `${prosperity}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Resistance Meter */}
              <div className="space-y-1.5 lg:-translate-x-8">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${resistance > 50 ? 'text-purple-400' : 'text-white/40'}`}>Widerstand</span>
                  </div>
                  <span className="text-xl font-black text-white italic tracking-tighter">{Math.round(resistance)}%</span>
                </div>
                <div className="h-2.5 bg-black/50 rounded-lg overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    className="h-full bg-purple-500 rounded-md"
                    animate={{ width: `${resistance}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>

              {/* Analysis Box */}
              <div className={`relative p-4 rounded-xl border transition-all duration-700 backdrop-blur-3xl overflow-hidden ${
                tension > 50 && !isAuthorityActive ? 'bg-red-500/10 border-red-500/40' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="relative z-10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-black uppercase text-white/50 italic tracking-widest">Analyse</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-light leading-relaxed min-h-[40px]">
                    {getStatusText()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Center: The Engine of Peace */}
          <div className="lg:col-span-6 flex flex-col items-center py-6 lg:py-0">
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              
              {/* Outer Glow Orb */}
              <motion.div 
                animate={{ 
                  scale: isAuthorityActive ? [1, 1.05, 1] : 1,
                  opacity: isAuthorityActive ? [0.2, 0.4, 0.2] : 0.1
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute w-full h-full rounded-full blur-[80px] transition-colors duration-1000 ${
                  isAuthorityActive ? 'bg-eu-gold' : tension > 50 ? 'bg-red-500' : 'bg-eu-blue'
                }`} 
              />

              {/* The Core Machine */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
                
                {/* Rotating Architectural Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ rotate: isAuthorityActive ? (i % 2 === 0 ? 360 : -360) : 0 }}
                    transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 border rounded-2xl transition-all duration-1000 ${
                      isAuthorityActive ? 'border-eu-gold opacity-100' : 'border-white/5 opacity-40'
                    }`}
                    style={{ margin: `${i * 10}px`, borderStyle: i === 1 ? 'dashed' : 'solid' }}
                  >
                    {isAuthorityActive && (
                      <React.Fragment>
                        {i === 0 && (
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-eu-dark p-2 border-2 border-eu-gold rounded-full z-50 shadow-[0_0_20px_rgba(255,204,0,0.5)]"
                          >
                            <Eye size={18} className="text-eu-gold" />
                          </motion.div>
                        )}
                        {i === 1 && (
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-eu-dark p-2 border-2 border-eu-gold rounded-full z-50 shadow-[0_0_20px_rgba(255,204,0,0.5)]"
                          >
                            <Search size={18} className="text-eu-gold" />
                          </motion.div>
                        )}
                        {i === 2 && (
                          <React.Fragment>
                            <motion.div 
                              animate={{ rotate: -360 }}
                              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-eu-dark p-2 border-2 border-eu-gold rounded-full z-50 shadow-[0_0_20px_rgba(255,204,0,0.5)]"
                            >
                              <Radar size={16} className="text-eu-gold" />
                            </motion.div>
                            <motion.div 
                              animate={{ rotate: -360 }}
                              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                              className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-eu-dark p-2 border-2 border-eu-gold rounded-full z-50 shadow-[0_0_20px_rgba(255,204,0,0.5)]"
                            >
                              <Cog size={16} className="text-eu-gold" />
                            </motion.div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                  </motion.div>
                ))}

                {/* The Hub Unit */}
                <motion.div 
                  className={`relative w-24 h-24 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center border-4 transition-all duration-1000 z-40 overflow-hidden ${
                    isAuthorityActive 
                    ? 'bg-eu-dark border-eu-gold shadow-[0_0_80px_rgba(255,204,0,0.4)]' 
                    : tension > 70 
                      ? 'bg-black/80 border-red-500/50'
                      : 'bg-black/60 border-white/20'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isAuthorityActive ? (
                      <motion.div 
                        key="active"
                        initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className="flex flex-col items-center text-center p-3"
                      >
                         <div className="relative">
                           <motion.div 
                             animate={{ scale: [1, 1.2, 1] }} 
                             transition={{ duration: 2, repeat: Infinity }}
                             className="absolute -inset-2 bg-eu-gold/20 blur-md rounded-full" 
                           />
                           <Lock className="text-eu-gold relative" size={32} strokeWidth={3} />
                         </div>
                         <div className="mt-1.5 space-y-1">
                           <span className="text-[8px] font-black uppercase text-eu-gold tracking-[0.2em] block leading-none">Behörde</span>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="inactive"
                        initial={{ scale: 0.8, opacity: 0, rotate: 90 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex flex-col items-center text-center p-3"
                      >
                        <Unlock className="text-white/20" size={32} strokeWidth={1} />
                        <span className="text-[7px] font-black uppercase text-white/20 tracking-[0.2em] mt-1 block">Offen</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Flow Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(isAuthorityActive ? 8 : 4)].map((_, i) => (
                      <ResourceParticle key={i} side={i % 2 === 0 ? 'left' : 'right'} isActive={isAuthorityActive} />
                    ))}
                </div>
              </div>

              {/* Side Modules: Frankreich & Deutschland */}
              <div className="absolute top-1/2 -left-2 md:-left-4 lg:-left-8 -translate-y-1/2 z-20">
                <motion.div 
                  animate={tension > 80 && !isAuthorityActive ? { x: [-2, 2, -2], y: [1, -1, 1] } : {}}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className={`p-3 md:p-5 rounded-2xl border-2 bg-eu-dark/95 backdrop-blur-2xl transition-all duration-700 flex flex-col items-center gap-2 ${
                    productionType === 'military' && !isAuthorityActive ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-white/10 group-hover:border-white/20'
                  }`}
                >
                   <div className="relative">
                      {productionType === 'military' && !isAuthorityActive ? <Sword className="text-red-500" size={20} /> : <Boxes className="text-white/30" size={20} />}
                      {productionType === 'military' && !isAuthorityActive && (
                        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }} className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full blur-[1px]" />
                      )}
                   </div>
                   <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 italic">Frankreich</div>
                </motion.div>
              </div>

              <div className="absolute top-1/2 -right-2 md:-right-4 lg:-right-8 -translate-y-1/2 z-20">
                <motion.div 
                  animate={tension > 80 && !isAuthorityActive ? { x: [2, -2, 2], y: [-1, 1, -1] } : {}}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className={`p-3 md:p-5 rounded-2xl border-2 bg-eu-dark/95 backdrop-blur-2xl transition-all duration-700 flex flex-col items-center gap-2 ${
                    productionType === 'military' && !isAuthorityActive ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-white/10 group-hover:border-white/20'
                  }`}
                >
                   <div className="relative">
                      {productionType === 'military' && !isAuthorityActive ? <Sword className="text-red-500" size={20} /> : <Boxes className="text-white/30" size={20} />}
                      {productionType === 'military' && !isAuthorityActive && (
                        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }} className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full blur-[1px]" />
                      )}
                   </div>
                   <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 italic">Deutschland</div>
                </motion.div>
              </div>

              {/* Status Ribbon Top */}
              <div className="absolute top-0 w-full flex justify-center">
                 <motion.div 
                   animate={isAuthorityActive ? { y: [0, -2, 0] } : {}}
                   transition={{ duration: 3, repeat: Infinity }}
                   className={`flex items-center gap-3 px-6 py-2 rounded-xl border transition-all duration-1000 ${
                     isAuthorityActive ? 'bg-eu-blue/20 border-eu-blue text-white' : 'bg-white/5 border-white/5 text-white/20'
                   }`}
                 >
                    {isAuthorityActive ? <Bird size={14} className="text-eu-blue animate-soft-glow" /> : <Flame size={14} className="opacity-30" />}
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">
                      {isAuthorityActive ? 'Stabil' : 'Gefahr'}
                    </span>
                 </motion.div>
              </div>
            </div>
          </div>

          {/* User Controls Right - Interaction */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full py-4 space-y-8 lg:space-y-0 text-right lg:pr-10">
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 block border-r-2 border-eu-gold/20 pr-4 italic">I. Nationale Entscheidung</label>
              
              <div className="grid grid-cols-1 gap-4 lg:translate-x-8">
                 <button 
                  disabled={isAuthorityActive}
                  onClick={() => { playClick(); setProductionType('civil'); }}
                  className={`group relative p-4 rounded-2xl border transition-all flex items-center justify-end gap-4 ${
                    productionType === 'civil' 
                    ? 'bg-eu-blue/30 border-eu-blue text-white shadow-xl' 
                    : 'bg-white/5 border-white/5 text-white/20 hover:bg-white/10'
                  } ${isAuthorityActive && 'cursor-not-allowed opacity-50'}`}
                >
                  <div className="text-right relative z-10">
                    <div className="text-xs font-black uppercase italic leading-none">Wirtschaft</div>
                    <div className="text-[7px] font-bold opacity-30 uppercase tracking-widest mt-0.5">Friedensnutzung</div>
                  </div>
                  <Hammer size={18} className={productionType === 'civil' ? 'text-eu-blue' : 'opacity-20'} />
                </button>

                <button 
                  disabled={isAuthorityActive}
                  onClick={() => { playClick(); setProductionType('military'); }}
                  className={`group relative p-4 rounded-2xl border transition-all flex items-center justify-end gap-4 ${
                    productionType === 'military' 
                    ? 'bg-red-900/30 border-red-600 text-white shadow-xl' 
                    : 'bg-white/5 border-white/5 text-white/20 hover:bg-white/10'
                  } ${isAuthorityActive && 'cursor-not-allowed opacity-50'}`}
                >
                  <div className="text-right relative z-10">
                    <div className="text-xs font-black uppercase italic leading-none">Rüstung</div>
                    <div className="text-[7px] font-bold opacity-30 uppercase tracking-widest mt-0.5">Militärische Macht</div>
                  </div>
                  <Sword size={18} className={productionType === 'military' ? 'text-red-500' : 'opacity-20'} />
                </button>
              </div>
            </div>

            <div className="pt-4 lg:translate-x-8">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-eu-gold block mb-4 px-1 italic">II. Plan-Kontrolle</label>
              <button 
                onClick={toggleAuthority}
                className={`w-full py-6 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-1000 relative overflow-hidden group/btn ${
                  isAuthorityActive 
                  ? 'bg-eu-gold text-eu-dark font-black shadow-2xl scale-[1.05]' 
                  : 'bg-white/10 text-white hover:bg-white/20 border border-eu-gold'
                }`}
              >
                 <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                
                <AnimatePresence mode="wait">
                  {isAuthorityActive ? (
                    <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center relative z-10">
                      <Lock size={24} strokeWidth={3} />
                      <span className="text-[10px] uppercase mt-1 tracking-[0.2em] font-black italic text-center leading-none">AKTIV</span>
                    </motion.div>
                  ) : (
                    <motion.div key="inactive" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center relative z-10">
                      <Play size={24} className="ml-0.5" />
                      <span className="text-[10px] uppercase mt-1 tracking-[0.2em] font-black text-center leading-none">SYSTEM AKTIVIEREN</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Deep Dive Narrative Footer */}
      <div className="relative bg-black/60 border-t border-white/5 p-4 md:p-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="relative shrink-0">
             <div className="absolute -inset-6 bg-eu-gold/20 blur-[50px] rounded-full animate-pulse" />
             <div className="relative w-20 h-20 bg-eu-dark border-2 border-eu-gold rounded-xl flex flex-col items-center justify-center shadow-2xl">
               <span className="text-eu-gold font-black text-2xl italic leading-none">IDEE</span>
               <div className="w-8 h-px bg-eu-gold opacity-30 my-1.5" />
               <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Jean Monnet</span>
             </div>
          </div>
          
          <div className="space-y-4 text-center md:text-left flex-1">
            <h5 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-[0.05em] leading-tight">
              „In Frieden leben bedeutet <span className="text-eu-gold">Souveränität</span> zu teilen“
            </h5>
            <p className="text-base text-slate-400 font-light leading-relaxed">
              Der Schuman-Plan war kein Zaubermittel, aber ein <span className="text-white font-bold">systemischer Schutzwall</span>. 
              Durch die Vergemeinschaftung der Schwerindustrie wurde der Alleingang für den Krieg <span className="italic text-eu-gold font-bold underline decoration-eu-gold/30 underline-offset-4">materiell unattraktiv</span>, weil Transparenz und Abhängigkeit heimliche Aufrüstung fast unschädlich machten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
