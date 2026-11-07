import React from 'react';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Lock, CheckCircle2, EyeOff, ServerOff, Database } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy & Security Model
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          We believe document conversion should never come at the expense of your personal or corporate data confidentiality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 border-emerald-500/20">
          <ServerOff className="w-8 h-8 text-emerald-500" />
          <h3 className="font-bold text-slate-900 dark:text-white">No Server Storage</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your files are never transmitted to our servers or any third-party infrastructure. All processing occurs locally on your CPU/GPU.
          </p>
        </Card>

        <Card className="p-6 space-y-3 border-cyan-500/20">
          <Database className="w-8 h-8 text-cyan-500" />
          <h3 className="font-bold text-slate-900 dark:text-white">No Database or Logs</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            SAICONVO has no database, no user accounts, and no logging of document contents, metadata, or filenames.
          </p>
        </Card>

        <Card className="p-6 space-y-3 border-violet-500/20">
          <EyeOff className="w-8 h-8 text-violet-500" />
          <h3 className="font-bold text-slate-900 dark:text-white">Immediate Cleanup</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All canvas contexts and Blob URLs are revoked when you convert another file or navigate away, freeing volatile browser RAM.
          </p>
        </Card>
      </div>

      <Card className="p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-500" />
          <span>Formal Commitments</span>
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-white">100% In-Browser Execution: </strong>
              The website loads standard HTML, JavaScript, and WebAssembly bundles into your browser. Once loaded, file conversions can even proceed without an active internet connection.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-white">No Tracking or Analytical Scraping: </strong>
              We do not inspect your images, optical character contents, or proprietary vector graphics.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-white">Full GDPR & HIPAA Compatibility: </strong>
              Because no data is transferred or retained on external computers, SAICONVO avoids third-party processor liabilities under global privacy frameworks.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

