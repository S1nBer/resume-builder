import { useResumeStore } from '../../store/resumeStore';
import FormField from '../common/FormField';
import Textarea from '../common/Textarea';

function SummaryForm() {
  const { resume, updateSummary } = useResumeStore();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">О себе</h2>
      <FormField label="Краткое описание">
        <Textarea
          value={resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Опишите ваш опыт, ключевые навыки и достижения..."
          rows={6}
        />
      </FormField>
    </div>
  );
}

export default SummaryForm;
