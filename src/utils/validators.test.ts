import { describe, it, expect } from 'vitest';
import { validateResume, isValidEmail, isValidPhone } from './validators';
import type { Resume } from '../types/resume';

const emptyResume: Resume = {
  personalInfo: {
    fullName: '',
    position: '',
    photo: null,
    email: '',
    phone: '',
    location: '',
    country: '',
    website: '',
    linkedin: '',
    github: '',
    telegram: '',
    preferredContact: null,
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

describe('validators', () => {
  it('should validate email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('should validate phone', () => {
    expect(isValidPhone('+7 (999) 123-45-67')).toBe(true);
    expect(isValidPhone('89991234567')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
  });

  it('should return errors for empty resume', () => {
    const errors = validateResume(emptyResume);

    expect(errors.personalInfo).toBeDefined();
    expect(errors.personalInfo).toContain('Укажите ФИО');
    expect(errors.personalInfo).toContain('Укажите должность');
    expect(errors.personalInfo).toContain('Укажите email');
  });

  it('should not return errors for filled resume', () => {
    const filledResume: Resume = {
      ...emptyResume,
      personalInfo: {
        ...emptyResume.personalInfo,
        fullName: 'Иван Иванов',
        position: 'Developer',
        email: 'ivan@example.com',
      },
    };

    const errors = validateResume(filledResume);

    expect(errors.personalInfo).toBeUndefined();
  });

  it('should validate experience errors', () => {
    const resumeWithEmptyExp: Resume = {
      ...emptyResume,
      experience: [
        {
          id: '1',
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: [],
        },
      ],
    };

    const errors = validateResume(resumeWithEmptyExp);
    expect(errors['experience_1']).toBeDefined();
    expect(errors['experience_1']).toContain('Укажите компанию');
  });

  it('should validate education errors', () => {
    const resumeWithEmptyEdu: Resume = {
      ...emptyResume,
      education: [
        {
          id: '1',
          institution: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    };

    const errors = validateResume(resumeWithEmptyEdu);
    expect(errors['education_1']).toBeDefined();
    expect(errors['education_1']).toContain('Укажите учебное заведение');
  });

  it('should not return experience errors when current is true', () => {
    const resumeWithCurrentExp: Resume = {
      ...emptyResume,
      experience: [
        {
          id: '1',
          company: 'Google',
          position: 'Developer',
          location: '',
          startDate: '2020-01',
          endDate: '',
          current: true,
          description: '',
          achievements: [],
        },
      ],
    };

    const errors = validateResume(resumeWithCurrentExp);
    expect(errors['experience_1']).toBeUndefined();
  });

  it('should validate email with different formats', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('user.name+tag@example.com')).toBe(true);
    expect(isValidEmail('user@domain')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
  });

  it('should validate phone with different formats', () => {
    expect(isValidPhone('+1 (555) 123-4567')).toBe(true);
    expect(isValidPhone('+44 20 1234 5678')).toBe(true);
    expect(isValidPhone('abc')).toBe(false);
  });

  it('should not return experience errors for valid entry', () => {
    const resumeWithValidExp: Resume = {
      ...emptyResume,
      experience: [
        {
          id: '1',
          company: 'Google',
          position: 'Developer',
          location: 'Moscow',
          startDate: '2020-01',
          endDate: '2023-01',
          current: false,
          description: 'Worked on search',
          achievements: [],
        },
      ],
    };

    const errors = validateResume(resumeWithValidExp);
    expect(errors['experience_1']).toBeUndefined();
  });

  it('should not return education errors for valid entry', () => {
    const resumeWithValidEdu: Resume = {
      ...emptyResume,
      education: [
        {
          id: '1',
          institution: 'MSU',
          degree: 'Bachelor',
          field: 'CS',
          location: 'Moscow',
          startDate: '2016-09',
          endDate: '2020-06',
          current: false,
          description: '',
        },
      ],
    };

    const errors = validateResume(resumeWithValidEdu);
    expect(errors['education_1']).toBeUndefined();
  });

  it('should validate current education without end date', () => {
    const resumeWithCurrentEdu: Resume = {
      ...emptyResume,
      education: [
        {
          id: '1',
          institution: 'MSU',
          degree: 'Master',
          field: 'CS',
          location: 'Moscow',
          startDate: '2020-09',
          endDate: '',
          current: true,
          description: '',
        },
      ],
    };

    const errors = validateResume(resumeWithCurrentEdu);
    expect(errors['education_1']).toBeUndefined();
  });
});
