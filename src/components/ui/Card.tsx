import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverGlow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, hoverGlow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl transition-all duration-300',
          glass
            ? 'bg-white dark:bg-[#161722] border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60'
            : 'bg-white dark:bg-[#161722] border border-slate-200 dark:border-slate-800 shadow-md',
          hoverGlow &&
            'hover:border-violet-500/50 hover:shadow-violet-500/10 dark:hover:shadow-violet-500/15 hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
