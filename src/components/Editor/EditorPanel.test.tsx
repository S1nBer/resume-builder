import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditorPanel from './EditorPanel';
import { useResumeStore } from '../../store/resumeStore';

describe('EditorPanel', () => {
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

  it('should render all section buttons', () => {
    render(<EditorPanel />);

    expect(screen.getByRole('button', { name: /Личная информация/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /О себе/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Навыки/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Опыт работы/ })).toBeInTheDocument();
  });

  it('should switch to skills section', () => {
    render(<EditorPanel />);

    fireEvent.click(screen.getByText('Навыки'));

    expect(screen.getByText('Список навыков')).toBeInTheDocument();
  });

  it('should show validation errors when validating empty resume', () => {
    render(<EditorPanel />);

    fireEvent.click(screen.getByText('Проверить резюме'));

    expect(screen.getByText('Найдены ошибки. Пожалуйста, исправьте их.')).toBeInTheDocument();
  });

  it('should show success when resume is valid', () => {
    useResumeStore.setState((state) => ({
      resume: {
        ...state.resume,
        personalInfo: {
          ...state.resume.personalInfo,
          fullName: 'Иван Иванов',
          position: 'Developer',
          email: 'ivan@example.com',
        },
      },
    }));

    render(<EditorPanel />);

    fireEvent.click(screen.getByText('Проверить резюме'));

    expect(screen.getByText('Отлично! Резюме готово к экспорту.')).toBeInTheDocument();
  });

  it('should switch to summary section', () => {
    render(<EditorPanel />);
    fireEvent.click(screen.getByRole('button', { name: /О себе/ }));
    expect(
      screen.getByPlaceholderText('Опишите ваш опыт, ключевые навыки и достижения...'),
    ).toBeInTheDocument();
  });

  it('should switch to experience section', () => {
    render(<EditorPanel />);
    fireEvent.click(screen.getByRole('button', { name: /Опыт работы/ }));
    expect(screen.getByText('Нет добавленного опыта работы')).toBeInTheDocument();
  });

  it('should switch to education section', () => {
    render(<EditorPanel />);
    fireEvent.click(screen.getByRole('button', { name: /Образование/ }));
    expect(screen.getByText('Нет добавленного образования')).toBeInTheDocument();
  });

  it('should switch to languages section', () => {
    render(<EditorPanel />);
    fireEvent.click(screen.getByRole('button', { name: /Языки/ }));
    expect(screen.getByText('Нет добавленных языков')).toBeInTheDocument();
  });

  it('should switch to certifications section', () => {
    render(<EditorPanel />);
    fireEvent.click(screen.getByRole('button', { name: /Сертификаты/ }));
    expect(screen.getByText('Нет добавленных сертификатов')).toBeInTheDocument();
  });

  it('should switch to projects section', () => {
    render(<EditorPanel />);
    fireEvent.click(screen.getByRole('button', { name: /Проекты/ }));
    expect(screen.getByText('Нет добавленных проектов')).toBeInTheDocument();
  });

  it('should show error indicators on sections with errors', () => {
    useResumeStore.setState({
      errors: {
        personalInfo: ['Укажите ФИО'],
        experience_1: ['Укажите компанию'],
      },
    });

    render(<EditorPanel />);

    const personalButton = screen.getByRole('button', { name: /Личная информация/ });
    expect(personalButton.querySelector('.bg-red-500')).toBeInTheDocument();
  });
});
