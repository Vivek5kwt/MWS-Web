export async function exportScoreResultToPdf({ score, domainScores, recommendations }) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  let y = 10
  doc.setFontSize(18)
  doc.text('Wealth Score Report', 10, y)
  y += 10
  doc.setFontSize(14)
  doc.text(`Overall Score: ${score}`, 10, y)
  y += 10

  doc.setFontSize(16)
  doc.text('Domain Scores:', 10, y)
  y += 8
  doc.setFontSize(12)

  domainScores.forEach(domain => {
    doc.text(`${domain.name}: ${domain.value} (${domain.percent || ''})`, 12, y)
    y += 6
    if (domain.summary) {
      doc.text(`Summary: ${domain.summary}`, 14, y)
      y += 6
    }
    if (domain.description) {
      const lines = doc.splitTextToSize(`Description: ${domain.description}`, 180)
      doc.text(lines, 14, y)
      y += 10
    }
  })

  y += 4
  doc.setFontSize(16)
  doc.text('Recommendations:', 10, y)
  y += 8
  doc.setFontSize(12)

  recommendations.forEach(rec => {
    doc.text(`- ${rec.title} (Priority: ${rec.priority})`, 12, y)
    y += 6
    const lines = doc.splitTextToSize(rec.description, 180)
    doc.text(lines, 14, y)
    y += 10
  })

  doc.save('wealth-score-report.pdf')
}
