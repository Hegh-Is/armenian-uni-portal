import { Bookmark, GitCompareArrows, ShieldCheck } from 'lucide-react';
import type { Lang } from '../types/schema';
import { I18N } from '../scripts/i18n';
import type { PageId } from './Header';

interface SubHeaderBarProps {
  lang: Lang;
  onChangeLang: (lang: Lang) => void;
  savedCount: number;
  compareCount: number;
  onNavigate: (page: PageId) => void;
  onOpenCompare: () => void;
  universitiesCount: number;
  programsCount: number;
}

export function SubHeaderBar({
  lang,
  onChangeLang,
  savedCount,
  compareCount,
  onNavigate,
  onOpenCompare,
  universitiesCount,
  programsCount,
}: SubHeaderBarProps) {
  const t = I18N[lang];

  return (
    <div className="bg-blue-50/70 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Unboxed Institutional Context */}
        <div className="flex items-center gap-2.5 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
          <span className="font-medium text-blue-950">{t.subBar.officialSources}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="tabular-nums">
            {universitiesCount} {lang === 'hy' ? 'ԲՈՒՀ' : lang === 'ru' ? 'ВУЗов' : 'Universities'}
          </span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="tabular-nums">
            {programsCount} {lang === 'hy' ? 'ծրագիր' : lang === 'ru' ? 'программ' : 'Programs'}
          </span>
        </div>

        {/* Right: Quick Saved/Compare Counters + Trilingual Language Switcher */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.subBar.savedCount}:</span>
            <span className="font-mono tabular-nums font-semibold text-blue-900">{savedCount}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCompare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            <GitCompareArrows className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.subBar.compareCount}:</span>
            <span className="font-mono tabular-nums font-semibold text-blue-900">{compareCount}/4</span>
          </button>

          <div
            className="inline-flex items-center bg-white border border-blue-200 rounded-md p-0.5"
            role="group"
            aria-label="Language Switcher"
          >
            {(
              [
                { code: 'hy', label: 'ՀԱՅ' },
                { code: 'en', label: 'ENG' },
                { code: 'ru', label: 'РУС' },
              ] as const
            ).map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => onChangeLang(item.code)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  lang === item.code
                    ? 'bg-blue-900 text-white'
                    : 'text-slate-600 hover:text-blue-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
