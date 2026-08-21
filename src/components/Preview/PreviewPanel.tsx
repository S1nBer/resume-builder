import { useRef, useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import SectionSettings from './SectionSettings';
import { exportToPdf } from '../../utils/pdfGenerator';

const templates = [
  { id: 'modern', name: 'Современный', component: ModernTemplate },
  { id: 'classic', name: 'Классический', component: ClassicTemplate },
  { id: 'minimal', name: 'Минимальный', component: MinimalTemplate },
];

function PreviewPanel() {
  const resume = useResumeStore((state) => state.resume);
  const selectedTemplate = useResumeStore((state) => state.selectedTemplate);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const previewRef = useRef<HTMLDivElement>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const handleExportPdf = async () => {
    if (previewRef.current) {
      await exportToPdf('resume-preview', `${resume.personalInfo.fullName || 'resume'}.pdf`);
    }
  };

  const renderTemplate = () => {
    const template = templates.find((t) => t.id === selectedTemplate);
    const TemplateComponent = template?.component || ModernTemplate;
    return <TemplateComponent resume={resume} />;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 mr-4">Предпросмотр</h2>
          <div className="flex items-center space-x-3">
            <SectionSettings />
            {/* Переключатель шаблонов */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Шаблон: {templates.find((t) => t.id === selectedTemplate)?.name}
              </button>
              {showTemplateSelector && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => {
                        setTemplate(template.id);
                        setShowTemplateSelector(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        selectedTemplate === template.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700'
                      }`}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleExportPdf}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Скачать PDF
            </button>
          </div>
        </div>
      </div>

      {/* Контейнер с резюме */}
      <div
        id="resume-preview"
        ref={previewRef}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        {renderTemplate()}
      </div>
    </div>
  );
}

export default PreviewPanel;
