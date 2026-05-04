import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroScene } from './components/HeroScene';
import { Section } from './components/Section';
import { QuizPrompt } from './components/QuizPrompt';
import { TiltCard } from './components/TiltCard';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ImpressumModal } from './components/ImpressumModal';
import { PrivacyModal } from './components/PrivacyModal';
import { DetailedSectionModal } from './components/DetailedSectionModal';
import { EUTimeline } from './components/EUTimeline';
import { EUMap } from './components/EUMap';
import { EUDataCharts } from './components/EUDataCharts';
import { EUDashboard } from './components/EUDashboard';
import { LegislativePlan } from './components/LegislativePlan';
import { MarketBento } from './components/MarketBento';
import { ChallengeRadar } from './components/ChallengeRadar';
import { EuroZone } from './components/EuroZone';
import { FutureExpansion } from './components/FutureExpansion';
import { GlobalTrade } from './components/GlobalTrade';
import { FutureScenarios } from './components/FutureScenarios';
import { EconomicPowerhouse } from './components/EconomicPowerhouse';
import { LoadingScreen } from './components/LoadingScreen';
import { TabletNav } from './components/TabletNav';
import { CouncilSimulator } from './components/CouncilSimulator';
import { useSounds } from './components/SoundProvider';

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
  Leaf,
  BookOpen,
  Menu,
  X,
  ArrowUp,
  ChevronRight,
  HelpCircle,
  Scale,
  MessagesSquare,
  Lock,
  Zap,
  EyeOff
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

import { DemocracyCompass } from './components/DemocracyCompass';
import { SecurityNodeNetwork } from './components/SecurityNodeNetwork';

const EU_BLUE = '#003399';
const EU_GOLD = '#FFCC00';

