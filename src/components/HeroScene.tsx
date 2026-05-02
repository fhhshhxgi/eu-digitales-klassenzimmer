import React, { useRef, useMemo, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { feature } from 'topojson-client';

const euCountries = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Czech Republic', 'Denmark', 
  'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hellenic Republic', 'Hungary', 'Ireland', 
  'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 
  'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
];

// SVG Stars overlay component extracted to prevent re-renders on hover
const StarCircleOverlay = React.memo(({ windowSize }: { windowSize: { width: number, height: number } }) => {
  const isMobile = windowSize.width < 768;
  const radiusMultiplier = isMobile ? 0.35 : 0.41;
  const radius = Math.min(windowSize.width, windowSize.height) * radiusMultiplier;
  const iconSize = isMobile ? 24 : 36;
  const glowSizeMultiplier = isMobile ? 0.6 : 1;
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
                  className="absolute w-24 md:w-32 h-24 md:h-32 rounded-full opacity-40 animate-pulse pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,204,0,0.4) 0%, rgba(255,204,0,0.1) 40%, transparent 70%)',
                    filter: 'blur(12px)'
                  }}
                />
                {/* Inner glow core */}
                <div 
                  className="absolute w-12 md:w-16 h-12 md:h-16 rounded-full opacity-60 animate-soft-glow pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,204,0,0.6) 0%, transparent 70%)',
                    filter: 'blur(6px)'
                  }}
                />
                
                <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
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
});

