import { useRef, type ChangeEvent } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import FormField from '../common/FormField';
import Input from '../common/Input';

function PersonalInfoForm() {
  const personalInfo = useResumeStore((state) => state.resume.personalInfo);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Личная информация</h2>

      {/* Фото */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Фото" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
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
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
          >
            Загрузить фото
          </button>
          {personalInfo.photo && (
            <button
              type="button"
              onClick={() => updatePersonalInfo({ photo: null })}
              className="ml-2 px-4 py-2 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
            >
              Удалить
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="ФИО" required>
          <Input
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="Иван Иванов"
          />
        </FormField>

        <FormField label="Должность" required>
          <Input
            value={personalInfo.position}
            onChange={(e) => updatePersonalInfo({ position: e.target.value })}
            placeholder="Frontend Developer"
          />
        </FormField>

        <FormField label="Email" required>
          <Input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="ivan@example.com"
          />
        </FormField>

        <FormField label="Телефон">
          <Input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="+7 (999) 123-45-67"
          />
        </FormField>

        <FormField label="Город">
          <Input
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="Москва"
          />
        </FormField>

        <FormField label="Веб-сайт">
          <Input
            type="url"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="https://example.com"
          />
        </FormField>

        <FormField label="LinkedIn">
          <Input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
          />
        </FormField>

        <FormField label="GitHub">
          <Input
            type="url"
            value={personalInfo.github}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            placeholder="https://github.com/username"
          />
        </FormField>

        <FormField label="Telegram">
          <Input
            value={personalInfo.telegram}
            onChange={(e) => updatePersonalInfo({ telegram: e.target.value })}
            placeholder="@username"
          />
        </FormField>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
