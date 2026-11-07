import React from 'react';
import { Check, ZoomIn } from 'lucide-react';
import { PdfPageMeta } from '../../types/file';
import { cn } from '../../utils/cn';

interface PdfPageCardProps {
  page: PdfPageMeta;
  onToggleSelect: (pageNumber: number) => void;
  onZoom: (page: PdfPageMeta) => void;
}

export const PdfPageCard: React.FC<PdfPageCardProps> = ({
  page,
  onToggleSelect,
  onZoom,
}) => {
  return (
    <div
      onClick={() => onToggleSelect(page.pageNumber)}
      className={cn(
        'group relative rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col bg-white dark:bg-slate-900 shadow-md',
        page.isSelected
          ? 'border-violet-600 ring-2 ring-violet-500/30 shadow-violet-500/10'
          : 'border-slate-200 dark:border-slate-800 opacity-65 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700'
      )}
    >
      {/* Top Header bar */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Page {page.pageNumber}
        </span>

        <div className="flex items-center gap-1.5">
          {/* Zoom button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onZoom(page);
            }}
            aria-label={`Enlarge preview of page ${page.pageNumber}`}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Checkbox indicator */}
          <div
            className={cn(
              'w-5 h-5 rounded-md flex items-center justify-center transition-all',
              page.isSelected
                ? 'bg-violet-600 text-white'
                : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
            )}
          >
            {page.isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>
      </div>

      {/* Thumbnail area */}
      <div className="relative aspect-[3/4] p-3 flex items-center justify-center bg-slate-100/50 dark:bg-slate-950/60 overflow-hidden">
        {page.thumbnailUrl ? (
          <img
            src={page.thumbnailUrl}
            alt={`Page ${page.pageNumber}`}
            className="w-full h-full object-contain rounded shadow-sm group-hover:scale-[1.02] transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mb-2" />
            <span>Rendering...</span>
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="px-3 py-1.5 text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 flex justify-between bg-white dark:bg-slate-900">
        <span>{Math.round(page.width)} × {Math.round(page.height)} pt</span>
      </div>
    </div>
  );
};

