import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-['Playfair_Display'] font-bold text-white mb-6">RF Construções</h3>
            <p className="text-sm font-['Open_Sans'] leading-relaxed mb-6 text-gray-400 max-w-xs">
              Arquitetura e Engenharia de precisão. Sob a responsabilidade de Emerson Ferreira, transformamos visões em espaços de alta performance.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-['Montserrat'] font-bold uppercase tracking-widest text-gray-500 mb-6">Informação Legal e Contacto</h3>
            <ul className="space-y-4 font-['Open_Sans'] text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Rua Domingos da Cunha, 7-11B<br/>2725-606 Sintra, Mem Martins<br/>Lisboa, Portugal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm">+351 933 318 169</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm">contacto@rfconstrucoes.pt</span>
              </li>
              <li className="flex items-center space-x-3">
                <FileText size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm font-['Montserrat'] font-bold text-[10px] tracking-widest uppercase">NIF: 312667566</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-['Montserrat'] font-bold uppercase tracking-widest text-gray-500 mb-6">Links Rápidos</h3>
            <ul className="space-y-3 font-['Open_Sans']">
              <li><Link to="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">Portfólio</Link></li>
              <li><Link to="/orcamento" className="text-sm text-gray-400 hover:text-white transition-colors">Pedir Orçamento</Link></li>
              <li><Link to="/sobre" className="text-sm text-gray-400 hover:text-white transition-colors">A Empresa</Link></li>
              <li><Link to="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">Área Restrita</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-[10px] font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-gray-600">
          <p>&copy; {new Date().getFullYear()} RF Construções. Emerson Ferreira - Arquitetura e Engenharia.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;