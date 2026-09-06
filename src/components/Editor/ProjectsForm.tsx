import { useResumeStore } from '../../store/resumeStore';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import FormField from '../common/FormField';
import { useTranslation } from '../../i18n/useTranslation';

function ProjectsForm() {
  const projects = useResumeStore((state) => state.resume.projects);
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">{t('projects')}</h2>
        <Button
          type="button"
          onClick={() => addProject({ name: '', description: '', technologies: [] })}
        >
          {t('addProject')}
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">
                {t('project')} {index + 1}
              </h3>
              <Button variant="danger" type="button" onClick={() => removeProject(project.id)}>
                {t('delete')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label={t('projectName')} required>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder={t('projectName')}
                />
              </FormField>

              <FormField label={t('projectLink')}>
                <Input
                  type="url"
                  value={project.url}
                  onChange={(e) => updateProject(project.id, { url: e.target.value })}
                  placeholder="https://example.com"
                />
              </FormField>
            </div>

            <FormField label={t('description')}>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                placeholder={t('projectDescription')}
                rows={4}
              />
            </FormField>

            <FormField label={t('technologies')}>
              <Input
                value={project.technologies.join(', ')}
                onChange={(e) => {
                  const technologies = e.target.value
                    .split(',')
                    .map((tech) => tech.trim())
                    .filter((tech) => tech !== '');
                  updateProject(project.id, { technologies });
                }}
                placeholder="React, TypeScript, Node.js"
              />
            </FormField>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">{t('noProjects')}</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsForm;
