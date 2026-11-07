import React, { useEffect, useRef, useState } from 'react';
import { loadPdfDocument, PDFDocumentProxy } from '../../services/pdfRenderer';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  RotateCw,
  Eye
} from 'lucide-react';
import { Button } from '../ui/Button';

interface PdfViewerProps {
  source: Blob | File | ArrayBuffer;
  filename: string;
  className?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ source, filename, className }) => {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  // Load PDF document
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    loadPdfDocument(source)
      .then((doc) => {
        if (!isCancelled) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setCurrentPage(1);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError('Failed to load PDF document: ' + (err.message || 'Unknown error'));
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [source]);

  // Render current page onto canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false;

    // Cancel ongoing render if any
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    pdfDoc.getPage(currentPage).then((page) => {
      if (isCancelled || !canvasRef.current) return;

      const viewport = page.getViewport({ scale, rotation });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Fill white background
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      renderTask.promise
        .then(() => {
          renderTaskRef.current = null;
        })
        .catch((err: any) => {
          if (err?.name !== 'RenderingCancelledException') {
            console.error('Page render error:', err);
          }
        });
    });

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, currentPage, scale, rotation]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(numPages, prev + 1));
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(3.0, Number((prev + 0.2).toFixed(1))));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.5, Number((prev - 0.2).toFixed(1))));
  };

  const handleFitWidth = () => {
    if (containerRef.current && canvasRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48;
      const currentCanvasWidth = canvasRef.current.width / scale;
      if (currentCanvasWidth > 0) {
        setScale(Number((containerWidth / currentCanvasWidth).toFixed(2)));
      }
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      } ${className || ''}`}
    >
      {/* Top Toolbar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-slate-200">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span className="text-xs sm:text-sm font-semibold truncate max-w-[200px] sm:max-w-xs text-white" title={filename}>
            {filename}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            Actual PDF Render
          </span>
        </div>

        {/* Page navigation controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || isLoading}
            className="px-2 py-1 h-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="text-xs font-mono text-slate-300 px-1">
            {currentPage} / {numPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= numPages || isLoading}
            className="px-2 py-1 h-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono text-slate-400 min-w-[42px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleFitWidth}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hidden sm:block"
            title="Fit to Container Width"
          >
            Fit Width
          </button>
          <button
            onClick={handleRotate}
            aria-label="Rotate view"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Rotate View"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Scrollable Canvas Viewport */}
      <div className="flex-1 p-6 overflow-auto flex items-center justify-center min-h-[420px] bg-slate-950/60">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">Rendering PDF page...</span>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="rounded-lg shadow-2xl transition-all max-w-full"
          />
        )}
      </div>
    </div>
  );
};

