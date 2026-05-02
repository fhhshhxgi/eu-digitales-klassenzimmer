import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Box, Users, Share2, Compass, Sparkles } from 'lucide-react';

const scenarios = [
  {
    title: "Vereinigte Staaten von Europa",
    state: "Föderalismus",
    icon: <Users size={24} />,
    color: "eu-gold",
    description: "Eine tiefe politische Union mit einer europäischen Regierung und einer gemeinsamen Armee. Die Nationalstaaten geben einen Großteil ihrer Souveränität ab."
  },
  {
    title: "Europa der verschiedenen Geschwindigkeiten",
    state: "Flexibilität",
    icon: <Rocket size={24} />,
    color: "eu-blue",
    description: "Einzelne Ländergruppen arbeiten in Bereichen wie Verteidigung oder Digitalisierung enger zusammen, während andere in ihrem eigenen Tempo folgen."
  },
  {
    title: "Rückkehr zu den Wurzeln",
    state: "Freihandel",
    icon: <Box size={24} />,
    color: "slate-400",
    description: "Die EU konzentriert sich wieder primär auf den Binnenmarkt und den Freihandel, während politische Entscheidungen wieder stärker national getroffen werden."
  }
];

export function FutureScenarios() {
  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-10">
         <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
         <h3 className="text-xl font-black text-white italic uppercase tracking-[0.2em] px-4">Zukunfts-Szenarien</h3>
         <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {scenarios.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card relative p-8 group hover:border-eu-gold/30 transition-all cursor-default"
          >
            {/* Index number bubble */}
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-eu-dark border border-white/10 flex items-center justify-center text-xs font-bold font-mono">
               S{i+1}
            </div>

            <div className={`p-4 rounded-2xl bg-white/5 text-${s.color} mb-6 w-fit group-hover:scale-110 transition-transform`}>
               {s.icon}
            </div>
            
            <p className="text-[10px] uppercase font-black tracking-widest text-eu-gold mb-2">{s.state}</p>
            <h4 className="text-xl font-bold text-white mb-4 leading-tight">{s.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
               {s.description}
            </p>

            <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-1 h-1 rounded-full bg-eu-gold" />
               <div className="w-1 h-1 rounded-full bg-eu-gold" />
               <div className="w-1 h-1 rounded-full bg-eu-gold" />
               <span className="text-[10px] uppercase font-bold text-eu-gold ml-2">Diskussionsthema</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-eu-gold/5 via-white/5 to-transparent border border-white/5 text-center">
         <Sparkles className="mx-auto text-eu-gold mb-4" size={32} />
         <p className="text-lg text-slate-300 max-w-2xl mx-auto italic">
            "Die Zukunft der EU wird nicht am grünen Tisch in Brüssel entschieden, sondern durch die demokratische Teilhabe der Bürger in ganz Europa."
         </p>
      </div>
    </div>
  );
}
