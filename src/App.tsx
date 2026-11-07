import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ConversionProvider } from './context/ConversionContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { PdfToImage } from './pages/PdfToImage';
import { ImageToPdf } from './pages/ImageToPdf';
import { Results } from './pages/Results';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { FAQ } from './pages/FAQ';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ConversionProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pdf-to-image" element={<PdfToImage />} />
              <Route path="/image-to-pdf" element={<ImageToPdf />} />
              <Route path="/results" element={<Results />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ConversionProvider>
    </ThemeProvider>
  );
};

export default App;

