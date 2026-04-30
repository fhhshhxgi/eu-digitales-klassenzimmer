import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeroScene } from './components/HeroScene';
import { Section } from './components/Section';
import { QuizPrompt } from './components/QuizPrompt';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ImpressumModal } from './components/ImpressumModal';
import { PrivacyModal } from './components/PrivacyModal';
import { 
  History, 
  Globe, 
  Building2, 
  Coins, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Languages,
  Map,
  Users,
  Briefcase,
  TrendingUp,
  Cpu,
  Leaf
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const EU_BLUE = '#003399';
const EU_GOLD = '#FFCC00';

export default function App() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const populationData = [
    { name: 'Deutschland', pop: 83 },
    { name: 'Frankreich', pop: 67 },
    { name: 'Italien', pop: 59 },
    { name: 'Spanien', pop: 47 },
    { name: 'Polen', pop: 38 },
  ];

  const gdpData = [
    { name: 'Industrie', value: 40 },
    { name: 'Dienstleistung', value: 50 },
    { name: 'Landwirtschaft', value: 10 },
  ];

  return (
    <div className="bg-eu-dark min-h-screen relative selection:bg-eu-gold/30">
      <DisclaimerModal 
        isOpen={isDisclaimerOpen} 
        onClose={() => setIsDisclaimerOpen(false)} 
      />
      <ImpressumModal 
        isOpen={isImpressumOpen} 
        onClose={() => setIsImpressumOpen(false)} 
      />
      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
      {/* Decorative background elements from theme */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#003399_0%,#000F26_70%)] opacity-40" />
      </div>

      {/* Navigation Layer */}
      <nav className="fixed top-0 left-0 w-full h-16 z-50 px-10 flex justify-between items-center bg-eu-panel backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-eu-gold rounded-full animate-pulse" />
            <span className="text-eu-gold text-xl font-bold">★</span>
          </div>
          <span className="tracking-[0.2em] font-light text-xs uppercase text-white/80 hidden sm:block">EU Knowledge Archive</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-semibold tracking-widest uppercase text-white/60">
          <a href="#" className="text-white border-b border-eu-gold pb-1 transition-all">Home</a>
          <a href="#diversity" className="hover:text-white transition-colors">Mitgliedstaaten</a>
          <a href="#institutions" className="hover:text-white transition-colors">Institutionen</a>
          <a href="#future" className="hover:text-white transition-colors">Zukunft</a>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <HeroScene />
        
        {/* Left Focus Card */}
        <div className="absolute top-32 left-10 w-80 z-20 hidden lg:block space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-eu-gold uppercase text-[10px] tracking-widest mb-2 font-bold">Fokus: Archiv</h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Entdecke die transformationelle Reise vom Schuman-Plan bis zum digitalen Zeitalter.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 h-1 bg-eu-gold" />
              <div className="flex-1 h-1 bg-white/10" />
              <div className="flex-1 h-1 bg-white/10" />
            </div>
          </motion.div>
        </div>

        {/* Right Info Card */}
        <div className="absolute top-32 right-10 w-80 z-20 hidden lg:block space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase tracking-widest text-eu-gold">EU Statistik</span>
              <span className="text-[10px] opacity-40">LIVE: 2.1s</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Bevölkerung</span>
                <span className="text-sm font-mono tracking-tighter">~448 Mio</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-eu-gold w-[75%] h-full" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Handelsanteil (Global)</span>
                <span className="text-sm font-mono tracking-tighter">15.2%</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-white/40 w-[40%] h-full" />
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-extrabold text-white mb-4 leading-tight tracking-tighter uppercase">
              Die <span className="text-eu-gold">Europäische</span> Union
            </h1>
            <p className="text-white/40 uppercase tracking-[0.5em] text-sm font-medium mb-12">
              Politik • Wirtschaft • Zukunft Europas
            </p>
            
            <div className="flex justify-center">
              <motion.a
                href="#history"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-eu-gold text-black font-bold rounded-2xl flex items-center gap-3 transition-shadow shadow-[0_0_30px_rgba(255,204,0,0.2)] hover:shadow-[0_0_40px_rgba(255,204,0,0.4)]"
              >
                Archiv öffnen <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Scrollen zum Entdecken</span>
          <div className="w-px h-12 bg-gradient-to-b from-eu-gold font-bold to-transparent" />
        </motion.div>
      </header>

      {/* Intro Text */}
      <div className="max-w-4xl mx-auto py-24 px-6 text-center">
        <p className="text-2xl md:text-3xl font-medium text-slate-300 leading-relaxed italic">
          "Die Europäische Union ist eines der größten politischen und wirtschaftlichen Projekte der modernen Geschichte. Sie verbindet 27 Staaten mit unterschiedlichen Kulturen, Sprachen und politischen Systemen."
        </p>
      </div>

      {/* TOPIC 1: History */}
      <Section 
        id="history" 
        title="1. Entstehung und Entwicklung" 
        subtitle="Vom Trümmerhaufen zum Friedensnobelpreisträger. Ein Rückblick auf die Meilensteine europäischer Integration."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 border-l-4 border-l-eu-gold">
            <History className="text-eu-gold mb-4" size={32} />
            <h3 className="text-xl font-bold mb-3">Europa nach 1945</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nach dem Zweiten Weltkrieg lag Europa am Boden. Die Vision: Dauerhafter Frieden durch wirtschaftliche Verflechtung. Besonders die Aussöhnung zwischen Deutschland und Frankreich stand im Zentrum.
            </p>
          </div>
          
          <div className="glass-card p-6 border-l-4 border-l-eu-blue">
            <Map className="text-eu-blue mb-4" size={32} />
            <h3 className="text-xl font-bold mb-3">Erste Schritte (1951-1957)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              1951 startete die Europäische Gemeinschaft für Kohle und Stahl (EGKS). 1957 folgten die Römischen Verträge und die Gründung der EWG. Kohle und Stahl – die Basis für Krieg – wurden gemeinsam verwaltet.
            </p>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-white/20">
            <ShieldCheck className="text-white/60 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-3">Vertrag von Maastricht</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              1993 markiert die Geburtsstunde der EU in ihrer heutigen Form. Neben der Wirtschaft kamen die Sicherheits- und Außenpolitik sowie die Justiz als gemeinsame Pfeiler hinzu.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white/5 p-8 rounded-3xl border border-white/5">
          <h4 className="text-eu-gold font-bold mb-4 uppercase text-xs tracking-widest">Vertiefung: Frieden durch Handel</h4>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Die Kernidee war pragmatisch: Wenn Länder wirtschaftlich so stark voneinander abhängig sind, dass sie sich gegenseitig beliefern müssen, wird ein Krieg zwischen ihnen materiell unmöglich. Diese "Integration durch Wirtschaft" ist das Fundament der heutigen Stabilität.
          </p>
        </div>

        <QuizPrompt groupId={1} topicTitle="Entstehung und Entwicklung" />
      </Section>

      {/* TOPIC 2: Diversity */}
      <Section 
        id="diversity" 
        color="dark"
        title="2. Mitgliedsstaaten & EU Vielfalt" 
        subtitle="In Vielfalt geeint – von nordeuropäischen Wohlfahrtsstaaten bis zu den postsozialistischen Systemen des Ostens."
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 glass-card p-8 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6">Politische Systeme</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-eu-blue/40 flex items-center justify-center text-eu-blue font-bold">N</div>
                <div>
                  <p className="font-bold text-white">Norden</p>
                  <p className="text-xs text-slate-400">Ausgeprägte Wohlfahrtsstaaten, hohe Steuern, starke soziale Netze.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-eu-gold/40 flex items-center justify-center text-eu-gold font-bold">S</div>
                <div>
                  <p className="font-bold text-white">Süden</p>
                  <p className="text-xs text-slate-400">Tourismus-stark, oft höhere Staatsverschuldung, familiäre Strukturen.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">O</div>
                <div>
                  <p className="font-bold text-white">Osten</p>
                  <p className="text-xs text-slate-400">Transformationserfahrung, schnelles Wachstum, postsozialistisches Erbe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 bg-gradient-to-br from-eu-blue/20 to-transparent">
            <Languages className="text-eu-blue mb-4" size={32} />
            <h3 className="text-xl font-bold mb-4">Kultureller Reichtum</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Über 24 Amtssprachen und Hunderte Regionaldialekte. Die EU fördert den Erhalt dieser Identitäten unter dem Motto "United in Diversity".
            </p>
            <div className="flex flex-wrap gap-2">
              {['Hallo', 'Hello', 'Bonjour', 'Hola', 'Ciao', 'Ahoj', 'Hej'].map((w) => (
                <span key={w} className="text-[10px] px-2 py-1 bg-white/10 rounded-full text-white/50">{w}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 bg-gradient-to-br from-eu-gold/20 to-transparent">
            <Users className="text-eu-gold mb-4" size={32} />
            <h3 className="text-xl font-bold mb-4">Schengen-Raum</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Grenzenlose Freiheit für über 400 Millionen Menschen. Schengen bedeutet: Keine Kontrollen an den Binnengrenzen – ein Motor für Wirtschaft und Tourismus.
            </p>
          </div>
        </div>

        <div className="mt-8 h-[300px] w-full glass-card p-6">
           <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Bevölkerung in Millionen (Top 5)</h4>
           <div className="h-full">
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={populationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#001A4D', border: '1px solid #333' }}
                  itemStyle={{ color: '#FFCC00' }}
                />
                <Bar dataKey="pop" fill="#003399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>

        <QuizPrompt groupId={2} topicTitle="Mitgliedsstaaten und Vielfalt" />
      </Section>

      {/* TOPIC 3: Institutions */}
      <Section id="institutions" title="3. Institutionen & Politik">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-card p-8 h-full border-t-4 border-t-blue-500"
              >
                <Building2 className="text-blue-500 mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">EU-Kommission</h3>
                <p className="text-slate-400 mb-6">"Die Exekutive"</p>
                <ul className="text-sm text-slate-300 space-y-3">
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Schlägt Gesetze vor</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Überwacht Verträge</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Interessenwahrer der EU</li>
                </ul>
              </motion.div>
            </div>

            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-card p-8 h-full border-t-4 border-t-eu-gold"
              >
                <Users className="text-eu-gold mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Parlament</h3>
                <p className="text-slate-400 mb-6">"Die Volksvertreter"</p>
                <ul className="text-sm text-slate-300 space-y-3">
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Direkt gewählt</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Gesetzgebung (Pfeiler 1)</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Budget-Kontrolle</li>
                </ul>
              </motion.div>
            </div>

            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-card p-8 h-full border-t-4 border-t-slate-400"
              >
                <Building2 className="text-slate-400 mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Rat der EU</h3>
                <p className="text-slate-400 mb-6">"Die Minister"</p>
                <ul className="text-sm text-slate-300 space-y-3">
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Interessen der Staaten</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Gesetzgebung (Pfeiler 2)</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Politische Koordination</li>
                </ul>
              </motion.div>
            </div>
         </div>

         <div className="mt-16 p-8 glass-card border-eu-blue/30 overflow-hidden relative">
            <h4 className="text-center text-xl font-bold mb-12">Der Weg eines Gesetzes</h4>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="px-6 py-4 bg-blue-900/40 rounded-xl border border-blue-500/30 text-center w-full md:w-auto">Kommission (Vorschlag)</div>
              <ArrowRight className="hidden md:block text-eu-gold" />
              <div className="px-6 py-4 bg-slate-800 rounded-xl border border-white/10 text-center w-full md:w-auto">Parlament & Rat (Prüfung & Änderung)</div>
              <ArrowRight className="hidden md:block text-eu-gold" />
              <div className="px-6 py-4 bg-green-900/40 rounded-xl border border-green-500/30 text-center w-full md:w-auto">Einigung (Gesetz)</div>
            </div>
            <div className="mt-8 text-center text-xs text-slate-500 italic">
               *Warum das oft lange dauert? Weil 27 Länder und hunderte Abgeordnete einen Kompromiss finden müssen.*
            </div>
         </div>

         <QuizPrompt groupId={3} topicTitle="EU Institutionen und Prozesse" />
      </Section>

      {/* TOPIC 4: Economy */}
      <Section id="economy" color="blue" title="4. Wirtschaft, Binnenmarkt & Euro">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-eu-gold/20 rounded-2xl text-eu-gold"><Briefcase /></div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Die 4 Grundfreiheiten</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Der Binnenmarkt ist das Herzstück. Waren, Dienstleistungen, Kapital und Personen können sich frei über Grenzen hinweg bewegen.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-eu-blue/20 rounded-2xl text-eu-blue"><Coins /></div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Der Euro (€)</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Eingeführt zur Vertiefung der Integration. Er spart Wechselkursgebühren und macht Preise vergleichbar, birgt aber auch Risiken für wirtschaftlich schwächere Länder.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-white/10 rounded-2xl text-white"><TrendingUp /></div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Globaler Player</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Zusammen bildet die EU einen der größten Wirtschaftsräume der Welt mit enormer Verhandlungsmacht im globalen Handel.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-8">EU Wirtschaftsstruktur (Schätzung)</h4>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gdpData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#003399" />
                      <Cell fill="#FFCC00" />
                      <Cell fill="#444" />
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#001A4D', border: '1px solid #333' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 text-[10px] uppercase font-bold text-slate-500 mt-4">
                 <div className="flex items-center gap-1"><div className="w-2 h-2 bg-eu-blue rounded-full" /> Industrie</div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 bg-eu-gold rounded-full" /> Services</div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-600 rounded-full" /> Agrar</div>
              </div>
            </div>
         </div>

         <QuizPrompt groupId={4} topicTitle="Wirtschaft und Euro" />
      </Section>

      {/* TOPIC 5: Future */}
      <Section id="future" title="5. Herausforderungen & Zukunft">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 glass-card border-l-4 border-l-green-500">
             <Leaf className="text-green-500 mb-4" size={32} />
             <h3 className="text-xl font-bold mb-4">Green Deal</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               Die EU will bis 2050 klimaneutral werden. Das erfordert massive Investitionen in Erneuerbare Energien und den Umbau der gesamten Industrie.
             </p>
           </div>
           
           <div className="p-8 glass-card border-l-4 border-l-orange-500">
             <Map className="text-orange-500 mb-4" size={32} />
             <h3 className="text-xl font-bold mb-4">Migration</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               Eine der schwierigsten Fragen: Wie verteilt man Geflüchtete fair und sichert gleichzeitig die Außengrenzen? Hier prallen nationale Interessen hart aufeinander.
             </p>
           </div>

           <div className="p-8 glass-card border-l-4 border-l-purple-500">
             <Cpu className="text-purple-500 mb-4" size={32} />
             <h3 className="text-xl font-bold mb-4">Digitalisierung</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               Europa möchte die Hoheit über seine Daten behalten und mit KI-Giganten aus den USA und China konkurrieren. Der "Digital Services Act" setzt hier globale Standards.
             </p>
           </div>

           <div className="p-8 glass-card border-l-4 border-l-eu-gold">
             <Globe className="text-eu-gold mb-4" size={32} />
             <h3 className="text-xl font-bold mb-4">Globale Rolle</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               In einer instabilen Welt sucht die EU nach einer gemeinsamen Stimme in der Außenpolitik. Diplomatie und Entwicklungszusammenarbeit sind ihre stärksten Waffen.
             </p>
           </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-2xl font-light text-slate-300 italic mb-8">
            "Wird die EU weiter zusammenhalten oder entstehen neue regionale Blöcke? Die Antwort liegt in den Händen der nächsten Generation."
          </p>
          <div className="p-1 px-4 bg-eu-gold/10 border border-eu-gold/20 rounded-full inline-block text-eu-gold text-[10px] uppercase font-bold tracking-[0.3em]">
            Stabilität ist kein Zufall
          </div>
        </div>

        <QuizPrompt groupId={5} topicTitle="Zukunft der EU" />
      </Section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-eu-dark/30 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <h4 className="text-xl font-display font-black text-white mb-4">
              EU KNOWLEDGE <span className="text-eu-gold">ARCHIVE</span>
            </h4>
            <p className="text-sm text-slate-500 max-w-sm">
              Ein interaktives Bildungsprojekt über die Europäische Union. Entwickelt für modernen Politik- und Wirtschaftsunterricht.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-eu-gold uppercase tracking-widest">Rechtliches</h5>
              <p 
                onClick={() => setIsImpressumOpen(true)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                Impressum
              </p>
              <p 
                onClick={() => setIsPrivacyOpen(true)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                Datenschutz
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-[10px] text-slate-600 font-mono">
          &copy; 2026 Europäisches Klassenzimmer • In Vielfalt geeint
        </div>
      </footer>
    </div>
  );
}
