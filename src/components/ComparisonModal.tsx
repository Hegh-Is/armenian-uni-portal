import { X, ShieldCheck, GitCompareArrows, Trash2 } from 'lucide-react';
import type { Program, University, Lang, TrustEntityType } from '../types/schema';
import { I18N, formatAmd } from '../scripts/i18n';
import { getLanguageLabel } from '../scripts/smartFilter';

interface ComparisonTrayProps {
  programs: Program[];
  universities: University[];
  lang: Lang;
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenModal: () => void;
}

export function ComparisonTray({
  programs,
  universities,
  lang,
  onRemove,
  onClear,
  onOpenModal,
}: ComparisonTrayProps) {
  if (programs.length === 0) return null;
  const t = I18N[lang];
  const uniMap = new Map(universities.map((u) => [u.id, u]));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-4xl bg-blue-950 text-white border border-blue-800 rounded-xl shadow-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 overflow-x-auto">
        <GitCompareArrows className="w-5 h-5 text-blue-300 shrink-0" />
        <div className="flex items-center gap-2 overflow-x-auto">
          {programs.map((prog) => {
            const uni = uniMap.get(prog.university_id);
            return (
              <div
                key={prog.id}
                className="inline-flex items-center gap-2 bg-blue-900/90 border border-blue-700 rounded-lg px-2.5 py-1 text-xs whitespace-nowrap shrink-0"
              >
                <span className="font-semibold text-blue-200">{uni?.shortCode}</span>
                <span className="max-w-[130px] truncate">{prog.title[lang]}</span>
                <button
                  type="button"
                  onClick={() => onRemove(prog.id)}
                  aria-label="Remove from comparison"
                  className="text-blue-300 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 justify-end">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-blue-200 hover:text-white hover:bg-blue-900 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.compare.clear}</span>
        </button>

        <button
          type="button"
          disabled={programs.length < 2}
          onClick={onOpenModal}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            programs.length >= 2
              ? 'bg-white text-blue-950 hover:bg-blue-50'
              : 'bg-blue-900/60 text-blue-300 cursor-not-allowed'
          }`}
        >
          {programs.length >= 2
            ? `${t.compare.openMatrix} (${programs.length})`
            : t.compare.minTwoNotice}
        </button>
      </div>
    </div>
  );
}

interface ComparisonModalProps {
  isOpen: boolean;
  programs: Program[];
  universities: University[];
  lang: Lang;
  onClose: () => void;
  onRemove: (id: string) => void;
  onOpenTrustLens: (
    entityType: TrustEntityType,
    entityId: string,
    fieldName: string,
    isMissing?: boolean
  ) => void;
}

export function ComparisonModal({
  isOpen,
  programs,
  universities,
  lang,
  onClose,
  onRemove,
  onOpenTrustLens,
}: ComparisonModalProps) {
  if (!isOpen || programs.length === 0) return null;
  const t = I18N[lang];
  const uniMap = new Map(universities.map((u) => [u.id, u]));

  const TrustCellBtn = ({
    progId,
    field,
    missing = false,
  }: {
    progId: string;
    field: string;
    missing?: boolean;
  }) => (
    <button
      type="button"
      onClick={() => onOpenTrustLens('program', progId, field, missing)}
      title={t.program.trustLens}
      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 hover:text-blue-950"
    >
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Trust Lens</span>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-modal-title"
    >
      <div className="bg-white border border-blue-200 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2 id="comparison-modal-title" className="text-lg font-semibold">
              {t.compare.modalTitle}
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">{t.compare.trayTitle}</p>
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

        {/* Comparison Table */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-blue-50/80 border-b border-blue-100">
                <th className="p-4 text-xs font-semibold text-blue-950 w-52 align-top">
                  {lang === 'hy' ? 'Համեմատման չափանիշ' : lang === 'ru' ? 'Критерий' : 'Criterion'}
                </th>
                {programs.map((prog) => {
                  const uni = uniMap.get(prog.university_id);
                  return (
                    <th key={prog.id} className="p-4 align-top border-l border-blue-100">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-semibold text-blue-700">{uni?.shortCode}</div>
                          <div className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                            {prog.title[lang]}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(prog.id)}
                          aria-label="Remove program"
                          className="p-1 text-slate-400 hover:text-slate-700 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {/* Row 1: University & Location */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowUniversity}
                </td>
                {programs.map((prog) => {
                  const uni = uniMap.get(prog.university_id);
                  return (
                    <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                      <div className="font-medium text-slate-900">{uni?.name[lang]}</div>
                      <div className="text-xs text-slate-500 mt-1">{uni?.address[lang]}</div>
                      <TrustCellBtn progId={prog.id} field="university" />
                    </td>
                  );
                })}
              </tr>

              {/* Row 2: Tuition & Scholarships */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowTuition}
                </td>
                {programs.map((prog) => (
                  <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                    <div className="font-mono tabular-nums font-bold text-blue-950">
                      {formatAmd(prog.tuition_fee, lang)}
                    </div>
                    {prog.discountNote && (
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {prog.discountNote[lang]}
                      </div>
                    )}
                    <TrustCellBtn
                      progId={prog.id}
                      field="tuition_fee"
                      missing={prog.tuition_fee === null}
                    />
                  </td>
                ))}
              </tr>

              {/* Row 3: Duration & Qualification */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowDuration}
                </td>
                {programs.map((prog) => (
                  <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                    <div className="font-mono tabular-nums font-semibold text-slate-900">
                      {prog.durationYears} {t.program.years}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{prog.qualification[lang]}</div>
                    <TrustCellBtn progId={prog.id} field="qualification" />
                  </td>
                ))}
              </tr>

              {/* Row 4: Language */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowLanguage}
                </td>
                {programs.map((prog) => (
                  <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                    <div className="font-medium text-slate-900">
                      {getLanguageLabel(prog.language, lang)}
                    </div>
                    <TrustCellBtn progId={prog.id} field="language" />
                  </td>
                ))}
              </tr>

              {/* Row 5: Exams & Min Scores */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowExams}
                </td>
                {programs.map((prog) => (
                  <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {prog.exams.map((ex, i) => (
                        <li key={i}>
                          <span className="font-medium text-slate-900">{ex.subject[lang]}</span>
                          <div className="font-mono tabular-nums text-slate-500">
                            {t.program.minScore}{' '}
                            {ex.minScore !== null ? ex.minScore : t.program.unpublished}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <TrustCellBtn progId={prog.id} field="exams" />
                  </td>
                ))}
              </tr>

              {/* Row 6: Documents */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowDocuments}
                </td>
                {programs.map((prog) => (
                  <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
                      {prog.documents.map((doc, i) => (
                        <li key={i}>{doc[lang]}</li>
                      ))}
                    </ul>
                    <TrustCellBtn progId={prog.id} field="documents" />
                  </td>
                ))}
              </tr>

              {/* Row 7: Deadlines */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowDeadline}
                </td>
                {programs.map((prog) => (
                  <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                    <div className="font-mono tabular-nums font-semibold text-slate-900">
                      {prog.deadline ?? t.program.unpublished}
                    </div>
                    <TrustCellBtn
                      progId={prog.id}
                      field="deadline"
                      missing={prog.deadline === null}
                    />
                  </td>
                ))}
              </tr>

              {/* Row 8: Internship & Mobility */}
              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50/60 align-top">
                  {t.compare.rowMobility}
                </td>
                {programs.map((prog) => (
                  <td key={prog.id} className="p-4 align-top border-l border-slate-100">
                    <div className="text-xs text-slate-700 leading-relaxed">
                      {prog.internshipAndMobility
                        ? prog.internshipAndMobility[lang]
                        : t.program.unpublished}
                    </div>
                    <TrustCellBtn
                      progId={prog.id}
                      field="mobility"
                      missing={prog.internshipAndMobility === null}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
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
