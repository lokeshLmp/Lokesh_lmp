
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', waste: 1.2, cost: 400 },
  { name: 'Tue', waste: 0.8, cost: 250 },
  { name: 'Wed', waste: 0.4, cost: 120 },
  { name: 'Thu', waste: 1.1, cost: 380 },
  { name: 'Fri', waste: 0.2, cost: 80 },
  { name: 'Sat', waste: 0.1, cost: 40 },
  { name: 'Sun', waste: 0.0, cost: 0 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 animate-leaf-fade">
      {/* Page Header */}
      <div className="mb-32 border-l-[12px] border-forest dark:border-lime pl-16 relative overflow-hidden py-10">
        <div className="absolute top-0 right-0 opacity-20 -mr-40 -mt-20 pointer-events-none">
          <span className="text-[300px]">🍂</span>
        </div>
        <h2 className="text-[13px] font-black tracking-[0.8em] text-forest dark:text-lime uppercase mb-8 mono italic">Metric Tracking // Bio-Cycle</h2>
        <h1 className="text-8xl md:text-9xl font-bold font-serif text-forest-dark dark:text-cream tracking-tighter leading-none italic">Impact Core</h1>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-40">
        {[
          { label: 'Cycle Mass Diverted', value: '14.2 kg', color: 'text-forest dark:text-lime', bg: 'bg-leaf/30 dark:bg-forest/20' },
          { label: 'Ecology Alpha', value: '₹6,390', color: 'text-moss dark:text-sprout', bg: 'bg-sprout/30 dark:bg-moss/20' },
          { label: 'Carbon Delta', value: '-35.5 kg', color: 'text-forest-dark dark:text-cream', bg: 'bg-sand/40 dark:bg-white/10' },
          { label: 'System Fidelity', value: '94.1%', color: 'text-spoil dark:text-wilt', bg: 'bg-wilt/20 dark:bg-spoil/20' },
        ].map((stat, i) => (
          <div key={i} className={`p-16 ${stat.bg} backdrop-blur-xl rounded-[4rem] border-2 border-forest/10 dark:border-cream/10 shadow-2xl group hover:scale-105 transition-transform`}>
            <div className="text-[12px] font-black text-forest-dark dark:text-cream mono mb-8 tracking-[0.4em] uppercase opacity-80">{stat.label}</div>
            <div className={`text-6xl font-bold font-serif ${stat.color} tracking-tighter leading-none`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="p-20 bg-white dark:bg-forest/15 rounded-[5rem] shadow-3xl border-2 border-forest/20 dark:border-cream/10 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-24 px-6">
            <h3 className="text-[13px] font-black tracking-widest text-forest dark:text-lime uppercase mono">Cycle Spoilage Trend</h3>
            <span className="text-[11px] font-black text-moss dark:text-sprout mono uppercase tracking-[0.3em]">KG_MASS_UNIT</span>
          </div>
          <div className="h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A7C59" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4A7C59" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 8" stroke="#D9CDBD" vertical={false} />
                <XAxis dataKey="name" stroke="#4A7C59" fontSize={13} fontWeight="bold" axisLine={false} tickLine={false} dy={20} />
                <YAxis stroke="#4A7C59" fontSize={13} fontWeight="bold" axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: '#B5E61D', strokeWidth: 4 }}
                  contentStyle={{ backgroundColor: '#2F5039', border: 'none', color: '#F8F4E6', borderRadius: '3rem', padding: '2.5rem' }}
                  labelStyle={{ fontWeight: 'black', marginBottom: '15px', textTransform: 'uppercase', fontSize: '13px', color: '#B5E61D', letterSpacing: '0.2em' }}
                />
                <Area type="monotone" dataKey="waste" stroke="#B5E61D" fillOpacity={1} fill="url(#colorWaste)" strokeWidth={8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-20 bg-white dark:bg-forest/15 rounded-[5rem] shadow-3xl border-2 border-forest/20 dark:border-cream/10 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-24 px-6">
            <h3 className="text-[13px] font-black tracking-widest text-forest dark:text-lime uppercase mono">Ecology Capture Ratio</h3>
            <span className="text-[11px] font-black text-moss dark:text-sprout mono uppercase tracking-[0.3em]">INR_VALUE_MAP</span>
          </div>
          <div className="h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="1 8" stroke="#D9CDBD" vertical={false} />
                <XAxis dataKey="name" stroke="#4A7C59" fontSize={13} fontWeight="bold" axisLine={false} tickLine={false} dy={20} />
                <YAxis stroke="#4A7C59" fontSize={13} fontWeight="bold" axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F8F4E6', border: '5px solid #B5E61D', borderRadius: '3rem', padding: '2.5rem' }}
                  itemStyle={{ color: '#2F5039', fontWeight: '900', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.1em' }}
                />
                <Line type="stepAfter" dataKey="cost" stroke="#E74C3C" strokeWidth={10} dot={{ r: 12, fill: '#B5E61D', strokeWidth: 8, stroke: '#2F5039' }} activeDot={{ r: 16, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-48 p-32 bg-sand dark:bg-black/40 rounded-[6rem] text-forest-dark dark:text-cream flex flex-col xl:flex-row gap-32 items-center relative overflow-hidden transition-all border-[6px] border-forest/10 shadow-2xl">
        <div className="absolute top-0 left-0 p-16 opacity-[0.15] pointer-events-none">
          <span className="text-[180px]">🌿</span>
        </div>
        <div className="w-56 h-56 bg-forest rounded-full flex items-center justify-center text-9xl shadow-[0_40px_80px_-20px_rgba(74,124,89,0.5)] shrink-0 text-cream animate-slow-float relative z-10">🍃</div>
        <div className="relative z-10">
          <div className="text-[13px] font-black text-forest dark:text-lime uppercase mb-12 tracking-[0.8em] mono italic border-b-2 border-forest/20 pb-4 w-fit">Behavioral_Ecology // SESSION_BIO</div>
          <h4 className="text-6xl md:text-7xl font-bold font-serif mb-12 tracking-tighter leading-none italic">The Bio-Loop Effect</h4>
          <p className="text-forest-dark dark:text-cream text-3xl md:text-4xl font-bold leading-relaxed max-w-6xl italic">
            "Your decision lag has achieved near-zero friction. By following the system's bio-spoilage prompts, you've recaptured ₹5,200 in potential waste this month. Your kitchen is now operating as a self-correcting organic loop."
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
