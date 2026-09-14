import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EducationForm from './EducationForm';
import { useResumeStore } from '../../store/resumeStore';

describe('EducationForm', () => {
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
    render(<EducationForm />);
    expect(screen.getByText('Нет добавленного образования')).toBeInTheDocument();
  });

  it('should add education', () => {
    render(<EducationForm />);

    fireEvent.click(screen.getByText('Добавить образование'));

    const state = useResumeStore.getState();
    expect(state.resume.education).toHaveLength(1);
  });

  it('should update institution', () => {
    useResumeStore.getState().addEducation();

    render(<EducationForm />);

    const input = screen.getByPlaceholderText('МГУ');
    fireEvent.change(input, { target: { value: 'МГТУ' } });

    const state = useResumeStore.getState();
    expect(state.resume.education[0].institution).toBe('МГТУ');
  });

  it('should toggle current education', () => {
    useResumeStore.getState().addEducation();

    render(<EducationForm />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const state = useResumeStore.getState();
    expect(state.resume.education[0].current).toBe(true);
  });

  it('should remove education', () => {
    useResumeStore.getState().addEducation();

    render(<EducationForm />);

    fireEvent.click(screen.getByText('Удалить'));

    const state = useResumeStore.getState();
    expect(state.resume.education).toHaveLength(0);
  });
});
