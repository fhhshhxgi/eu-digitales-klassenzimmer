import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe2, Landmark } from 'lucide-react';

const bipComparison = [
  { name: "USA", bip: "25 Bio. €", color: "bg-blue-600", share: 85 },
  { name: "Europäische Union", bip: "17 Bio. €", color: "bg-eu-gold", share: 65, isEU: true },
  { name: "China", bip: "16 Bio. €", color: "bg-red-600", share: 60 },
  { name: "Indien", bip: "3,4 Bio. €", color: "bg-orange-600", share: 15 }
];

export function EconomicPowerhouse() {
  return (
    <div className="mt-8 glass-card p-8 border-white/5 bg-slate-900/40 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
           <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Globaler Wirtschaftsvergleich</h3>
           <p className="text-slate-400 text-sm">BIP im Vergleich: Die EU als geschlossener Wirtschaftsraum.</p>
        </div>
        <div className="flex gap-4">
           <div className="p-3 bg-eu-gold/20 text-eu-gold rounded-xl border border-eu-gold/20">
              <Landmark size={24} />
           </div>
        </div>
      </div>

      <div className="space-y-8">
        {bipComparison.map((item, i) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-end">
               <div className="flex items-center gap-3">
                  <span className={`text-sm font-black uppercase tracking-widest ${item.isEU ? 'text-eu-gold italic' : 'text-white/60'}`}>
                    {item.name}
                  </span>
                  {item.isEU && <span className="text-[10px] bg-eu-gold text-eu-dark px-1.5 py-0.5 rounded font-black">BLOCK</span>}
               </div>
               <span className={`font-mono text-xs ${item.isEU ? 'text-eu-gold' : 'text-white/40'}`}>{item.bip}</span>
            </div>
            
            <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 group">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${item.share}%` }}
                 transition={{ duration: 0.8, ease: "circOut", delay: i * 0.05 }}
                 className={`h-full ${item.color} relative group-hover:brightness-125 transition-all`}
               >
                  {item.isEU && (
                    <motion.div 
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-white/20"
                    />
                  )}
               </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4">
         <Globe2 className="text-eu-gold shrink-0" size={20} />
         <p className="text-[10px] text-slate-400 leading-relaxed italic">
            "Zusammengenommen ist die EU der zweitgrößte Wirtschaftsraum der Welt. Diese kollektive Stärke ermöglicht es uns, partnerschaftliche Verträge auf Augenhöhe mit den USA und China abzuschließen."
         </p>
      </div>
    </div>
  );
}
