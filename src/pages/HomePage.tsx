import { useState } from 'react';
import { Search, Sparkles, SlidersHorizontal, RotateCcw, AlertCircle } from 'lucide-react';
import type {
  Lang,
  Program,
  University,
  SmartSearchFilters,
  UserProfilePreferences,
  TrustEntityType,
  DegreeLevel,
  InstructionLanguage,
  FieldCategory,
  CityKey,
} from '../types/schema';
import { I18N, formatAmd } from '../scripts/i18n';
import { calculateFitScore } from '../scripts/fitScore';
import { filterPrograms } from '../scripts/smartFilter';
import { ProgramCard } from '../components/ProgramCard';
import { AcademicImage } from '../components/AcademicImage';

interface HomePageProps {
  lang: Lang;
  universities: University[];
  programs: Program[];
  preferences: UserProfilePreferences;
  savedProgramIds: string[];
  compareIds: string[];
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

const DEFAULT_FILTERS: SmartSearchFilters = {
  query: '',
  universityId: 'all',
  city: 'all',
  degree: 'all',
  language: 'all',
  field: 'all',
  maxTuition: 3500000,
  scholarshipOnly: false,
};

const ALL_CITIES: CityKey[] = ['yerevan', 'gyumri', 'vanadzor', 'gavar', 'goris', 'kapan', 'ijevan'];
const ALL_FIELDS: FieldCategory[] = [
  'it',
  'engineering',
  'economics',
  'medicine',
  'law',
  'humanities',
  'sciences',
  'agriculture',
  'arts',
];

export function HomePage({
  lang,
  universities,
  programs,
  preferences,
  savedProgramIds,
  compareIds,
  onToggleSave,
  onToggleCompare,
  onOpenDetails,
  onOpenTrustLens,
}: HomePageProps) {
  const t = I18N[lang];
  const [filters, setFilters] = useState<SmartSearchFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<'fit' | 'tuition_asc' | 'tuition_desc'>('fit');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const uniMap = new Map(universities.map((u) => [u.id, u]));

  const handleSmartAiSearch = async (queryOverride?: string) => {
    const q = (queryOverride ?? filters.query).trim();
    if (!q || aiLoading) return;
    if (queryOverride !== undefined) {
      setFilters((prev) => ({ ...prev, query: queryOverride }));
    }

    setAiLoading(true);
    setAiError(null);
    setAiExplanation(null);

    try {
      const res = await fetch('/api/ai/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, lang }),
      });
      const data = (await res.json()) as {
        field?: FieldCategory | 'all';
        degree?: DegreeLevel | 'all';
        city?: CityKey | 'all';
        language?: InstructionLanguage | 'all';
        maxTuition?: number;
        scholarshipOnly?: boolean;
        queryKeywords?: string;
        explanation?: string;
        error?: string;
      };

      if (!res.ok || data.error) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setFilters((prev) => ({
        ...prev,
        query: data.queryKeywords ?? '',
        field: data.field ?? 'all',
        degree: data.degree ?? 'all',
        city: data.city ?? 'all',
        language: data.language ?? 'all',
        maxTuition: typeof data.maxTuition === 'number' ? data.maxTuition : 3500000,
        scholarshipOnly: Boolean(data.scholarshipOnly),
      }));
      setAiExplanation(data.explanation || null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Smart Search Error';
      setAiError(msg);
    } finally {
      setAiLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setAiExplanation(null);
    setAiError(null);
  };

  const filtered = filterPrograms(programs, universities, filters);

  const enriched = filtered
    .map((prog) => {
      const uni = uniMap.get(prog.university_id);
      const fit = calculateFitScore(prog, uni, preferences);
      return { prog, uni, fit };
    })
    .sort((a, b) => {
      if (sortBy === 'fit') return b.fit.score - a.fit.score;
      if (sortBy === 'tuition_asc') {
        return (a.prog.tuition_fee ?? 99999999) - (b.prog.tuition_fee ?? 99999999);
      }
      return (b.prog.tuition_fee ?? -1) - (a.prog.tuition_fee ?? -1);
    });

  return (
    <div>
      {/* Deep Sapphire Blue Hero Section with 2-Column Campus Visual */}
      <section className="bg-academic-sapphire text-white border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Copy + Smart AI Search */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-semibold text-sky-200 tracking-wide">
                {t.hero.kicker}
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-bold text-white leading-[1.16] tracking-tight">
                {t.hero.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>

              {/* Smart Search Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSmartAiSearch();
                }}
                className="mt-7 bg-white border border-blue-200 rounded-xl shadow-lg p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="flex-1 flex items-center gap-3 px-3">
                  <Search className="w-5 h-5 text-blue-700 shrink-0" />
                  <input
                    type="text"
                    value={filters.query}
                    onChange={(e) => setFilters((p) => ({ ...p, query: e.target.value }))}
                    placeholder={t.hero.searchPlaceholder}
                    className="w-full py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={aiLoading || !filters.query.trim()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{aiLoading ? t.hero.aiParsing : t.hero.smartAiBtn}</span>
                </button>
              </form>

              {/* Example Query Buttons */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-sky-200 mr-1">{t.hero.quickExamplesLabel}</span>
                {t.hero.examples.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSmartAiSearch(ex)}
                    className="text-left px-3 py-1.5 rounded-lg bg-blue-800/70 border border-blue-600/70 hover:bg-blue-700/80 text-xs text-white transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* AI Extraction Feedback / Error */}
              {aiExplanation && (
                <div className="mt-4 p-3.5 rounded-lg bg-white/95 text-blue-950 flex items-start justify-between gap-3">
                  <div className="text-xs leading-relaxed">
                    <span className="font-semibold">{t.hero.parsedLabel} </span>
                    <span>{aiExplanation}</span>
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-950 whitespace-nowrap shrink-0"
                  >
                    {t.hero.clearFilters}
                  </button>
                </div>
              )}

              {aiError && (
                <div className="mt-4 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-900">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{aiError}</span>
                </div>
              )}
            </div>

            {/* Right Column: Stretched Campus Visual */}
            <div className="lg:col-span-5">
              <div className="h-64 sm:h-80 lg:h-full min-h-[280px] rounded-xl overflow-hidden border border-blue-400/30 shadow-xl relative bg-blue-900">
                <AcademicImage
                  src="/src/assets/images/hero_campus_yerevan_1795746425259.jpg"
                  alt={t.hero.kicker}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/90 via-blue-950/45 to-transparent p-4">
                  <div className="text-xs font-mono tabular-nums text-sky-200">
                    {universities.length}{' '}
                    {lang === 'hy' ? 'հավատարմագրված ԲՈՒՀ' : lang === 'ru' ? 'аккредитованных вузов' : 'Accredited Universities'}
                    {' · '}
                    {ALL_CITIES.length}{' '}
                    {lang === 'hy' ? 'քաղաք' : lang === 'ru' ? 'городов' : 'Cities'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search & Filters + Programs Grid */}
      <section className="bg-blueprint-grid border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Filter Rail in crisp white + soft blue accents */}
            <aside className="lg:col-span-4 xl:col-span-3 bg-white border border-blue-200/80 rounded-xl p-5 space-y-5 shadow-xs">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-blue-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-950">
                  <SlidersHorizontal className="w-4 h-4 text-blue-700" />
                  <span>{t.filters.title}</span>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-950"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.hero.clearFilters}</span>
                </button>
              </div>

              {/* University */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.filters.university}
                </label>
                <select
                  value={filters.universityId}
                  onChange={(e) => setFilters((p) => ({ ...p, universityId: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/30 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="all">{t.filters.allUniversities}</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.shortCode} — {u.name[lang]}
                    </option>
                  ))}
                </select>
              </div>

              {/* All 7 Cities */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.filters.city}
                </label>
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      city: e.target.value as SmartSearchFilters['city'],
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/30 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="all">{t.filters.allCities}</option>
                  {ALL_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {t.filters[c]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Degree */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.filters.degree}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(
                    [
                      { id: 'all', label: t.filters.allDegrees },
                      { id: 'bachelor', label: t.filters.bachelor },
                      { id: 'master', label: t.filters.master },
                      { id: 'phd', label: t.filters.phd },
                    ] as const
                  ).map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setFilters((p) => ({ ...p, degree: d.id }))}
                      className={`px-2.5 py-2 rounded-lg text-xs font-medium border transition-colors truncate ${
                        filters.degree === d.id
                          ? 'bg-blue-900 border-blue-900 text-white'
                          : 'bg-white border-blue-100 text-slate-700 hover:border-blue-400 hover:bg-blue-50/60'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.filters.field}
                </label>
                <select
                  value={filters.field}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      field: e.target.value as SmartSearchFilters['field'],
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/30 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="all">{t.filters.allFields}</option>
                  {ALL_FIELDS.map((f) => (
                    <option key={f} value={f}>
                      {t.fields[f]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.filters.language}
                </label>
                <select
                  value={filters.language}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      language: e.target.value as SmartSearchFilters['language'],
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/30 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="all">{t.filters.allLanguages}</option>
                  <option value="hy">{t.filters.hy}</option>
                  <option value="en">{t.filters.en}</option>
                  <option value="ru">{t.filters.ru}</option>
                  <option value="fr">{t.filters.fr}</option>
                </select>
              </div>

              {/* Max Tuition Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-600">{t.filters.maxTuition}</span>
                  <span className="font-mono tabular-nums font-semibold text-blue-900">
                    {formatAmd(filters.maxTuition, lang)}
                  </span>
                </div>
                <input
                  type="range"
                  min={400000}
                  max={3500000}
                  step={100000}
                  value={filters.maxTuition}
                  onChange={(e) =>
                    setFilters((p) => ({ ...p, maxTuition: Number(e.target.value) }))
                  }
                  className="w-full accent-blue-800"
                />
              </div>

              {/* Scholarship Toggle */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-blue-100">
                <input
                  type="checkbox"
                  checked={filters.scholarshipOnly}
                  onChange={(e) =>
                    setFilters((p) => ({ ...p, scholarshipOnly: e.target.checked }))
                  }
                  className="mt-0.5 rounded border-blue-300 text-blue-800 focus:ring-blue-600"
                />
                <span className="text-xs text-slate-700 leading-snug">
                  {t.filters.scholarshipOnly}
                </span>
              </label>
            </aside>

            {/* Right Results Grid */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-blue-200/80">
                <div className="text-sm text-slate-700">
                  <span className="font-mono tabular-nums font-bold text-blue-950 mr-1.5">
                    {enriched.length}
                  </span>
                  <span>{t.filters.resultsCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{t.filters.sortBy}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-1.5 rounded-lg border border-blue-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="fit">{t.filters.sortFit}</option>
                    <option value="tuition_asc">{t.filters.sortTuitionAsc}</option>
                    <option value="tuition_desc">{t.filters.sortTuitionDesc}</option>
                  </select>
                </div>
              </div>

              {enriched.length === 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-10 text-center">
                  <p className="text-sm text-slate-700">{t.filters.noResults}</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-medium hover:bg-blue-800"
                  >
                    {t.hero.clearFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enriched.map(({ prog, uni, fit }) => (
                    <ProgramCard
                      key={prog.id}
                      program={prog}
                      university={uni}
                      lang={lang}
                      fit={fit}
                      isSaved={savedProgramIds.includes(prog.id)}
                      isCompared={compareIds.includes(prog.id)}
                      onToggleSave={onToggleSave}
                      onToggleCompare={onToggleCompare}
                      onOpenDetails={onOpenDetails}
                      onOpenTrustLens={onOpenTrustLens}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Environment Visual Showcase Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-950 text-white rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 items-stretch border border-blue-900">
            <div className="sm:col-span-5 h-48 sm:h-auto">
              <AcademicImage
                src="/src/assets/images/uni_library_study_1795746426123.jpg"
                alt={t.programsPage.tabPrograms}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 p-6 flex flex-col justify-center">
              <div className="text-xs font-semibold text-sky-300">
                {lang === 'hy'
                  ? 'Ապացույցի վրա հիմնված ընտրություն'
                  : lang === 'ru'
                    ? 'Выбор на основе фактов'
                    : 'Evidence-Driven Choice'}
              </div>
              <h2 className="mt-1.5 text-lg font-bold text-white">
                {lang === 'hy'
                  ? 'Մարզային և մայրաքաղաքային բուհերի միասնական բազա'
                  : lang === 'ru'
                    ? 'Единая база столичных и региональных вузов'
                    : 'Unified Yerevan & Regional University Registry'}
              </h2>
              <p className="mt-2 text-xs text-blue-200 leading-relaxed">
                {lang === 'hy'
                  ? 'Երևան, Գյումրի, Վանաձոր, Գավառ, Գորիս, Կապան և Իջևան՝ 21 հավատարմագրված հաստատություն։'
                  : lang === 'ru'
                    ? 'Ереван, Гюмри, Ванадзор, Гавар, Горис, Капан и Иджеван — 21 аккредитованный вуз.'
                    : 'Covering 21 accredited institutions across Yerevan, Gyumri, Vanadzor, Gavar, Goris, Kapan, and Ijevan.'}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 items-stretch">
            <div className="sm:col-span-5 h-48 sm:h-auto">
              <AcademicImage
                src="/src/assets/images/uni_tech_lab_1795746427182.jpg"
                alt={t.communityPage.tabJobs}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 p-6 flex flex-col justify-center">
              <div className="text-xs font-semibold text-blue-700">
                {lang === 'hy'
                  ? 'Գիտություն և ակադեմիական շարժունություն'
                  : lang === 'ru'
                    ? 'Наука и академическая мобильность'
                    : 'Research & Academic Mobility'}
              </div>
              <h2 className="mt-1.5 text-lg font-bold text-blue-950">
                {lang === 'hy'
                  ? 'Կրթաթոշակներ, փոխանակումներ և գիտական հաստիքներ'
                  : lang === 'ru'
                    ? 'Стипендии, обмены и научные вакансии'
                    : 'Scholarships, Exchanges & Faculty Careers'}
              </h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {lang === 'hy'
                  ? 'Erasmus+, DAAD, IREX և ՀՀ բուհերի թափուր հաստիքները՝ մշտական թարմացմամբ։'
                  : lang === 'ru'
                    ? 'Erasmus+, DAAD, IREX и академические вакансии с регулярной проверкой.'
                    : 'Verified Erasmus+, DAAD, IREX grants and EURAXESS-modeled faculty competitions.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
