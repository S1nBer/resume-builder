import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import Button from '../common/Button';
import Input from '../common/Input';

function SkillsForm() {
  const skills = useResumeStore((state) => state.resume.skills);
  const skillGroups = useResumeStore((state) => state.resume.skillGroups);
  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const addSkillGroup = useResumeStore((state) => state.addSkillGroup);
  const updateSkillGroup = useResumeStore((state) => state.updateSkillGroup);
  const removeSkillGroup = useResumeStore((state) => state.removeSkillGroup);
  const addSkillToGroup = useResumeStore((state) => state.addSkillToGroup);
  const updateSkillInGroup = useResumeStore((state) => state.updateSkillInGroup);
  const removeSkillFromGroup = useResumeStore((state) => state.removeSkillFromGroup);

  const [newSkillName, setNewSkillName] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newSkillForGroup, setNewSkillForGroup] = useState<Record<string, string>>({});

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      addSkill({ name: newSkillName.trim() });
      setNewSkillName('');
    }
  };

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      addSkillGroup(newGroupName.trim());
      setNewGroupName('');
    }
  };

  const handleAddSkillToGroup = (groupId: string) => {
    const skillName = newSkillForGroup[groupId]?.trim();
    if (skillName) {
      addSkillToGroup(groupId, skillName);
      setNewSkillForGroup((prev) => ({ ...prev, [groupId]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Навыки</h2>

      {/* Простые навыки */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-700">Список навыков</h3>
        <div className="flex gap-2">
          <Input
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Название навыка"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <Button type="button" onClick={handleAddSkill}>
            Добавить
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200"
            >
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                className="w-32 border-0 bg-transparent shadow-none focus:ring-0 p-0"
              />
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Группы навыков */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-700">Группы навыков</h3>
        <div className="flex gap-2">
          <Input
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Название группы (например, Фреймворки)"
            onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
          />
          <Button type="button" onClick={handleAddGroup} variant="secondary">
            Добавить группу
          </Button>
        </div>

        <div className="space-y-4">
          {skillGroups.map((group) => (
            <div key={group.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  value={group.name}
                  onChange={(e) => updateSkillGroup(group.id, e.target.value)}
                  className="flex-1 font-medium"
                />
                <Button type="button" variant="danger" onClick={() => removeSkillGroup(group.id)}>
                  Удалить
                </Button>
              </div>

              <div className="flex gap-2">
                <Input
                  value={newSkillForGroup[group.id] || ''}
                  onChange={(e) =>
                    setNewSkillForGroup((prev) => ({
                      ...prev,
                      [group.id]: e.target.value,
                    }))
                  }
                  placeholder="Добавить навык в группу"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkillToGroup(group.id)}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleAddSkillToGroup(group.id)}
                >
                  Добавить
                </Button>
              </div>

              {group.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200"
                    >
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkillInGroup(group.id, skill.id, e.target.value)}
                        className="w-32 border-0 bg-transparent shadow-none focus:ring-0 p-0"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkillFromGroup(group.id, skill.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsForm;
