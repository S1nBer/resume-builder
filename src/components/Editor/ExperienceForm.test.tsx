import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceForm from './ExperienceForm';
import { useResumeStore } from '../../store/resumeStore';

describe('ExperienceForm', () => {
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
    render(<ExperienceForm />);
    expect(screen.getByText('Нет добавленного опыта работы')).toBeInTheDocument();
  });

  it('should add experience', () => {
    render(<ExperienceForm />);

    fireEvent.click(screen.getByText('Добавить опыт'));

    const state = useResumeStore.getState();
    expect(state.resume.experience).toHaveLength(1);
  });

  it('should update company', () => {
    useResumeStore.getState().addExperience();

    render(<ExperienceForm />);

    const input = screen.getByPlaceholderText('Google');
    fireEvent.change(input, { target: { value: 'Yandex' } });

    const state = useResumeStore.getState();
    expect(state.resume.experience[0].company).toBe('Yandex');
  });

  it('should update position', () => {
    useResumeStore.getState().addExperience();

    render(<ExperienceForm />);

    const input = screen.getByPlaceholderText('Frontend Developer');
    fireEvent.change(input, { target: { value: 'Backend Developer' } });

    const state = useResumeStore.getState();
    expect(state.resume.experience[0].position).toBe('Backend Developer');
  });

  it('should toggle current job', () => {
    useResumeStore.getState().addExperience();

    render(<ExperienceForm />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const state = useResumeStore.getState();
    expect(state.resume.experience[0].current).toBe(true);
  });

  it('should update description', () => {
    useResumeStore.getState().addExperience();

    render(<ExperienceForm />);

    const textarea = screen.getByPlaceholderText('Опишите ваши обязанности и достижения...');
    fireEvent.change(textarea, { target: { value: 'Разработка веб-приложений' } });

    const state = useResumeStore.getState();
    expect(state.resume.experience[0].description).toBe('Разработка веб-приложений');
  });

  it('should remove experience', () => {
    useResumeStore.getState().addExperience();

    render(<ExperienceForm />);

    fireEvent.click(screen.getByText('Удалить'));

    const state = useResumeStore.getState();
    expect(state.resume.experience).toHaveLength(0);
  });
});
