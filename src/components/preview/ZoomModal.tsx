import React from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { PdfPageMeta } from '../../types/file';
import { Button } from '../ui/Button';

interface ZoomModalProps {
  page: PdfPageMeta | null;
  onClose: () => void;
}

export const ZoomModal: React.FC<ZoomModalProps> = ({ page, onClose }) => {
  const [scale, setScale] = React.useState(1);

  if (!page) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-sm">Page {page.pageNumber} Preview</h3>
            <span className="text-xs text-slate-400">
              {Math.round(page.width)} × {Math.round(page.height)} pt
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
              aria-label="Zoom out page preview"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 min-w-[36px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
              aria-label="Zoom in page preview"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              aria-label="Close zoom preview modal"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500 text-slate-300 hover:text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-slate-950/70">
          <img
            src={page.thumbnailUrl}
            alt={`Page ${page.pageNumber}`}
            style={{ transform: `scale(${scale})`, transition: 'transform 0.15s ease' }}
            className="max-w-full max-h-[70vh] object-contain rounded shadow-2xl"
          />
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

