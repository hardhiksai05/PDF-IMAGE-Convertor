import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { cn } from '../utils/cn';

interface FaqItem {
  q: string;
  a: string;
  category: 'general' | 'pdf-to-image' | 'image-to-pdf' | 'privacy';
}

export const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FaqItem[] = [
    {
      category: 'privacy',
      q: 'Do my files get uploaded to any servers?',
      a: 'No. Never. SAICONVO processes 100% of your documents locally in your browser using modern WebAssembly, Canvas, and PDF.js engines. Your documents never leave your computer or phone.',
    },
    {
      category: 'general',
      q: 'Is SAICONVO free? Are there subscription paywalls?',
      a: 'Yes, SAICONVO is completely free to use with no account registration, no subscriptions, no credit cards, and no watermarks on your converted documents.',
    },
    {
      category: 'pdf-to-image',
      q: 'Which DPI setting should I choose when converting PDF to image?',
      a: '72 DPI is best for quick email attachments and small web previews. 150 DPI is balanced and ideal for general reading. 200 DPI produces crisp diagrams. 300 DPI delivers ultra-sharp print-ready output with maximum vector fidelity.',
    },
    {
      category: 'pdf-to-image',
      q: 'Can I convert only selected pages of my PDF?',
      a: 'Yes! After uploading your PDF, thumbnail previews of every page are displayed. You can click on individual pages to toggle their selection, or use "Select All" and "Deselect All" to quickly configure your desired page range.',
    },
    {
      category: 'pdf-to-image',
      q: 'How can I download all converted images at once?',
      a: 'In the conversion results workspace, you can either click the download button on any individual page or click "Download All (ZIP)" to download a clean, defect-free ZIP archive containing all converted pages.',
    },
    {
      category: 'image-to-pdf',
      q: 'Can I reorder my images before creating the PDF?',
      a: 'Yes! The Image to PDF workspace includes a drag-and-drop sortable gallery. You can drag cards to reposition them, or use the dedicated Move Up / Move Down buttons on touch and mobile devices.',
    },
    {
      category: 'image-to-pdf',
      q: 'How does SAICONVO handle transparent PNG backgrounds?',
      a: 'You can configure the page background color in the PDF settings (defaulting to clean white). The engine automatically merges transparency with your chosen background so your diagrams and logos appear crisp without black borders.',
    },
    {
      category: 'general',
      q: 'What are the recommended file size limits?',
      a: 'We support single PDF files up to 50 MB, and up to 50 images of up to 20 MB each. Because memory is handled directly in your browser, keeping documents within these limits ensures smooth performance without browser memory warnings.',
    },
    {
      category: 'general',
      q: 'Does SAICONVO work on smartphones and tablets?',
      a: 'Yes! The entire interface is fully responsive and touch-optimized for iPhones, Android devices, iPads, and desktops, with dedicated touch reordering and navigation controls.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold border border-violet-500/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help & Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Everything you need to know about SAICONVO conversion tools, privacy, and settings.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. DPI, privacy, reorder, limits)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'pdf-to-image', label: 'PDF to Image' },
            { id: 'image-to-pdf', label: 'Image to PDF' },
            { id: 'privacy', label: 'Privacy & Security' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all',
                activeCategory === cat.id
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No questions found matching your search.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={idx}
                className="overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0',
                      isOpen && 'rotate-180 text-violet-500'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
