import React, { useState } from 'react';
import { PoloMakerLogo } from './PoloMakerLogo';
import { 
  Bookmark, 
  Menu, 
  X, 
  MessageSquare, 
  Box, 
  Layers, 
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  savedCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'catalogo', label: 'Catálogo', icon: Box },
    { id: 'materiales', label: 'Materiales', icon: Layers },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Scroll smoothly to target section if present
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Banner Message */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Polo Maker 3D • Santa Rosa, La Pampa</span>
        <span className="hidden sm:inline-block text-slate-400">|</span>
        <a 
          href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20Quisiera%20consultar%20por%20un%20producto."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center hover:text-emerald-300 transition-colors font-semibold gap-1 ml-1"
        >
          <MessageSquare className="w-3 h-3 text-emerald-400" />
          WhatsApp: 2954-735419
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center cursor-pointer group select-none hover:opacity-90 transition-opacity"
          >
            <PoloMakerLogo variant="horizontal" size="md" theme="light" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bookmarks Counter */}
            <button
              onClick={() => handleNavClick('catalogo')}
              className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Piezas Guardadas"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {savedCount}
                </span>
              )}
            </button>

            {/* WhatsApp Contact Button */}
            <a
              href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20Quisiera%20consultar%20por%20piezas%20del%20cat%C3%A1logo."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: 2954-735419</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20Quisiera%20consultar%20por%20piezas%20del%20cat%C3%A1logo."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-xs text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Consultar en WhatsApp (2954-735419)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

