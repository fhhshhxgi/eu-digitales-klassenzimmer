import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Landmark, CheckCircle2, XCircle, Info, ShieldAlert, Zap } from 'lucide-react';
import { useSounds } from './SoundProvider';

interface Country {
  id: string;
  name: string;
  pop: number; // in millions
}

const countries: Country[] = [
  { id: 'DE', name: 'Deutschland', pop: 84.4 },
  { id: 'FR', name: 'Frankreich', pop: 68.1 },
  { id: 'IT', name: 'Italien', pop: 58.9 },
  { id: 'ES', name: 'Spanien', pop: 48.1 },
  { id: 'PL', name: 'Polen', pop: 36.8 },
  { id: 'RO', name: 'Rumänien', pop: 19.1 },
  { id: 'NL', name: 'Niederlande', pop: 17.8 },
  { id: 'BE', name: 'Belgien', pop: 11.7 },
  { id: 'CZ', name: 'Tschechien', pop: 10.8 },
  { id: 'GR', name: 'Griechenland', pop: 10.4 },
  { id: 'PT', name: 'Portugal', pop: 10.5 },
  { id: 'SE', name: 'Schweden', pop: 10.5 },
  { id: 'HU', name: 'Ungarn', pop: 9.6 },
  { id: 'AT', name: 'Österreich', pop: 9.1 },
  { id: 'BG', name: 'Bulgarien', pop: 6.4 },
  { id: 'DK', name: 'Dänemark', pop: 5.9 },
  { id: 'FI', name: 'Finnland', pop: 5.6 },
  { id: 'SK', name: 'Slowakei', pop: 5.4 },
  { id: 'IE', name: 'Irland', pop: 5.2 },
  { id: 'HR', name: 'Kroatien', pop: 3.9 },
  { id: 'LT', name: 'Litauen', pop: 2.9 },
  { id: 'SI', name: 'Slowenien', pop: 2.1 },
  { id: 'LV', name: 'Lettland', pop: 1.9 },
  { id: 'EE', name: 'Estland', pop: 1.4 },
  { id: 'CY', name: 'Zypern', pop: 0.9 },
  { id: 'LU', name: 'Luxemburg', pop: 0.7 },
  { id: 'MT', name: 'Malta', pop: 0.5 },
];

const TOTAL_POP = countries.reduce((sum, c) => sum + c.pop, 0);
const STATE_THRESHOLD = 55; // 55% of 27 states = 15 states
const POP_THRESHOLD = 65; // 65% of population

const SCENARIOS = [
  { 
    id: 'blocking', 
    title: 'Sperrminorität der Großen', 
    desc: 'DE, FR, IT und ES stimmen dagegen. Obwohl nur 4 Staaten, blockieren sie durch ihre Bevölkerungsstärke.',
    logic: () => new Set(countries.filter(c => !['DE', 'FR', 'IT', 'ES'].includes(c.id)).map(c => c.id))
  },
  { 
    id: 'visegrad', 
    title: 'Visegrád-Gruppe', 
    desc: 'PL, CZ, SK und HU stimmen gemeinsam für einen Vorschlag.',
    logic: () => new Set(['PL', 'CZ', 'SK', 'HU'])
  },
  { 
    id: 'frugal', 
    title: 'Sparsamen Vier', 
    desc: 'NL, AT, SE und DK koordinieren ihr Stimmverhalten.',
    logic: () => new Set(['NL', 'AT', 'SE', 'DK'])
  }
];

