import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PersonalInfoForm from './PersonalInfoForm';
import { useResumeStore } from '../../store/resumeStore';
import { extractTextFromPdf, parseResumeWithAI } from '../../utils/pdfParser';
import { parseContacts } from '../../utils/contactParser';

vi.mock('../../utils/pdfParser', () => ({
  extractTextFromPdf: vi.fn(),
  parseResumeWithAI: vi.fn(),
}));

vi.mock('../../utils/contactParser', () => ({
  parseContacts: vi.fn(),
}));

globalThis.alert = vi.fn();

globalThis.File = class MockFile extends File {
  constructor(
    bits: ConstructorParameters<typeof File>[0],
    name: string,
    options?: ConstructorParameters<typeof File>[2],
  ) {
    super(bits, name, options);
  }
  async arrayBuffer() {
    return new ArrayBuffer(0);
  }
} as typeof File;

describe('PersonalInfoForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
  });

  it('should update full name', () => {
    render(<PersonalInfoForm />);
    const input = screen.getByPlaceholderText('Ваше имя');
    fireEvent.change(input, { target: { value: 'Иван Иванов' } });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.fullName).toBe('Иван Иванов');
  });

  it('should show error for invalid email', () => {
    render(<PersonalInfoForm />);
    const emailInput = screen.getByPlaceholderText('ivan@example.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    expect(screen.getByText('Некорректный email')).toBeInTheDocument();
  });

  it('should select preferred contact', () => {
    render(<PersonalInfoForm />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[0]);

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.preferredContact).toBe('email');
  });

  it('should handle PDF upload and parse contacts', async () => {
    vi.mocked(extractTextFromPdf).mockResolvedValue('Текст из PDF');
    vi.mocked(parseContacts).mockReturnValue({ email: 'test@test.com', phone: '1234567890' });

    render(<PersonalInfoForm />);

    const label = screen.getByText('Импортировать из PDF').closest('label');
    const pdfInput = label?.querySelector('input[type="file"]') as HTMLInputElement;

    const file = new File([''], 'resume.pdf', { type: 'application/pdf' });
    fireEvent.change(pdfInput, { target: { files: [file] } });

    await waitFor(
      () => {
        const state = useResumeStore.getState();
        expect(state.resume.personalInfo.email).toBe('test@test.com');
      },
      { timeout: 2000 },
    );
  });

  it('should handle AI parsing', async () => {
    vi.mocked(extractTextFromPdf).mockResolvedValue('Текст из PDF');
    vi.mocked(parseResumeWithAI).mockResolvedValue({
      fullName: 'Иван',
      position: 'Разработчик',
      email: 'ai@test.com',
      experience: [
        {
          company: 'ООО Ромашка',
          position: 'Дев',
          startDate: '2020',
          endDate: '2021',
          description: ['Сделал проект'],
        },
      ],
      education: [{ institution: 'МГУ', degree: 'Бакалавр', startDate: '2016', endDate: '2020' }],
      skills: ['React', 'TypeScript'],
    });

    render(<PersonalInfoForm />);

    const fileInputs = document.querySelectorAll('input[type="file"]');
    const aiInput = fileInputs[fileInputs.length - 1] as HTMLInputElement;
    const file = new File([''], 'resume.pdf', { type: 'application/pdf' });

    fireEvent.change(aiInput, { target: { files: [file] } });

    await waitFor(
      () => {
        const state = useResumeStore.getState();
        expect(state.resume.personalInfo.fullName).toBe('Иван');
        expect(state.resume.experience.length).toBe(1);
      },
      { timeout: 2000 },
    );
  });
});
