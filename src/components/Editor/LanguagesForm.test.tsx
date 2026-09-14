import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguagesForm from './LanguagesForm';
import { useResumeStore } from '../../store/resumeStore';

describe('LanguagesForm', () => {
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

  it('should render empty state', () => {
    render(<LanguagesForm />);
    expect(screen.getByText('Нет добавленных языков')).toBeInTheDocument();
  });

  it('should add language', () => {
    render(<LanguagesForm />);

    const input = screen.getByPlaceholderText('Название языка');
    fireEvent.change(input, { target: { value: 'Английский' } });
    fireEvent.click(screen.getByText('Добавить'));

    const state = useResumeStore.getState();
    expect(state.resume.languages).toHaveLength(1);
    expect(state.resume.languages[0].name).toBe('Английский');
    expect(state.resume.languages[0].level).toBe('intermediate');
  });

  it('should not add empty language', () => {
    render(<LanguagesForm />);

    fireEvent.click(screen.getByText('Добавить'));

    const state = useResumeStore.getState();
    expect(state.resume.languages).toHaveLength(0);
  });

  it('should change language level', () => {
    render(<LanguagesForm />);

    const input = screen.getByPlaceholderText('Название языка');
    fireEvent.change(input, { target: { value: 'Английский' } });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'native' } });

    fireEvent.click(screen.getByText('Добавить'));

    const state = useResumeStore.getState();
    expect(state.resume.languages[0].level).toBe('native');
  });

  it('should remove language', () => {
    useResumeStore.getState().addLanguage({ name: 'Английский', level: 'advanced' });

    render(<LanguagesForm />);

    fireEvent.click(screen.getByText('Удалить'));

    const state = useResumeStore.getState();
    expect(state.resume.languages).toHaveLength(0);
  });
});
