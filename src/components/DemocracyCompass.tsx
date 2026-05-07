import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Heart, ShieldCheck, Users, Landmark, Gavel, Info, AlertTriangle } from 'lucide-react';

const EU_VALUES = [
  {
    id: 'dignity',
    title: 'Menschenwürde',
    icon: Heart,
    description: 'Die Menschenwürde ist unantastbar. Sie ist zu achten und zu schützen.',
    pressure: 'Biotechnologie und KI werfen neue Fragen zum Schutz der menschlichen Identität und Würde auf.'
  },
  {
    id: 'freedom',
    title: 'Freiheit',
    icon: ShieldCheck,
    description: 'Bewegungsfreiheit der Bürger, Gedanken- und Religionsfreiheit sowie Medienfreiheit.',
    pressure: 'Zunehmende Überwachung im digitalen Raum und Angriffe auf die Unabhängigkeit der Medien gefährden diese Freiheit.'
  },
  {
    id: 'democracy',
    title: 'Demokratie',
    icon: Landmark,
    description: 'Basiert auf dem Grundsatz der repräsentativen Demokratie.',
    pressure: 'Gezielte Desinformation und Populismus versuchen das Vertrauen in demokratische Institutionen zu untergraben.'
  },
  {
    id: 'equality',
    title: 'Gleichheit',
    icon: Scale,
    description: 'Gleiche Rechte für alle Bürger, einschließlich der Gleichstellung von Frauen und Männern.',
    pressure: 'Diskriminierung am Arbeitsmarkt und ungleiche Bezahlung bleiben strukturelle Herausforderungen.'
  },
  {
    id: 'law',
    title: 'Rechtsstaatlichkeit',
    icon: Gavel,
    description: 'Alle staatlichen Handlungen basieren auf dem Recht und werden durch unabhängige Gerichte kontrolliert.',
    pressure: 'Versuche, die Unabhängigkeit der Justiz in einigen Mitgliedstaaten einzuschränken, bedrohen dieses Fundament.'
  },
  {
    id: 'rights',
    title: 'Menschenrechte',
    icon: Users,
    description: 'Der Schutz der Minderheitenrechte ist integraler Bestandteil der EU-Grundrechte.',
    pressure: 'Rassismus und die Missachtung von Rechten an den Außengrenzen stehen oft im Widerspruch zu diesen Werten.'
  }
];

export function DemocracyCompass() {
  const [selected, setSelected] = useState<typeof EU_VALUES[0] | null>(null);

  return (
    <div className="w-full bg-eu-dark/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Scale size={120} />
      </div>

      <div className="mb-12">
        {/* Titel und Beschreibung des Werts-Kompasses */}
        <h4 className="text-xl font-display font-medium text-white mb-2">Der Demokratie-Kompass</h4>
        <p className="text-sm text-slate-400">Klicke einen Wert an, um zu erfahren, warum er aktuell geschützt werden muss.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Anzeige der EU-Werte als interaktive Kacheln */}
        {EU_VALUES.map((value) => (
          <button
            key={value.id}
            onClick={() => setSelected(value)}
            className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 relative group
              ${selected?.id === value.id 
                ? 'bg-eu-gold/20 border-eu-gold shadow-[0_0_30px_rgba(255,204,0,0.1)]' 
                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
              ${selected?.id === value.id ? 'bg-eu-gold text-eu-dark' : 'bg-white/10 text-eu-gold'}`}>
              <value.icon size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-center text-white">{value.title}</span>
            {selected?.id === value.id && (
              <motion.div 
                layoutId="compass-active"
                className="absolute inset-0 border-2 border-eu-gold rounded-2xl" 
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12 p-8 bg-white/5 border border-white/5 rounded-3xl"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-eu-gold mb-3">
                  <Info size={16} />
                  <span className="text-[10px] uppercase font-black tracking-[0.2em]">Definition</span>
                </div>
                <p className="text-slate-200 text-lg font-display font-medium tracking-tight mb-6">"{selected.description}"</p>
                
                <div className="flex items-center gap-2 text-rose-500 mb-3">
                  <AlertTriangle size={16} />
                  <span className="text-[10px] uppercase font-black tracking-[0.2em]">Herausforderung</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{selected.pressure}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="mt-12 p-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-center justify-center text-slate-500 italic text-sm">
            Wählen einen EU-Grundwert aus dem Kompass oben.
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
