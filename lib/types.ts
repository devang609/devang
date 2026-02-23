// ─── Section Identifiers ─────────────────────────────────────────────────────
export type Section =
  | 'home'
  | 'work'
  | 'education'
  | 'projects'
  | 'skills'
  | 'leadership'
  | 'certifications';

// ─── work.json ────────────────────────────────────────────────────────────────
export interface WorkEntry {
  company: string;
  location?: string;
  role: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  stack?: string[];
}

// ─── education.json ───────────────────────────────────────────────────────────
export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  notes?: string;
}

// ─── projects.json ────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  stack: string[];
  repoUrl: string;
  status: string;
}

// ─── skills.json ─────────────────────────────────────────────────────────────
export type SkillsData = Record<string, string[]>;

// ─── leadership.json ─────────────────────────────────────────────────────────
export interface LeadershipEntry {
  role: string;
  organization: string;
  duration: string;
  impact: string;
}

// ─── certifications.json ─────────────────────────────────────────────────────
export interface CertificationEntry {
  name: string;
  issuer: string;
  issued: string;
  expires: string;
  id?: string;
}

// ─── Component Props ──────────────────────────────────────────────────────────
export interface SidebarProps {
  currentSection: Section;
  status: string;
  onNavigate: (section: Section) => void;
}

export interface ViewportProps {
  currentSection: Section;
  data: unknown;
  isLoading: boolean;
  hasError: boolean;
  errorInfo: { endpoint: string; message: string } | null;
}
