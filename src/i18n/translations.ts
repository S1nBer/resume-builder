export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    // Общие
    appTitle: 'Resume Builder',
    appSubtitle: 'Создайте профессиональное резюме',
    downloadPdf: 'Скачать PDF',
    fullscreen: 'Во весь экран',
    showEditor: 'Показать редактор',

    // Секции
    personalInfo: 'Личная информация',
    summary: 'О себе',
    skills: 'Навыки',
    experience: 'Опыт работы',
    education: 'Образование',
    languages: 'Языки',
    certifications: 'Сертификаты',
    projects: 'Проекты',

    // Личная информация
    fullName: 'ФИО',
    position: 'Должность',
    email: 'Email',
    phone: 'Телефон',
    location: 'Город',
    website: 'Веб-сайт',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    telegram: 'Telegram',
    uploadPhoto: 'Загрузить фото',
    deletePhoto: 'Удалить',
    dragPhotoHere: 'Перетащите фото сюда',
    orClickToSelect: 'или нажмите для выбора файла',
    photoFormat: 'PNG, JPG или SVG, до 5 МБ',
    dropPhotoHere: 'Отпустите файл для загрузки',

    // О себе
    aboutMe: 'О себе',
    summaryPlaceholder: 'Опишите ваш опыт, ключевые навыки и достижения...',

    // Навыки
    skillsList: 'Список навыков',
    skillGroups: 'Группы навыков',
    skillName: 'Название навыка',
    groupName: 'Название группы (например, Фреймворки)',
    addSkill: 'Добавить',
    addGroup: 'Добавить группу',
    addSkillToGroup: 'Добавить навык в группу',
    noSkills: 'Нет добавленных навыков',

    // Опыт работы
    addExperience: 'Добавить опыт',
    company: 'Компания',
    workPlace: 'Место работы',
    startDate: 'Начало',
    endDate: 'Окончание',
    workHere: 'Работаю здесь сейчас',
    description: 'Описание',
    experiencePlaceholder: 'Опишите ваши обязанности и достижения...',
    noExperience: 'Нет добавленного опыта работы',

    // Образование
    addEducation: 'Добавить образование',
    institution: 'Учебное заведение',
    degree: 'Степень',
    field: 'Специальность',
    studyHere: 'Учусь сейчас',
    additionalInfo: 'Дополнительная информация',
    educationPlaceholder: 'Достижения, курсовые работы...',
    noEducation: 'Нет добавленного образования',

    // Языки
    addLanguage: 'Добавить',
    languageName: 'Название языка',
    noLanguages: 'Нет добавленных языков',
    basic: 'Базовый',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
    fluent: 'Свободный',
    native: 'Родной',

    // Сертификаты
    addCertification: 'Добавить сертификат',
    certificateName: 'Название',
    issuer: 'Организация',
    date: 'Дата получения',
    link: 'Ссылка',
    noCertifications: 'Нет добавленных сертификатов',

    // Проекты
    addProject: 'Добавить проект',
    projectName: 'Название проекта',
    projectLink: 'Ссылка на проект',
    technologies: 'Технологии (через запятую)',
    noProjects: 'Нет добавленных проектов',

    // Предпросмотр
    preview: 'Предпросмотр',
    template: 'Шаблон',
    modern: 'Современный',
    classic: 'Классический',
    minimal: 'Минимальный',
    sectionSettings: 'Настройки секций',
    color: 'Цвет',
    accentColor: 'Цвет акцента',
    customColor: 'Свой цвет',
    dragToReorder: 'Перетащите для изменения порядка. Отключите ненужные секции.',
    blue: 'Синий',
    red: 'Красный',
    green: 'Зелёный',
    purple: 'Фиолетовый',
    orange: 'Оранжевый',
    teal: 'Бирюзовый',
    pink: 'Розовый',
    gray: 'Серый',

    // Валидация
    validateResume: 'Проверить резюме',
    errorsFound: 'Найдены ошибки. Пожалуйста, исправьте их.',
    resumeReady: 'Отлично! Резюме готово к экспорту.',
    enterFullName: 'Укажите ФИО',
    enterPosition: 'Укажите должность',
    enterEmail: 'Укажите email',
    invalidEmail: 'Некорректный email',
    invalidPhone: 'Некорректный номер телефона',
    enterCompany: 'Укажите компанию',
    enterStartDate: 'Укажите дату начала',
    enterEndDate: 'Укажите дату окончания или отметьте "работаю сейчас"',
    enterInstitution: 'Укажите учебное заведение',
    enterEndDateOrCurrent: 'Укажите дату окончания или отметьте "учусь сейчас"',

    // Резюме (шаблоны)
    yourName: 'Ваше имя',
    yourPosition: 'Должность',
    present: 'настоящее время',
    technologiesLabel: 'Технологии:',
  },
  en: {
    // General
    appTitle: 'Resume Builder',
    appSubtitle: 'Create a professional resume',
    downloadPdf: 'Download PDF',
    fullscreen: 'Fullscreen',
    showEditor: 'Show editor',

    // Sections
    personalInfo: 'Personal Info',
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    education: 'Education',
    languages: 'Languages',
    certifications: 'Certifications',
    projects: 'Projects',

    // Personal Info
    fullName: 'Full Name',
    position: 'Position',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    website: 'Website',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    telegram: 'Telegram',
    uploadPhoto: 'Upload photo',
    deletePhoto: 'Delete',
    dragPhotoHere: 'Drag photo here',
    orClickToSelect: 'or click to select file',
    photoFormat: 'PNG, JPG or SVG, up to 5 MB',
    dropPhotoHere: 'Drop file to upload',

    // Summary
    aboutMe: 'About Me',
    summaryPlaceholder: 'Describe your experience, key skills and achievements...',

    // Skills
    skillsList: 'Skills List',
    skillGroups: 'Skill Groups',
    skillName: 'Skill name',
    groupName: 'Group name (e.g., Frameworks)',
    addSkill: 'Add',
    addGroup: 'Add group',
    addSkillToGroup: 'Add skill to group',
    noSkills: 'No skills added',

    // Experience
    addExperience: 'Add Experience',
    company: 'Company',
    workPlace: 'Workplace',
    startDate: 'Start Date',
    endDate: 'End Date',
    workHere: 'Currently working here',
    description: 'Description',
    experiencePlaceholder: 'Describe your responsibilities and achievements...',
    noExperience: 'No work experience added',

    // Education
    addEducation: 'Add Education',
    institution: 'Institution',
    degree: 'Degree',
    field: 'Field',
    studyHere: 'Currently studying here',
    additionalInfo: 'Additional Information',
    educationPlaceholder: 'Achievements, coursework...',
    noEducation: 'No education added',

    // Languages
    addLanguage: 'Add',
    languageName: 'Language name',
    noLanguages: 'No languages added',
    basic: 'Basic',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    fluent: 'Fluent',
    native: 'Native',

    // Certifications
    addCertification: 'Add Certification',
    certificateName: 'Name',
    issuer: 'Issuer',
    date: 'Date',
    link: 'Link',
    noCertifications: 'No certifications added',

    // Projects
    addProject: 'Add Project',
    projectName: 'Project name',
    projectLink: 'Project link',
    technologies: 'Technologies (comma separated)',
    noProjects: 'No projects added',

    // Preview
    preview: 'Preview',
    template: 'Template',
    modern: 'Modern',
    classic: 'Classic',
    minimal: 'Minimal',
    sectionSettings: 'Section Settings',
    color: 'Color',
    accentColor: 'Accent Color',
    customColor: 'Custom color',
    dragToReorder: 'Drag to reorder. Disable unnecessary sections.',
    blue: 'Blue',
    red: 'Red',
    green: 'Green',
    purple: 'Purple',
    orange: 'Orange',
    teal: 'Teal',
    pink: 'Pink',
    gray: 'Gray',

    // Validation
    validateResume: 'Validate Resume',
    errorsFound: 'Errors found. Please fix them.',
    resumeReady: 'Great! Resume is ready for export.',
    enterFullName: 'Enter full name',
    enterPosition: 'Enter position',
    enterEmail: 'Enter email',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid phone number',
    enterCompany: 'Enter company',
    enterStartDate: 'Enter start date',
    enterEndDate: 'Enter end date or check "currently working"',
    enterInstitution: 'Enter institution',
    enterEndDateOrCurrent: 'Enter end date or check "currently studying"',

    // Resume (templates)
    yourName: 'Your Name',
    yourPosition: 'Position',
    present: 'present',
    technologiesLabel: 'Technologies:',
  },
} as const;

export type TranslationKey = keyof typeof translations.ru;
