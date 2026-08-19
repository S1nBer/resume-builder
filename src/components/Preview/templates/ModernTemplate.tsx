import type { Resume } from '../../../types/resume';

interface ModernTemplateProps {
  resume: Resume;
}

function ModernTemplate({ resume }: ModernTemplateProps) {
  const {
    personalInfo,
    summary,
    skills,
    experience,
    education,
    languages,
    certifications,
    projects,
  } = resume;

  return (
    <div className="max-w-[800px] mx-auto bg-white p-8">
      {/* Шапка с фото и контактами */}
      <header className="flex items-start space-x-6 mb-6">
        {personalInfo.photo && (
          <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
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
          <p className="text-xl text-blue-600 mt-1">{personalInfo.position || 'Должность'}</p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {personalInfo.location}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {personalInfo.website && (
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {personalInfo.website}
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                GitHub
              </a>
            )}
            {personalInfo.telegram && (
              <span className="text-gray-600">{personalInfo.telegram}</span>
            )}
          </div>
        </div>
      </header>

      {/* О себе */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">
            О себе
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Опыт работы */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">
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
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Образование */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">
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
      )}

      {/* Навыки */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">
            Навыки
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Языки */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">
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
      )}

      {/* Сертификаты */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">
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
      )}

      {/* Проекты */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">
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
      )}
    </div>
  );
}

export default ModernTemplate;
