import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTranslation } from './useTranslation';
import { useLanguageStore } from '../store/languageStore';

describe('useTranslation', () => {
  beforeEach(() => {
    useLanguageStore.setState({ language: 'ru' });
  });

  it('should translate to russian', () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t('personalInfo')).toBe('Личная информация');
    expect(result.current.t('experience')).toBe('Опыт работы');
    expect(result.current.t('skills')).toBe('Навыки');
  });

  it('should translate to english', () => {
    useLanguageStore.setState({ language: 'en' });

    const { result } = renderHook(() => useTranslation());

    expect(result.current.t('personalInfo')).toBe('Personal Info');
    expect(result.current.t('experience')).toBe('Work Experience');
    expect(result.current.t('skills')).toBe('Skills');
  });

  it('should switch language dynamically', () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t('skills')).toBe('Навыки');

    act(() => {
      useLanguageStore.getState().setLanguage('en');
    });

    expect(result.current.t('skills')).toBe('Skills');
  });
});
