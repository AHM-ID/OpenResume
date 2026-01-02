
export type TemplateId = 'minimal' | 'modern' | 'creative' | 'academic' | 'compact';
export type LanguageId = 'en' | 'fa';
export type SectionId = 'personalInfo' | 'experiences' | 'educations' | 'skills' | 'projects' | 'assessments';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  telegram?: string;
  profileImage?: string; // base64 string
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  dateRange: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  dateRange: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface Assessment {
  id: string;
  title: string;
  score: string;
  date: string;
}

export interface ResumeSettings {
  template: TemplateId;
  language: LanguageId;
  theme: 'light' | 'dark';
  sectionOrder: SectionId[];
  primaryColor: string;
  showWatermark: boolean;
  showProfileImage: boolean;
}

export interface ResumeRoot {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  assessments: Assessment[];
  settings: ResumeSettings;
}
