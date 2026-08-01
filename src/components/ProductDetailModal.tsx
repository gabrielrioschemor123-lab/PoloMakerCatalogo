import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  MessageSquare, 
  Check, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Palette,
  ShieldCheck,
  Truck
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onWhatsAppQuoteWithCustoms: (customData: {
    product: Product;
    material: string;
    quantity: number;
    color: string;
    notes: string;
  }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onWhatsAppQuoteWithCustoms,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.material);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorsAvailable?.[0] || 'Negro'
  );
  const [customNotes, setCustomNotes] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const materialsOptions = ['PLA Plus', 'PETG'];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppSubmit = () => {
    onWhatsAppQuoteWithCustoms({
      product,
      material: selectedMaterial,
      quantity,
      color: selectedColor,
      notes: customNotes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 capitalize">
              {product.category}
            </span>
            <span>•</span>
            <span className="font-medium text-slate-700">Impresión 3D</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Compartir enlace"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copiado!' : 'Compartir'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Product Image Carousel */}
          <div className="md:col-span-6 space-y-3">
            
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
              <img
                src={product.images[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-400/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Material info badge */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-900 block mb-0.5">Material de Fabricación</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {selectedMaterial === 'PLA Plus' 
                  ? 'PLA Plus de origen vegetal, con superficie lisa y gran intensidad de color.' 
                  : 'PETG de alta tenacidad, lavable y resistente al agua, impactos y calor.'}
              </p>
            </div>

          </div>

          {/* Right Column: Customizer & WhatsApp */}
          <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {product.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Box */}
              <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-800 font-medium">Precio</span>
                  <p className="text-lg font-extrabold text-emerald-900">{product.priceDisplay}</p>
                </div>
                <span className="text-xs font-semibold bg-emerald-600 text-white px-2.5 py-1 rounded-lg">
                  Disponible
                </span>
              </div>

              {/* Selector Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3.5">
                
                {/* Material */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Material:
                  </label>
                  <div className="flex gap-2">
                    {materialsOptions.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                          selectedMaterial === mat
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1 mb-1.5">
                    <Palette className="w-3.5 h-3.5 text-blue-600" />
                    Elige el color para tu pieza:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colorsAvailable.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                          selectedColor === color
                            ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="pt-1 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Cantidad:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100 flex items-center justify-center text-slate-800"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-slate-900 text-sm w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100 flex items-center justify-center text-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nota o aclaración (opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Prefiero acabado mate o combinación de colores..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              {/* Guarantees */}
              <div className="flex items-center gap-4 text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Calidad garantizada</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Envíos a todo el país</span>
                </div>
              </div>

            </div>

            {/* WhatsApp CTA */}
            <div>
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-5 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Consultar Disponibilidad por WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

