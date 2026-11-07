import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { XCircle, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface ProgressModalProps {
  isOpen: boolean;
  percentage: number;
  message: string;
  current: number;
  total: number;
  stage: string;
  error?: string;
  onCancel: () => void;
  onRetry?: () => void;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  percentage,
  message,
  current,
  total,
  error,
  onCancel,
  onRetry,
}) => {
  if (!isOpen) return null;

  const isError = Boolean(error);
  const isComplete = percentage >= 100 && !isError;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center text-center">
            {/* Status Icon */}
            <div className="mb-4">
              {isError ? (
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-8 h-8 animate-bounce" />
                </div>
              ) : isComplete ? (
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : (
                <div className="relative w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Layers className="w-8 h-8 animate-pulse" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-violet-500 border-t-transparent animate-spin" />
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold tracking-tight mb-1 text-white">
              {isError
                ? 'Conversion Failed'
                : isComplete
                ? 'Finalizing...'
                : 'Processing Documents'}
            </h3>

            {/* Message */}
            <p className="text-sm text-slate-400 mb-6 max-w-xs break-words">
              {isError ? error : message}
            </p>

            {/* Progress Bar (if not in error) */}
            {!isError && (
              <div className="w-full space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>
                    {total > 0 ? `Page/Item ${current} of ${total}` : 'Converting...'}
                  </span>
                  <span className="text-violet-400">{percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 w-full justify-center">
              {isError ? (
                <>
                  <Button variant="outline" size="md" onClick={onCancel}>
                    Dismiss
                  </Button>
                  {onRetry && (
                    <Button variant="primary" size="md" onClick={onRetry}>
                      Try Again
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  leftIcon={<XCircle className="w-4 h-4 text-red-400" />}
                  className="hover:border-red-500/50 hover:text-red-400"
                >
                  Cancel Conversion
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

