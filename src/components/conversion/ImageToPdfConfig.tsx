import React from 'react';
import { 
  ImageToPdfSettings, 
  PageSize, 
  PageOrientation, 
  MarginOption, 
  ImageFitOption 
} from '../../types/conversion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Settings2, ArrowRight, Palette } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ImageToPdfConfigProps {
  settings: ImageToPdfSettings;
  onChange: (updated: Partial<ImageToPdfSettings>) => void;
  imageCount: number;
  onConvert: () => void;
  isConverting: boolean;
}

export const ImageToPdfConfig: React.FC<ImageToPdfConfigProps> = ({
  settings,
  onChange,
  imageCount,
  onConvert,
  isConverting,
}) => {
  const pageSizes: { value: PageSize; label: string; desc: string }[] = [
    { value: 'a4', label: 'A4', desc: '210 × 297 mm' },
    { value: 'a3', label: 'A3', desc: '297 × 420 mm' },
    { value: 'letter', label: 'US Letter', desc: '8.5 × 11 in' },
    { value: 'legal', label: 'US Legal', desc: '8.5 × 14 in' },
  ];

  const orientations: { value: PageOrientation; label: string }[] = [
    { value: 'auto', label: 'Automatic' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Landscape' },
  ];

  const margins: { value: MarginOption; label: string }[] = [
    { value: 'none', label: 'No Margin' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Standard' },
    { value: 'large', label: 'Large' },
  ];

  const fitOptions: { value: ImageFitOption; label: string; desc: string }[] = [
    { value: 'fit', label: 'Fit to Page', desc: 'Preserves entire image' },
    { value: 'fill', label: 'Fill Page', desc: 'Covers entire page' },
    { value: 'original', label: 'Original', desc: 'Maintains pixel scale' },
  ];

  const bgColors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Light Gray', hex: '#F1F5F9' },
    { name: 'Dark Navy', hex: '#0F172A' },
    { name: 'Black', hex: '#000000' },
  ];

  return (
    <Card className="p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-violet-500" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            PDF Document Settings
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          {imageCount} {imageCount === 1 ? 'Page' : 'Pages'}
        </span>
      </div>

      {/* Page Size */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Page Size
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {pageSizes.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange({ pageSize: p.value })}
              className={cn(
                'p-2.5 rounded-xl border text-center transition-all',
                settings.pageSize === p.value
                  ? 'border-violet-600 bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/40 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              )}
            >
              <div className="text-sm font-semibold">{p.label}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Page Orientation */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Orientation
        </label>
        <div className="grid grid-cols-3 gap-2">
          {orientations.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange({ orientation: o.value })}
              className={cn(
                'py-2 px-3 rounded-xl border text-center text-xs font-semibold transition-all',
                settings.orientation === o.value
                  ? 'border-violet-600 bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/40'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Margins & Fitting (Side by side on larger screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Margins */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Page Margins
          </label>
          <div className="grid grid-cols-2 gap-2">
            {margins.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => onChange({ margin: m.value })}
                className={cn(
                  'py-2 px-2.5 rounded-xl border text-center text-xs font-semibold transition-all',
                  settings.margin === m.value
                    ? 'border-violet-600 bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fitting */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Image Layout Fitting
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {fitOptions.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => onChange({ fit: f.value })}
                className={cn(
                  'p-2 rounded-xl border text-center text-xs font-semibold transition-all',
                  settings.fit === f.value
                    ? 'border-violet-600 bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page Background Color (for transparent PNGs) */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-violet-500" />
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Page Background Color
          </label>
        </div>
        <div className="flex items-center gap-3">
          {bgColors.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => onChange({ backgroundColor: color.hex })}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all',
                settings.backgroundColor.toUpperCase() === color.hex.toUpperCase()
                  ? 'border-violet-600 ring-2 ring-violet-500/30'
                  : 'border-slate-200 dark:border-slate-800'
              )}
            >
              <span
                className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600"
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Output Filename */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          PDF Output Filename
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
            .pdf
          </span>
        </div>
      </div>

      {/* Main Convert Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full text-base font-bold"
          onClick={onConvert}
          disabled={imageCount === 0 || isConverting}
          isLoading={isConverting}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          {imageCount === 0
            ? 'Add at least 1 image'
            : `Generate PDF Document (${imageCount} Page${imageCount > 1 ? 's' : ''})`}
        </Button>
      </div>
    </Card>
  );
};

