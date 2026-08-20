import type { Resume } from '../../../types/resume';

interface ClassicTemplateProps {
  resume: Resume;
}

function ClassicTemplate({ resume }: ClassicTemplateProps) {
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
    <div className="max-w-[800px] mx-auto bg-white p-8 font-serif">
      {/* Шапка */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide">
          {personalInfo.fullName || 'Ваше имя'}
        </h1>
        <p className="text-xl text-gray-700 mt-2">{personalInfo.position || 'Должность'}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>

        {personalInfo.photo && (
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </header>

      {/* О себе */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-2 mb-4">
            О себе
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Опыт работы */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-2 mb-4">
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
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Образование */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-2 mb-4">
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
      )}

      {/* Навыки */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-2 mb-4">
            Навыки
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                <span className="text-gray-700">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Языки */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-2 mb-4">
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
      )}

      {/* Сертификаты */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-2 mb-4">
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
      )}

      {/* Проекты */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-2 mb-4">
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
      )}
    </div>
  );
}

export default ClassicTemplate;
