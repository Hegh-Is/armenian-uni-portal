import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Lang } from '../types/schema';
import { I18N } from '../scripts/i18n';

export type PageId = 'home' | 'programs' | 'community' | 'dashboard' | 'about';

interface HeaderProps {
  lang: Lang;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAssistant: () => void;
}

export function Header({ lang, activePage, onNavigate, onOpenAssistant }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = I18N[lang];

  const navItems: Array<{ id: PageId; label: string }> = [
    { id: 'home', label: t.nav.home },
    { id: 'programs', label: t.nav.programs },
    { id: 'community', label: t.nav.community },
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'about', label: t.nav.about },
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-lg font-bold tracking-tight text-blue-950 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-blue-600 rounded-md px-1"
        >
          <span className="w-7 h-7 rounded-md bg-blue-900 text-white flex items-center justify-center text-xs font-mono font-semibold">
            ՀՀ
          </span>
          <span>{t.brandName}</span>
        </button>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-600 rounded ${
                  isActive
                    ? 'text-blue-800'
                    : 'text-slate-600 hover:text-blue-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[19px] h-0.5 bg-blue-700"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAssistant}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.aiAssistantBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-blue-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
