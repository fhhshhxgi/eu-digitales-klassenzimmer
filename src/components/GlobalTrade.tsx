import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Ship, Truck, Plane, ArrowRightLeft, BarChart3 } from 'lucide-react';

const tradeData = [
  { partner: "Intra-EU", export: "€4,400B+", import: "€4,200B+", color: "bg-eu-gold", isBig: true },
  { partner: "USA", export: "€502B", import: "€358B", color: "bg-blue-500" },
  { partner: "China", export: "€223B", import: "€514B", color: "bg-red-500" },
  { partner: "UK", export: "€335B", import: "€214B", color: "bg-indigo-500" },
  { partner: "Schweiz", export: "€188B", import: "€137B", color: "bg-red-600" }
];

export function GlobalTrade() {
  return (
    <div className="mt-12 glass-card p-8 border-eu-blue/20 bg-slate-900/40 relative overflow-hidden">
       <div className="absolute top-0 right-0 p-8 opacity-5">
          <Globe2 size={120} />
       </div>

       <div className="relative z-10">
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Die EU im Welthandel</h3>
          <p className="text-slate-400 text-sm max-w-2xl mb-8">
             Der Binnenhandel (Intra-EU) ist der größte Motor. Im globalen Vergleich verhandelt die EU als geschlossener Block mit Drittstaaten.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
             {tradeData.map((t, i) => (
               <motion.div 
                 key={t.partner}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className={`p-4 bg-white/5 rounded-2xl border ${t.isBig ? 'border-eu-gold/30 bg-eu-gold/5' : 'border-white/5'} hover:bg-white/10 transition-colors relative overflow-hidden`}
               >
                  {t.isBig && (
                     <div className="absolute top-0 right-0 p-2 opacity-10">
                        <ArrowRightLeft size={40} className="text-eu-gold" />
                     </div>
                  )}
                  <p className={`text-xs font-black uppercase tracking-widest ${t.isBig ? 'text-eu-gold' : 'text-white/40'} mb-3`}>{t.partner}</p>
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-[10px] mb-1">
                           <span className="text-white/40">Export</span>
                           <span className={t.isBig ? 'text-eu-gold font-bold' : 'text-green-400 font-mono'}>{t.export}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: t.isBig ? '95%' : '70%' }}
                              className={`h-full ${t.isBig ? 'bg-eu-gold' : 'bg-green-500'}`}
                           />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] mb-1">
                           <span className="text-white/40">Import</span>
                           <span className={t.isBig ? 'text-eu-gold font-bold' : 'text-blue-400 font-mono'}>{t.import}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: t.isBig ? '92%' : '60%' }}
                              className={`h-full ${t.isBig ? 'bg-eu-gold opacity-80' : 'bg-blue-500'}`}
                           />
                        </div>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-6 items-center bg-black/40 p-6 rounded-3xl border border-white/5">
             <div className="flex items-center gap-6">
                <div className="flex gap-2">
                   <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Ship size={20} /></div>
                   <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><Truck size={20} /></div>
                   <div className="p-2 bg-eu-gold/20 text-eu-gold rounded-lg"><Plane size={20} /></div>
                </div>
                <div>
                   <p className="text-sm font-bold text-white">Handelsmacht</p>
                   <p className="text-[10px] text-slate-400">Die EU macht ca. 15% des weltweiten Warenhandels aus.</p>
                </div>
             </div>
             <div className="h-px md:h-8 w-full md:w-px bg-white/10" />
             <div className="flex items-center gap-3">
                <ArrowRightLeft className="text-eu-gold" size={20} />
                <p className="text-[10px] text-slate-400 italic">"Globaler Einfluss durch gemeinsame Standards (der sogenannte 'Brussels Effect')."</p>
             </div>
          </div>
       </div>
    </div>
  );
}
