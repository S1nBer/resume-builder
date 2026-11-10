import { extractText, getDocumentProxy } from 'unpdf';

export interface AiExperience {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string | string[];
}

export interface AiEducation {
  institution?: string;
  degree?: string;
  field?: string;
  start_date?: string;
  end_date?: string;
  startDate?: string;
  endDate?: string;
}

export interface AiResumeData {
  fullName?: string;
  position?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: AiExperience[];
  education?: AiEducation[];
  skills?: string[];
}

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
    const { totalPages, text } = await extractText(pdf, { mergePages: true });

    // eslint-disable-next-line no-console
    console.log(`Успешно извлечено ${totalPages} страниц(ы)`);

    return text as string;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при извлечении текста из PDF:', error);

    // eslint-disable-next-line preserve-caught-error
    throw new Error('Не удалось прочитать PDF файл');
  }
}

export async function parseResumeWithAI(text: string): Promise<AiResumeData> {
  const response = await fetch(
    'https://d5d4h4jb75bnc1lqdq7n.764nr5vy.apigw.yandexcloud.net/parse',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to parse resume with AI');
  }

  return await response.json();
}
