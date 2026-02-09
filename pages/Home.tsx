import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, X, ClipboardCheck, Clock, ShieldCheck, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectStatus } from '../types';

interface BenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  icon: React.ReactNode;
}

const BenefitModal: React.FC<BenefitModalProps> = ({ isOpen, onClose, title, content, icon }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white p-12 max-w-2xl w-full shadow-2xl relative border border-gray-100" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} className="text-gray-900" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 text-gray-900">
             {icon}
          </div>
          <h3 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">{title}</h3>
          <div className="w-16 h-0.5 bg-gray-900 mb-8"></div>
          <p className="text-xl font-['Lora'] text-gray-600 mb-10 leading-relaxed italic">
            {content}
          </p>
          <Link 
            to="/orcamento" 
            className="w-full py-5 bg-gray-900 text-white font-['Montserrat'] font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors flex items-center justify-center"
          >
            Solicitar Orçamento <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { reviews } = useApp();
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null);
  
  const approvedReviews = reviews.filter(r => r.approved);
  
  const benefitsData = {
    qualidade: {
      title: "Rigor Técnico",
      content: "Na RF Construções, a qualidade é medida em milímetros. Utilizamos materiais premium e técnicas de engenharia de ponta para garantir que cada acabamento seja uma obra de arte.",
      icon: <Star size={40} />
    },
    prazo: {
      title: "Gestão de Tempo",
      content: "O cumprimento de prazos é a nossa assinatura. Trabalhamos com planeamento rigoroso e transparência total em todas as etapas do cronograma da obra.",
      icon: <Clock size={40} />
    },
    transparencia: {
      title: "Transparência",
      content: "Orçamentos detalhados e relatórios constantes. Construímos com base na confiança mútua e na clareza absoluta de todos os custos envolvidos.",
      icon: <ClipboardCheck size={40} />
    }
  };

  return (
    <div className="flex flex-col min-h-screen animate-fade-in bg-[#fcfcfc]">
      {/* Hero Section */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-block px-5 py-2 mb-8 border border-white/20 bg-white/5 backdrop-blur-md">
            <span className="text-white font-['Montserrat'] font-bold tracking-[0.3em] uppercase text-[10px]">Arquitetura & Engenharia</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-['Playfair_Display'] font-bold text-white mb-8 leading-tight">
            Excelência em <br/>
            <span className="italic">Construção</span>
          </h1>
          <p className="text-xl md:text-2xl font-['Lora'] text-gray-200 mb-12 max-w-2xl italic leading-relaxed">
            Especialistas em remodelações de alto padrão e construções que aliam funcionalidade à sofisticação estética com a assinatura RF.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              to="/orcamento" 
              className="px-10 py-5 bg-white text-gray-900 font-['Montserrat'] font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all shadow-2xl"
            >
              Pedir Orçamento
            </Link>
            <Link 
              to="/portfolio" 
              className="px-10 py-5 bg-transparent border border-white/40 text-white font-['Montserrat'] font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-gray-900 transition-all"
            >
              Ver Portfólio
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white relative z-20 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <button onClick={() => setActiveBenefit('qualidade')} className="p-10 group text-center border border-gray-50 hover:border-gray-900 transition-all duration-500">
              <div className="w-16 h-16 mx-auto bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-500">
                <Star className="text-gray-900 h-8 w-8 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-4 uppercase tracking-wider">Qualidade Premium</h3>
              <p className="text-sm font-['Open_Sans'] text-gray-500 leading-relaxed uppercase tracking-tighter">Acabamentos com rigor matemático e materiais certificados pela RF.</p>
            </button>
            <button onClick={() => setActiveBenefit('prazo')} className="p-10 group text-center border border-gray-50 hover:border-gray-900 transition-all duration-500">
              <div className="w-16 h-16 mx-auto bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-500">
                <Clock className="text-gray-900 h-8 w-8 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-4 uppercase tracking-wider">Prazos Rigorosos</h3>
              <p className="text-sm font-['Open_Sans'] text-gray-500 leading-relaxed uppercase tracking-tighter">Cronograma detalhado e cumprimento absoluto de datas pela nossa equipa.</p>
            </button>
            <button onClick={() => setActiveBenefit('transparencia')} className="p-10 group text-center border border-gray-50 hover:border-gray-900 transition-all duration-500">
              <div className="w-16 h-16 mx-auto bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-500">
                <ShieldCheck className="text-gray-900 h-8 w-8 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-4 uppercase tracking-wider">Transparência Total</h3>
              <p className="text-sm font-['Open_Sans'] text-gray-500 leading-relaxed uppercase tracking-tighter">Gestão financeira clara e acompanhamento técnico contínuo RF.</p>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gray-400 font-['Montserrat'] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Feedback</span>
          <h2 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-16">A Voz dos Nossos Clientes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {approvedReviews.length > 0 ? (
              approvedReviews.map((review) => (
                <div key={review.id} className="bg-white p-12 border border-gray-100 flex flex-col items-center text-center shadow-sm relative group animate-fade-in">
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-gray-900 text-white p-4 rounded-full">
                    <Quote size={20} />
                  </div>
                  <div className="flex mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={`${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-100'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 font-['Lora'] italic text-lg leading-relaxed mb-8 flex-grow">
                    "{review.comment}"
                  </p>
                  <div className="h-0.5 w-12 bg-gray-100 mb-6 group-hover:w-20 transition-all duration-500"></div>
                  <h4 className="text-sm font-['Montserrat'] font-bold uppercase tracking-widest text-gray-900">{review.clientName}</h4>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-gray-400 italic font-['Lora']">
                Ainda não existem avaliações publicadas. Seja o primeiro a avaliar!
              </div>
            )}
          </div>

          <Link 
            to="/avaliar" 
            className="inline-flex items-center px-10 py-5 bg-transparent border border-gray-900 text-gray-900 font-['Montserrat'] font-bold uppercase tracking-widest text-xs hover:bg-gray-900 hover:text-white transition-all"
          >
            Deixar a minha avaliação <ArrowRight className="ml-3 h-4 w-4" />
          </Link>
        </div>
      </section>

      <BenefitModal isOpen={activeBenefit === 'qualidade'} onClose={() => setActiveBenefit(null)} {...benefitsData.qualidade} />
      <BenefitModal isOpen={activeBenefit === 'prazo'} onClose={() => setActiveBenefit(null)} {...benefitsData.prazo} />
      <BenefitModal isOpen={activeBenefit === 'transparencia'} onClose={() => setActiveBenefit(null)} {...benefitsData.transparencia} />
    </div>
  );
};

export default Home;