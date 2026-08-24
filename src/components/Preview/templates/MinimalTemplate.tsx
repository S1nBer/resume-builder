import type { Resume, SectionId } from '../../../types/resume';
import { useResumeStore } from '../../../store/resumeStore';

interface MinimalTemplateProps {
  resume: Resume;
}

function MinimalTemplate({ resume }: MinimalTemplateProps) {
  const sectionOrder = useResumeStore((state) => state.sectionOrder);
  const {
    personalInfo,
    summary,
    skills,
    skillGroups,
    experience,
    education,
    languages,
    certifications,
    projects,
  } = resume;

  const isSectionEnabled = (sectionId: SectionId) => {
    const section = sectionOrder.find((s) => s.id === sectionId);
    return section?.enabled ?? false;
  };

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'summary':
        return (
          summary &&
          isSectionEnabled('summary') && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                О себе
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </section>
          )
        );
      case 'experience':
        return (
          experience.length > 0 &&
          isSectionEnabled('experience') && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Опыт работы
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {exp.startDate} - {exp.current ? 'настоящее время' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{exp.company}</p>
                    {exp.description && (
                      <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case 'education':
        return (
          education.length > 0 &&
          isSectionEnabled('education') && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Образование
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {edu.startDate} - {edu.current ? 'настоящее время' : edu.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {edu.degree}
                      {edu.field && ` - ${edu.field}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case 'skills':
        return (
          (skills.length > 0 || skillGroups.length > 0) &&
          isSectionEnabled('skills') && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Навыки
              </h2>

              {/* Простые навыки */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-gray-50 text-gray-700 rounded text-sm border border-gray-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Группы навыков */}
              {skillGroups.length > 0 && (
                <div className="space-y-4">
                  {skillGroups.map((group) => (
                    <div key={group.id} className="border-t border-gray-100 pt-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">{group.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-3 py-1 bg-gray-50 text-gray-600 rounded text-sm"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )
        );
      case 'languages':
        return (
          languages.length > 0 &&
          isSectionEnabled('languages') && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Языки
              </h2>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-sm">
                    <span className="text-gray-900 font-medium">{lang.name}</span>
                    <span className="text-gray-500 ml-2">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case 'certifications':
        return (
          certifications.length > 0 &&
          isSectionEnabled('certifications') && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Сертификаты
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <span className="text-gray-900 font-medium">{cert.name}</span>
                    <span className="text-gray-500 ml-2">
                      {cert.issuer}
                      {cert.date && ` - ${cert.date}`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case 'projects':
        return (
          projects.length > 0 &&
          isSectionEnabled('projects') && (
            <section>
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Проекты
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-gray-500 text-sm mt-1">
                        {project.technologies.join(' · ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[800px] mx-auto bg-white p-8">
      {/* Шапка */}
      <header className="mb-8">
        <div className="flex items-center gap-6">
          {personalInfo.photo && (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-light text-gray-900">
              {personalInfo.fullName || 'Ваше имя'}
            </h1>
            <p className="text-lg text-gray-600 mt-1">{personalInfo.position || 'Должность'}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && (
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              {personalInfo.website}
            </a>
          )}
        </div>
      </header>

      <div className="border-t border-gray-200 pt-8">
        {/* Секции в порядке, заданном пользователем */}
        {sectionOrder.map((section) => (
          <div key={section.id}>{renderSection(section.id)}</div>
        ))}
      </div>
    </div>
  );
}

export default MinimalTemplate;
