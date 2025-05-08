import jsPDF from "jspdf";
import { AnalysisData } from "@/dashboard/analysis/AnalysisPage";


const translateText = async (texts: string[]): Promise<string[]> => {
  const delimiter = "|||";
  const joinedText = texts.join(delimiter);

  const response = await fetch("http://translate.argosopentech.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: joinedText,
      source: "en",
      target: "he",
      format: "text"
    }),
  });

  const result = await response.json();
  return result.translatedText.split(delimiter).map((s: string) => s.trim());
};

export const generateHebrewPDF = async (
  analysis: AnalysisData,
) => {
  const doc = new jsPDF("p", "mm", "a4");
  const margin = 10;
  let y = margin;

  // איסוף כל הטקסטים לתרגום
  const allTexts = [
    ...analysis.personalityTraits.map((p) => p.description),
    ...analysis.recommendations.map((r) => r.reason),
  ];
  const translated = await translateText(allTexts);

  const translatedTraits = analysis.personalityTraits.map((p, i) => ({
    ...p,
    description: translated[i],
  }));

  const translatedRecs = analysis.recommendations.map((r, i) => ({
    ...r,
    reason: translated[i + analysis.personalityTraits.length],
  }));

  // כותרת
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("דו\"ח ניתוח כתב יד", margin, y);
  y += 10;

  // תכונות אישיות
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("תכונות אישיות:", margin, y);
  y += 10;

  for (const [index, trait] of translatedTraits.entries()) {
    const lines = doc.splitTextToSize(
      `${index + 1}. תכונה: ${trait.trait} | רמת התאמה: ${trait.matchLevel} | ${trait.description}`,
      180
    );
    if (y + lines.length * 7 > 280) {
      doc.addPage();
      y = margin;
    }
    doc.setFontSize(12);
    doc.text(lines, margin, y);
    y += lines.length * 7;
  }

  // המלצות
  doc.setFontSize(14);
  doc.text("המלצות מקצועיות:", margin, y);
  y += 10;

  for (const [index, rec] of translatedRecs.entries()) {
    const lines = doc.splitTextToSize(
      `${index + 1}. מקצוע: ${rec.profession} | רמת התאמה: ${rec.matchLevel} | ${rec.reason}`,
      180
    );
    if (y + lines.length * 7 > 280) {
      doc.addPage();
      y = margin;
    }
    doc.setFontSize(12);
    doc.text(lines, margin, y);
    y += lines.length * 7;
  }

  // שמירת המסמך
  doc.save("דו\"ח-כתב-יד.pdf");
};
