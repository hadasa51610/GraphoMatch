import { AnalysisData } from "@/dashboard/analysis/AnalysisPage";
import { jsPDF } from "jspdf";

export const generatePDF = async (
  analysis: AnalysisData,
) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 10;

  doc.setFontSize(18);
  doc.text("Handwriting Analysis", 10, yPos);
  yPos += 10;

  doc.setFontSize(14);
  doc.text("Personality Traits:", 10, yPos);
  yPos += 10;

  doc.setFontSize(12);
  analysis.personalityTraits.forEach((trait, index) => {
    const linesTrait = doc.splitTextToSize(`${index + 1}. Trait: ${trait.trait}`, 180);
    const linesLevel = doc.splitTextToSize(`Match Level: ${trait.matchLevel}`, 180);
    const linesDesc = doc.splitTextToSize(`Description: ${trait.description}`, 180);
    const totalHeight = (linesTrait.length + linesLevel.length + linesDesc.length) * 6;

    if (yPos + totalHeight > pageHeight - 20) {
      doc.addPage();
      yPos = 10;
    }

    doc.text(linesTrait, 10, yPos); yPos += linesTrait.length * 6;
    doc.text(linesLevel, 10, yPos); yPos += linesLevel.length * 6;
    doc.text(linesDesc, 10, yPos); yPos += linesDesc.length * 6 + 4;
  });

  doc.setFontSize(14);
  if (yPos + 10 > pageHeight - 20) {
    doc.addPage();
    yPos = 10;
  }
  doc.text("Recommendations:", 10, yPos);
  yPos += 10;

  doc.setFontSize(12);
  analysis.recommendations.forEach((rec, index) => {
    const linesProf = doc.splitTextToSize(`${index + 1}. Profession: ${rec.profession}`, 180);
    const linesLevel = doc.splitTextToSize(`Match Level: ${rec.matchLevel}`, 180);
    const linesReason = doc.splitTextToSize(`Reason: ${rec.reason}`, 180);
    const totalHeight = (linesProf.length + linesLevel.length + linesReason.length) * 6;

    if (yPos + totalHeight > pageHeight - 20) {
      doc.addPage();
      yPos = 10;
    }

    doc.text(linesProf, 10, yPos); yPos += linesProf.length * 6;
    doc.text(linesLevel, 10, yPos); yPos += linesLevel.length * 6;
    doc.text(linesReason, 10, yPos); yPos += linesReason.length * 6 + 4;
  });

  doc.save("handwriting-analysis.pdf");
};
