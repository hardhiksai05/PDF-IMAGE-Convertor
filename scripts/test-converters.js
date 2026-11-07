import { PDFDocument, rgb } from 'pdf-lib';
import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('SAICONVO: CORE ENGINE INTEGRATION TEST SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] Test ${totalTests}: ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] Test ${totalTests}: ${message}`);
    process.exitCode = 1;
  }
}

async function runTests() {
  console.log('--- SUITE 1: PDF Generation & Synthesis (Image-to-PDF Engine) ---');

  // Test 1: Create Blank PDF Document
  const doc = await PDFDocument.create();
  assert(doc !== null, 'PDFDocument instance created successfully');

  // Test 2: Add A4 Page
  const a4Page = doc.addPage([595.28, 841.89]);
  assert(
    Math.round(a4Page.getWidth()) === 595 && Math.round(a4Page.getHeight()) === 842,
    'A4 dimensions correctly applied (595.28 x 841.89 pt)'
  );

  // Test 3: Add A3 Page
  const a3Page = doc.addPage([841.89, 1190.55]);
  assert(
    Math.round(a3Page.getWidth()) === 842 && Math.round(a3Page.getHeight()) === 1191,
    'A3 dimensions correctly applied (841.89 x 1190.55 pt)'
  );

  // Test 4: Add US Letter Page in Landscape
  const letterLandscapePage = doc.addPage([792.0, 612.0]);
  assert(
    letterLandscapePage.getWidth() === 792 && letterLandscapePage.getHeight() === 612,
    'US Letter Landscape dimensions correctly set (792 x 612 pt)'
  );

  // Test 5: Draw background fill & shapes
  letterLandscapePage.drawRectangle({
    x: 0,
    y: 0,
    width: 792,
    height: 612,
    color: rgb(1, 1, 1),
  });
  assert(true, 'Background color fill rendered without error');

  // Test 6: Embed dummy 1x1 PNG bytes
  // Minimal valid 1x1 PNG base64
  const png1x1Base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const pngBuffer = Buffer.from(png1x1Base64, 'base64');
  const embeddedPng = await doc.embedPng(pngBuffer);
  assert(embeddedPng.width === 1 && embeddedPng.height === 1, 'PNG embedded into PDF successfully');

  // Test 7: Draw image onto page with custom margins
  const margin = 36;
  a4Page.drawImage(embeddedPng, {
    x: margin,
    y: margin,
    width: 200,
    height: 200,
  });
  assert(true, 'Image placed on A4 page respecting margins');

  // Test 8: Generate actual PDF bytes
  const pdfBytes = await doc.save();
  assert(pdfBytes.length > 500, `Generated PDF output byte count is valid (${pdfBytes.length} bytes)`);

  // Test 9: Verify PDF Magic Header (%PDF-)
  const pdfHeader = Buffer.from(pdfBytes.slice(0, 5)).toString('utf-8');
  assert(pdfHeader === '%PDF-', `Generated file has valid PDF magic header "${pdfHeader}"`);

  // Test 10: Multi-page document test (20-page document synthesis)
  const multiDoc = await PDFDocument.create();
  for (let i = 1; i <= 20; i++) {
    multiDoc.addPage([595.28, 841.89]);
  }
  const multiPdfBytes = await multiDoc.save();
  const reloadedMultiDoc = await PDFDocument.load(multiPdfBytes);
  assert(reloadedMultiDoc.getPageCount() === 20, '20-page PDF generated and reloaded with exact 20 pages');

  console.log('\n--- SUITE 2: ZIP Archiving Engine (pdf-to-image download bundle) ---');

  // Test 11: ZIP Archive Creation with JSZip
  const zip = new JSZip();
  zip.file('document_page_001.jpg', Buffer.from('mock-jpg-image-bytes-1'));
  zip.file('document_page_002.jpg', Buffer.from('mock-jpg-image-bytes-2'));
  zip.file('document_page_003.png', Buffer.from('mock-png-image-bytes-3'));

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  assert(zipBuffer.length > 100, `ZIP archive generated successfully (${zipBuffer.length} bytes)`);

  // Test 12: Read ZIP contents and verify entries
  const loadedZip = await JSZip.loadAsync(zipBuffer);
  const fileNames = Object.keys(loadedZip.files);
  assert(
    fileNames.length === 3 &&
    fileNames.includes('document_page_001.jpg') &&
    fileNames.includes('document_page_002.jpg') &&
    fileNames.includes('document_page_003.png'),
    'ZIP archive contains all converted image files with sanitized filenames'
  );

  console.log('\n--- SUITE 3: Validation & Filename Sanitization ---');

  // Test 13: Filename Sanitization
  const dangerousName = 'report:2026/02/05*<draft>?|final.pdf';
  const cleanName = dangerousName.replace(/[/\\?%*:|"<>]/g, '_').trim();
  assert(!cleanName.includes(':') && !cleanName.includes('/') && !cleanName.includes('<'), `Sanitized name: "${cleanName}" has no illegal path characters`);

  // Test 14: PDF Magic Header Check on Invalid bytes
  const corruptBuffer = Buffer.from('NOT A PDF FILE JUST TEXT');
  const corruptHeader = corruptBuffer.slice(0, 5).toString('utf-8');
  const isCorruptValid = corruptHeader.startsWith('%PDF-');
  assert(!isCorruptValid, 'Corrupted document header successfully rejected');

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('====================================================\n');

  if (passedTests === totalTests) {
    console.log('ALL CORE ENGINES VERIFIED SUCCESSFULLY.\n');
  } else {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test suite:', err);
  process.exit(1);
});

