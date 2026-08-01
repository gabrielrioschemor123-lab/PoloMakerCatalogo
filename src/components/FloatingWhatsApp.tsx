import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(true);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const message = customMsg.trim() || 'Hola Polo Maker 3D! Quisiera consultar por un producto del catálogo.';
    window.open(`https://wa.me/5492954735419?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      
      {/* WhatsApp Message Popup Widget */}
      {popupOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-w-xs w-72 animate-bounce-short">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Polo Maker 3D</span>
                <span className="text-[10px] text-emerald-600 font-bold block">2954-735419</span>
              </div>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            ¡Hola! 👋 ¿Te interesa alguna pieza de nuestro catálogo o cotizar un diseño personal? Escríbenos directamente:
          </p>

          <form onSubmit={handleSend} className="space-y-2">
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:bg-white focus:border-emerald-500"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Abrir WhatsApp</span>
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setPopupOpen(!popupOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-all transform hover:scale-110 active:scale-95 cursor-pointer relative group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
        <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
          1
        </span>
      </button>

    </div>
  );
};

