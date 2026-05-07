import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'dark' | 'gold';
}

export function Section({ id, title, subtitle, children, className, color = 'blue' }: SectionProps) {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.98, 1]);

  const displayOpacity = isMobile ? 1 : opacity;
  const displayScale = isMobile ? 1 : scale;

  const bgStyles = {
    blue: 'bg-eu-blue/5',
    dark: 'bg-eu-dark/20',
    gold: 'bg-eu-gold/5',
  };

  return (
    <motion.section
      id={id}
      ref={containerRef}
      style={{ opacity: displayOpacity, scale: displayScale }}
      className={cn(
        "min-h-screen py-16 md:py-24 px-4 md:px-12 flex flex-col items-center justify-center relative overflow-hidden scroll-mt-32",
        bgStyles[color],
        className
      )}
    >
      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 md:mb-16 text-center"
        >
          <motion.span 
            className="text-eu-gold font-display font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 md:mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Archive Section
          </motion.span>
          <h2 className="text-3xl md:text-6xl font-extrabold mb-4 md:mb-6 text-white leading-tight uppercase tracking-tighter">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto leading-relaxed uppercase tracking-widest font-medium">
              {subtitle}
            </p>
          )}
          <div className="w-16 h-0.5 bg-eu-gold mx-auto mt-8 opacity-50" />
        </motion.div>

        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-eu-blue rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-eu-gold/20 rounded-full blur-[100px]" />
      </div>
    </motion.section>
  );
}
