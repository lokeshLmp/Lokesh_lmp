import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlannerPage from './pages/PlannerPage';
import DashboardPage from './pages/DashboardPage';
import SystemPage from './pages/SystemPage';
import { backend } from './services/storageService';
import { Theme } from './types';

interface SystemContextType {
  theme: Theme;
  toggleTheme: () => void;
  brightness: number;
  setBrightness: (val: number) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error("useSystem must be used within a SystemProvider");
  return context;
};

const Nav: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme, brightness, setBrightness } = useSystem();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism transition-all duration-300 shadow-sm border-b border-forest/10 dark:border-white/5 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-forest dark:bg-moss rounded-2xl flex items-center justify-center font-bold text-cream transition-all shadow-md">
            <span className="text-2xl">🌿</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-forest-dark dark:text-cream leading-none tracking-tight">ZeroPoint</span>
            <span className="text-[10px] font-black text-forest/60 dark:text-leaf mono tracking-[0.2em] uppercase">Organic Protocol</span>
          </div>
        </Link>
        
        <div className="flex gap-6 items-center">
          <div className="hidden lg:flex gap-12 items-center mr-8">
            {[
              { name: 'LIFECYCLE', path: '/planner' },
              { name: 'IMPACT', path: '/dashboard' },
              { name: 'LOGIC', path: '/system' }
            ].map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-[11px] font-black tracking-[0.25em] transition-all border-b-2 py-1 ${isActive(link.path) ? 'text-forest border-forest dark:text-lime dark:border-lime' : 'text-forest/40 dark:text-cream/30 border-transparent hover:text-forest-dark dark:hover:text-cream'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 border-l border-forest/10 dark:border-white/10 pl-8">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-forest-dark dark:text-cream uppercase mono mb-1 tracking-tighter">Luminance</span>
              <input 
                type="range" min="0" max="0.75" step="0.01" 
                value={brightness} 
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                className="w-20 accent-forest dark:accent-lime cursor-pointer h-1 rounded-full"
              />
            </div>
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-sand dark:bg-forest text-forest-dark dark:text-cream hover:bg-forest-dark hover:text-cream dark:hover:bg-lime dark:hover:text-forest-dark transition-all shadow-inner border border-forest/5"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [brightness, setBrightness] = useState(0); 

  useEffect(() => {
    backend.getSettings().then(s => {
      setTheme(s.theme);
      if (s.theme === 'dark') document.documentElement.classList.add('dark');
    });
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    backend.updateSettings({ theme: next });
    if (next === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <SystemContext.Provider value={{ theme, toggleTheme, brightness, setBrightness }}>
      <HashRouter>
        <div className="min-h-screen transition-all duration-500 selection:bg-lime selection:text-forest-dark">
          <div className="brightness-overlay" style={{ opacity: brightness }} />
          <Nav />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/system" element={<SystemPage />} />
            </Routes>
          </main>
          
          <footer className="py-24 px-6 bg-sand dark:bg-[#121c15] transition-colors mt-32 relative overflow-hidden border-t border-forest/5">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-[2] pointer-events-none select-none">
              <span className="text-[300px] text-forest">🍃</span>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <div className="font-serif text-5xl font-bold text-forest-dark dark:text-cream mb-6 tracking-tighter italic">ZeroPoint</div>
                <p className="text-base text-forest-dark/50 dark:text-cream/40 max-w-sm leading-relaxed mb-8">
                  Engineering the transition from impulse consumption to deterministic ecological cycles. 
                </p>
                <div className="flex gap-8 items-center text-[10px] font-black uppercase tracking-[0.3em] text-forest/40 dark:text-cream/30">
                  <span>© 2025 ZP_LABS</span>
                  <span>v1.5.0_STABLE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 md:text-right text-[11px] font-black text-forest dark:text-leaf uppercase tracking-[0.25em]">
                <div className="flex flex-col gap-4">
                  <span className="hover:text-forest-dark dark:hover:text-lime cursor-pointer transition-colors underline decoration-moss decoration-2 underline-offset-4">Ethical_Reasoning</span>
                  <span className="hover:text-forest-dark dark:hover:text-lime cursor-pointer transition-colors underline decoration-moss decoration-2 underline-offset-4">Carbon_Audit</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="hover:text-forest-dark dark:hover:text-lime cursor-pointer transition-colors underline decoration-moss decoration-2 underline-offset-4">System_Status</span>
                  <span className="hover:text-forest-dark dark:hover:text-lime cursor-pointer transition-colors underline decoration-moss decoration-2 underline-offset-4">Legal_Bio</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </SystemContext.Provider>
  );
};

export default App;