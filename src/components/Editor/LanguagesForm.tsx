import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { useTranslation } from '../../i18n/useTranslation';
import type { Language } from '../../types/resume';
import Button from '../common/Button';
import Input from '../common/Input';

function LanguagesForm() {
  const languages = useResumeStore((state) => state.resume.languages);
  const addLanguage = useResumeStore((state) => state.addLanguage);
  const updateLanguage = useResumeStore((state) => state.updateLanguage);
  const removeLanguage = useResumeStore((state) => state.removeLanguage);
  const { t } = useTranslation();

  const [newLangName, setNewLangName] = useState('');
  const [newLangLevel, setNewLangLevel] = useState<Language['level']>('intermediate');

  const languageLevels = [
    { value: 'basic', label: t('basic') },
    { value: 'intermediate', label: t('intermediate') },
    { value: 'advanced', label: t('advanced') },
    { value: 'fluent', label: t('fluent') },
    { value: 'native', label: t('native') },
  ] as const;

  const handleAddLanguage = () => {
    if (newLangName.trim()) {
      addLanguage({
        name: newLangName.trim(),
        level: newLangLevel,
      });
      setNewLangName('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{t('languages')}</h2>

      <div className="flex gap-2">
        <Input
          value={newLangName}
          onChange={(e) => setNewLangName(e.target.value)}
          placeholder={t('languageName')}
          onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
        />
        <select
          value={newLangLevel}
          onChange={(e) => setNewLangLevel(e.target.value as Language['level'])}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          {languageLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        <Button type="button" onClick={handleAddLanguage}>
          {t('addLanguage')}
        </Button>
      </div>

      <div className="space-y-2">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
            <Input
              value={lang.name}
              onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
              className="flex-1"
            />
            <select
              value={lang.level}
              onChange={(e) =>
                updateLanguage(lang.id, { level: e.target.value as Language['level'] })
              }
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {languageLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <Button variant="danger" type="button" onClick={() => removeLanguage(lang.id)}>
              {t('deletePhoto')}
            </Button>
          </div>
        ))}
        {languages.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">{t('noLanguages')}</p>
        )}
      </div>
    </div>
  );
}

export default LanguagesForm;
