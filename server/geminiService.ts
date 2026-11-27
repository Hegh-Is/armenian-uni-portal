import { GoogleGenAI, Type } from '@google/genai';
import {
  UNIVERSITIES,
  PROGRAMS,
  MOBILITY_PROGRAMS,
  ACADEMIC_JOBS,
  NEWS_EVENTS,
  TRUST_LENS_SOURCES,
} from '../src/data/portalData.ts';

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in server environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildGroundedKnowledgeContext(): string {
  const uniMap = new Map(UNIVERSITIES.map((u) => [u.id, u]));

  const programsSummary = PROGRAMS.map((p) => {
    const uni = uniMap.get(p.university_id);
    return {
      id: p.id,
      university: `${uni?.shortCode} (${uni?.name.hy} / ${uni?.name.en})`,
      city: uni?.cityKey,
      website: uni?.website_url,
      title_hy: p.title.hy,
      title_en: p.title.en,
      title_ru: p.title.ru,
      field: p.field,
      degree: p.degree,
      durationYears: p.durationYears,
      tuition_fee_amd: p.tuition_fee,
      scholarshipAvailable: p.scholarshipAvailable,
      discountNote_hy: p.discountNote?.hy ?? null,
      language: p.language,
      exams: p.exams.map((e) => `${e.subject.en} (minScore: ${e.minScore ?? 'unpublished'})`),
      deadline: p.deadline,
    };
  });

  const mobilitySummary = MOBILITY_PROGRAMS.map((m) => ({
    id: m.id,
    title_hy: m.title.hy,
    title_en: m.title.en,
    provider: m.provider,
    country: m.host_country.en,
    funding_type: m.funding_type,
    stipend_en: m.stipendSummary.en,
    deadline: m.deadline,
    source_url: m.source_url,
  }));

  const jobsSummary = ACADEMIC_JOBS.map((j) => {
    const uni = uniMap.get(j.university_id);
    return {
      id: j.id,
      university: uni?.shortCode,
      position_en: j.position.en,
      position_hy: j.position.hy,
      degree_req: j.degree_req,
      employment_type: j.employment_type,
      salary_en: j.salaryRange?.en ?? null,
      deadline: j.deadline,
      apply_url: j.apply_url,
    };
  });

  const newsSummary = NEWS_EVENTS.map((n) => ({
    id: n.id,
    title_en: n.title.en,
    event_date: n.event_date,
    source_url: n.source_url,
  }));

  return JSON.stringify(
    {
      universities: UNIVERSITIES.map((u) => ({
        id: u.id,
        shortCode: u.shortCode,
        name_hy: u.name.hy,
        name_en: u.name.en,
        city: u.cityKey,
        type: u.type,
        website_url: u.website_url,
      })),
      programs: programsSummary,
      mobilityPrograms: mobilitySummary,
      academicJobs: jobsSummary,
      newsEvents: newsSummary,
      trustLensCount: Object.keys(TRUST_LENS_SOURCES).length,
    },
    null,
    0
  );
}

export interface ParsedSmartSearch {
  field:
    | 'all'
    | 'it'
    | 'engineering'
    | 'economics'
    | 'medicine'
    | 'law'
    | 'humanities'
    | 'sciences'
    | 'agriculture'
    | 'arts';
  degree: 'all' | 'bachelor' | 'master' | 'phd';
  city: 'all' | 'yerevan' | 'gyumri' | 'vanadzor' | 'gavar' | 'goris' | 'kapan' | 'ijevan';
  language: 'all' | 'hy' | 'en' | 'ru' | 'fr';
  maxTuition: number;
  scholarshipOnly: boolean;
  queryKeywords: string;
  explanation: string;
}

