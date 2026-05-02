import React from 'react';
import { motion } from 'framer-motion';
import { Map, Users, Globe2, AlertCircle, Info, ArrowRight } from 'lucide-react';

export function FutureExpansion() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 glass-card p-8 border-white/5 bg-slate-900/40">
         <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-eu-blue/20 rounded-2xl text-eu-blue">
               <Map size={24} />
            </div>
            <h3 className="text-xl font-black text-white italic uppercase">Erweiterung & Grenzen</h3>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div className="p-4 bg-white/5 rounded-xl border-l-4 border-l-eu-gold">
                  <p className="font-bold text-white mb-1">Beitrittskandidaten</p>
                  <p className="text-xs text-slate-400">Länder wie die Ukraine, Moldau und die Westbalkan-Staaten hoffen auf einen EU-Beitritt.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                     {['Albanien', 'Ukraine', 'Montenegro'].map(l => (
                        <span key={l} className="text-[9px] px-2 py-0.5 bg-white/10 rounded-full text-white/60">{l}</span>
                     ))}
                  </div>
               </div>
               
               <div className="p-4 bg-white/5 rounded-xl border-l-4 border-l-blue-500">
                  <p className="font-bold text-white mb-1">Schengen-Raum</p>
                  <p className="text-xs text-slate-400">Reisen ohne Passkontrollen zwischen den Mitgliedstaaten – ein Symbol der Freiheit.</p>
               </div>
            </div>

            <div className="space-y-6">
               <p className="text-sm text-slate-300 leading-relaxed">
                  Die größte Herausforderung: Wie bleibt die EU mit 30 oder mehr Mitgliedern handlungsfähig? 
               </p>
               <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <AlertCircle size={18} className="text-orange-500 shrink-0" />
                  <p className="text-[11px] text-orange-200">Vetorecht vs. Mehrheitsentscheidungen – ein zentraler Streitpunkt der Reformdebatte.</p>
               </div>
            </div>
         </div>
      </div>

      <div className="glass-card p-8 border-eu-gold/20 flex flex-col justify-between">
         <div>
            <Info size={32} className="text-eu-gold mb-4" />
            <h4 className="font-bold text-white mb-2">Migration gemeinsam lösen</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
               Der neue Migrationspakt soll Solidarität zwischen den Staaten und sichere Außengrenzen verbinden.
            </p>
         </div>
         <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-white/40 font-bold uppercase">
               <span>Fortschritt</span>
               <span>In Umsetzung</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '65%' }}
                 className="h-full bg-eu-gold"
               />
            </div>
         </div>
      </div>
    </div>
  );
}
