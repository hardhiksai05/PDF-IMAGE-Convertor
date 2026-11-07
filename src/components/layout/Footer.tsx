import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Heart, FileCheck, Zap, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#050810] text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">SAICONVO</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              The premier client-side document processing workspace. Convert PDF to high-fidelity
              images or assemble images into structured PDF documents with instant preview.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Zero server uploads. Your data stays in your browser memory.</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-slate-200 mb-4">
              Conversion Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/pdf-to-image" className="hover:text-violet-500 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-violet-500" />
                  PDF to JPG / PNG / WebP
                </Link>
              </li>
              <li>
                <Link to="/image-to-pdf" className="hover:text-violet-500 transition-colors flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-cyan-500" />
                  Image to PDF Merger
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-violet-500 transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  Local Browser Sandbox
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-slate-200 mb-4">
              Transparency
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="hover:text-violet-500 transition-colors">
                  About the Engine
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-violet-500 transition-colors">
                  Privacy Policy & Guarantees
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-violet-500 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} SAICONVO. Built for high privacy and speed.</p>
          <p className="flex items-center gap-1 text-slate-500">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> WebAssembly & Canvas API
          </p>
        </div>
      </div>
    </footer>
  );
};

