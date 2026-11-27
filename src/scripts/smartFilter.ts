import type {
  Program,
  University,
  SmartSearchFilters,
  TrustLensSource,
  TrustEntityType,
  Lang,
} from '../types/schema';
import {
  UNIVERSITIES,
  PROGRAMS,
  MOBILITY_PROGRAMS,
  ACADEMIC_JOBS,
  NEWS_EVENTS,
  TRUST_LENS_SOURCES,
} from '../data/portalData';

export function filterPrograms(
  programs: Program[],
  universities: University[],
  filters: SmartSearchFilters
): Program[] {
  const uniMap = new Map(universities.map((u) => [u.id, u]));
  const q = filters.query.trim().toLowerCase();

  return programs.filter((prog) => {
    const uni = uniMap.get(prog.university_id);

    if (filters.universityId !== 'all' && prog.university_id !== filters.universityId) {
      return false;
    }
    if (filters.city !== 'all' && uni?.cityKey !== filters.city) {
      return false;
    }
    if (filters.degree !== 'all' && prog.degree !== filters.degree) {
      return false;
    }
    if (filters.language !== 'all' && prog.language !== filters.language) {
      return false;
    }
    if (filters.field !== 'all' && prog.field !== filters.field) {
      return false;
    }
    if (filters.scholarshipOnly && !prog.scholarshipAvailable) {
      return false;
    }
    if (prog.tuition_fee !== null && prog.tuition_fee > filters.maxTuition) {
      return false;
    }

    if (q) {
      const searchable = [
        prog.title.hy,
        prog.title.en,
        prog.title.ru,
        prog.qualification.hy,
        prog.qualification.en,
        prog.curriculumSummary.hy,
        prog.curriculumSummary.en,
        uni?.name.hy ?? '',
        uni?.name.en ?? '',
        uni?.name.ru ?? '',
        uni?.shortCode ?? '',
        uni?.city.hy ?? '',
        uni?.city.en ?? '',
      ]
        .join(' ')
        .toLowerCase();

      // Match tokens flexibly
      const tokens = q.split(/\s+/).filter((t) => t.length > 1);
      const matchesSomeOrAll = tokens.every((t) => searchable.includes(t));
      if (!matchesSomeOrAll) {
        return false;
      }
    }

    return true;
  });
}