export function HeroScene() {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<any>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(2.2);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
        controls.enableZoom = false; // Disable zooming per user request
        controls.enableRotate = false; // Disable manual rotation per user request

        // Listen to zoom changes - although zoom is disabled now, keeping state logic safe
        controls.addEventListener('change', () => {
          if (globeRef.current) {
            const altitude = globeRef.current.pointOfView().altitude;
            setZoomLevel(altitude);
          }
        });
      }
      // Point of view focused on Europe (lat: 50, lng: 10)
      const isMobile = window.innerWidth < 768;
      globeRef.current.pointOfView({ lat: 48, lng: 15, altitude: isMobile ? 3.2 : 2.2 }, 0);
    }
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isReduced = isMobile || isTablet;

  // Scroll-based scaling logic
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.5]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  // Intensity of glow increases as we zoom in (altitude decreases)
  const glowIntensity = Math.max(0.1, (2.6 - zoomLevel) / 1.5);
  const starOpacity = Math.min(0.9, 0.4 + glowIntensity * 0.5);

  return (
    <motion.div 
      style={{ 
        scale: heroScale, 
        opacity: heroOpacity,
        willChange: "transform, opacity"
      }}
      className="absolute inset-0 z-0 bg-[#000103] overflow-hidden flex items-center justify-center"
    >
      {/* Dynamic Galaxy Background with Mouse Parallax and Celestial Rotation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Celestial Starfield Layer (Slow rotation) - Only on Desktop for performance */}
        {!isReduced && (
          <motion.div 
            className="absolute inset-[-50%] animate-celestial opacity-30"
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(1px 1px at 15% 25%, #fff, transparent),
                                  radial-gradient(1px 1px at 35% 45%, #fff, transparent),
                                  radial-gradient(1px 1px at 55% 65%, #fff, transparent)`,
                backgroundSize: '400px 400px'
              }}
            />
          </motion.div>
        )}
        
        {/* Dense Starfield Layer 1 (Slowest parallax) */}
        <motion.div 
          className="absolute inset-[-10%] animate-twinkle transition-transform duration-700 ease-out"
          style={{
            transform: isReduced ? 'none' : `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
            opacity: starOpacity,
            backgroundImage: `radial-gradient(1.2px 1.2px at 20px 30px, #fff, rgba(0,0,0,0)), 
                              radial-gradient(1.1px 1.1px at 40px 70px, #fff, rgba(0,0,0,0)), 
                              radial-gradient(2px 2px at 90px 40px, #e6f0ff, rgba(0,0,0,0)), 
                              radial-gradient(1.2px 1.2px at 160px 120px, #fff, rgba(0,0,0,0)),
                              radial-gradient(1.3px 1.3px at 10px 10px, #fff, rgba(0,0,0,0))`,
            backgroundSize: '280px 280px',
            filter: isReduced ? 'none' : `blur(${Math.max(0, (zoomLevel - 1.5) * 0.4)}px)`
          }}
        />
        
        {/* Dense Starfield Layer 2 (Medium parallax) - Simplified on Reduced devices */}
        <div 
          className="absolute inset-[-15%] opacity-50 animate-star-glow delay-500 transition-transform duration-1000 ease-out"
          style={{
            transform: isReduced ? 'none' : `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
            backgroundImage: `radial-gradient(1px 1px at 15px 25px, #fff, rgba(0,0,0,0)), 
                              radial-gradient(1.1px 1.1px at 75px 85px, #fff, rgba(0,0,0,0)), 
                              radial-gradient(1.3px 1.3px at 200px 250px, #fff, rgba(0,0,0,0))`,
            backgroundSize: '160px 160px',
            filter: isReduced ? 'none' : `brightness(${1 + glowIntensity})`
          }}
        />

        {/* Dense Starfield Layer 3 (Tiny specks) - Hidden on Reduced devices */}
        {!isReduced && (
          <div 
            className="absolute inset-[-5%] opacity-30 transition-transform duration-1500 ease-out"
            style={{
              transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`,
              backgroundImage: `radial-gradient(0.6px 0.6px at 10px 10px, #fff, rgba(0,0,0,0)), 
                                radial-gradient(0.6px 0.6px at 40px 40px, #fff, rgba(0,0,0,0)), 
                                radial-gradient(0.6px 0.6px at 80px 80px, #fff, rgba(0,0,0,0))`,
              backgroundSize: '90px 90px'
            }}
          />
        )}

        {/* Subtle Nebulae Layers - Optimized for Mobile/Tablet */}
        <div 
          className="absolute top-[-30%] left-[-20%] w-[140%] h-[140%] opacity-20 animate-nebula bg-indigo-950 rounded-full transition-transform duration-[2000ms] ease-out"
          style={{ 
            filter: isReduced ? 'blur(80px)' : 'blur(160px)', 
            mixBlendMode: 'screen',
            transform: isReduced ? 'none' : `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`
          }}
        />
        {!isReduced && (
          <>
            <div 
              className="absolute bottom-[-30%] right-[-20%] w-[140%] h-[140%] opacity-15 animate-nebula bg-blue-900 rounded-full delay-1000 transition-transform duration-[2500ms] ease-out"
              style={{ 
                filter: 'blur(180px)', 
                mixBlendMode: 'screen',
                transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`
              }}
            />
            <div 
              className="absolute top-[20%] left-[10%] w-[80%] h-[80%] opacity-12 animate-nebula bg-purple-950 rounded-full delay-2000 transition-transform duration-[3000ms] ease-out"
              style={{ 
                filter: 'blur(120px)', 
                mixBlendMode: 'screen',
                transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)`
              }}
            />
          </>
        )}

        {/* Shooting Stars - Only on Desktop */}
        {!isReduced && (
          <>
            <div className="absolute top-[-20%] left-[20%] w-[1px] h-[300px] bg-gradient-to-t from-white via-eu-gold/40 to-transparent opacity-0 animate-shooting pointer-events-none" style={{ animationDelay: '8s', filter: 'blur(0.4px)' }} />
            <div className="absolute top-[30%] left-[60%] w-[1px] h-[250px] bg-gradient-to-t from-white via-white/20 to-transparent opacity-0 animate-shooting pointer-events-none" style={{ animationDelay: '18s', filter: 'blur(0.4px)' }} />
          </>
        )}

        {/* Strong Cosmic Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(33,150,243,0.35)_0%,_rgba(0,51,153,0.1)_40%,_transparent_75%)]" />
      </div>

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
        <StarCircleOverlay windowSize={windowSize} />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

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
    </motion.div>
  );
}


