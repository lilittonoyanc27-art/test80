import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Hash, Calculator, 
  CheckCircle2, Info, BookOpen
} from 'lucide-react';

export default function VocabView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-40 pt-8 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6">
        <motion.div 
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 10, scale: 1 }}
            transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
            className="inline-flex p-4 bg-blue-100 rounded-3xl shadow-xl text-blue-600 border-2 border-blue-200"
        >
           <Hash className="w-12 h-12" />
        </motion.div>
        
        <div className="space-y-2">
            <h2 className="text-4xl sm:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              ԹՎԵՐ ԵՎ ՄԱԹ
            </h2>
            <p className="text-blue-600 font-black italic uppercase tracking-[0.3em] text-[10px] sm:text-sm">
              SPANISH NUMBERS & OPERATIONS
            </p>
        </div>
      </section>

      {/* Reference Card */}
      <div className="grid gap-8">
        
        {/* Numbers Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-8 sm:p-10 shadow-xl border border-slate-100 space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-blue-50 pb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
              1
            </div>
            <h3 className="text-2xl font-black text-slate-900 italic uppercase">ԹՎԵՐ (NUMEROS)</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <TheoryItem esp="Cero" arm="0" />
            <TheoryItem esp="Uno" arm="1" />
            <TheoryItem esp="Diez" arm="10" />
            <TheoryItem esp="Veinte" arm="20" />
            <TheoryItem esp="Treinta" arm="30" />
            <TheoryItem esp="Cien" arm="100" />
            <TheoryItem esp="Quinientos" arm="500" />
            <TheoryItem esp="Mil" arm="1000" />
          </div>
        </motion.div>

        {/* Math Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-[40px] p-8 sm:p-10 shadow-xl space-y-6 text-white"
        >
          <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-900 font-black shadow-lg">
              2
            </div>
            <h3 className="text-2xl font-black text-white italic uppercase">ՄԱԹԵՄԱՏԻԿԱ</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TheoryItem esp="Más" arm="Գումարում (+)" inverted />
            <TheoryItem esp="Menos" arm="Հանում (-)" inverted />
            <TheoryItem esp="Por" arm="Բազմապատկում (×)" inverted />
            <TheoryItem esp="Entre" arm="Բաժանում (÷)" inverted />
          </div>
        </motion.div>

      </div>

      <button 
        onClick={onBack}
        className="mx-auto flex items-center gap-2 bg-slate-100 px-8 py-4 rounded-2xl text-slate-600 font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
      >
        <ArrowLeft className="w-5 h-5" /> ՀԵՏ ԳԼԽԱՎՈՐ ՄԵՆՅՈՒ
      </button>
    </div>
  );
}

function TheoryItem({ esp, arm, inverted = false }: { esp: string, arm: string, inverted?: boolean }) {
  return (
    <div className={`p-4 rounded-3xl border flex flex-col gap-1 transition-all hover:scale-105 ${
      inverted 
        ? 'bg-white/10 border-white/10 hover:bg-white/20' 
        : 'bg-slate-50 border-slate-100 hover:border-blue-300'
    }`}>
      <span className={`text-xl font-black italic uppercase tracking-tighter ${inverted ? 'text-white' : 'text-slate-900'}`}>{esp}</span>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${inverted ? 'text-white/60' : 'text-slate-400'}`}>{arm}</span>
    </div>
  );
}
