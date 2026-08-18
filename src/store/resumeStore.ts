import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Certification,
  Education,
  Experience,
  Language,
  PersonalInfo,
  Project,
  Resume,
  Skill,
} from '../types/resume';

// Функция для генерации уникальных ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Начальное состояние
const initialState: Resume = {
  personalInfo: {
    fullName: '',
    position: '',
    photo: null,
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    telegram: '',
  },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  languages: [],
  certifications: [],
  projects: [],
};

interface ResumeStore {
  resume: Resume;
  selectedTemplate: string;

  // Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;

  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Experience
  addExperience: (experience?: Partial<Experience>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  // Education
  addEducation: (education?: Partial<Education>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Languages
  addLanguage: (language: Omit<Language, 'id'>) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Certifications
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Projects
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Template
  setTemplate: (templateId: string) => void;

  // Reset
  resetResume: () => void;
  loadResume: (resume: Resume) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialState,
      selectedTemplate: 'modern',

      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resume: { ...state.resume, summary },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [...state.resume.skills, { ...skill, id: generateId() }],
          },
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((s) => s.id !== id),
          },
        })),

      addExperience: (experience = {}) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              {
                id: generateId(),
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                achievements: [],
                ...experience,
              },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) =>
              e.id === id ? { ...e, ...experience } : e,
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
          },
        })),

      addEducation: (education = {}) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              {
                id: generateId(),
                institution: '',
                degree: '',
                field: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                ...education,
              },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((e) =>
              e.id === id ? { ...e, ...education } : e,
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
          },
        })),

      addLanguage: (language) =>
        set((state) => ({
          resume: {
            ...state.resume,
            languages: [...state.resume.languages, { ...language, id: generateId() }],
          },
        })),

      updateLanguage: (id, language) =>
        set((state) => ({
          resume: {
            ...state.resume,
            languages: state.resume.languages.map((l) => (l.id === id ? { ...l, ...language } : l)),
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            languages: state.resume.languages.filter((l) => l.id !== id),
          },
        })),

      addCertification: (certification) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: [
              ...state.resume.certifications,
              { ...certification, id: generateId() },
            ],
          },
        })),

      updateCertification: (id, certification) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.map((c) =>
              c.id === id ? { ...c, ...certification } : c,
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.filter((c) => c.id !== id),
          },
        })),

      addProject: (project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, { ...project, id: generateId() }],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
          },
        })),

      setTemplate: (templateId) => set({ selectedTemplate: templateId }),

      resetResume: () => set({ resume: initialState }),

      loadResume: (resume) => set({ resume }),
    }),
    {
      name: 'resume-storage',
    },
  ),
);
