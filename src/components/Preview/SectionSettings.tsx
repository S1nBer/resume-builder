import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../store/resumeStore';
import type { SectionOrder } from '../../types/resume';

interface SortableSectionProps {
  section: SectionOrder;
}

function SortableSection({ section }: SortableSectionProps) {
  const toggleSection = useResumeStore((state) => state.toggleSection);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-md cursor-move hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
        <span className="text-sm text-gray-700">{section.title}</span>
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={section.enabled}
          onChange={() => toggleSection(section.id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </label>
    </div>
  );
}

function SectionSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionOrder = useResumeStore((state) => state.sectionOrder);
  const updateSectionOrder = useResumeStore((state) => state.updateSectionOrder);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sectionOrder.findIndex((section) => section.id === active.id);
      const newIndex = sectionOrder.findIndex((section) => section.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
        updateSectionOrder(newOrder);
      }
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <span>Настройки секций</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Порядок секций</h3>
          <p className="text-xs text-gray-500 mb-3">
            Перетащите для изменения порядка. Отключите ненужные секции.
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sectionOrder.map((section) => section.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {sectionOrder.map((section) => (
                  <SortableSection key={section.id} section={section} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}

export default SectionSettings;
