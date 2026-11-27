import { X, Bookmark, GitCompareArrows, ShieldCheck, Check } from 'lucide-react';
import type {
  Program,
  University,
  Lang,
  FitScoreResult,
  TrustEntityType,
} from '../types/schema';
import { I18N, formatAmd } from '../scripts/i18n';
import { getLanguageLabel } from '../scripts/smartFilter';

interface ProgramDetailModalProps {
  program: Program | null;
  university: University | undefined;
  lang: Lang;
  fit: FitScoreResult | null;
  isSaved: boolean;
  isCompared: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenTrustLens: (
    entityType: TrustEntityType,
    entityId: string,
    fieldName: string,
    isMissing?: boolean
  ) => void;
}

export function ProgramDetailModal({
  program,
  university,
  lang,
  fit,
  isSaved,
  isCompared,
  onClose,
  onToggleSave,
  onToggleCompare,
  onOpenTrustLens,
}: ProgramDetailModalProps) {
  if (!program) return null;
  const t = I18N[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-detail-heading"
    >
      <div className="bg-white border border-blue-200 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-950 text-white px-6 py-5 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-blue-200 flex items-center gap-2">
              <span className="font-semibold">{university?.shortCode}</span>
              <span aria-hidden="true">·</span>
              <span>{university?.name[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>{t.filters[program.degree]}</span>
            </div>
            <h2 id="program-detail-heading" className="text-xl font-bold mt-1.5 leading-snug">
              {program.title[lang]}
            </h2>
            <p className="text-xs text-blue-200/90 mt-1">{program.qualification[lang]}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.compare.close}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Personalized Fit Score Strip */}
          {fit && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-blue-900">{t.program.fitScore}</div>
                <p className="text-sm text-slate-800 mt-0.5">{fit.label[lang]}</p>
              </div>
              <div className="text-2xl font-mono tabular-nums font-bold text-blue-900 shrink-0">
                {fit.score}%
              </div>
            </div>
          )}

          {/* Key Specs */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-5 border-b border-slate-200">
            <div>
              <dt className="text-xs text-slate-500 flex items-center gap-1.5">
                <span>{t.program.annualTuition}</span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenTrustLens(
                      'program',
                      program.id,
                      'tuition_fee',
                      program.tuition_fee === null
                    )
                  }
                  className="text-blue-700 hover:text-blue-900"
                  title={t.program.trustLens}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </button>
              </dt>
              <dd className="text-sm font-mono tabular-nums font-semibold text-slate-900 mt-1">
                {formatAmd(program.tuition_fee, lang)}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">{t.program.duration}</dt>
              <dd className="text-sm font-mono tabular-nums font-semibold text-slate-900 mt-1">
                {program.durationYears} {t.program.years}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500">{t.program.language}</dt>
              <dd className="text-sm font-semibold text-slate-900 mt-1">
                {getLanguageLabel(program.language, lang)}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-slate-500 flex items-center gap-1.5">
                <span>{t.program.deadline}</span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenTrustLens('program', program.id, 'deadline', program.deadline === null)
                  }
                  className="text-blue-700 hover:text-blue-900"
                  title={t.program.trustLens}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </button>
              </dt>
              <dd className="text-sm font-mono tabular-nums font-semibold text-slate-900 mt-1">
                {program.deadline ?? t.program.unpublished}
              </dd>
            </div>
          </dl>

          {/* Curriculum Summary */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{t.program.curriculumTitle}</h3>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
              {program.curriculumSummary[lang]}
            </p>
            {program.discountNote && (
              <p className="mt-2 text-xs font-medium text-blue-800">{program.discountNote[lang]}</p>
            )}
          </div>

          {/* Exams & Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-semibold text-slate-900">{t.program.examsTitle}</h3>
                <button
                  type="button"
                  onClick={() => onOpenTrustLens('program', program.id, 'exams')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trust Lens</span>
                </button>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {program.exams.map((ex, idx) => (
                  <li key={idx} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                    <div className="font-medium text-slate-900">{ex.subject[lang]}</div>
                    <div className="text-xs font-mono tabular-nums text-slate-500 mt-0.5">
                      {t.program.minScore}{' '}
                      {ex.minScore !== null ? ex.minScore : t.program.unpublished}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                {t.program.documentsTitle}
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {program.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-700 font-semibold">·</span>
                    <span>{doc[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Internship & Mobility */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">{t.program.mobilityTitle}</h3>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
              {program.internshipAndMobility
                ? program.internshipAndMobility[lang]
                : t.program.unpublished}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleCompare(program.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                isCompared
                  ? 'bg-blue-900 border-blue-900 text-white'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-blue-400'
              }`}
            >
              {isCompared ? <Check className="w-4 h-4" /> : <GitCompareArrows className="w-4 h-4" />}
              <span>{isCompared ? t.program.compared : t.program.compare}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleSave(program.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                isSaved
                  ? 'bg-blue-50 border-blue-300 text-blue-900'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-blue-400'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700 text-blue-700' : ''}`} />
              <span>{isSaved ? t.program.saved : t.program.save}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium transition-colors"
          >
            {t.compare.close}
          </button>
        </div>
      </div>
    </div>
  );
}
