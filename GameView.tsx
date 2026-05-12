import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, ArrowLeft, 
  RotateCcw, CheckCircle2,
  AlertCircle, Star,
  Hash, Calculator,
  Binary
} from 'lucide-react';
import { NUMBER_CHALLENGES, MATH_CHALLENGES, NumberChallenge, MathChallenge } from './vocabData';
import Number3D, { Basket3D } from './Number3D';

interface GameViewProps {
  mode: 'numbers' | 'math';
  onBack: () => void;
}

export default function GameView({ mode, onBack }: GameViewProps) {
  const challenges = useMemo(() => {
    return mode === 'numbers' ? NUMBER_CHALLENGES : MATH_CHALLENGES;
  }, [mode]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const current = challenges[currentIdx];

  const handleAnswer = (num: number) => {
    if (isCorrect !== null) return;
    
    setSelectedNum(num);
    const correctVal = mode === 'numbers' 
      ? (current as NumberChallenge).num 
      : (current as MathChallenge).answer;
      
    const correct = num === correctVal;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setSelectedNum(null);
      if (currentIdx < challenges.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, correct ? 1000 : 2500);
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsCorrect(null);
    setSelectedNum(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[40px] sm:rounded-[64px] p-8 sm:p-12 shadow-2xl border-4 border-slate-50 space-y-10 relative overflow-hidden"
        >
          <Trophy className="w-16 h-16 sm:w-24 sm:h-24 text-yellow-500 mx-auto drop-shadow-xl" />
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase italic tracking-widest text-slate-900 leading-tight">ԽԱՂԻ ԱՎԱՐՏ</h2>
            <div className="text-6xl sm:text-8xl font-black text-blue-600 drop-shadow-xl">
              {score}/{challenges.length}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8">
            <button 
              onClick={resetGame}
              className="bg-blue-600 text-white py-6 rounded-3xl font-black italic uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl"
            >
              <RotateCcw className="w-6 h-6" /> ՆՈՐԻՑ ՓՈՐՁԵԼ
            </button>
            <button onClick={onBack} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors pt-4">
               ԳԼԽԱՎՈՐ ՄԵՆՅՈՒ
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const basketColors = ['blue', 'orange', 'indigo'];

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      mode === 'math' ? 'bg-orange-50' : 'bg-sky-50'
    } pb-32 pt-8 sm:pt-12 px-4`}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HUD */}
        <div className="flex justify-between items-center text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">
          <button onClick={onBack} className="flex items-center gap-2 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> ԵՏ
          </button>
          <div className="bg-white px-6 py-2 rounded-full text-slate-900 shadow-sm border border-slate-100 flex items-center gap-3 font-mono">
            <Hash className="w-4 h-4 text-orange-500" /> {currentIdx + 1} / {challenges.length}
          </div>
        </div>

        {/* Progress */}
        <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner border border-slate-100">
          <motion.div 
            className={`h-full ${mode === 'math' ? 'bg-orange-500' : 'bg-blue-600'}`}
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / challenges.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-sm ${
            mode === 'math' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
          }`}>
             {mode === 'numbers' ? <Binary className="w-4 h-4" /> : <Calculator className="w-4 h-4" />} {mode === 'numbers' ? 'ԹԻՎԸ ԻՍՊԱՆԵՐԵՆ' : 'ՄԱԹԵՄԱՏԻԿԱ'}
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotateX: 20 }}
                className="py-4"
              >
                <div className={`relative px-10 py-12 rounded-[48px] shadow-2xl border-4 inline-block max-w-full break-words perspective-1000 ${
                  mode === 'math' ? 'bg-white border-orange-100' : 'bg-white border-blue-50'
                }`}>
                  {/* Decorative corner */}
                  <div className={`absolute top-4 left-4 w-8 h-8 rounded-full opacity-20 ${mode === 'math' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  
                  <h2 className="text-3xl sm:text-6xl font-black text-slate-900 italic uppercase tracking-tighter leading-tight relative">
                    {mode === 'numbers' ? (current as NumberChallenge).word : (current as MathChallenge).problem}
                  </h2>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Result feedback overlay */}
            <AnimatePresence>
              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  {isCorrect ? (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      className="bg-emerald-500 text-white p-8 rounded-full shadow-2xl border-8 border-white"
                    >
                      <CheckCircle2 size={80} />
                    </motion.div>
                  ) : (
                    <motion.div 
                      animate={{ x: [-10, 10, -10, 10, 0] }}
                      className="bg-rose-500 text-white p-8 rounded-[40px] shadow-2xl border-8 border-white flex flex-col items-center gap-2"
                    >
                      <AlertCircle size={80} />
                      <span className="text-5xl font-black italic">
                         {mode === 'numbers' ? (current as NumberChallenge).num : (current as MathChallenge).answer}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Baskets (Options) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10">
          {current.options.map((opt, i) => (
            <Basket3D 
              key={i}
              color={basketColors[i % basketColors.length]}
              value={opt}
              isSelected={selectedNum === opt}
              isCorrect={selectedNum === opt ? isCorrect : null}
              onClick={() => handleAnswer(opt)}
            />
          ))}
        </div>

        <div className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] flex items-center justify-center gap-3 pt-12">
           <Star className={`w-4 h-4 ${mode === 'math' ? 'text-orange-400' : 'text-blue-400'}`} /> SPANISH MATH 3D <Star className={`w-4 h-4 ${mode === 'math' ? 'text-orange-400' : 'text-blue-400'}`} />
        </div>
      </div>
    </div>
  );
}
