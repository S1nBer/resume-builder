import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsForm from './ProjectsForm';
import { useResumeStore } from '../../store/resumeStore';

describe('ProjectsForm', () => {
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
    render(<ProjectsForm />);
    expect(screen.getByText('Нет добавленных проектов')).toBeInTheDocument();
  });

  it('should add project', () => {
    render(<ProjectsForm />);

    fireEvent.click(screen.getByText('Добавить проект'));

    const state = useResumeStore.getState();
    expect(state.resume.projects).toHaveLength(1);
    expect(state.resume.projects[0].technologies).toEqual([]);
  });

  it('should update project name', () => {
    useResumeStore.getState().addProject({ name: '', description: '', technologies: [] });

    render(<ProjectsForm />);

    const input = screen.getByPlaceholderText('Название проекта');
    fireEvent.change(input, { target: { value: 'Resume Builder' } });

    const state = useResumeStore.getState();
    expect(state.resume.projects[0].name).toBe('Resume Builder');
  });

  it('should parse technologies from comma-separated string', () => {
    useResumeStore.getState().addProject({ name: 'Test', description: '', technologies: [] });

    render(<ProjectsForm />);

    const input = screen.getByPlaceholderText('React, TypeScript, Node.js');
    fireEvent.change(input, { target: { value: 'React, TypeScript, Node.js' } });

    const state = useResumeStore.getState();
    expect(state.resume.projects[0].technologies).toEqual(['React', 'TypeScript', 'Node.js']);
  });

  it('should remove project', () => {
    useResumeStore.getState().addProject({ name: 'Test', description: '', technologies: [] });

    render(<ProjectsForm />);

    fireEvent.click(screen.getByText('Удалить'));

    const state = useResumeStore.getState();
    expect(state.resume.projects).toHaveLength(0);
  });
});
