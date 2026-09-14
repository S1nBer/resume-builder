import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CertificationsForm from './CertificationsForm';
import { useResumeStore } from '../../store/resumeStore';

describe('CertificationsForm', () => {
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
    render(<CertificationsForm />);
    expect(screen.getByText('Нет добавленных сертификатов')).toBeInTheDocument();
  });

  it('should add certification', () => {
    render(<CertificationsForm />);

    fireEvent.click(screen.getByText('Добавить сертификат'));

    const state = useResumeStore.getState();
    expect(state.resume.certifications).toHaveLength(1);
  });

  it('should update certification name', () => {
    useResumeStore.getState().addCertification({ name: '', issuer: '', date: '' });

    render(<CertificationsForm />);

    const input = screen.getByPlaceholderText('AWS Certified');
    fireEvent.change(input, { target: { value: 'AWS Solutions Architect' } });

    const state = useResumeStore.getState();
    expect(state.resume.certifications[0].name).toBe('AWS Solutions Architect');
  });

  it('should remove certification', () => {
    useResumeStore.getState().addCertification({ name: 'AWS', issuer: '', date: '' });

    render(<CertificationsForm />);

    fireEvent.click(screen.getByText('Удалить'));

    const state = useResumeStore.getState();
    expect(state.resume.certifications).toHaveLength(0);
  });
});
