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
          className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-eu-dark/95 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card max-w-lg w-full p-6 md:p-10 border-white/10 relative overflow-hidden flex flex-col max-h-[90vh] text-center"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-eu-gold opacity-30 shrink-0" />
            
            <div className="relative z-10 flex flex-col items-center flex-grow overflow-hidden">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shrink-0">
                <Shield className="text-eu-gold" size={32} />
              </div>

              <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6 shrink-0">
                Datenschutz
              </h2>
              
              <div className="space-y-6 text-slate-300 text-left overflow-y-auto pr-4 custom-scrollbar flex-grow">
                <div className="space-y-2">
                  <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">1. Allgemeines</h3>
                  <p className="text-sm leading-relaxed">
                    Der Schutz deiner Daten ist uns wichtig. Diese Erklärung informiert dich darüber, welche Daten wir im Rahmen des Feedback-Tools erheben und wie wir sie verwenden.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">2. Datenerfassung (Feedback-Tool)</h3>
                  <p className="text-sm leading-relaxed">
                    Wenn du das Feedback-Formular absendest, werden folgende Daten in einer Datenbank gespeichert:
                  </p>
                  <ul className="text-xs list-disc pl-5 space-y-1 text-slate-400">
                    <li>Deine Antworten auf die Projektfragen</li>
                    <li>Die gewählte Projektgruppe (z.B. Gruppe 1)</li>
                    <li>Ein Zeitstempel der Absendung</li>
                    <li>Technische Informationen (User-Agent/Browser-Version) zur Fehlerprävention</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">3. Nutzung von Firebase</h3>
                  <p className="text-sm leading-relaxed">
                    Wir nutzen für die Datenbank <span className="text-white">Google Firebase</span> (ein Dienst der Google Ireland Ltd.). Die Daten werden auf Servern von Google gespeichert. Wir haben die Sicherheitsregeln so konfiguriert, dass nur autorisierte Projektleiter Zugriff auf die kumulierten Antworten haben.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">4. Rechtsgrundlage & Speicherdauer</h3>
                  <p className="text-sm leading-relaxed">
                    Die Verarbeitung erfolgt auf Basis unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) zur Evaluation des Schulprojekts. Die Daten werden nach Abschluss des Projekts (spätestens zum Ende des Schuljahres 2026) gelöscht.
                  </p>
                </div>

                <div className="space-y-2 border-b border-white/5 pb-4">
                  <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">5. Deine Rechte</h3>
                  <p className="text-sm leading-relaxed">
                    Da das Feedback anonym erhoben wird (kein Name, keine IP-Adresse dauerhaft verknüpft), ist eine nachträgliche Löschung einzelner Beiträge technisch oft nicht möglich. Bei Fragen wende dich an die Projektleitung.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="mt-6 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-xs shrink-0"
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
