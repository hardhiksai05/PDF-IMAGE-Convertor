import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useConversionSession } from '../../context/ConversionContext';
import { ConvertedImageResult } from '../../types/conversion';
import { formatFileSize } from '../../utils/fileSize';
import { 
  downloadSingleImage, 
  downloadAllImagesAsZip, 
  downloadGeneratedPdf 
} from '../../services/downloadService';
import { PdfViewer } from '../preview/PdfViewer';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { 
  Download, 
  Archive, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft, 
  FileCheck, 
  Eye, 
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const ResultsWorkspace: React.FC = () => {
  const { session, clearSession } = useConversionSession();
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#06b6d4', '#3b82f6', '#10b981'],
      });
    } catch {
      // Ignore if canvas confetti not supported
    }
  }, []);

  if (!session) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <Card className="p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-500 mx-auto flex items-center justify-center">
            <Eye className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            No Active Conversion Results
          </h2>
          <p className="text-sm text-slate-500">
            Please select a conversion tool, upload your documents, and complete a conversion first.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="primary" onClick={() => navigate('/pdf-to-image')}>
              PDF to Image
            </Button>
            <Button variant="secondary" onClick={() => navigate('/image-to-pdf')}>
              Image to PDF
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isPdfToImage = session.mode === 'pdf-to-image';
  const images = session.pdfToImageResults || [];
  const pdfResult = session.imageToPdfResult;

  const activeImage: ConvertedImageResult | undefined = images[activeImageIndex];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
    setImageRotation(0);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageRotation(0);
  };

  const handleDownloadAllZip = async () => {
    if (images.length === 0) return;
    setIsZipping(true);
    setZipProgress(0);

    try {
      const baseName = session.sourceFilename.replace(/\.[^/.]+$/, '') + '_images';
      await downloadAllImagesAsZip(images, baseName, (p) => setZipProgress(p));
    } catch (err) {
      console.error('ZIP download error:', err);
      alert('Failed to generate ZIP archive: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsZipping(false);
    }
  };

  const handleStartOver = () => {
    const returnPath = session.mode === 'pdf-to-image' ? '/pdf-to-image' : '/image-to-pdf';
    clearSession();
    navigate(returnPath);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Conversion Complete
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Preview the converted file below. Click download whenever you are ready.
          </p>
        </div>

        {/* Global Action buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={handleStartOver}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Convert Another
          </Button>

          {isPdfToImage ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleDownloadAllZip}
              isLoading={isZipping}
              leftIcon={<Archive className="w-4 h-4" />}
            >
              {isZipping ? `Archiving (${zipProgress}%)...` : `Download All (ZIP)`}
            </Button>
          ) : (
            pdfResult && (
              <Button
                variant="primary"
                size="md"
                onClick={() => downloadGeneratedPdf(pdfResult)}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download PDF ({formatFileSize(pdfResult.size)})
              </Button>
            )
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {isPdfToImage ? (
        /* PDF to Image Results View */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Large Image Preview Workspace (Left 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-4 sm:p-6 bg-slate-900 border-slate-700/80 shadow-2xl flex flex-col">
              {/* Preview Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800 text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30">
                    Page {activeImage?.pageNumber} of {images.length}
                  </span>
                  <span className="text-sm font-semibold truncate max-w-[200px] sm:max-w-xs text-white">
                    {activeImage?.filename}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setImageZoom((z) => Math.max(0.5, Number((z - 0.2).toFixed(1))))}
                    aria-label="Zoom out image"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 min-w-[36px] text-center">
                    {Math.round(imageZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setImageZoom((z) => Math.min(2.5, Number((z + 0.2).toFixed(1))))}
                    aria-label="Zoom in image"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setImageRotation((r) => (r + 90) % 360)}
                    aria-label="Rotate image"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Viewport with prev/next buttons */}
              <div className="relative flex-1 min-h-[460px] bg-slate-950/70 rounded-xl overflow-hidden flex items-center justify-center p-4">
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      aria-label="Previous converted image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-900/80 hover:bg-violet-600 text-white shadow-xl transition-all z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      aria-label="Next converted image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-900/80 hover:bg-violet-600 text-white shadow-xl transition-all z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {activeImage ? (
                  <div
                    style={{
                      transform: `scale(${imageZoom}) rotate(${imageRotation}deg)`,
                      transition: 'transform 0.2s ease',
                    }}
                    className="max-w-full max-h-[600px] flex items-center justify-center select-none"
                  >
                    <img
                      src={activeImage.previewUrl}
                      alt={activeImage.filename}
                      className="max-w-full max-h-[580px] object-contain rounded shadow-2xl"
                    />
                  </div>
                ) : null}
              </div>

              {/* Converted Item Stats & Download Bar */}
              {activeImage && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>
                      Dimensions: <strong className="text-white">{activeImage.width} × {activeImage.height} px</strong>
                    </span>
                    <span>
                      Size: <strong className="text-white">{formatFileSize(activeImage.size)}</strong>
                    </span>
                    <span>
                      Format: <strong className="text-violet-400 uppercase">{activeImage.format}</strong>
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => downloadSingleImage(activeImage)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download Page {activeImage.pageNumber} ({activeImage.format.toUpperCase()})
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Thumbnail Gallery Sidebar (Right col) */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 flex flex-col h-full max-h-[660px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  All Output Files ({images.length})
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownloadAllZip}
                  className="text-xs text-violet-500 hover:text-violet-600 p-0 h-auto"
                >
                  ZIP All
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pt-3 pr-1">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setImageRotation(0);
                    }}
                    className={cn(
                      'p-2 rounded-xl border flex items-center gap-3 cursor-pointer transition-all',
                      activeImageIndex === idx
                        ? 'border-violet-600 bg-violet-500/10 dark:bg-violet-500/15 ring-1 ring-violet-500/40'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    )}
                  >
                    <div className="w-12 h-14 bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-0.5">
                      <img
                        src={img.previewUrl}
                        alt={`Thumb ${img.pageNumber}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        Page {img.pageNumber}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {formatFileSize(img.size)} • {img.format.toUpperCase()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadSingleImage(img);
                      }}
                      aria-label={`Download image for page ${img.pageNumber}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/40"
                      title="Download image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* Image to PDF Results View */
        <div className="space-y-6">
          {pdfResult && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main PDF Viewer */}
              <div className="lg:col-span-3">
                <PdfViewer
                  source={pdfResult.blob}
                  filename={pdfResult.filename}
                  className="min-h-[550px]"
                />
              </div>

              {/* PDF Details & Download Summary */}
              <div className="lg:col-span-1 space-y-4">
                <Card className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Generated PDF</h4>
                      <p className="text-xs text-slate-400">Ready for instant download</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                      <span className="text-slate-500">File Name</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]" title={pdfResult.filename}>
                        {pdfResult.filename}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                      <span className="text-slate-500">Total Pages</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {pdfResult.pageCount} Pages
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                      <span className="text-slate-500">File Size</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formatFileSize(pdfResult.size)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Processing</span>
                      <span className="font-semibold text-emerald-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Client-Side
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full font-bold shadow-lg shadow-violet-600/30"
                      onClick={() => downloadGeneratedPdf(pdfResult)}
                      leftIcon={<Download className="w-5 h-5" />}
                    >
                      Download PDF
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

