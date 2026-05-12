import React from 'react';
import { motion } from 'motion/react';

export default function Number3D({ value, color = 'blue' }: { value: number | string, color?: string }) {
  const colors: Record<string, string> = {
    blue: 'from-blue-400 to-blue-600 border-blue-300 shadow-blue-200',
    emerald: 'from-emerald-400 to-emerald-600 border-emerald-300 shadow-emerald-200',
    rose: 'from-rose-400 to-rose-600 border-rose-300 shadow-rose-200',
    amber: 'from-amber-400 to-amber-600 border-amber-300 shadow-amber-200',
  };

  const activeColor = colors[color] || colors.blue;

  return (
    <div className="relative group perspective-1000 py-12">
      <motion.div
        initial={{ rotateX: 20, rotateY: -10 }}
        animate={{ 
          rotateX: [15, 25, 15],
          rotateY: [-10, 10, -10],
          y: [0, -10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto preserve-3d"
      >
        {/* Front Face */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeColor} rounded-[40px] border-4 flex flex-col items-center justify-center shadow-2xl translate-z-10 group-hover:translate-z-20 transition-transform`}>
          <div className="absolute inset-0 bg-white/10 rounded-[36px] blur-sm m-2 translate-z-[-5px]" />
          <span className="text-6xl sm:text-9xl font-black text-white italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            {value}
          </span>
        </div>

        {/* Depth Faces (simplified 3D) */}
        <div className="absolute inset-0 bg-slate-900/20 rounded-[40px] translate-z-[-20px] blur-xl" />
        <div className="absolute inset-0 bg-black/10 rounded-[40px] translate-z-[-10px] transform rotate-1 skew-x-1" />
      </motion.div>
    </div>
  );
}

export function Basket3D({ value, isSelected, isCorrect, onClick, color = 'slate' }: { 
  value: number, 
  isSelected: boolean,
  isCorrect: boolean | null,
  onClick: () => void,
  color?: string 
}) {
  const basketColors: Record<string, string> = {
    blue: 'bg-blue-500 border-blue-400',
    amber: 'bg-amber-500 border-amber-400',
    rose: 'bg-rose-500 border-rose-400',
    emerald: 'bg-emerald-500 border-emerald-400',
    indigo: 'bg-indigo-500 border-indigo-400',
    orange: 'bg-orange-500 border-orange-400',
  };

  const selectedOverlay = isCorrect === true ? 'bg-emerald-600 border-emerald-400' : isCorrect === false ? 'bg-rose-600 border-rose-400' : '';
  
  const baseColor = isSelected && isCorrect !== null
    ? selectedOverlay
    : (basketColors[color] || 'bg-white border-slate-200');

  const textColor = (isSelected || color !== 'slate') ? 'text-white' : 'text-slate-800';

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="perspective-1000 group w-full"
    >
      <motion.div
        animate={{ rotateX: 10 }}
        className={`relative h-48 sm:h-56 rounded-[40px] border-b-8 ${baseColor} shadow-xl flex flex-col items-center justify-center gap-4 transition-all preserve-3d`}
      >
        {/* Basket Lip */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-black/10 rounded-t-[40px] translate-z-5" />
        
        <span className={`text-4xl sm:text-6xl font-black italic tracking-tighter ${textColor} drop-shadow-sm`}>
          {value}
        </span>
        
        <div className={`absolute bottom-4 opacity-40 text-[10px] font-black uppercase tracking-widest ${textColor}`}>
           CESTA
        </div>

        {/* 3D Side Shadow */}
        <div className="absolute inset-0 bg-black/5 rounded-[40px] translate-z-[-10px] translate-y-4 blur-lg" />
      </motion.div>
    </motion.button>
  );
}
