import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SectionSettings from './SectionSettings';
import { useResumeStore } from '../../store/resumeStore';
import type { DragEndEvent } from '@dnd-kit/core';
import type React from 'react';

vi.mock('@dnd-kit/core', async () => {
  const actual = await vi.importActual<typeof import('@dnd-kit/core')>('@dnd-kit/core');
  return {
    ...actual,
    DndContext: ({
      children,
      onDragEnd,
    }: {
      children: React.ReactNode;
      onDragEnd: (e: DragEndEvent) => void;
    }) => (
      <div
        data-testid="dnd-context"
        onClick={() =>
          onDragEnd({ active: { id: 'summary' }, over: { id: 'experience' } } as DragEndEvent)
        }
      >
        {children}
      </div>
    ),
  };
});

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

  it('should reorder sections on drag end', () => {
    render(<SectionSettings />);
    fireEvent.click(screen.getByText('Настройки секций'));

    // Кликаем по нашему мок-контексту (вызывает onDragEnd)
    fireEvent.click(screen.getByTestId('dnd-context'));

    const state = useResumeStore.getState();
    // В моке мы передали active: summary, over: experience
    // Значит они должны поменяться местами
    expect(state.sectionOrder[0].id).toBe('experience');
    expect(state.sectionOrder[1].id).toBe('summary');
  });
});
