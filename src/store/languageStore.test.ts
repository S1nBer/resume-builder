import { describe, it, expect, beforeEach } from 'vitest';
import { useLanguageStore } from './languageStore';

describe('languageStore', () => {
  beforeEach(() => {
    useLanguageStore.setState({ language: 'ru' });
  });

  it('should have default language', () => {
    expect(useLanguageStore.getState().language).toBe('ru');
  });

  it('should change language', () => {
    useLanguageStore.getState().setLanguage('en');
    expect(useLanguageStore.getState().language).toBe('en');
  });

  it('should change language back to russian', () => {
    useLanguageStore.getState().setLanguage('en');
    useLanguageStore.getState().setLanguage('ru');
    expect(useLanguageStore.getState().language).toBe('ru');
  });
});
