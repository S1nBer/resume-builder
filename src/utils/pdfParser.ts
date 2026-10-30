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
