import { useState, useEffect } from 'react';
import type {
  Lang,
  Program,
  University,
  UserAccount,
  TrustLensSource,
  TrustEntityType,
} from './types/schema';
import {
  UNIVERSITIES,
  PROGRAMS,
  MOBILITY_PROGRAMS,
  ACADEMIC_JOBS,
  NEWS_EVENTS,
  CHANGE_ALERTS,
} from './data/portalData';
import { resolveTrustLensSource } from './scripts/smartFilter';
import { calculateFitScore } from './scripts/fitScore';
import { I18N } from './scripts/i18n';
import { Header, type PageId } from './components/Header';
import { SubHeaderBar } from './components/SubHeaderBar';
import { Footer } from './components/Footer';
import { TrustLensModal } from './components/TrustLensModal';
import { ComparisonTray, ComparisonModal } from './components/ComparisonModal';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { UniversityDetailModal } from './components/UniversityDetailModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { HomePage } from './pages/HomePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { CommunityPage } from './pages/CommunityPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';

const DEFAULT_USER: UserAccount = {
  id: 'user-default',
  name: 'Արամ Հակոբյան',
  email: 'applicant@edu.am',
  role: 'applicant',
  preferences: {
    maxBudgetAmd: 1200000,
    preferredField: 'it',
    preferredLanguage: 'hy',
    preferredCity: 'yerevan',
    preferredDegree: 'bachelor',
    gpa: 16.5,
    englishLevel: 'B2',
    examSubjects: ['Mathematics', 'Physics'],
  },
  savedProgramIds: ['ysu-cs-bsc', 'aua-cs-bsc'],
  savedMobilityIds: ['erasmus-ka171'],
  savedJobIds: ['job-ysu-ml'],
  appliedJobIds: [],
  jobAlertSubscribed: false,
  readAlertIds: [],
};

