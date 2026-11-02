import { extractText, getDocumentProxy } from 'unpdf';

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

export async function parseResumeWithAI(text: string) {
  const response = await fetch('/api/parse-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to parse resume with AI');
  }

  return await response.json();
}
