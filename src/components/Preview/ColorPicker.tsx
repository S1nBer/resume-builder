import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';

const presetColors = [
  { id: 'blue', color: '#2563eb', name: 'Синий' },
  { id: 'red', color: '#dc2626', name: 'Красный' },
  { id: 'green', color: '#16a34a', name: 'Зелёный' },
  { id: 'purple', color: '#7c3aed', name: 'Фиолетовый' },
  { id: 'orange', color: '#ea580c', name: 'Оранжевый' },
  { id: 'teal', color: '#0d9488', name: 'Бирюзовый' },
  { id: 'pink', color: '#db2777', name: 'Розовый' },
  { id: 'gray', color: '#4b5563', name: 'Серый' },
];

function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const accentColor = useResumeStore((state) => state.accentColor);
  const setAccentColor = useResumeStore((state) => state.setAccentColor);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <span
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: accentColor }}
        ></span>
        <span>Цвет</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Цвет акцента</h3>
          <div className="grid grid-cols-4 gap-2">
            {presetColors.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setAccentColor(preset.color);
                  setIsOpen(false);
                }}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  accentColor === preset.color ? 'border-gray-900' : 'border-transparent'
                }`}
                style={{ backgroundColor: preset.color }}
                title={preset.name}
              ></button>
            ))}
          </div>
          <div className="mt-3">
            <label className="block text-xs text-gray-600 mb-1">Свой цвет</label>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-full h-8 cursor-pointer rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
