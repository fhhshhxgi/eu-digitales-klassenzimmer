import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, MapPin, Info } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
  name: string;
  id: string;
  population: string;
  joined: string;
  capital: string;
  flagCode: string;
}

const euCountries: Record<string, CountryData> = {
  "Germany": { name: "Deutschland", id: "DEU", population: "83,2 Mio.", joined: "1951", capital: "Berlin", flagCode: "de" },
  "France": { name: "Frankreich", id: "FRA", population: "67,8 Mio.", joined: "1951", capital: "Paris", flagCode: "fr" },
  "Italy": { name: "Italien", id: "ITA", population: "59,0 Mio.", joined: "1951", capital: "Rom", flagCode: "it" },
  "Spain": { name: "Spanien", id: "ESP", population: "47,4 Mio.", joined: "1986", capital: "Madrid", flagCode: "es" },
  "Poland": { name: "Polen", id: "POL", population: "37,7 Mio.", joined: "2004", capital: "Warschau", flagCode: "pl" },
  "Romania": { name: "Rumänien", id: "ROU", population: "19,1 Mio.", joined: "2007", capital: "Bukarest", flagCode: "ro" },
  "Netherlands": { name: "Niederlande", id: "NLD", population: "17,6 Mio.", joined: "1951", capital: "Amsterdam", flagCode: "nl" },
  "Belgium": { name: "Belgien", id: "BEL", population: "11,6 Mio.", joined: "1951", capital: "Brüssel", flagCode: "be" },
  "Czechia": { name: "Tschechien", id: "CZE", population: "10,5 Mio.", joined: "2004", capital: "Prag", flagCode: "cz" },
  "Greece": { name: "Griechenland", id: "GRC", population: "10,4 Mio.", joined: "1981", capital: "Athen", flagCode: "gr" },
  "Portugal": { name: "Portugal", id: "PRT", population: "10,3 Mio.", joined: "1986", capital: "Lissabon", flagCode: "pt" },
  "Sweden": { name: "Schweden", id: "SWE", population: "10,4 Mio.", joined: "1995", capital: "Stockholm", flagCode: "se" },
  "Hungary": { name: "Ungarn", id: "HUN", population: "9,7 Mio.", joined: "2004", capital: "Budapest", flagCode: "hu" },
  "Austria": { name: "Österreich", id: "AUT", population: "8,9 Mio.", joined: "1995", capital: "Wien", flagCode: "at" },
  "Bulgaria": { name: "Bulgarien", id: "BGR", population: "6,9 Mio.", joined: "2007", capital: "Sofia", flagCode: "bg" },
  "Denmark": { name: "Dänemark", id: "DNK", population: "5,8 Mio.", joined: "1973", capital: "Kopenhagen", flagCode: "dk" },
  "Finland": { name: "Finnland", id: "FIN", population: "5,5 Mio.", joined: "1995", capital: "Helsinki", flagCode: "fi" },
  "Slovakia": { name: "Slowakei", id: "SVK", population: "5,4 Mio.", joined: "2004", capital: "Bratislava", flagCode: "sk" },
  "Ireland": { name: "Irland", id: "IRL", population: "5,0 Mio.", joined: "1973", capital: "Dublin", flagCode: "ie" },
  "Croatia": { name: "Kroatien", id: "HRV", population: "4,0 Mio.", joined: "2013", capital: "Zagreb", flagCode: "hr" },
  "Lithuania": { name: "Litauen", id: "LTU", population: "2,8 Mio.", joined: "2004", capital: "Vilnius", flagCode: "lt" },
  "Slovenia": { name: "Slowenien", id: "SVN", population: "2,1 Mio.", joined: "2004", capital: "Ljubljana", flagCode: "si" },
  "Latvia": { name: "Lettland", id: "LVA", population: "1,9 Mio.", joined: "2004", capital: "Riga", flagCode: "lv" },
  "Estonia": { name: "Estland", id: "EST", population: "1,3 Mio.", joined: "2004", capital: "Tallinn", flagCode: "ee" },
  "Cyprus": { name: "Zypern", id: "CYP", population: "1,2 Mio.", joined: "2004", capital: "Nikosia", flagCode: "cy" },
  "Luxembourg": { name: "Luxemburg", id: "LUX", population: "0,6 Mio.", joined: "1951", capital: "Luxemburg", flagCode: "lu" },
  "Malta": { name: "Malta", id: "MLT", population: "0,5 Mio.", joined: "2004", capital: "Valletta", flagCode: "mt" }
};

export function EUMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect to simulate or verify loading if we were fetching manually, 
  // but for now we'll just set it to false after a small delay or once the component mounts
  // since the TopoJSON is external. A better way is to fetch the JSON ourselves.
  React.useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const handleCountryClick = (geo: any) => {
    const name = geo.properties.name;
    if (euCountries[name]) {
      setSelectedCountry(euCountries[name]);
    }
  };

  return (
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

        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 bg-eu-blue/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            <Info size={14} className="text-eu-gold" />
            <span className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Interaktive Karte</span>
          </div>
        </div>

        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-10.0, -54.0, 0],
            scale: 900
          }}
          className="w-full h-full"
        >
          <Geographies 
            geography={geoUrl}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name;
                const isEU = !!euCountries[name];
                const isSelected = selectedCountry?.name === euCountries[name]?.name;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => isEU && setHoveredCountry(name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: {
                        fill: isEU ? (isSelected ? "#FFCC00" : "#2D4B7C") : "#1e293b",
                        stroke: "#0f172a",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 0.3s"
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
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {selectedCountry ? (
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

              <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  Wählen Sie ein Land auf der Karte aus, um detaillierte Informationen anzuzeigen.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-eu-blue/20 flex items-center justify-center text-eu-gold mb-6 border border-white/10 animate-pulse">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Entdecken Sie Europa</h3>
              <p className="text-sm text-slate-400">Klicken Sie auf ein blau markiertes Land in der Karte, um mehr über die Bevölkerung und das Beitrittsjahr zu erfahren.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
