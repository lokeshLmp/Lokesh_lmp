import React from 'react';

const SystemPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 animate-leaf-fade">
      <div className="mb-24 border-l-8 border-forest dark:border-lime pl-16">
        <h2 className="text-[11px] font-black tracking-[0.5em] text-forest dark:text-lime uppercase mb-4 mono italic">The Bio-Logic Core // v2.0</h2>
        <h1 className="text-8xl font-bold font-serif uppercase tracking-tighter text-forest-dark dark:text-cream leading-none">Organic Logic</h1>
      </div>

      <div className="space-y-32">
        <section>
          <div className="flex items-center gap-10 mb-16">
            <h3 className="text-4xl font-bold font-serif uppercase text-forest dark:text-lime tracking-tighter italic">Cycle Reasoning</h3>
            <div className="h-[3px] bg-forest/20 flex-grow" />
          </div>
          <div className="p-16 bg-white dark:bg-black/20 backdrop-blur-2xl border-4 border-forest/20 rounded-[4rem] mono text-sm leading-loose space-y-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 bg-forest dark:bg-lime text-cream dark:text-forest-dark text-[11px] font-black uppercase tracking-widest rounded-bl-[2rem]">Protocol_Ecology</div>
            <p className="text-forest dark:text-lime uppercase font-black tracking-widest text-[11px] mb-8 italic underline decoration-lime decoration-4 underline-offset-8">// SEQUENCE: NATURAL_EQUILIBRIUM</p>
            <div className="text-forest-dark dark:text-cream font-black pl-8 border-l-4 border-sprout transition-colors py-2">01. INGEST: RAW_VECTORS (PANTRY_STOCK + EXPIRY_CURVE)</div>
            <div className="text-moss dark:text-sprout font-black pl-8 border-l-4 border-forest py-2 bg-leaf/10 rounded-r-xl">02. FILTER: ECOLOGICAL_CONSTRAINT_ENGINE (Hard Lock Wilt Risk Items)</div>
            <div className="text-lime dark:text-lime font-black pl-8 border-l-4 border-moss py-2 bg-forest/5 rounded-r-xl">03. SYNTHESIZE: LLM_HEURISTICS (Organic Recipe Mapping + Bio-Substitutions)</div>
            <div className="text-cream bg-forest-dark dark:bg-moss p-10 font-black uppercase tracking-[0.4em] mt-16 rounded-[2rem] shadow-inner text-center text-xl">04. DEPLOY: SUSTAINABLE_CYCLE_PATH</div>
            <p className="mt-16 text-forest-dark dark:text-cream italic text-xl leading-relaxed border-t border-forest/20 pt-12 text-center max-w-2xl mx-auto font-bold">
              "We don't optimize for taste alone. We optimize for the *life cycle* of the ingredient. The system treats a wilting leaf as a high-priority interrupt, forcing usage before entropy takes hold."
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-0 border-4 border-forest/20 rounded-[4rem] overflow-hidden bg-white/40 dark:bg-black/10">
          <div className="p-16 border-r-4 border-forest/20 bg-leaf/5 dark:bg-forest/10">
            <h4 className="text-[11px] font-black uppercase mb-12 text-forest dark:text-lime tracking-[0.5em] mono underline decoration-spoil decoration-4 underline-offset-8 italic">Urgency Matrix</h4>
            <ul className="text-sm text-forest-dark dark:text-cream space-y-6">
              <li className="flex justify-between font-black border-b border-forest/10 pb-2"><span className="mono">Entropy &lt; 24h</span> <span className="text-spoil font-black bg-spoil/10 px-2 rounded">[SPOIL_CRIT]</span></li>
              <li className="flex justify-between font-black border-b border-forest/10 pb-2"><span className="mono">Entropy &lt; 48h</span> <span className="text-wilt font-black bg-wilt/10 px-2 rounded">[WILT_HIGH]</span></li>
              <li className="flex justify-between font-black border-b border-forest/10 pb-2"><span className="mono">Cycle Drift</span> <span className="text-moss font-black bg-moss/10 px-2 rounded">[CYCLE_MED]</span></li>
              <li className="flex justify-between font-black border-b border-forest/10 pb-2"><span className="mono">Stable</span> <span className="text-forest font-black bg-forest/10 px-2 rounded">[STABLE_LOW]</span></li>
            </ul>
          </div>
          <div className="p-16 bg-sand/40 dark:bg-black/20">
            <h4 className="text-[11px] font-black uppercase mb-12 text-forest dark:text-lime tracking-[0.5em] mono italic">Bio-Objective Function</h4>
            <div className="text-sm text-forest-dark dark:text-lime mono leading-loose bg-white dark:bg-forest-dark p-10 border-2 border-forest/20 rounded-[3rem] font-black shadow-inner">
              Minimize:<br />
              <span className="text-spoil">&sum;(EcoCost * (1 / (Lifecycle_End - Now)))</span><br /><br />
              Subject to:<br />
              &forall; Bio_Item &in; Stock, if Cycle_Risk &ge; 0.8 &rArr; <span className="text-lime">MealPlan_Mandatory = True</span>
            </div>
          </div>
        </section>

        <section className="bg-white/60 dark:bg-forest/10 p-16 rounded-[4rem] border-4 border-forest/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-20 scale-150 rotate-45">
            <span className="text-9xl">🍃</span>
          </div>
          <h3 className="text-4xl font-bold font-serif uppercase mb-16 text-forest-dark dark:text-lime tracking-tighter italic underline decoration-sprout decoration-8 underline-offset-8">Ecology of Ethics</h3>
          <div className="grid md:grid-cols-2 gap-20">
            <div className="flex gap-8">
              <div className="text-5xl font-black text-moss dark:text-lime font-serif italic">01</div>
              <div>
                <h5 className="font-black uppercase text-xs text-forest dark:text-lime mb-4 tracking-widest border-b-4 border-moss w-fit">Algorithmic Biology</h5>
                <p className="text-base text-forest-dark dark:text-cream leading-relaxed font-bold">The system follows natural decay laws. We don't judge you for waste; we simply update the model to prevent it in the next cycle.</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-5xl font-black text-moss dark:text-lime font-serif italic">02</div>
              <div>
                <h5 className="font-black uppercase text-xs text-forest dark:text-lime mb-4 tracking-widest border-b-4 border-moss w-fit">Data Rewilding</h5>
                <p className="text-base text-forest-dark dark:text-cream leading-relaxed font-bold">Your stock data is ephemeral. It lives only as long as the ingredient does. We map nutrient flows, not identities.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="p-32 bg-forest-dark dark:bg-moss text-cream dark:text-forest-dark text-center relative overflow-hidden rounded-[5rem] shadow-2xl border-8 border-lime/30">
           <div className="absolute inset-0 leaf-pattern opacity-20" />
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-lime/20 blur-[100px] rounded-full animate-slow-float" />
          <h3 className="text-7xl font-bold font-serif uppercase mb-10 tracking-tighter leading-none relative z-10">Return to the <br/>Closed Loop.</h3>
          <p className="text-sm font-black mb-16 opacity-100 uppercase tracking-[0.5em] relative z-10 italic">Initialize bio-cycle logic to proceed.</p>
          <a href="#/planner" className="px-20 py-8 bg-cream text-forest-dark font-black uppercase text-sm tracking-[0.4em] inline-block hover:bg-lime hover:text-forest-dark transition-all shadow-2xl hover:scale-105 active:scale-95 relative z-10 rounded-[2rem] border-4 border-forest">
            BOOT_ECOLOGY
          </a>
        </section>
      </div>
    </div>
  );
};

export default SystemPage;