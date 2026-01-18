import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Em Andamento', path: '/em-andamento' },
    { name: 'Orçamentos', path: '/orcamento' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Logo Recreation based on image provided */}
            <div className="flex flex-col items-start leading-none">
              <div className="flex items-center">
                <span className="text-3xl font-black tracking-tighter text-white italic" style={{ fontFamily: 'Arial, sans-serif' }}>
                  DNL
                </span>
                {/* Amber geometric accent representing the roof/L part - More Elegant */}
                <div className="h-6 w-4 bg-amber-400 ml-1 skew-x-[-12deg] transform translate-y-[-2px]"></div>
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase mt-0.5 ml-0.5">
                Remodelações
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-amber-400'
                      : 'text-gray-300 hover:text-amber-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/admin" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/admin') 
                    ? 'text-amber-400' 
                    : 'text-gray-400 hover:text-amber-400'
                }`}
              >
                <Lock size={14} className="mr-1" /> Área Admin
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-slate-800'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-amber-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
               to="/admin"
               onClick={() => setIsOpen(false)}
               className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white flex items-center"
            >
              <Lock size={16} className="mr-2" /> Área Administrativa
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;