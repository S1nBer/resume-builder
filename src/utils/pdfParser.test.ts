import { describe, it, expect, vi, beforeEach } from 'vitest';
import { extractTextFromPdf, parseResumeWithAI } from './pdfParser';
import { extractText, getDocumentProxy } from 'unpdf';

// Мокаем библиотеку unpdf
vi.mock('unpdf', () => ({
  extractText: vi.fn(),
  getDocumentProxy: vi.fn(),
}));

// Мокаем глобальный fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('pdfParser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('extractTextFromPdf', () => {
    it('should extract text from PDF file', async () => {
      const mockFile = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });

      vi.mocked(getDocumentProxy).mockResolvedValue(
        {} as unknown as Awaited<ReturnType<typeof getDocumentProxy>>,
      );
      vi.mocked(extractText).mockResolvedValue({
        totalPages: 1,
        text: 'Extracted text',
      } as unknown as Awaited<ReturnType<typeof extractText>>);

      const text = await extractTextFromPdf(mockFile);

      expect(getDocumentProxy).toHaveBeenCalled();
      expect(extractText).toHaveBeenCalled();
      expect(text).toBe('Extracted text');
    });

    it('should throw error if parsing fails', async () => {
      const mockFile = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });

      vi.mocked(getDocumentProxy).mockRejectedValue(new Error('Parse error'));

      await expect(extractTextFromPdf(mockFile)).rejects.toThrow('Не удалось прочитать PDF файл');
    });
  });

  describe('parseResumeWithAI', () => {
    it('should call API and return parsed JSON', async () => {
      const mockData = { fullName: 'Иван', position: 'Developer' };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await parseResumeWithAI('Текст резюме');

      expect(mockFetch).toHaveBeenCalledWith('/api/parse-resume', expect.any(Object));
      expect(result).toEqual(mockData);
    });

    it('should throw error if API returns error', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'AI Error' }),
      });

      await expect(parseResumeWithAI('Текст')).rejects.toThrow('AI Error');
    });
  });
});
