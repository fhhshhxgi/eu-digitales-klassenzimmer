import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Landmark, TrendingUp, Info } from 'lucide-react';

const navItems = [
  { id: 'diversity', icon: Globe, label: 'Vielfalt' },
  { id: 'institutions', icon: Landmark, label: 'Politik' },
  { id: 'economy', icon: TrendingUp, label: 'Markt' },
  { id: 'future', icon: Info, label: 'Zukunft' },
];

export function TabletNav() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] block lg:hidden w-[90%] max-w-sm">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-eu-dark/80 backdrop-blur-2xl border border-white/20 p-2 rounded-full shadow-2xl flex items-center justify-between"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all active:bg-white/10"
          >
            <item.icon size={20} className="text-white/60" />
            <span className="text-[8px] uppercase font-black text-white/40 tracking-widest">{item.label}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
