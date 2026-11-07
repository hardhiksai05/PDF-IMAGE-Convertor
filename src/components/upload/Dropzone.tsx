import React, { useRef, useState } from 'react';
import { UploadCloud, FileType, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  title: string;
  subtitle: string;
  maxSizeLabel?: string;
  formatsLabel?: string;
  disabled?: boolean;
  onLoadSample?: () => void;
  sampleButtonLabel?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  accept,
  multiple = false,
  title,
  subtitle,
  maxSizeLabel = '50 MB',
  formatsLabel = 'PDF',
  disabled = false,
  onLoadSample,
  sampleButtonLabel = 'Try with Sample Document',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      if (!multiple && filesArray.length > 1) {
        onFilesSelected([filesArray[0]]);
      } else {
        onFilesSelected(filesArray);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const triggerPicker = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerPicker}
        className={cn(
          'relative group cursor-pointer rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 overflow-hidden select-none',
          isDragOver
            ? 'border-violet-500 bg-violet-500/10 scale-[1.01] shadow-2xl shadow-violet-500/20'
            : 'border-slate-300/80 dark:border-slate-700/80 hover:border-violet-400 dark:hover:border-violet-500/50 bg-white/60 dark:bg-slate-900/40 hover:bg-violet-50/30 dark:hover:bg-slate-800/30 shadow-lg shadow-slate-900/5',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        {/* Ambient background glow inside dropzone */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-cyan-500/[0.03] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Animated upload icon circle */}
          <div
            className={cn(
              'w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300',
              isDragOver
                ? 'scale-110 bg-violet-600 text-white shadow-lg shadow-violet-600/40'
                : 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 group-hover:scale-105 group-hover:bg-violet-500/20'
            )}
          >
            <UploadCloud className="w-10 h-10 animate-pulse-slow" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            {title}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <FileType className="w-3.5 h-3.5 text-violet-500" />
              Formats: {formatsLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-500" />
              Up to {maxSizeLabel}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md shadow-violet-600/20 group-hover:shadow-violet-600/35 transition-all">
              Choose Files
            </span>

            {onLoadSample && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onLoadSample();
                }}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-300 border border-violet-500/20 transition-all z-20"
              >
                {sampleButtonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
