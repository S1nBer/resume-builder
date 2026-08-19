import { useState } from 'react';
import EditorPanel from './components/Editor/EditorPanel';
import PreviewPanel from './components/Preview/PreviewPanel';

function App() {
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              <span className="text-sm text-gray-500">Создайте профессиональное резюме</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {isPreviewFullscreen ? 'Показать редактор' : 'Во весь экран'}
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Скачать PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          {!isPreviewFullscreen && (
            <div className="space-y-6">
              <EditorPanel />
            </div>
          )}

          {/* Preview Panel */}
          <div className={isPreviewFullscreen ? 'lg:col-span-2' : ''}>
            <PreviewPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
