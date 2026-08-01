import React from 'react';

interface PoloMakerLogoProps {
  variant?: 'full' | 'icon-only' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
}

export const PoloMakerLogo: React.FC<PoloMakerLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'light',
}) => {
  // Dimension scales
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base font-extrabold',
    lg: 'text-xl font-extrabold',
    xl: 'text-2xl font-black',
  };

  const subTextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Symbol SVG Box */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center rounded-xl bg-slate-950 p-1.5 shadow-md border border-slate-800`}>
        <svg
          viewBox="0 0 100 90"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blue Gradient for M & Nozzle */}
            <linearGradient id="poloBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B2FF" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>

            {/* White Gradient for P */}
            <linearGradient id="poloWhiteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Letter P (Left White Monogram) */}
          <path
            d="M 12 10 L 52 10 C 66 10 74 18 74 30 C 74 42 66 50 52 50 L 32 50 L 32 72 L 12 72 Z M 32 28 L 50 28 C 55 28 57 30 57 32 C 57 34 55 36 50 36 L 32 36 Z"
            fill="url(#poloWhiteGradient)"
          />

          {/* Letter M (Right Electric Blue Monogram) */}
          <path
            d="M 50 10 L 66 42 L 80 10 L 94 10 L 80 72 L 66 72 L 52 42 L 50 10 Z"
            fill="url(#poloBlueGradient)"
          />

          {/* 3D Nozzle Tip (Center Bottom) */}
          <polygon
            points="44,52 56,52 52,62 48,62"
            fill="url(#poloBlueGradient)"
          />
          <rect
            x="49"
            y="62"
            width="2"
            height="4"
            fill="url(#poloBlueGradient)"
          />

          {/* Extruded Filament Loop (Bottom) */}
          <path
            d="M 50 66 L 50 70 C 50 74 72 74 72 78 C 72 82 28 82 28 78 C 28 74 50 74 50 70"
            stroke="url(#poloBlueGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text Branding */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-tight">
          <div className={`tracking-tight flex items-center gap-1.5 ${titleSizes[size]} ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            <span>POLO MAKER</span>
            <span className="text-blue-500 font-extrabold">3D</span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1px] w-2.5 bg-blue-500/50" />
            <span className={`font-black tracking-widest text-cyan-500 uppercase ${subTextSizes[size]}`}>
              3 D
            </span>
            <span className="h-[1px] w-2.5 bg-blue-500/50" />
          </div>
        </div>
      )}
    </div>
  );
};

