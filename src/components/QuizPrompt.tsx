import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Group, LifeBuoy } from 'lucide-react';

interface QuizPromptProps {
  groupId: number;
  topicTitle: string;
}

export function QuizPrompt({ groupId, topicTitle }: QuizPromptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mt-20 p-8 glass-card border-eu-gold/30 bg-eu-gold/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Group size={120} className="text-eu-gold" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-eu-gold text-black font-bold rounded-lg text-[10px] uppercase tracking-tighter">
              Archive Mission: Gruppe {groupId}
            </span>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Quiz-Konstruktion</h3>
          </div>
          
          <p className="text-white/60 mb-6 leading-relaxed font-light text-sm">
            Nutzt die digitalisierten Bestände zu <strong>"{topicTitle}"</strong>, um eine Verifizierungs-Matrix für eure Mitschüler zu erstellen. 
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-eu-gold/20 rounded-md">
                <CheckSquare size={16} className="text-eu-gold" />
              </div>
              <span className="text-sm text-slate-400">Mindestens 5 Fragen & Antworten</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-eu-gold/20 rounded-md">
                <CheckSquare size={16} className="text-eu-gold" />
              </div>
              <span className="text-sm text-slate-400">Bezug auf politische & wirtschaftliche Aspekte</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-eu-gold/20 rounded-md">
                <CheckSquare size={16} className="text-eu-gold" />
              </div>
              <span className="text-sm text-slate-400">Markiert zentrale Informationen im Text</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-eu-gold/20 rounded-md">
                <CheckSquare size={16} className="text-eu-gold" />
              </div>
              <span className="text-sm text-slate-400">Verständliche, aber anspruchsvolle Sprache</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-64 bg-eu-dark/40 p-4 rounded-xl border border-white/5">
          <h4 className="text-xs font-bold text-eu-gold uppercase mb-3 flex items-center gap-2">
            <LifeBuoy size={14} /> Quiz Vorlage
          </h4>
          <div className="space-y-3 font-mono text-[10px] text-slate-500">
            <div>
              <p className="text-slate-300">Frage 1: ...</p>
              <p className="text-eu-gold/70">Antwort: ...</p>
            </div>
            <div className="border-t border-white/5 pt-2">
              <p className="text-slate-300">Frage 2: ...</p>
              <p className="text-eu-gold/70">Antwort: ...</p>
            </div>
            <p className="italic">[weitere 3 Fragen...]</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
