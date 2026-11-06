import React, { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { isValidEmail, isValidPhone } from '../../utils/validators';
import { useTranslation } from '../../i18n/useTranslation';
import FormField from '../common/FormField';
import Input from '../common/Input';
import ErrorList from '../common/ErrorList';
import { extractTextFromPdf } from '../../utils/pdfParser';
import { parseContacts } from '../../utils/contactParser';
import { parseResumeWithAI, type AiResumeData } from '../../utils/pdfParser';
import type { PersonalInfo } from '../../types/resume';

function PersonalInfoForm() {
  const personalInfo = useResumeStore((state) => state.resume.personalInfo);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);
  const errors = useResumeStore((state) => state.errors);
  const setErrors = useResumeStore((state) => state.setErrors);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const { t } = useTranslation();

  const personalErrors = errors.personalInfo || [];

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const validateField = (field: string, value: string) => {
    const newErrors: string[] = [];

    switch (field) {
      case 'email':
        if (value && !isValidEmail(value)) {
          newErrors.push(t('invalidEmail'));
        }
        break;
      case 'phone':
        if (value && !isValidPhone(value)) {
          newErrors.push(t('invalidPhone'));
        }
        break;
    }

    const updatedErrors = { ...errors };
    if (newErrors.length > 0) {
      updatedErrors.personalInfo = [...new Set([...personalErrors, ...newErrors])];
    } else {
      updatedErrors.personalInfo = personalErrors.filter((err) => !err.includes(field));
    }

    if (updatedErrors.personalInfo?.length === 0) {
      delete updatedErrors.personalInfo;
    }

    setErrors(updatedErrors);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractTextFromPdf(file);
      const parsedContacts = parseContacts(text);

      // Обновляем данные в сторе
      updatePersonalInfo({
        email: parsedContacts.email || personalInfo.email,
        phone: parsedContacts.phone || personalInfo.phone,
        github: parsedContacts.github || personalInfo.github,
        telegram: parsedContacts.telegram || personalInfo.telegram,
        linkedin: parsedContacts.linkedin || personalInfo.linkedin,
        website: parsedContacts.website || personalInfo.website,
      });

      alert('Данные из PDF успешно распознаны!');
    } catch (error) {
      console.error(error);
      alert('Ошибка при чтении PDF');
    }
  };

  const generateId = () => Math.random().toString(36).slice(2, 11);

  const handleAiParse = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsParsing(true);
      // Извлекаем текст из PDF
      const text = await extractTextFromPdf(file);

      const aiData: AiResumeData = await parseResumeWithAI(text);

      console.log('Ответ от ИИ:', aiData);

      if (aiData) {
        updatePersonalInfo({
          fullName: aiData.fullName || aiData.personal_info?.full_name || personalInfo.fullName,
          position:
            aiData.position ||
            aiData.professional_objectives?.desired_position ||
            personalInfo.position,
          email: aiData.personal_info?.email || personalInfo.email,
          phone: aiData.personal_info?.phone || personalInfo.phone,
        });

        if (aiData.experience && Array.isArray(aiData.experience)) {
          useResumeStore.setState((state) => ({
            resume: {
              ...state.resume,
              experience: aiData.experience!.map((exp) => ({
                id: generateId(),
                company: exp.company || '',
                position: exp.position || '',
                location: '',
                startDate: exp.start_date || exp.startDate || '',
                endDate: exp.end_date || exp.endDate || '',
                current: false,
                description: exp.description || '',
                achievements: exp.achievements || [],
              })),
            },
          }));
        }

        if (aiData.education && Array.isArray(aiData.education)) {
          useResumeStore.setState((state) => ({
            resume: {
              ...state.resume,
              education: aiData.education!.map((edu) => ({
                id: generateId(),
                institution: edu.institution || '',
                degree: edu.degree || '',
                field: edu.field || '',
                location: '',
                startDate: edu.start_date || edu.startDate || '',
                endDate: edu.end_date || edu.endDate || '',
                current: false,
                description: '',
              })),
            },
          }));
        }

        const skillsArray = aiData.skills || aiData.technical_skills;
        if (skillsArray && Array.isArray(skillsArray)) {
          useResumeStore.setState((state) => ({
            resume: {
              ...state.resume,
              skills: skillsArray.map((name) => ({
                id: generateId(),
                name,
              })),
            },
          }));
        }

        alert('ИИ успешно распознал резюме!');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при обработке ИИ. Проверь консоль и вкладку Network.');
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{t('personalInfo')}</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex items-center space-x-4 p-4 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <div
          className={`w-24 h-24 rounded-full overflow-hidden flex-shrink-0 transition-all ${
            isDragging ? 'ring-4 ring-blue-300' : 'ring-2 ring-gray-200'
          }`}
        >
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Фото" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">
            {isDragging ? t('dropPhotoHere') : t('dragPhotoHere')}
          </p>
          <p className="text-xs text-gray-500 mt-1">{t('orClickToSelect')}</p>
          <p className="text-xs text-gray-400 mt-1">{t('photoFormat')}</p>

          {personalInfo.photo && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updatePersonalInfo({ photo: null });
              }}
              className="mt-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-xs hover:bg-red-200 transition-colors"
            >
              {t('delete')}
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
      </div>

      <div className="flex justify-end mb-4">
        <label className="cursor-pointer bg-blue-50 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
          Импортировать из PDF
          <input type="file" accept=".pdf" onChange={handlePdfUpload} className="hidden" />
        </label>
      </div>
      <label
        className={`cursor-pointer px-4 py-2 rounded-md transition-colors text-sm font-medium ${
          isParsing
            ? 'bg-blue-300 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isParsing ? 'ИИ анализирует...' : 'Заполнить всё с помощью ИИ'}
        <input
          type="file"
          accept=".pdf"
          onChange={handleAiParse}
          className="hidden"
          disabled={isParsing}
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={t('fullName')} required>
          <Input
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder={t('yourName')}
            className={
              personalErrors.some((err) => err.includes(t('fullName'))) ? 'border-red-500' : ''
            }
          />
        </FormField>

        <FormField label={t('position')} required>
          <Input
            value={personalInfo.position}
            onChange={(e) => updatePersonalInfo({ position: e.target.value })}
            placeholder={t('yourPosition')}
            className={
              personalErrors.some((err) => err.includes(t('position'))) ? 'border-red-500' : ''
            }
          />
        </FormField>

        <FormField label={t('email')} required>
          <Input
            type="email"
            value={personalInfo.email}
            onChange={(e) => {
              updatePersonalInfo({ email: e.target.value });
              validateField('email', e.target.value);
            }}
            placeholder="ivan@example.com"
            className={personalErrors.some((err) => err.includes('email')) ? 'border-red-500' : ''}
          />
        </FormField>

        <FormField label={t('phone')}>
          <Input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => {
              updatePersonalInfo({ phone: e.target.value });
              validateField('phone', e.target.value);
            }}
            placeholder="+7 (999) 123-45-67"
            className={personalErrors.some((err) => err.includes('phone')) ? 'border-red-500' : ''}
          />
        </FormField>

        <FormField label={t('location')}>
          <Input
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder={t('placeholderLocation')}
          />
        </FormField>

        <FormField label={t('country')}>
          <Input
            value={personalInfo.country}
            onChange={(e) => updatePersonalInfo({ country: e.target.value })}
            placeholder={t('placeholderCountry')}
          />
        </FormField>

        <FormField label={t('website')}>
          <Input
            type="url"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="https://example.com"
          />
        </FormField>

        <FormField label={t('linkedin')}>
          <Input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
          />
        </FormField>

        <FormField label={t('github')}>
          <Input
            type="url"
            value={personalInfo.github}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            placeholder="https://github.com/username"
          />
        </FormField>

        <FormField label={t('telegram')}>
          <Input
            value={personalInfo.telegram}
            onChange={(e) => updatePersonalInfo({ telegram: e.target.value })}
            placeholder="@username"
          />
        </FormField>
      </div>

      {personalErrors.length > 0 && <ErrorList errors={personalErrors} />}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('preferredContact')}
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            { value: 'email', label: t('contactEmail') },
            { value: 'phone', label: t('contactPhone') },
            { value: 'telegram', label: t('contactTelegram') },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="preferredContact"
                value={option.value}
                checked={personalInfo.preferredContact === option.value}
                onChange={() =>
                  updatePersonalInfo({
                    preferredContact: option.value as PersonalInfo['preferredContact'],
                  })
                }
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="preferredContact"
              value=""
              checked={personalInfo.preferredContact === null}
              onChange={() => updatePersonalInfo({ preferredContact: null })}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">—</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
