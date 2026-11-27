export type Lang = 'hy' | 'en' | 'ru';

export type LocalizedText = Record<Lang, string>;

export type UniversityType = 'state' | 'private' | 'international';

export type DegreeLevel = 'bachelor' | 'master' | 'phd';

export type InstructionLanguage = 'hy' | 'en' | 'ru' | 'fr';

export type CityKey =
  | 'yerevan'
  | 'gyumri'
  | 'vanadzor'
  | 'gavar'
  | 'goris'
  | 'kapan'
  | 'ijevan';

export type FieldCategory =
  | 'it'
  | 'engineering'
  | 'economics'
  | 'medicine'
  | 'law'
  | 'humanities'
  | 'sciences'
  | 'agriculture'
  | 'arts';

export interface FacultyInfo {
  id: string;
  name: LocalizedText;
  programsCount: number;
}

export interface University {
  id: string;
  shortCode: string;
  name: LocalizedText;
  city: LocalizedText;
  cityKey: CityKey;
  type: UniversityType;
  website_url: string;
  address: LocalizedText;
  founded: number;
  studentCount: number;
  coordinates: { lat: number; lng: number };
  faculties: FacultyInfo[];
  description: LocalizedText;
}

export interface ExamRequirement {
  subject: LocalizedText;
  minScore: number | null;
  type: 'mandatory' | 'elective';
}

export interface Program {
  id: string;
  university_id: string;
  field: FieldCategory;
  title: LocalizedText;
  qualification: LocalizedText;
  degree: DegreeLevel;
  durationYears: number;
  tuition_fee: number | null; // Annual AMD, null if unpublished
  scholarshipAvailable: boolean;
  discountNote: LocalizedText | null;
  language: InstructionLanguage;
  exams: ExamRequirement[];
  documents: LocalizedText[];
  deadline: string | null; // ISO YYYY-MM-DD or null if unpublished
  curriculumSummary: LocalizedText;
  internshipAndMobility: LocalizedText | null;
}

export type FundingType = 'full' | 'partial';

export interface MobilityProgram {
  id: string;
  title: LocalizedText;
  provider: string;
  host_country: LocalizedText;
  countryKey: string;
  partner_unis: LocalizedText;
  targetDegrees: DegreeLevel[];
  funding_type: FundingType;
  stipendSummary: LocalizedText;
  eligibility: LocalizedText;
  deadline: string;
  source_url: string;
}

export type AcademicDegreeReq = 'master' | 'phd' | 'doctor';
export type EmploymentType = 'full_time' | 'part_time';

export interface AcademicJob {
  id: string;
  university_id: string;
  department: LocalizedText;
  position: LocalizedText;
  degree_req: AcademicDegreeReq;
  employment_type: EmploymentType;
  salaryRange: LocalizedText | null;
  requirements: LocalizedText[];
  documents: LocalizedText[];
  deadline: string;
  apply_url: string;
}

export type NewsCategory = 'conference' | 'olympiad' | 'hackathon' | 'open_day' | 'admissions';

export interface NewsEvent {
  id: string;
  university_id: string;
  category: NewsCategory;
  field: FieldCategory | 'general';
  title: LocalizedText;
  summary: LocalizedText;
  content: LocalizedText;
  event_date: string;
  published_at: string;
  location: LocalizedText;
  source_url: string;
}

export type TrustEntityType = 'program' | 'mobility' | 'job' | 'news' | 'university';

export interface TrustLensSource {
  id: string;
  entity_type: TrustEntityType;
  entity_id: string;
  field_name: string;
  source_url: string;
  page_title: LocalizedText;
  raw_snippet: LocalizedText;
  collected_at: string;
  verified_at: string;
  hash: string;
}

export interface ChangeAlert {
  id: string;
  entity_id: string;
  entity_type: 'program' | 'mobility' | 'job';
  title: LocalizedText;
  fieldChanged: LocalizedText;
  oldValue: LocalizedText;
  newValue: LocalizedText;
  detectedAt: string;
  hash: string;
}

export type UserRole = 'applicant' | 'international' | 'parent' | 'lecturer';

export interface UserProfilePreferences {
  maxBudgetAmd: number;
  preferredField: FieldCategory | 'all';
  preferredLanguage: InstructionLanguage | 'all';
  preferredCity: CityKey | 'all';
  preferredDegree: DegreeLevel | 'all';
  gpa: number; // 0-20 scale
  englishLevel: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  examSubjects: string[];
  academicDegree?: AcademicDegreeReq;
  specialization?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences: UserProfilePreferences;
  savedProgramIds: string[];
  savedMobilityIds: string[];
  savedJobIds: string[];
  appliedJobIds: string[];
  jobAlertSubscribed: boolean;
  readAlertIds: string[];
}

export interface SmartSearchFilters {
  query: string;
  universityId: string;
  city: CityKey | 'all';
  degree: DegreeLevel | 'all';
  language: InstructionLanguage | 'all';
  field: FieldCategory | 'all';
  maxTuition: number;
  scholarshipOnly: boolean;
}

export interface FitScoreResult {
  score: number;
  label: LocalizedText;
  reasons: LocalizedText[];
  tier: 'high' | 'medium' | 'low';
}
