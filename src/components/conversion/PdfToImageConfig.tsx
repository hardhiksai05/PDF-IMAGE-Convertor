import React from 'react';
import { PdfToImageSettings, ImageFormat, DpiResolution, QualityLevel } from '../../types/conversion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Settings2, ArrowRight, CheckCheck, XSquare } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PdfToImageConfigProps {
  settings: PdfToImageSettings;
  onChange: (updated: Partial<PdfToImageSettings>) => void;
  totalPages: number;
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onConvert: () => void;
  isConverting: boolean;
}

export const PdfToImageConfig: React.FC<PdfToImageConfigProps> = ({
  settings,
  onChange,
  totalPages,
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onConvert,
  isConverting,
}) => {
  const formats: { value: ImageFormat; label: string; desc: string }[] = [
    { value: 'jpg', label: 'JPG', desc: 'Smaller size, universal compatibility' },
    { value: 'png', label: 'PNG', desc: 'Lossless quality, sharp text & diagrams' },
    { value: 'webp', label: 'WebP', desc: 'Modern web format, superior compression' },
  ];

  const dpis: { value: DpiResolution; label: string; badge: string }[] = [
    { value: 72, label: '72 DPI', badge: 'Fast Web' },
    { value: 150, label: '150 DPI', badge: 'Standard' },
    { value: 200, label: '200 DPI', badge: 'High Quality' },
    { value: 300, label: '300 DPI', badge: 'Print Ultra HD' },
  ];

  const qualities: { value: QualityLevel; label: string }[] = [
    { value: 'low', label: 'Draft' },
    { value: 'medium', label: 'Balanced' },
    { value: 'high', label: 'Maximum' },
  ];

  return (
    <Card className="p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-violet-500" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Conversion Settings
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
          {selectedCount} of {totalPages} Pages Selected
        </span>
      </div>

      {/* Format Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Target Image Format
        </label>
        <div className="grid grid-cols-3 gap-2">
          {formats.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => onChange({ format: f.value })}
              className={cn(
                'p-3 rounded-xl border text-left transition-all',
                settings.format === f.value
                  ? 'border-violet-600 bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/40'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
              )}
            >
              <div className="font-bold text-sm">{f.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {f.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Resolution / DPI */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Resolution (DPI)
          </label>
          <span className="text-xs text-slate-400">
            Higher DPI = higher clarity & larger files
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dpis.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => onChange({ dpi: d.value })}
              className={cn(
                'p-2.5 rounded-xl border text-center transition-all',
                settings.dpi === d.value
                  ? 'border-violet-600 bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/40 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              )}
            >
              <div className="text-sm font-semibold">{d.label}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{d.badge}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quality (for JPG and WebP) */}
      {settings.format !== 'png' && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Compression Quality
          </label>
          <div className="grid grid-cols-3 gap-2">
            {qualities.map((q) => (
              <button
                key={q.value}
                type="button"
                onClick={() => onChange({ quality: q.value })}
                className={cn(
                  'py-2 px-3 rounded-xl border text-center text-xs font-semibold transition-all',
                  settings.quality === q.value
                    ? 'border-violet-600 bg-violet-500/10 text-violet-600 dark:text-violet-300'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Output Filename */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Base Output Filename
        </label>
        <div className="flex rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-violet-500">
          <input
            type="text"
            value={settings.outputFilename}
            onChange={(e) => onChange({ outputFilename: e.target.value })}
            placeholder="document"
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none"
          />
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-2 text-xs font-mono text-slate-500 flex items-center">
            _page_001.{settings.format}
          </span>
        </div>
      </div>

      {/* Page Selection Controls */}
      <div className="pt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            leftIcon={<CheckCheck className="w-3.5 h-3.5" />}
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDeselectAll}
            leftIcon={<XSquare className="w-3.5 h-3.5" />}
          >
            Deselect All
          </Button>
        </div>
      </div>

      {/* Main Convert Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full text-base font-bold"
          onClick={onConvert}
          disabled={selectedCount === 0 || isConverting}
          isLoading={isConverting}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          {selectedCount === 0
            ? 'Select at least 1 page'
            : `Convert ${selectedCount} Page${selectedCount > 1 ? 's' : ''} to ${settings.format.toUpperCase()}`}
        </Button>
      </div>
    </Card>
  );
};

