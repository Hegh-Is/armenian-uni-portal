import { Bookmark, Check, GitCompareArrows, ShieldCheck, ArrowUpRight } from 'lucide-react';
import type {
  Program,
  University,
  Lang,
  FitScoreResult,
  TrustEntityType,
} from '../types/schema';
import { I18N, formatAmd } from '../scripts/i18n';
import { getLanguageLabel } from '../scripts/smartFilter';

interface ProgramCardProps {
  program: Program;
  university: University | undefined;
  lang: Lang;
  fit: FitScoreResult;
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenDetails: (program: Program) => void;
  onOpenTrustLens: (
    entityType: TrustEntityType,
    entityId: string,
    fieldName: string,
    isMissing?: boolean
  ) => void;
}

export function ProgramCard({
  program,
  university,
  lang,
  fit,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onOpenDetails,
  onOpenTrustLens,
}: ProgramCardProps) {
  const t = I18N[lang];
  const degreeLabel = t.filters[program.degree];

  const fitColorClass =
    fit.tier === 'high'
      ? 'text-blue-800'
      : fit.tier === 'medium'
        ? 'text-sky-700'
        : 'text-slate-600';

  return (
    <article className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-6 flex flex-col justify-between transition-colors">
      <div>
        {/* Quiet 1-line unboxed metadata kicker + Fit Score */}
        <div className="flex items-start justify-between gap-4">
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 leading-snug">
            <span className="font-semibold text-blue-900">{university?.shortCode}</span>
            <span aria-hidden="true">·</span>
            <span>{university?.city[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{degreeLabel}</span>
          </div>

          <div className="text-right shrink-0">
            <div className={`text-sm font-mono tabular-nums font-bold ${fitColorClass}`}>
              {fit.score}% {t.program.fitScore}
            </div>
          </div>
        </div>

        {/* Title & Qualification */}
        <h3 className="mt-2.5 text-lg font-semibold text-slate-900 leading-snug">
          <button
            type="button"
            onClick={() => onOpenDetails(program)}
            className="text-left hover:text-blue-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
          >
            {program.title[lang]}
          </button>
        </h3>
        <p className="mt-1 text-xs text-slate-500">{university?.name[lang]}</p>

        {/* Human-readable Fit explanation */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-blue-50/50 border border-blue-100 rounded-lg px-3 py-2">
          {fit.label[lang]}
        </p>

        {/* Key Fact Grid with hairline divider & Trust Lens triggers */}
        <dl className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-slate-500 flex items-center justify-between gap-1">
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
                title={t.program.trustLens}
                className="text-blue-700 hover:text-blue-900 inline-flex items-center gap-0.5 text-[11px] font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Trust</span>
              </button>
            </dt>
            <dd
              className={`mt-0.5 font-mono tabular-nums font-semibold ${
                program.tuition_fee === null ? 'text-slate-500 text-xs font-sans font-normal' : 'text-slate-900'
              }`}
            >
              {formatAmd(program.tuition_fee, lang)}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-slate-500 flex items-center justify-between gap-1">
              <span>{t.program.deadline}</span>
              <button
                type="button"
                onClick={() =>
                  onOpenTrustLens('program', program.id, 'deadline', program.deadline === null)
                }
                title={t.program.trustLens}
                className="text-blue-700 hover:text-blue-900 inline-flex items-center gap-0.5 text-[11px] font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Trust</span>
              </button>
            </dt>
            <dd
              className={`mt-0.5 font-mono tabular-nums font-medium ${
                program.deadline === null ? 'text-slate-500 text-xs font-sans font-normal' : 'text-slate-900'
              }`}
            >
              {program.deadline ?? t.program.unpublished}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-slate-500">{t.program.language}</dt>
            <dd className="mt-0.5 text-slate-800 font-medium">
              {getLanguageLabel(program.language, lang)}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-slate-500">{t.program.duration}</dt>
            <dd className="mt-0.5 font-mono tabular-nums text-slate-800 font-medium">
              {program.durationYears} {t.program.years}
            </dd>
          </div>
        </dl>

        {/* Quiet inline scholarship indicator */}
        <div className="mt-3 text-xs text-blue-800 font-medium">
          {program.scholarshipAvailable ? t.program.scholarshipYes : t.program.scholarshipNo}
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleCompare(program.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              isCompared
                ? 'bg-blue-900 border-blue-900 text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-900'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5" /> : <GitCompareArrows className="w-3.5 h-3.5" />}
            <span>{isCompared ? t.program.compared : t.program.compare}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleSave(program.id)}
            aria-label={isSaved ? t.program.saved : t.program.save}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              isSaved
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-900'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-700 text-blue-700' : ''}`} />
            <span>{isSaved ? t.program.saved : t.program.save}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenDetails(program)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 whitespace-nowrap shrink-0"
        >
          <span>{t.program.details}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
