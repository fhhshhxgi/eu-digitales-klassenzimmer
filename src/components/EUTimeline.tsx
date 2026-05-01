import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  { year: '1950', title: 'Schuman-Plan', description: 'Robert Schuman schlägt eine gemeinsame Verwaltung der Kohle- und Stahlindustrie vor.' },
  { year: '1951', title: 'EGKS Gründung', description: 'Die Europäische Gemeinschaft für Kohle und Stahl wird gegründet.' },
  { year: '1957', title: 'Römische Verträge', description: 'Gründung der EWG (Wirtschaftsgemeinschaft) und EURATOM.' },
  { year: '1973', title: 'Erste Erweiterung', description: 'Dänemark, Irland und das Vereinigte Königreich treten bei.' },
  { year: '1981', title: 'Süderweiterung I', description: 'Griechenland wird Mitglied.' },
  { year: '1986', title: 'Süderweiterung II', description: 'Spanien und Portugal treten bei.' },
  { year: '1993', title: 'Vertrag von Maastricht', description: 'Die Europäische Union wird offiziell ins Leben gerufen.' },
  { year: '1995', title: 'EFTA-Erweiterung', description: 'Österreich, Finnland und Schweden treten bei.' },
  { year: '2002', title: 'Euro-Bargeld', description: 'In 12 Ländern wird der Euro als Bargeld eingeführt.' },
  { year: '2004', title: 'Osterweiterung', description: '10 neue Länder (u.a. Polen, Tschechien, Ungarn) treten bei.' },
  { year: '2009', title: 'Vertrag von Lissabon', description: 'Die EU wird demokratischer und bekommt eine eigene Rechtspersönlichkeit.' },
  { year: '2013', title: 'Kroatien Beitritt', description: 'Kroatien wird das 28. (heute 27.) Mitglied.' },
  { year: '2020', title: 'Brexit', description: 'Das Vereinigte Königreich verlässt die EU.' },
];

export function EUTimeline() {
  return (
    <div className="relative py-12 px-4 overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
      
      <div className="space-y-12 relative">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Year Bubble */}
            <div className="flex-1 flex justify-center md:block">
              <div className={`glass-card p-6 w-full max-w-sm border-l-4 ${
                index % 2 === 0 ? 'border-l-eu-gold text-right' : 'border-l-eu-blue text-left'
              }`}>
                <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <Calendar size={14} className="text-eu-gold" />
                  <span className="text-eu-gold font-mono font-bold tracking-widest">{event.year}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{event.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Center Node */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-eu-dark border-2 border-eu-gold flex items-center justify-center shadow-[0_0_20px_rgba(255,204,0,0.3)]">
                <CheckCircle2 size={16} className="text-eu-gold" />
              </div>
            </div>

            {/* Empty space for balance */}
            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
