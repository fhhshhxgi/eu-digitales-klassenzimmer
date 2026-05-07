import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface GlossaryEntry {
  term: string;
  definition: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  'Schengen-Raum': {
    term: 'Schengen-Raum',
    definition: 'Ein Gebiet aus 27 europäischen Ländern, die ihre Binnengrenzen für den freien und uneingeschränkten Personenverkehr abgeschafft haben.'
  },
  'Institutionen': {
    term: 'Institutionen',
    definition: 'Die zentralen Organe der EU, wie das Europäische Parlament, der Rat und die Kommission, die gemeinsam Gesetze verabschieden und die Union verwalten.'
  },
  'Binnenmarkt': {
    term: 'Binnenmarkt',
    definition: 'Ein gemeinsamer Wirtschaftsraum, in dem der freie Verkehr von Waren, Personen, Dienstleistungen und Kapital (die "vier Grundfreiheiten") garantiert ist.'
  },
  'EGKS': {
    term: 'EGKS',
    definition: 'Die Europäische Gemeinschaft für Kohle und Stahl, gegründet 1951, war der erste Schritt zur wirtschaftlichen und politischen Integration Europas.'
  },
  'Friedensprojekt': {
    term: 'Friedensprojekt',
    definition: 'Die Grundidee der EU, durch wirtschaftliche Verflechtung und politische Zusammenarbeit Kriege zwischen den Mitgliedstaaten unmöglich zu machen.'
  },
  'Wirtschaftsraum': {
    term: 'Wirtschaftsraum',
    definition: 'Ein geografisches Gebiet, in dem Unternehmen unter ähnlichen Bedingungen Handel treiben und investieren können.'
  }
};

interface GlossaryTermProps {
  termKey: keyof typeof GLOSSARY;
  children?: React.ReactNode;
  className?: string;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ termKey, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const entry = GLOSSARY[termKey];

  if (!entry) return <span className={className}>{children}</span>;

  return (
    <span className="relative inline-block group">
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={cn(
          "cursor-help border-b border-dashed border-cyan-500/50 hover:border-cyan-400 text-cyan-400/90 transition-colors",
          className
        )}
      >
        {children || entry.term}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-[150] w-64 p-4 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-none block"
          >
            <span className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 block">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                </span>
              </span>
              <span className="flex-1 block">
                <strong className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-1 font-bold block">Glossar: {entry.term}</strong>
                <span className="text-xs text-white/80 leading-relaxed font-medium block">
                  {entry.definition}
                </span>
              </span>
            </span>
            
            {/* Arrow */}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-cyan-500/30 rotate-45" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
