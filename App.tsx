import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Binary,
  ArrowRight, Star,
  BookOpen, Calculator,
  Compass
} from 'lucide-react';
import GameView from './GameView';
import VocabView from './VocabView';

export type AppScreen = 'menu' | 'vocab' | 'game-numbers' | 'game-math';

function MainMenu({ setScreen }: { setScreen: (s: AppScreen) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20 text-center space-y-16">
      <div className="space-y-8">
        <div className="flex justify-center gap-4">
           {[...Array(3)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
               transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
             >
               <Star className="w-8 h-8 text-blue-400 fill-blue-400 opacity-20" />
             </motion.div>
           ))}
        </div>
        <div className="space-y-4">
            <h1 className="text-5xl sm:text-8xl md:text-9xl font-black text-slate-950 tracking-tighter uppercase italic leading-none">
            ԻՍՊԱՆԵՐԵՆԻ <br/><span className="text-blue-600">ԹՎԵՐ</span>
          </h1>
          <p className="text-xs sm:text-2xl md:text-3xl font-bold text-slate-400 uppercase tracking-[0.2em]">
            NUMEROS Y MATEMÁTICAS 3D
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 max-w-2xl mx-auto">
        {/* Numbers Game */}
        <motion.button 
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('game-numbers')}
          className="group relative bg-blue-600 p-6 sm:p-10 rounded-[48px] shadow-2xl border-4 border-blue-500 overflow-hidden text-left"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative z-10 flex items-center gap-6 text-white">
            <div className="p-5 bg-white rounded-[32px] shadow-inner rotate-3 group-hover:rotate-12 transition-transform">
              <Binary className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-blue-100 transition-colors">ԹՎԵՐ (1-1000)</h3>
              <p className="text-white/60 text-sm sm:text-base font-bold italic leading-tight">Գտիր ճիշտ թիվը 3 կողովներում:</p>
            </div>
            <ArrowRight className="w-8 h-8 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all hidden sm:block text-white" />
          </div>
        </motion.button>

        {/* Math Game */}
        <motion.button 
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('game-math')}
          className="group relative bg-orange-500 p-6 sm:p-10 rounded-[48px] shadow-2xl overflow-hidden text-left border-4 border-orange-400"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative z-10 flex items-center gap-6 text-white">
            <div className="p-5 bg-white rounded-[32px] shadow-inner -rotate-6 group-hover:rotate-6 transition-transform">
              <Calculator className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-orange-100 transition-colors">ՄԱԹԵՄԱՏԻԿԱ</h3>
              <p className="text-white/60 text-sm sm:text-base font-bold italic leading-tight">Գործողություններ իսպաներեն բառերով:</p>
            </div>
            <ArrowRight className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-4 transition-all hidden sm:block text-white" />
          </div>
        </motion.button>

        {/* Info/Ref */}
        <button 
          onClick={() => setScreen('vocab')}
          className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-all pt-4 flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" /> ՏԵՍԱԿԱՆ ՄԱՍ
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('menu');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <AnimatePresence mode="wait">
        {screen === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <MainMenu setScreen={setScreen} />
          </motion.div>
        )}
        
        {screen === 'vocab' && (
          <motion.div key="vocab" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <VocabView onBack={() => setScreen('menu')} />
          </motion.div>
        )}

        {(screen === 'game-numbers' || screen === 'game-math') && (
          <motion.div key="game" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
            <GameView 
              mode={screen === 'game-numbers' ? 'numbers' : 'math'} 
              onBack={() => setScreen('menu')} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-2xl border border-slate-100 shadow-2xl rounded-full px-8 py-5 flex items-center gap-8 sm:gap-12 max-w-[95vw] overflow-x-auto no-scrollbar">
        <NavButton 
          active={screen === 'menu'} 
          icon={<Home />} 
          label="Մենյու" 
          onClick={() => setScreen('menu')} 
        />
        <NavButton 
          active={screen === 'game-numbers'} 
          icon={<Binary />} 
          label="Թվեր" 
          color="blue"
          onClick={() => setScreen('game-numbers')} 
        />
        <NavButton 
          active={screen === 'game-math'} 
          icon={<Calculator />} 
          label="Մաթեմ" 
          color="orange"
          onClick={() => setScreen('game-math')} 
        />
      </nav>

      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[120px]" />
      </div>

      <footer className="px-4 py-24 text-center pb-32">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
           &copy; 2026 ԻՍՊԱՆԵՐԵՆԻ ՈՒՍՈՒՑՈՒՄ: ԹՎԵՐ ԵՎ ՄԱԹԵՄԱՏԻԿԱ
        </p>
      </footer>
    </div>
  );
}

function NavButton({ active, icon, label, onClick, color = 'blue' }: { active: boolean, icon: any, label: string, onClick: () => void, color?: 'blue' | 'orange' }) {
  const activeColorClass = color === 'blue' ? 'bg-blue-600 shadow-blue-100' : 'bg-orange-500 shadow-orange-100';
  const textColorClass = color === 'blue' ? 'text-blue-600' : 'text-orange-600';

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 group transition-all ${active ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
    >
      <div className={`p-2.5 rounded-2xl transition-colors ${active ? `${activeColorClass} text-white shadow-xl` : 'text-slate-600'}`}>
        {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${active ? textColorClass : 'text-slate-500'}`}>
        {label}
      </span>
    </button>
  );
}
