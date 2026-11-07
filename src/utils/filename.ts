export function sanitizeFilename(name: string): string {
  // Remove dangerous path characters and control chars
  return name.replace(/[/\\?%*:|"<>]/g, '_').trim() || 'document';
}

export function getBaseName(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return filename;
  return filename.substring(0, lastDot);
}

export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.substring(lastDot + 1).toLowerCase();
}

export function formatPageNumber(pageNumber: number, totalPages: number): string {
  const padding = totalPages >= 100 ? 3 : totalPages >= 10 ? 2 : 2;
  return String(pageNumber).padStart(padding, '0');
}

