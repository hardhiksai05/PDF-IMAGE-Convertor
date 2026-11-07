import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  Menu, 
  X, 
  Layers, 
  Moon, 
  Sun,
  LayoutDashboard,
  ImageIcon,
  FileText,
  Info,
  HelpCircle,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="md:hidden sticky top-0 z-50 p-3 bg-white/90 dark:bg-[#161722]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/30">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white text-base">
            SAICONVO
          </span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-violet-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-down vertical card drawer matching mockup */}
      {isOpen && (
        <div className="mt-3 p-4 rounded-3xl bg-white dark:bg-[#161722] border border-slate-200/90 dark:border-white/10 shadow-2xl space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1c1d2b] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">SAICONVO Workspace</p>
              <p className="text-[10px] text-emerald-500">100% In-Browser Execution</p>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all',
                    active
                      ? 'bg-violet-50 dark:bg-[#222035] text-violet-600 dark:text-violet-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', active ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400')} />
                    <span>{link.label}</span>
                  </div>
                  {active && (
                    <span className="w-1.5 h-5 bg-violet-600 dark:bg-violet-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

