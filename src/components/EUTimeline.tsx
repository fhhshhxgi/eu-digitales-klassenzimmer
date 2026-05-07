import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'Erweiterungen' | 'Vertragsänderungen' | 'Währungsunion';
}

const timelineEvents: TimelineEvent[] = [
  { year: '1950', title: 'Schuman-Plan', description: 'Robert Schuman schlägt eine gemeinsame Verwaltung der Kohle- und Stahlindustrie vor.', category: 'Vertragsänderungen' },
  { year: '1951', title: 'EGKS Gründung', description: 'Die Europäische Gemeinschaft für Kohle und Stahl wird gegründet.', category: 'Vertragsänderungen' },
  { year: '1957', title: 'Römische Verträge', description: 'Gründung der EWG (Wirtschaftsgemeinschaft) und EURATOM.', category: 'Vertragsänderungen' },
  { year: '1973', title: 'Erste Erweiterung', description: 'Dänemark, Irland und das Vereinigte Königreich treten bei.', category: 'Erweiterungen' },
  { year: '1981', title: 'Süderweiterung I', description: 'Griechenland wird Mitglied.', category: 'Erweiterungen' },
  { year: '1986', title: 'Süderweiterung II', description: 'Spanien und Portugal treten bei.', category: 'Erweiterungen' },
  { year: '1993', title: 'Vertrag von Maastricht', description: 'Die Europäische Union wird offiziell ins Leben gerufen.', category: 'Vertragsänderungen' },
  { year: '1995', title: 'EFTA-Erweiterung', description: 'Österreich, Finnland und Schweden treten bei.', category: 'Erweiterungen' },
  { year: '2002', title: 'Euro-Bargeld', description: 'In 12 Ländern wird der Euro als Bargeld eingeführt.', category: 'Währungsunion' },
  { year: '2004', title: 'Osterweiterung', description: '10 neue Länder (u.a. Polen, Tschechien, Ungarn) treten bei.', category: 'Erweiterungen' },
  { year: '2009', title: 'Vertrag von Lissabon', description: 'Die EU wird demokratischer und bekommt eine eigene Rechtspersönlichkeit.', category: 'Vertragsänderungen' },
  { year: '2013', title: 'Kroatien Beitritt', description: 'Kroatien wird das 28. (heute 27.) Mitglied.', category: 'Erweiterungen' },
  { year: '2020', title: 'Brexit', description: 'Das Vereinigte Königreich verlässt die EU.', category: 'Erweiterungen' },
];

export function EUTimeline() {
  const [filter, setFilter] = React.useState<string>('Alle');
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  
  const categories = ['Alle', 'Erweiterungen', 'Vertragsänderungen', 'Währungsunion'];
  
  const filteredEvents = filter === 'Alle' 
    ? timelineEvents 
    : timelineEvents.filter(e => e.category === filter);

  // Handle clicks outside to clear active state
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.timeline-item') && !target.closest('.category-filter')) {
        setActiveIndex(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleActive = (index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="relative py-12 px-4 overflow-hidden">
      {/* Kategoriefilter für Zeitachsen-Events */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-20 category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
              filter === cat 
                ? 'bg-eu-gold text-eu-dark border-eu-gold shadow-[0_0_15px_rgba(255,204,0,0.4)]' 
                : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Zentrale vertikale Linie */}
      <div className="absolute left-1/2 top-32 bottom-0 w-px bg-white/10 hidden md:block" />
      
      <div className="space-y-12 relative">
        {filteredEvents.map((event, index) => {
          const isHighlighted = hoveredIndex === index || activeIndex === index;
          
          return (
            <motion.div
              key={`${event.year}-${index}`}
              data-index={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleActive(index);
              }}
              className={`timeline-item flex flex-col md:flex-row items-center gap-8 cursor-pointer select-none ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Event-Karte */}
              <div className="flex-1 flex justify-center md:block">
                <div className={`glass-card p-6 w-full max-w-sm border-l-4 transition-all duration-300 ${
                  isHighlighted 
                    ? 'border-l-eu-gold bg-eu-blue/30 scale-[1.02] shadow-[0_0_30px_rgba(255,204,0,0.15)] ring-1 ring-eu-gold/20' 
                    : index % 2 === 0 ? 'border-l-eu-gold/40 text-left md:text-right' : 'border-l-eu-blue/40 text-left'
                }`}>
                  <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'}`}>
                    <Calendar size={14} className={isHighlighted ? "text-eu-gold" : "text-white/40"} />
                    <span className={`font-mono font-bold tracking-widest transition-colors ${
                      isHighlighted ? 'text-eu-gold' : 'text-white/30'
                    }`}>{event.year}</span>
                  </div>
                  <h4 className={`text-lg font-bold transition-colors mb-2 ${isHighlighted ? 'text-white' : 'text-white/80'}`}>{event.title}</h4>
                  <p className={`text-sm leading-relaxed transition-colors ${isHighlighted ? 'text-slate-200' : 'text-slate-400'}`}>{event.description}</p>
                </div>
              </div>

              {/* Zentraler Knotenpunkt */}
              <div className="relative z-10 flex items-center justify-center">
                <motion.div 
                  animate={{
                    scale: isHighlighted ? 1.3 : 1,
                    backgroundColor: isHighlighted ? '#FFCC00' : '#000F26',
                    boxShadow: isHighlighted ? '0 0 20px rgba(255,204,0,0.6)' : '0 0 0px rgba(255,204,0,0)'
                  }}
                  className={`w-10 h-10 rounded-full border-2 border-eu-gold flex items-center justify-center transition-colors duration-300`}
                >
                  <CheckCircle2 size={16} className={isHighlighted ? "text-eu-dark" : "text-eu-gold"} />
                </motion.div>
                
                {/* Verbindungslinien mit Glow-Effekt bei Auswahl */}
                <AnimatePresence>
                  {isHighlighted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: '100vh' }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] bg-eu-gold shadow-[0_0_15px_rgba(255,204,0,0.4)] -z-10 hidden md:block"
                    />
                  )}
                </AnimatePresence>
              </div>
              
              {/* Leerraum für optisches Gleichgewicht */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
