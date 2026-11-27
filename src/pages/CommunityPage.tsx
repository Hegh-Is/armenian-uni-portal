import { useState } from 'react';
import {
  Newspaper,
  Briefcase,
  ShieldCheck,
  Bookmark,
  Bell,
  Check,
  ExternalLink,
  X,
  Calendar,
  MapPin,
} from 'lucide-react';
import type {
  Lang,
  University,
  NewsEvent,
  AcademicJob,
  NewsCategory,
  AcademicDegreeReq,
  EmploymentType,
  TrustEntityType,
} from '../types/schema';
import { I18N } from '../scripts/i18n';
import { AcademicImage } from '../components/AcademicImage';

interface CommunityPageProps {
  lang: Lang;
  universities: University[];
  newsEvents: NewsEvent[];
  academicJobs: AcademicJob[];
  savedJobIds: string[];
  appliedJobIds: string[];
  jobAlertSubscribed: boolean;
  onToggleSaveJob: (id: string) => void;
  onApplyJob: (id: string) => void;
  onToggleJobAlerts: () => void;
  onOpenTrustLens: (
    entityType: TrustEntityType,
    entityId: string,
    fieldName: string,
    isMissing?: boolean
  ) => void;
}

export function CommunityPage({
  lang,
  universities,
  newsEvents,
  academicJobs,
  savedJobIds,
  appliedJobIds,
  jobAlertSubscribed,
  onToggleSaveJob,
  onApplyJob,
  onToggleJobAlerts,
  onOpenTrustLens,
}: CommunityPageProps) {
  const t = I18N[lang];
  const [activeTab, setActiveTab] = useState<'news' | 'jobs'>('news');

  // News filters
  const [newsUniFilter, setNewsUniFilter] = useState<string>('all');
  const [newsCatFilter, setNewsCatFilter] = useState<'all' | NewsCategory>('all');

  // Job filters
  const [jobUniFilter, setJobUniFilter] = useState<string>('all');
  const [jobDegreeFilter, setJobDegreeFilter] = useState<'all' | AcademicDegreeReq>('all');
  const [jobTypeFilter, setJobTypeFilter] = useState<'all' | EmploymentType>('all');

  // Online application modal state
  const [applyingJob, setApplyingJob] = useState<AcademicJob | null>(null);
  const [appName, setAppName] = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appNote, setAppNote] = useState('');
  const [appSubmitted, setAppSubmitted] = useState(false);

  const uniMap = new Map(universities.map((u) => [u.id, u]));

  const filteredNews = newsEvents.filter((n) => {
    if (newsUniFilter !== 'all' && n.university_id !== newsUniFilter) return false;
    if (newsCatFilter !== 'all' && n.category !== newsCatFilter) return false;
    return true;
  });

  const filteredJobs = academicJobs.filter((j) => {
    if (jobUniFilter !== 'all' && j.university_id !== jobUniFilter) return false;
    if (jobDegreeFilter !== 'all' && j.degree_req !== jobDegreeFilter) return false;
    if (jobTypeFilter !== 'all' && j.employment_type !== jobTypeFilter) return false;
    return true;
  });

  const catLabels: Record<NewsCategory, string> = {
    conference: t.communityPage.catConference,
    olympiad: t.communityPage.catOlympiad,
    hackathon: t.communityPage.catHackathon,
    open_day: t.communityPage.catOpenDay,
    admissions: t.communityPage.catAdmissions,
  };

  const degreeReqLabels: Record<AcademicDegreeReq, string> = {
    master: t.communityPage.jobMaster,
    phd: t.communityPage.jobPhd,
    doctor: t.communityPage.jobDoctor,
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob || !appName.trim() || !appEmail.trim()) return;
    onApplyJob(applyingJob.id);
    setAppSubmitted(true);
  };

  return (
    <div>
      {/* Sapphire Header Banner with Research Lab Visual */}
      <section className="bg-academic-sapphire text-white border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.communityPage.title}</h1>
              <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-3xl">
                {t.communityPage.subtitle}
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center gap-1.5 p-1 bg-blue-950/60 border border-blue-700/70 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('news')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === 'news'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <Newspaper className="w-4 h-4" />
                  <span>{t.communityPage.tabNews}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('jobs')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === 'jobs'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>{t.communityPage.tabJobs}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="h-44 rounded-xl overflow-hidden border border-blue-400/30 shadow-lg">
                <AcademicImage
                  src="/src/assets/images/uni_tech_lab_1795746427182.jpg"
                  alt={t.communityPage.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section 3.1: Student News & Events */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center gap-4">
              <select
                value={newsUniFilter}
                onChange={(e) => setNewsUniFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
              >
                <option value="all">{t.filters.allUniversities}</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.shortCode} — {u.name[lang]}
                  </option>
                ))}
              </select>

              <select
                value={newsCatFilter}
                onChange={(e) => setNewsCatFilter(e.target.value as 'all' | NewsCategory)}
                className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
              >
                <option value="all">{t.communityPage.allCategories}</option>
                {(['hackathon', 'open_day', 'admissions', 'conference', 'olympiad'] as NewsCategory[]).map(
                  (c) => (
                    <option key={c} value={c}>
                      {catLabels[c]}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((item) => {
                const uni = uniMap.get(item.university_id);
                return (
                  <article
                    key={item.id}
                    className="bg-white border border-blue-200/80 hover:border-blue-400 rounded-xl p-6 flex flex-col justify-between transition-colors shadow-xs"
                  >
                    <div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-blue-900">{uni?.shortCode}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-blue-700">{catLabels[item.category]}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{item.event_date}</span>
                      </div>

                      <h2 className="mt-2 text-lg font-bold text-slate-900 leading-snug">
                        {item.title[lang]}
                      </h2>
                      <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                        {item.content[lang]}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-700" />
                          <span>{item.location[lang]}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                          <Calendar className="w-3.5 h-3.5 text-blue-700" />
                          <span>{item.event_date}</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onOpenTrustLens('news', item.id, 'announcement')}
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Trust Lens</span>
                      </button>

                      <a
                        href={item.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-950"
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

        {/* Section 3.2: Academic Career Board (EURAXESS Model) */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={jobUniFilter}
                  onChange={(e) => setJobUniFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
                >
                  <option value="all">{t.filters.allUniversities}</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.shortCode}
                    </option>
                  ))}
                </select>

                <select
                  value={jobDegreeFilter}
                  onChange={(e) => setJobDegreeFilter(e.target.value as 'all' | AcademicDegreeReq)}
                  className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
                >
                  <option value="all">{t.communityPage.jobDegreeReq}</option>
                  <option value="master">{t.communityPage.jobMaster}</option>
                  <option value="phd">{t.communityPage.jobPhd}</option>
                  <option value="doctor">{t.communityPage.jobDoctor}</option>
                </select>

                <select
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value as 'all' | EmploymentType)}
                  className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-slate-800"
                >
                  <option value="all">{t.communityPage.jobEmployment}</option>
                  <option value="full_time">{t.communityPage.jobFullTime}</option>
                  <option value="part_time">{t.communityPage.jobPartTime}</option>
                </select>
              </div>

              <button
                type="button"
                onClick={onToggleJobAlerts}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  jobAlertSubscribed
                    ? 'bg-blue-900 border-blue-900 text-white'
                    : 'bg-white border-blue-300 text-blue-900 hover:bg-blue-50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>
                  {jobAlertSubscribed
                    ? t.communityPage.subscribedAlerts
                    : t.communityPage.subscribeAlerts}
                </span>
              </button>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const uni = uniMap.get(job.university_id);
                const isSaved = savedJobIds.includes(job.id);
                const isApplied = appliedJobIds.includes(job.id);

                return (
                  <article
                    key={job.id}
                    className="bg-white border border-blue-200/80 hover:border-blue-400 rounded-xl p-6 transition-colors shadow-xs"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                          <span className="font-semibold text-blue-900">{uni?.shortCode}</span>
                          <span aria-hidden="true">·</span>
                          <span>{job.department[lang]}</span>
                          <span aria-hidden="true">·</span>
                          <span>{degreeReqLabels[job.degree_req]}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {job.employment_type === 'full_time'
                              ? t.communityPage.jobFullTime
                              : t.communityPage.jobPartTime}
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-slate-900">{job.position[lang]}</h2>

                        <div className="text-sm font-medium text-blue-900">
                          {job.salaryRange ? job.salaryRange[lang] : t.program.unpublished}
                        </div>

                        <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                          <div>
                            <div className="font-semibold text-slate-900 mb-1">
                              {t.communityPage.jobDegreeReq}
                            </div>
                            <ul className="list-disc pl-4 space-y-1">
                              {job.requirements.map((r, i) => (
                                <li key={i}>{r[lang]}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 mb-1">
                              {t.program.documentsTitle}
                            </div>
                            <ul className="list-disc pl-4 space-y-1">
                              {job.documents.map((d, i) => (
                                <li key={i}>{d[lang]}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="lg:text-right shrink-0 flex flex-col justify-between gap-4">
                        <div>
                          <div className="text-xs text-slate-500">{t.program.deadline}</div>
                          <div className="text-sm font-mono tabular-nums font-bold text-slate-900 mt-0.5">
                            {job.deadline}
                          </div>
                        </div>

                        <div className="flex flex-wrap lg:justify-end items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onOpenTrustLens('job', job.id, 'vacancy', job.salaryRange === null)
                            }
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-blue-200 text-xs font-medium text-blue-700 hover:bg-blue-50"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Trust Lens</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleSaveJob(job.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                              isSaved
                                ? 'bg-blue-50 border-blue-300 text-blue-900'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-700 text-blue-700' : ''}`} />
                            <span>{isSaved ? t.program.saved : t.program.save}</span>
                          </button>

                          <button
                            type="button"
                            disabled={isApplied}
                            onClick={() => {
                              setApplyingJob(job);
                              setAppSubmitted(false);
                            }}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                              isApplied
                                ? 'bg-blue-50 text-blue-900 border border-blue-200 cursor-default'
                                : 'bg-blue-900 hover:bg-blue-800 text-white'
                            }`}
                          >
                            {isApplied && <Check className="w-3.5 h-3.5" />}
                            <span>
                              {isApplied ? t.communityPage.applied : t.communityPage.applyOnline}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Online Application Modal */}
      {applyingJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-blue-200 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">{applyingJob.position[lang]}</h2>
                <p className="text-xs text-blue-200 mt-0.5">
                  {uniMap.get(applyingJob.university_id)?.name[lang]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setApplyingJob(null)}
                className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {appSubmitted ? (
              <div className="p-6 space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-950 font-medium">
                  {t.communityPage.applicationSuccess}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2 rounded-lg bg-blue-900 text-white text-sm font-medium"
                  >
                    {t.compare.close}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {t.communityPage.applicantName}
                  </label>
                  <input
                    type="text"
                    required
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {t.communityPage.applicantEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={appEmail}
                    onChange={(e) => setAppEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {t.communityPage.coverNote}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={appNote}
                    onChange={(e) => setAppNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700"
                  >
                    {t.compare.close}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium"
                  >
                    {t.communityPage.submitApplication}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
