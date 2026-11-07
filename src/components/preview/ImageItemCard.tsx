import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImageSourceItem } from '../../types/file';
import { formatFileSize } from '../../utils/fileSize';
import { 
  GripVertical, 
  RotateCw, 
  Trash2, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ImageItemCardProps {
  item: ImageSourceItem;
  index: number;
  total: number;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const ImageItemCard: React.FC<ImageItemCardProps> = ({
  item,
  index,
  total,
  onRemove,
  onRotate,
  onMoveUp,
  onMoveDown,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col',
        isDragging
          ? 'z-30 border-violet-500 shadow-xl opacity-90 scale-105'
          : 'border-slate-200 dark:border-slate-800'
      )}
    >
      {/* Top Header bar with order badge and drag handle */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
        <div className="flex items-center gap-2">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            type="button"
            className="cursor-grab active:cursor-grabbing p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            #{index + 1}
          </span>
        </div>

        {/* Move up / Move down touch buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
            aria-label="Move image up"
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMoveDown(index)}
            aria-label="Move image down"
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label="Delete image"
            className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image Preview with rotation applied */}
      <div className="relative aspect-[4/3] p-3 flex items-center justify-center bg-slate-100/50 dark:bg-slate-950/50 overflow-hidden">
        <img
          src={item.previewUrl}
          alt={item.name}
          style={{ transform: `rotate(${item.rotation}deg)` }}
          className="w-full h-full object-contain transition-transform duration-300"
        />

        {/* Floating Rotate button */}
        <button
          type="button"
          onClick={() => onRotate(item.id)}
          className="absolute bottom-2 right-2 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-violet-600 backdrop-blur-md shadow-md transition-all flex items-center gap-1 text-xs"
          title="Rotate 90° clockwise"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono">{item.rotation}°</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-1">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={item.name}>
          {item.name}
        </p>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{item.width} × {item.height} px</span>
          <span>{formatFileSize(item.size)}</span>
        </div>
      </div>
    </div>
  );
};

