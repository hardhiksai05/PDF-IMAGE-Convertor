import { ConvertedImageResult, ConvertedPdfResult } from '../types/conversion';
import { triggerDownload } from '../utils/blob';
import { createZipFromImages } from './zipService';

export function downloadSingleImage(image: ConvertedImageResult): void {
  triggerDownload(image.blob, image.filename);
}

export async function downloadAllImagesAsZip(
  images: ConvertedImageResult[],
  zipFilename = 'converted_images',
  onProgress?: (percent: number) => void
): Promise<void> {
  const zipBlob = await createZipFromImages(images, zipFilename, onProgress);
  triggerDownload(zipBlob, `${zipFilename}.zip`);
}

export function downloadGeneratedPdf(pdfResult: ConvertedPdfResult): void {
  triggerDownload(pdfResult.blob, pdfResult.filename);
}

