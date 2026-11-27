import { useState } from 'react';
import {
  ShieldCheck,
  Database,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from 'lucide-react';
import type { Lang, University } from '../types/schema';
import { I18N } from '../scripts/i18n';
import { AcademicImage } from '../components/AcademicImage';

interface AboutPageProps {
  lang: Lang;
  universities: University[];
  onOpenUniversityDetails: (university: University) => void;
}

export function AboutPage({ lang, universities, onOpenUniversityDetails }: AboutPageProps) {
  const t = I18N[lang];

  // Report / Partnership form state
  const [reportType, setReportType] = useState<'issue' | 'partner'>('issue');
  const [selectedUni, setSelectedUni] = useState(universities[0]?.id || 'ysu');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Direct Contact Us form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setSubmitted(true);
    setMessage('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;
    setContactSent(true);
    setContactMsg('');
    setContactSubject('');
  };

  return (
    <div>
      {/* Sapphire Hero Banner with Mobility/Campus Visual */}
      <section className="bg-academic-sapphire text-white border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {t.aboutPage.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl">
                {t.aboutPage.subtitle}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="h-52 rounded-xl overflow-hidden border border-blue-400/30 shadow-xl">
                <AcademicImage
                  src="/src/assets/images/uni_mobility_global_1795746427085.jpg"
                  alt={t.aboutPage.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Mission & 3 DeLone & McLean Pillars */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xl font-bold text-blue-950">{t.aboutPage.missionTitle}</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{t.aboutPage.missionBody}</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <ShieldCheck className="w-6 h-6 text-blue-800" />
              <h3 className="mt-3 text-sm font-bold text-blue-950">
                {lang === 'hy'
                  ? 'Տեղեկատվության որակ'
                  : lang === 'ru'
                    ? 'Качество данных'
                    : 'Information Quality'}
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                {lang === 'hy'
                  ? 'Ստուգելի փաստեր անմիջապես բուհերի պաշտոնական կայքերից՝ կանոնավոր թարմացմամբ։'
                  : lang === 'ru'
                    ? 'Проверяемые факты напрямую с официальных сайтов с регулярным обновлением.'
                    : 'Verifiable facts sourced directly from official HEI portals with scheduled freshness checks.'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <Database className="w-6 h-6 text-blue-800" />
              <h3 className="mt-3 text-sm font-bold text-blue-950">
                {lang === 'hy'
                  ? 'Համակարգի որակ'
                  : lang === 'ru'
                    ? 'Качество системы'
                    : 'System Quality'}
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                {lang === 'hy'
                  ? 'Արագ ֆիլտրում (<500մվ), 4 ծրագրերի զուգահեռ համեմատում և Fit Score գնահատում։'
                  : lang === 'ru'
                    ? 'Быстрая фильтрация (<500мс), сравнение до 4 программ и расчет Fit Score.'
                    : 'Sub-500ms filtering, 4-program side-by-side comparison, and personalized Fit Score matching.'}
              </p>
            </div>

            <div className="bg-blue-900 text-white border border-blue-800 rounded-xl p-5">
              <Sparkles className="w-6 h-6 text-sky-300" />
              <h3 className="mt-3 text-sm font-bold text-white">
                {lang === 'hy'
                  ? 'Ծառայությունների որակ'
                  : lang === 'ru'
                    ? 'Качество сервиса'
                    : 'Service Quality'}
              </h3>
              <p className="mt-1.5 text-xs text-blue-100/90 leading-relaxed">
                {lang === 'hy'
                  ? 'Եռալեզու AI 24/7 աջակցություն՝ կառուցված RAG ճարտարապետությամբ։'
                  : lang === 'ru'
                    ? 'Трехъязычный AI-помощник 24/7 на базе архитектуры RAG.'
                    : 'Trilingual 24/7 AI guidance built strictly on retrieval-augmented grounding.'}
              </p>
            </div>
          </div>
        </section>

        {/* How Trust Lens & AI Work */}
        <section className="bg-white border border-blue-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-xs">
          <div className="lg:col-span-4 h-56 lg:h-auto">
            <AcademicImage
              src="/src/assets/images/uni_library_study_1795746426123.jpg"
              alt={t.aboutPage.howItWorksTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-blue-950">{t.aboutPage.howItWorksTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-blue-900">{t.aboutPage.step1Title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.aboutPage.step1Body}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-blue-900">{t.aboutPage.step2Title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.aboutPage.step2Body}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-blue-900">{t.aboutPage.step3Title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.aboutPage.step3Body}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Contact Us Section («Կապ մեզ հետ») */}
        <section
          id="contact-us"
          className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white rounded-2xl p-6 sm:p-10 shadow-lg border border-blue-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{t.aboutPage.contactTitle}</h2>
                <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
                  {t.aboutPage.contactSubtitle}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-800/80 border border-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-sky-300" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">{t.aboutPage.contactAddressLabel}</div>
                    <div className="text-sm font-medium text-white mt-0.5">
                      {t.aboutPage.contactAddressValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-800/80 border border-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-sky-300" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">{t.aboutPage.contactPhoneLabel}</div>
                    <a
                      href="tel:+37410550026"
                      className="text-sm font-mono tabular-nums font-medium text-white hover:text-sky-200 mt-0.5 block"
                    >
                      +374 10 55 00 26
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-800/80 border border-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-sky-300" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">{t.aboutPage.contactEmailLabel}</div>
                    <a
                      href="mailto:info@uniportal.am"
                      className="text-sm font-mono font-medium text-white hover:text-sky-200 mt-0.5 block"
                    >
                      info@uniportal.am
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-800/80 border border-blue-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-sky-300" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">{t.aboutPage.contactHoursLabel}</div>
                    <div className="text-sm font-medium text-white mt-0.5">
                      {t.aboutPage.contactHoursValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Direct Contact Form */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-xl p-6 shadow-md">
              {contactSent ? (
                <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-blue-950">{t.aboutPage.contactSuccess}</p>
                    <button
                      type="button"
                      onClick={() => setContactSent(false)}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-950 underline"
                    >
                      {lang === 'hy'
                        ? 'Ուղարկել նոր հաղորդագրություն'
                        : lang === 'ru'
                          ? 'Отправить новое сообщение'
                          : 'Send another message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {t.aboutPage.contactNameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {t.aboutPage.reportEmailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {t.aboutPage.contactSubjectLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {t.aboutPage.contactMsgLabel}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.aboutPage.contactSendBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Partner Universities + Data Verification Report Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Covered Universities */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-blue-950">
              {t.aboutPage.partnersTitle} ({universities.length})
            </h2>
            <div className="divide-y divide-slate-200 border border-blue-200/80 rounded-xl bg-white max-h-[480px] overflow-y-auto">
              {universities.map((uni) => (
                <div
                  key={uni.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-blue-50/50 transition-colors"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onOpenUniversityDetails(uni)}
                      className="text-sm font-semibold text-slate-900 hover:text-blue-800 text-left"
                    >
                      {uni.name[lang]}
                    </button>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {uni.shortCode} · {uni.city[lang]}
                    </div>
                  </div>
                  <a
                    href={uni.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-950 shrink-0"
                  >
                    <span>{uni.website_url.replace('https://', '')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Report Issue / Partnership Form */}
          <div className="lg:col-span-6 bg-white border border-blue-200/80 rounded-xl p-6 space-y-5 shadow-xs">
            <div>
              <h2 className="text-xl font-bold text-blue-950">{t.aboutPage.reportTitle}</h2>
              <p className="text-xs text-slate-500 mt-1">{t.aboutPage.reportSubtitle}</p>
            </div>

            {submitted ? (
              <div className="p-5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-950">{t.aboutPage.reportSuccess}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-950 underline"
                  >
                    {lang === 'hy'
                      ? 'Ուղարկել ևս մեկ հաղորդում'
                      : lang === 'ru'
                        ? 'Отправить еще одно обращение'
                        : 'Submit another message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-2 p-1 bg-blue-50 border border-blue-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setReportType('issue')}
                    className={`py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                      reportType === 'issue'
                        ? 'bg-blue-900 text-white'
                        : 'text-slate-700 hover:text-blue-950'
                    }`}
                  >
                    {t.aboutPage.reportTypeIssue}
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('partner')}
                    className={`py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                      reportType === 'partner'
                        ? 'bg-blue-900 text-white'
                        : 'text-slate-700 hover:text-blue-950'
                    }`}
                  >
                    {t.aboutPage.reportTypePartner}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {t.aboutPage.reportUniLabel}
                  </label>
                  <select
                    value={selectedUni}
                    onChange={(e) => setSelectedUni(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm"
                  >
                    {universities.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.shortCode} — {u.name[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {t.aboutPage.reportEmailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {t.aboutPage.reportMessageLabel}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
                >
                  {t.aboutPage.reportSubmit}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
