import { X, ExternalLink, ShieldCheck, AlertCircle, Calendar, Hash, FileText } from 'lucide-react';
import type { Lang, TrustLensSource } from '../types/schema';
import { I18N } from '../scripts/i18n';

interface TrustLensModalProps {
  source: TrustLensSource | null;
  isMissingData?: boolean;
  lang: Lang;
  onClose: () => void;
}

export function TrustLensModal({ source, isMissingData = false, lang, onClose }: TrustLensModalProps) {
  if (!source) return null;
  const t = I18N[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trust-lens-heading"
    >
      <div className="bg-white border border-blue-200 rounded-xl shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-blue-950 text-white px-6 py-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-800/80 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 id="trust-lens-heading" className="text-base font-semibold text-white">
                {t.trustLens.title}
              </h2>
              <p className="text-xs text-blue-200/90 mt-0.5">{t.trustLens.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.trustLens.close}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {isMissingData && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-950 font-medium leading-relaxed">
                {t.trustLens.notPublishedBanner}
              </p>
            </div>
          )}

          {/* 1. Direct URL */}
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">{t.trustLens.officialUrl}</div>
            <a
              href={source.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-900 underline underline-offset-2 break-all"
            >
              <span>{source.source_url}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* 2. Page Title */}
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.trustLens.pageTitle}</span>
            </div>
            <div className="text-sm font-semibold text-slate-900">{source.page_title[lang]}</div>
          </div>

          {/* 3. Exact Snippet */}
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1.5">{t.trustLens.exactSnippet}</div>
            <blockquote className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed">
              {source.raw_snippet[lang]}
            </blockquote>
          </div>

          {/* 4. Verification Dates & Hash */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200">
            <div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.trustLens.collectedAt}</span>
              </div>
              <div className="text-sm font-mono tabular-nums font-medium text-slate-900 mt-0.5">
                {source.collected_at}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.trustLens.verifiedAt}</span>
              </div>
              <div className="text-sm font-mono tabular-nums font-medium text-slate-900 mt-0.5">
                {source.verified_at}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.trustLens.contentHash}</span>
              </div>
              <div className="text-xs font-mono tabular-nums font-medium text-slate-700 mt-1 truncate">
                {source.hash}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <a
            href={source.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium transition-colors whitespace-nowrap"
          >
            <span>{t.trustLens.openOriginal}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors whitespace-nowrap"
          >
            {t.trustLens.close}
          </button>
        </div>
      </div>
    </div>
  );
}
