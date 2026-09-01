import { useState, useEffect } from 'react';
import EditorPanel from './components/Editor/EditorPanel';
import PreviewPanel from './components/Preview/PreviewPanel';
import { useLanguageStore } from './store/languageStore';
import { useTranslation } from './i18n/useTranslation';
import type { Language } from './i18n/translations';

function App() {
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { t } = useTranslation();

  useEffect(() => {
    // Автоопределение языка браузера
    const browserLang = navigator.language.toLowerCase();
    const detectedLang: Language = browserLang.startsWith('ru') ? 'ru' : 'en';

    // Проверяем, есть ли сохранённый язык
    const savedLang = localStorage.getItem('language-storage');
    if (!savedLang) {
      setLanguage(detectedLang);
    }
  }, [setLanguage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">{t('appTitle')}</h1>
              <span className="text-sm text-gray-500 hidden md:inline">{t('appSubtitle')}</span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Переключатель языка */}
              <button
                onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {language === 'ru' ? 'EN' : 'RU'}
              </button>

              <button
                onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {isPreviewFullscreen ? t('showEditor') : t('fullscreen')}
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
