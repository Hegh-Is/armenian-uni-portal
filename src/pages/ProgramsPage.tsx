import { useState } from 'react';
import {
  Building2,
  GraduationCap,
  Globe2,
  ExternalLink,
  Bookmark,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import type {
  Lang,
  University,
  Program,
  MobilityProgram,
  UserProfilePreferences,
  TrustEntityType,
  DegreeLevel,
  FundingType,
  CityKey,
  UniversityType,
} from '../types/schema';
import { I18N } from '../scripts/i18n';
import { calculateFitScore } from '../scripts/fitScore';
import { ProgramCard } from '../components/ProgramCard';
import { AcademicImage } from '../components/AcademicImage';

interface ProgramsPageProps {
  lang: Lang;
  universities: University[];
  programs: Program[];
  mobilityPrograms: MobilityProgram[];
  preferences: UserProfilePreferences;
  savedProgramIds: string[];
  savedMobilityIds: string[];
  compareIds: string[];
  onToggleSaveProgram: (id: string) => void;
  onToggleSaveMobility: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenProgramDetails: (program: Program) => void;
  onOpenUniversityDetails: (university: University) => void;
  onOpenTrustLens: (
    entityType: TrustEntityType,
    entityId: string,
    fieldName: string,
    isMissing?: boolean
  ) => void;
}

const ALL_CITIES: CityKey[] = ['yerevan', 'gyumri', 'vanadzor', 'gavar', 'goris', 'kapan', 'ijevan'];

export function ProgramsPage({
  lang,
  universities,
  programs,
  mobilityPrograms,
  preferences,
  savedProgramIds,
  savedMobilityIds,
  compareIds,
  onToggleSaveProgram,
  onToggleSaveMobility,
  onToggleCompare,
  onOpenProgramDetails,
  onOpenUniversityDetails,
  onOpenTrustLens,
}: ProgramsPageProps) {
  const t = I18N[lang];
  const [activeTab, setActiveTab] = useState<'universities' | 'programs' | 'mobility'>('universities');

  // University directory filters
  const [uniCityFilter, setUniCityFilter] = useState<'all' | CityKey>('all');
  const [uniTypeFilter, setUniTypeFilter] = useState<'all' | UniversityType>('all');

  // Mobility filters
  const [mobFunding, setMobFunding] = useState<'all' | FundingType>('all');
  const [mobDegree, setMobDegree] = useState<'all' | DegreeLevel>('all');
  const [mobCountry, setMobCountry] = useState<string>('all');

  const uniMap = new Map(universities.map((u) => [u.id, u]));

  const filteredUniversities = universities.filter((u) => {
    if (uniCityFilter !== 'all' && u.cityKey !== uniCityFilter) return false;
    if (uniTypeFilter !== 'all' && u.type !== uniTypeFilter) return false;
    return true;
  });

  const filteredMobility = mobilityPrograms.filter((m) => {
    if (mobFunding !== 'all' && m.funding_type !== mobFunding) return false;
    if (mobDegree !== 'all' && !m.targetDegrees.includes(mobDegree)) return false;
    if (mobCountry !== 'all' && m.countryKey !== mobCountry) return false;
    return true;
  });

  return (
    <div>
      {/* Rich Sapphire Visual Header Banner */}
      <section className="bg-academic-sapphire text-white border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.programsPage.title}</h1>
              <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-3xl">
                {t.programsPage.subtitle}
              </p>

              {/* Segmented Tab Controls */}
              <div className="mt-6 inline-flex flex-wrap items-center gap-1.5 p-1 bg-blue-950/60 border border-blue-700/70 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('universities')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === 'universities'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>
                    {t.programsPage.tabUniversities} ({universities.length})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('programs')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === 'programs'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>
                    {t.programsPage.tabPrograms} ({programs.length})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('mobility')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === 'mobility'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <Globe2 className="w-4 h-4" />
                  <span>{t.programsPage.tabMobility}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="h-44 rounded-xl overflow-hidden border border-blue-400/30 shadow-lg">
                <AcademicImage
                  src={
                    activeTab === 'mobility'
                      ? '/src/assets/images/uni_mobility_global_1795746427085.jpg'
                      : '/src/assets/images/uni_library_study_1795746426123.jpg'
                  }
                  alt={t.programsPage.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section 2.1: Universities Directory */}
        {activeTab === 'universities' && (
          <div className="space-y-6">
            {/* City & Type Filters */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={uniCityFilter}
                  onChange={(e) => setUniCityFilter(e.target.value as 'all' | CityKey)}
                  className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-900"
                >
                  <option value="all">{t.filters.allCities}</option>
                  {ALL_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {t.filters[c]}
                    </option>
                  ))}
                </select>

                <select
                  value={uniTypeFilter}
                  onChange={(e) => setUniTypeFilter(e.target.value as 'all' | UniversityType)}
                  className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-900"
                >
                  <option value="all">{t.programsPage.allTypes}</option>
                  <option value="state">{t.programsPage.uniTypeState}</option>
                  <option value="private">{t.programsPage.uniTypePrivate}</option>
                  <option value="international">{t.programsPage.uniTypeIntl}</option>
                </select>
              </div>

              <div className="text-xs font-mono tabular-nums font-semibold text-blue-900">
                {filteredUniversities.length} / {universities.length}{' '}
                {lang === 'hy' ? 'ԲՈՒՀ' : lang === 'ru' ? 'ВУЗов' : 'Universities'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((uni) => {
                const progCount = programs.filter((p) => p.university_id === uni.id).length;
                const typeLabel =
                  uni.type === 'state'
                    ? t.programsPage.uniTypeState
                    : uni.type === 'private'
                      ? t.programsPage.uniTypePrivate
                      : t.programsPage.uniTypeIntl;

                return (
                  <article
                    key={uni.id}
                    className="bg-white border border-blue-200/80 hover:border-blue-500 rounded-xl p-6 flex flex-col justify-between transition-colors shadow-xs"
                  >
                    <div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-blue-900">{uni.shortCode}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-blue-700">{uni.city[lang]}</span>
                        <span aria-hidden="true">·</span>
                        <span>{typeLabel}</span>
                      </div>

                      <h2 className="mt-2 text-base font-bold text-slate-900 leading-snug">
                        <button
                          type="button"
                          onClick={() => onOpenUniversityDetails(uni)}
                          className="text-left hover:text-blue-800 transition-colors"
                        >
                          {uni.name[lang]}
                        </button>
                      </h2>

                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        {uni.description[lang]}
                      </p>

                      <dl className="mt-4 pt-4 border-t border-blue-100 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <dt className="text-slate-500">{t.programsPage.founded}</dt>
                          <dd className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5">
                            {uni.founded}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">{t.programsPage.students}</dt>
                          <dd className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5">
                            ~{new Intl.NumberFormat('en-US').format(uni.studentCount)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">{t.programsPage.tabPrograms}</dt>
                          <dd className="font-mono tabular-nums font-semibold text-blue-800 mt-0.5">
                            {progCount} {t.programsPage.programsCount}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <a
                        href={uni.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-950"
                      >
                        <span>{t.programsPage.visitWebsite}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onOpenUniversityDetails(uni)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium transition-colors"
                      >
                        <span>{t.programsPage.viewUniDetails}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2.2: Full Programs Catalog */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => {
              const uni = uniMap.get(prog.university_id);
              const fit = calculateFitScore(prog, uni, preferences);
              return (
                <ProgramCard
                  key={prog.id}
                  program={prog}
                  university={uni}
                  lang={lang}
                  fit={fit}
                  isSaved={savedProgramIds.includes(prog.id)}
                  isCompared={compareIds.includes(prog.id)}
                  onToggleSave={onToggleSaveProgram}
                  onToggleCompare={onToggleCompare}
                  onOpenDetails={onOpenProgramDetails}
                  onOpenTrustLens={onOpenTrustLens}
                />
              );
            })}
          </div>
        )}

        {/* Section 2.3: Exchange & Mobility Programs */}
        {activeTab === 'mobility' && (
          <div className="space-y-6">
            {/* Mobility Visual Feature + Filters */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center gap-4">
              <select
                value={mobCountry}
                onChange={(e) => setMobCountry(e.target.value)}
                className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
              >
                <option value="all">
                  {t.programsPage.hostCountry}: {t.communityPage.allCategories}
                </option>
                <option value="eu">EU / Erasmus+</option>
                <option value="germany">Germany (DAAD)</option>
                <option value="usa">United States (IREX)</option>
                <option value="france">France (Campus France)</option>
              </select>

              <select
                value={mobDegree}
                onChange={(e) => setMobDegree(e.target.value as 'all' | DegreeLevel)}
                className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
              >
                <option value="all">{t.filters.allDegrees}</option>
                <option value="bachelor">{t.filters.bachelor}</option>
                <option value="master">{t.filters.master}</option>
                <option value="phd">{t.filters.phd}</option>
              </select>

              <select
                value={mobFunding}
                onChange={(e) => setMobFunding(e.target.value as 'all' | FundingType)}
                className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
              >
                <option value="all">{t.communityPage.allCategories}</option>
                <option value="full">{t.programsPage.fundingFull}</option>
                <option value="partial">{t.programsPage.fundingPartial}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMobility.map((mob) => {
                const isSaved = savedMobilityIds.includes(mob.id);
                return (
                  <article
                    key={mob.id}
                    className="bg-white border border-blue-200/80 hover:border-blue-400 rounded-xl p-6 flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-blue-900">{mob.provider}</span>
                        <span aria-hidden="true">·</span>
                        <span>{mob.host_country[lang]}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-700 font-medium">
                          {mob.funding_type === 'full'
                            ? t.programsPage.fundingFull
                            : t.programsPage.fundingPartial}
                        </span>
                      </div>

                      <h2 className="mt-2 text-lg font-bold text-slate-900">{mob.title[lang]}</h2>
                      <p className="mt-2 text-sm font-medium text-blue-950 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                        {mob.stipendSummary[lang]}
                      </p>

                      <dl className="mt-4 space-y-2.5 text-sm">
                        <div>
                          <dt className="text-xs text-slate-500">{t.programsPage.eligibility}</dt>
                          <dd className="text-slate-700 mt-0.5">{mob.eligibility[lang]}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-slate-500">{t.programsPage.partnerUnis}</dt>
                          <dd className="text-slate-700 mt-0.5">{mob.partner_unis[lang]}</dd>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-xs text-slate-500">{t.program.deadline}</span>
                          <span className="font-mono tabular-nums font-semibold text-slate-900">
                            {mob.deadline}
                          </span>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleSaveMobility(mob.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            isSaved
                              ? 'bg-blue-50 border-blue-300 text-blue-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-700 text-blue-700' : ''}`} />
                          <span>{isSaved ? t.program.saved : t.program.save}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenTrustLens('mobility', mob.id, 'stipend')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-50"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Trust Lens</span>
                        </button>
                      </div>

                      <a
                        href={mob.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                      >
                        <span>{t.trustLens.openOriginal}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
