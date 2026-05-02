import React, { useRef, useMemo, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { feature } from 'topojson-client';

const euCountries = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Czech Republic', 'Denmark', 
  'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hellenic Republic', 'Hungary', 'Ireland', 
  'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 
  'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
];

export function HeroScene() {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<any>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(topology => {
        const geojson: any = feature(topology, topology.objects.countries as any);
        if (geojson && geojson.features) {
          setCountries(geojson.features);
        }
      })
      .catch(err => console.error("Globe data fetch error:", err));
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3; // Slower rotation for better focus
        controls.enablePan = false;
        controls.enableZoom = true;
      }
      // Point of view focused on Europe (lat: 50, lng: 10)
      globeRef.current.pointOfView({ lat: 48, lng: 15, altitude: 2.2 }, 0);
    }
  }, []);

  // SVG Stars overlay
  const StarCircleOverlay = () => {
    const radius = Math.min(windowSize.width, windowSize.height) * 0.41;
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative"
          style={{ width: radius * 2, height: radius * 2 }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ x, y }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Primary soft atmospheric glow */}
                  <div 
                    className="absolute w-32 h-32 rounded-full opacity-40 animate-pulse pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,204,0,0.4) 0%, rgba(255,204,0,0.1) 40%, transparent 70%)',
                      filter: 'blur(12px)'
                    }}
                  />
                  {/* Inner glow core */}
                  <div 
                    className="absolute w-16 h-16 rounded-full opacity-60 animate-soft-glow pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,204,0,0.6) 0%, transparent 70%)',
                      filter: 'blur(6px)'
                    }}
                  />
                  
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                    <path 
                      d="M12 2L14.81 8.62L22 9.24L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.24L9.19 8.62L12 2Z" 
                      fill="#FFCC00" 
                      className="filter drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 z-0 bg-[#000F26] overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <Globe
          ref={globeRef}
          width={windowSize.width}
          height={windowSize.height}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={new THREE.MeshStandardMaterial({
            color: '#001a4d',
            roughness: 0.3,
            metalness: 0.5
          })}
          atmosphereColor="#3388ff"
          atmosphereAltitude={0.15}
          
          polygonsData={countries}
          polygonCapColor={(d: any) => {
            const isEU = euCountries.includes(d.properties?.name);
            if (d === hoveredCountry) return '#ffffff';
            return isEU ? '#FFCC00' : 'rgba(33, 150, 243, 0.15)';
          }}
          polygonSideColor={(d: any) => {
            const isEU = euCountries.includes(d.properties?.name);
            return isEU ? 'rgba(255, 204, 0, 0.6)' : 'rgba(0, 85, 255, 0.05)';
          }}
          polygonStrokeColor={() => '#ffffff40'}
          polygonAltitude={0.012}
          onPolygonHover={setHoveredCountry}
        />

        {/* The Frontal Star Circle */}
        <StarCircleOverlay />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

      <AnimatePresence>
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="px-6 py-3 rounded-full bg-eu-dark/95 border border-eu-gold border-b-4 text-white font-black italic uppercase text-sm tracking-[0.2em] shadow-[0_0_30px_rgba(255,204,0,0.2)] backdrop-blur-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-eu-gold animate-pulse" />
              {hoveredCountry.properties?.name || "Region"}
              <div className="w-2 h-2 rounded-full bg-eu-gold animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2 }}
          className="text-[18vw] font-black italic text-white uppercase tracking-tighter leading-none select-none"
        >
          EUROPA
        </motion.div>
      </div>
    </div>
  );
}


