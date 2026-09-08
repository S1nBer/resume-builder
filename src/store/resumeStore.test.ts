import { describe, it, expect, beforeEach } from 'vitest';
import { useResumeStore } from './resumeStore';

describe('resumeStore', () => {
  beforeEach(() => {
    useResumeStore.setState({
      resume: {
        personalInfo: {
          fullName: '',
          position: '',
          photo: null,
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          telegram: '',
        },
        summary: '',
        skills: [],
        skillGroups: [],
        experience: [],
        education: [],
        languages: [],
        certifications: [],
        projects: [],
      },
      selectedTemplate: 'modern',
      sectionOrder: [
        { id: 'summary', title: 'О себе', enabled: true },
        { id: 'experience', title: 'Опыт работы', enabled: true },
        { id: 'education', title: 'Образование', enabled: true },
        { id: 'skills', title: 'Навыки', enabled: true },
        { id: 'languages', title: 'Языки', enabled: true },
        { id: 'certifications', title: 'Сертификаты', enabled: true },
        { id: 'projects', title: 'Проекты', enabled: true },
      ],
      errors: {},
      accentColor: '#2563eb',
    });
  });

  it('should update personal info', () => {
    const { updatePersonalInfo } = useResumeStore.getState();

    updatePersonalInfo({ fullName: 'Иван Иванов' });

    const state = useResumeStore.getState();
    expect(state.resume.personalInfo.fullName).toBe('Иван Иванов');
  });

  it('should add skill', () => {
    const { addSkill } = useResumeStore.getState();

    addSkill({ name: 'React' });

    const state = useResumeStore.getState();
    expect(state.resume.skills).toHaveLength(1);
    expect(state.resume.skills[0].name).toBe('React');
  });

  it('should update skill', () => {
    const { addSkill, updateSkill } = useResumeStore.getState();

    addSkill({ name: 'React' });
    const skillId = useResumeStore.getState().resume.skills[0].id;

    updateSkill(skillId, { name: 'Vue' });

    const state = useResumeStore.getState();
    expect(state.resume.skills[0].name).toBe('Vue');
  });

  it('should remove skill', () => {
    const { addSkill, removeSkill } = useResumeStore.getState();

    addSkill({ name: 'React' });
    const skillId = useResumeStore.getState().resume.skills[0].id;

    removeSkill(skillId);

    const state = useResumeStore.getState();
    expect(state.resume.skills).toHaveLength(0);
  });

  it('should add experience', () => {
    const { addExperience } = useResumeStore.getState();

    addExperience({ company: 'Google', position: 'Developer' });

    const state = useResumeStore.getState();
    expect(state.resume.experience).toHaveLength(1);
    expect(state.resume.experience[0].company).toBe('Google');
    expect(state.resume.experience[0].position).toBe('Developer');
  });

  it('should remove experience', () => {
    const { addExperience, removeExperience } = useResumeStore.getState();

    addExperience({ company: 'Google' });
    const expId = useResumeStore.getState().resume.experience[0].id;

    removeExperience(expId);

    const state = useResumeStore.getState();
    expect(state.resume.experience).toHaveLength(0);
  });

  it('should add skill group', () => {
    const { addSkillGroup } = useResumeStore.getState();

    addSkillGroup('Фреймворки');

    const state = useResumeStore.getState();
    expect(state.resume.skillGroups).toHaveLength(1);
    expect(state.resume.skillGroups[0].name).toBe('Фреймворки');
  });

  it('should add skill to group', () => {
    const { addSkillGroup, addSkillToGroup } = useResumeStore.getState();

    addSkillGroup('Фреймворки');
    const groupId = useResumeStore.getState().resume.skillGroups[0].id;

    addSkillToGroup(groupId, 'React');

    const state = useResumeStore.getState();
    expect(state.resume.skillGroups[0].skills).toHaveLength(1);
    expect(state.resume.skillGroups[0].skills[0].name).toBe('React');
  });

  it('should toggle section', () => {
    const { toggleSection } = useResumeStore.getState();

    toggleSection('skills');

    const state = useResumeStore.getState();
    const skillsSection = state.sectionOrder.find((s) => s.id === 'skills');
    expect(skillsSection?.enabled).toBe(false);
  });

  it('should set accent color', () => {
    const { setAccentColor } = useResumeStore.getState();

    setAccentColor('#ff0000');

    const state = useResumeStore.getState();
    expect(state.accentColor).toBe('#ff0000');
  });
});
