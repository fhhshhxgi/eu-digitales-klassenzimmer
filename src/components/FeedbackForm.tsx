import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { addDoc, collection, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { useSounds } from './SoundProvider';

const QUESTIONS = [
  { id: 'Lernen', label: 'Wichtigstes Learning', sub: 'Was war deine wichtigste Erkenntnis im Projekt?', placeholder: 'Ich habe gelernt, dass...' },
  { id: 'Material', label: 'Archiv & Material', sub: 'Waren die Quellen und Dokumente im Archiv hilfreich?', placeholder: 'Die Dokumente waren...' },
  { id: 'Zeitplanung', label: 'Zeitplanung', sub: 'War die Zeit für die Durchführung angemessen?', placeholder: 'Die Zeit war...' },
  { id: 'Ablauf', label: 'Ablauf & Gestaltung', sub: 'Was hättest du dir beim Ablauf anders gewünscht?', placeholder: 'Ich würde vorschlagen...' },
  { id: 'Allgemein', label: 'Lob & Kritik', sub: 'Hast du noch weitere Anregungen oder Lob?', placeholder: 'Außerdem möchte ich noch sagen...' }
];

interface FeedbackFormProps {
  isVisible?: boolean;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [group, setGroup] = useState<string>('Gruppe 1');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { playClick, playSuccess } = useSounds();

  const handleResponseChange = (id: string, value: string) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const isFormValid = QUESTIONS.every(q => responses[q.id]?.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus('submitting');
    playClick();

    const groupPath = `feedback_gruppen/${group}`;
    const responsesPath = `${groupPath}/antworten`;

    try {
      // Zuerst das Gruppen-Dokument sicherstellen (der "Ordner")
      await setDoc(doc(db, 'feedback_gruppen', group), {
        name: group,
        lastSubmission: serverTimestamp()
      }, { merge: true });

      // Dann die Antwort in den Unterordner schreiben
      await addDoc(collection(db, responsesPath), {
        responses,
        group,
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid || null,
        userAgent: navigator.userAgent
      });
      
      console.log(`Feedback erfolgreich für ${group} gespeichert.`);
      setStatus('success');
      playSuccess();
      setResponses({});
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      handleFirestoreError(error, OperationType.CREATE, responsesPath);
    }
  };

  return (
    <>
      {/* Redesigned Side Tab Feedback Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            id="feedback-toggle"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            whileHover={{ x: -5, backgroundColor: '#FFCC00', color: '#000F26' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOpen(true);
              playClick();
            }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-white/10 backdrop-blur-xl border-l border-y border-white/20 px-3 py-6 rounded-l-2xl flex flex-col items-center gap-3 text-white shadow-2xl transition-all cursor-pointer group"
          >
            <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-[0.2em]">Feedback</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-eu-dark/80 backdrop-blur-sm"
            />
            
            <motion.div
              id="feedback-modal"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#001435] border border-eu-gold/20 rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent shrink-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-serif text-white italic mb-1">Abschluss-Feedback</h2>
                    <p className="text-xs text-eu-gold/80 font-medium tracking-widest uppercase">Deine Einschätzung zur Projektwoche</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all border border-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-3 italic">Herzlichen Dank!</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Dein Feedback zum Projekt "Europäische Solidarität" wurde erfolgreich übermittelt.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-6">
                      <label className="block text-[10px] font-black uppercase tracking-[2px] text-slate-500">Deine Projekt-Gruppe</label>
                      <div className="flex flex-wrap gap-2">
                        {['Gruppe 1', 'Gruppe 2', 'Gruppe 3', 'Gruppe 4', 'Gruppe 5'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setGroup(g);
                              playClick();
                            }}
                            className={`px-6 py-2.5 rounded-full text-[11px] font-bold transition-all border ${
                              group === g 
                                ? 'bg-eu-gold border-eu-gold text-eu-dark' 
                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-12">
                      {QUESTIONS.map((q, idx) => (
                        <div key={q.id} className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-eu-gold w-6 h-6 rounded border border-eu-gold/20 flex items-center justify-center">0{idx + 1}</span>
                            <div className="space-y-1">
                              <label className="block text-sm font-serif italic text-white">{q.label}</label>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{q.sub}</p>
                            </div>
                          </div>
                          <textarea
                            required
                            value={responses[q.id] || ''}
                            onChange={(e) => handleResponseChange(q.id, e.target.value)}
                            placeholder={q.placeholder}
                            className="w-full h-28 bg-white/[0.03] border border-white/10 rounded-xl p-5 text-white placeholder:text-slate-700 focus:outline-none focus:border-eu-gold/30 transition-all resize-none text-sm leading-relaxed"
                          />
                        </div>
                      ))}
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center gap-3 text-red-400 text-xs font-bold bg-red-400/5 p-4 rounded-xl border border-red-400/10">
                            <AlertCircle size={18} className="shrink-0" />
                            <span>System-Error: Die Übermittlung konnte nicht abgeschlossen werden.</span>
                        </div>
                    )}

                    <div className="pt-6 sticky bottom-0 bg-[#001435]/80 backdrop-blur-md pb-4">
                      <motion.button
                        type="submit"
                        disabled={status === 'submitting' || !isFormValid}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-eu-gold text-eu-dark font-black uppercase tracking-[3px] text-[10px] rounded-xl shadow-xl disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2 group"
                      >
                        {status === 'submitting' ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <>
                            <span>Feedback Jetzt Absenden</span>
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-[9px] text-slate-500 mt-4 leading-tight">
                        Durch das Absenden stimmst du der anonymen Speicherung deiner Antworten in Firebase zu. Details findest du in der <button type="button" onClick={() => (window as any).setIsPrivacyOpen(true)} className="text-eu-gold hover:underline cursor-pointer">Datenschutzerklärung</button>.
                      </p>
                      {!isFormValid && (
                        <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest">Bitte fülle alle Fragen aus.</p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
