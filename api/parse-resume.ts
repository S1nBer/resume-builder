import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/s1nber/resume-builder',
        'X-Title': 'Resume Builder',
        // Добавь это:
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat:free',
        messages: [
          {
            role: 'system',
            content:
              'Ты — парсер резюме. Твоя задача — извлечь данные из текста и вернуть их в формате строгого JSON. Без лишних слов, без markdown-разметки.',
          },
          {
            role: 'user',
            content: `Извлеки данные из этого резюме и верни JSON строго по этой схеме:
            {
              "fullName": "Имя",
              "position": "Должность",
              "experience": [{"company": "", "position": "", "startDate": "", "endDate": "", "description": ""}],
              "education": [{"institution": "", "degree": "", "field": "", "startDate": "", "endDate": ""}],
              "skills": ["навык1", "навык2"]
            }
            
            Текст резюме: ${text}`,
          },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const data = await response.json();

    // Проверка: если OpenRouter вернул ошибку
    if (data.error) {
      console.error('Ошибка от OpenRouter:', data.error);
      return res.status(500).json({ error: data.error.message || 'OpenRouter error' });
    }

    // Проверка: если структура ответа неожиданная
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Неожиданный ответ от OpenRouter:', data);
      return res.status(500).json({ error: 'Invalid response from AI' });
    }

    const content = data.choices[0].message.content;

    // На случай, если ИИ обернул JSON в markdown ```json ... ```
    const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');

    const parsedData = JSON.parse(cleanedContent);

    return res.status(200).json(parsedData);
  } catch (error) {
    console.error('--- ВНУТРЕННЯЯ ОШИБКА БЭКЕНДА ---');
    console.error(error);
    return res.status(500).json({ error: 'Failed to parse resume' });
  }
}