export function CouncilSimulator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const { playSuccess } = useSounds();

  const stats = useMemo(() => {
    const selectedCountries = countries.filter(c => selected.has(c.id));
    const count = selectedCountries.length;
    const popSum = selectedCountries.reduce((sum, c) => sum + c.pop, 0);
    const popPercent = (popSum / TOTAL_POP) * 100;
    
    // Blocking minority: at least 4 countries representing > 35% pop
    const unselectedCountries = countries.filter(c => !selected.has(c.id));
    const blockingCount = unselectedCountries.length;
    const blockingPopPercent = ((TOTAL_POP - popSum) / TOTAL_POP) * 100;
    const isBlockedByMinority = blockingCount >= 4 && blockingPopPercent > 35;

    const statePass = (count / countries.length) * 100 >= STATE_THRESHOLD;
    const popPass = popPercent >= POP_THRESHOLD;
    
    return {
      count,
      statePercent: (count / countries.length) * 100,
      popPercent,
      statePass,
      popPass,
      passed: statePass && popPass,
      isBlockedByMinority
    };
  }, [selected]);

  const prevPassed = React.useRef(stats.passed);
  useEffect(() => {
    if (selected.size === 0) {
      prevPassed.current = false;
      return;
    }
    
    if (stats.passed && !prevPassed.current) {
      playSuccess();
    }
    prevPassed.current = stats.passed;
  }, [stats.passed, playSuccess, selected.size]);

  const toggleCountry = (id: string) => {
    setActiveScenario(null);
    const newSelected = new Set(selected);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelected(newSelected);
  };

  const selectAll = () => {
    setActiveScenario(null);
    setSelected(new Set(countries.map(c => c.id)));
  };
  const clearAll = () => {
    setActiveScenario(null);
    setSelected(new Set());
  };

  return (
    <div className="w-full bg-eu-dark/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
      <div className="p-8 md:p-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter mb-2">
              Rat-Votums-Simulator
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Simuliere eine Abstimmung nach dem Prinzip der <span className="text-eu-gold">qualifizierten Mehrheit</span>. 
              Eine Entscheidung benötigt die Zustimmung der „Doppelten Mehrheit“.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={selectAll} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-white hover:bg-white/10 transition-colors">Alle Ja</button>
            <button onClick={clearAll} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-white hover:bg-white/10 transition-colors">Reset</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* "What if?" Scenarios */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-eu-gold tracking-widest">
                <Zap size={14} />
                <span>„Was wäre wenn?“-Szenarien</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {SCENARIOS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelected(s.logic());
                      setActiveScenario(s.id);
                    }}
                    className={`px-4 py-3 rounded-2xl border transition-all text-xs font-bold text-left max-w-[200px] ${activeScenario === s.id ? 'bg-eu-gold text-eu-dark border-eu-gold' : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20'}`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {activeScenario && (
                  <motion.p 
                    key={activeScenario}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-slate-500 italic"
                  >
                    {SCENARIOS.find(s => s.id === activeScenario)?.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {countries.map(country => (
                <button
                  key={country.id}
                  onClick={() => toggleCountry(country.id)}
                  className={`
                    p-3 rounded-2xl border transition-all text-left group relative overflow-hidden
                    ${selected.has(country.id) 
                      ? 'bg-eu-blue/40 border-eu-blue text-white' 
                      : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}
                  `}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black opacity-50">{country.id}</span>
                    {selected.has(country.id) && <CheckCircle2 size={12} className="text-eu-gold" />}
                  </div>
                  <div className="font-bold text-[11px] truncate">{country.name}</div>
                  <div className="text-[9px] opacity-40">{country.pop}M</div>
                  
                  {/* Progress bar background for population weight */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-eu-gold transition-all duration-500" 
                    style={{ width: selected.has(country.id) ? '100%' : '0%', opacity: 0.3 }} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Visualization & Result */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${stats.passed ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status der Entscheidung</span>
                {stats.passed ? (
                  <CheckCircle2 size={32} className="text-green-500" />
                ) : (
                  <XCircle size={32} className="text-red-500" />
                )}
              </div>
              
              <div className="text-4xl font-display font-black text-white italic uppercase tracking-tighter mb-8 block">
                {stats.passed ? 'Angenommen' : 'Abgelehnt'}
              </div>

              <div className="space-y-6">
                {/* States Progress */}
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                    <span className={stats.statePass ? 'text-green-400' : 'text-slate-400'}>Staaten ({stats.count}/27)</span>
                    <span className="text-white">Min. 15 (55%)</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${stats.statePass ? 'bg-green-500' : 'bg-eu-gold'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.statePercent}%` }}
                    />
                  </div>
                </div>

                {/* Population Progress */}
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                    <span className={stats.popPass ? 'text-green-400' : 'text-slate-400'}>Bevölkerung ({stats.popPercent.toFixed(1)}%)</span>
                    <span className="text-white">Min. 65%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${stats.popPass ? 'bg-green-500' : 'bg-eu-gold'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.popPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              {stats.isBlockedByMinority && !stats.passed && (
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex gap-4 items-start">
                  <ShieldAlert className="text-orange-500 shrink-0" size={20} />
                  <div>
                    <div className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Sperrminorität aktiv</div>
                    <p className="text-[10px] text-slate-400">Mindestens 4 Staaten, die mehr als 35% der Bevölkerung vertreten, stimmen dagegen.</p>
                  </div>
                </div>
              )}
              
              <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Info size={16} className="text-eu-gold" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Die Spielregeln</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-eu-gold mt-1.5" />
                    <p className="text-[10px] text-slate-400 leading-relaxed"><strong className="text-white">55% der Mitgliedstaaten</strong> müssen zustimmen (aktuell 15 von 27).</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-eu-gold mt-1.5" />
                    <p className="text-[10px] text-slate-400 leading-relaxed">Diese müssen mindestens <strong className="text-white">65% der EU-Bevölkerung</strong> repräsentieren.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-eu-gold mt-1.5" />
                    <p className="text-[10px] text-slate-400 leading-relaxed">Um einen Beschluss zu blockieren, sind mindestens <strong className="text-white">4 Staaten</strong> nötig.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
