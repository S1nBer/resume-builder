import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import type { Skill } from '../../types/resume';
import Button from '../common/Button';
import Input from '../common/Input';

const skillLevels = [
  { value: 'beginner', label: 'Начальный' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' },
  { value: 'expert', label: 'Эксперт' },
] as const;

function SkillsForm() {
  const skills = useResumeStore((state) => state.resume.skills);
  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('intermediate');

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      addSkill({
        name: newSkillName.trim(),
        level: newSkillLevel,
      });
      setNewSkillName('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Навыки</h2>

      {/* Форма добавления */}
      <div className="flex gap-2">
        <Input
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Название навыка"
          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
        />
        <select
          value={newSkillLevel}
          onChange={(e) => setNewSkillLevel(e.target.value as Skill['level'])}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          {skillLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        <Button type="button" onClick={handleAddSkill}>
          Добавить
        </Button>
      </div>

      {/* Список навыков */}
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              className="flex-1"
            />
            <select
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, { level: e.target.value as Skill['level'] })}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {skillLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <Button variant="danger" type="button" onClick={() => removeSkill(skill.id)}>
              Удалить
            </Button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">Нет добавленных навыков</p>
        )}
      </div>
    </div>
  );
}

export default SkillsForm;
