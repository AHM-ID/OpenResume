
import { LanguageId } from '../types/resume';

/**
 * Standalone HTML Export
 * Generates a full document with embedded styles
 */
export const exportToHTML = (elementId: string, lang: LanguageId, filename: string = 'resume.html') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const content = element.innerHTML;
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const fontFamily = lang === 'fa' ? "'Vazirmatn', sans-serif" : "'Inter', sans-serif";

  const fullHTML = `
<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: ${fontFamily}; background: white; margin: 0; padding: 20px; }
    .resume-container { max-width: 210mm; margin: auto; border: 1px solid #eee; background: white; }
    @media print { body { padding: 0; } .resume-container { border: none; } }
    .break-inside-avoid { break-inside: avoid; }
    .font-vazirmatn { font-family: 'Vazirmatn', sans-serif; }
  </style>
</head>
<body>
  <div class="resume-container">
    ${content}
  </div>
</body>
</html>
  `;

  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
