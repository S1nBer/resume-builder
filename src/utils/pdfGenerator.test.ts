import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportToPdf } from './pdfGenerator';
import html2canvas from 'html2canvas-pro';

vi.mock('html2canvas-pro');
vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(function (this: Record<string, unknown>) {
    this.internal = {
      pageSize: {
        getWidth: () => 210,
        getHeight: () => 297,
      },
    };
    this.addImage = vi.fn();
    this.addPage = vi.fn();
    this.save = vi.fn();
  }),
}));

describe('pdfGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not generate PDF if element not found', async () => {
    await exportToPdf('non-existent-id');

    expect(html2canvas).not.toHaveBeenCalled();
  });

  it('should generate PDF for existing element', async () => {
    const element = document.createElement('div');
    element.id = 'test-element';
    document.body.appendChild(element);

    const mockCanvas = {
      width: 800,
      height: 1000,
      toDataURL: () => 'data:image/png;base64,test',
    } as HTMLCanvasElement;

    vi.mocked(html2canvas).mockResolvedValue(mockCanvas);

    await exportToPdf('test-element', 'test.pdf');

    expect(html2canvas).toHaveBeenCalled();

    document.body.removeChild(element);
  });
});
