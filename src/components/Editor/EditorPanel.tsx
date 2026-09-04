import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { validateResume, hasErrors } from '../../utils/validators';
import { useTranslation } from '../../i18n/useTranslation';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import LanguagesForm from './LanguagesForm';
import CertificationsForm from './CertificationsForm';
import ProjectsForm from './ProjectsForm';

type Section =
  | 'personal'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'education'
  | 'languages'
  | 'certifications'
  | 'projects';

function EditorPanel() {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [showValidation, setShowValidation] = useState(false);
  const resume = useResumeStore((state) => state.resume);
  const setErrors = useResumeStore((state) => state.setErrors);
  const errors = useResumeStore((state) => state.errors);
  const { t } = useTranslation();

  const sections = [
    { id: 'personal', label: t('personalInfo'), icon: '👤' },
    { id: 'summary', label: t('summary'), icon: '📝' },
    { id: 'skills', label: t('skills'), icon: '💪' },
    { id: 'experience', label: t('experience'), icon: '💼' },
    { id: 'education', label: t('education'), icon: '🎓' },
    { id: 'languages', label: t('languages'), icon: '🌍' },
    { id: 'certifications', label: t('certifications'), icon: '📜' },
    { id: 'projects', label: t('projects'), icon: '🚀' },
  ];

  const handleValidate = () => {
    const validationErrors = validateResume(resume);
    setErrors(validationErrors);
    setShowValidation(true);

    if (hasErrors(validationErrors)) {
      if (validationErrors.personalInfo) {
        setActiveSection('personal');
      } else if (Object.keys(validationErrors).some((key) => key.startsWith('experience'))) {
        setActiveSection('experience');
      } else if (Object.keys(validationErrors).some((key) => key.startsWith('education'))) {
        setActiveSection('education');
      }
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'skills':
        return <SkillsForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id as Section)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
              {Object.keys(errors).some((key) => key.startsWith(section.id)) && (
                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full inline-block"></span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleValidate}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            {t('validateResume')}
          </button>
        </div>

        {showValidation && (
          <div
            className={`mt-4 p-3 rounded-md ${
              hasErrors(errors)
                ? 'bg-red-50 border border-red-200'
                : 'bg-green-50 border border-green-200'
            }`}
          >
            <p className={`text-sm ${hasErrors(errors) ? 'text-red-700' : 'text-green-700'}`}>
              {hasErrors(errors) ? t('errorsFound') : t('resumeReady')}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {renderSection()}
      </div>
    </div>
  );
}

export default EditorPanel;
