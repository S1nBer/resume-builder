import { useResumeStore } from '../../store/resumeStore';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import FormField from '../common/FormField';

function EducationForm() {
  const education = useResumeStore((state) => state.resume.education);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Образование</h2>
        <Button type="button" onClick={() => addEducation()}>
          Добавить образование
        </Button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Образование {index + 1}</h3>
              <Button variant="danger" type="button" onClick={() => removeEducation(edu.id)}>
                Удалить
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Учебное заведение" required>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  placeholder="Название университета"
                />
              </FormField>

              <FormField label="Степень">
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  placeholder="Бакалавр, Магистр..."
                />
              </FormField>

              <FormField label="Специальность">
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  placeholder="Компьютерные науки"
                />
              </FormField>

              <FormField label="Город">
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                  placeholder="Москва"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Начало">
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </FormField>

                <FormField label="Окончание">
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    disabled={edu.current}
                  />
                </FormField>
              </div>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={edu.current}
                onChange={(e) => updateEducation(edu.id, { current: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Учусь сейчас</span>
            </label>

            <FormField label="Дополнительная информация">
              <Textarea
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                placeholder="Достижения, курсовые работы..."
                rows={3}
              />
            </FormField>
          </div>
        ))}

        {education.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">Нет добавленного образования</p>
        )}
      </div>
    </div>
  );
}

export default EducationForm;
