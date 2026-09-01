import { useLanguageStore } from '../store/languageStore';
import { translations, type TranslationKey } from './translations';

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.ru[key] || key;
  };

  return { t, language };
}
