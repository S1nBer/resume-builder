import type { Resume, SectionId } from '../../../types/resume';
import { useResumeStore } from '../../../store/resumeStore';

interface ClassicTemplateProps {
  resume: Resume;
}

function ClassicTemplate({ resume }: ClassicTemplateProps) {
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
            <section className="mb-8">
              <h2
                className="text-xl font-bold text-gray-900 uppercase border-b-2 pb-2 mb-4"
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
            <section className="mb-8">
              <h2
                className="text-xl font-bold text-gray-900 uppercase border-b-2 pb-2 mb-4"
                style={{ borderColor: accentColor }}
              >
                Опыт работы
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {exp.startDate} - {exp.current ? 'настоящее время' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mt-1">
                      {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </p>
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
              <h2
                className="text-xl font-bold text-gray-900 uppercase border-b-2 pb-2 mb-4"
                style={{ borderColor: accentColor }}
              >
                Образование
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {edu.startDate} - {edu.current ? 'настоящее время' : edu.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">
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
              <h2
                className="text-xl font-bold text-gray-900 uppercase border-b-2 pb-2 mb-4"
                style={{ borderColor: accentColor }}
              >
                Навыки
              </h2>

              {skills.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center">
                      <span
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: accentColor }}
                      ></span>
                      <span className="text-gray-700">{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {skillGroups.length > 0 && (
                <div className="space-y-4">
                  {skillGroups.map((group) => (
                    <div key={group.id}>
                      <h4
                        className="text-md font-semibold text-gray-900 mb-2 uppercase text-sm tracking-wide"
                        style={{ color: accentColor }}
                      >
                        {group.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {group.skills.map((skill) => (
                          <div key={skill.id} className="flex items-center">
                            <span
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: accentColor }}
                            ></span>
                            <span className="text-gray-700">{skill.name}</span>
                          </div>
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
              <h2
                className="text-xl font-bold text-gray-900 uppercase border-b-2 pb-2 mb-4"
                style={{ borderColor: accentColor }}
              >
                Языки
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-600 text-sm capitalize">{lang.level}</span>
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
              <h2
                className="text-xl font-bold text-gray-900 uppercase border-b-2 pb-2 mb-4"
                style={{ borderColor: accentColor }}
              >
                Сертификаты
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {cert.issuer}
                      {cert.date && ` - ${cert.date}`}
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
                className="text-xl font-bold text-gray-900 uppercase border-b-2 pb-2 mb-4"
                style={{ borderColor: accentColor }}
              >
                Проекты
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-gray-600 text-sm mt-2">
                        <strong>Технологии:</strong> {project.technologies.join(', ')}
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
    <div className="max-w-[800px] mx-auto bg-white p-8 font-serif">
      {/* Шапка */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide">
          {personalInfo.fullName || 'Ваше имя'}
        </h1>
        <p className="text-xl mt-2" style={{ color: accentColor }}>
          {personalInfo.position || 'Должность'}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>

        {personalInfo.photo && (
          <div className="mt-4 flex justify-center">
            <div
              className="w-32 h-32 rounded-full overflow-hidden border-4"
              style={{ borderColor: accentColor }}
            >
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </header>

      {/* Секции в порядке, заданном пользователем */}
      {sectionOrder.map((section) => (
        <div key={section.id}>{renderSection(section.id)}</div>
      ))}
    </div>
  );
}

export default ClassicTemplate;
