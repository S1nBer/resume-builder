import { useRef } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import ModernTemplate from './templates/ModernTemplate';
import { exportToPdf } from '../../utils/pdfGenerator';

function PreviewPanel() {
  const resume = useResumeStore((state) => state.resume);
  const selectedTemplate = useResumeStore((state) => state.selectedTemplate);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = async () => {
    if (previewRef.current) {
      await exportToPdf('resume-preview', `${resume.personalInfo.fullName || 'resume'}.pdf`);
    }
  };

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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Предпросмотр</h2>
        <button
          type="button"
          onClick={handleExportPdf}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Скачать PDF
        </button>
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
