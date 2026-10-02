import { MasterCV, AdaptedCV } from '../types/cv';

export const DEFAULT_MASTER_CV: MasterCV = {
  personal: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skillCategories: [],
  projects: [],
  languages: [],
  certifications: [],
  lastUpdated: new Date().toISOString(),
};

export const DEFAULT_ADAPTED_CVS: AdaptedCV[] = [];
