export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const MAX_PDF_SIZE_MB = 50;
export const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

export const MAX_IMAGES_COUNT = 50;
export const MAX_IMAGE_SIZE_MB = 20;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export async function validatePdfFile(file: File): Promise<ValidationResult> {
  if (!file) {
    return { isValid: false, error: 'No file selected.' };
  }

  // Size check
  if (file.size === 0) {
    return { isValid: false, error: 'The selected file is empty (0 bytes).' };
  }
  if (file.size > MAX_PDF_SIZE_BYTES) {
    return { 
      isValid: false, 
      error: `File exceeds maximum allowed size of ${MAX_PDF_SIZE_MB}MB (${(file.size / (1024 * 1024)).toFixed(1)}MB).` 
    };
  }

  // Check extension or mime
  const fileNameLower = file.name.toLowerCase();
  if (!fileNameLower.endsWith('.pdf') && file.type !== 'application/pdf') {
    return { isValid: false, error: 'Invalid file type. Please upload a valid .pdf document.' };
  }

  // Verify magic bytes (%PDF-)
  try {
    const slice = file.slice(0, 5);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const header = String.fromCharCode(...bytes);
    if (!header.startsWith('%PDF-')) {
      return { isValid: false, error: 'The file header is corrupted or not a valid PDF.' };
    }
  } catch (err) {
    return { isValid: false, error: 'Could not read PDF file header: ' + (err instanceof Error ? err.message : 'Unknown error') };
  }

  return { isValid: true };
}

export function validateImageFile(file: File): ValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file selected.' };
  }

  if (file.size === 0) {
    return { isValid: false, error: `Image "${file.name}" is empty.` };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { 
      isValid: false, 
      error: `Image "${file.name}" exceeds the ${MAX_IMAGE_SIZE_MB}MB limit.` 
    };
  }

  const fileNameLower = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const hasValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));
  const hasValidMime = SUPPORTED_IMAGE_TYPES.includes(file.type);

  if (!hasValidExt && !hasValidMime) {
    return { 
      isValid: false, 
      error: `Unsupported image format for "${file.name}". Only JPG, PNG, and WebP are supported.` 
    };
  }

  return { isValid: true };
}

