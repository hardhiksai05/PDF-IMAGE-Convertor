import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropzone } from '../components/upload/Dropzone';
import { PdfPageCard } from '../components/preview/PdfPageCard';
import { PdfToImageConfig } from '../components/conversion/PdfToImageConfig';
import { ProgressModal } from '../components/conversion/ProgressModal';
import { ZoomModal } from '../components/preview/ZoomModal';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { validatePdfFile } from '../services/fileValidation';
import { loadPdfDocument, getPdfPagesMetadata, renderPageThumbnail, PDFDocumentProxy } from '../services/pdfRenderer';
import { convertPdfToImages } from '../services/pdfConverter';
import { useConversionSession } from '../context/ConversionContext';
import { PdfFileInfo, PdfPageMeta } from '../types/file';
import { PdfToImageSettings, ConversionProgress } from '../types/conversion';
import { formatFileSize } from '../utils/fileSize';
import { getBaseName } from '../utils/filename';
import { generateSamplePdfFile } from '../utils/sampleDocuments';
import { 
  FileText, 
  Trash2, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';

export const PdfToImage: React.FC = () => {
  const navigate = useNavigate();
  const { setSession } = useConversionSession();

  const [pdfInfo, setPdfInfo] = useState<PdfFileInfo | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [zoomedPage, setZoomedPage] = useState<PdfPageMeta | null>(null);

  // Conversion settings state
  const [settings, setSettings] = useState<PdfToImageSettings>({
    format: 'jpg',
    dpi: 150,
    quality: 'medium',
    outputFilename: '',
    selectedPages: [],
  });

  // Conversion progress state
  const [progress, setProgress] = useState<ConversionProgress>({
    isConverting: false,
    stage: 'preparing',
    current: 0,
    total: 0,
    message: '',
    percentage: 0,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Handle uploaded PDF file
  const handlePdfSelected = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setErrorMessage(null);
    setIsLoadingPdf(true);

    // Validate file
    const validation = await validatePdfFile(file);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid PDF file.');
      setIsLoadingPdf(false);
      return;
    }

    try {
      const doc = await loadPdfDocument(file);
      const pagesMeta = await getPdfPagesMetadata(doc);

      setPdfDoc(doc);
      setPdfInfo({
        file,
        name: file.name,
        size: file.size,
        pageCount: doc.numPages,
        pages: pagesMeta,
      });

      setSettings((prev) => ({
        ...prev,
        outputFilename: getBaseName(file.name),
        selectedPages: pagesMeta.map((p) => p.pageNumber),
      }));

      setIsLoadingPdf(false);

      // Progressively load thumbnails
      for (let i = 0; i < pagesMeta.length; i++) {
        const pageNum = pagesMeta[i].pageNumber;
        renderPageThumbnail(doc, pageNum, 260)
          .then((thumbUrl) => {
            setPdfInfo((prev) => {
              if (!prev) return null;
              const updatedPages = prev.pages.map((p) =>
                p.pageNumber === pageNum ? { ...p, thumbnailUrl: thumbUrl } : p
              );
              return { ...prev, pages: updatedPages };
            });
          })
          .catch((err) => {
            console.error(`Failed to generate thumb for page ${pageNum}:`, err);
          });
      }
    } catch (err: any) {
      console.error('Failed to load PDF document:', err);
      if (err?.name === 'PasswordException') {
        setErrorMessage('This PDF is password protected. Please unlock it before converting.');
      } else {
        setErrorMessage('Could not process PDF. The document may be corrupted or encrypted.');
      }
      setIsLoadingPdf(false);
    }
  };

  const handleTogglePageSelect = (pageNumber: number) => {
    if (!pdfInfo) return;
    const updatedPages = pdfInfo.pages.map((p) =>
      p.pageNumber === pageNumber ? { ...p, isSelected: !p.isSelected } : p
    );
    setPdfInfo({ ...pdfInfo, pages: updatedPages });

    const selected = updatedPages.filter((p) => p.isSelected).map((p) => p.pageNumber);
    setSettings((prev) => ({ ...prev, selectedPages: selected }));
  };

  const handleSelectAll = () => {
    if (!pdfInfo) return;
    const updatedPages = pdfInfo.pages.map((p) => ({ ...p, isSelected: true }));
    setPdfInfo({ ...pdfInfo, pages: updatedPages });
    setSettings((prev) => ({
      ...prev,
      selectedPages: updatedPages.map((p) => p.pageNumber),
    }));
  };

  const handleDeselectAll = () => {
    if (!pdfInfo) return;
    const updatedPages = pdfInfo.pages.map((p) => ({ ...p, isSelected: false }));
    setPdfInfo({ ...pdfInfo, pages: updatedPages });
    setSettings((prev) => ({ ...prev, selectedPages: [] }));
  };

  const handleClearPdf = () => {
    setPdfDoc(null);
    setPdfInfo(null);
    setErrorMessage(null);
  };

  // Run actual conversion
  const handleConvert = async () => {
    if (!pdfDoc || !pdfInfo) return;

    abortControllerRef.current = new AbortController();

    setProgress({
      isConverting: true,
      stage: 'rendering',
      current: 0,
      total: settings.selectedPages.length,
      message: 'Starting conversion...',
      percentage: 0,
    });

    try {
      const results = await convertPdfToImages(
        pdfDoc,
        settings,
        (p) => {
          setProgress((prev) => ({
            ...prev,
            current: p.current,
            total: p.total,
            percentage: p.percentage,
            message: p.message,
          }));
        },
        abortControllerRef.current.signal
      );

      // Save to conversion context session
      setSession({
        mode: 'pdf-to-image',
        sourceFilename: pdfInfo.name,
        pdfToImageResults: results,
        timestamp: Date.now(),
      });

      // Automatically navigate to Results workspace
      navigate('/results');
    } catch (err: any) {
      if (err.message?.includes('cancelled')) {
        setProgress({
          isConverting: false,
          stage: 'complete',
          current: 0,
          total: 0,
          message: '',
          percentage: 0,
        });
      } else {
        console.error('Conversion error:', err);
        setProgress((prev) => ({
          ...prev,
          stage: 'error',
          error: err.message || 'An unexpected error occurred during conversion.',
        }));
      }
    }
  };

  const handleCancelConversion = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setProgress((prev) => ({ ...prev, isConverting: false, stage: 'complete' }));
  };

  const selectedPagesCount = pdfInfo?.pages.filter((p) => p.isSelected).length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>High-DPI PDF to Image Converter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Convert PDF to High-Quality Images
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Extract every page or selected pages into JPG, PNG, or WebP images with full resolution control.
        </p>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step 1: Upload Dropzone (When no PDF is loaded) */}
      {!pdfInfo && (
        <div className="max-w-3xl mx-auto">
          {isLoadingPdf ? (
            <Card className="p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-3 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Reading PDF Document...
                </h3>
                <p className="text-xs text-slate-400">
                  Parsing pages and generating previews safely in browser memory.
                </p>
              </div>
            </Card>
          ) : (
            <Dropzone
              onFilesSelected={handlePdfSelected}
              accept=".pdf,application/pdf"
              multiple={false}
              title="Upload your PDF Document"
              subtitle="Drag & drop your PDF here, or click to browse. Max size 50 MB."
              formatsLabel="PDF (.pdf)"
              maxSizeLabel="50 MB"
              onLoadSample={async () => {
                const sampleFile = await generateSamplePdfFile();
                handlePdfSelected([sampleFile]);
              }}
              sampleButtonLabel="Try Sample Report (3 Pages)"
            />
          )}
        </div>
      )}

      {/* Step 2 & 3: PDF Loaded Workspace (Gallery & Configuration) */}
      {pdfInfo && (
        <div className="space-y-6">
          {/* File summary bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold text-xs border border-violet-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md" title={pdfInfo.name}>
                  {pdfInfo.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {pdfInfo.pageCount} Pages • {formatFileSize(pdfInfo.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearPdf}
                leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-400" />}
                className="hover:border-red-500/50 hover:text-red-400"
              >
                Choose Different PDF
              </Button>
            </div>
          </div>

          {/* Grid Layout: Config Sidebar (Right on desktop) & Page Gallery (Left on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Page Gallery (2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Document Pages</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {pdfInfo.pageCount}
                  </span>
                </h3>
                <span className="text-xs text-slate-400">
                  Click pages to toggle selection for conversion
                </span>
              </div>

              {/* Responsive Page Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-h-[720px] overflow-y-auto p-1">
                {pdfInfo.pages.map((page) => (
                  <PdfPageCard
                    key={page.pageNumber}
                    page={page}
                    onToggleSelect={handleTogglePageSelect}
                    onZoom={(p) => setZoomedPage(p)}
                  />
                ))}
              </div>
            </div>

            {/* Conversion Config Sidebar (1 column) */}
            <div className="lg:col-span-1 sticky top-20">
              <PdfToImageConfig
                settings={settings}
                onChange={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
                totalPages={pdfInfo.pageCount}
                selectedCount={selectedPagesCount}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onConvert={handleConvert}
                isConverting={progress.isConverting}
              />
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={progress.isConverting || progress.stage === 'error'}
        percentage={progress.percentage}
        message={progress.message}
        current={progress.current}
        total={progress.total}
        stage={progress.stage}
        error={progress.error}
        onCancel={handleCancelConversion}
        onRetry={handleConvert}
      />

      {/* Zoom Modal for Page Inspection */}
      <ZoomModal
        page={zoomedPage}
        onClose={() => setZoomedPage(null)}
      />
    </div>
  );
};
