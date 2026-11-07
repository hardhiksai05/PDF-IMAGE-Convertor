import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Heart, FileCheck, Zap, Lock, ExternalLink, Code2 } from 'lucide-react';

// GitHub Octocat Official SVG
const GithubLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0c0d14]/90 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Open Source GitHub Banner Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-900/20 via-slate-900 to-indigo-950/40 border border-violet-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Free & Open Source Project</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Want the Full Source Code?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Anyone who wants the complete source code of this conversion platform can freely view, clone, star, or fork the repository on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/hardhiksai05/PDF-IMAGE-Convertor"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all z-10"
          >
            <GithubLogo className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>View on GitHub</span>
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/30">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-xl font-black tracking-wider uppercase text-slate-900 dark:text-white">
                SAICONVO
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              The premier client-side document processing workspace. Convert PDF to high-fidelity
              images or assemble images into structured PDF documents with instant preview.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Zero server uploads. 100% in-browser processing.</span>
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

          {/* Platform & Source */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-slate-200 mb-4">
              Resources & Code
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://github.com/hardhiksai05/PDF-IMAGE-Convertor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-500 transition-colors flex items-center gap-1.5"
                >
                  <GithubLogo className="w-3.5 h-3.5 text-slate-400" />
                  GitHub Repository
                </a>
              </li>
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

        {/* Fancy Signature & Creator Credit */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} SAICONVO. Built for high privacy, fidelity, and speed.
          </p>

          {/* Fancy Done by Hardhik Sai Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-[#161724] border border-slate-200/80 dark:border-white/10 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-xs">Done with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-slate-500 dark:text-slate-400 text-xs">by</span>
            <a
              href="https://github.com/hardhiksai05"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black tracking-wide text-xs bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Hardhik Sai
            </a>
            <a
              href="https://github.com/hardhiksai05/PDF-IMAGE-Convertor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors ml-1"
              title="GitHub Profile & Source"
            >
              <GithubLogo className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