export default function App() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [activeDetailedTopic, setActiveDetailedTopic] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDeviceNotice, setShowDeviceNotice] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { playClick } = useSounds();

  // Handle Initial Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  // Monitor scroll position for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const detailedContent = [
    {
      title: "Entstehung & Entwicklung (EGKS bis EU)",
      sections: [
        {
          subtitle: "Frieden durch wirtschaftliche Verflechtung",
          text: "Nach 1945 stand Europa vor der Trümmerwüste zweier Weltkriege. Die zentrale Erkenntnis von Denkern wie Robert Schuman und Jean Monnet war: Nur wenn die kriegswichtigen Industrien (Kohle und Stahl) gemeinsam kontrolliert werden, kann kein Staat mehr heimlich aufrüsten. Dies war die Geburtsstunde der EGKS (1951).",
          points: [
            { 
              title: "Aussöhnung Deutschland-Frankreich", 
              detail: "Die jahrhundertelange 'Erbfeindschaft' sollte durch gemeinsame Verwaltung von Ressourcen beendet werden. Der Schuman-Plan vom 9. Mai 1950 (heute Europatag) war das Fundament." 
            },
            { 
              title: "Übertragung von Souveränität", 
              detail: "Erstmals gaben Nationalstaaten freiwillig Macht an eine übernationale Behörde ab. Dies verhinderte nationale Alleingänge in der Rüstungsproduktion." 
            },
            { 
              title: "Wirtschaftlicher Friedensgarant", 
              detail: "Wer wirtschaftlich so eng verflochten ist, dass er auf die Lieferungen des Nachbarn angewiesen ist, kann materiell keinen Krieg mehr gegen ihn führen." 
            }
          ]
        },
        {
          subtitle: "Vom gemeinsamen Markt zum Binnenmarkt",
          text: "1957 weiteten die 'Römischen Verträge' die Zusammenarbeit auf die gesamte Wirtschaft aus. Die Europäische Wirtschaftsgemeinschaft (EWG) zielte auf einen gemeinsamen Markt ab. Dies legte das Fundament für die heutigen vier Grundfreiheiten.",
          points: [
            { 
              title: "Gründung der EWG und EURATOM", 
              detail: "Neben der allgemeinen Wirtschaft wurde auch die zivile Nutzung der Atomenergie gemeinsam koordiniert, um technologischen Anschluss zu halten." 
            },
            { 
              title: "Abbau von Binnenzöllen", 
              detail: "Der freie Warenverkehr wurde schrittweise eingeführt, was zu einem enormen Wirtschaftswachstum in den Gründungsstaaten führte." 
            },
            { 
              title: "Harmonisierung der Wirtschaftsordnungen", 
              detail: "Es wurden erste Regeln für fairen Wettbewerb geschaffen, damit kein Staat seine eigenen Firmen unzulässig bevorteilen konnte." 
            }
          ]
        },
        {
          subtitle: "Maastricht und die Politische Union (EU)",
          text: "Der Vertrag von Maastricht (1993) transformierte die Gemeinschaft in die 'Europäische Union'. Er führte das Drei-Säulen-Modell ein: EG, Gemeinsame Außenpolitik und Zusammenarbeit in Justiz/Inneres. Hier wurde auch die Grundlage für den Euro gelegt.",
          points: [
            { 
              title: "Einführung der Unionsbürgerschaft", 
              detail: "Jeder Bürger eines Mitgliedstaates erhielt das Recht, in der gesamten EU zu leben, zu arbeiten und an Kommunalwahlen teilzunehmen." 
            },
            { 
              title: "Aufbau der Europäische Zentralbank (EZB)", 
              detail: "Mit Sitz in Frankfurt wurde die Europäische Zentralbank geschaffen, um eine stabile gemeinsame Währung für den Weltmarkt vorzubereiten." 
            },
            { 
              title: "Stärkung des EU-Parlaments", 
              detail: "Das EU-Parlament erhielt erstmals echte Mitbestimmungsrechte bei der Gesetzgebung, um das sogenannte 'Demokratiedefizit' zu verringern." 
            }
          ]
        }
      ]
    },
    {
      title: "Mitgliedsstaaten & Vielfalt",
      sections: [
        {
          subtitle: "Drei sozioökonomische Welten",
          text: "Die EU vereint höchst unterschiedliche Modelle. Während der Norden auf hohe soziale Absicherung (Wohlfahrtsstaat) setzt, stehen im Osten die Transformation alter Strukturen und im Süden der Tourismus sowie kleinmittelständische Betriebe im Fokus.",
          points: [
            { 
              title: "Nordisches Wohlfahrtsmodell", 
              detail: "Hohe Steuern finanzieren exzellente Bildung und soziale Sicherheit, was zu einer sehr hohen Lebensqualität und Innovationskraft führt." 
            },
            { 
              title: "Strukturwandel im Osten", 
              detail: "Seit der Osterweiterung 2004 mussten viele Staaten ihre Wirtschaft umstellen, massiv unterstützt durch Milliarden aus den EU-Strukturfonds." 
            },
            { 
              title: "Herausforderung Südeuropa", 
              detail: "Hohe Jugendarbeitslosigkeit und Abhängigkeit vom Tourismus erfordern oft spezielle EU-Investitionsprogramme zur Diversifizierung der Wirtschaft." 
            }
          ]
        },
        {
          subtitle: "Kulturelle Identität und Mehrsprachigkeit",
          text: "Die EU ist kein Schmelztiegel wie die USA, sondern ein Mosaik. Mit 24 Amtssprachen investiert die Union enorme Summen in Übersetzungsdienste, um sicherzustellen, dass jeder Bürger Gesetze in seiner Muttersprache verstehen kann.",
          points: [
            { 
              title: "Motto: In Vielfalt geeint (United in Diversity)", 
              detail: "Die Union schützt die nationale Identität der Staaten. Es gibt keine 'europäische Einheitskultur', sondern ein gemeinsames Wertefundament." 
            },
            { 
              title: "Kulturförderprogramme", 
              detail: "Über Programme wie 'Erasmus+' wird der Austausch gefördert, während gleichzeitig regionale Dialekte und Traditionen geschützt werden (Sprachencharta)." 
            },
            { 
              title: "Sprachliche Gleichberechtigung", 
              detail: "Alle offiziellen Dokumente müssen in alle 24 Sprachen übersetzt werden, damit der Zugang zum Recht für alle Europäer gleich ist." 
            }
          ]
        },
        {
          subtitle: "Schengen: Ein Raum ohne Binnengrenzen",
          text: "Das Schengener Abkommen ermöglicht Reisen ohne Grenzkontrollen. Dies ist für den Welthandel (Just-in-time-Lieferungen) und den Tourismus essenziell, fordert aber den verstärkten Schutz der Außengrenzen (Frontex).",
          points: [
            { 
              title: "Das SIS-System", 
              detail: "Das Schengener Informationssystem ermöglicht es der Polizei aller Länder, sekundenschnell nach verdächtigen Fahrzeugen oder Personen zu fahnden." 
            },
            { 
              title: "Wegfall von Wartezeiten", 
              detail: "Für LKW-Fahrer und Pendler bedeutet Schengen eine enorme Zeit- und Kostenersparnis, was die Preise von Waren für Verbraucher senkt." 
            },
            { 
              title: "Frontex und Außenschutz", 
              detail: "Da es innen keine Grenzen gibt, muss die Sicherheit an den Außengrenzen gemeinsam durch die europäische Grenzschutzagentur gewährleistet werden." 
            }
          ]
        }
      ]
    },
    {
      title: "Institutionen & Prozesse",
      sections: [
        {
          subtitle: "Die Hüterin der Verträge: Die Kommission",
          text: "Die Kommission ist die Exekutive der EU und besitzt das sogenannte Initiativmonopol – sie ist die einzige Gruppe, die neue Gesetze vorschlagen darf. Sie besteht aus 27 Kommissaren (einer pro Land).",
          points: [
            { 
              title: "Das Initiativmonopol", 
              detail: "Weder das Parlament noch der Rat können formell ein Gesetz starten. Sie müssen die Kommission bitten, einen Vorschlag auszuarbeiten." 
            },
            { 
              title: "Wächterin der Verträge", 
              detail: "Wenn ein Land gegen EU-Recht verstößt (z.B. Umweltstandards ignoriert), kann die Kommission dieses Land vor dem Europäischen Gerichtshof (EuGH) verklagen." 
            },
            { 
              title: "Verwaltung des EU-Haushalts", 
              detail: "Die Kommission verwaltet die Gelder der EU (ca. 170 Mrd. Euro pro Jahr) und sorgt dafür, dass sie korrekt für Strukturprojekte ausgegeben werden." 
            }
          ]
        },
        {
          subtitle: "Parlament: Die Legislative der Bürger",
          text: "Das Europäische Parlament ist die einzige direkt gewählte Vertretung. Es entscheidet fast überall gleichberechtigt mit dem Rat (Ordentliches Gesetzgebungsverfahren) und kontrolliert die Kommission.",
          points: [
            { 
              title: "Direktwahl alle 5 Jahre", 
              detail: "Die Bürger wählen Parteien, die sich in europäischen Fraktionen (z.B. EVP, Sozialdemokraten) zusammenschließen, nicht nach Nationalität." 
            },
            { 
              title: "Degressive Proportionalität", 
              detail: "Kleine Länder haben im Verhältnis zur Einwohnerzahl mehr Abgeordnete als große, damit ihre Stimme im Plenum nicht völlig untergeht." 
            },
            { 
              title: "Anhörung der Kommissare", 
              detail: "Bevor die Kommission die Arbeit aufnimmt, muss jeder Kommissar eine harte Befragung im Parlament bestehen (Hearings). Fällt einer durch, muss das Land einen neuen schicken." 
            }
          ]
        },
        {
          subtitle: "Rat der EU: Vertretung der Regierungen",
          text: "Im 'Rat der EU' (Ministerrat) treffen sich die Fachminister. Viele Entscheidungen fallen mit 'Qualifizierter Mehrheit' (55% der Länder, 65% der Bevölkerung), was oft zähe Verhandlungen bedeuten kann.",
          points: [
            { 
              title: "Verteidigung nationaler Interessen", 
              detail: "Ein Minister achtet darauf, dass ein neues Gesetz gut für sein Heimatland ist, muss aber einen europäischen Kompromiss finden." 
            },
            { 
              title: "Qualifizierte Mehrheit", 
              detail: "Dieses Abstimmungssystem verhindert, dass ein einzelnes Land alles blockiert (Veto-Recht abgebaut), erfordert aber breite Bündnisse." 
            },
            { 
              title: "Vorsitz-Rotation (Präsidentschaft)", 
              detail: "Alle sechs Monate übernimmt ein anderes Land die Leitung des Rates und darf bestimmen, welche Themen besonders wichtig sind." 
            }
          ]
        }
      ]
    },
    {
      title: "Wirtschaft & Binnenmarkt",
      sections: [
        {
          subtitle: "Die vier Grundfreiheiten des Marktes",
          text: "Der Binnenmarkt eliminiert nicht nur Zölle, sondern auch technische Hürden. Die vier Freiheiten (Waren, Personen, Dienstleistungen, Kapital) machen die EU zu einer der stärksten Wirtschaftsmächte der Welt.",
          points: [
            { 
              title: "Freier Warenverkehr", 
              detail: "Produkte, die in einem Land zugelassen sind, dürfen ohne neue Prüfung in alle 26 anderen Länder verkauft werden (Gegenseitige Anerkennung)." 
            },
            { 
              title: "Arbeitnehmerfreizügigkeit", 
              detail: "Jeder EU-Bürger kann ohne Arbeitsvisum in jedem Mitgliedstaat einen Job annehmen und dort mit seiner Familie leben." 
            },
            { 
              title: "Freier Kapitalverkehr", 
              detail: "Unternehmen und Bürger können ihr Geld dort investieren oder anlegen, wo sie die besten Bedingungen finden, ohne Behinderung durch den Staat." 
            }
          ]
        },
        {
          subtitle: "Währungsunion und der Euro",
          text: "Die Europäische Währungsunion (EWU) sollte das wirtschaftliche Zusammenwachsen beschleunigen. Da es aber keine gemeinsame Steuerpolitik gibt, müssen Länder mit unterschiedlicher Stärke mit demselben Zinssatz arbeiten.",
          points: [
            { 
              title: "Preisstabilität als oberstes Ziel", 
              detail: "Die Europäische Zentralbank (EZB) achtet darauf, dass die Inflation bei ca. 2% bleibt, um den Wert des Geldes dauerhaft zu sichern." 
            },
            { 
              title: "Wegfall von Wechselkursrisiken", 
              detail: "Firmen können langfristig planen, da sie nicht befürchten müssen, dass eine Währung plötzlich an Wert verliert und ihre Produkte im Ausland zu teuer werden." 
            },
            { 
              title: "Stabilitäts- und Wachstumspakt", 
              detail: "Regeln, die besagen, dass Länder nicht zu viele Schulden machen dürfen (max. 3% Defizit), um den Euro nicht zu gefährden." 
            }
          ]
        },
        {
          subtitle: "Verbraucherschutz und Wettbewerbsrecht",
          text: "Die EU bekämpft Monopole (z.B. Geldbußen gegen Tech-Giganten) und sichert hohe Standards. Beispiele sind die Abschaffung von Roaming-Gebühren oder die Fluggastrechte-Verordnung.",
          points: [
            { 
              title: "Kampf gegen Kartelle", 
              detail: "Die Wettbewerbskommissarin hat die Macht, Megafusionen zu verbieten, wenn dadurch die Preise für Verbraucher zu stark steigen würden." 
            },
            { 
              title: "Verbot staatlicher Beihilfen", 
              detail: "Staaten dürfen ihre eigenen Pleitefirmen nicht künstlich am Leben halten, wenn das den fairen Wettbewerb in Europa verzerrt." 
            },
            { 
              title: "Digitale Rechte (DSGVO)", 
              detail: "Gesetze wie die Datenschutz-Grundverordnung schützen die Daten der Europäer weltweit und zwingen US-Konzerne zu ethischen Standards." 
            }
          ]
        }
      ]
    },
    {
      title: "Zukunft & Herausforderungen",
      sections: [
        {
          subtitle: "Der Green Deal: Klima-Agenda 2050",
          text: "Europa will der erste klimaneutrale Kontinent werden. Dies ist eine neue Wirtschaftsstrategie und erfordert den kompletten Umbau von Energie, Verkehr und Landwirtschaft unter hohem Zeitdruck.",
          points: [
            { 
              title: "Klimaneutralität bis 2050", 
              detail: "Bis 2050 darf die EU unter dem Strich keine Treibhausgase mehr ausstoßen. Alle Industrien müssen auf CO2-freie Prozesse umgestellt werden." 
            },
            { 
              title: "CO2-Grenzausgleichssystem", 
              detail: "Firmen von außerhalb sollen Abgaben zahlen, wenn sie Produkte in die EU liefern, die schmutzig produziert wurden, um fairen Wettbewerb zu sichern." 
            },
            { 
              title: "Wasserstoff-Strategie", 
              detail: "Die EU investiert Milliarden, um Schwerindustrie (Stahl, Chemie) von Kohle auf grünen Wasserstoff umzustellen." 
            }
          ]
        },
        {
          subtitle: "Migration und Außenschutz (GEAS)",
          text: "Die Dublin-Verordnung gilt als reformbedürftig. Ein Kompromiss zwischen Solidarität bei der Verteilung und strengem Grenzschutz (Frontex) ist politisch schwer zu finden.",
          points: [
            { 
              title: "Reform des GEAS (Asylsystem)", 
              detail: "Das neue Gemeinsame Europäische Asylsystem soll Verfahren direkt an der Außengrenze ermöglichen, um Rückführungen zu beschleunigen." 
            },
            { 
              title: "Ausbau von Frontex", 
              detail: "Die Grenzschutzagentur soll bis zu 10.000 Einsatzkräfte erhalten, um die Überwachung der Küsten und Landgrenzen zu professionalisieren." 
            },
            { 
              title: "Solidaritätsmechanismus", 
              detail: "Länder sollen entweder Geflüchtete aufnehmen oder finanzielle Beiträge zum Grenzschutz leisten, um die Staaten an den Grenzen zu entlasten." 
            }
          ]
        },
        {
          subtitle: "Digitale Souveränität & KI",
          text: "Im Wettlauf um KI darf Europa nicht zur digitalen Kolonie werden. Der 'AI Act' und der 'Chips Act' sollen europäische Werte weltweit zum Goldstandard für Technik machen.",
          points: [
            { 
              title: "Der European AI Act", 
              detail: "Das weltweit erste Gesetz, das Künstliche Intelligenz nach Risikoklassen einteilt. Gefährliche Anwendungen (Social Scoring) werden verboten." 
            },
            { 
              title: "European Chips Act", 
              detail: "Milliarden für den Bau eigener Chip-Fabriken in Europa, um bei der Hardware nicht nur von Asien abhängig zu sein." 
            },
            { 
              title: "GAIA-X Infrastruktur", 
              detail: "Ein Projekt für ein europäisches Cloud-System, damit Firmen ihre Daten sicher speichern können, ohne Zugriff fremder Geheimdienste." 
            }
          ]
        },
        {
          subtitle: "Demokratie & Rechtsstaatlichkeit",
          text: "Die EU ist eine Wertegemeinschaft. Aktuell kämpft sie jedoch damit, dass einige Mitgliedstaaten demokratische Standards und die Unabhängigkeit der Justiz infrage stellen. Das Verfahren nach Artikel 7 des EU-Vertrags soll die Rechtsstaatlichkeit in allen Ländern sichern.",
          points: [
            { 
              title: "Artikel-7-Verfahren", 
              detail: "Ein Mechanismus, der einem Land das Stimmrecht entziehen kann, wenn es massiv gegen EU-Grundwerte verstößt. Er wird oft als 'Atombombe der Verträge' bezeichnet." 
            },
            { 
              title: "Rechtsstaats-Konditionalität", 
              detail: "Die EU kann Fördergelder kürzen oder einfrieren, wenn ein Staat gegen rechtsstaatliche Prinzipien verstößt und damit den korrekten Einsatz von EU-Mitteln gefährdet." 
            },
            { 
              title: "Schutz vor Desinformation", 
              detail: "Strategien zur Sicherung von Wahlen gegen Fake News und Manipulation durch Chatbots oder ausländische Einflussnahme." 
            }
          ]
        },
        {
          subtitle: "Erweiterung & EU-Reformen",
          text: "Die EU könnte in Zukunft auf über 30 Mitglieder anwachsen (z. B. Ukraine, Serbien, Albanien). Damit dieses 'Europa der 30+' funktioniert, muss die EU intern reformiert werden – etwa durch die Abschaffung des Veto-Rechts in wichtigen Bereichen.",
          points: [
            { 
              title: "Vom Veto zur Mehrheitsentscheidung", 
              detail: "Die Diskussion, im Ministerrat vermehrt Mehrheitsentscheidungen (statt Einstimmigkeit) zu treffen, damit einzelne Länder wichtige Beschlüsse nicht blockieren können." 
            },
            { 
              title: "Beitrittskandidat Ukraine", 
              detail: "Die historische Herausforderung, ein Land im Kriegszustand in den Binnenmarkt zu integrieren und gleichzeitig die EU-Strukturen stabil zu halten." 
            },
            { 
              title: "Abstufungen der Mitgliedschaft", 
              detail: "Modelle eines 'Europas der verschiedenen Geschwindigkeiten', bei dem einige Länder enger zusammenarbeiten als andere (z.B. Euro-Zone oder Schengen)." 
            }
          ]
        },
        {
          subtitle: "Sicherheit & Strategische Autonomie",
          text: "Angesichts globaler Krisen wächst der Druck, eine echte Sicherheits- und Verteidigungsunion zu schaffen. Ziel ist die 'strategische Autonomie' – also die Fähigkeit der EU, eigenständig für ihre Sicherheit zu sorgen.",
          points: [
            { 
              title: "Der Strategische Kompass", 
              detail: "Ein Plan für die Verteidigungspolitik der EU bis 2030, der unter anderem eine schnelle Eingreiftruppe von 5.000 Soldaten vorsieht." 
            },
            { 
              title: "PESCO – Militärische Kooperation", 
              detail: "Ein Projekt, bei dem EU-Staaten gemeinsam Rüstungsprojekte (wie Panzer oder Drohnen) entwickeln und ihre Armeen enger verzahnen." 
            },
            { 
              title: "Schutz kritischer Infrastruktur", 
              detail: "Gemeinsame Abwehr von Cyberangriffen auf Stromnetze, Internetseekabel und Krankenhäuser auf europäischer Ebene." 
            }
          ]
        }
      ]
    }
  ];

  const populationData = [
    { name: 'Deutschland', pop: 83 },
    { name: 'Frankreich', pop: 67 },
    { name: 'Italien', pop: 59 },
    { name: 'Spanien', pop: 47 },
    { name: 'Polen', pop: 38 },
  ];

  const bipStructureData = [
    { name: 'Industrie', value: 40 },
    { name: 'Dienstleistung', value: 50 },
    { name: 'Landwirtschaft', value: 10 },
  ];

  const [isLowDevice, setIsLowDevice] = useState(false);
  useEffect(() => {
    const checkLowDevice = () => setIsLowDevice(window.innerWidth < 1024);
    checkLowDevice();
    window.addEventListener('resize', checkLowDevice);
    return () => window.removeEventListener('resize', checkLowDevice);
  }, []);

  return (
    <div className="bg-eu-dark min-h-screen relative selection:bg-eu-gold/30">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <TabletNav />

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
      <DetailedSectionModal
        isOpen={activeDetailedTopic !== null}
        onClose={() => setActiveDetailedTopic(null)}
        title={activeDetailedTopic !== null ? detailedContent[activeDetailedTopic].title : ""}
        content={activeDetailedTopic !== null ? detailedContent[activeDetailedTopic] : { sections: [] }}
      />

      {/* Device Orientation Notice - Visible on mobile/tablet and portrait orientations */}
      {showDeviceNotice && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-28 left-6 right-6 z-[60] lg:landscape:hidden"
        >
          <div className="glass-card p-4 flex items-center justify-between gap-4 border-l-4 border-l-eu-gold bg-eu-dark/95 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="text-eu-gold shrink-0">
                <Sparkles size={20} />
              </div>
              <p className="text-[11px] font-medium leading-tight text-white/90">
                <span className="text-eu-gold font-bold block mb-0.5">Optimierungshinweis</span>
                Am besten auf Desktop oder Tablet (Querformat) zu erleben.
              </p>
            </div>
            <button 
              onClick={() => setShowDeviceNotice(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40"
              aria-label="Hinweis schließen"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Decorative background elements from theme */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {!isLowDevice && (
          <>
            <motion.div 
              style={{ willChange: "transform, opacity" }}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
                opacity: [0.3, 0.35, 0.3]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" 
            />
            <motion.div 
              style={{ willChange: "transform, opacity" }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -2, 0],
                opacity: [0.2, 0.25, 0.2]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" 
            />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#003399_0%,#000F26_70%)] opacity-40" />
      </div>

      {/* Navigation Layer */}
      <nav className="fixed top-0 left-0 w-full h-16 z-50 px-6 md:px-10 flex justify-between items-center bg-eu-panel backdrop-blur-md border-b border-white/10">
        <a href="#" className="flex items-center gap-4 group">
          <div className="flex items-center gap-2">
            <motion.img 
              src="https://flagcdn.com/w40/eu.png" 
              alt="EU Flag" 
              className="w-6 h-auto rounded-sm shadow-sm group-hover:scale-110 transition-transform"
              animate={{
                skewY: [0, 2, 0, -2, 0],
                rotateZ: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="w-8 h-8 relative flex items-center justify-center">
              <div className="absolute inset-0 border border-eu-gold rounded-full animate-pulse group-hover:border-white transition-colors" />
              <span className="text-eu-gold text-xl font-bold group-hover:text-white transition-colors">★</span>
            </div>
          </div>
          <span className="tracking-[0.2em] font-light text-xs uppercase text-white/80 hidden sm:block group-hover:text-eu-gold transition-colors">EU Knowledge Archive</span>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-semibold tracking-widest uppercase text-white/60">
          <a href="#history" className="hover:text-white transition-colors hover:border-b hover:border-eu-gold/50 pb-1">Geschichte</a>
          <a href="#diversity" className="hover:text-white transition-colors hover:border-b hover:border-eu-gold/50 pb-1">Staaten</a>
          <a href="#institutions" className="hover:text-white transition-colors hover:border-b hover:border-eu-gold/50 pb-1">Institutionen</a>
          <a href="#economy" className="hover:text-white transition-colors hover:border-b hover:border-eu-gold/50 pb-1">Wirtschaft</a>
          <a href="#future" className="hover:text-white transition-colors hover:border-b hover:border-eu-gold/50 pb-1">Zukunft</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-eu-gold p-2 transition-colors relative z-50"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed inset-0 bg-eu-dark/98 backdrop-blur-3xl z-40 flex flex-col items-center justify-center p-6 md:hidden"
            >
              {/* Background Stars for menu */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-eu-gold rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-eu-blue rounded-full blur-[100px]" />
              </div>

              <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-xs">
                {[
                  { label: 'Geschichte', href: '#history' },
                  { label: 'Staaten', href: '#diversity' },
                  { label: 'Institutionen', href: '#institutions' },
                  { label: 'Wirtschaft', href: '#economy' },
                  { label: 'Zukunft', href: '#future' }
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-between w-full py-4 border-b border-white/5"
                  >
                    <span className="text-sm font-mono text-eu-gold/50">0{i+1}</span>
                    <span className="text-2xl font-display font-black text-white group-hover:text-eu-gold transition-colors tracking-tight uppercase italic">{item.label}</span>
                    <ChevronRight className="text-eu-gold/20 group-hover:text-eu-gold transition-colors" size={20} />
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-16 flex flex-col items-center gap-4 relative z-10">
                <div className="flex gap-4">
                  <div className="w-8 h-px bg-eu-gold/20 self-center" />
                  <span className="text-eu-gold text-xl drop-shadow-[0_0_10px_rgba(255,204,0,0.5)]">★</span>
                  <div className="w-8 h-px bg-eu-gold/20 self-center" />
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Knowledge Archive</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <HeroScene />
        
        {/* Left Focus Card - Hidden on mobile/tablet */}
        <div className="absolute top-32 left-10 w-80 z-20 hidden xl:block space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-eu-gold uppercase text-[10px] tracking-widest mb-2 font-bold">Fokus: Archiv</h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Entdecke die spannende Entwicklung vom ersten Friedensplan bis heute.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 h-1 bg-eu-gold" />
              <div className="flex-1 h-1 bg-white/10" />
              <div className="flex-1 h-1 bg-white/10" />
            </div>
          </motion.div>
        </div>

        {/* Right Info Card - Hidden on mobile/tablet */}
        <div className="absolute top-32 right-10 w-80 z-20 hidden xl:block space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase tracking-widest text-eu-gold">EU Statistik</span>
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
        
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-5xl sm:text-7xl lg:text-9xl font-display font-black text-white mb-6 leading-[0.9] lg:leading-[0.85] tracking-tighter uppercase cursor-default group"
              style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
            >
              <span className="relative z-10 block drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                Die <span className="text-eu-gold transition-all duration-500 hover:text-white hover:tracking-normal inline-block">Europäische</span> Union
              </span>
              
              {/* Massive 3D Shadow Layers */}
              <span className="absolute inset-0 translate-y-[4px] translate-x-[4px] text-eu-blue/40 -z-10 select-none blur-[1px]">
                Die Europäische Union
              </span>
              <span className="absolute inset-0 translate-y-[8px] translate-x-[8px] text-eu-gold/20 -z-20 select-none blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                Die Europäische Union
              </span>
              <span className="absolute inset-0 translate-y-[12px] translate-x-[12px] text-black/40 -z-30 select-none blur-[6px]">
                Die Europäische Union
              </span>
            </motion.h1>
            <p className="text-white/40 uppercase tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm font-medium mb-8 md:mb-12">
              Politik • Wirtschaft • Zukunft Europas
            </p>
            
            <div className="flex justify-center">
              <motion.a
                href="#history"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playClick()}
                className="px-8 py-4 md:px-10 md:py-5 bg-eu-gold text-black font-bold rounded-2xl flex items-center gap-3 transition-shadow shadow-[0_0_30px_rgba(255,204,0,0.2)] hover:shadow-[0_0_40px_rgba(255,204,0,0.4)] text-sm md:text-base"
              >
                Archiv öffnen <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hidden sm:flex"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300">Entdecken</span>
          <div className="w-px h-8 md:h-12 bg-gradient-to-b from-eu-gold font-bold to-transparent" />
        </motion.div>
      </header>

      {/* Intro Text */}
      <div className="max-w-4xl mx-auto py-12 md:py-24 px-6 text-center">
        <p className="text-lg sm:text-2xl md:text-3xl font-medium text-slate-300 leading-relaxed italic">
          "Die Europäische Union ist eines der größten Projekte unserer Zeit. Sie verbindet 27 Länder mit ganz unterschiedlichen Kulturen, Sprachen und Werten zu einer starken Gemeinschaft."
        </p>
      </div>

      {/* TOPIC 1: History */}
      <Section 
        id="history" 
        title="1. Geschichte & Entstehung" 
        subtitle="Vom zerstörten Kontinent zum Friedensprojekt. Ein Rückblick auf die Entwicklung der europäischen Integration."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <TiltCard>
            <div className="glass-card p-6 border-l-4 border-l-eu-gold h-full">
              <History className="text-eu-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Europa nach 1945</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Nach dem Zweiten Weltkrieg lag Europa am Boden. Die Idee: Dauerhafter Frieden durch enge Zusammenarbeit. Besonders Deutschland und Frankreich sollten keine Feinde mehr sein.
              </p>
            </div>
          </TiltCard>
          
          <TiltCard>
            <div className="glass-card p-6 border-l-4 border-l-eu-blue h-full">
              <Map className="text-eu-blue mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Erste Schritte (1951-1957)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                1951 startete die Gemeinschaft für Kohle und Stahl. Wer diese wichtigen Rohstoffe gemeinsam verwaltet, kann keinen heimlichen Krieg mehr vorbereiten.
              </p>
            </div>
          </TiltCard>
          
          <TiltCard className="sm:col-span-2 lg:col-span-1">
            <div className="glass-card p-6 border-l-4 border-l-white/20 h-full">
              <ShieldCheck className="text-white/60 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Die EU entsteht</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                1993 wurde die Europäische Union (EU) offiziell gegründet. Jetzt arbeiteten die Länder nicht mehr nur in der Wirtschaft, sondern auch in der Politik eng zusammen.
              </p>
            </div>
          </TiltCard>
        </div>

        <div className="mt-20 border-t border-white/5 pt-16">
          <h3 className="text-3xl font-display font-bold text-white mb-4 text-center">Meilensteine der EU</h3>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Ein Zeitstrahl der wichtigsten Ereignisse in der Geschichte der europäischen Einigung.</p>
          <EUTimeline />
        </div>

        <div className="flex justify-center mt-12 pb-8 border-b border-white/5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveDetailedTopic(0)}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-eu-gold/50 rounded-2xl text-eu-gold font-bold uppercase tracking-widest hover:bg-eu-gold/10 transition-all shadow-[0_0_15px_rgba(255,204,0,0.1)]"
          >
            <BookOpen size={20} /> Detail-Archiv öffnen (Gruppe 1)
          </motion.button>
        </div>

        <QuizPrompt groupId={1} topicTitle="Entstehung und Entwicklung" />
      </Section>

      {/* TOPIC 2: Diversity */}
      <Section 
        id="diversity" 
        color="dark"
        title="2. Staaten & Vielfalt" 
        subtitle="In Vielfalt geeint – von nordeuropäischen Wohlfahrtsstaaten bis zu den Transformationsstaaten des Ostens."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="md:col-span-2 glass-card p-6 md:p-10 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Sozioökonomische Modelle</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-eu-blue/40 flex items-center justify-center text-eu-blue font-bold">N</div>
                <div>
                  <p className="font-bold text-white">Norden</p>
                  <p className="text-xs text-slate-400">Ausgeprägte Wohlfahrtsstaaten, hohe soziale Sicherheit und starke Bildungssysteme.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-eu-gold/40 flex items-center justify-center text-eu-gold font-bold">S</div>
                <div>
                  <p className="font-bold text-white">Süden</p>
                  <p className="text-xs text-slate-400">Tourismus-stark, oft kleinmittelständische Strukturen und Herausforderungen bei der Staatsverschuldung.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">O</div>
                <div>
                  <p className="font-bold text-white">Osten</p>
                  <p className="text-xs text-slate-400">Transformationserfahrung, schnelles Wirtschaftswachstum und postsozialistisches Erbe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-eu-blue/20 to-transparent">
            <Languages className="text-eu-blue mb-4" size={32} />
            <h3 className="text-xl font-bold mb-4">Kulturelle Identität</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Über 24 Amtssprachen und Hunderte Regionaldialekte. Die EU schützt diese Vielfalt unter dem Motto "United in Diversity".
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

        <div className="mt-16">
          <h3 className="text-3xl font-display font-bold text-white mb-4 text-center">Interaktive Datenanalyse</h3>
          <p className="text-slate-400 text-center mb-6 max-w-2xl mx-auto">
            Von der Wirtschaftskraft bis zur Budgetplanung – verstehe die materiellen Grundlagen der Union.
          </p>
          <EUDataCharts />
        </div>

        <div className="mt-20 pt-16 border-t border-white/5">
          <h3 className="text-3xl font-display font-bold text-white mb-4 text-center">Historisches Dashboard</h3>
          <p className="text-slate-400 text-center mb-6 max-w-2xl mx-auto">
            Analysiere und vergleiche die Entwicklung wichtiger Indikatoren über die letzten zwei Jahrzehnte.
          </p>
          <EUDashboard />
        </div>

        <div className="mt-16 border-t border-white/5 pt-16">
           <h3 className="text-3xl font-display font-bold text-white mb-4 text-center">Interaktive EU-Karte</h3>
           <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Entdecke die Vielfalt der Mitgliedstaaten. Klicke auf ein Land, um Bevölkerung und Beitrittsjahr zu sehen.</p>
           <EUMap />
        </div>

        <div className="flex justify-center mt-12 pb-8 border-b border-white/5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveDetailedTopic(1)}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-eu-gold/50 rounded-2xl text-eu-gold font-bold uppercase tracking-widest hover:bg-eu-gold/10 transition-all shadow-[0_0_15px_rgba(255,204,0,0.1)]"
          >
            <BookOpen size={20} /> Detail-Archiv öffnen (Gruppe 2)
          </motion.button>
        </div>

        <QuizPrompt groupId={2} topicTitle="Mitgliedsstaaten und Vielfalt" />
      </Section>

      {/* TOPIC 3: Institutions */}
      <Section id="institutions" title="3. Institutionen & Politik">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <TiltCard className="group">
              <div className="glass-card p-6 md:p-8 h-full border-t-4 border-t-blue-500">
                <Building2 className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl md:text-2xl font-bold mb-4">EU-Kommission</h3>
                <p className="text-slate-400 mb-6 font-medium italic">"Die Exekutive"</p>
                <ul className="text-xs md:text-sm text-slate-300 space-y-3">
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Initiativmonopol für Gesetze</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Wächterin der Verträge</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Verwaltung des Haushalts</li>
                </ul>
              </div>
            </TiltCard>
 
            <TiltCard className="group">
              <div className="glass-card p-6 md:p-8 h-full border-t-4 border-t-eu-gold">
                <Users className="text-eu-gold mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl md:text-2xl font-bold mb-4">Parlament</h3>
                <p className="text-slate-400 mb-6 font-medium italic">"Die Volksvertreter"</p>
                <ul className="text-xs md:text-sm text-slate-300 space-y-3">
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Direkt gewählt durch EU-Bürger</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Gesetzgebung (Legislative)</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Kontrolle der Exekutive</li>
                </ul>
              </div>
            </TiltCard>
 
            <TiltCard className="group sm:col-span-2 lg:col-span-1">
              <div className="glass-card p-6 md:p-8 h-full border-t-4 border-t-slate-400">
                <Building2 className="text-slate-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl md:text-2xl font-bold mb-4">Rat der EU</h3>
                <p className="text-slate-400 mb-6 font-medium italic">"Die Minister"</p>
                <ul className="text-xs md:text-sm text-slate-300 space-y-3">
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Fachminister der 27 Staaten</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Vertretung nationaler Belange</li>
                  <li className="flex items-center gap-2"><ArrowRight size={12} className="text-eu-gold" /> Politische Koordination</li>
                </ul>
              </div>
            </TiltCard>
         </div>

         <div className="mt-16 p-8 glass-card border-eu-gold/20 overflow-hidden relative">
            <h4 className="text-center text-xl font-black mb-12 uppercase tracking-[0.2em] text-eu-gold italic">Interaktive Gesetzgebung</h4>
            <LegislativePlan />
            <div className="mt-8 text-center text-xs text-slate-500 italic">
               *Klicke auf die Symbole, um die Phasen der Gesetzgebung zu erforschen.*
            </div>
         </div>

         <div className="mt-16">
            <CouncilSimulator />
         </div>

         {/* Reality Check - The "Backstage" Editorial Section */}
         <div className="mt-24 relative px-4 md:px-0">
            <div className="max-w-4xl mx-auto">
               <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">
                  
                  {/* Left: Big Label & Title */}
                  <div className="md:w-1/3 sticky top-24">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-eu-gold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-eu-gold">Realitätsebene</span>
                     </div>
                     <h4 className="text-5xl md:text-7xl font-serif font-black italic leading-[0.8] tracking-tighter text-white mb-8">
                        The <span className="text-eu-gold">Backstage</span> of Power
                     </h4>
                     <p className="text-slate-400 text-base font-medium leading-relaxed border-l-2 border-white/5 pl-6">
                        Abseits der Kameras ist EU-Politik kein linearer Prozess, sondern ein hochkomplexes Zusammenspiel aus Macht, Verhandlung und taktischen Zielen.
                     </p>
                  </div>

                  {/* Right: The Insight Bricks */}
                  <div className="md:w-2/3 space-y-4">
                     {[
                        { 
                           num: "01",
                           label: "Der Zwang zum Kompromiss", 
                           desc: "Ohne Einigung steht alles still. Am Ende steht oft eine Lösung, die niemanden vollkommen glücklich macht, aber einen Bruch verhindert.",
                           icon: <Scale size={18} />
                        },
                        { 
                           num: "02",
                           label: "Nationale Interessen", 
                           desc: "Innenpolitik dominiert oft die Europapolitik. Minister schauen bei jeder Entscheidung zuerst darauf, wie sie zu Hause ankommt.",
                           icon: <Globe size={18} />
                        },
                        { 
                           num: "03",
                           label: "Die Macht der Flure", 
                           desc: "Entscheidungen fallen oft beim Kaffee oder in informellen 'Trilogen' vor der offiziellen Abstimmung.",
                           icon: <MessagesSquare size={18} />
                        },
                        { 
                           num: "04",
                           label: "Lobby-Landschaft", 
                           desc: "Mit über 12.000 registrierten Organisationen ist Brüssel einer der am stärksten beeinflussten Orte der Welt.",
                           icon: <TrendingUp size={18} />
                        }
                     ].map((item, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-eu-gold/30 hover:bg-white/[0.07] transition-all flex items-start gap-8 overflow-hidden"
                        >
                           <span className="text-3xl font-display font-black italic text-white/5 group-hover:text-eu-gold/20 transition-colors">
                              {item.num}
                           </span>
                           <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-2">
                                 <div className="text-eu-gold/60">{item.icon}</div>
                                 <h5 className="text-white font-bold uppercase tracking-widest text-xs">{item.label}</h5>
                              </div>
                              <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                                 {item.desc}
                              </p>
                           </div>
                           
                           {/* Decorative Accent */}
                           <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-1 h-1 rounded-full bg-eu-gold" />
                           </div>
                        </motion.div>
                     ))}
                  </div>

               </div>
            </div>
         </div>


         <div className="flex justify-center mt-12 pb-8 border-b border-white/5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveDetailedTopic(2)}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-eu-gold/50 rounded-2xl text-eu-gold font-bold uppercase tracking-widest hover:bg-eu-gold/10 transition-all shadow-[0_0_15px_rgba(255,204,0,0.1)]"
          >
            <BookOpen size={20} /> Detail-Archiv öffnen (Gruppe 3)
          </motion.button>
        </div>

        <QuizPrompt groupId={3} topicTitle="EU Institutionen und Prozesse" />
      </Section>

      {/* TOPIC 4: Economy */}
      <Section id="economy" title="4. Wirtschaft & Binnenmarkt">
         <div className="space-y-12 w-full">
            <MarketBento />
         
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Wohlstand durch Einheit</h3>
                  <p className="text-slate-400 leading-relaxed">
                     Über 448 Millionen Verbraucher machen den EU-Binnenmarkt zum mächtigsten Handelsblock der Welt. 
                     Die gemeinsame Währung Euro beseitigt Wechselkursrisiken und macht Preise über Grenzen hinweg vergleichbar.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <div className="p-4 bg-eu-gold/10 rounded-2xl border border-eu-gold/20">
                        <p className="text-2xl font-black text-eu-gold">17 Bio. €</p>
                        <p className="text-[10px] uppercase font-bold text-white/40">BIP der EU</p>
                     </div>
                     <div className="p-4 bg-eu-blue/10 rounded-2xl border border-eu-blue/20">
                        <p className="text-2xl font-black text-eu-blue">20</p>
                        <p className="text-[10px] uppercase font-bold text-white/40">Euroländer</p>
                     </div>
                  </div>
               </div>
 
               <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px]">
                  <h4 className="text-[10px] md:text-xs font-bold text-slate-500 uppercase mb-8">EU Wirtschaftsstruktur (Schätzung)</h4>
                  <div className="w-full h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                        data={bipStructureData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        >
                        {bipStructureData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 0 ? '#003399' : index === 1 ? '#FFCC00' : '#475569'} />
                        ))}
                        </Pie>
                        <Tooltip 
                           content={({ active, payload }: any) => {
                             if (active && payload && payload.length) {
                               return (
                                 <div className="bg-eu-dark/95 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-2xl">
                                   <p className="text-[10px] text-white/40 uppercase font-black mb-1">{payload[0].name}</p>
                                   <p className="text-xl font-display font-black text-eu-gold italic">{payload[0].value}%</p>
                                 </div>
                               );
                             }
                             return null;
                           }} 
                        />
                     </PieChart>
                  </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-[10px] uppercase font-bold text-slate-500 mt-4">
                     <div className="flex items-center gap-1"><div className="w-2 h-2 bg-eu-blue rounded-full" /> Industrie</div>
                     <div className="flex items-center gap-1"><div className="w-2 h-2 bg-eu-gold rounded-full" /> Dienstleistung</div>
                     <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-600 rounded-full" /> Landwirtschaft</div>
                  </div>
               </div>
            </div>

            <EconomicPowerhouse />

            <GlobalTrade />

            <EuroZone />

            <div className="flex justify-center mt-12 pb-8 border-b border-white/5">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveDetailedTopic(3)}
                  className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-eu-gold/50 rounded-2xl text-eu-gold font-bold uppercase tracking-widest hover:bg-eu-gold/10 transition-all shadow-[0_0_15px_rgba(255,204,0,0.1)]"
               >
                  <BookOpen size={20} /> Detail-Archiv öffnen (Gruppe 4)
               </motion.button>
            </div>

            <QuizPrompt groupId={4} topicTitle="Wirtschaft und Euro" />
         </div>
      </Section>

      {/* TOPIC 5: Future */}
      <Section id="future" title="5. Herausforderungen & Zukunft">
        <div className="text-center max-w-3xl mx-auto mb-12">
           <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Europa 2050</h3>
           <p className="text-slate-400">Das Projekt Europa steht niemals still. Entdecke die strategischen Prioritäten der kommenden Jahrzehnte.</p>
        </div>

        <ChallengeRadar />
        
        <div className="mt-16">
          <DemocracyCompass />
        </div>
        
        <FutureExpansion />

        <FutureScenarios />

        <div className="mt-16">
          <SecurityNodeNetwork />
        </div>


        <div className="flex justify-center mt-12 pb-8 border-b border-white/5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveDetailedTopic(4)}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-eu-gold/50 rounded-2xl text-eu-gold font-bold uppercase tracking-widest hover:bg-eu-gold/10 transition-all shadow-[0_0_15px_rgba(255,204,0,0.1)]"
          >
            <BookOpen size={20} /> Detail-Archiv öffnen (Gruppe 5)
          </motion.button>
        </div>

        <QuizPrompt groupId={5} topicTitle="Zukunft der EU" />
      </Section>

      {/* Footer */}
      <footer className="py-12 md:py-20 border-t border-white/5 bg-eu-dark/30 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <img 
                src="https://flagcdn.com/w40/eu.png" 
                alt="EU Flag" 
                className="w-8 h-auto rounded-sm opacity-60 hover:opacity-100 transition-opacity"
              />
              <h4 className="text-xl font-display font-black text-white">
                EU KNOWLEDGE <span className="text-eu-gold">ARCHIVE</span>
              </h4>
            </div>
            <p className="text-sm text-slate-500 max-w-sm mx-auto md:mx-0">
              Ein interaktives Bildungsprojekt über die Europäische Union. Entwickelt für den EU-Tag 2026 am GymGa.
            </p>
          </div>
          <div className="flex gap-12 text-center md:text-left">
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-eu-gold uppercase tracking-widest">Rechtliches</h5>
              <button 
                onClick={() => setIsImpressumOpen(true)}
                className="block w-full text-left text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                Impressum
              </button>
              <button 
                onClick={() => setIsPrivacyOpen(true)}
                className="block w-full text-left text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                Datenschutz
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block w-full text-left text-xs text-eu-gold/60 hover:text-eu-gold cursor-pointer transition-colors mt-2"
              >
                Zurück zum Anfang
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-[12px] text-slate-600 font-mono">
          &copy; 2026 Cristian Liebrecht
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 md:p-4 bg-eu-dark/80 text-eu-gold border border-eu-gold/20 backdrop-blur-md rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform"
            aria-label="Zurück zum Anfang scrollen"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
