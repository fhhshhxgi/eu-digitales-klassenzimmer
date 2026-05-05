import React from 'react';
import { motion } from 'framer-motion';
import { User, Quote } from 'lucide-react';

interface Father {
  name: string;
  country: string;
  role: string;
  contribution: string;
  quote: string;
  imageUrl: string;
}

const fathers: Father[] = [
  {
    name: "Robert Schuman",
    country: "Frankreich",
    role: "Außenminister",
    contribution: "Verfasser der Schuman-Erklärung, die den Grundstein für die EGKS legte.",
    quote: "Europa lässt sich nicht mit einem Schlage herstellen...",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Robert-Schuman-1953_%28cropped%29.jpg"
  },
  {
    name: "Konrad Adenauer",
    country: "Deutschland",
    role: "Bundeskanzler",
    contribution: "Förderte die Aussöhnung zwischen Deutschland und Frankreich.",
    quote: "Die Einheit Europas war ein Traum von wenigen...",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Konrad_Adenauer_1952_Portrait_%283x4_cropped%29.jpg"
  },
  {
    name: "Jean Monnet",
    country: "Frankreich",
    role: "Wirtschaftsberater",
    contribution: "Der 'Architekt' der europäischen Einigung und Schöpfer des Schuman-Plans.",
    quote: "Wir vereinen nicht Staaten, wir vereinigen Menschen.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Jean_Monnet_1967.jpg"
  },
  {
    name: "Alcide De Gasperi",
    country: "Italien",
    role: "Ministerpräsident",
    contribution: "Setzte sich für die Einbindung Italiens in die europäischen Strukturen ein.",
    quote: "Die Zukunft wird nicht durch Kriege, sondern durch Arbeit aufgebaut.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Alcide_De_Gasperi_2.jpg"
  }
];

export function FoundingFathers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {fathers.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.8 }}
          className="group relative"
        >
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
            {/* Portrait Frame */}
            <div className="relative flex-shrink-0">
              <div className="w-48 h-64 overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] bg-white/5 border border-white/10">
                <img 
                  src={f.imageUrl} 
                  alt={f.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eu-dark/80 via-transparent to-transparent opacity-60" />
              </div>
              {/* Country Badge */}
              <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-eu-gold text-eu-dark text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl">
                {f.country}
              </div>
            </div>

            {/* Info Content */}
            <div className="flex-1 flex flex-col justify-center text-center sm:text-left py-2">
              <div className="mb-4">
                <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">
                  {f.name}
                </h4>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div className="h-px w-6 bg-eu-gold/50" />
                  <p className="text-[11px] font-medium text-eu-gold/80 uppercase tracking-[0.2em]">{f.role}</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-light mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                {f.contribution}
              </p>

              <div className="relative pl-6 border-l border-white/10 italic">
                <Quote size={12} className="text-eu-gold/30 absolute top-0 left-0" />
                <p className="text-xs text-white/70 leading-relaxed">
                  "{f.quote}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
