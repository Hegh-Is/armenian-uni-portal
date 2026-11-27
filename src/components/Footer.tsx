import type { Lang } from '../types/schema';
import { I18N } from '../scripts/i18n';
import type { PageId } from './Header';

interface FooterProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const t = I18N[lang];

  return (
    <footer className="bg-blue-950 text-blue-100 border-t border-blue-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-blue-900">
          <div>
            <div className="text-lg font-bold text-white tracking-tight">{t.brandName}</div>
            <p className="text-sm text-blue-200/80 mt-1 max-w-xl">{t.footer.tagline}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm">
            {(['home', 'programs', 'community', 'dashboard', 'about'] as PageId[]).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => {
                  onNavigate(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-blue-200 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {t.nav[page]}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-blue-300/80">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.basedOn}</span>
        </div>
      </div>
    </footer>
  );
}
