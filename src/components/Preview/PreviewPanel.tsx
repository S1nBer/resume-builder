import { useResumeStore } from '../../store/resumeStore';
import ModernTemplate from './templates/ModernTemplate';

function PreviewPanel() {
  const resume = useResumeStore((state) => state.resume);
  const selectedTemplate = useResumeStore((state) => state.selectedTemplate);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Предпросмотр</h2>
      </div>

      {/* Контейнер с резюме */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
}

export default PreviewPanel;
