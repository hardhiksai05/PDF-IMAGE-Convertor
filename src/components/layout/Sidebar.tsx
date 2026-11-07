import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  Moon, 
  Sun,
  FileText, 
  Image as ImageIcon, 
  Layers,
  HelpCircle,
  Info,
  ShieldCheck,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { label: 'Overview', path: '/', icon: LayoutDashboard },
    { label: 'PDF to Image', path: '/pdf-to-image', icon: ImageIcon },
    { label: 'Image to PDF', path: '/image-to-pdf', icon: FileText },
    { label: 'About Engine', path: '/about', icon: Info },
    { label: 'FAQ', path: '/faq', icon: HelpCircle },
    { label: 'Privacy Policy', path: '/privacy', icon: ShieldCheck },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        'fixed top-4 left-4 bottom-4 h-[calc(100vh-2rem)] hidden md:flex flex-col rounded-3xl transition-all duration-300 z-40 select-none shadow-2xl',
        'bg-white dark:bg-[#161722] border border-slate-200/90 dark:border-white/10 shadow-slate-200/60 dark:shadow-black/70',
        isCollapsed ? 'w-20 p-3' : 'w-64 p-5'
      )}
    >
      {/* 1. BRAND HEADER (Matching squircle logo + title in reference image) */}
      <div className={cn('flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-white/5', isCollapsed && 'justify-center')}>
        <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/35 flex-shrink-0">
          <Layers className="w-5 h-5" />
        </div>

        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wider uppercase text-slate-900 dark:text-white truncate">
                SAICONVO
              </span>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate">
              Document Converter
            </span>
          </div>
        )}
      </div>

      {/* 2. USER PROFILE / CLIENT STATUS CARD (Matching avatar card in reference image) */}
      {!isCollapsed ? (
        <div className="my-4 p-3 rounded-2xl bg-slate-50/80 dark:bg-[#1c1d2b] border border-slate-100 dark:border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1.5px] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white">
              <UserCheck className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              Guest Workspace
            </span>
            <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% Client-Side
            </span>
          </div>
        </div>
      ) : (
        <div className="my-4 flex justify-center">
          <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 flex items-center justify-center" title="100% Client-Side">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* 3. VERTICAL NAVIGATION LINKS (With the exact active indicator bar) */}
      <nav className="flex-1 space-y-1 overflow-y-auto py-1">
        {navLinks.map((link) => {
          const active = isActive(link.path);
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              title={isCollapsed ? link.label : undefined}
              className={cn(
                'relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group',
                isCollapsed && 'justify-center px-2',
                active
                  ? 'bg-violet-50 dark:bg-[#222035] text-violet-600 dark:text-violet-300 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/80 dark:hover:bg-white/[0.04]'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 transition-colors',
                  active
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                )}
              />

              {!isCollapsed && (
                <span className="truncate">{link.label}</span>
              )}

              {/* The distinctive active vertical pill indicator bar on the right edge */}
              {active && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-violet-600 dark:bg-violet-500 rounded-l-full shadow-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 4. FOOTER CONTROLS: COLLAPSE & DARK MODE SWITCH (Matching bottom of reference mockup) */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
        {/* Dark Mode Row with Sliding Switch Toggle */}
        <div
          onClick={toggleTheme}
          className={cn(
            'cursor-pointer flex items-center justify-between p-2.5 rounded-2xl transition-all',
            'bg-slate-50/80 dark:bg-[#1a1b28] hover:bg-slate-100 dark:hover:bg-[#202132] border border-slate-100 dark:border-white/5',
            isCollapsed && 'justify-center p-2'
          )}
          title="Toggle Dark Mode"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-violet-400 flex-shrink-0" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
            )}
            {!isCollapsed && (
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                Dark Mode
              </span>
            )}
          </div>

          {!isCollapsed && (
            /* Animated pill switch track & thumb */
            <div
              className={cn(
                'w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center flex-shrink-0',
                theme === 'dark' ? 'bg-violet-600' : 'bg-slate-300'
              )}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out',
                  theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
                )}
              />
            </div>
          )}
        </div>

        {/* Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors',
            isCollapsed && 'justify-center px-1'
          )}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>

        {/* GitHub Source Link */}
        <a
          href="https://github.com/hardhiksai05/PDF-IMAGE-Convertor"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors',
            isCollapsed && 'justify-center px-1'
          )}
          title="Open Source on GitHub (hardhiksai05/PDF-IMAGE-Convertor)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 flex-shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          {!isCollapsed && <span className="truncate">GitHub Source</span>}
        </a>
      </div>
    </aside>
  );
};
