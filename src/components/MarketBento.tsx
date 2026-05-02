import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users, Briefcase, Landmark, ArrowRightLeft, ShieldCheck, Globe2, Zap } from 'lucide-react';

const marketFeatures = [
  {
    id: 'goods',
    title: "Waren",
    short: "Zollfrei",
    icon: <ShoppingBag />,
    color: "from-blue-500 to-cyan-400",
    description: "Keine Zölle beim Grenzübertritt. Einheitliche Sicherheitsstandards für alle Produkte.",
    details: ["Gemeinsame Normen", "CE-Kennzeichnung", "Grenzen ohne Stau"],
    visual: "simulate-goods"
  },
  {
    id: 'people',
    title: "Menschen",
    short: "Grenzenlos",
    icon: <Users />,
    color: "from-eu-gold to-orange-400",
    description: "Freie Wahl des Wohn- und Arbeitsortes. Anerkennung von Abschlüssen in der ganzen EU.",
    details: ["Erasmus+ Programme", "Niederlassungsfreiheit", "Soziale Sicherheit"],
    visual: "simulate-people"
  },
  {
    id: 'services',
    title: "Dienste",
    short: "Überregional",
    icon: <Briefcase />,
    color: "from-purple-500 to-indigo-400",
    description: "Unternehmen können ihre Dienstleistungen überall anbieten, von IT bis zum Handwerk.",
    details: ["Dienstleistungsrichtlinie", "Digitaler Binnenmarkt", "Grenzenloser E-Commerce"],
    visual: "simulate-services"
  },
  {
    id: 'capital',
    title: "Kapital",
    short: "Flüssig",
    icon: <Landmark />,
    color: "from-emerald-500 to-teal-400",
    description: "Investitionen und Geldtransfers fließen ohne Hindernisse zwischen den Staaten.",
    details: ["Einheitlicher Euro-Zahlungsraum", "Bankenunion", "Investitionsschutz"],
    visual: "simulate-capital"
  }
];

export function MarketBento() {
  const [activeTab, setActiveTab] = useState(marketFeatures[0]);

  return (
    <div className="w-full space-y-8">
      {/* Visual Simulation Area */}
      <div className="glass-card h-64 md:h-80 relative overflow-hidden bg-slate-950/80 border-eu-blue/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            {/* Background Glow */}
            <div className={`absolute w-64 h-64 rounded-full blur-[100px] opacity-20 bg-gradient-to-r ${activeTab.color}`} />
            
            <div className="relative z-10 w-full max-w-2xl flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex-1 space-y-4">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${activeTab.color} text-eu-dark`}>
                    {React.cloneElement(activeTab.icon as React.ReactElement, { size: 40 })}
                  </div>
                  <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                    {activeTab.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {activeTab.description}
                  </p>
               </div>

               <div className="grid grid-cols-1 gap-3 w-full md:w-64">
                  {activeTab.details.map((detail, i) => (
                    <motion.div 
                      key={detail}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <ShieldCheck size={16} className="text-eu-gold" />
                      <span className="text-xs font-bold text-white/80">{detail}</span>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Simulated Movement */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {[...Array(5)].map((_, i) => (
                 <motion.div
                  key={i}
                  initial={{ x: -100, y: Math.random() * 300, opacity: 0 }}
                  animate={{ 
                    x: 1200, 
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                  className={`absolute w-8 h-[1px] bg-gradient-to-r from-transparent via-eu-gold to-transparent`}
                 />
               ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketFeatures.map((feature) => (
          <motion.button
            key={feature.id}
            whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            whileTap={{ scale: 0.92, rotate: -1 }}
            onClick={() => setActiveTab(feature)}
            className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 group overflow-hidden cursor-pointer ${
              activeTab.id === feature.id 
                ? 'bg-eu-blue/40 border-eu-gold shadow-[0_0_30px_rgba(255,204,0,0.2)]' 
                : 'bg-white/5 border-white/10'
            }`}
          >
            <AnimatePresence>
              {activeTab.id === feature.id && (
                <motion.div 
                  layoutId="active-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-15`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            {/* Sweep effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <motion.div 
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
              />
            </div>

            <motion.div 
              animate={{ 
                scale: activeTab.id === feature.id ? 1.1 : 1,
                color: activeTab.id === feature.id ? '#FFCC00' : 'rgba(255,255,255,0.4)'
              }}
              className="p-2 rounded-xl relative z-10"
            >
              {React.cloneElement(feature.icon as React.ReactElement, { size: 24 })}
            </motion.div>
            <div className="text-center relative z-10 font-sans">
              <p className={`text-xs font-black uppercase tracking-[0.1em] transition-colors ${activeTab.id === feature.id ? 'text-white' : 'text-white/90'}`}>
                {feature.title}
              </p>
              <p className={`text-[10px] font-medium transition-colors ${activeTab.id === feature.id ? 'text-eu-gold' : 'text-white/60'}`}>
                {feature.short}
              </p>
            </div>
            
            {/* Active Glow Dot */}
            {activeTab.id === feature.id && (
              <motion.div 
                layoutId="active-dot"
                className="absolute bottom-1 w-1 h-1 bg-eu-gold rounded-full shadow-[0_0_10px_#FFCC00]"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
