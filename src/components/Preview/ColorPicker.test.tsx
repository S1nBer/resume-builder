import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorPicker from './ColorPicker';
import { useResumeStore } from '../../store/resumeStore';

describe('ColorPicker', () => {
  beforeEach(() => {
    useResumeStore.setState({ accentColor: '#2563eb' });
  });

  it('should render color button', () => {
    render(<ColorPicker />);
    expect(screen.getByText('Цвет')).toBeInTheDocument();
  });

  it('should open color picker on click', () => {
    render(<ColorPicker />);

    fireEvent.click(screen.getByText('Цвет'));

    expect(screen.getByText('Цвет акцента')).toBeInTheDocument();
    expect(screen.getByText('Свой цвет')).toBeInTheDocument();
  });

  it('should change accent color when preset clicked', () => {
    render(<ColorPicker />);

    fireEvent.click(screen.getByText('Цвет'));

    const redButton = screen.getByTitle('Красный');
    fireEvent.click(redButton);

    const state = useResumeStore.getState();
    expect(state.accentColor).toBe('#dc2626');
  });
});
