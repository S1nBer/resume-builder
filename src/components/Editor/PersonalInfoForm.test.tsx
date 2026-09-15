import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonalInfoForm from './PersonalInfoForm';
import { useResumeStore } from '../../store/resumeStore';

describe('PersonalInfoForm', () => {
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
      errors: {},
    });
  });

  it('should render all fields', () => {
    render(<PersonalInfoForm />);

    expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Должность')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ivan@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+7 (999) 123-45-67')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Москва')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Россия')).toBeInTheDocument();
  });

  it('should update full name', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('Ваше имя');
    fireEvent.change(input, { target: { value: 'Иван Иванов' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.fullName).toBe('Иван Иванов');
  });

  it('should update position', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('Должность');
    fireEvent.change(input, { target: { value: 'Developer' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.position).toBe('Developer');
  });

  it('should update location', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('Москва');
    fireEvent.change(input, { target: { value: 'Санкт-Петербург' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.location).toBe('Санкт-Петербург');
  });

  it('should update country', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('Россия');
    fireEvent.change(input, { target: { value: 'Беларусь' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.country).toBe('Беларусь');
  });

  it('should update website', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('https://example.com');
    fireEvent.change(input, { target: { value: 'https://mysite.com' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.website).toBe('https://mysite.com');
  });

  it('should update linkedin', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('https://linkedin.com/in/username');
    fireEvent.change(input, { target: { value: 'https://linkedin.com/in/ivan' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.linkedin).toBe('https://linkedin.com/in/ivan');
  });

  it('should update github', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('https://github.com/username');
    fireEvent.change(input, { target: { value: 'https://github.com/ivan' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.github).toBe('https://github.com/ivan');
  });

  it('should update telegram', () => {
    render(<PersonalInfoForm />);

    const input = screen.getByPlaceholderText('@username');
    fireEvent.change(input, { target: { value: '@ivan' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.telegram).toBe('@ivan');
  });

  it('should show error for invalid email', () => {
    render(<PersonalInfoForm />);

    const emailInput = screen.getByPlaceholderText('ivan@example.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    expect(screen.getByText('Некорректный email')).toBeInTheDocument();
  });

  it('should show error for invalid phone', () => {
    render(<PersonalInfoForm />);

    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '123' } });

    expect(screen.getByText('Некорректный номер телефона')).toBeInTheDocument();
  });

  it('should select preferred contact', () => {
    render(<PersonalInfoForm />);

    const emailRadio = screen.getAllByRole('radio')[0];
    fireEvent.click(emailRadio);

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.preferredContact).toBe('email');
  });
});
