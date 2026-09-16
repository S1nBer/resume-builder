import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SectionSettings from './SectionSettings';
import { useResumeStore } from '../../store/resumeStore';

describe('SectionSettings', () => {
  beforeEach(() => {
    useResumeStore.setState({
      sectionOrder: [
        { id: 'summary', title: 'О себе', enabled: true },
        { id: 'experience', title: 'Опыт работы', enabled: true },
        { id: 'education', title: 'Образование', enabled: true },
        { id: 'skills', title: 'Навыки', enabled: true },
        { id: 'languages', title: 'Языки', enabled: true },
        { id: 'certifications', title: 'Сертификаты', enabled: true },
        { id: 'projects', title: 'Проекты', enabled: true },
      ],
    });
  });

  it('should render button', () => {
    render(<SectionSettings />);
    expect(screen.getByText('Настройки секций')).toBeInTheDocument();
  });

  it('should open settings on click', () => {
    render(<SectionSettings />);

    fireEvent.click(screen.getByText('Настройки секций'));

    expect(
      screen.getByText('Перетащите для изменения порядка. Отключите ненужные секции.'),
    ).toBeInTheDocument();
  });

  it('should toggle section enabled state', () => {
    render(<SectionSettings />);

    fireEvent.click(screen.getByText('Настройки секций'));

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const state = useResumeStore.getState();
    expect(state.sectionOrder[0].enabled).toBe(false);
  });

  it('should close settings when clicked again', () => {
    render(<SectionSettings />);

    const button = screen.getByText('Настройки секций');
    fireEvent.click(button);
    expect(
      screen.getByText('Перетащите для изменения порядка. Отключите ненужные секции.'),
    ).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.queryByText('Перетащите для изменения порядка. Отключите ненужные секции.'),
    ).not.toBeInTheDocument();
  });

  it('should toggle multiple sections', () => {
    render(<SectionSettings />);

    fireEvent.click(screen.getByText('Настройки секций'));

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    const state = useResumeStore.getState();
    expect(state.sectionOrder[0].enabled).toBe(false);
    expect(state.sectionOrder[1].enabled).toBe(false);
  });

  it('should not toggle section when clicking checkbox', () => {
    render(<SectionSettings />);

    fireEvent.click(screen.getByText('Настройки секций'));

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const state = useResumeStore.getState();
    expect(state.sectionOrder[0].enabled).toBe(false);
  });

  it('should call updateSectionOrder on drag end', () => {
    const updateSectionOrder = vi.fn();
    useResumeStore.setState({ updateSectionOrder });

    render(<SectionSettings />);
    fireEvent.click(screen.getByText('Настройки секций'));

    expect(screen.getByText('О себе')).toBeInTheDocument();
    expect(screen.getByText('Опыт работы')).toBeInTheDocument();
  });
});
