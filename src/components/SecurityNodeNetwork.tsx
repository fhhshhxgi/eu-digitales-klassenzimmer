import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Satellite, Users, Lock, Radio, Plus, Info } from 'lucide-react';
import { useSounds } from './SoundProvider';

const NODES = [
  {
    id: 'cyber',
    title: 'Cyber-Abwehr',
    icon: Lock,
    desc: 'Schutz vor hybrider Kriegsführung. Die EU koordiniert die Abwehr von Angriffen auf Kraftwerke und Wahlsysteme durch das EU-Cyber-Team.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    glow: 'shadow-[0_0_30px_rgba(129,140,248,0.2)]',
    x: '20%',
    y: '25%',
    label: 'PROTOCOL_V4'
  },
  {
    id: 'energy',
    title: 'Energie-Resilienz',
    icon: Zap,
    desc: 'Unabhängigkeit durch das "REPowerEU"-Programm. Stabile Stromnetze und der Ausbau von Wasserstoff-Infrastruktur sichern die Wirtschaft.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.2)]',
    x: '80%',
    y: '20%',
    label: 'GRID_STABILITY_HIGH'
  },
  {
    id: 'space',
    title: 'Galileo & IRIS²',
    icon: Satellite,
    desc: 'Europas eigene Satelliten-Konstellation. Unabhängigkeit von US-GPS und sichere Internet-Verbindung aus dem All für Krisenfälle.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    glow: 'shadow-[0_0_30px_rgba(56,189,248,0.2)]',
    x: '75%',
    y: '70%',
    label: 'GNSS_LOCKED'
  },
  {
    id: 'military',
    title: 'Militär-Union',
    icon: Users,
    desc: 'Keine klassische EU-Armee, aber PESCO: Gemeinsame Entwicklung von Verteidigungstechnik wie dem Euro-Panzer oder Drohnen-Schwärmen.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_30px_rgba(52,211,153,0.2)]',
    x: '25%',
    y: '75%',
    label: 'PESCO_SYNC'
  },
  {
    id: 'comms',
    title: 'Sichere Netze',
    icon: Radio,
    desc: 'Quanten-Verschlüsselung für Behörden und physischer Schutz der Unterseekabel, die 99% des globalen Datenverkehrs tragen.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    glow: 'shadow-[0_0_30px_rgba(251,113,133,0.2)]',
    x: '50%',
    y: '45%',
    label: 'QUANTUM_READY'
  }
];

export function SecurityNodeNetwork() {
  const [active, setActive] = useState<string | null>(null);
  const { playSecurityNode } = useSounds();

  const [isPortable, setIsPortable] = useState(false);
  React.useEffect(() => {
    const check = () => setIsPortable(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const activeNode = NODES.find(n => n.id === active);

  return (
    <div className={`w-full bg-eu-dark/60 border border-white/5 rounded-[4rem] p-8 md:p-16 ${isPortable ? '' : 'backdrop-blur-3xl'} overflow-hidden relative shadow-2xl`}>
      {/* Mesh-Hintergrund */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-12">
        {/* Info-Panel zur Souveränität (Linke Spalte) */}
        <div className="lg:w-1/3 flex flex-col justify-between py-4">
          <div>
            <div className="flex items-center gap-3 text-eu-gold mb-6">
              <Shield size={24} className="animate-pulse" />
              <span className="text-xs uppercase font-black tracking-[0.4em]">Integrität der EU</span>
            </div>
            <h4 className="text-4xl md:text-5xl font-display font-medium text-white mb-6 leading-tight">
              Sicherheit der <br/> <span className="text-eu-gold">Souveränität</span>
            </h4>
            <p className="text-slate-400 leading-relaxed font-sans text-lg mb-8">
              Strategische Autonomie bedeutet: Die EU kann eigenständig handeln, unabhängig von globalen Krisen oder fremden Giganten.
            </p>
          </div>

          <div className="relative min-h-[220px] mt-8">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`${activeNode.bg} ${activeNode.border} border rounded-3xl p-6 backdrop-blur-md`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${activeNode.color}`}>
                      <activeNode.icon size={32} />
                    </div>
                    <div>
                      <h5 className="text-xl font-display font-medium text-white">{activeNode.title}</h5>
                      <span className="text-[10px] font-mono opacity-50">{activeNode.label}</span>
                    </div>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed mb-6">
                    {activeNode.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-3">
                      <span className="text-[9px] text-slate-500 uppercase block mb-1">Last Auth</span>
                      <span className="text-[10px] text-white font-mono">1.2s ago</span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <span className="text-[9px] text-slate-500 uppercase block mb-1">Protection</span>
                      <span className="text-[10px] text-emerald-400 font-mono">MAXIMAL</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full border border-dashed border-white/10 rounded-3xl p-8 text-center"
                >
                  <Info className="text-white/20 mb-4" size={40} />
                  <p className="text-slate-500 text-sm italic">
                    Wähle einen Knotenpunkt im technischen Abwehrnetzwerk aus, um Details zur strategischen Unabhängigkeit anzuzeigen.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Technisches Netzwerk-Visualisierung (Rechte Spalte) */}
        <div className="lg:w-2/3 relative h-[500px] md:h-[650px] bg-black/40 rounded-[3rem] border border-white/5 shadow-inner overflow-hidden">
          {/* Animierte Verbindungen */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {NODES.map((node, i) => {
              if (node.id === 'comms') return null;
              const centerNode = NODES.find(n => n.id === 'comms')!;
              return (
                <g key={`conn-${i}`}>
                   <line
                    x1={node.x} y1={node.y}
                    x2={centerNode.x} y2={centerNode.y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                  {active === node.id && (
                    <motion.line
                      x1={node.x} y1={node.y}
                      x2={centerNode.x} y2={centerNode.y}
                      stroke="rgba(255,215,0,0.2)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  {/* Datenfluss-Partikel (nur auf Desktop oder aktivierter Node) */}
                  {(!isPortable || active === node.id) && (
                    <motion.circle
                      r="2"
                      fill="currentColor"
                      className="text-eu-gold/30"
                      animate={{
                        cx: [node.x, centerNode.x],
                        cy: [node.y, centerNode.y],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Knotenpunkte */}
          {NODES.map((node) => {
            const isActive = active === node.id;
            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative group">
                  {/* Dekorative Rotations-Elemente */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className={`absolute -inset-10 border border-white/5 rounded-full`}
                  />

                  {/* Knotenpunkt-Button */}
                  <motion.button
                    onClick={() => {
                      setActive(isActive ? null : node.id);
                      if (!isActive) playSecurityNode();
                    }}
                    whileHover={{ scale: 1.15 }}
                    className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-700
                      ${isActive ? `${node.bg} ${node.border} border-2 ${node.glow}` : 'bg-eu-dark/80 border border-white/10 hover:border-white/30'}
                    `}
                  >
                    {/* Fortschrittsring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                      <circle 
                        cx="50%" cy="50%" r="48%" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        className="text-white/5"
                      />
                      <motion.circle 
                        cx="50%" cy="50%" r="48%" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeDasharray="100 100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: isActive ? 0 : 100 }}
                        className={node.color}
                      />
                    </svg>

                    <div className={`${isActive ? node.color : 'text-slate-500 group-hover:text-white'} transition-all duration-500`}>
                      <node.icon size={isActive ? 36 : 28} />
                    </div>

                    {/* Beschriftung */}
                    <div className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 text-center transition-all duration-300
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                      <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">{node.title}</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}

          {/* Zentrales Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <div className="relative">
                <Shield size={300} strokeWidth={0.3} className="text-white/5 animate-pulse" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

