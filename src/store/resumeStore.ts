import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Resume,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Language,
  Certification,
  Project,
  SectionOrder,
} from '../types/resume';
import type { ValidationErrors } from '../utils/validators';

// Функция для генерации уникальных ID
const generateId = () => Math.random().toString(36).slice(2, 11);

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
  skillGroups: [],
  experience: [],
  education: [],
  languages: [],
  certifications: [],
  projects: [],
};

const defaultSectionOrder: SectionOrder[] = [
  { id: 'summary', title: 'О себе', enabled: true },
  { id: 'experience', title: 'Опыт работы', enabled: true },
  { id: 'education', title: 'Образование', enabled: true },
  { id: 'skills', title: 'Навыки', enabled: true },
  { id: 'languages', title: 'Языки', enabled: true },
  { id: 'certifications', title: 'Сертификаты', enabled: true },
  { id: 'projects', title: 'Проекты', enabled: true },
];

interface ResumeStore {
  resume: Resume;
  selectedTemplate: string;
  sectionOrder: SectionOrder[];
  errors: ValidationErrors;

  // Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;

  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Skill Groups
  addSkillGroup: (name: string) => void;
  updateSkillGroup: (id: string, name: string) => void;
  removeSkillGroup: (id: string) => void;
  addSkillToGroup: (groupId: string, skillName: string) => void;
  updateSkillInGroup: (groupId: string, skillId: string, name: string) => void;
  removeSkillFromGroup: (groupId: string, skillId: string) => void;

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

  // Section Order
  updateSectionOrder: (newOrder: SectionOrder[]) => void;
  toggleSection: (sectionId: string) => void;

  // Validation
  setErrors: (errors: ValidationErrors) => void;
  clearErrors: () => void;

  // Reset
  resetResume: () => void;
  loadResume: (resume: Resume) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialState,
      selectedTemplate: 'modern',
      sectionOrder: defaultSectionOrder,
      errors: {},

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

      addSkillGroup: (name) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillGroups: [
              ...state.resume.skillGroups,
              {
                id: generateId(),
                name,
                skills: [],
              },
            ],
          },
        })),

      updateSkillGroup: (id, name) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillGroups: state.resume.skillGroups.map((group) =>
              group.id === id ? { ...group, name } : group,
            ),
          },
        })),

      removeSkillGroup: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillGroups: state.resume.skillGroups.filter((group) => group.id !== id),
          },
        })),

      addSkillToGroup: (groupId, skillName) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillGroups: state.resume.skillGroups.map((group) =>
              group.id === groupId
                ? {
                    ...group,
                    skills: [...group.skills, { id: generateId(), name: skillName }],
                  }
                : group,
            ),
          },
        })),

      updateSkillInGroup: (groupId, skillId, name) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillGroups: state.resume.skillGroups.map((group) =>
              group.id === groupId
                ? {
                    ...group,
                    skills: group.skills.map((skill) =>
                      skill.id === skillId ? { ...skill, name } : skill,
                    ),
                  }
                : group,
            ),
          },
        })),

      removeSkillFromGroup: (groupId, skillId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillGroups: state.resume.skillGroups.map((group) =>
              group.id === groupId
                ? {
                    ...group,
                    skills: group.skills.filter((skill) => skill.id !== skillId),
                  }
                : group,
            ),
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

      updateSectionOrder: (newOrder) => set({ sectionOrder: newOrder }),

      toggleSection: (sectionId) =>
        set((state) => ({
          sectionOrder: state.sectionOrder.map((section) =>
            section.id === sectionId ? { ...section, enabled: !section.enabled } : section,
          ),
        })),

      setErrors: (errors) => set({ errors }),
      clearErrors: () => set({ errors: {} }),

      resetResume: () =>
        set({
          resume: initialState,
          sectionOrder: defaultSectionOrder,
          errors: {},
        }),

      loadResume: (resume) => set({ resume }),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({
        resume: state.resume,
        selectedTemplate: state.selectedTemplate,
        sectionOrder: state.sectionOrder,
      }),
    },
  ),
);
