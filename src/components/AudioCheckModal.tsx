import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, AlertTriangle, ChevronRight } from 'lucide-react';
import { useSounds } from './SoundProvider';

interface AudioCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioCheckModal: React.FC<AudioCheckModalProps> = ({ isOpen, onClose }) => {
  const { playAudioCheck } = useSounds();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, scale: 1.1 }}
            className="w-full max-w-2xl px-8 py-12 text-center relative z-10 bg-slate-900/50 border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Kinematische Hintergrund-Elemente (Passend zum Intro) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[3rem]">
               <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-eu-gold/5 rounded-full blur-[60px]" />
            </div>

            <div className="relative z-10">
               <div className="relative mb-10 inline-block">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-eu-gold/20 rounded-full blur-[40px]"
                  />
                  <div className="relative w-20 h-20 bg-eu-gold/10 rounded-2xl border border-eu-gold/30 flex items-center justify-center mx-auto">
                     <Volume2 className="w-10 h-10 text-eu-gold" />
                  </div>
               </div>

               <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white mb-6">
                  Sound Experience
               </h2>
               
               <div className="space-y-6 max-w-lg mx-auto">
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                     Dieses Archiv nutzt atmosphärisches Sound-Design und interaktives Feedback, um die Geschichte der EU lebendig zu machen.
                  </p>

                  <div className="p-6 bg-slate-950/80 border border-white/5 rounded-2xl space-y-4">
                     <div className="flex items-start gap-4 text-left">
                        <div className="p-2 bg-orange-500/10 rounded-lg shrink-0">
                           <AlertTriangle className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                           <h4 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-1">iPad & iPhone Hinweis</h4>
                           <p className="text-[11px] text-slate-400 leading-normal">
                              Stelle sicher, dass der <span className="text-white font-bold">Stummmodus-Schalter</span> an der Seite deines Geräts deaktiviert ist, auch wenn die Lautstärke hochgestellt ist.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                           playAudioCheck();
                           // Klick-Sound für Audio-Test
                        }}
                        className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
                     >
                        <Volume2 size={14} /> Test-Sound abspielen
                     </motion.button>

                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="group relative px-10 py-5 bg-eu-gold text-eu-dark font-black uppercase tracking-[0.2em] italic rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,204,0,0.3)] transition-all"
                     >
                        <span className="relative z-10 flex items-center gap-2">
                           Verstanden <ChevronRight size={18} />
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                     </motion.button>
                  </div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
