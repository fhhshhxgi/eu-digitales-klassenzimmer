import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, MapPin, Info, Play, Pause, ChevronLeft, ChevronRight, History } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
  name: string;
  id: string;
  population: string;
  joined: string;
  capital: string;
  coordinates: [number, number];
  flagCode: string;
}

const euExpansionSteps = [
  { year: 1951, title: "Gründung der EGKS", description: "Die 'Gründungsväter' (Deutschland, Frankreich, Italien, Benelux) legen den Grundstein für die heutige EU." },
  { year: 1973, title: "Norderweiterung", description: "Dänemark, Irland und das Vereinigte Königreich treten bei." },
  { year: 1981, title: "Süderweiterung (Teil 1)", description: "Griechenland tritt als zehntes Mitglied bei." },
  { year: 1986, title: "Süderweiterung (Teil 2)", description: "Spanien und Portugal vervollständigen die Gemeinschaft auf 12 Mitglieder." },
  { year: 1995, title: "EFTA-Erweiterung", description: "Österreich, Finnland und Schweden treten der Union bei." },
  { year: 2004, title: "Die große 'Osterweiterung'", description: "10 neue Länder, vor allem aus Mittel- und Osteuropa, treten gleichzeitig bei. Ein historischer Moment der Wiedervereinigung." },
  { year: 2007, title: "Bulgarien & Rumänien", description: "Zwei weitere Balkanstaaten werden Teil der EU-Familie." },
  { year: 2013, title: "Kroatien", description: "Kroatien tritt als (bisher) letztes Mitglied bei." },
  { year: 2026, title: "Die EU heute", description: "Zustand der Union nach dem Brexit." }
];

const euCountries: Record<string, CountryData> = {
  "Germany": { name: "Deutschland", id: "DEU", population: "83,2 Mio.", joined: "1951", capital: "Berlin", coordinates: [13.4050, 52.5200], flagCode: "de" },
  "France": { name: "Frankreich", id: "FRA", population: "67,8 Mio.", joined: "1951", capital: "Paris", coordinates: [2.3522, 48.8566], flagCode: "fr" },
  "Italy": { name: "Italien", id: "ITA", population: "59,0 Mio.", joined: "1951", capital: "Rom", coordinates: [12.4964, 41.9028], flagCode: "it" },
  "Spain": { name: "Spanien", id: "ESP", population: "47,4 Mio.", joined: "1986", capital: "Madrid", coordinates: [-3.7038, 40.4168], flagCode: "es" },
  "Poland": { name: "Polen", id: "POL", population: "37,7 Mio.", joined: "2004", capital: "Warschau", coordinates: [21.0122, 52.2297], flagCode: "pl" },
  "Romania": { name: "Rumänien", id: "ROU", population: "19,1 Mio.", joined: "2007", capital: "Bukarest", coordinates: [26.1025, 44.4268], flagCode: "ro" },
  "Netherlands": { name: "Niederlande", id: "NLD", population: "17,6 Mio.", joined: "1951", capital: "Amsterdam", coordinates: [4.8952, 52.3702], flagCode: "nl" },
  "Belgium": { name: "Belgien", id: "BEL", population: "11,6 Mio.", joined: "1951", capital: "Brüssel", coordinates: [4.3517, 50.8503], flagCode: "be" },
  "Czechia": { name: "Tschechien", id: "CZE", population: "10,5 Mio.", joined: "2004", capital: "Prag", coordinates: [14.4378, 50.0755], flagCode: "cz" },
  "Greece": { name: "Griechenland", id: "GRC", population: "10,4 Mio.", joined: "1981", capital: "Athen", coordinates: [23.7275, 37.9838], flagCode: "gr" },
  "Portugal": { name: "Portugal", id: "PRT", population: "10,3 Mio.", joined: "1986", capital: "Lissabon", coordinates: [-9.1393, 38.7223], flagCode: "pt" },
  "Sweden": { name: "Schweden", id: "SWE", population: "10,4 Mio.", joined: "1995", capital: "Stockholm", coordinates: [18.0686, 59.3293], flagCode: "se" },
  "Hungary": { name: "Ungarn", id: "HUN", population: "9,7 Mio.", joined: "2004", capital: "Budapest", coordinates: [19.0402, 47.4979], flagCode: "hu" },
  "Austria": { name: "Österreich", id: "AUT", population: "8,9 Mio.", joined: "1995", capital: "Wien", coordinates: [16.3738, 48.2082], flagCode: "at" },
  "Bulgaria": { name: "Bulgarien", id: "BGR", population: "6,9 Mio.", joined: "2007", capital: "Sofia", coordinates: [23.3219, 42.6977], flagCode: "bg" },
  "Denmark": { name: "Dänemark", id: "DNK", population: "5,8 Mio.", joined: "1973", capital: "Kopenhagen", coordinates: [12.5683, 55.6761], flagCode: "dk" },
  "Finland": { name: "Finnland", id: "FIN", population: "5,5 Mio.", joined: "1995", capital: "Helsinki", coordinates: [24.9414, 60.1699], flagCode: "fi" },
  "Slovakia": { name: "Slowakei", id: "SVK", population: "5,4 Mio.", joined: "2004", capital: "Bratislava", coordinates: [17.1077, 48.1486], flagCode: "sk" },
  "Ireland": { name: "Irland", id: "IRL", population: "5,0 Mio.", joined: "1973", capital: "Dublin", coordinates: [-6.2603, 53.3498], flagCode: "ie" },
  "Croatia": { name: "Kroatien", id: "HRV", population: "4,0 Mio.", joined: "2013", capital: "Zagreb", coordinates: [15.9819, 45.8150], flagCode: "hr" },
  "Lithuania": { name: "Litauen", id: "LTU", population: "2,8 Mio.", joined: "2004", capital: "Vilnius", coordinates: [25.2797, 54.6872], flagCode: "lt" },
  "Slovenia": { name: "Slowenien", id: "SVN", population: "2,1 Mio.", joined: "2004", capital: "Ljubljana", coordinates: [14.5058, 46.0569], flagCode: "si" },
  "Latvia": { name: "Lettland", id: "LVA", population: "1,9 Mio.", joined: "2004", capital: "Riga", coordinates: [24.1052, 56.9496], flagCode: "lv" },
  "Estonia": { name: "Estland", id: "EST", population: "1,3 Mio.", joined: "2004", capital: "Tallinn", coordinates: [24.7535, 59.4370], flagCode: "ee" },
  "Cyprus": { name: "Zypern", id: "CYP", population: "1,2 Mio.", joined: "2004", capital: "Nikosia", coordinates: [33.3736, 35.1856], flagCode: "cy" },
  "Luxembourg": { name: "Luxemburg", id: "LUX", population: "0,6 Mio.", joined: "1951", capital: "Luxemburg", coordinates: [6.1296, 49.6117], flagCode: "lu" },
  "Malta": { name: "Malta", id: "MLT", population: "0,5 Mio.", joined: "2004", capital: "Valletta", coordinates: [14.5146, 35.8989], flagCode: "mt" }
};

