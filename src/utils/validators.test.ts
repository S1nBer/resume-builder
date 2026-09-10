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
});
