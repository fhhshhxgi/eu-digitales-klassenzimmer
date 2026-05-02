import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, FileText, ChevronRight } from 'lucide-react';

interface DetailedSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    sections: {
      subtitle: string;
      text: string;
      points?: { title: string; detail: string }[];
    }[];
  };
}

function ExpandablePoint({ title, detail }: { title: string; detail: string }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden transition-colors hover:border-eu-gold/30">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex gap-3 items-center p-4 text-left group"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="text-eu-gold flex-shrink-0" size={16} />
        </motion.div>
        <span className="text-sm font-bold text-white leading-snug group-hover:text-eu-gold transition-colors">{title}</span>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-11 pb-4">
              <p className="text-xs text-slate-400 leading-relaxed border-l border-eu-gold/30 pl-4 py-1">
                {detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DetailedSectionModal({ isOpen, onClose, title, content }: DetailedSectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-6 bg-eu-dark/98 backdrop-blur-3xl overflow-hidden"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full h-full max-w-5xl bg-eu-dark border-x border-white/10 relative flex flex-col"
          >
            {/* Header */}
            <div className="p-4 md:p-10 border-b border-white/10 flex justify-between items-center bg-eu-panel sticky top-0 z-20">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-eu-gold/20 rounded-xl flex items-center justify-center border border-eu-gold/50 flex-shrink-0">
                  <BookOpen className="text-eu-gold" size={20} />
                </div>
                <div>
                  <span className="text-[9px] md:text-[10px] uppercase font-bold text-eu-gold tracking-widest block mb-1">Detailliertes Archiv</span>
                  <h2 className="text-xl md:text-4xl font-display font-black text-white uppercase tracking-tighter line-clamp-1">
                    {title}
                  </h2>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 md:p-3 hover:bg-white/5 rounded-full transition-colors group"
              >
                <X className="text-slate-500 group-hover:text-white" size={24} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 md:p-16 space-y-10 md:space-y-16">
              {content.sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="text-eu-gold font-mono text-lg md:text-xl opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                    <h3 className="text-xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">{section.subtitle}</h3>
                  </div>
                  
                  <div className="bg-white/5 p-5 md:p-8 rounded-2xl border border-white/5 mb-6 md:mb-8">
                    <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                      {section.text}
                    </p>
                  </div>

                  {section.points && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.points.map((point, pIdx) => (
                        <ExpandablePoint key={pIdx} title={point.title} detail={point.detail} />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="pt-16 border-t border-white/10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-eu-gold/10 border border-eu-gold/30 rounded-full text-eu-gold text-xs font-bold uppercase tracking-widest mb-4">
                  <FileText size={14} /> Ende des Archivs
                </div>
                <p className="text-slate-500 text-sm">Nutzt diese Informationen nun für eure 5 Quizfragen.</p>
              </div>
            </div>

            {/* Reading Progress Indicator Overlay (Animated in footer) */}
            <div className="h-1 bg-white/5 w-full">
              <motion.div 
                className="h-full bg-eu-gold shadow-[0_0_10px_rgba(255,204,0,0.5)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
