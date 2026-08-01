import React, { useState, useEffect } from 'react';
import { Product, FilterState } from './types';
import { MOCK_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { FaqSection } from './components/FaqSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('polomaker_saved_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeNavTab, setActiveNavTab] = useState('catalogo');
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'todos',
    material: 'todos',
    searchQuery: '',
    sortBy: 'featured',
  });

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('polomaker_saved_projects', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const handleFilterChange = (newFilter: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilters = () => {
    setFilterState({
      category: 'todos',
      material: 'todos',
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // WhatsApp quick quote for single product card
  const handleWhatsAppQuote = (product: Product) => {
    const message = `Hola Polo Maker 3D (Santa Rosa, La Pampa)! Vi en el catálogo la pieza *${product.title}* (${product.material}).%0A` +
      `Me interesa consultar disponibilidad, colores y tiempos de entrega.%0A` +
      `Precio: ${product.priceDisplay}.`;

    window.open(`https://wa.me/5492954735419?text=${message}`, '_blank');
  };

  // WhatsApp quote with user custom specs from modal
  const handleWhatsAppQuoteWithCustoms = ({
    product,
    material,
    quantity,
    color,
    notes,
  }: {
    product: Product;
    material: string;
    quantity: number;
    color: string;
    notes: string;
  }) => {
    let message = `Hola Polo Maker 3D (Santa Rosa, La Pampa)! Quisiera consultar por la pieza *${product.title}*:%0A` +
      `• *Material:* ${material}%0A` +
      `• *Cantidad:* ${quantity} unidad(es)%0A` +
      `• *Color elegido:* ${color}%0A`;

    if (notes.trim()) {
      message += `• *Notas:* ${encodeURIComponent(notes)}%0A`;
    }

    message += `%0A¿Me confirman disponibilidad y tiempo estimado?`;

    window.open(`https://wa.me/5492954735419?text=${message}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      
      {/* Header / Navbar */}
      <Header
        searchQuery={filterState.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        savedCount={savedIds.length}
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        onOpenQuoteModal={() => scrollToSection('catalogo')}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero
          onExploreClick={() => scrollToSection('catalogo')}
          onQuoteClick={() => scrollToSection('catalogo')}
        />

        {/* Catalog Showcase Grid Section */}
        <Catalog
          products={products}
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onSelectProduct={(product) => setSelectedProduct(product)}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onWhatsAppQuote={handleWhatsAppQuote}
        />

        {/* FAQ & Materials Comparison Guide */}
        <div id="materiales">
          <FaqSection />
        </div>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onWhatsAppQuoteWithCustoms={handleWhatsAppQuoteWithCustoms}
      />

      {/* Persistent Floating WhatsApp Direct Contact */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />

    </div>
  );
}

