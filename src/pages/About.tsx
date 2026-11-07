import React from 'react';
import { Card } from '../components/ui/Card';
import { Sparkles, Cpu, ShieldCheck, Code2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold border border-violet-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About SAICONVO</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The Next Evolution in Document Processing
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Built for professionals who demand total document privacy, zero server uploads, and high-fidelity conversions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Client-Side Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Traditional converters require uploading sensitive legal papers, contracts, or tax returns to remote cloud servers. SAICONVO executes WebAssembly and Canvas APIs directly within your browser. The file bytes never travel through the internet.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Zero-Knowledge Privacy
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            No accounts, no email forms, no tracking cookies, and no cloud databases. Every document is processed in volatile browser memory and cleaned up instantly when you complete your task or close the window.
          </p>
        </Card>
      </div>

      {/* Engineering Highlights */}
      <Card className="p-8 space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-violet-500" />
          <span>Engineering & Technology Stack</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">PDF.js Engine</strong>
            <span className="text-slate-500 dark:text-slate-400">High-fidelity PDF rasterization and vector rendering</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">pdf-lib</strong>
            <span className="text-slate-500 dark:text-slate-400">Dynamic client-side PDF document synthesis and layout assembly</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">HTML5 Canvas</strong>
            <span className="text-slate-500 dark:text-slate-400">Multi-resolution pixel scaling, rotation, and JPEG/PNG/WebP encoders</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">JSZip</strong>
            <span className="text-slate-500 dark:text-slate-400">Memory-efficient ZIP packaging with Deflate compression</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">dnd-kit</strong>
            <span className="text-slate-500 dark:text-slate-400">Smooth pointer and touch-accessible drag-and-drop sortable interface</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">Three.js & R3F</strong>
            <span className="text-slate-500 dark:text-slate-400">GPU-accelerated 3D visual identity with responsive fallbacks</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
