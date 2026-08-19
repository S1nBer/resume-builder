import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

export async function exportToPdf(elementId: string, filename = 'resume.pdf'): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    // eslint-disable-next-line no-console
    console.error('Element not found');

    return;
  }

  try {
    // Показываем индикатор загрузки
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Генерация PDF...';
    loadingIndicator.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px 40px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 16px;
      color: #333;
    `;
    document.body.appendChild(loadingIndicator);

    // Небольшая задержка для отображения индикатора
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Конвертируем HTML в canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Создаем PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    // Если контент длиннее одной страницы, добавляем новые страницы
    const totalPages = Math.ceil((imgHeight * ratio) / pdfHeight);

    for (let i = 1; i < totalPages; i++) {
      pdf.addPage();
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        -(pdfHeight * i) + imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
    }

    // Сохраняем PDF
    pdf.save(filename);

    // Убираем индикатор загрузки
    document.body.removeChild(loadingIndicator);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating PDF:', error);

    // Убираем индикатор загрузки в случае ошибки
    const loadingIndicator = document.querySelector('div');

    if (loadingIndicator && loadingIndicator.textContent === 'Генерация PDF...') {
      document.body.removeChild(loadingIndicator);
    }
  }
}
