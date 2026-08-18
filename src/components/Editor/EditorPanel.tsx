import { useState } from 'react';
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

const sections = [
  { id: 'personal', label: 'Личная информация', icon: '👤' },
  { id: 'summary', label: 'О себе', icon: '📝' },
  { id: 'skills', label: 'Навыки', icon: '💪' },
  { id: 'experience', label: 'Опыт работы', icon: '💼' },
  { id: 'education', label: 'Образование', icon: '🎓' },
  { id: 'languages', label: 'Языки', icon: '🌍' },
  { id: 'certifications', label: 'Сертификаты', icon: '📜' },
  { id: 'projects', label: 'Проекты', icon: '🚀' },
];

function EditorPanel() {
  const [activeSection, setActiveSection] = useState<Section>('personal');

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
      {/* Навигация по секциям */}
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
            </button>
          ))}
        </div>
      </div>

      {/* Форма активной секции */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {renderSection()}
      </div>
    </div>
  );
}

export default EditorPanel;
