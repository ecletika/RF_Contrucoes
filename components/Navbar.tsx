import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WorkerSVG: React.FC<{ isWalking: boolean; isCarrying: boolean; direction: number }> = ({ isWalking, isCarrying, direction }) => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`transition-transform duration-500 ${direction < 0 ? 'scale-x-[-1]' : 'scale-x-1'}`}
  >
    <circle cx="12" cy="4.5" r="2.2" fill="#333" />
    <path d="M9 3.5C9 2 10.5 1 12 1C13.5 1 15 2 15 3.5L12 4.5L9 3.5Z" fill="#FFA500" />
    <path d="M9 7C8 7 7.5 8 7.5 9V14H16.5V9C16.5 8 16 7 15 7H9Z" fill="#222" />
    <path d="M10 7H14V14H10V7Z" fill="#CCFF00" />
    <rect x="10" y="9" width="4" height="1" fill="white" fillOpacity="0.5" />
    <rect x="10" y="12" width="4" height="1" fill="white" fillOpacity="0.5" />

    <g className={isWalking ? 'animate-walking-cycle' : ''}>
      <path d="M10 14V22.5" stroke="#222" strokeWidth="2.5" strokeLinecap="round" className="leg-l" />
      <path d="M14 14V22.5" stroke="#222" strokeWidth="2.5" strokeLinecap="round" className="leg-r" />
    </g>

    {isCarrying ? (
      <path d="M7.5 10C7.5 10 9 13.5 12 14C15 13.5 16.5 10 16.5 10" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    ) : (
      <>
        <path d="M7.5 9L6 13.5" stroke="#222" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 9L18 13.5" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      </>
    )}

    <style>{`
      @keyframes walking-swing {
        0%, 100% { transform: rotate(-18deg); }
        50% { transform: rotate(18deg); }
      }
      .animate-walking-cycle .leg-l {
        animation: walking-swing 0.8s infinite ease-in-out;
        transform-origin: 12px 14px;
      }
      .animate-walking-cycle .leg-r {
        animation: walking-swing 0.8s infinite ease-in-out reverse;
        transform-origin: 12px 14px;
      }
    `}</style>
  </svg>
);

const BrickPile: React.FC<{ count: number; className?: string }> = ({ count, className }) => (
  <div className={`flex flex-col-reverse gap-0.5 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-4 h-2 bg-gray-900 border-b border-gray-700 rounded-sm shadow-sm transition-all duration-500 opacity-100 scale-100" />
    ))}
  </div>
);

const ConstructionSimulation: React.FC = () => {
  const [step, setStep] = useState(0); 
  const [constructionCount, setConstructionCount] = useState(0);
  const [supplyCount, setSupplyCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const next = (prev + 1) % 5;
        
        if (next === 2) { 
          setSupplyCount(s => Math.max(0, s - 1));
        }
        if (next === 4) { 
          setConstructionCount(c => Math.min(10, c + 1));
        }
        if (next === 0 && supplyCount === 0) {
          setSupplyCount(10);
          setConstructionCount(0);
        }
        return next;
      });
    }, 4500); 
    return () => clearInterval(timer);
  }, [supplyCount]);

  const isWalking = step === 1 || step === 3;
  const isCarrying = step >= 2 && step <= 4;
  const direction = step === 1 ? 1 : -1;

  const getXPos = () => {
    if (step === 1 || step === 2) return 'calc(100% - 80px)'; 
    return '110px'; 
  };

  return (
    <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none z-10">
      {/* Pilha de Obra (Ao LADO do Logo) */}
      <div className="absolute left-[240px] bottom-0">
         <BrickPile count={constructionCount} />
      </div>

      {/* Pilha de Suprimento (Ao LADO do Admin) */}
      <div className="absolute right-[80px] bottom-0">
         <BrickPile count={supplyCount} />
      </div>

      {/* O Boneco - Z-INDEX 10 (Atrás do Logo/Menus) */}
      <div 
        className="absolute bottom-[-2px] transition-all duration-[4400ms] ease-in-out flex flex-col items-center z-10"
        style={{ left: getXPos(), transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          <WorkerSVG isWalking={isWalking} isCarrying={isCarrying} direction={direction} />
          {isCarrying && (
            <div className="absolute top-[22px] left-[11px] w-6 h-3 bg-gray-900 border border-gray-400 shadow-md z-20 rounded-sm">
               <div className="w-full h-full opacity-10 flex items-center justify-around px-0.5">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo: React.FC = () => (
  <div className="flex flex-col items-center justify-center relative z-20 p-2">
    <div className="flex items-end space-x-0.5 mb-1 h-6">
      <div className="w-1.5 h-3 border-t border-x border-gray-900"></div>
      <div className="w-1.5 h-5 border-t border-x border-gray-900"></div>
      <div className="w-1.5 h-4 border-t border-x border-gray-900"></div>
    </div>
    <div className="w-14 h-px bg-gray-900 mb-1"></div>
    <span className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 leading-none tracking-tighter">
      RF
    </span>
    <div className="relative mt-1 px-8 py-1.5 border-y border-gray-900/10">
      <span className="text-xl font-['Playfair_Display'] font-medium text-gray-900 tracking-tight">
        Construções
      </span>
    </div>
    <div className="mt-1 bg-gray-900 px-4 py-0.5">
      <span className="text-[8px] font-['Montserrat'] font-bold text-white uppercase tracking-[0.3em] whitespace-nowrap">
        Arquitetura e Engenharia
      </span>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Em Andamento', path: '/em-andamento' },
    { name: 'Orçamentos', path: '/orcamento' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-gray-200 bg-white/95 backdrop-blur-sm ${
      scrolled ? 'shadow-md py-0' : 'py-2'
    }`}>
      <div className="max-w-[98vw] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Simulação de Construção - Z-Index 10 */}
        <ConstructionSimulation />

        <div className="flex items-center justify-between h-24 lg:h-32 transition-all duration-300 relative"> 
          <Link to="/" className="flex items-center relative z-20">
            {settings?.logo_url ? (
               <img src={settings.logo_url} alt="RF Logo" className="h-16 lg:h-20 object-contain" />
            ) : (
                <Logo />
            )}
          </Link>

          <div className="hidden lg:block relative z-20">
            <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-[2px] rounded-full px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-[11px] font-['Montserrat'] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group/link ${
                    isActive(link.path) ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900' 
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'}`}></span>
                </Link>
              ))}
              <Link 
                to="/admin" 
                className="p-3 text-gray-300 hover:text-gray-900 transition-colors ml-4 border border-transparent hover:border-gray-100 rounded-sm relative z-30"
              >
                <Lock size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:hidden relative z-30">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 h-screen animate-fade-in relative z-50">
          <div className="px-8 pt-12 space-y-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-3xl font-['Playfair_Display'] font-bold ${
                  isActive(link.path) ? 'text-gray-900' : 'text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;