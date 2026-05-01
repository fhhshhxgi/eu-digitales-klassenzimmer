import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImpressumModal({ isOpen, onClose }: ImpressumModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[101] flex items-center justify-center p-6 bg-eu-dark/95 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card max-w-2xl w-full p-10 border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eu-blue via-eu-gold to-eu-blue opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Info className="text-eu-gold" size={24} />
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">
                  Impressum
                </h2>
              </div>
              
              <div className="space-y-8 text-slate-300">
                <p className="text-lg leading-relaxed border-l-2 border-eu-gold pl-6 py-2 bg-white/5 rounded-r-xl">
                  Diese Website wurde im Rahmen eines <span className="text-white font-bold tracking-tight">Schulprojekts</span> erstellt.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase font-bold text-eu-gold tracking-widest">Autor</h4>
                    <p className="text-white text-xl">Cristian Liebrecht</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase font-bold text-eu-gold tracking-widest">Schule</h4>
                    <p className="text-white text-lg">Gymnasium an der Gartenstraße</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase font-bold text-eu-gold tracking-widest">Projekt</h4>
                    <p className="text-white">EU-Informationswebsite zur Verwendung am schulinternen EU-Tag</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase font-bold text-eu-gold tracking-widest">Jahr</h4>
                    <p className="text-white">2026</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <p className="text-sm text-slate-500 italic leading-relaxed">
                    <span className="text-eu-gold font-bold not-italic">Hinweis:</span> Diese Website ist kein offizielles Projekt der Europäischen Union und steht in keiner Verbindung zu EU-Institutionen. Sie dient ausschließlich zu Bildungs- und Informationszwecken.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="mt-10 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-xs"
              >
                Schließen
              </motion.button>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
