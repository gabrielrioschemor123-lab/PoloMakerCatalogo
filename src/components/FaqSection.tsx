import React, { useState } from 'react';
import { FAQ_ITEMS, MATERIALS_INFO } from '../data/products';
import { ChevronDown, ChevronUp, HelpCircle, Layers, ShieldCheck, FileText } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'faq' | 'materials'>('faq');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Centro de Información
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Preguntas Frecuentes & Guía de Materiales
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Todo lo que necesitas saber sobre pedidos, envíos y las propiedades de nuestros materiales.
          </p>

          {/* Sub Tab Switcher */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-xs mt-4">
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'faq' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas Frecuentes</span>
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'materials' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Guía Comparativa de Materiales</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FAQ Accordion */}
        {activeTab === 'faq' && (
          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Materials Comparison */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MATERIALS_INFO.map((mat, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${mat.badgeColor}`}>
                      {mat.tag}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {mat.temp}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{mat.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{mat.detail}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  • Excelente resistencia y acabado de calidad
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
