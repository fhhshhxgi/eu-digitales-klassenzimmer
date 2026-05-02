import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Sector, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart as PieChartIcon, DollarSign, Target } from 'lucide-react';

const gdpData = [
  { name: "Deutschland", gdp: 4.46, full: "4,46 Billionen €", flag: "🇩🇪", color: "#FFCC00" },
  { name: "Frankreich", gdp: 2.80, full: "2,80 Billionen €", flag: "🇫🇷", color: "#2D4B7C" },
  { name: "Italien", gdp: 2.08, full: "2,08 Billionen €", flag: "🇮🇹", color: "#4ade80" },
  { name: "Spanien", gdp: 1.46, full: "1,46 Billionen €", flag: "🇪🇸", color: "#f87171" },
  { name: "Polen", gdp: 0.81, full: "0,81 Billionen €", flag: "🇵🇱", color: "#f472b6" },
];

const budgetData = [
  { name: "Landwirtschaft", value: 33, color: "#10b981", desc: "Gemeinsame Agrarpolitik (GAP)" },
  { name: "Regionalförderung", value: 27, color: "#3b82f6", desc: "Kohäsionsfonds für strukturschwache Regionen" },
  { name: "Forschung & Innovation", value: 13, color: "#8b5cf6", desc: "Horizon Europe & Digitalisierung" },
  { name: "Klimaschutz", value: 12, color: "#f59e0b", desc: "Green Deal & Nachhaltigkeit" },
  { name: "Verwaltung", value: 7, color: "#6b7280", desc: "EU-Institutionen & Betrieb" },
  { name: "Sonstiges", value: 8, color: "#ec4899", desc: "Außenpolitik & Katastrophenschutz" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-eu-dark/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl">
        <p className="text-white font-bold text-sm mb-1">{payload[0].name}</p>
        <p className="text-eu-gold font-black text-lg">
          {payload[0].value} {payload[0].unit || (payload[0].dataKey === 'gdp' ? 'Billionen €' : '%')}
        </p>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fff" className="text-lg font-bold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#FFCC00" className="text-xs font-bold">{`${value}%`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#94a3b8" className="text-[10px]">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export function EUDataCharts() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="space-y-8 md:space-y-12 py-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wirtschaftskraft Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-8 bg-eu-dark/40 backdrop-blur-xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-eu-gold/20 flex items-center justify-center text-eu-gold">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-white italic uppercase tracking-wider">Top 5 Wirtschaftsmächte</h3>
              <p className="text-xs text-slate-400">Bruttoinlandsprodukt (BIP) in Billionen €</p>
            </div>
          </div>

          <div className="h-[280px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gdpData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} 
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="gdp" radius={[0, 4, 4, 0]} barSize={32}>
                  {gdpData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {gdpData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <span className="text-sm">{item.flag}</span>
                <span className="text-[10px] text-white/70 font-bold uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* EU Budget Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-8 bg-eu-dark/40 backdrop-blur-xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-eu-blue/20 flex items-center justify-center text-eu-blue">
              <PieChartIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-white italic uppercase tracking-wider">Woher kommt das Geld?</h3>
              <p className="text-xs text-slate-400">Verteilung des EU-Budgets (Planungsperiode)</p>
            </div>
          </div>

          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3">
             {budgetData.slice(0, 4).map((item) => (
              <div key={item.name} className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-bold text-white uppercase">{item.name}</span>
                </div>
                <p className="text-[9px] text-slate-400 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-eu-gold bg-gradient-to-br from-eu-gold/5 to-transparent">
          <DollarSign className="text-eu-gold mb-3" size={20} />
          <h4 className="text-white font-bold text-sm mb-2">Gesamt-BIP der EU</h4>
          <p className="text-2xl font-display font-black text-white italic">~17,0</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Billionen Euro (2023)</p>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-eu-blue bg-gradient-to-br from-eu-blue/5 to-transparent">
          <Target className="text-eu-blue mb-3" size={20} />
          <h4 className="text-white font-bold text-sm mb-2">Budgetziel</h4>
          <p className="text-2xl font-display font-black text-white italic">1,1%</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">der Bruttonationaleinkommen</p>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-green-500/5 to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs">🌍</span>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Fokus</span>
          </div>
          <h4 className="text-white font-bold text-sm mb-2">NextGenerationEU</h4>
          <p className="text-2xl font-display font-black text-white italic">800</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Milliarden € Wiederaufbaufonds</p>
        </div>
      </div>
    </div>
  );
}
