import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Dropzone } from '../components/upload/Dropzone';
import { ImageItemCard } from '../components/preview/ImageItemCard';
import { ImageToPdfConfig } from '../components/conversion/ImageToPdfConfig';
import { ProgressModal } from '../components/conversion/ProgressModal';
import { Button } from '../components/ui/Button';
import { validateImageFile, MAX_IMAGES_COUNT } from '../services/fileValidation';
import { convertImagesToPdf } from '../services/imageConverter';
import { useConversionSession } from '../context/ConversionContext';
import { ImageSourceItem } from '../types/file';
import { ImageToPdfSettings, ConversionProgress } from '../types/conversion';
import { createManagedObjectURL, revokeManagedObjectURL } from '../utils/blob';
import { getBaseName } from '../utils/filename';
import { generateSampleImages } from '../utils/sampleDocuments';
import { 
  Plus, 
  Trash2, 
  AlertCircle, 
  Sparkles,
  Layers
} from 'lucide-react';

export const ImageToPdf: React.FC = () => {
  const navigate = useNavigate();
  const { setSession } = useConversionSession();

  const [images, setImages] = useState<ImageSourceItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState<ImageToPdfSettings>({
    pageSize: 'a4',
    orientation: 'auto',
    margin: 'small',
    fit: 'fit',
    backgroundColor: '#FFFFFF',
    outputFilename: 'converted_document',
  });

  const [progress, setProgress] = useState<ConversionProgress>({
    isConverting: false,
    stage: 'preparing',
    current: 0,
    total: 0,
    message: '',
    percentage: 0,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle uploaded images
  const handleFilesSelected = async (newFiles: File[]) => {
    setErrorMessage(null);

    if (images.length + newFiles.length > MAX_IMAGES_COUNT) {
      setErrorMessage(`You can convert a maximum of ${MAX_IMAGES_COUNT} images at once.`);
      return;
    }

    const validNewItems: ImageSourceItem[] = [];

    for (const file of newFiles) {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        setErrorMessage(validation.error || 'Invalid image file.');
        continue;
      }

      const previewUrl = createManagedObjectURL(file);

      // Read natural dimensions
      const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => resolve({ width: 0, height: 0 });
        img.src = previewUrl;
      });

      validNewItems.push({
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl,
        width: dimensions.width,
        height: dimensions.height,
        rotation: 0,
      });
    }

    if (validNewItems.length > 0) {
      setImages((prev) => {
        const combined = [...prev, ...validNewItems];
        if (prev.length === 0 && validNewItems.length > 0) {
          setSettings((s) => ({
            ...s,
            outputFilename: getBaseName(validNewItems[0].name) + '_bundle',
          }));
        }
        return combined;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const itemToRemove = prev.find((item) => item.id === id);
      if (itemToRemove) {
        revokeManagedObjectURL(itemToRemove.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleRotateImage = (id: string) => {
    setImages((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rotation: (item.rotation + 90) % 360 } : item
      )
    );
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setImages((prev) => arrayMove(prev, index, index - 1));
  };

  const handleMoveDown = (index: number) => {
    if (index >= images.length - 1) return;
    setImages((prev) => arrayMove(prev, index, index + 1));
  };

  const handleClearAll = () => {
    images.forEach((img) => revokeManagedObjectURL(img.previewUrl));
    setImages([]);
    setErrorMessage(null);
  };

  // Convert Images to PDF
  const handleConvert = async () => {
    if (images.length === 0) return;

    abortControllerRef.current = new AbortController();

    setProgress({
      isConverting: true,
      stage: 'assembling',
      current: 0,
      total: images.length,
      message: 'Starting PDF assembly...',
      percentage: 0,
    });

    try {
      const pdfResult = await convertImagesToPdf(
        images,
        settings,
        (p) => {
          setProgress((prev) => ({
            ...prev,
            current: p.current,
            total: p.total,
            percentage: p.percentage,
            message: p.message,
          }));
        },
        abortControllerRef.current.signal
      );

      // Save to conversion context session
      setSession({
        mode: 'image-to-pdf',
        sourceFilename: settings.outputFilename,
        imageToPdfResult: pdfResult,
        timestamp: Date.now(),
      });

      // Navigate to Results workspace where PDF.js renders the generated PDF
      navigate('/results');
    } catch (err: any) {
      if (err.message?.includes('cancelled')) {
        setProgress({
          isConverting: false,
          stage: 'complete',
          current: 0,
          total: 0,
          message: '',
          percentage: 0,
        });
      } else {
        console.error('PDF generation error:', err);
        setProgress((prev) => ({
          ...prev,
          stage: 'error',
          error: err.message || 'An unexpected error occurred while generating the PDF.',
        }));
      }
    }
  };

  const handleCancelConversion = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setProgress((prev) => ({ ...prev, isConverting: false, stage: 'complete' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Image to PDF Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Convert Images to a Single PDF
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Combine JPG, PNG, and WebP images into one organized document. Drag to reorder and customize page layout.
        </p>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step 1: Upload Dropzone */}
      {images.length === 0 ? (
        <div className="max-w-3xl mx-auto">
          <Dropzone
            onFilesSelected={handleFilesSelected}
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            multiple={true}
            title="Upload Your Images"
            subtitle="Drag & drop JPG, PNG, or WebP images here, or click to browse. Up to 50 images."
            formatsLabel="JPG, PNG, WebP"
            maxSizeLabel="20 MB / image"
            onLoadSample={async () => {
              const samples = await generateSampleImages();
              handleFilesSelected(samples);
            }}
            sampleButtonLabel="Try Sample Slides (3 Images)"
          />
        </div>
      ) : (
        /* Step 2 & 3: Workspace with image gallery and configuration */
        <div className="space-y-6">
          {/* Top action bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-xs border border-cyan-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {images.length} Image{images.length > 1 ? 's' : ''} Selected
                </h4>
                <p className="text-xs text-slate-400">
                  Drag cards or use arrows to reorder pages in your PDF
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                    e.target.value = '';
                  }}
                />
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add More Images
                </span>
              </label>

              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-400" />}
                className="hover:border-red-500/50 hover:text-red-400 text-xs"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Grid Layout: Config Sidebar (Right on desktop) & Sortable Image Gallery (Left on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Sortable Image Gallery (2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={images.map((img) => img.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[720px] overflow-y-auto p-1">
                    {images.map((item, index) => (
                      <ImageItemCard
                        key={item.id}
                        item={item}
                        index={index}
                        total={images.length}
                        onRemove={handleRemoveImage}
                        onRotate={handleRotateImage}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Settings Sidebar (1 column) */}
            <div className="lg:col-span-1 sticky top-20">
              <ImageToPdfConfig
                settings={settings}
                onChange={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
                imageCount={images.length}
                onConvert={handleConvert}
                isConverting={progress.isConverting}
              />
            </div>
          </div>
        </div>
      )}

      {/* Conversion Progress Modal */}
      <ProgressModal
        isOpen={progress.isConverting || progress.stage === 'error'}
        percentage={progress.percentage}
        message={progress.message}
        current={progress.current}
        total={progress.total}
        stage={progress.stage}
        error={progress.error}
        onCancel={handleCancelConversion}
        onRetry={handleConvert}
      />
    </div>
  );
};

