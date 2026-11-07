import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generates a realistic 3-page sample PDF in browser memory for instant testing
 */
export async function generateSamplePdfFile(): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // --- Page 1: Executive Summary ---
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  // Header decoration
  page1.drawRectangle({
    x: 0,
    y: 760,
    width: 595.28,
    height: 82,
    color: rgb(0.48, 0.23, 0.93), // Violet
  });

  page1.drawText('SAICONVO SAMPLE REPORT', {
    x: 48,
    y: 795,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page1.drawText('Document Processing & Quality Benchmark (Page 1 of 3)', {
    x: 48,
    y: 775,
    size: 11,
    font: fontRegular,
    color: rgb(0.9, 0.85, 1),
  });

  page1.drawText('1. Executive Overview', {
    x: 48,
    y: 710,
    size: 16,
    font: fontBold,
    color: rgb(0.08, 0.12, 0.2),
  });

  page1.drawText(
    'This sample document demonstrates the multi-page conversion capability of SAICONVO.\nAll pages can be converted into sharp JPG, PNG, or WebP images with full resolution control.\nNotice the crisp vector fonts, structured cards, and decorative color fills.',
    {
      x: 48,
      y: 670,
      size: 11,
      font: fontRegular,
      color: rgb(0.3, 0.35, 0.45),
      lineHeight: 18,
    }
  );

  // Colored feature card
  page1.drawRectangle({
    x: 48,
    y: 480,
    width: 500,
    height: 140,
    color: rgb(0.95, 0.96, 1),
    borderColor: rgb(0.8, 0.85, 0.98),
    borderWidth: 1.5,
  });

  page1.drawText('Engine Characteristics', {
    x: 68,
    y: 590,
    size: 14,
    font: fontBold,
    color: rgb(0.3, 0.15, 0.7),
  });

  page1.drawText(
    '• 100% Client-Side In-Browser Execution\n• Selectable DPI Presets (72 to 300 DPI)\n• Lossless PNG or High-Efficiency WebP/JPG\n• Zero Remote Server Uploads',
    {
      x: 68,
      y: 560,
      size: 11,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.4),
      lineHeight: 20,
    }
  );

  // Footer
  page1.drawText('SAICONVO Generated Test PDF • Page 1', {
    x: 48,
    y: 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.6, 0.65, 0.7),
  });

  // --- Page 2: Analytics & Metrics ---
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  page2.drawRectangle({
    x: 0,
    y: 760,
    width: 595.28,
    height: 82,
    color: rgb(0.02, 0.71, 0.83), // Cyan
  });

  page2.drawText('2. PERFORMANCE ANALYTICS', {
    x: 48,
    y: 795,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page2.drawText('High-Resolution Extraction Benchmark (Page 2 of 3)', {
    x: 48,
    y: 775,
    size: 11,
    font: fontRegular,
    color: rgb(0.85, 0.98, 1),
  });

  // Draw simulated bar chart
  page2.drawText('Resolution vs Render Fidelity', {
    x: 48,
    y: 700,
    size: 14,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.25),
  });

  const bars = [
    { label: '72 DPI (Standard Web)', width: 120, color: rgb(0.2, 0.6, 0.9) },
    { label: '150 DPI (Balanced Output)', width: 240, color: rgb(0.48, 0.23, 0.93) },
    { label: '200 DPI (High Clarity)', width: 320, color: rgb(0.02, 0.71, 0.83) },
    { label: '300 DPI (Ultra Print HD)', width: 440, color: rgb(0.1, 0.8, 0.45) },
  ];

  let currentY = 640;
  bars.forEach((bar) => {
    page2.drawText(bar.label, {
      x: 48,
      y: currentY + 16,
      size: 10,
      font: fontBold,
      color: rgb(0.3, 0.35, 0.45),
    });
    page2.drawRectangle({
      x: 48,
      y: currentY,
      width: bar.width,
      height: 12,
      color: bar.color,
    });
    currentY -= 50;
  });

  page2.drawText('SAICONVO Generated Test PDF • Page 2', {
    x: 48,
    y: 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.6, 0.65, 0.7),
  });

  // --- Page 3: Compliance & Privacy Certificate ---
  const page3 = pdfDoc.addPage([595.28, 841.89]);
  page3.drawRectangle({
    x: 0,
    y: 760,
    width: 595.28,
    height: 82,
    color: rgb(0.06, 0.72, 0.51), // Emerald
  });

  page3.drawText('3. PRIVACY & COMPLIANCE', {
    x: 48,
    y: 795,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Zero Server Storage Certification (Page 3 of 3)', {
    x: 48,
    y: 775,
    size: 11,
    font: fontRegular,
    color: rgb(0.9, 1, 0.95),
  });

  page3.drawText('Local Sandbox Execution Verification', {
    x: 48,
    y: 700,
    size: 14,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.25),
  });

  page3.drawText(
    'No document bytes from this conversion were ever sent over HTTP or WebSockets.\nThe document was decoded and converted entirely in local JavaScript and WebAssembly memory.\nYou can freely test converting this page to JPG, PNG, or WebP.',
    {
      x: 48,
      y: 660,
      size: 11,
      font: fontRegular,
      color: rgb(0.3, 0.35, 0.45),
      lineHeight: 18,
    }
  );

  page3.drawText('SAICONVO Generated Test PDF • Page 3', {
    x: 48,
    y: 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.6, 0.65, 0.7),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  return new File([blob], 'SAICONVO_Sample_Report.pdf', { type: 'application/pdf' });
}

/**
 * Generates 3 sample images in browser memory for instant Image-to-PDF testing
 */
export async function generateSampleImages(): Promise<File[]> {
  const images: File[] = [];

  const specs = [
    {
      name: 'Sample_Slide_01_Architecture.png',
      type: 'image/png',
      title: 'SLIDE 1: SYSTEM ARCHITECTURE',
      subtitle: 'Browser-Centric High-Performance Workflow',
      bg1: '#7c3aed',
      bg2: '#3b82f6',
    },
    {
      name: 'Sample_Slide_02_Security.png',
      type: 'image/png',
      title: 'SLIDE 2: PRIVACY & ENCRYPTION',
      subtitle: 'Zero-Knowledge Document Sandboxing',
      bg1: '#06b6d4',
      bg2: '#0ea5e9',
    },
    {
      name: 'Sample_Slide_03_Outputs.jpg',
      type: 'image/jpeg',
      title: 'SLIDE 3: MULTI-FORMAT EXPORT',
      subtitle: 'Clean PDF Synthesis with pdf-lib',
      bg1: '#10b981',
      bg2: '#059669',
    },
  ];

  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    // Draw gradient background
    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, spec.bg1);
    grad.addColorStop(1, spec.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    // Subtle card in center
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(80, 80, 1040, 640, 24);
    ctx.fill();
    ctx.stroke();

    // Draw text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 52px Inter, sans-serif';
    ctx.fillText(spec.title, 140, 260);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '32px Inter, sans-serif';
    ctx.fillText(spec.subtitle, 140, 330);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '24px Inter, sans-serif';
    ctx.fillText(`Image ${i + 1} of ${specs.length} • Generated by SAICONVO Test Harness`, 140, 420);
    ctx.fillText(`Resolution: 1200 × 800 px • Format: ${spec.type.toUpperCase()}`, 140, 470);

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b || new Blob()), spec.type, 0.92);
    });

    images.push(new File([blob], spec.name, { type: spec.type }));
  }

  return images;
}
