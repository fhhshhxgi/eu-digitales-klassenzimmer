import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Shield, Cpu, Zap, Globe2, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const challengeData = [
  {
    id: "climate",
    title: "Klimaneutralität",
    icon: <Leaf />,
    color: "from-green-500 to-emerald-400",
    tag: "Green Deal",
    description: "Der Umbau der Industrie zur Erreichung der Klimaziele 2050 ist die größte wirtschaftliche Transformation.",
    statLabel: "Zielsetzung",
    stat: "Net-Zero"
  },
  {
    id: "digital",
    title: "KI & Souveränität",
    icon: <Cpu />,
    color: "from-purple-500 to-pink-500",
    tag: "AI Act",
    description: "Europa setzt globale Standards für künstliche Intelligenz und schützt gleichzeitig die digitale Privatsphäre.",
    statLabel: "Fokus",
    stat: "Ethik & Innovation"
  },
  {
    id: "security",
    title: "Sicherheit",
    icon: <Shield />,
    color: "from-orange-500 to-red-500",
    tag: "Defense",
    description: "In einer multipolaren Welt muss die EU ihre eigene Verteidigungsfähigkeit und strategische Autonomie stärken.",
    statLabel: "Priorität",
    stat: "Resilienz"
  },
  {
    id: "economy",
    title: "Wachstum",
    icon: <TrendingUp />,
    color: "from-blue-500 to-indigo-500",
    tag: "Innovation",
    description: "Wettbewerbsfähigkeit gegenüber Asien und USA durch Förderung von Deep-Tech und Fachkräften.",
    statLabel: "Motor",
    stat: "Investition"
  }
];

export function ChallengeRadar() {
  const [selected, setSelected] = useState(challengeData[0]);

  return (
    <div className="mt-12 lg:flex gap-8 items-stretch">
      {/* Selector Side */}
      <div className="lg:w-1/3 grid grid-cols-1 gap-4 mb-8 lg:mb-0">
        {challengeData.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c)}
            className={`p-1 rounded-2xl border transition-all text-left group relative overflow-hidden ${
              selected.id === c.id 
                ? 'bg-white/10 border-white/20' 
                : 'bg-white/5 border-white/5 hover:bg-white/8'
            }`}
          >
            {selected.id === c.id && (
              <motion.div 
                layoutId="radar-active"
                className={`absolute inset-0 bg-gradient-to-r ${c.color} opacity-10`}
              />
            )}
            <div className="flex items-center gap-4 p-4 relative z-10">
               <div className={`p-3 rounded-xl bg-white/5 ${selected.id === c.id ? 'text-eu-gold' : 'text-white/40'}`}>
                  {React.cloneElement(c.icon as React.ReactElement, { size: 20 })}
               </div>
               <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">{c.tag}</p>
                  <p className="text-sm font-bold text-white">{c.title}</p>
               </div>
            </div>
          </button>
        ))}
      </div>

      {/* Visual Content Side */}
      <div className="flex-1 glass-card p-8 border-white/5 bg-gradient-to-br from-white/5 to-transparent flex flex-col justify-between overflow-hidden relative">
         <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10 h-full flex flex-col"
            >
               <div className="flex justify-between items-start mb-8">
                  <div className={`p-5 rounded-3xl bg-gradient-to-br ${selected.color} text-eu-dark shadow-2xl`}>
                    {React.cloneElement(selected.icon as React.ReactElement, { size: 48 })}
                  </div>
                  <div className="text-right">
                     <p className="text-5xl font-black text-white font-mono">{selected.stat}</p>
                     <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold">{selected.statLabel}</p>
                  </div>
               </div>

               <div className="flex-1">
                  <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">
                    {selected.title}
                  </h3>
                  <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
                    {selected.description}
                  </p>
               </div>

               <div className="mt-12 flex items-center gap-8">
                  <div className="flex-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 font-mono">Strategisches Handlungsfeld</p>
                     <div className="h-px bg-white/10 w-full" />
                  </div>
                  <div className="flex gap-4">
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-eu-gold">
                        <Target size={20} />
                     </div>
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40">
                        <Zap size={20} />
                     </div>
                  </div>
               </div>

               {/* Background Decorative Element */}
               <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-10 bg-gradient-to-br ${selected.color}`} />
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
