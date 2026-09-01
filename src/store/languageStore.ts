import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../i18n/translations';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'ru',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    },
  ),
);
