
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Decor */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-sprout/30 dark:bg-forest/20 blur-[120px] rounded-full pointer-events-none animate-slow-float" />
      <div className="fixed top-1/2 -right-60 w-[800px] h-[800px] bg-leaf/30 dark:bg-moss/20 blur-[150px] rounded-full pointer-events-none animate-slow-float" style={{ animationDelay: '3s' }} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-56 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-4 px-10 py-4 bg-sprout dark:bg-forest text-forest-dark dark:text-cream text-[12px] font-black tracking-[0.4em] uppercase rounded-full mb-20 shadow-xl animate-leaf-fade border border-forest/20">
          <span className="w-3 h-3 rounded-full bg-forest dark:bg-lime animate-pulse shadow-[0_0_15px_#B5E61D]" />
          BIO-SYSTEM: LOCK-IN PROTOCOL ACTIVE
        </div>
        
        <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter mb-16 leading-[0.8] text-forest-dark dark:text-cream font-serif animate-leaf-fade select-none" style={{ animationDelay: '0.1s' }}>
          WASTE IS A <br />
          <span className="italic text-forest dark:text-lime underline decoration-lime dark:decoration-moss decoration-wavy underline-offset-[25px] decoration-4">FAILURE.</span>
        </h1>
        
        <p className="max-w-4xl text-2xl md:text-3xl text-forest-dark/80 dark:text-cream/90 mb-24 leading-relaxed animate-leaf-fade font-bold italic px-4" style={{ animationDelay: '0.2s' }}>
          Traditional cooking is choice. <span className="font-black text-forest-dark dark:text-lime not-italic underline decoration-sprout decoration-4">ZeroPoint</span> is ecology. 
          We align your kitchen stock with natural spoilage vectors, eliminating loss through deterministic logic.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-12 animate-leaf-fade" style={{ animationDelay: '0.3s' }}>
          <Link to="/planner" className="group px-20 py-8 bg-forest dark:bg-moss text-cream font-black uppercase text-sm tracking-[0.4em] rounded-3xl shadow-2xl hover:bg-forest-dark dark:hover:bg-lime dark:hover:text-forest-dark transition-all transform hover:-translate-y-2">
            INITIALIZE CYCLE
          </Link>
          <Link to="/system" className="px-20 py-8 border-2 border-forest-dark dark:border-leaf text-forest-dark dark:text-leaf font-black uppercase text-sm tracking-[0.4em] rounded-3xl hover:bg-forest-dark dark:hover:bg-leaf hover:text-cream dark:hover:text-forest-dark transition-all transform hover:-translate-y-2">
            ECOLOGY OF LOGIC
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-72 grid grid-cols-1 md:grid-cols-3 gap-20 w-full animate-leaf-fade" style={{ animationDelay: '0.4s' }}>
          {[
            { label: 'System Precision', val: '99.9%', icon: '🍃', desc: 'Constraint Fidelity', color: 'text-forest dark:text-leaf', bg: 'bg-leaf/10 dark:bg-forest/20' },
            { label: 'Capital Recapture', val: '₹22,400', icon: '💰', desc: 'Annual Projected Alpha', color: 'text-lime dark:text-lime', bg: 'bg-lime/5 dark:bg-moss/20' },
            { label: 'Cycle Efficiency', val: '∞', icon: '♾️', desc: 'Continuous Feedback', color: 'text-moss dark:text-moss', bg: 'bg-sprout/10 dark:bg-sprout/20' }
          ].map((stat, i) => (
            <div key={i} className={`group p-16 ${stat.bg} backdrop-blur-xl rounded-[5rem] border border-forest/20 dark:border-cream/10 hover:border-forest dark:hover:border-lime transition-all shadow-2xl`}>
              <div className="text-7xl mb-10 group-hover:scale-110 transition-transform inline-block filter drop-shadow-xl">{stat.icon}</div>
              <div className="text-[12px] font-black text-forest-dark dark:text-cream mb-6 mono tracking-[0.5em] uppercase opacity-100">{stat.label}</div>
              <div className={`text-7xl font-bold font-serif mb-4 ${stat.color}`}>{stat.val}</div>
              <div className="text-[11px] font-black text-forest-dark/60 dark:text-leaf-dark uppercase tracking-[0.3em] italic">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-forest-dark py-64 text-cream relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-[0.05]" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-40 items-center relative z-10">
          <div className="animate-leaf-fade">
            <h2 className="text-7xl md:text-9xl font-bold font-serif mb-16 leading-[0.9] tracking-tighter">Nature is <br/>deterministic.</h2>
            <p className="text-cream font-bold leading-relaxed mb-20 text-3xl italic border-l-8 border-lime pl-12 py-6">
              "We provide paths of least resistance for organic matter. By treating your pantry as a closed loop, entropy becomes input."
            </p>
            <div className="space-y-12">
              <div className="p-12 bg-white/5 rounded-[4rem] border border-white/10 flex items-start gap-10 group hover:bg-white/10 transition-all">
                <span className="text-6xl group-hover:scale-110 transition-transform">🧬</span>
                <div>
                  <h4 className="text-lime font-black text-base uppercase mb-4 tracking-[0.3em]">Hard Constraints</h4>
                  <p className="text-lg text-cream/80 font-bold leading-relaxed">Expiry dates are physical vectors. If an item breaches the 24h threshold, the system mandates caloric utilization.</p>
                </div>
              </div>
              <div className="p-12 bg-white/5 rounded-[4rem] border border-white/10 flex items-start gap-10 group hover:bg-white/10 transition-all">
                <span className="text-6xl group-hover:scale-110 transition-transform">📊</span>
                <div>
                  <h4 className="text-lime font-black text-base uppercase mb-4 tracking-[0.3em]">Bio-Optimization</h4>
                  <p className="text-lg text-cream/80 font-bold leading-relaxed">AI analyzes typical spoilage patterns and nutrient density to compute the most efficient consumption path.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-leaf-fade" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-lime/20 blur-[120px] rounded-full scale-150 animate-pulse-soft" />
            <div className="bg-sand/10 p-6 rounded-[6rem] backdrop-blur-2xl border border-white/10 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <div className="bg-cream p-20 rounded-[5.5rem] text-forest-dark">
                <div className="text-[14px] font-black text-forest uppercase mb-16 mono tracking-[0.4em] border-b-4 border-forest/10 pb-8">Lifecycle_Audit.sys</div>
                <div className="space-y-20">
                  <div>
                    <div className="flex justify-between text-[13px] font-black uppercase mb-6 tracking-[0.2em] text-forest"><span>Saturation Vector</span> <span>94%</span></div>
                    <div className="h-6 bg-sand rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-forest w-[94%] shadow-[0_0_20px_#4A7C59]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[13px] font-black uppercase mb-6 tracking-[0.2em] text-moss"><span>Entropy Leakage</span> <span>0.2%</span></div>
                    <div className="h-6 bg-sand rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-moss w-[12%]" />
                    </div>
                  </div>
                </div>
                <div className="mt-24 p-12 bg-forest-dark/10 rounded-[4rem] italic text-xl text-forest-dark font-black border border-forest/10 leading-relaxed text-center">
                  "System diversion successful: 800g organic mass transformed. Resource efficiency: Optimal."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
