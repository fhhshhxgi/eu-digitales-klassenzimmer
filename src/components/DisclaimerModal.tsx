import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-eu-dark/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card max-w-lg w-full p-8 border-eu-gold/30 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-eu-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 bg-eu-gold/20 rounded-full flex items-center justify-center mb-6 border border-eu-gold/50 shadow-[0_0_20px_rgba(255,204,0,0.2)]">
                <AlertCircle size={32} className="text-eu-gold" />
              </div>
              
              <h2 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tighter">
                Projekt-Hinweis
              </h2>
              
              <p className="text-slate-300 leading-relaxed mb-8">
                Diese Website ist ein <span className="text-eu-gold font-bold">Schulprojekt</span> und steht in keiner Verbindung zur Europäischen Union oder ihren Institutionen. Sie dient ausschließlich Bildungszwecken im Rahmen des Unterrichts.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-4 bg-eu-gold text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,204,0,0.2)] hover:shadow-[0_0_30px_rgba(255,204,0,0.4)] transition-all uppercase tracking-widest text-sm"
              >
                Ich habe verstanden
              </motion.button>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
