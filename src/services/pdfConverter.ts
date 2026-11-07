import { PDFDocumentProxy, renderPageToCanvas } from './pdfRenderer';
import { ConvertedImageResult, PdfToImageSettings } from '../types/conversion';
import { createManagedObjectURL } from '../utils/blob';
import { formatPageNumber, sanitizeFilename } from '../utils/filename';

export interface ConvertPdfProgressCallback {
  (progress: {
    current: number;
    total: number;
    percentage: number;
    message: string;
  }): void;
}

const QUALITY_MAP = {
  low: 0.65,
  medium: 0.82,
  high: 0.96,
};

const MIME_MAP = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export async function convertPdfToImages(
  pdfDoc: PDFDocumentProxy,
  settings: PdfToImageSettings,
  onProgress?: ConvertPdfProgressCallback,
  signal?: AbortSignal
): Promise<ConvertedImageResult[]> {
  const totalDocPages = pdfDoc.numPages;
  const targetPages = settings.selectedPages && settings.selectedPages.length > 0
    ? settings.selectedPages.filter(p => p >= 1 && p <= totalDocPages).sort((a, b) => a - b)
    : Array.from({ length: totalDocPages }, (_, i) => i + 1);

  const totalPagesToConvert = targetPages.length;
  if (totalPagesToConvert === 0) {
    throw new Error('No valid pages selected for conversion.');
  }

  const results: ConvertedImageResult[] = [];
  const quality = QUALITY_MAP[settings.quality] || 0.85;
  const mimeType = MIME_MAP[settings.format] || 'image/jpeg';
  const cleanBaseName = sanitizeFilename(settings.outputFilename || 'document');

  for (let i = 0; i < totalPagesToConvert; i++) {
    if (signal?.aborted) {
      throw new Error('Conversion cancelled by user.');
    }

    const pageNum = targetPages[i];
    const progressPercent = Math.round(((i) / totalPagesToConvert) * 100);

    onProgress?.({
      current: i + 1,
      total: totalPagesToConvert,
      percentage: progressPercent,
      message: `Rendering page ${pageNum} of ${totalDocPages} (${i + 1}/${totalPagesToConvert})...`,
    });

    // Render the page to a canvas with chosen DPI
    const canvas = await renderPageToCanvas(pdfDoc, pageNum, settings.dpi);

    if (signal?.aborted) {
      canvas.width = 0;
      canvas.height = 0;
      throw new Error('Conversion cancelled by user.');
    }

    // Convert canvas to real Blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error(`Failed to encode page ${pageNum} to ${settings.format}`));
        },
        mimeType,
        quality
      );
    });

    const pageStr = formatPageNumber(pageNum, totalDocPages);
    const filename = `${cleanBaseName}_page_${pageStr}.${settings.format}`;
    const previewUrl = createManagedObjectURL(blob);

    results.push({
      id: `img-page-${pageNum}-${Date.now()}-${i}`,
      pageNumber: pageNum,
      blob,
      previewUrl,
      filename,
      width: canvas.width,
      height: canvas.height,
      size: blob.size,
      format: settings.format,
    });

    // Free canvas memory immediately
    canvas.width = 0;
    canvas.height = 0;

    // Small yield to UI thread to keep animations and progress smooth
    await new Promise((r) => setTimeout(r, 10));
  }

  onProgress?.({
    current: totalPagesToConvert,
    total: totalPagesToConvert,
    percentage: 100,
    message: 'All pages converted successfully!',
  });

  return results;
}

