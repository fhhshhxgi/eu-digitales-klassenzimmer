import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceArea
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, TrendingUp, Leaf, Briefcase, ChevronDown, 
  ArrowRight, ArrowLeftRight, Info, Activity
} from 'lucide-react';

// Historische Daten-Simulation für wichtige EU-Länder (Grobe Trends 2000-2024)
const countryData: Record<string, any> = {
  "DE": { name: "Deutschland", color: "#FFCC00" },
  "FR": { name: "Frankreich", color: "#3b82f6" },
  "IT": { name: "Italien", color: "#10b981" },
  "ES": { name: "Spanien", color: "#ef4444" },
  "PL": { name: "Polen", color: "#ec4899" },
  "EU": { name: "EU-Durchschnitt", color: "#ffffff", dashed: true }
};

const metrics = {
  population: { label: "Bevölkerung", unit: "Mio.", icon: Users, desc: "Gesamtbevölkerung am 1. Januar." },
  bip: { label: "BIP (Wachstum)", unit: "%", icon: TrendingUp, desc: "Reale Veränderung gegenüber dem Vorjahr." },
  co2: { label: "CO2-Emissionen", unit: "t/Kopf", icon: Leaf, desc: "Tonnen CO2 pro Kopf der Bevölkerung." },
  unemployment: { label: "Arbeitslosigkeit", unit: "%", icon: Briefcase, desc: "Saisonbereinigte Arbeitslosenquote." }
};

// Generiere semi-realistische Datenpfade
const generateTrend = (base: number, volatility: number, trend: number, years: number) => {
  let current = base;
  return Array.from({ length: years }, (_, i) => {
    current = current + (Math.random() - 0.5) * volatility + trend;
    return { year: 2000 + i, value: parseFloat(current.toFixed(2)) };
  });
};

const historicalStats: Record<string, Record<string, any[]>> = {
  "DE": {
    population: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((82 + (i * 0.05) + (i > 15 ? 0.8 : 0)).toFixed(2)) })),
    bip: generateTrend(1.5, 3, -0.01, 25),
    co2: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((10 - (i * 0.15)).toFixed(2)) })),
    unemployment: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((8 - (i * 0.2) + (i > 8 && i < 12 ? 1 : 0)).toFixed(2)) }))
  },
  "FR": {
    population: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((60 + (i * 0.3)).toFixed(2)) })),
    bip: generateTrend(1.8, 2.5, -0.02, 25),
    co2: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((6.5 - (i * 0.1)).toFixed(2)) })),
    unemployment: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((9 + Math.sin(i * 0.5) * 1.5).toFixed(2)) }))
  },
  "IT": {
    population: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((57 + (i * 0.1) - (i > 15 ? 0.2 : 0)).toFixed(2)) })),
    bip: generateTrend(1.0, 3.5, -0.03, 25),
    co2: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((8.0 - (i * 0.12)).toFixed(2)) })),
    unemployment: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((10 + Math.sin(i * 0.3) * 2).toFixed(2)) }))
  },
  "ES": {
    population: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((40 + (i * 0.35)).toFixed(2)) })),
    bip: generateTrend(2.5, 4.0, -0.02, 25),
    co2: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((7.5 - (i * 0.14)).toFixed(2)) })),
    unemployment: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((15 + Math.sin(i * 0.6) * 7).toFixed(2)) }))
  },
  "EU": {
    population: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((440 + (i * 0.5)).toFixed(2)) })),
    bip: generateTrend(2.0, 2, -0.015, 25),
    co2: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((8.5 - (i * 0.18)).toFixed(2)) })),
    unemployment: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((8.5 + Math.cos(i * 0.4) * 1).toFixed(2)) }))
  },
  // Weitere Länder grob simuliert
  "PL": {
    population: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((38 - (i * 0.02)).toFixed(2)) })),
    bip: generateTrend(4.0, 1.5, -0.05, 25),
    co2: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((8.2 - (i * 0.04)).toFixed(2)) })),
    unemployment: Array.from({ length: 25 }, (_, i) => ({ year: 2000 + i, value: parseFloat((16 - (i * 0.5)).toFixed(2)) }))
  }
};

const CustomDashboardTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-eu-dark/95 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-3xl min-w-[180px]"
      >
        <p className="text-eu-gold font-black text-sm italic uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Jahr {label}</p>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{entry.name}</span>
              </div>
              <div className="flex items-baseline gap-1 ml-4">
                <span className="text-white font-black text-lg italic">{entry.value}</span>
                <span className="text-white/30 text-[9px] font-bold">{entry.unit || payload[0].payload.unit || ''}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  return null;
};

