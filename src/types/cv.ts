export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  summary: string;
  bullets: string[];
  technologies: string[];
  included: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  details: string;
  included: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
  included: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  url?: string;
  description: string;
  technologies: string[];
  included: boolean;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
  included: boolean;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
  included: boolean;
}

export interface MasterCV {
  personal: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  lastUpdated: string;
}

export type ApplicationStatus =
  | 'Borrador'
  | 'Enviado'
  | 'En Proceso'
  | 'Entrevista'
  | 'Oferta'
  | 'Descartado';

export type CVTemplateType = 'modern' | 'executive' | 'minimal';

export interface AdaptedCV {
  id: string;
  reference: string; // ej: "Empresa X - Martín RRHH"
  company: string; // ej: "Empresa X"
  recruiter: string; // ej: "Martín RRHH"
  targetRole: string; // ej: "Senior React Developer"
  jobUrl?: string;
  jobDescription?: string; // Requisitos y palabras clave de la oferta
  status: ApplicationStatus;
  salaryExpectation?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  applicationDate?: string;
  template: CVTemplateType;
  cvData: MasterCV; // Copia adaptada y personalizada para esta vacante
}