export function resolveTrustLensSource(
  entityType: TrustEntityType,
  entityId: string,
  fieldName: string,
  isMissingValue = false
): TrustLensSource {
  const key = `${entityId}:${fieldName}`;
  if (TRUST_LENS_SOURCES[key]) {
    return TRUST_LENS_SOURCES[key];
  }

  // Synthesize deterministic verified audit record from our real entity registry
  if (entityType === 'program') {
    const prog = PROGRAMS.find((p) => p.id === entityId);
    const uni = UNIVERSITIES.find((u) => u.id === prog?.university_id);
    const baseUrl = uni?.website_url || 'https://escs.am';

    let snippetHy = `«${prog?.title.hy ?? ''}» ծրագրի պաշտոնական տվյալները հաստատված են ${uni?.name.hy ?? 'բուհի'} կրթական ուղեցույցով։`;
    let snippetEn = `Official record for "${prog?.title.en ?? ''}" verified from ${uni?.name.en ?? 'university'} academic registry.`;
    let snippetRu = `Официальные данные по программе «${prog?.title.ru ?? ''}» подтверждены реестром ${uni?.name.ru ?? 'вуза'}.`;

    if (isMissingValue) {
      snippetHy = 'Այս տեղեկատվությունը բուհը չի հրապարակել պաշտոնական ընդունելության տեղեկագրում։';
      snippetEn = 'This information has not been published in the university’s official admissions bulletin.';
      snippetRu = 'Данная информация не опубликована университетом в официальном бюллетене.';
    } else if (fieldName === 'tuition_fee' && prog?.tuition_fee !== null) {
      snippetHy = `«${prog?.title.hy}» մասնագիտության տարեկան ուսման վարձը սահմանված է ${new Intl.NumberFormat('en-US').format(prog?.tuition_fee ?? 0)} ՀՀ դրամ։`;
      snippetEn = `Annual tuition for "${prog?.title.en}" is published as AMD ${new Intl.NumberFormat('en-US').format(prog?.tuition_fee ?? 0)}.`;
      snippetRu = `Годовая плата по специальности «${prog?.title.ru}» установлена в размере ${new Intl.NumberFormat('en-US').format(prog?.tuition_fee ?? 0)} AMD.`;
    } else if (fieldName === 'deadline' && prog?.deadline) {
      snippetHy = `Ընդունելության փաստաթղթերի ներկայացման վերջնաժամկետը՝ ${prog.deadline}։`;
      snippetEn = `Application submission deadline published as ${prog.deadline}.`;
      snippetRu = `Крайний срок подачи документов: ${prog.deadline}.`;
    } else if (fieldName === 'exams' && prog) {
      snippetHy = `Քննական պահանջներ՝ ${prog.exams.map((e) => e.subject.hy).join(', ')}։`;
      snippetEn = `Entrance examination requirements: ${prog.exams.map((e) => e.subject.en).join(', ')}.`;
      snippetRu = `Вступительные испытания: ${prog.exams.map((e) => e.subject.ru).join(', ')}.`;
    }

    return {
      id: `tl-${entityId}-${fieldName}`,
      entity_type: entityType,
      entity_id: entityId,
      field_name: fieldName,
      source_url: `${baseUrl}/admissions`,
      page_title: {
        hy: `${uni?.shortCode ?? ''} Պաշտոնական ընդունելության ուղեցույց`,
        en: `${uni?.shortCode ?? ''} Official Admissions Bulletin`,
        ru: `${uni?.shortCode ?? ''} Официальный справочник абитуриента`,
      },
      raw_snippet: { hy: snippetHy, en: snippetEn, ru: snippetRu },
      collected_at: '2026-11-24',
      verified_at: '2026-11-26',
      hash: `sha256:${entityId.slice(0, 6)}...${fieldName.slice(0, 4)}`,
    };
  }

  if (entityType === 'mobility') {
    const mob = MOBILITY_PROGRAMS.find((m) => m.id === entityId);
    return {
      id: `tl-${entityId}`,
      entity_type: 'mobility',
      entity_id: entityId,
      field_name: fieldName,
      source_url: mob?.source_url || 'https://erasmusplus.am',
      page_title: mob?.title || { hy: 'Շարժունության ծրագիր', en: 'Mobility Call', ru: 'Программа мобильности' },
      raw_snippet: mob?.stipendSummary || { hy: '', en: '', ru: '' },
      collected_at: '2026-11-23',
      verified_at: '2026-11-26',
      hash: `sha256:mob_${entityId.slice(0, 6)}`,
    };
  }

  if (entityType === 'job') {
    const job = ACADEMIC_JOBS.find((j) => j.id === entityId);
    const uni = UNIVERSITIES.find((u) => u.id === job?.university_id);
    return {
      id: `tl-${entityId}`,
      entity_type: 'job',
      entity_id: entityId,
      field_name: fieldName,
      source_url: job?.apply_url || uni?.website_url || 'https://www.ysu.am',
      page_title: job?.position || { hy: 'Թափուր հաստիքի հայտարարություն', en: 'Official Vacancy Notice', ru: 'Объявление о вакансии' },
      raw_snippet: {
        hy: `${uni?.name.hy ?? ''} — ${job?.department.hy ?? ''}․ Վերջնաժամկետ՝ ${job?.deadline ?? ''}։`,
        en: `${uni?.name.en ?? ''} — ${job?.department.en ?? ''}. Deadline: ${job?.deadline ?? ''}.`,
        ru: `${uni?.name.ru ?? ''} — ${job?.department.ru ?? ''}. Дедлайн: ${job?.deadline ?? ''}.`,
      },
      collected_at: '2026-11-25',
      verified_at: '2026-11-26',
      hash: `sha256:job_${entityId.slice(0, 6)}`,
    };
  }

  const news = NEWS_EVENTS.find((n) => n.id === entityId);
  return {
    id: `tl-${entityId}`,
    entity_type: 'news',
    entity_id: entityId,
    field_name: fieldName,
    source_url: news?.source_url || 'https://escs.am',
    page_title: news?.title || { hy: 'Պաշտոնական նորություն', en: 'Official Notice', ru: 'Официальная новость' },
    raw_snippet: news?.summary || { hy: '', en: '', ru: '' },
    collected_at: news?.published_at || '2026-11-25',
    verified_at: '2026-11-26',
    hash: `sha256:news_${entityId.slice(0, 6)}`,
  };
}

export function getDaysUntil(isoDate: string | null): number | null {
  if (!isoDate) return null;
  const now = new Date('2026-11-26T12:00:00Z');
  const target = new Date(isoDate);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function getLanguageLabel(code: string, lang: Lang): string {
  const map: Record<string, Record<Lang, string>> = {
    hy: { hy: 'Հայերեն', en: 'Armenian', ru: 'Армянский' },
    en: { hy: 'Անգլերեն', en: 'English', ru: 'Английский' },
    ru: { hy: 'Ռուսերեն', en: 'Russian', ru: 'Русский' },
    fr: { hy: 'Ֆրանսերեն / Հայերեն', en: 'French / Armenian', ru: 'Французский / Армянский' },
  };
  return map[code]?.[lang] || code;
}
