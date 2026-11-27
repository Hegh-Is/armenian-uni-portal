import { X, ExternalLink, MapPin, Users, Calendar, ArrowUpRight } from 'lucide-react';
import type { University, Program, Lang } from '../types/schema';
import { I18N, formatAmd } from '../scripts/i18n';

interface UniversityDetailModalProps {
  university: University | null;
  programs: Program[];
  lang: Lang;
  onClose: () => void;
  onSelectProgram: (program: Program) => void;
}

export function UniversityDetailModal({
  university,
  programs,
  lang,
  onClose,
  onSelectProgram,
}: UniversityDetailModalProps) {
  if (!university) return null;
  const t = I18N[lang];
  const uniPrograms = programs.filter((p) => p.university_id === university.id);

  const typeLabel =
    university.type === 'state'
      ? t.programsPage.uniTypeState
      : university.type === 'private'
        ? t.programsPage.uniTypePrivate
        : t.programsPage.uniTypeIntl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="uni-detail-heading"
    >
      <div className="bg-white border border-blue-200 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="bg-blue-950 text-white px-6 py-5 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-blue-200 flex items-center gap-2">
              <span className="font-semibold">{university.shortCode}</span>
              <span aria-hidden="true">·</span>
              <span>{typeLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{university.city[lang]}</span>
            </div>
            <h2 id="uni-detail-heading" className="text-xl font-bold mt-1">
              {university.name[lang]}
            </h2>
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

        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm text-slate-700 leading-relaxed">{university.description[lang]}</p>

          {/* Institutional Specs & Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">{university.address[lang]}</div>
                <div className="text-xs font-mono tabular-nums text-blue-900 mt-0.5">
                  {university.coordinates.lat.toFixed(4)}° N, {university.coordinates.lng.toFixed(4)}° E
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">{t.programsPage.founded}</div>
                <div className="font-mono tabular-nums font-semibold text-slate-900">
                  {university.founded}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">{t.programsPage.students}</div>
                <div className="font-mono tabular-nums font-semibold text-slate-900">
                  ~{new Intl.NumberFormat('en-US').format(university.studentCount)}
                </div>
              </div>
            </div>
          </div>

          {/* Faculties */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {t.programsPage.faculties}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {university.faculties.map((fac) => (
                <div
                  key={fac.id}
                  className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-slate-800 font-medium">{fac.name[lang]}</span>
                  <span className="text-xs font-mono tabular-nums text-blue-800 shrink-0">
                    {fac.programsCount} {t.programsPage.programsCount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Programs at this University */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {t.programsPage.tabPrograms} ({uniPrograms.length})
            </h3>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {uniPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="p-4 bg-white hover:bg-blue-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs text-slate-500">{t.filters[prog.degree]}</div>
                    <div className="text-sm font-semibold text-slate-900">{prog.title[lang]}</div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm font-mono tabular-nums font-semibold text-blue-900">
                      {formatAmd(prog.tuition_fee, lang)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProgram(prog);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-950"
                    >
                      <span>{t.program.details}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <a
            href={university.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            <span>{t.programsPage.visitWebsite}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium"
          >
            {t.compare.close}
          </button>
        </div>
      </div>
    </div>
  );
}
