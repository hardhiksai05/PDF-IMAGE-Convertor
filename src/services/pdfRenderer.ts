import * as pdfjsLib from 'pdfjs-dist';
import { PdfPageMeta } from '../types/file';

// Ensure worker is configured from the local public directory
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export type PDFDocumentProxy = pdfjsLib.PDFDocumentProxy;
export type PDFPageProxy = pdfjsLib.PDFPageProxy;

/**
 * Loads a PDF document from File, Blob, or ArrayBuffer
 */
export async function loadPdfDocument(source: File | Blob | ArrayBuffer): Promise<PDFDocumentProxy> {
  let arrayBuffer: ArrayBuffer;
  if (source instanceof ArrayBuffer) {
    arrayBuffer = source;
  } else {
    arrayBuffer = await source.arrayBuffer();
  }

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
  });

  return await loadingTask.promise;
}

/**
 * Extracts metadata for all pages of a PDF document
 */
export async function getPdfPagesMetadata(pdfDoc: PDFDocumentProxy): Promise<PdfPageMeta[]> {
  const numPages = pdfDoc.numPages;
  const pages: PdfPageMeta[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: 1.0 });
    pages.push({
      pageNumber: i,
      width: viewport.width,
      height: viewport.height,
      aspectRatio: viewport.width / viewport.height,
      isSelected: true,
    });
  }

  return pages;
}

/**
 * Renders a thumbnail data URL for a specific page with size capping
 */
export async function renderPageThumbnail(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  maxWidth = 260
): Promise<string> {
  const page = await pdfDoc.getPage(pageNumber);
  const unscaledViewport = page.getViewport({ scale: 1.0 });
  const scale = maxWidth / unscaledViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const context = canvas.getContext('2d', { alpha: false });
  if (!context) {
    throw new Error('Failed to obtain 2D canvas context');
  }

  // Draw white background
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

  // Clean canvas
  canvas.width = 0;
  canvas.height = 0;

  return dataUrl;
}

/**
 * Render a page at full resolution based on DPI
 * Standard screen DPI is 72, so scale = targetDpi / 72
 */
export async function renderPageToCanvas(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  targetDpi = 150
): Promise<HTMLCanvasElement> {
  const page = await pdfDoc.getPage(pageNumber);
  const scale = targetDpi / 72;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const context = canvas.getContext('2d', { alpha: false });
  if (!context) {
    throw new Error('Failed to obtain 2D canvas context');
  }

  // Draw white background
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;
  return canvas;
}

