import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, FilterState, CategoryType, MaterialType } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Filter, RotateCcw, Search, LayoutGrid, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  filterState: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: Product) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onWhatsAppQuote: (product: Product) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  filterState,
  onFilterChange,
  onResetFilters,
  onSelectProduct,
  savedIds,
  onToggleSave,
  onWhatsAppQuote,
}) => {
  // Mobile layout view mode: 'carousel' (horizontal swipe per section) or 'grid' (2-column compact)
  const [mobileViewMode, setMobileViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Filter and sort products logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category match
      if (filterState.category !== 'todos' && prod.category !== filterState.category) {
        return false;
      }

      // Material match
      if (filterState.material !== 'todos' && !prod.material.includes(filterState.material)) {
        return false;
      }

      // Search match
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchTitle = prod.title.toLowerCase().includes(query);
        const matchSub = prod.subtitle.toLowerCase().includes(query);
        const matchDesc = prod.description.toLowerCase().includes(query);
        const matchTags = prod.tags.some(t => t.toLowerCase().includes(query));
        const matchMat = prod.material.toLowerCase().includes(query);
        if (!matchTitle && !matchSub && !matchDesc && !matchTags && !matchMat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filterState.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, filterState]);

  // Group products by category when in 'todos' category
  const productsByCategory = useMemo(() => {
    const categoriesMap: { [key: string]: Product[] } = {};
    
    // Fill categories defined in CATEGORIES (excluding 'todos')
    CATEGORIES.filter(c => c.id !== 'todos').forEach(cat => {
      categoriesMap[cat.id] = [];
    });

    filteredProducts.forEach(prod => {
      if (categoriesMap[prod.category]) {
        categoriesMap[prod.category].push(prod);
      } else {
        categoriesMap[prod.category] = [prod];
      }
    });

    return categoriesMap;
  }, [filteredProducts]);

  const activeFiltersCount = 
    (filterState.category !== 'todos' ? 1 : 0) + 
    (filterState.material !== 'todos' ? 1 : 0) + 
    (filterState.searchQuery ? 1 : 0);

  return (
    <section id="catalogo" className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Catálogo
            </h2>
          </div>

          {/* Sort & Mobile View Controls */}
          <div className="flex items-center gap-3">
            
            {/* Mobile View Toggle Switcher */}
            <div className="flex md:hidden items-center bg-slate-200/80 p-0.5 rounded-xl">
              <button
                onClick={() => setMobileViewMode('carousel')}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  mobileViewMode === 'carousel'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                Carrusel
              </button>
              <button
                onClick={() => setMobileViewMode('grid')}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  mobileViewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                Grilla
              </button>
            </div>

            {/* Sort Selector */}
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-white text-slate-800 text-xs font-bold rounded-xl px-2.5 py-1.5 border border-slate-200 shadow-xs focus:outline-none focus:border-blue-500"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth -mx-3 px-3 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = filterState.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: cat.id as CategoryType })}
                className={`whitespace-nowrap px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Material Filter Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Material:
            </span>
            {['todos', 'PLA Plus', 'PETG'].map((mat) => {
              const isActive = filterState.material === mat;
              return (
                <button
                  key={mat}
                  onClick={() => onFilterChange({ material: mat as MaterialType })}
                  className={`text-xs px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg font-semibold border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mat === 'todos' ? 'Todos' : mat}
                </button>
              );
            })}
          </div>

          {/* Active Filters Reset */}
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>
            Mostrando <strong className="text-slate-900 font-extrabold">{filteredProducts.length}</strong> productos disponibles
          </span>
          <a
            href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20No%20encontr%C3%A9%20lo%20que%20buscaba%20en%20el%20cat%C3%A1logo.%20Quisiera%20consultar%20por%20un%20modelo%20o%20proyecto%20personalizado."
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-bold underline flex items-center gap-1"
          >
            <span>¿Buscás otra cosa? Consultá por WhatsApp</span>
          </a>
        </div>

        {/* Products Display */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-8">
            {/* MOBILE SLIDER MODE (when category = 'todos' and mobileViewMode = 'carousel') */}
            {filterState.category === 'todos' && mobileViewMode === 'carousel' ? (
              <div className="space-y-8 md:hidden">
                {CATEGORIES.filter(c => c.id !== 'todos').map((cat) => {
                  const catProducts = productsByCategory[cat.id] || [];
                  if (catProducts.length === 0) return null;

                  return (
                    <div key={cat.id} className="space-y-3">
                      {/* Section Header */}
                      <div className="flex items-center justify-between px-1">
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                            <span>{cat.label}</span>
                            <span className="text-xs font-semibold text-slate-400 font-mono">({catProducts.length})</span>
                          </h3>
                        </div>
                        <button
                          onClick={() => onFilterChange({ category: cat.id as CategoryType })}
                          className="text-xs text-blue-600 font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                        >
                          <span>Ver todo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Touch Horizontal Swipe Track */}
                      <div className="relative">
                        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-3 px-3 no-scrollbar scroll-smooth">
                          {catProducts.map((product) => (
                            <div 
                              key={product.id} 
                              className="w-[78vw] max-w-[280px] shrink-0 snap-start"
                            >
                              <ProductCard
                                product={product}
                                onSelectProduct={onSelectProduct}
                                isSaved={savedIds.includes(product.id)}
                                onToggleSave={onToggleSave}
                                onWhatsAppQuote={onWhatsAppQuote}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Standard Grid Layout (Always on desktop, and on mobile when Grid mode is selected or a specific filter is active) */}
            <motion.div 
              layout
              className={`${
                filterState.category === 'todos' && mobileViewMode === 'carousel' ? 'hidden md:grid' : 'grid'
              } grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    isSaved={savedIds.includes(product.id)}
                    onToggleSave={onToggleSave}
                    onWhatsAppQuote={onWhatsAppQuote}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* ¿NO ENCONTRASTE LO QUE BUSCABAS? SLEEK BOTTOM BANNER */}
            <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white border border-slate-800 shadow-lg relative overflow-hidden my-8">
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    ¿Buscás un diseño o pieza especial?
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Hacemos impresiones personalizadas y repuestos. Consultanos sin compromiso.
                  </p>
                </div>
                <a
                  href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20No%20encontr%C3%A9%20lo%20que%20buscaba%20en%20el%20cat%C3%A1logo.%20Quisiera%20consultar%20por%20un%20modelo%20o%20proyecto%20personalizado."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4 shadow-xs my-6 sm:my-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">¿No encontraste el producto?</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Si no encontraste la pieza o color que buscabas con este filtro, ¡no hay problema! Consultanos sin compromiso para imprimirlo a medida.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onResetFilters}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer Filtros</span>
              </button>
              <a
                href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20No%20encontr%C3%A9%20lo%20que%20buscaba%20en%20el%20cat%C3%A1logo.%20Quisiera%20consultar%20por%20un%20modelo%20o%20proyecto%20personalizado."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

