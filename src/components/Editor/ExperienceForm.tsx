import { useResumeStore } from '../../store/resumeStore';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import FormField from '../common/FormField';

function ExperienceForm() {
  const experience = useResumeStore((state) => state.resume.experience);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Опыт работы</h2>
        <Button type="button" onClick={() => addExperience()}>
          Добавить опыт
        </Button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Место работы {index + 1}</h3>
              <Button variant="danger" type="button" onClick={() => removeExperience(exp.id)}>
                Удалить
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Компания" required>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  placeholder="Название компании"
                />
              </FormField>

              <FormField label="Должность" required>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  placeholder="Frontend Developer"
                />
              </FormField>

              <FormField label="Город">
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                  placeholder="Москва"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Начало">
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </FormField>

                <FormField label="Окончание">
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                </FormField>
              </div>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Работаю здесь сейчас</span>
            </label>

            <FormField label="Описание">
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                placeholder="Опишите ваши обязанности и достижения..."
                rows={4}
              />
            </FormField>
          </div>
        ))}

        {experience.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">Нет добавленного опыта работы</p>
        )}
      </div>
    </div>
  );
}

export default ExperienceForm;
