import { useState } from 'react';
import {
  UserCheck,
  Sliders,
  Calendar,
  BellRing,
  Bookmark,
  Trash2,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import type {
  Lang,
  UserAccount,
  UserRole,
  UserProfilePreferences,
  Program,
  University,
  MobilityProgram,
  AcademicJob,
  ChangeAlert,
  FieldCategory,
  InstructionLanguage,
  DegreeLevel,
  CityKey,
} from '../types/schema';
import { I18N, formatAmd } from '../scripts/i18n';
import { calculateFitScore } from '../scripts/fitScore';
import { getDaysUntil } from '../scripts/smartFilter';

interface DashboardPageProps {
  lang: Lang;
  user: UserAccount;
  universities: University[];
  programs: Program[];
  mobilityPrograms: MobilityProgram[];
  academicJobs: AcademicJob[];
  changeAlerts: ChangeAlert[];
  onUpdateUser: (updater: (prev: UserAccount) => UserAccount) => void;
  onOpenProgramDetails: (program: Program) => void;
}

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

export function DashboardPage({
  lang,
  user,
  universities,
  programs,
  mobilityPrograms,
  academicJobs,
  changeAlerts,
  onUpdateUser,
  onOpenProgramDetails,
}: DashboardPageProps) {
  const t = I18N[lang];
  const [draftPrefs, setDraftPrefs] = useState<UserProfilePreferences>(user.preferences);
  const [draftName, setDraftName] = useState(user.name);
  const [draftEmail, setDraftEmail] = useState(user.email);
  const [savedToast, setSavedToast] = useState(false);

  const uniMap = new Map(universities.map((u) => [u.id, u]));

  const savedPrograms = programs.filter((p) => user.savedProgramIds.includes(p.id));
  const savedMobility = mobilityPrograms.filter((m) => user.savedMobilityIds.includes(m.id));
  const savedJobs = academicJobs.filter((j) => user.savedJobIds.includes(j.id));

  const calendarEntries = [
    ...savedPrograms
      .filter((p) => p.deadline !== null)
      .map((p) => ({
        id: `cal-p-${p.id}`,
        title: p.title[lang],
        sub: uniMap.get(p.university_id)?.shortCode || '',
        deadline: p.deadline as string,
        daysLeft: getDaysUntil(p.deadline),
        program: p,
      })),
    ...savedMobility.map((m) => ({
      id: `cal-m-${m.id}`,
      title: m.title[lang],
      sub: m.provider,
      deadline: m.deadline,
      daysLeft: getDaysUntil(m.deadline),
      program: undefined,
    })),
    ...savedJobs.map((j) => ({
      id: `cal-j-${j.id}`,
      title: j.position[lang],
      sub: uniMap.get(j.university_id)?.shortCode || '',
      deadline: j.deadline,
      daysLeft: getDaysUntil(j.deadline),
      program: undefined,
    })),
  ].sort((a, b) => a.deadline.localeCompare(b.deadline));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser((prev) => ({
      ...prev,
      name: draftName.trim() || prev.name,
      email: draftEmail.trim() || prev.email,
      preferences: draftPrefs,
    }));
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  return (
    <div>
      {/* Sapphire Header */}
      <section className="bg-academic-sapphire text-white border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.dashboardPage.title}</h1>
            <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-3xl">
              {t.dashboardPage.subtitle}
            </p>
          </div>

          <div className="text-xs text-blue-100 bg-blue-950/70 border border-blue-700 rounded-lg px-3.5 py-2.5 shrink-0">
            <span>{t.dashboardPage.authNote} </span>
            <span className="font-semibold text-white">{user.name}</span>
            <span className="text-blue-400 mx-1.5">·</span>
            <span className="font-mono">{user.email}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Top Row: Role & Fit Score Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Role & Auth Selector */}
          <div className="lg:col-span-4 bg-white border border-blue-200/80 rounded-xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 text-base font-semibold text-blue-950">
              <UserCheck className="w-5 h-5 text-blue-700" />
              <h2>{t.dashboardPage.roleTitle}</h2>
            </div>

            <div className="space-y-2">
              {(['applicant', 'international', 'parent', 'lecturer'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => onUpdateUser((prev) => ({ ...prev, role }))}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors flex items-center justify-between ${
                    user.role === role
                      ? 'bg-blue-900 border-blue-900 text-white'
                      : 'bg-white border-blue-100 text-slate-700 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}
                >
                  <span>{t.dashboardPage.roles[role]}</span>
                  {user.role === role && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-blue-100 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  {t.communityPage.applicantName}
                </label>
                <input
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  {t.communityPage.applicantEmail}
                </label>
                <input
                  type="email"
                  value={draftEmail}
                  onChange={(e) => setDraftEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Fit Score Preferences Form */}
          <form
            onSubmit={handleSaveProfile}
            className="lg:col-span-8 bg-white border border-blue-200/80 rounded-xl p-6 space-y-5 shadow-xs"
          >
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-blue-100">
              <div className="flex items-center gap-2 text-base font-semibold text-blue-950">
                <Sliders className="w-5 h-5 text-blue-700" />
                <h2>{t.dashboardPage.profileTitle}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-600">{t.dashboardPage.budgetLabel}</span>
                  <span className="font-mono tabular-nums font-bold text-blue-900">
                    {formatAmd(draftPrefs.maxBudgetAmd, lang)}
                  </span>
                </div>
                <input
                  type="range"
                  min={400000}
                  max={3500000}
                  step={50000}
                  value={draftPrefs.maxBudgetAmd}
                  onChange={(e) =>
                    setDraftPrefs((p) => ({ ...p, maxBudgetAmd: Number(e.target.value) }))
                  }
                  className="w-full accent-blue-800"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-600">{t.dashboardPage.gpaLabel}</span>
                  <span className="font-mono tabular-nums font-bold text-blue-900">
                    {draftPrefs.gpa.toFixed(1)} / 20
                  </span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={20}
                  step={0.5}
                  value={draftPrefs.gpa}
                  onChange={(e) => setDraftPrefs((p) => ({ ...p, gpa: Number(e.target.value) }))}
                  className="w-full accent-blue-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.dashboardPage.preferredField}
                </label>
                <select
                  value={draftPrefs.preferredField}
                  onChange={(e) =>
                    setDraftPrefs((p) => ({
                      ...p,
                      preferredField: e.target.value as FieldCategory | 'all',
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm"
                >
                  <option value="all">{t.filters.allFields}</option>
                  {ALL_FIELDS.map((f) => (
                    <option key={f} value={f}>
                      {t.fields[f]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.dashboardPage.preferredLang}
                </label>
                <select
                  value={draftPrefs.preferredLanguage}
                  onChange={(e) =>
                    setDraftPrefs((p) => ({
                      ...p,
                      preferredLanguage: e.target.value as InstructionLanguage | 'all',
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm"
                >
                  <option value="all">{t.filters.allLanguages}</option>
                  <option value="hy">{t.filters.hy}</option>
                  <option value="en">{t.filters.en}</option>
                  <option value="ru">{t.filters.ru}</option>
                  <option value="fr">{t.filters.fr}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.dashboardPage.preferredCity}
                </label>
                <select
                  value={draftPrefs.preferredCity}
                  onChange={(e) =>
                    setDraftPrefs((p) => ({
                      ...p,
                      preferredCity: e.target.value as UserProfilePreferences['preferredCity'],
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm"
                >
                  <option value="all">{t.filters.allCities}</option>
                  {ALL_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {t.filters[c]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t.dashboardPage.preferredDegree}
                </label>
                <select
                  value={draftPrefs.preferredDegree}
                  onChange={(e) =>
                    setDraftPrefs((p) => ({
                      ...p,
                      preferredDegree: e.target.value as DegreeLevel | 'all',
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm"
                >
                  <option value="all">{t.filters.allDegrees}</option>
                  <option value="bachelor">{t.filters.bachelor}</option>
                  <option value="master">{t.filters.master}</option>
                  <option value="phd">{t.filters.phd}</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
              {savedToast ? (
                <span className="text-xs font-medium text-blue-800">
                  {t.dashboardPage.profileSavedToast}
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
              >
                {t.dashboardPage.saveProfile}
              </button>
            </div>
          </form>
        </div>

        {/* Middle Row: Saved Lists + Personal Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Saved Lists */}
          <div className="lg:col-span-7 bg-white border border-blue-200/80 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center gap-2 text-base font-semibold text-blue-950">
              <Bookmark className="w-5 h-5 text-blue-700" />
              <h2>
                {t.dashboardPage.savedProgramsTitle} ({savedPrograms.length})
              </h2>
            </div>

            {savedPrograms.length === 0 ? (
              <p className="text-sm text-slate-500">{t.dashboardPage.emptySaved}</p>
            ) : (
              <div className="divide-y divide-slate-100 border border-blue-100 rounded-lg overflow-hidden">
                {savedPrograms.map((prog) => {
                  const uni = uniMap.get(prog.university_id);
                  const fit = calculateFitScore(prog, uni, user.preferences);
                  return (
                    <div
                      key={prog.id}
                      className="p-4 flex items-center justify-between gap-4 hover:bg-blue-50/50 transition-colors"
                    >
                      <div>
                        <div className="text-xs text-slate-500">
                          <span className="font-semibold text-blue-900">{uni?.shortCode}</span>
                          <span className="mx-1.5">·</span>
                          <span className="font-mono tabular-nums font-semibold text-blue-800">
                            {fit.score}% {t.program.fitScore}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenProgramDetails(prog)}
                          className="text-sm font-semibold text-slate-900 hover:text-blue-800 text-left mt-0.5 flex items-center gap-1"
                        >
                          <span>{prog.title[lang]}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateUser((prev) => ({
                            ...prev,
                            savedProgramIds: prev.savedProgramIds.filter((id) => id !== prog.id),
                          }))
                        }
                        aria-label="Remove saved program"
                        className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {(savedMobility.length > 0 || savedJobs.length > 0) && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                {savedMobility.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      {t.dashboardPage.savedMobilityTitle} ({savedMobility.length})
                    </h3>
                    <div className="space-y-2">
                      {savedMobility.map((mob) => (
                        <div
                          key={mob.id}
                          className="p-3 rounded-lg border border-blue-100 flex items-center justify-between gap-3 text-sm"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{mob.title[lang]}</div>
                            <div className="text-xs text-slate-500 font-mono tabular-nums">
                              {mob.provider} · {mob.deadline}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateUser((prev) => ({
                                ...prev,
                                savedMobilityIds: prev.savedMobilityIds.filter((id) => id !== mob.id),
                              }))
                            }
                            className="p-1.5 text-slate-400 hover:text-slate-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {savedJobs.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      {t.dashboardPage.savedJobsTitle} ({savedJobs.length})
                    </h3>
                    <div className="space-y-2">
                      {savedJobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-3 rounded-lg border border-blue-100 flex items-center justify-between gap-3 text-sm"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{job.position[lang]}</div>
                            <div className="text-xs text-slate-500 font-mono tabular-nums">
                              {uniMap.get(job.university_id)?.shortCode} · {job.deadline}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateUser((prev) => ({
                                ...prev,
                                savedJobIds: prev.savedJobIds.filter((id) => id !== job.id),
                              }))
                            }
                            className="p-1.5 text-slate-400 hover:text-slate-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Personal Deadlines Calendar */}
          <div className="lg:col-span-5 bg-white border border-blue-200/80 rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-base font-semibold text-blue-950">
              <Calendar className="w-5 h-5 text-blue-700" />
              <h2>{t.dashboardPage.calendarTitle}</h2>
            </div>

            {calendarEntries.length === 0 ? (
              <p className="text-sm text-slate-500">{t.dashboardPage.emptySaved}</p>
            ) : (
              <div className="space-y-3">
                {calendarEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-semibold text-blue-800">{entry.sub}</div>
                      <div className="text-sm font-medium text-slate-900 mt-0.5">{entry.title}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono tabular-nums font-bold text-blue-950">
                        {entry.deadline}
                      </div>
                      {entry.daysLeft !== null && (
                        <div className="text-[11px] font-mono tabular-nums text-slate-600 mt-0.5">
                          {entry.daysLeft} {t.dashboardPage.daysLeft}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Change Detection ("Ի՞նչ է փոխվել") */}
        <div className="bg-white border border-blue-200/80 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-blue-100">
            <div>
              <div className="flex items-center gap-2 text-base font-semibold text-blue-950">
                <BellRing className="w-5 h-5 text-blue-700" />
                <h2>{t.dashboardPage.changesTitle}</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">{t.dashboardPage.changesSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {changeAlerts.map((alert) => {
              const isRead = user.readAlertIds.includes(alert.id);
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    isRead
                      ? 'bg-slate-50/60 border-slate-200 opacity-75'
                      : 'bg-blue-50/70 border-blue-200'
                  }`}
                >
                  <div className="text-xs font-mono tabular-nums text-slate-500">
                    {alert.detectedAt}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1">{alert.title[lang]}</div>
                  <div className="text-xs font-medium text-blue-800 mt-1">
                    {alert.fieldChanged[lang]}
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className="text-slate-500">
                      <span>{t.dashboardPage.oldLabel} </span>
                      <span className="line-through">{alert.oldValue[lang]}</span>
                    </div>
                    <div className="text-blue-950 font-semibold">
                      <span>{t.dashboardPage.newLabel} </span>
                      <span>{alert.newValue[lang]}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 truncate max-w-[130px]">
                      {alert.hash}
                    </span>
                    {!isRead && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateUser((prev) => ({
                            ...prev,
                            readAlertIds: [...prev.readAlertIds, alert.id],
                          }))
                        }
                        className="text-xs font-semibold text-blue-700 hover:text-blue-950"
                      >
                        {t.dashboardPage.markRead}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
