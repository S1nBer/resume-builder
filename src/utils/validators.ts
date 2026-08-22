import type { Resume } from '../types/resume';

export interface ValidationErrors {
  [key: string]: string[];
}

export function validateResume(resume: Resume): ValidationErrors {
  const errors: ValidationErrors = {};

  // Валидация личной информации
  const personalErrors: string[] = [];

  if (!resume.personalInfo.fullName.trim()) {
    personalErrors.push('Укажите ФИО');
  }

  if (!resume.personalInfo.position.trim()) {
    personalErrors.push('Укажите должность');
  }

  if (!resume.personalInfo.email.trim()) {
    personalErrors.push('Укажите email');
  } else if (!isValidEmail(resume.personalInfo.email)) {
    personalErrors.push('Некорректный email');
  }

  if (resume.personalInfo.phone && !isValidPhone(resume.personalInfo.phone)) {
    personalErrors.push('Некорректный номер телефона');
  }

  if (personalErrors.length > 0) {
    errors.personalInfo = personalErrors;
  }

  // Валидация опыта работы
  resume.experience.forEach((exp) => {
    const expErrors: string[] = [];

    if (!exp.company.trim()) {
      expErrors.push('Укажите компанию');
    }

    if (!exp.position.trim()) {
      expErrors.push('Укажите должность');
    }

    if (!exp.startDate) {
      expErrors.push('Укажите дату начала');
    }

    if (!exp.current && !exp.endDate) {
      expErrors.push('Укажите дату окончания или отметьте "работаю сейчас"');
    }

    if (expErrors.length > 0) {
      errors[`experience_${exp.id}`] = expErrors;
    }
  });

  // Валидация образования
  resume.education.forEach((edu) => {
    const eduErrors: string[] = [];

    if (!edu.institution.trim()) {
      eduErrors.push('Укажите учебное заведение');
    }

    if (!edu.startDate) {
      eduErrors.push('Укажите дату начала');
    }

    if (!edu.current && !edu.endDate) {
      eduErrors.push('Укажите дату окончания или отметьте "учусь сейчас"');
    }

    if (eduErrors.length > 0) {
      errors[`education_${edu.id}`] = eduErrors;
    }
  });

  return errors;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Простая валидация телефона (можно настроить под нужный формат)
  const phoneRegex = /^[+\d][\d\s()-]{5,}$/;
  return phoneRegex.test(phone);
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
