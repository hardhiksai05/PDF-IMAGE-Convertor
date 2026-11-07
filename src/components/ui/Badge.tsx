import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'violet' | 'cyan' | 'blue' | 'green' | 'amber' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'violet',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variants = {
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    slate: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

