import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { 
  Bookmark, 
  MessageSquare, 
  Eye, 
  Palette
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
  onWhatsAppQuote: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  isSaved,
  onToggleSave,
  onWhatsAppQuote,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      layout
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      
      {/* Featured Ribbon */}
      {product.featured && (
        <span className="absolute top-3 left-3 z-20 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs tracking-wider uppercase">
          Popular
        </span>
      )}

      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave(product.id);
        }}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
          isSaved 
            ? 'bg-blue-600 text-white shadow-xs' 
            : 'bg-white/80 hover:bg-white text-slate-500 hover:text-blue-600'
        }`}
        title={isSaved ? "Quitar de guardados" : "Guardar pieza"}
      >
        <Bookmark className="w-4 h-4 fill-current" />
      </button>

      {/* Product Image Container */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-4/3 overflow-hidden bg-slate-50 cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Material Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
            product.material === 'PETG' 
              ? 'bg-blue-100 text-blue-800 border-blue-200'
              : 'bg-emerald-100 text-emerald-800 border-emerald-200'
          }`}>
            {product.material}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title */}
        <div>
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Available Colors List */}
        {product.colorsAvailable && product.colorsAvailable.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
            <Palette className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-[11px] font-medium truncate">
              Colores: {product.colorsAvailable.join(', ')}
            </span>
          </div>
        )}

        {/* Price Indicator & Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Precio</p>
            <p className="font-extrabold text-slate-900 text-sm sm:text-base text-emerald-700">
              {product.priceDisplay}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectProduct(product)}
              className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver</span>
            </button>

            <button
              onClick={() => onWhatsAppQuote(product)}
              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Consultar</span>
            </button>
          </div>
        </div>

      </div>

    </motion.div>
  );
};

