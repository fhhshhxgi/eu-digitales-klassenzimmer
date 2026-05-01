import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
            className="glass-card max-w-lg w-full p-10 border-white/10 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-eu-gold opacity-30" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <Shield className="text-eu-gold" size={32} />
              </div>

              <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6">
                Datenschutz
              </h2>
              
              <div className="space-y-6 text-slate-300">
                <p className="text-lg leading-relaxed font-light">
                  Diese Website verarbeitet <span className="text-white font-bold">keine personenbezogenen Daten</span>.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Sie dient ausschließlich zu Informations- und Bildungszwecken im Rahmen eines Schulprojekts. Es werden keine Tracker, Cookies oder Analysedienste verwendet.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="mt-10 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-xs"
              >
                Verstanden
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