export function EUMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(euExpansionSteps.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentYear = euExpansionSteps[currentStepIndex].year;

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= euExpansionSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCountryClick = (geo: any) => {
    const name = geo.properties.name;
    const country = euCountries[name];
    if (country && parseInt(country.joined) <= currentYear) {
      setSelectedCountry(country);
    }
  };

  const nextStep = () => setCurrentStepIndex(prev => Math.min(euExpansionSteps.length - 1, prev + 1));
  const prevStep = () => setCurrentStepIndex(prev => Math.max(0, prev - 1));
  const togglePlay = () => {
    if (!isPlaying && currentStepIndex >= euExpansionSteps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Time Control Bar */}
      <div className="glass-card p-6 bg-slate-900/60 flex flex-col md:flex-row items-center gap-6 border-b-2 border-b-eu-blue">
        <div className="flex items-center gap-4">
          <button 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-eu-gold text-eu-dark flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          
          <div className="flex items-center gap-2">
            <button onClick={prevStep} className="p-2 text-white/60 hover:text-white"><ChevronLeft /></button>
            <div className="text-center min-w-[80px]">
              <span className="text-3xl font-display font-black text-white italic">{currentYear}</span>
            </div>
            <button onClick={nextStep} className="p-2 text-white/60 hover:text-white"><ChevronRight /></button>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="flex justify-between text-[10px] uppercase tracking-tighter text-white/40 font-bold px-1">
            {euExpansionSteps.map((step, idx) => (
              <span 
                key={step.year} 
                className={`transition-colors cursor-pointer ${idx <= currentStepIndex ? 'text-eu-gold' : 'text-white/20'}`}
                onClick={() => { setCurrentStepIndex(idx); setIsPlaying(false); }}
              >
                {step.year}
              </span>
            ))}
          </div>
          <input 
            type="range"
            min="0"
            max={euExpansionSteps.length - 1}
            value={currentStepIndex}
            step="1"
            onChange={(e) => { setCurrentStepIndex(parseInt(e.target.value)); setIsPlaying(false); }}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-eu-gold"
          />
        </div>

        <div className="hidden lg:block w-64 text-right">
          <span className="text-[10px] text-eu-gold uppercase tracking-[0.2em] font-black block mb-1">Status</span>
          <h4 className="text-sm font-bold text-white truncate">{euExpansionSteps[currentStepIndex].title}</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 glass-card p-4 overflow-hidden relative group min-h-[500px] flex items-center justify-center bg-slate-900/50">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-eu-dark/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-eu-gold/30 border-t-eu-gold rounded-full animate-spin" />
                <p className="text-white/60 text-sm font-medium">Karte wird geladen...</p>
              </div>
            </div>
          )}

          {/* Floating Year Detail */}
          <div className="absolute top-4 left-4 z-10 space-y-2">
            <div className="flex items-center gap-2 bg-eu-blue/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <History size={14} className="text-eu-gold" />
              <span className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Die Zeitreise</span>
            </div>
            <motion.div 
              key={currentYear}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 max-w-[280px] bg-eu-dark/80 backdrop-blur-md border border-eu-gold/20"
            >
              <h4 className="text-eu-gold font-black text-sm mb-1 uppercase italic">{euExpansionSteps[currentStepIndex].title}</h4>
              <p className="text-[11px] text-white/70 leading-normal">{euExpansionSteps[currentStepIndex].description}</p>
            </motion.div>
          </div>

        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-10.0, -54.0, 0],
            scale: 900
          }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name;
                const country = euCountries[name];
                const isEU = !!country && parseInt(country.joined) <= currentYear;
                const joinedNow = !!country && parseInt(country.joined) === currentYear;
                const isSelected = selectedCountry?.name === country?.name;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => isEU && setHoveredCountry(name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: {
                        fill: isEU ? (isSelected || joinedNow ? "#FFCC00" : "#2D4B7C") : "#1e293b",
                        stroke: "#0f172a",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "fill 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                      },
                      hover: {
                        fill: isEU ? "#FFCC00" : "#1e293b",
                        stroke: "#0f172a",
                        strokeWidth: 0.8,
                        outline: "none",
                        cursor: isEU ? "pointer" : "default"
                      },
                      pressed: {
                        fill: isEU ? "#E6B800" : "#1e293b",
                        outline: "none"
                      }
                    }}
                    className={joinedNow && !isSelected ? "animate-pulse" : ""}
                  />
                );
              })
            }
          </Geographies>

          {selectedCountry && (
            <Marker coordinates={selectedCountry.coordinates}>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={selectedCountry.id}
              >
                {/* Outer pulsing ring */}
                <motion.circle
                  r={8}
                  fill="#FFCC00"
                  opacity={0.3}
                  animate={{
                    r: [8, 12, 8],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Inner dot */}
                <circle r={3} fill="#FFCC00" stroke="#0f172a" strokeWidth={1} />
                {/* Capital label */}
                <motion.text
                  y={-15}
                  textAnchor="middle"
                  className="text-[12px] font-black fill-white pointer-events-none"
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: -15, opacity: 1 }}
                  style={{ 
                    paintOrder: "stroke",
                    stroke: "#0f172a",
                    strokeWidth: "3px",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fontWeight: 900
                  }}
                >
                  {selectedCountry.capital}
                </motion.text>
              </motion.g>
            </Marker>
          )}
        </ComposableMap>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {selectedCountry && parseInt(selectedCountry.joined) <= currentYear ? (
            <motion.div
              key={selectedCountry.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 border-l-4 border-l-eu-gold relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-eu-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <h3 className="text-3xl font-display font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                <img 
                  src={`https://flagcdn.com/w80/${selectedCountry.flagCode.toLowerCase()}.png`}
                  alt={`${selectedCountry.name} Flag`}
                  className="w-10 h-auto rounded shadow-sm"
                />
                {selectedCountry.name}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-eu-blue/30 flex items-center justify-center text-eu-gold border border-white/5 group-hover:bg-eu-blue/50 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Hauptstadt</p>
                    <p className="text-lg font-bold text-white/90">{selectedCountry.capital}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-eu-blue/30 flex items-center justify-center text-eu-gold border border-white/5 group-hover:bg-eu-blue/50 transition-colors">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Bevölkerung</p>
                    <p className="text-lg font-bold text-white/90">{selectedCountry.population}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-eu-blue/30 flex items-center justify-center text-eu-gold border border-white/5 group-hover:bg-eu-blue/50 transition-colors">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">EU-Beitritt</p>
                    <p className="text-lg font-bold text-white/90">{selectedCountry.joined}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-20 h-20 rounded-full bg-eu-blue/20 flex items-center justify-center text-eu-gold mb-6 border border-white/10">
                <History size={40} className={isPlaying ? "animate-spin-slow" : ""} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 italic">Zeitreise-Modus</h3>
              <p className="text-sm text-slate-400 mb-6">Nutze den Slider oben oder drücke Play, um die Geschichte der EU-Erweiterung zu sehen.</p>
              
              {/* List of countries joined in current year */}
              <div className="w-full text-left bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-[10px] text-eu-gold uppercase tracking-widest font-black block mb-2">Beitritte in {currentYear}:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.values(euCountries).filter(c => parseInt(c.joined) === currentYear).map(c => (
                    <div key={c.id} className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/5">
                       <img 
                        src={`https://flagcdn.com/w20/${c.flagCode.toLowerCase()}.png`}
                        alt={`${c.name} Flag`}
                        className="w-3 rounded-sm"
                      />
                      <span className="text-[10px] text-white/80">{c.name}</span>
                    </div>
                  ))}
                  {Object.values(euCountries).filter(c => parseInt(c.joined) === currentYear).length === 0 && (
                    <span className="text-[10px] text-white/30 italic">Keine neuen Beitritte</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </div>
  );
}
