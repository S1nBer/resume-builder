import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from './SummaryForm';
import { useResumeStore } from '../../store/resumeStore';

describe('SummaryForm', () => {
  beforeEach(() => {
    useResumeStore.setState({
      resume: {
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
      },
    });
  });

  it('should render textarea', () => {
    render(<SummaryForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should update summary', () => {
    render(<SummaryForm />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Мой опыт работы' } });

    const state = useResumeStore.getState();
    expect(state.resume.summary).toBe('Мой опыт работы');
  });

  it('should display existing summary', () => {
    useResumeStore.setState((state) => ({
      resume: { ...state.resume, summary: 'Существующий текст' },
    }));

    render(<SummaryForm />);

    expect(screen.getByDisplayValue('Существующий текст')).toBeInTheDocument();
  });
});
