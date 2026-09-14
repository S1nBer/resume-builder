import { describe, it, expect, beforeEach } from 'vitest';
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
});
