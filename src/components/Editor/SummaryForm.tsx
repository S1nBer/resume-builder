import { useResumeStore } from '../../store/resumeStore';
import { useTranslation } from '../../i18n/useTranslation';
import FormField from '../common/FormField';
import Textarea from '../common/Textarea';

function SummaryForm() {
  const resume = useResumeStore((state) => state.resume);
  const updateSummary = useResumeStore((state) => state.updateSummary);
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{t('aboutMe')}</h2>
      <FormField label={t('summary')}>
        <Textarea
          value={resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder={t('summaryPlaceholder')}
          rows={6}
        />
      </FormField>
    </div>
  );
}

export default SummaryForm;
