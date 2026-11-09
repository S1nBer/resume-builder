import { describe, it, expect } from 'vitest';
import { parseContacts } from './contactParser';

describe('contactParser', () => {
  it('should extract email', () => {
    const text = 'Связаться со мной: ivan.ivanov@example.com или по телефону.';
    const contacts = parseContacts(text);
    expect(contacts.email).toBe('ivan.ivanov@example.com');
  });

  it('should extract phone in various formats', () => {
    const text1 = 'Тел: +7 (999) 123-45-67';
    expect(parseContacts(text1).phone).toBe('+7 (999) 123-45-67');

    const text2 = 'Моб: 89991234567';
    expect(parseContacts(text2).phone).toBe('89991234567');
  });

  it('should extract github url', () => {
    const text = 'Мой код: https://github.com/s1nber';
    const contacts = parseContacts(text);
    expect(contacts.github).toBe('https://github.com/s1nber');
  });

  it('should extract github url without protocol', () => {
    const text = 'Ссылка на профиль: github.com/s1nber';
    const contacts = parseContacts(text);
    expect(contacts.github).toBe('https://github.com/s1nber');
  });

  it('should extract telegram by url', () => {
    const text = 'Пишите в тг: https://t.me/s1nber';
    const contacts = parseContacts(text);
    expect(contacts.telegram).toBe('https://t.me/s1nber');
  });

  it('should extract telegram by username', () => {
    const text = 'Мой телеграм: @s1nber_dev';
    const contacts = parseContacts(text);
    expect(contacts.telegram).toBe('@s1nber_dev');
  });

  it('should extract linkedin', () => {
    const text = 'Профиль: linkedin.com/in/andrey';
    const contacts = parseContacts(text);
    expect(contacts.linkedin).toBe('https://linkedin.com/in/andrey');
  });

  it('should extract website and ignore other platforms', () => {
    const text = 'Сайт: https://myportfolio.com';
    const contacts = parseContacts(text);
    expect(contacts.website).toBe('https://myportfolio.com');
  });

  it('should return empty object if no contacts found', () => {
    const text = 'Просто текст без контактов.';
    const contacts = parseContacts(text);
    expect(Object.keys(contacts).length).toBe(0);
  });
});