export async function parseSmartSearchQuery(
  query: string,
  lang: 'hy' | 'en' | 'ru'
): Promise<ParsedSmartSearch> {
  const ai = getGeminiClient();

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `Extract structured search filters for Armenian universities from this natural-language user query (language hint: ${lang}): "${query}"`,
    config: {
      systemInstruction:
        'You are a structured query parser for the Armenian Higher Education Unified Portal. ' +
        'Convert the user natural-language query (Armenian, English, or Russian) into exact filter parameters. ' +
        'For maxTuition in AMD: if the user says "1 մլն", "1M", "1 млн" return 1000000; if no budget is mentioned return 3500000. ' +
        'Return queryKeywords as empty string "" if the structured filters already capture the full intent (like field+degree+city+language+budget), or put specific program/university keywords only if needed (e.g. "AUA", "MBA", "cybersecurity"). ' +
        `Provide a concise 1-sentence explanation in ${lang === 'hy' ? 'Armenian' : lang === 'ru' ? 'Russian' : 'English'}.`,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          field: {
            type: Type.STRING,
            description: 'One of: all, it, engineering, economics, medicine, law, humanities, sciences, agriculture, arts',
          },
          degree: {
            type: Type.STRING,
            description: 'One of: all, bachelor, master, phd',
          },
          city: {
            type: Type.STRING,
            description: 'One of: all, yerevan, gyumri, vanadzor, gavar, goris, kapan, ijevan',
          },
          language: {
            type: Type.STRING,
            description: 'One of: all, hy, en, ru, fr',
          },
          maxTuition: {
            type: Type.INTEGER,
            description: 'Maximum annual tuition in AMD (default 3500000 if unspecified)',
          },
          scholarshipOnly: {
            type: Type.BOOLEAN,
            description: 'True only if user explicitly asks for scholarship, grant, or free seats',
          },
          queryKeywords: {
            type: Type.STRING,
            description: 'Optional specific university or keyword filter, otherwise empty string',
          },
          explanation: {
            type: Type.STRING,
            description: 'Short 1-sentence summary of extracted parameters in the requested UI language',
          },
        },
        required: [
          'field',
          'degree',
          'city',
          'language',
          'maxTuition',
          'scholarshipOnly',
          'queryKeywords',
          'explanation',
        ],
      },
    },
  });

  const text = (response.text ?? '{}').trim();
  return JSON.parse(text) as ParsedSmartSearch;
}

export interface AssistantResponse {
  answer: string;
  citedSources: Array<{ label: string; url: string }>;
}

export async function askGroundedAssistant(
  question: string,
  lang: 'hy' | 'en' | 'ru',
  history: Array<{ role: 'user' | 'assistant'; text: string }>
): Promise<AssistantResponse> {
  const ai = getGeminiClient();
  const contextJson = buildGroundedKnowledgeContext();

  const langDirective =
    lang === 'hy'
      ? 'Respond strictly in natural, clear Armenian (Հայերեն).'
      : lang === 'ru'
        ? 'Respond strictly in natural, clear Russian (Русский).'
        : 'Respond strictly in natural, clear English.';

  const conversationSnippet = history
    .slice(-6)
    .map((m) => `${m.role === 'user' ? 'User' : 'Advisor'}: ${m.text}`)
    .join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `${conversationSnippet ? `Previous conversation:\n${conversationSnippet}\n\n` : ''}Current User Question: ${question}`,
    config: {
      systemInstruction:
        'You are the Trust-First RAG AI Advisor for the Armenian Higher Education Unified Portal (ՀՀ համալսարանների միասնական թվային ուղեցույց-պորտալ). ' +
        `${langDirective} ` +
        'CRITICAL TRUST LENS RULES:\n' +
        '1. Answer ONLY using facts present in the Verified Knowledge Base JSON below.\n' +
        '2. NEVER invent, guess, or estimate tuition fees, passing scores, or deadlines. If a field in the JSON is null, explicitly state that the university has not published this data ("Այս տեղեկատվությունը բուհը չի հրապարակել" / "Not published by the university" / "Вуз не опубликовал данную информацию").\n' +
        '3. Keep answers structured, concise, and helpful (3-6 sentences or clean bullet lines without markdown clutter).\n' +
        '4. Include relevant official URLs from the knowledge base in citedSources.\n\n' +
        `VERIFIED KNOWLEDGE BASE:\n${contextJson}`,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answer: {
            type: Type.STRING,
            description: 'Helpful grounded answer in the requested language without hallucinating unpublished numbers.',
          },
          citedSources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                url: { type: Type.STRING },
              },
              required: ['label', 'url'],
            },
            description: 'Official university or mobility URLs supporting the answer',
          },
        },
        required: ['answer', 'citedSources'],
      },
    },
  });

  const text = (response.text ?? '{}').trim();
  return JSON.parse(text) as AssistantResponse;
}
