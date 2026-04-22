import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  async exportScoreResultToPdf(data: {
    score: number;
    domainScores: { name: string; value: number; percent?: string; summary?: string; description?: string }[];
    recommendations: { title: string; priority: string; description: string }[];
  }) {
    const jsPDFModule = await import('jspdf');
    const doc = new jsPDFModule.jsPDF();

    let y = 10;
    doc.setFontSize(18);
    doc.text('Wealth Score Report', 10, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`Overall Score: ${data.score}`, 10, y);
    y += 10;

    doc.setFontSize(16);
    doc.text('Domain Scores:', 10, y);
    y += 8;
    doc.setFontSize(12);
    data.domainScores.forEach(domain => {
      doc.text(`${domain.name}: ${domain.value} (${domain.percent || ''})`, 12, y);
      y += 6;
      if (domain.summary) {
        doc.text(`Summary: ${domain.summary}`, 14, y);
        y += 6;
      }
      if (domain.description) {
        doc.text(doc.splitTextToSize(`Description: ${domain.description}`, 180), 14, y);
        y += 10;
      }
    });

    y += 4;
    doc.setFontSize(16);
    doc.text('Recommendations:', 10, y);
    y += 8;
    doc.setFontSize(12);
    data.recommendations.forEach(rec => {
      doc.text(`- ${rec.title} (Priority: ${rec.priority})`, 12, y);
      y += 6;
      doc.text(doc.splitTextToSize(rec.description, 180), 14, y);
      y += 10;
    });

    doc.save('wealth-score-report.pdf');
  }
}