export function EUDashboard() {
  const [country1, setCountry1] = useState("DE");
  const [country2, setCountry2] = useState("EU");
  const [metric, setMetric] = useState<keyof typeof metrics>("unemployment");
  const [yearRange, setYearRange] = useState([2000, 2024]);
  const [showComparison, setShowComparison] = useState(true);

  const chartData = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const year = 2000 + i;
      const d1 = historicalStats[country1]?.[metric]?.find(p => p.year === year);
      const d2 = historicalStats[country2]?.[metric]?.find(p => p.year === year);
      return {
        year,
        [country1]: d1?.value,
        [country2]: d2?.value,
      };
    }).filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]);
  }, [country1, country2, metric, yearRange]);

  const CurrentMetricIcon = metrics[metric].icon;

  return (
    <div className="space-y-8 py-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6 glass-card bg-eu-dark/60 border border-white/5 shadow-2xl">
        {/* Metric Selector */}
        <div className="space-y-2">
          <label className="text-[10px] text-eu-gold uppercase tracking-widest font-black flex items-center gap-2">
            <Activity size={12} /> Thema
          </label>
          <div className="relative group">
            <select 
              value={metric}
              onChange={(e) => setMetric(e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm appearance-none outline-none focus:border-eu-gold transition-colors cursor-pointer"
            >
              {Object.entries(metrics).map(([id, m]) => (
                <option key={id} value={id} className="bg-eu-dark">{m.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-hover:text-white/80 transition-colors" />
          </div>
        </div>

        {/* Country 1 */}
        <div className="space-y-2">
          <label className="text-[10px] text-white/40 uppercase tracking-widest font-black">Primäres Land</label>
          <div className="relative group">
            <select 
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm appearance-none outline-none focus:border-eu-gold transition-colors cursor-pointer"
            >
              {Object.entries(countryData).filter(([id]) => id !== "EU").map(([id, c]) => (
                <option key={id} value={id} className="bg-eu-dark">{c.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </div>

        {/* Comparison Toggle & Selector */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-black">Vergleich</label>
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className={`text-[9px] uppercase px-2 py-0.5 rounded border transition-all ${showComparison ? 'bg-eu-gold/20 border-eu-gold text-eu-gold' : 'border-white/10 text-white/40'}`}
            >
              {showComparison ? 'Aktiv' : 'Deaktiviert'}
            </button>
          </div>
          <div className="relative group">
            <select 
              disabled={!showComparison}
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className={`w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm appearance-none outline-none transition-colors cursor-pointer ${showComparison ? 'text-white border-white/10 focus:border-eu-gold' : 'text-white/20 border-white/5 cursor-not-allowed'}`}
            >
              {Object.entries(countryData).map(([id, c]) => (
                <option key={id} value={id} className="bg-eu-dark">{c.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </div>

        {/* Year Slider */}
        <div className="space-y-2">
           <label className="text-[10px] text-white/40 uppercase tracking-widest font-black flex justify-between">
            Zeitraum <span>{yearRange[0]} - {yearRange[1]}</span>
          </label>
          <div className="flex items-center gap-2 pt-4">
             <input 
              type="range"
              min="2000"
              max="2024"
              value={yearRange[1]}
              onChange={(e) => setYearRange([2000, parseInt(e.target.value)])}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-eu-gold"
            />
          </div>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Legend / Info Cards */}
        <div className="space-y-4">
          <motion.div 
            key={metric}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 border-l-4 border-eu-gold bg-gradient-to-br from-eu-gold/5 to-transparent"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-eu-gold/20 flex items-center justify-center text-eu-gold">
                <CurrentMetricIcon size={20} />
              </div>
              <h3 className="text-xl font-display font-black text-white italic uppercase">{metrics[metric].label}</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {metrics[metric].desc} Die Werte beziehen sich auf {metrics[metric].unit}.
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-xs text-white/60 font-bold">{countryData[country1].name}</span>
                <span className="text-lg font-display font-black text-white italic">
                  {historicalStats[country1]?.[metric]?.find(p => p.year === yearRange[1])?.value?.toFixed(2)} {metrics[metric].unit}
                </span>
              </div>
              
              {showComparison && (
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-xs text-white/20 font-bold">{countryData[country2].name}</span>
                  <span className="text-lg font-display font-black text-white/40 italic">
                    {historicalStats[country2]?.[metric]?.find(p => p.year === yearRange[1])?.value?.toFixed(2)} {metrics[metric].unit}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mini Fact */}
          <div className="p-4 glass-card bg-eu-blue/10 border border-eu-blue/20">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-eu-blue" />
              <span className="text-[10px] text-eu-blue font-black uppercase tracking-widest">Wusstest du schon?</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal italic">
              {metric === 'co2' ? 'Die EU hat sich zum Ziel gesetzt, bis 2050 klimaneutral zu werden. Der Green Deal ist das zentrale Werkzeug dafür.' : 
               metric === 'unemployment' ? 'In Krisenzeiten zeigt sich oft eine starke Divergenz zwischen Nord- und Südeuropa.' :
               'Seit 2000 hat die EU mehrere globale Krisen überstanden, was sich in den volatilen BIP-Kurven widerspiegelt.'}
            </p>
          </div>
        </div>

        {/* Main Chart */}
        <div className="xl:col-span-2 glass-card p-4 md:p-6 bg-slate-900/40 relative overflow-hidden h-[300px] md:h-[450px]">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ArrowLeftRight size={200} />
          </div>
          
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis 
                dataKey="year" 
                stroke="#64748b" 
                fontSize={12} 
                tickMargin={10}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickMargin={10}
                tick={{ fill: '#64748b' }}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomDashboardTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              <Line 
                type="monotone" 
                dataKey={country1} 
                name={countryData[country1].name}
                stroke={countryData[country1].color} 
                strokeWidth={4}
                dot={{ fill: countryData[country1].color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8, strokeWidth: 0, fill: '#fff' }}
                animationDuration={1500}
              />
              
              {showComparison && (
                <Line 
                  type="monotone" 
                  dataKey={country2} 
                  name={countryData[country2].name}
                  stroke={countryData[country2].color} 
                  strokeWidth={2}
                  strokeDasharray={countryData[country2].dashed ? "5 5" : undefined}
                  dot={{ fill: countryData[country2].color, r: 3 }}
                  activeDot={{ r: 6, fill: '#fff' }}
                  animationDuration={1500}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([id, m]) => (
          <button
            key={id}
            onClick={() => setMetric(id as any)}
            className={`p-4 rounded-xl border transition-all text-left ${metric === id ? 'bg-eu-blue/20 border-eu-blue/50 shadow-lg' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
          >
            <m.icon size={18} className={`mb-2 ${metric === id ? 'text-eu-gold' : 'text-slate-500'}`} />
            <span className={`text-[10px] uppercase font-black block tracking-tighter ${metric === id ? 'text-white' : 'text-white/40'}`}>{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
