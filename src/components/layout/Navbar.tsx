import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  Moon, 
  FileText, 
  Image as ImageIcon, 
  Menu, 
  X, 
  Layers,
  HelpCircle,
  Info,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', path: '/', icon: LayoutDashboard },
    { label: 'PDF to Image', path: '/pdf-to-image', icon: ImageIcon },
    { label: 'Image to PDF', path: '/image-to-pdf', icon: FileText },
    { label: 'About', path: '/about', icon: Info },
    { label: 'FAQ', path: '/faq', icon: HelpCircle },
    { label: 'Privacy', path: '/privacy', icon: ShieldCheck },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Floating Island Card Container matching reference mockup style */}
        <div className="bg-white dark:bg-[#161722] border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/60 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-colors duration-300">
          {/* Brand Logo & Squircle Icon */}
          <Link to="/" className="flex items-center gap-3 group select-none">
            {/* Violet squircle icon badge matching reference screenshot */}
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/30 group-hover:scale-105 transition-transform duration-200">
              <Layers className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-wider uppercase text-slate-900 dark:text-white">
                  SAICONVO
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Convert. Preview. Download.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-200 flex items-center gap-2 select-none',
                    active
                      ? 'bg-violet-50 dark:bg-[#222035] text-violet-600 dark:text-violet-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                  )}
                >
                  <Icon className={cn('w-4 h-4', active ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 dark:text-slate-500')} />
                  <span>{link.label}</span>

                  {/* Vertical accent pill indicator matching reference mockup */}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-violet-600 dark:bg-violet-500 rounded-full sm:hidden" />
                  )}
                  {active && (
                    <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-violet-600 dark:bg-violet-500 rounded-l-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Dark Mode Toggle Switch matching reference mockup */}
          <div className="flex items-center gap-3">
            {/* Dedicated Dark Mode Switcher */}
            <div
              onClick={toggleTheme}
              className="cursor-pointer flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100/70 dark:bg-[#1f202e] border border-slate-200/60 dark:border-white/5 hover:border-violet-300 dark:hover:border-violet-500/30 transition-all select-none"
              title="Toggle Dark Mode"
            >
              <Moon className={cn('w-4 h-4 transition-colors', theme === 'dark' ? 'text-violet-400' : 'text-slate-500')} />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 hidden lg:inline">
                Dark Mode
              </span>

              {/* Toggle switch track & thumb matching reference */}
              <div
                className={cn(
                  'w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center',
                  theme === 'dark' ? 'bg-violet-600' : 'bg-slate-300'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out',
                    theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
                  )}
                />
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Floating Drawer matching the sidebar card in reference */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl bg-white dark:bg-[#161722] border border-slate-200/90 dark:border-white/10 shadow-2xl space-y-3 animate-in slide-in-from-top-3 duration-200">
            {/* Status info bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Navigation
              </span>
              <span className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side
              </span>
            </div>

            {/* Nav list */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                      active
                        ? 'bg-violet-50 dark:bg-[#222035] text-violet-600 dark:text-violet-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn('w-4 h-4', active ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400')} />
                      <span>{link.label}</span>
                    </div>

                    {/* Active vertical pill accent indicator */}
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
    </header>
  );
};
