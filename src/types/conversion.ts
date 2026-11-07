export type ImageFormat = 'jpg' | 'png' | 'webp';
export type QualityLevel = 'low' | 'medium' | 'high';
export type DpiResolution = 72 | 150 | 200 | 300;

export interface PdfToImageSettings {
  format: ImageFormat;
  dpi: DpiResolution;
  quality: QualityLevel;
  outputFilename: string;
  selectedPages: number[]; // empty means all
}

export type PageSize = 'a4' | 'a3' | 'letter' | 'legal';
export type PageOrientation = 'portrait' | 'landscape' | 'auto';
export type MarginOption = 'none' | 'small' | 'medium' | 'large';
export type ImageFitOption = 'fit' | 'fill' | 'original';

export interface ImageToPdfSettings {
  pageSize: PageSize;
  orientation: PageOrientation;
  margin: MarginOption;
  fit: ImageFitOption;
  backgroundColor: string; // for transparent PNGs
  outputFilename: string;
}

export interface ConversionProgress {
  isConverting: boolean;
  stage: 'preparing' | 'rendering' | 'compressing' | 'assembling' | 'complete' | 'error';
  current: number;
  total: number;
  message: string;
  percentage: number;
  error?: string;
}

export interface ConvertedImageResult {
  id: string;
  pageNumber: number;
  blob: Blob;
  previewUrl: string;
  filename: string;
  width: number;
  height: number;
  size: number;
  format: ImageFormat;
}

export interface ConvertedPdfResult {
  blob: Blob;
  previewUrl: string;
  filename: string;
  size: number;
  pageCount: number;
}

export type ConversionMode = 'pdf-to-image' | 'image-to-pdf';

export interface ConversionSessionState {
  mode: ConversionMode;
  sourceFilename: string;
  pdfToImageResults?: ConvertedImageResult[];
  imageToPdfResult?: ConvertedPdfResult;
  timestamp: number;
}

