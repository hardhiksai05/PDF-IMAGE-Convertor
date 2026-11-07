import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero3D } from '../components/hero/Hero3D';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  FileText, 
  Image as ImageIcon, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  Eye, 
  Download, 
  Archive, 
  Sparkles,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickDrop = (type: 'pdf' | 'image', e: React.DragEvent) => {
    e.preventDefault();
    if (type === 'pdf') {
      navigate('/pdf-to-image');
    } else {
      navigate('/image-to-pdf');
    }
  };

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/15 via-purple-600/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Gen Browser Document Processing</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Convert Your Files.{' '}
                <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Without Complications.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Convert PDF pages into high-quality images or combine your images into a PDF. Fast, simple, and 100% private.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/pdf-to-image')}
                  leftIcon={<ImageIcon className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto text-base shadow-xl shadow-violet-600/30"
                >
                  PDF to Image
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/image-to-pdf')}
                  leftIcon={<FileText className="w-5 h-5 text-cyan-500" />}
                  className="w-full sm:w-auto text-base"
                >
                  Image to PDF
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>No Server Uploads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant Client Speed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-cyan-500" />
                  <span>No Registration Needed</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Scene / Interactive Visual */}
            <div className="lg:col-span-5 relative">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRIMARY CONVERSION TOOL CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-violet-500 dark:text-violet-400">
            Dedicated Workspaces
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Choose Your Conversion Path
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: PDF to Image */}
          <Card
            hoverGlow
            className="p-8 sm:p-10 flex flex-col justify-between group relative overflow-hidden border-violet-500/20"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleQuickDrop('pdf', e)}
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-violet-500">
                  Tool 01
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  PDF to Image Converter
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                  Extract PDF pages into JPG, PNG or WebP. Choose custom resolutions from 72 up to 300 DPI, preview individual pages, and download as single images or an organized ZIP archive.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  JPG / PNG / WebP
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  72 to 300 DPI
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  ZIP Download
                </span>
              </div>
            </div>

            <div className="pt-8">
              <Button
                variant="primary"
                size="md"
                className="w-full font-bold group-hover:shadow-violet-600/40"
                onClick={() => navigate('/pdf-to-image')}
                rightIcon={<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              >
                Launch PDF to Image
              </Button>
            </div>
          </Card>

          {/* Card 2: Image to PDF */}
          <Card
            hoverGlow
            className="p-8 sm:p-10 flex flex-col justify-between group relative overflow-hidden border-cyan-500/20"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleQuickDrop('image', e)}
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                <FileText className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Tool 02
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Image to PDF Converter
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                  Combine multiple images into one professional PDF. Reorder pages with drag and drop, rotate orientations, configure A4/A3/Letter page sizes, margins, and custom fitting.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  Multi-Image Upload
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  Drag & Drop Sort
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  A4 / Letter / Margins
                </span>
              </div>
            </div>

            <div className="pt-8">
              <Button
                variant="secondary"
                size="md"
                className="w-full font-bold hover:border-cyan-500/50"
                onClick={() => navigate('/image-to-pdf')}
                rightIcon={<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              >
                Launch Image to PDF
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CORE PRODUCT PHILOSOPHY & WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Deterministic Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              UPLOAD → CONFIGURE → CONVERT → PREVIEW → DOWNLOAD
            </h2>
            <p className="text-sm text-slate-400">
              Never get stuck with blind downloads. SAICONVO always renders your actual document output before saving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {[
              { step: '01', title: 'Upload', desc: 'Drag and drop PDF or images. Safe local inspection.', icon: Layers },
              { step: '02', title: 'Configure', desc: 'Select DPI, format, margins, page order, or rotation.', icon: Sliders },
              { step: '03', title: 'Convert', desc: 'Browser WebAssembly & Canvas engine processes locally.', icon: Zap },
              { step: '04', title: 'Preview', desc: 'Inspect every generated image or PDF page before saving.', icon: Eye },
              { step: '05', title: 'Download', desc: 'Save single images, bulk ZIP, or structured PDF.', icon: Download },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-violet-400">{s.step}</span>
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="font-bold text-base text-white">{s.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest font-extrabold text-violet-500">
            Engineered For Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Built for Privacy, Precision, & Speed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">100% Client-Side Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your confidential documents never upload to remote servers. All rendering and assembling happens directly inside your browser sandbox.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Zero Fake Previews</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              The preview workspace renders the exact Blob generated during conversion using PDF.js and canvas memory. What you see is what you download.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <Archive className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Smart ZIP Packaging</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Download individual pages with a single click or export all converted pages into a clean, defect-free ZIP archive with proper file naming.
            </p>
          </Card>
        </div>
      </section>

      {/* 5. PRIVACY SECTION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-900/30 via-slate-900 to-cyan-950/30 border border-violet-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>Zero-Knowledge Architecture</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              No accounts. No subscriptions. No cloud leaks.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              SAICONVO does not record telemetry on your files or hold cookies. Once you close your browser tab, all temporary memory objects are freed.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/privacy')}
            className="text-white border-white/20 hover:bg-white/10"
          >
            Read Privacy Architecture
          </Button>
        </div>
      </section>
    </div>
  );
};
