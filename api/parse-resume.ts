import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto'; // Нужно для RqUID

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  const authKey = process.env.GIGACHAT_AUTH_KEY;

  if (!authKey) {
    return res.status(500).json({ error: 'GigaChat Auth Key is not configured' });
  }

  try {
    // 1. Получаем Access Token
    const tokenResponse = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        RqUID: randomUUID(), // Уникальный ID запроса
        Authorization: `Basic ${authKey}`,
      },
      body: new URLSearchParams({
        scope: 'GIGACHAT_API_PERS', // Для физлиц
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Ошибка получения токена GigaChat: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Отправляем запрос к модели
    const response = await fetch('https://api.giga.chat/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'GigaChat-2',
        messages: [
          {
            role: 'system',
            content:
              'Ты — парсер резюме. Твоя задача — извлечь данные из текста и вернуть их ТОЛЬКО в формате строгого JSON. Не добавляй никаких пояснений, приветствий или markdown-разметки (например, ```json). Ответ должен начинаться с { и заканчиваться }.',
          },
          {
            role: 'user',
            content: `Извлеки данные из этого резюме и верни JSON строго по этой схеме: ... Текст резюме: ${text}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Ошибка от GigaChat:', data.error);
      return res.status(500).json({ error: data.error.message || 'GigaChat error' });
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Неожиданный ответ:', data);
      return res.status(500).json({ error: 'Invalid response from AI' });
    }

    const content = data.choices[0].message.content;
    const cleanedContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    const parsedData = JSON.parse(cleanedContent);

    return res.status(200).json(parsedData);
  } catch (error) {
    console.error('--- ОШИБКА GIGACHAT ---');
    console.error(error);
    return res.status(500).json({ error: 'Failed to parse resume' });
  }
}
