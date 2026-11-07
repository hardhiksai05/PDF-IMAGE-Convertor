import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, ArrowRightLeft, Sparkles } from 'lucide-react';

export const FallbackHero: React.FC = () => {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center select-none overflow-hidden">
      {/* Background ambient glowing rings */}
      <div className="absolute w-72 h-72 rounded-full border border-violet-500/20 animate-ping opacity-25" style={{ animationDuration: '4s' }} />
      <div className="absolute w-96 h-96 rounded-full border border-cyan-500/15 animate-pulse" />

      {/* Central 3D representation card: PDF */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotateZ: [-2, 2, -2],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className="relative z-20 w-52 sm:w-60 p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-violet-500/40 shadow-2xl shadow-violet-600/30 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs border border-red-500/30">
              PDF
            </div>
            <span className="text-xs font-semibold text-slate-200">Annual_Report.pdf</span>
          </div>
          <Sparkles className="w-4 h-4 text-violet-400" />
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded bg-slate-800 w-3/4" />
          <div className="h-2 rounded bg-slate-800 w-full" />
          <div className="h-2 rounded bg-slate-800 w-5/6" />
          <div className="h-16 rounded-xl bg-violet-950/40 border border-violet-500/20 flex items-center justify-center mt-3">
            <FileText className="w-7 h-7 text-violet-400" />
          </div>
        </div>
      </motion.div>

      {/* Floating Image 1: JPG (Left) */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [-5, 5, -5],
          rotateZ: [-6, -2, -6],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: 'easeInOut',
        }}
        className="absolute left-4 sm:left-12 z-10 w-40 sm:w-48 p-4 rounded-xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-cyan-500/30 shadow-xl shadow-cyan-500/20 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] border border-cyan-500/30">
            JPG
          </div>
          <span className="text-[11px] font-medium text-slate-300 truncate">page_001.jpg</span>
        </div>
        <div className="h-14 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-cyan-400" />
        </div>
      </motion.div>

      {/* Floating Image 2: PNG (Right) */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          x: [5, -5, 5],
          rotateZ: [6, 2, 6],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: 'easeInOut',
        }}
        className="absolute right-4 sm:right-12 z-10 w-40 sm:w-48 p-4 rounded-xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-indigo-500/30 shadow-xl shadow-indigo-500/20 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] border border-indigo-500/30">
            PNG
          </div>
          <span className="text-[11px] font-medium text-slate-300 truncate">page_002.png</span>
        </div>
        <div className="h-14 rounded-lg bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-center">
          <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
        </div>
      </motion.div>
    </div>
  );
};

