import type { Resume, SectionId } from '../../../types/resume';
import { useResumeStore } from '../../../store/resumeStore';

interface ModernTemplateProps {
  resume: Resume;
}

function ModernTemplate({ resume }: ModernTemplateProps) {
  const sectionOrder = useResumeStore((state) => state.sectionOrder);
  const accentColor = useResumeStore((state) => state.accentColor);
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
            <section className="mb-6">
              <h2
                className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2"
                style={{ borderColor: accentColor }}
              >
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
            <section className="mb-6">
              <h2
                className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2"
                style={{ borderColor: accentColor }}
              >
                Опыт работы
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {exp.startDate} - {exp.current ? 'настоящее время' : exp.endDate}
                      </p>
                    </div>
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
            <section className="mb-6">
              <h2
                className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2"
                style={{ borderColor: accentColor }}
              >
                Образование
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                        <p className="text-gray-600">
                          {edu.degree} {edu.field && `- ${edu.field}`}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {edu.startDate} - {edu.current ? 'настоящее время' : edu.endDate}
                      </p>
                    </div>
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
            <section className="mb-6">
              <h2
                className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2"
                style={{ borderColor: accentColor }}
              >
                Навыки
              </h2>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {skillGroups.length > 0 && (
                <div className="space-y-3">
                  {skillGroups.map((group) => (
                    <div key={group.id}>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">{group.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              backgroundColor: `${accentColor}10`,
                              color: accentColor,
                            }}
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
            <section className="mb-6">
              <h2
                className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2"
                style={{ borderColor: accentColor }}
              >
                Языки
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-500 text-sm capitalize">{lang.level}</span>
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
            <section className="mb-6">
              <h2
                className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2"
                style={{ borderColor: accentColor }}
              >
                Сертификаты
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {cert.issuer} {cert.date && `- ${cert.date}`}
                    </p>
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
              <h2
                className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2"
                style={{ borderColor: accentColor }}
              >
                Проекты
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
      {/* Шапка с фото и контактами */}
      <header className="flex items-start space-x-6 mb-6">
        {personalInfo.photo && (
          <div
            className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2"
            style={{ borderColor: accentColor }}
          >
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {personalInfo.fullName || 'Ваше имя'}
          </h1>
          <p className="text-xl mt-1" style={{ color: accentColor }}>
            {personalInfo.position || 'Должность'}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {personalInfo.website && (
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accentColor }}
                className="hover:opacity-80"
              >
                {personalInfo.website}
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accentColor }}
                className="hover:opacity-80"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accentColor }}
                className="hover:opacity-80"
              >
                GitHub
              </a>
            )}
            {personalInfo.telegram && <span>{personalInfo.telegram}</span>}
          </div>
        </div>
      </header>

      {/* Секции в порядке, заданном пользователем */}
      {sectionOrder.map((section) => (
        <div key={section.id}>{renderSection(section.id)}</div>
      ))}
    </div>
  );
}

export default ModernTemplate;
