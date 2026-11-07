import { PDFDocument, rgb } from 'pdf-lib';
import { ImageSourceItem } from '../types/file';
import { ConvertedPdfResult, ImageToPdfSettings, PageSize } from '../types/conversion';
import { createManagedObjectURL } from '../utils/blob';
import { sanitizeFilename } from '../utils/filename';

export interface ConvertImageProgressCallback {
  (progress: {
    current: number;
    total: number;
    percentage: number;
    message: string;
  }): void;
}

const PAGE_DIMENSIONS: Record<PageSize, [number, number]> = {
  a4: [595.28, 841.89],
  a3: [841.89, 1190.55],
  letter: [612.0, 792.0],
  legal: [612.0, 1008.0],
};

const MARGIN_VALUES = {
  none: 0,
  small: 18,
  medium: 36,
  large: 54,
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  if (isNaN(bigint)) return { r: 1, g: 1, b: 1 };
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}

/**
 * Preprocesses an image onto an offscreen canvas to handle:
 * 1. Rotation (90, 180, 270 deg)
 * 2. Background color fill for transparency
 * 3. Format conversion if WebP -> PNG or JPEG for pdf-lib compatibility
 */
async function processImageForPdf(
  item: ImageSourceItem,
  backgroundColor: string
): Promise<{ buffer: ArrayBuffer; isPng: boolean; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const rotation = ((item.rotation % 360) + 360) % 360;
      const isRotated90or270 = rotation === 90 || rotation === 270;

      const destWidth = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
      const destHeight = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

      const canvas = document.createElement('canvas');
      canvas.width = destWidth;
      canvas.height = destHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to create 2D context for image processing'));
        return;
      }

      // Draw background color
      ctx.fillStyle = backgroundColor || '#FFFFFF';
      ctx.fillRect(0, 0, destWidth, destHeight);

      // Apply transformations
      ctx.save();
      ctx.translate(destWidth / 2, destHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx.restore();

      // Export as PNG if original was PNG, otherwise high-quality JPEG
      const isPng = item.type === 'image/png';
      const exportType = isPng ? 'image/png' : 'image/jpeg';
      const exportQuality = isPng ? undefined : 0.95;

      canvas.toBlob(
        async (blob) => {
          canvas.width = 0;
          canvas.height = 0;
          if (!blob) {
            reject(new Error(`Failed to encode image ${item.name}`));
            return;
          }
          const buffer = await blob.arrayBuffer();
          resolve({ buffer, isPng, width: destWidth, height: destHeight });
        },
        exportType,
        exportQuality
      );
    };

    img.onerror = () => reject(new Error(`Failed to load image "${item.name}" for conversion`));
    img.src = item.previewUrl;
  });
}

export async function convertImagesToPdf(
  images: ImageSourceItem[],
  settings: ImageToPdfSettings,
  onProgress?: ConvertImageProgressCallback,
  signal?: AbortSignal
): Promise<ConvertedPdfResult> {
  if (!images || images.length === 0) {
    throw new Error('No images selected for PDF generation.');
  }

  const pdfDoc = await PDFDocument.create();
  const total = images.length;
  const marginPt = MARGIN_VALUES[settings.margin] ?? 0;
  const bgRgb = hexToRgb(settings.backgroundColor || '#FFFFFF');

  for (let i = 0; i < total; i++) {
    if (signal?.aborted) {
      throw new Error('Conversion cancelled by user.');
    }

    const item = images[i];
    const progressPercent = Math.round(((i) / total) * 100);

    onProgress?.({
      current: i + 1,
      total,
      percentage: progressPercent,
      message: `Processing image ${i + 1} of ${total}: ${item.name}...`,
    });

    // Process rotation, background fill, format conversion
    const { buffer, isPng, width: imgW, height: imgH } = await processImageForPdf(
      item,
      settings.backgroundColor
    );

    if (signal?.aborted) {
      throw new Error('Conversion cancelled by user.');
    }

    // Embed in PDF
    const embeddedImage = isPng
      ? await pdfDoc.embedPng(buffer)
      : await pdfDoc.embedJpg(buffer);

    // Determine base dimensions for page
    let [baseW, baseH] = PAGE_DIMENSIONS[settings.pageSize] || PAGE_DIMENSIONS.a4;

    // Apply orientation
    if (settings.orientation === 'landscape') {
      if (baseW < baseH) [baseW, baseH] = [baseH, baseW];
    } else if (settings.orientation === 'portrait') {
      if (baseW > baseH) [baseW, baseH] = [baseH, baseW];
    } else if (settings.orientation === 'auto') {
      // Automatic based on image aspect ratio
      const isImgLandscape = imgW > imgH;
      const isPageLandscape = baseW > baseH;
      if (isImgLandscape !== isPageLandscape) {
        [baseW, baseH] = [baseH, baseW];
      }
    }

    const page = pdfDoc.addPage([baseW, baseH]);

    // Optional fill page background
    page.drawRectangle({
      x: 0,
      y: 0,
      width: baseW,
      height: baseH,
      color: rgb(bgRgb.r, bgRgb.g, bgRgb.b),
    });

    // Usable printable area
    const printableW = Math.max(10, baseW - 2 * marginPt);
    const printableH = Math.max(10, baseH - 2 * marginPt);

    let drawW = printableW;
    let drawH = printableH;
    let drawX = marginPt;
    let drawY = marginPt;

    const imgAspect = imgW / imgH;
    const printableAspect = printableW / printableH;

    if (settings.fit === 'fit') {
      if (imgAspect > printableAspect) {
        // Image is wider than printable area
        drawW = printableW;
        drawH = printableW / imgAspect;
        drawX = marginPt;
        drawY = marginPt + (printableH - drawH) / 2;
      } else {
        // Image is taller than printable area
        drawH = printableH;
        drawW = printableH * imgAspect;
        drawX = marginPt + (printableW - drawW) / 2;
        drawY = marginPt;
      }
    } else if (settings.fit === 'fill') {
      if (imgAspect > printableAspect) {
        drawH = printableH;
        drawW = printableH * imgAspect;
        drawX = marginPt - (drawW - printableW) / 2;
        drawY = marginPt;
      } else {
        drawW = printableW;
        drawH = printableW / imgAspect;
        drawX = marginPt;
        drawY = marginPt - (drawH - printableH) / 2;
      }
    } else if (settings.fit === 'original') {
      // 1 image point = 1 PDF point (72 DPI)
      drawW = imgW;
      drawH = imgH;
      if (drawW > printableW || drawH > printableH) {
        // Scale down to fit if exceeds page
        const scale = Math.min(printableW / drawW, printableH / drawH);
        drawW *= scale;
        drawH *= scale;
      }
      drawX = marginPt + (printableW - drawW) / 2;
      drawY = marginPt + (printableH - drawH) / 2;
    }

    page.drawImage(embeddedImage, {
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
    });

    // Small yield to UI thread
    await new Promise((r) => setTimeout(r, 10));
  }

  onProgress?.({
    current: total,
    total,
    percentage: 95,
    message: 'Finalizing PDF document...',
  });

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  const previewUrl = createManagedObjectURL(pdfBlob);

  const cleanBaseName = sanitizeFilename(settings.outputFilename || 'converted_document');
  const filename = `${cleanBaseName}.pdf`;

  onProgress?.({
    current: total,
    total,
    percentage: 100,
    message: 'PDF generated successfully!',
  });

  return {
    blob: pdfBlob,
    previewUrl,
    filename,
    size: pdfBlob.size,
    pageCount: total,
  };
}

