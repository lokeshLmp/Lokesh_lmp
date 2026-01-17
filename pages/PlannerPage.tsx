
import React, { useState, useEffect, useRef } from 'react';
import { Ingredient, Urgency, MealPlan, VisionResult } from '../types';
import { generateZeroPointPlan, identifyIngredientFromImage } from '../services/geminiService';
import { backend } from '../services/storageService';
import { COLORS } from '../constants';

const PlannerPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<{name: string, quantity: string, expiry: string, category: Ingredient['category']}>({ 
    name: '', quantity: '', expiry: '', category: 'Produce' 
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    backend.getPantry().then(setIngredients);
  }, []);

  useEffect(() => {
    backend.savePantry(ingredients);
  }, [ingredients]);

  const addIngredient = () => {
    if (!newIngredient.name) return;
    const item: Ingredient = {
      id: Math.random().toString(36).substr(2, 9),
      name: newIngredient.name.toUpperCase(),
      quantity: newIngredient.quantity || '1 unit',
      expiryDate: newIngredient.expiry || new Date().toISOString().split('T')[0],
      urgency: Urgency.MEDIUM,
      confidence: 0.8,
      isLocked: false,
      category: newIngredient.category
    };
    setIngredients([...ingredients, item]);
    setNewIngredient({ name: '', quantity: '', expiry: '', category: 'Produce' });
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const result = await identifyIngredientFromImage(base64);
      if (result) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + result.estimatedExpiryDays);
        setNewIngredient({
          name: result.name,
          quantity: result.suggestedQuantity,
          expiry: expiryDate.toISOString().split('T')[0],
          category: result.category as any
        });
      }
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  const toggleLock = (id: string) => {
    setIngredients(prev => prev.map(i => i.id === id ? { ...i, isLocked: !i.isLocked } : i));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateZeroPointPlan(ingredients, "Organic, nutrient-dense, high bioavailability.");
    setPlan(result);
    setIsGenerating(false);
  };

  const grouped = ingredients.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  const pantryHealth = ingredients.length === 0 ? 0 : Math.round((ingredients.filter(i => i.isLocked).length / ingredients.length) * 100);

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-32 animate-leaf-fade">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
        
        {/* Inventory System Column */}
        <div className="lg:col-span-5 space-y-24">
          <header className="flex items-end justify-between border-b-4 border-forest/30 pb-12">
            <div>
              <h2 className="text-[12px] font-black tracking-[0.6em] text-forest dark:text-lime uppercase mb-6 mono italic">Phase_01: Calibration</h2>
              <h1 className="text-7xl font-bold font-serif text-forest-dark dark:text-cream tracking-tighter leading-none">The Larder</h1>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-black text-moss dark:text-leaf uppercase mb-3 mono tracking-[0.2em]">Stability Index</div>
              <div className="text-7xl font-bold text-forest dark:text-lime font-serif leading-none">{pantryHealth}%</div>
            </div>
          </header>

          {/* Add Entry Block */}
          <div className="p-14 bg-white/70 dark:bg-forest/10 backdrop-blur-3xl rounded-[4rem] border-2 border-forest/20 dark:border-cream/30 relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            {isAnalyzing && (
              <div className="absolute inset-0 bg-cream/98 dark:bg-forest-dark/98 z-20 flex flex-col items-center justify-center backdrop-blur-xl">
                <div className="text-7xl mb-10">🧬</div>
                <div className="text-[14px] font-black tracking-[0.5em] text-forest dark:text-lime mb-10 animate-pulse uppercase">Scanning_Organic_Matrix</div>
                <div className="w-2/3 h-2 bg-sand dark:bg-forest/30 rounded-full overflow-hidden">
                  <div className="h-full bg-forest dark:bg-lime animate-pulse" style={{width: '75%'}}></div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-16">
              <h3 className="font-serif text-4xl font-bold text-forest-dark dark:text-cream italic tracking-tighter">Input Vectors</h3>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-10 py-5 bg-forest dark:bg-moss text-cream text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-forest-dark dark:hover:bg-lime dark:hover:text-forest-dark transition-all shadow-2xl active:scale-95"
              >
                SMART OPTICS
              </button>
              <input type="file" accept="image/*" capture="environment" ref={fileInputRef} className="hidden" onChange={handleImageCapture} />
            </div>

            <div className="space-y-12">
              <div className="relative group">
                <label className="text-[11px] font-black text-forest dark:text-lime uppercase absolute left-8 top-3 mono tracking-tighter">Nomenclature</label>
                <input 
                  value={newIngredient.name}
                  onChange={e => setNewIngredient({...newIngredient, name: e.target.value})}
                  placeholder="E.G. AVOCADO"
                  className="w-full bg-cream/80 dark:bg-black/40 border-2 border-forest/30 dark:border-white/20 p-8 pt-12 rounded-[2.5rem] text-lg font-bold focus:border-forest dark:focus:border-lime outline-none transition-all dark:text-cream shadow-inner placeholder:opacity-40"
                />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="relative group">
                  <label className="text-[11px] font-black text-forest dark:text-lime uppercase absolute left-8 top-3 mono tracking-tighter">Mass</label>
                  <input 
                    value={newIngredient.quantity}
                    onChange={e => setNewIngredient({...newIngredient, quantity: e.target.value})}
                    placeholder="300G"
                    className="w-full bg-cream/80 dark:bg-black/40 border-2 border-forest/30 dark:border-white/20 p-8 pt-12 rounded-[2.5rem] text-lg font-bold focus:border-forest dark:focus:border-lime outline-none transition-all dark:text-cream shadow-inner placeholder:opacity-40"
                  />
                </div>
                <div className="relative group">
                  <label className="text-[11px] font-black text-forest dark:text-lime uppercase absolute left-8 top-3 mono tracking-tighter">Category</label>
                  <select 
                    value={newIngredient.category}
                    onChange={e => setNewIngredient({...newIngredient, category: e.target.value as any})}
                    className="w-full bg-cream/80 dark:bg-black/40 border-2 border-forest/30 dark:border-white/20 p-8 pt-12 rounded-[2.5rem] text-lg font-bold focus:border-forest dark:focus:border-lime outline-none transition-all dark:text-cream appearance-none cursor-pointer"
                  >
                    {['Produce', 'Protein', 'Dairy', 'Pantry', 'Grains', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="relative group">
                <label className="text-[11px] font-black text-forest dark:text-lime uppercase absolute left-8 top-3 mono tracking-tighter">Expiry Curve End</label>
                <input 
                  type="date"
                  value={newIngredient.expiry}
                  onChange={e => setNewIngredient({...newIngredient, expiry: e.target.value})}
                  className="w-full bg-cream/80 dark:bg-black/40 border-2 border-forest/30 dark:border-white/20 p-8 pt-12 rounded-[2.5rem] text-lg font-bold focus:border-forest dark:focus:border-lime outline-none transition-all dark:text-cream shadow-inner"
                />
              </div>
              <button 
                onClick={addIngredient}
                className="w-full py-10 bg-forest-dark dark:bg-moss text-cream font-black uppercase text-sm tracking-[0.5em] rounded-[2.5rem] hover:bg-forest dark:hover:bg-lime dark:hover:text-forest-dark transition-all shadow-2xl active:scale-[0.98]"
              >
                LOG TO LIFECYCLE
              </button>
            </div>
          </div>

          {/* Ingredient List Sections */}
          <div className="space-y-20 pt-10">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="space-y-8 animate-leaf-fade">
                <h3 className="text-[13px] font-black tracking-[0.8em] text-forest-dark dark:text-lime uppercase mono border-l-8 border-moss pl-8 italic">{cat}</h3>
                <div className="grid gap-8">
                  {items.map(item => (
                    <div key={item.id} className={`p-10 rounded-[3.5rem] flex items-center justify-between transition-all group ${item.isLocked ? 'bg-leaf/40 dark:bg-forest border-forest dark:border-lime border-4 shadow-2xl' : 'bg-white dark:bg-forest/20 border-forest/20 dark:border-cream/20 border-2 shadow-lg'}`}>
                      <div className="flex items-center gap-10">
                        <button 
                          onClick={() => toggleLock(item.id)}
                          className={`w-20 h-20 rounded-3xl border-4 flex items-center justify-center transition-all shadow-lg ${item.isLocked ? 'bg-forest border-forest dark:bg-lime dark:border-lime text-cream dark:text-forest-dark' : 'bg-sand/60 dark:bg-black/30 border-forest/40 hover:border-forest'}`}
                        >
                          <span className={`text-4xl transition-all ${item.isLocked ? 'opacity-100' : 'opacity-0'}`}>🌿</span>
                        </button>
                        <div>
                          <div className="font-bold text-forest-dark dark:text-cream uppercase text-2xl tracking-tight leading-none mb-3">{item.name}</div>
                          <div className="text-[12px] text-forest dark:text-lime font-black mono uppercase tracking-widest">{item.quantity} // CYCLE_END: {item.expiryDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-10">
                        <div className={`px-8 py-3 text-[12px] font-black uppercase rounded-full border-4 tracking-widest shadow-lg ${
                          item.urgency === Urgency.CRITICAL ? 'border-spoil text-spoil bg-spoil/20' : 
                          item.urgency === Urgency.HIGH ? 'border-wilt text-wilt bg-wilt/20' : 'border-moss text-moss bg-moss/10'
                        }`}>
                          {item.urgency}
                        </div>
                        <button 
                          onClick={() => removeIngredient(item.id)} 
                          className="w-12 h-12 flex items-center justify-center text-spoil opacity-0 group-hover:opacity-100 transition-all hover:scale-125 active:scale-90"
                        >
                          <span className="text-5xl font-black">×</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}
          <button 
            disabled={isGenerating || ingredients.length === 0}
            onClick={handleGenerate}
            className={`w-full py-16 rounded-[4.5rem] font-black tracking-[0.6em] uppercase shadow-[0_50px_100px_-20px_rgba(74,124,89,0.3)] transition-all ${isGenerating ? 'bg-sand dark:bg-forest/20 text-forest-dark/30 cursor-not-allowed animate-pulse' : 'bg-forest dark:bg-moss text-cream hover:bg-forest-dark dark:hover:bg-lime dark:hover:text-forest-dark hover:scale-[1.02] active:scale-95 text-xl'}`}
          >
            {isGenerating ? 'CONSULTING BIO-LOGIC...' : 'EXECUTE OPTIMIZATION'}
          </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {!plan && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center p-32 text-center bg-white dark:bg-forest/10 rounded-[6rem] border-8 border-dashed border-forest/20 dark:border-cream/20 relative overflow-hidden shadow-2xl">
              <div className="text-[18rem] mb-20 opacity-30 animate-slow-float drop-shadow-3xl">🍃</div>
              <h2 className="text-7xl font-bold font-serif text-forest-dark dark:text-cream mb-12 italic tracking-tighter">Pantry Passive</h2>
              <p className="max-w-xl text-3xl text-forest-dark/80 dark:text-cream font-bold leading-relaxed px-10">
                Initialize the ZeroPoint protocol by logging your organic stock vectors. Nature doesn't waste—why should you?
              </p>
              <div className="absolute bottom-16 left-16 opacity-[0.05] pointer-events-none select-none">
                <span className="text-[350px] text-forest font-black leading-none">ZP</span>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="space-y-32 py-20">
              <div className="flex items-center gap-12 mb-32 animate-leaf-fade">
                <div className="w-32 h-32 bg-forest dark:bg-moss rounded-[3.5rem] flex items-center justify-center text-cream text-6xl shadow-3xl">🌱</div>
                <div className="text-6xl font-black font-serif text-forest-dark dark:text-lime italic tracking-tighter leading-tight">Consulting Lifecycle <br/>Cycles...</div>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-sand/60 dark:bg-forest/20 rounded-[5rem] animate-pulse border-2 border-forest/20" style={{ animationDelay: `${i*0.2}s` }} />
              ))}
            </div>
          ) : plan && (
            <div className="space-y-40 animate-leaf-fade">
              {/* Summary Block */}
              <div className="p-24 bg-forest-dark text-cream rounded-[6rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden border-4 border-white/5">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-moss opacity-[0.15] blur-[150px] -mr-80 -mt-80 rounded-full" />
                <div className="flex flex-col xl:flex-row justify-between items-start mb-24 border-b-4 border-cream/10 pb-20 gap-16">
                  <div>
                    <div className="text-[13px] font-black text-lime mono uppercase mb-8 tracking-[0.6em] italic opacity-80">Protocol_Execution_STABLE</div>
                    <h2 className="text-8xl md:text-9xl font-bold font-serif leading-[0.8] tracking-tighter italic">The Strategy</h2>
                  </div>
                  <div className="bg-cream/15 p-16 rounded-[4.5rem] text-center border-2 border-white/20 min-w-[300px] backdrop-blur-2xl shadow-inner">
                    <div className="text-[13px] font-black text-cream/70 uppercase mb-5 mono tracking-[0.3em]">Efficiency Alpha</div>
                    <div className="text-9xl font-bold font-serif text-lime drop-shadow-[0_0_25px_rgba(181,230,29,0.6)]">{plan.zeroPointScore}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-20">
                  <div className="space-y-6">
                    <div className="text-[13px] font-black text-cream/60 uppercase mono tracking-[0.3em]">Mass Diverted</div>
                    <div className="text-7xl font-bold font-serif text-lime italic leading-none">{plan.wasteAvoidedKg.toFixed(2)}<span className="text-xl ml-4 text-cream/60 font-sans uppercase font-black">kg</span></div>
                  </div>
                  <div className="space-y-6">
                    <div className="text-[13px] font-black text-cream/60 uppercase mono tracking-[0.3em]">Retained Capital</div>
                    <div className="text-7xl font-bold font-serif text-lime italic leading-none">₹{plan.monetarySaving}</div>
                  </div>
                  <div className="space-y-6">
                    <div className="text-[13px] font-black text-cream/60 uppercase mono tracking-[0.3em]">CO2 Offset</div>
                    <div className="text-7xl font-bold font-serif text-lime italic leading-none">{plan.carbonSavedKg.toFixed(1)}<span className="text-xl ml-4 text-cream/60 font-sans uppercase font-black">kg</span></div>
                  </div>
                </div>
              </div>

              {/* Meals Iteration */}
              <div className="space-y-24">
                <header className="flex items-center justify-between border-b-4 border-forest/30 dark:border-cream/30 pb-12 mb-12">
                  <h3 className="text-[16px] font-black tracking-[0.8em] text-forest-dark dark:text-lime uppercase mono italic">Optimal_Transition_Path</h3>
                  <div className="flex items-center gap-6">
                    <span className="w-4 h-4 rounded-full bg-lime animate-pulse shadow-[0_0_15px_#B5E61D]" />
                    <span className="text-[14px] font-black text-forest dark:text-lime mono uppercase tracking-[0.2em]">Cycle_Stable</span>
                  </div>
                </header>
                
                <div className="space-y-20">
                  {plan.meals.map((meal, idx) => (
                    <div key={idx} className="p-16 bg-white dark:bg-forest/10 rounded-[6rem] border-4 border-forest/10 dark:border-cream/10 shadow-2xl group hover:border-forest dark:hover:border-lime transition-all flex flex-col xl:flex-row gap-24 relative overflow-hidden">
                      <div className="xl:w-80 flex-shrink-0 border-r-4 border-forest/10 dark:border-cream/20 pr-20 relative">
                        <div className="text-[14px] font-black text-forest dark:text-lime mono uppercase mb-8 italic tracking-[0.5em] opacity-60">Step_{idx + 1}</div>
                        <div className="text-[16px] font-black text-moss dark:text-lime uppercase mb-4 tracking-[0.3em]">DAY_{meal.day}</div>
                        <div className="text-7xl font-bold text-forest-dark dark:text-cream uppercase font-serif tracking-tighter italic leading-[0.8]">{meal.slot}</div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-6xl md:text-7xl font-bold text-forest-dark dark:text-cream font-serif mb-12 tracking-tighter group-hover:text-forest dark:group-hover:text-lime transition-colors leading-[0.9]">{meal.recipeName}</h4>
                        <div className="flex flex-wrap gap-6 mb-16">
                          {meal.usedIngredients.map((ing, i) => (
                            <span key={i} className="px-8 py-4 bg-sprout/40 dark:bg-forest/40 text-forest-dark dark:text-lime text-[14px] font-black uppercase border-2 border-forest/20 dark:border-cream/30 rounded-full shadow-md">
                              {ing}
                            </span>
                          ))}
                        </div>
                        {meal.executionNote && (
                          <div className="flex items-start gap-10 bg-sand dark:bg-black/40 p-12 rounded-[4rem] border-2 border-forest/20 dark:border-white/10">
                            <span className="text-5xl">💡</span>
                            <p className="text-2xl text-forest-dark dark:text-cream font-bold italic leading-relaxed">
                              {meal.executionNote}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="xl:w-56 text-right flex flex-col justify-center border-l-4 border-forest/10 dark:border-cream/20 pl-20">
                        <div className="text-[14px] font-black text-forest dark:text-lime uppercase mb-5 mono tracking-[0.3em] opacity-50">Fidelity</div>
                        <div className="text-8xl font-bold text-forest dark:text-lime font-serif italic">{(meal.confidence * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping List Block */}
              <div className="p-24 bg-forest dark:bg-moss rounded-[6rem] text-cream relative overflow-hidden shadow-[0_80px_160px_-40px_rgba(74,124,89,0.5)] border-8 border-lime/40">
                <div className="absolute inset-0 leaf-pattern opacity-[0.12]" />
                <h3 className="text-[16px] font-black tracking-[0.8em] text-lime dark:text-forest-dark uppercase mb-20 mono border-b-4 border-cream/30 pb-12 italic">Complementary_Stock_Required</h3>
                <div className="grid gap-12">
                  {plan.requiredShopping.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-14 bg-cream/20 rounded-[4.5rem] border-2 border-white/30 backdrop-blur-3xl hover:bg-cream/40 transition-all group shadow-xl">
                      <div className="flex items-center gap-12">
                        <div className="w-8 h-8 bg-lime rounded-full shadow-[0_0_30px_rgba(181,230,29,1)] group-hover:scale-125 transition-transform" />
                        <span className="font-bold uppercase text-4xl text-cream tracking-tighter font-serif italic transition-all group-hover:translate-x-6">{item.name}</span>
                      </div>
                      <div className="text-[16px] font-black text-cream italic uppercase tracking-[0.4em] opacity-80">{item.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
