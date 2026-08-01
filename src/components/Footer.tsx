import React from 'react';
import { PoloMakerLogo } from './PoloMakerLogo';
import { MessageSquare, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <PoloMakerLogo variant="horizontal" size="lg" theme="dark" />

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Catálogo virtual y exhibición de piezas de impresión 3D FDM. Piezas del hogar, organizadores, juguetes articulados flexy y herramientas.
            </p>

            <div className="flex items-center gap-3 text-slate-400 text-xs pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Santa Rosa, La Pampa, Argentina
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Envíos a todo el país</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">Catálogo</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#catalogo" className="hover:text-blue-400 transition-colors">Ver Vitrina de Piezas</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">Guía de Materiales</a></li>
            </ul>
          </div>

          {/* Materials Tech */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">Polímeros FDM</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>PLA Plus Biodegradable</li>
              <li>PETG Alta Resistencia & Lavable</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">Contacto Directo</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <a 
                href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20Quisiera%20consultar%20por%20piezas%20del%20cat%C3%A1logo."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: 2954-735419</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>contacto@polomaker3d.com</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantía de Calidad Polo Maker 3D</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} POLO MAKER 3D • Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> para apasionados de la tecnología 3D.
          </p>
        </div>

      </div>
    </footer>
  );
};

