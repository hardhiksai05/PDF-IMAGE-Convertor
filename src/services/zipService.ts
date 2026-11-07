import JSZip from 'jszip';
import { ConvertedImageResult } from '../types/conversion';
import { sanitizeFilename } from '../utils/filename';

export async function createZipFromImages(
  images: ConvertedImageResult[],
  archiveName = 'converted_images',
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const zip = new JSZip();

  images.forEach((item) => {
    zip.file(item.filename, item.blob);
  });

  const cleanZipName = sanitizeFilename(archiveName);
  console.log(`Generating ZIP: ${cleanZipName}.zip with ${images.length} files`);

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      onProgress?.(Math.round(metadata.percent));
    }
  );

  return zipBlob;
}

