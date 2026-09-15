import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SkillsForm from './SkillsForm';
import { useResumeStore } from '../../store/resumeStore';

describe('SkillsForm', () => {
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

  it('should add skill', () => {
    render(<SkillsForm />);

    const input = screen.getByPlaceholderText('Название навыка');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.click(screen.getByText('Добавить'));

    const state = useResumeStore.getState();
    expect(state.resume.skills).toHaveLength(1);
    expect(state.resume.skills[0].name).toBe('React');
  });

  it('should add skill group', () => {
    render(<SkillsForm />);

    const input = screen.getByPlaceholderText('Название группы (например, Фреймворки)');
    fireEvent.change(input, { target: { value: 'Frontend' } });
    fireEvent.click(screen.getByText('Добавить группу'));

    const state = useResumeStore.getState();
    expect(state.resume.skillGroups).toHaveLength(1);
    expect(state.resume.skillGroups[0].name).toBe('Frontend');
  });

  it('should not add empty skill', () => {
    render(<SkillsForm />);

    fireEvent.click(screen.getByText('Добавить'));

    const state = useResumeStore.getState();
    expect(state.resume.skills).toHaveLength(0);
  });

  it('should remove skill', () => {
    useResumeStore.getState().addSkill({ name: 'React' });
    useResumeStore.getState().addSkill({ name: 'Vue' });

    render(<SkillsForm />);

    const deleteButtons = screen.getAllByRole('button').filter((btn) => {
      return btn.innerHTML.includes('M6 18L18 6M6 6l12 12');
    });

    fireEvent.click(deleteButtons[0]);

    const state = useResumeStore.getState();
    expect(state.resume.skills).toHaveLength(1);
  });

  it('should update skill name', () => {
    useResumeStore.getState().addSkill({ name: 'React' });

    render(<SkillsForm />);

    const inputs = screen.getAllByDisplayValue('React');
    fireEvent.change(inputs[0], { target: { value: 'Vue' } });

    const state = useResumeStore.getState();
    expect(state.resume.skills[0].name).toBe('Vue');
  });

  it('should update group name', () => {
    useResumeStore.getState().addSkillGroup('Frontend');

    render(<SkillsForm />);

    const input = screen.getByDisplayValue('Frontend');
    fireEvent.change(input, { target: { value: 'Backend' } });

    const state = useResumeStore.getState();
    expect(state.resume.skillGroups[0].name).toBe('Backend');
  });

  it('should add skill to group', () => {
    useResumeStore.getState().addSkillGroup('Frontend');

    render(<SkillsForm />);

    const input = screen.getByPlaceholderText('Добавить навык в группу');
    fireEvent.change(input, { target: { value: 'React' } });

    const buttons = screen.getAllByText('Добавить');
    fireEvent.click(buttons[buttons.length - 1]);

    const state = useResumeStore.getState();
    expect(state.resume.skillGroups[0].skills).toHaveLength(1);
  });

  it('should remove skill group', () => {
    useResumeStore.getState().addSkillGroup('Frontend');

    render(<SkillsForm />);

    fireEvent.click(screen.getByText('Удалить'));

    const state = useResumeStore.getState();
    expect(state.resume.skillGroups).toHaveLength(0);
  });
});
