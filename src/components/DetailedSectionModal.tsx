import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, FileText, ChevronRight, Bookmark, Quote } from 'lucide-react';
import { useSounds } from './SoundProvider';

interface DetailedSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    sections: {
      subtitle: string;
      text: React.ReactNode;
      points?: { title: string; detail: string }[];
    }[];
  };
}

// Komponente für aufklappbare Fakten-Punkte
function ExpandablePoint({ title, detail }: { title: string; detail: string }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className={`transition-all duration-300 rounded-xl border ${isExpanded ? 'bg-eu-gold/5 border-eu-gold/30 shadow-[0_0_20px_rgba(255,204,0,0.05)]' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex gap-3 items-center p-5 text-left group"
      >
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${isExpanded ? 'bg-eu-gold/20' : 'bg-white/10 group-hover:bg-white/20'}`}>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronRight className={isExpanded ? "text-eu-gold" : "text-slate-400"} size={14} />
          </motion.div>
        </div>
        <span className={`text-sm font-semibold transition-colors ${isExpanded ? 'text-eu-gold' : 'text-slate-200 group-hover:text-white'}`}>
          {title}
        </span>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-14 pb-5">
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-serif italic border-l-2 border-eu-gold/20 pl-5 py-1">
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
  const { playClick } = useSounds();
  const [activeSection, setActiveSection] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Scroll-Handler zur Aktualisierung der aktiven Sektion in der Sidebar
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollPos = container.scrollTop;
    const sectionElements = container.querySelectorAll('.archive-section');
    
    let current = 0;
    sectionElements.forEach((el, idx) => {
      const rect = (el as HTMLElement).offsetTop;
      if (scrollPos >= rect - 200) {
        current = idx;
      }
    });
    setActiveSection(current);
  };

  const scrollToSection = (idx: number) => {
    const container = scrollContainerRef.current;
    const sectionElements = container?.querySelectorAll('.archive-section');
    if (sectionElements?.[idx]) {
      (sectionElements[idx] as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-eu-dark/95 backdrop-blur-3xl overflow-hidden"
        >
          {/* Atmosphärischer Hintergrund-Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden h-full">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-eu-blue/10 rounded-full blur-[120px] animate-nebula -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-eu-gold/5 rounded-full blur-[150px] animate-nebula delay-1000 translate-y-1/2" />
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-full md:h-[90vh] md:max-w-7xl bg-eu-dark/80 backdrop-blur-md md:border border-white/10 relative flex flex-col md:rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Minimalistischer Header */}
            <div className="px-6 py-4 md:px-10 md:py-6 border-b border-white/10 flex justify-between items-center bg-white/2 backdrop-blur-md shrink-0 z-30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-eu-gold/10 rounded-xl flex items-center justify-center border border-eu-gold/20">
                  <Bookmark className="text-eu-gold" size={18} />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-display font-medium text-white tracking-wide">
                    {title}
                  </h2>
                </div>
              </div>
              <button 
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all duration-300 border border-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
               {/* Sidebar-Navigation (Inhaltsverzeichnis) */}
              <div className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-white/1 p-8 space-y-6 shrink-0 overflow-y-auto">
                <div className="space-y-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.25em] font-bold block mb-4">Inhaltsverzeichnis</span>
                  <div className="space-y-1">
                    {content.sections.map((section, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(idx)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group text-left ${activeSection === idx ? 'bg-eu-gold/10 text-eu-gold border border-eu-gold/20' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                      >
                        <span className={`font-mono text-xs ${activeSection === idx ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs font-bold leading-tight line-clamp-2 uppercase tracking-wide">
                          {section.subtitle}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-auto border-t border-white/5 opacity-50">
                  <div className="flex items-center gap-3 text-xs text-slate-500 italic">
                    <Clock size={12} /> Lesezeit ca. 5 Min.
                  </div>
                </div>
              </div>

              {/* Inhaltsbereich für die Archiv-Dokumente */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 scroll-smooth"
              >
                <div className="max-w-3xl mx-auto space-y-24 pb-20">
                  {content.sections.map((section, idx) => (
                    <motion.section 
                      key={idx}
                      className="archive-section relative"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="absolute -left-8 md:-left-12 top-0 text-eu-gold/10 font-black text-6xl md:text-8xl select-none">
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="w-10 h-[2px] bg-eu-gold/30" />
                          <h3 className="text-2xl md:text-4xl font-serif text-white italic tracking-tight">{section.subtitle}</h3>
                        </div>
                        
                        <div className="relative mb-12 group">
                          <div className="absolute -left-6 top-0 text-eu-gold/20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Quote size={40} className="transform -scale-x-100" />
                          </div>
                          <p className="text-lg md:text-xl text-slate-300 leading-[1.8] font-serif font-light">
                            {section.text}
                          </p>
                        </div>

                        {/* Aufklappbare Zusatzinformationen (Punkte) */}
                        {section.points && (
                          <div className="grid grid-cols-1 gap-4 mt-8">
                            {section.points.map((point, pIdx) => (
                              <ExpandablePoint key={pIdx} title={point.title} detail={point.detail} />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.section>
                  ))}

                  {/* End of Dossier */}
                  <div className="pt-20 border-t border-white/5 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-eu-gold/5 border border-eu-gold/20 rounded-full text-eu-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                      <FileText size={16} /> Ende des Dokuments
                    </div>
                    <p className="text-slate-500 font-serif italic text-lg opacity-60">"In Vielfalt geeint."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lese-Fortschrittsbalken */}
            <div className="h-1 bg-white/5 w-full shrink-0 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-eu-gold w-full origin-left"
                style={{ 
                  scaleX: activeSection / (content.sections.length - 1 || 1)
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
