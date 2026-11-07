import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

// 4-pointed diamond sparkle SVG matching the reference image
const SparkleIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row ref-bg-pattern text-slate-900 dark:text-slate-100 relative overflow-x-hidden transition-colors duration-300">
      {/* Decorative background concentric circles & sparkles matching reference mockup */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
        {/* Outer concentric ring */}
        <div className="w-[1200px] h-[1200px] rounded-full border border-slate-300/40 dark:border-white/[0.03] absolute" />
        {/* Middle concentric ring */}
        <div className="w-[860px] h-[860px] rounded-full border border-slate-300/50 dark:border-white/[0.04] absolute" />
        {/* Inner concentric ring */}
        <div className="w-[580px] h-[580px] rounded-full border border-slate-300/60 dark:border-white/[0.05] absolute" />

        {/* Scattered 4-pointed sparkle stars matching reference image */}
        <SparkleIcon className="absolute top-12 left-16 w-3.5 h-3.5 text-slate-400/50 dark:text-white/10" />
        <SparkleIcon className="absolute top-28 right-24 w-4 h-4 text-slate-400/50 dark:text-white/10" />
        <SparkleIcon className="absolute top-1/3 left-28 w-3 h-3 text-slate-400/40 dark:text-white/10" />
        <SparkleIcon className="absolute top-1/2 right-20 w-3.5 h-3.5 text-slate-400/50 dark:text-white/10" />
        <SparkleIcon className="absolute bottom-24 left-1/3 w-4 h-4 text-slate-400/50 dark:text-white/10" />
        <SparkleIcon className="absolute bottom-32 right-1/4 w-3.5 h-3.5 text-slate-400/40 dark:text-white/10" />

        {/* Soft atmospheric radial center illumination */}
        <div className="w-[700px] h-[700px] bg-white/40 dark:bg-violet-600/10 rounded-full blur-[140px] absolute" />
      </div>

      {/* Mobile Top Header (Phone/Tablet) */}
      <MobileHeader />

      {/* Desktop Vertical Sidebar matching reference image */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
