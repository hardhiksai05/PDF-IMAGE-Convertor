const activeObjectUrls = new Set<string>();

export function createManagedObjectURL(blob: Blob): string {
  const url = URL.createObjectURL(blob);
  activeObjectUrls.add(url);
  return url;
}

export function revokeManagedObjectURL(url: string | null | undefined): void {
  if (url && activeObjectUrls.has(url)) {
    URL.revokeObjectURL(url);
    activeObjectUrls.delete(url);
  }
}

export function revokeAllManagedObjectURLs(): void {
  activeObjectUrls.forEach((url) => {
    URL.revokeObjectURL(url);
  });
  activeObjectUrls.clear();
}

export function triggerDownload(urlOrBlob: string | Blob, filename: string): void {
  let url: string;
  let shouldRevoke = false;

  if (typeof urlOrBlob === 'string') {
    url = urlOrBlob;
  } else {
    url = URL.createObjectURL(urlOrBlob);
    shouldRevoke = true;
  }

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (shouldRevoke) {
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 2000);
  }
}