const STORAGE_KEY_USER = 'armenia_uniportal_user_v1';
const STORAGE_KEY_LANG = 'armenia_uniportal_lang_v1';

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'hy' || saved === 'en' || saved === 'ru') return saved;
    } catch {
      // ignore storage errors
    }
    return 'hy';
  });

  const [activePage, setActivePage] = useState<PageId>('home');

  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      if (raw) return JSON.parse(raw) as UserAccount;
    } catch {
      // ignore storage errors
    }
    return DEFAULT_USER;
  });

  const [compareIds, setCompareIds] = useState<string[]>(['ysu-cs-bsc', 'npua-cyber-bsc']);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [trustLensState, setTrustLensState] = useState<{
    source: TrustLensSource | null;
    isMissing: boolean;
  }>({ source: null, isMissing: false });
  const [noticeBanner, setNoticeBanner] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch {
      // ignore storage errors
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const uniMap = new Map(UNIVERSITIES.map((u) => [u.id, u]));

  const showTempNotice = (msg: string) => {
    setNoticeBanner(msg);
    setTimeout(() => setNoticeBanner(null), 3000);
  };

  const toggleSaveProgram = (id: string) => {
    setUser((prev) => ({
      ...prev,
      savedProgramIds: prev.savedProgramIds.includes(id)
        ? prev.savedProgramIds.filter((x) => x !== id)
        : [...prev.savedProgramIds, id],
    }));
  };

  const toggleSaveMobility = (id: string) => {
    setUser((prev) => ({
      ...prev,
      savedMobilityIds: prev.savedMobilityIds.includes(id)
        ? prev.savedMobilityIds.filter((x) => x !== id)
        : [...prev.savedMobilityIds, id],
    }));
  };

  const toggleSaveJob = (id: string) => {
    setUser((prev) => ({
      ...prev,
      savedJobIds: prev.savedJobIds.includes(id)
        ? prev.savedJobIds.filter((x) => x !== id)
        : [...prev.savedJobIds, id],
    }));
  };

  const handleApplyJob = (id: string) => {
    setUser((prev) => ({
      ...prev,
      appliedJobIds: prev.appliedJobIds.includes(id)
        ? prev.appliedJobIds
        : [...prev.appliedJobIds, id],
    }));
  };

  const toggleCompareProgram = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 4) {
        showTempNotice(I18N[lang].compare.maxFourNotice);
        return prev;
      }
      return [...prev, id];
    });
  };

  const openTrustLens = (
    entityType: TrustEntityType,
    entityId: string,
    fieldName: string,
    isMissing = false
  ) => {
    const src = resolveTrustLensSource(entityType, entityId, fieldName, isMissing);
    setTrustLensState({ source: src, isMissing });
  };

  const comparedPrograms = PROGRAMS.filter((p) => compareIds.includes(p.id));
  const totalSaved =
    user.savedProgramIds.length + user.savedMobilityIds.length + user.savedJobIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header
        lang={lang}
        activePage={activePage}
        onNavigate={setActivePage}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      <SubHeaderBar
        lang={lang}
        onChangeLang={setLang}
        savedCount={totalSaved}
        compareCount={compareIds.length}
        onNavigate={setActivePage}
        onOpenCompare={() => {
          if (compareIds.length >= 2) {
            setCompareModalOpen(true);
          } else {
            showTempNotice(I18N[lang].compare.minTwoNotice);
          }
        }}
        universitiesCount={UNIVERSITIES.length}
        programsCount={PROGRAMS.length}
      />

      {noticeBanner && (
        <div className="fixed top-20 right-4 z-50 bg-blue-950 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg border border-blue-800">
          {noticeBanner}
        </div>
      )}

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            lang={lang}
            universities={UNIVERSITIES}
            programs={PROGRAMS}
            preferences={user.preferences}
            savedProgramIds={user.savedProgramIds}
            compareIds={compareIds}
            onToggleSave={toggleSaveProgram}
            onToggleCompare={toggleCompareProgram}
            onOpenDetails={setSelectedProgram}
            onOpenTrustLens={openTrustLens}
          />
        )}

        {activePage === 'programs' && (
          <ProgramsPage
            lang={lang}
            universities={UNIVERSITIES}
            programs={PROGRAMS}
            mobilityPrograms={MOBILITY_PROGRAMS}
            preferences={user.preferences}
            savedProgramIds={user.savedProgramIds}
            savedMobilityIds={user.savedMobilityIds}
            compareIds={compareIds}
            onToggleSaveProgram={toggleSaveProgram}
            onToggleSaveMobility={toggleSaveMobility}
            onToggleCompare={toggleCompareProgram}
            onOpenProgramDetails={setSelectedProgram}
            onOpenUniversityDetails={setSelectedUniversity}
            onOpenTrustLens={openTrustLens}
          />
        )}

        {activePage === 'community' && (
          <CommunityPage
            lang={lang}
            universities={UNIVERSITIES}
            newsEvents={NEWS_EVENTS}
            academicJobs={ACADEMIC_JOBS}
            savedJobIds={user.savedJobIds}
            appliedJobIds={user.appliedJobIds}
            jobAlertSubscribed={user.jobAlertSubscribed}
            onToggleSaveJob={toggleSaveJob}
            onApplyJob={handleApplyJob}
            onToggleJobAlerts={() =>
              setUser((prev) => ({
                ...prev,
                jobAlertSubscribed: !prev.jobAlertSubscribed,
              }))
            }
            onOpenTrustLens={openTrustLens}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            lang={lang}
            user={user}
            universities={UNIVERSITIES}
            programs={PROGRAMS}
            mobilityPrograms={MOBILITY_PROGRAMS}
            academicJobs={ACADEMIC_JOBS}
            changeAlerts={CHANGE_ALERTS}
            onUpdateUser={setUser}
            onOpenProgramDetails={setSelectedProgram}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            lang={lang}
            universities={UNIVERSITIES}
            onOpenUniversityDetails={setSelectedUniversity}
          />
        )}
      </main>

      <Footer lang={lang} onNavigate={setActivePage} />

      {/* Bottom Comparison Tray */}
      <ComparisonTray
        programs={comparedPrograms}
        universities={UNIVERSITIES}
        lang={lang}
        onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
        onClear={() => setCompareIds([])}
        onOpenModal={() => setCompareModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <ComparisonModal
        isOpen={compareModalOpen}
        programs={comparedPrograms}
        universities={UNIVERSITIES}
        lang={lang}
        onClose={() => setCompareModalOpen(false)}
        onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
        onOpenTrustLens={openTrustLens}
      />

      <ProgramDetailModal
        program={selectedProgram}
        university={selectedProgram ? uniMap.get(selectedProgram.university_id) : undefined}
        lang={lang}
        fit={
          selectedProgram
            ? calculateFitScore(
                selectedProgram,
                uniMap.get(selectedProgram.university_id),
                user.preferences
              )
            : null
        }
        isSaved={selectedProgram ? user.savedProgramIds.includes(selectedProgram.id) : false}
        isCompared={selectedProgram ? compareIds.includes(selectedProgram.id) : false}
        onClose={() => setSelectedProgram(null)}
        onToggleSave={toggleSaveProgram}
        onToggleCompare={toggleCompareProgram}
        onOpenTrustLens={openTrustLens}
      />

      <UniversityDetailModal
        university={selectedUniversity}
        programs={PROGRAMS}
        lang={lang}
        onClose={() => setSelectedUniversity(null)}
        onSelectProgram={setSelectedProgram}
      />

      <TrustLensModal
        source={trustLensState.source}
        isMissingData={trustLensState.isMissing}
        lang={lang}
        onClose={() => setTrustLensState({ source: null, isMissing: false })}
      />

      <AIAssistantDrawer
        isOpen={assistantOpen}
        lang={lang}
        onClose={() => setAssistantOpen(false)}
      />
    </div>
  );
}
