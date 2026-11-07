# SAICONVO - Premium PDF to Image & Image to PDF Platform

> **Convert. Preview. Download.**

SAICONVO is a modern, responsive, 100% client-side document conversion web application. It allows users to convert multi-page PDF documents into JPG, PNG, and WebP images, or assemble multiple images into structured, professional PDF documents without server uploads, subscriptions, or cloud storage.

---

## 🚀 Key Features

### 1. PDF to Image Converter
- **Multi-Format Output**: Export PDF pages to JPG, PNG, or WebP.
- **DPI Control**: Select 72 DPI (Web/Quick), 150 DPI (Balanced), 200 DPI (High Quality), or 300 DPI (Print Ultra HD).
- **Compression Settings**: Low, Medium, High quality settings for lossy formats.
- **Page Selection**: Thumbnail gallery with individual page toggle, Select All, and Deselect All.
- **Zoom Inspection**: Enlarge any original page thumbnail before conversion.
- **ZIP Packaging**: Download individual images or export all converted pages as a clean, structured ZIP archive.

### 2. Image to PDF Converter
- **Multi-Image Support**: Upload up to 50 JPG, PNG, or WebP images (up to 20 MB each).
- **Drag-and-Drop Reordering**: Smooth grid reordering with `@dnd-kit/sortable` plus mobile touch up/down buttons.
- **Per-Image Rotation**: 90° clockwise rotation on any image.
- **Standardized Page Sizes**: A4, A3, US Letter, and US Legal.
- **Page Orientations**: Portrait, Landscape, or Automatic based on image aspect ratio.
- **Page Margins**: None (0pt), Small (18pt), Standard (36pt), or Large (54pt).
- **Image Fitting**: Fit to Page (contain), Fill Page (cover), or Original 1:1 dimensions.
- **Background Color**: Configurable background fill for transparent PNGs (White, Dark Navy, Black, etc.).

### 3. Output Preview & Download Workspace
- **Deterministic Philosophy**: `UPLOAD → CONFIGURE → CONVERT → PREVIEW → DOWNLOAD`.
- **Zero Fake Previews**: Output preview and download use the **exact same generated Blob data**.
- **Real PDF Rendering**: Generated PDFs are rendered directly using PDF.js with zoom, fit-to-width, rotation, page navigation, and fullscreen toggle.
- **No Automatic Downloads**: Users inspect their files before saving.

### 4. 100% Client-Side Privacy
- No accounts, logins, or cookies.
- Documents are never sent to any remote server or database.
- Executed in-browser using WebAssembly, Canvas API, and Web Workers.
- Memory is released immediately when navigating or converting another file.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, PostCSS, Autoprefixer |
| **Icons** | Lucide React |
| **Animations** | Framer Motion, Canvas Confetti |
| **3D Design** | Three.js, React Three Fiber, React Three Drei (with mobile fallback) |
| **PDF Rendering** | `pdfjs-dist` (PDF.js) with local web worker |
| **PDF Synthesis** | `pdf-lib` |
| **Archiving** | `jszip` |
| **Drag & Drop** | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |

---

## 📂 Project Structure

```text
├── public/
│   ├── favicon.svg             # Application brand icon
│   └── pdf.worker.min.js       # Bundled PDF.js Web Worker
├── src/
│   ├── components/
│   │   ├── conversion/         # Config panels and progress modal
│   │   │   ├── ImageToPdfConfig.tsx
│   │   │   ├── PdfToImageConfig.tsx
│   │   │   └── ProgressModal.tsx
│   │   ├── hero/               # 3D R3F Hero and 2D mobile fallback
│   │   │   ├── FallbackHero.tsx
│   │   │   └── Hero3D.tsx
│   │   ├── layout/             # Navbar, Footer, and Layout shell
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── Navbar.tsx
│   │   ├── preview/            # PDF viewer, page cards, and zoom modal
│   │   │   ├── ImageItemCard.tsx
│   │   │   ├── PdfPageCard.tsx
│   │   │   ├── PdfViewer.tsx
│   │   │   └── ZoomModal.tsx
│   │   ├── results/            # Results workspace for preview & download
│   │   │   └── ResultsWorkspace.tsx
│   │   ├── ui/                 # Reusable buttons, cards, badges
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   └── upload/             # Drag & drop upload zone
│   │       └── Dropzone.tsx
│   ├── context/
│   │   ├── ConversionContext.tsx  # Holds converted Blob sessions
│   │   └── ThemeContext.tsx       # Dark & light theme switcher
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   ├── Home.tsx
│   │   ├── ImageToPdf.tsx
│   │   ├── PdfToImage.tsx
│   │   ├── Privacy.tsx
│   │   └── Results.tsx
│   ├── services/
│   │   ├── downloadService.ts  # Blob downloading utilities
│   │   ├── fileValidation.ts   # Magic byte and format checks
│   │   ├── imageConverter.ts   # pdf-lib based PDF generation
│   │   ├── pdfConverter.ts     # Canvas based PDF page extraction
│   │   ├── pdfRenderer.ts      # PDF.js document loader and renderer
│   │   └── zipService.ts       # JSZip archive generator
│   ├── styles/
│   │   └── globals.css         # Glassmorphism, animations, Tailwind
│   ├── types/
│   │   ├── conversion.ts       # Conversion settings & result types
│   │   └── file.ts             # File & page metadata interfaces
│   ├── utils/
│   │   ├── blob.ts             # Managed Object URLs & triggerDownload
│   │   ├── cn.ts               # Tailwind class merge utility
│   │   ├── fileSize.ts         # Human-readable byte formatting
│   │   └── filename.ts         # Filename sanitization & extensions
│   ├── App.tsx                 # Route declarations
│   └── main.tsx                # Entry point
├── scripts/
│   └── test-converters.js      # Integration test runner
├── vercel.json                 # Vercel SPA routing rewrites & security headers
├── package.json
└── vite.config.ts
```

---

## 💻 Local Development Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Setup Steps

1. **Clone or navigate to the repository:**
   ```bash
   cd "c:/Projects/Tools/Image PDF Converter"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. **Run the integration test suite:**
   ```bash
   node scripts/test-converters.js
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 GitHub & Vercel Deployment Instructions

### Deploy to GitHub
1. Initialize a git repository (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "feat: complete SAICONVO document conversion platform"
   ```
2. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/saiconvo.git
   git branch -M main
   git push -u origin main
   ```

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New Project** and import your `saiconvo` GitHub repository.
3. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included `vercel.json` automatically configures SPA routing rewrites so all direct page URLs (`/pdf-to-image`, `/image-to-pdf`, `/results`) resolve seamlessly without 404 errors.
5. Click **Deploy**. Your site will be live on your Vercel URL in under 60 seconds!

