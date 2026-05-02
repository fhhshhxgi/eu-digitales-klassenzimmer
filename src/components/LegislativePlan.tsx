import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, ArrowRight, Gavel, CheckCircle2, Search, FileText, Ban, HelpCircle } from 'lucide-react';

const steps = [
  {
    title: "Vorschlag",
    actor: "EU-Kommission",
    icon: <Building2 />,
    color: "eu-blue",
    path: "start",
    description: "Die Kommission entwirft ein Gesetz. Sie ist die einzige Institution, die neue Gesetze vorschlagen darf."
  },
  {
    title: "Erste Lesung",
    actor: "Parlament & Rat",
    icon: <Users />,
    color: "eu-gold",
    path: "process",
    description: "Das Parlament und der Rat prüfen den Vorschlag. Sie können Änderungen fordern."
  },
  {
    title: "Vermittlung",
    actor: "Ausschuss",
    icon: <HelpCircle />,
    color: "orange-500",
    path: "exception",
    description: "Wenn sie sich nicht einigen, verhandelt ein spezieller Ausschuss einen Kompromiss."
  },
  {
    title: "Beschluss",
    actor: "EU-Rat",
    icon: <Gavel />,
    color: "green-500",
    path: "end",
    description: "Das Gesetz wird verabschiedet und ist für alle Mitgliedstaaten bindend."
  }
];

export function LegislativePlan() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative mt-8 group">
      {/* Visual Pipeline */}
      <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[2px] bg-white/5 -z-10">
         <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            className="h-full bg-eu-gold shadow-[0_0_15px_rgba(255,204,0,0.5)] transition-all duration-700"
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative z-10">
        {steps.map((step, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveStep(i)}
            whileHover={{ y: -5 }}
            className="relative flex flex-col items-center gap-4 transition-all duration-300"
          >
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center relative z-20 ${
              activeStep === i 
                ? 'bg-eu-dark border-4 border-eu-gold shadow-[0_0_40px_rgba(255,204,0,0.2)]' 
                : 'bg-eu-dark border-2 border-white/10'
            }`}>
               {activeStep === i && (
                 <motion.div 
                    layoutId="pulse"
                    className="absolute inset-0 rounded-3xl bg-eu-gold/20 animate-ping"
                 />
               )}
               {React.cloneElement(step.icon as React.ReactElement, { size: 32, className: activeStep === i ? "text-eu-gold" : "text-white/60" })}
               
               {/* Label on the node */}
               <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 border-eu-dark ${
                 activeStep === i ? 'bg-eu-gold text-eu-dark' : 'bg-white/20 text-white/60'
               }`}>
                  {i + 1}
               </div>
            </div>
            <div className={`text-center transition-all duration-300 ${activeStep === i ? 'opacity-100' : 'opacity-40 grayscale group-hover:opacity-70'}`}>
              <p className="text-xs font-black uppercase tracking-widest text-eu-gold mb-1">{step.title}</p>
              <p className="text-[10px] font-bold text-white/40">{step.actor}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Detail Display */}
      <AnimatePresence mode="wait">
        <motion.div
           key={activeStep}
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.98 }}
           className="glass-card p-1 md:p-8 bg-gradient-to-br from-eu-blue/10 to-transparent border-white/5 relative overflow-hidden"
        >
          {/* Decorative Background Icon */}
          <div className="absolute -right-12 -bottom-12 opacity-5 scale-[5] pointer-events-none">
            {steps[activeStep].icon}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10 p-6 md:p-0">
             <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                    {steps[activeStep].description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <CheckCircle2 size={16} className="text-eu-gold" />
                    <span className="text-xs font-bold text-white/80">Prozessschritt {activeStep + 1}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <Building2 size={16} className="text-eu-gold" />
                    <span className="text-xs font-bold text-white/80">{steps[activeStep].actor}</span>
                  </div>
                </div>
             </div>

             <div className="w-full md:w-72 space-y-4">
                <div className="p-4 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-md">
                   <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Wusstest du schon?</p>
                   <p className="text-sm text-slate-300 leading-relaxed italic">
                      "Über 70% der EU-Gesetze werden ohne Änderungen in den Mitgliedstaaten übernommen, da sie direkt als Verordnung gelten."
                   </p>
                </div>
                <div className="flex items-center justify-between p-4 bg-eu-gold/10 rounded-2xl border border-eu-gold/20">
                   <div className="flex items-center gap-3">
                      <FileText size={20} className="text-eu-gold" />
                      <span className="text-sm font-bold">Verfahrensstatus</span>
                   </div>
                   <div className="w-3 h-3 rounded-full bg-eu-gold animate-pulse shadow-[0_0_10px_rgba(255,204,0,0.5)]" />
                </div>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
