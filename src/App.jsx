import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import ProductPage from '@/pages/ProductPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categoria/:category" element={<CategoryPage />} />
              <Route path="/categoria/:category/:subcategory" element={<CategoryPage />} />
              <Route path="/producto/:id" element={<ProductPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;