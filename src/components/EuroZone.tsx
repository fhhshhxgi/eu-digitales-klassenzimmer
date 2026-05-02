import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Landmark, TrendingDown, ShieldCheck, Zap } from 'lucide-react';

const euroFeatures = [
  {
    title: "Preisstabilität",
    description: "Die EZB sorgt dafür, dass dein Geld seinen Wert behält (Ziel: 2% Inflation).",
    icon: <Target size={20} className="text-eu-gold" />
  },
  {
    title: "Kein Umtausch",
    description: "Grenzenloses Bezahlen ohne Wechselgebühren in 20 Ländern.",
    icon: <Coins size={20} className="text-blue-400" />
  },
  {
    title: "Krisenschutz",
    description: "Gemeinsamer Rettungsschirm (ESM) für finanzielle Stabilität.",
    icon: <ShieldCheck size={20} className="text-green-400" />
  }
];

import { Target } from 'lucide-react';

export function EuroZone() {
  return (
    <div className="mt-12 glass-card p-8 border-eu-blue/20 bg-gradient-to-br from-blue-900/10 to-transparent">
       <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-eu-gold/20 rounded-2xl text-eu-gold">
                   <Landmark size={32} />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Die Eurozone</h3>
                   <p className="text-eu-gold font-mono text-xs uppercase tracking-widest">Hüterin der Währung</p>
                </div>
             </div>
             
             <p className="text-slate-300 leading-relaxed mb-8">
                Die Europäische Zentralbank (EZB) in Frankfurt verwaltet den Euro für über 340 Millionen Menschen. Sie ist politisch unabhängig und hat das vorrangige Ziel, die Preise stabil zu halten.
             </p>

             <div className="space-y-4">
                {euroFeatures.map((f, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all"
                  >
                     <div className="shrink-0">{f.icon}</div>
                     <div>
                        <p className="font-bold text-white text-sm">{f.title}</p>
                        <p className="text-xs text-slate-400">{f.description}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="lg:w-72 flex flex-col gap-4">
             <div className="p-6 bg-black/40 rounded-3xl border border-white/10 text-center">
                <p className="text-[10px] uppercase font-black text-white/40 mb-2">Leitzins</p>
                <div className="text-4xl font-black text-white mb-1">variabel</div>
                <TrendingDown size={24} className="mx-auto text-eu-gold animate-bounce" />
                <p className="text-[10px] text-slate-500 mt-4 italic">Wichtigstes Instrument zur Steuerung der Wirtschaftslage.</p>
             </div>

             <div className="flex-1 p-6 bg-eu-gold/10 rounded-3xl border border-eu-gold/20 flex flex-col justify-center items-center text-center">
                <Zap size={32} className="text-eu-gold mb-4" />
                <p className="text-xs font-bold text-white mb-2">Währungsunion</p>
                <p className="text-[10px] text-slate-400">Der Euro ist nach dem US-Dollar die zweitwichtigste Reservewährung der Welt.</p>
             </div>
          </div>
       </div>
    </div>
  );
}
