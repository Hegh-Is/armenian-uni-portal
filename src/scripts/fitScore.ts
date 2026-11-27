import type {
  Program,
  University,
  UserProfilePreferences,
  FitScoreResult,
  LocalizedText,
} from '../types/schema';

export function calculateFitScore(
  program: Program,
  university: University | undefined,
  prefs: UserProfilePreferences
): FitScoreResult {
  let score = 50; // Neutral baseline
  const reasonsHy: string[] = [];
  const reasonsEn: string[] = [];
  const reasonsRu: string[] = [];

  // 1. Budget match (up to +25 / -25)
  if (program.tuition_fee === null) {
    score += 5;
    reasonsHy.push('Վարձավճարը դեռևս հրապարակված չէ (հնարավոր է պետպատվեր)');
    reasonsEn.push('Tuition unpublished (state-funded seats may apply)');
    reasonsRu.push('Стоимость не опубликована (возможен госзаказ)');
  } else if (program.tuition_fee <= prefs.maxBudgetAmd) {
    score += 22;
    reasonsHy.push('Համապատասխանում է ձեր բյուջեին');
    reasonsEn.push('Fits within your annual budget');
    reasonsRu.push('Соответствует вашему бюджету');
  } else if (program.scholarshipAvailable && program.tuition_fee <= prefs.maxBudgetAmd * 2) {
    score += 6;
    reasonsHy.push('Գերազանցում է բյուջեն, սակայն առկա են կրթաթոշակներ');
    reasonsEn.push('Above budget, but scholarships/waivers are available');
    reasonsRu.push('Выше бюджета, но доступны стипендии и скидки');
  } else {
    score -= 20;
    reasonsHy.push('Գերազանցում է սահմանված տարեկան բյուջեն');
    reasonsEn.push('Exceeds your target annual budget');
    reasonsRu.push('Превышает ваш годовой бюджет');
  }

  // 2. Field match (+15 / -5)
  if (prefs.preferredField === 'all' || program.field === prefs.preferredField) {
    score += 14;
    if (prefs.preferredField !== 'all') {
      reasonsHy.push('Համընկնում է ընտրված մասնագիտության հետ');
      reasonsEn.push('Matches your target academic field');
      reasonsRu.push('Совпадает с выбранным направлением');
    }
  } else {
    score -= 6;
  }

  // 3. Language match (+10 / -8)
  if (prefs.preferredLanguage === 'all' || program.language === prefs.preferredLanguage) {
    score += 10;
  } else {
    score -= 8;
    const langNames: Record<string, LocalizedText> = {
      hy: { hy: 'հայերենով', en: 'in Armenian', ru: 'на армянском' },
      en: { hy: 'անգլերենով', en: 'in English', ru: 'на английском' },
      ru: { hy: 'ռուսերենով', en: 'in Russian', ru: 'на русском' },
      fr: { hy: 'ֆրանսերենով/հայերենով', en: 'in French/Armenian', ru: 'на французском/армянском' },
    };
    const l = langNames[program.language];
    reasonsHy.push(`սակայն ուսուցումը ${l.hy} է`);
    reasonsEn.push(`instruction is ${l.en}`);
    reasonsRu.push(`обучение ведется ${l.ru}`);
  }

  // 4. City & Degree match (+8)
  if (prefs.preferredCity === 'all' || university?.cityKey === prefs.preferredCity) {
    score += 4;
  } else {
    score -= 6;
  }

  if (prefs.preferredDegree === 'all' || program.degree === prefs.preferredDegree) {
    score += 5;
  } else {
    score -= 10;
  }

  // 5. GPA vs minimum exam score adjustment
  const numericScores = program.exams
    .map((e) => e.minScore)
    .filter((s): s is number => s !== null && s <= 20);
  if (numericScores.length > 0) {
    const highestReq = Math.max(...numericScores);
    if (prefs.gpa >= highestReq) {
      score += 5;
    } else {
      score -= 8;
      reasonsHy.push('Պահանջում է բարձր անցողիկ միավոր');
      reasonsEn.push('Requires higher entrance exam threshold');
      reasonsRu.push('Требуется более высокий проходной балл');
    }
  }

  // Clamp between 18 and 98
  const clamped = Math.max(18, Math.min(98, Math.round(score)));
  const tier = clamped >= 75 ? 'high' : clamped >= 50 ? 'medium' : 'low';

  const summaryHy =
    reasonsHy.length > 0
      ? reasonsHy.slice(0, 2).join(', ')
      : 'Ընդհանուր պրոֆիլի համապատասխանություն';
  const summaryEn =
    reasonsEn.length > 0
      ? reasonsEn.slice(0, 2).join(' · ')
      : 'General profile alignment';
  const summaryRu =
    reasonsRu.length > 0
      ? reasonsRu.slice(0, 2).join(', ')
      : 'Соответствие общему профилю';

  return {
    score: clamped,
    tier,
    label: {
      hy: summaryHy.charAt(0).toUpperCase() + summaryHy.slice(1),
      en: summaryEn,
      ru: summaryRu.charAt(0).toUpperCase() + summaryRu.slice(1),
    },
    reasons: reasonsHy.map((_, idx) => ({
      hy: reasonsHy[idx] || '',
      en: reasonsEn[idx] || '',
      ru: reasonsRu[idx] || '',
    })),
  };
}
