export interface PdfFileInfo {
  file: File;
  name: string;
  size: number;
  pageCount: number;
  pages: PdfPageMeta[];
}

export interface PdfPageMeta {
  pageNumber: number;
  width: number;
  height: number;
  aspectRatio: number;
  thumbnailUrl?: string;
  isSelected: boolean;
}

export interface ImageSourceItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
}

