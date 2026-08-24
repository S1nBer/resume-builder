// Основные типы для резюме

export interface PersonalInfo {
  fullName: string;
  position: string;
  photo: string | null;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native' | 'fluent';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skill[];
  skillGroups: SkillGroup[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

// Тип для порядка секций
export type SectionId =
  'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'certifications' | 'projects';

export interface SectionOrder {
  id: SectionId;
  title: string;
  enabled: boolean;
}
