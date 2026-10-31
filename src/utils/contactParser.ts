export interface ParsedContacts {
  email?: string;
  phone?: string;
  github?: string;
  telegram?: string;
  linkedin?: string;
  website?: string;
}

export function parseContacts(text: string): ParsedContacts {
  const contacts: ParsedContacts = {};

  // 1. Email (стандартная регулярка)
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    contacts.email = emailMatch[0];
  }

  // 2. Телефон (ищем форматы вроде +7 (999) 123-45-67, 89991234567 и т.д.)
  // Ищем последовательности цифр, возможно со скобками, пробелами и дефисами
  const phoneRegex =
    /(?:\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}/g;
  const phoneMatches = text.match(phoneRegex);
  if (phoneMatches) {
    // Ищем самый длинный похожий на телефон (от 10 цифр)
    for (const match of phoneMatches) {
      const digits = match.replace(/\D/g, '');
      if (digits.length >= 10 && digits.length <= 15) {
        contacts.phone = match.trim();
        break;
      }
    }
  }

  // 3. Ссылки (GitHub, LinkedIn, Telegram, сайты)
  const urlRegex =
    //eslint-disable-next-line no-useless-escape
    /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const urls = text.match(urlRegex) || [];

  // Также ищем просто упоминания доменов без http
  for (const url of urls) {
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('github.com') && !contacts.github) {
      contacts.github = url.startsWith('http') ? url : `https://${url}`;
    } else if (lowerUrl.includes('linkedin.com') && !contacts.linkedin) {
      contacts.linkedin = url.startsWith('http') ? url : `https://${url}`;
    } else if (lowerUrl.includes('t.me') && !contacts.telegram) {
      contacts.telegram = url.startsWith('http') ? url : `https://${url}`;
    } else if (
      !lowerUrl.includes('github') &&
      !lowerUrl.includes('linkedin') &&
      !lowerUrl.includes('t.me') &&
      !contacts.website
    ) {
      contacts.website = url.startsWith('http') ? url : `https://${url}`;
    }
  }

  // Отдельно ищем telegram юзернеймы (например @username)
  if (!contacts.telegram) {
    const tgRegex = /(?:^|\s)@([a-zA-Z0-9_]{5,32})(?:\s|$)/g;
    const tgMatch = text.match(tgRegex);
    if (tgMatch) {
      contacts.telegram = tgMatch[0].trim();
    }
  }

  return contacts;
}
