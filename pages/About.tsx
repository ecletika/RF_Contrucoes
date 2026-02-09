import React, { useState, useEffect } from 'react';
import { 
  Users, Target, Eye, Leaf, Heart, Shield, Scale, Clock, Award, 
  CheckCircle, Briefcase, Zap, ShieldCheck, Gem, UserCheck, Gavel, 
  BarChart3, LayoutGrid, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const WorkerSVG: React.FC<{ isWorking: boolean; direction: number }> = ({ isWorking, direction }) => (
  <svg 
    width="50" 
    height="50" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`transition-all duration-300 ${direction < 0 ? 'scale-x-[-1]' : 'scale-x-1'} ${isWorking ? 'animate-pouring' : ''}`}
  >
    {/* Cabeça e Capacete */}
    <circle cx="12" cy="4.5" r="2.2" fill="#333" />
    <path d="M9 3.5C9 2 10.5 1 12 1C13.5 1 15 2 15 3.5L12 4.5L9 3.5Z" fill="#FFA500" />
    
    {/* Tronco e Colete */}
    <path d="M9 7C8 7 7.5 8 7.5 9V14H16.5V9C16.5 8 16 7 15 7H9Z" fill="#222" />
    <path d="M10 7H14V14H10V7Z" fill="#CCFF00" />
    <rect x="10" y="9" width="4" height="1" fill="white" fillOpacity="0.5" />
    <rect x="10" y="12" width="4" height="1" fill="white" fillOpacity="0.5" />

    {/* Pernas */}
    <path d="M10 14V22.5" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 14V22.5" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />

    {/* Braços segurando o balde */}
    <path d="M7.5 9L5.5 12" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    <path d="M16.5 9L18.5 12" stroke="#222" strokeWidth="2" strokeLinecap="round" />

    {/* O Balde de Obra */}
    <g transform="translate(10, 12)">
      <path d="M0 0 L4 0 L3.5 4 L0.5 4 Z" fill="#444" />
      <path d="M0 0 C0 -1, 4 -1, 4 0" stroke="#666" strokeWidth="0.5" fill="none" />
      {isWorking && (
        <rect x="1.5" y="4" width="1.2" height="10" fill="#555" className="animate-liquid-flow" />
      )}
    </g>

    <style>{`
      @keyframes pouring {
        0%, 100% { transform: rotate(0deg) ${direction < 0 ? 'scale-x-[-1]' : 'scale-x-1'}; }
        50% { transform: rotate(12deg) translateY(-1px) ${direction < 0 ? 'scale-x-[-1]' : 'scale-x-1'}; }
      }
      @keyframes liquid-flow {
        0% { height: 0; opacity: 0; }
        20% { height: 15px; opacity: 0.8; }
        80% { height: 15px; opacity: 0.8; }
        100% { height: 0; opacity: 0; }
      }
      .animate-pouring {
        animation: pouring 1s infinite ease-in-out;
      }
      .animate-liquid-flow {
        animation: liquid-flow 1s infinite ease-in-out;
      }
    `}</style>
  </svg>
);

const LogoDisplay: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev >= 20 ? 0 : prev + 1));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  // Progresso por fases (0-100%)
  const leftWallProgress = Math.min(step, 8) * (100 / 8);
  const rightWallProgress = step > 8 ? Math.min(step - 8, 8) * (100 / 8) : 0;
  const slabProgress = step > 16 ? Math.min(step - 16, 4) * (100 / 4) : 0;

  // Atividade e posição dos trabalhadores
  const leftIsWorking = step >= 0 && step <= 8;
  const rightIsWorking = step > 8 && step <= 16;
  const slabIsWorking = step > 16;

  // Calculamos a posição vertical (em percentagem do container das letras)
  // O container das letras tem aproximadamente 60px de altura interna
  const leftWorkerY = leftWallProgress;
  const rightWorkerY = rightWallProgress;

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ transform: `scale(${scale})` }}>
      
      {/* Elementos Decorativos Superiores */}
      <div className="flex items-end space-x-1 mb-2 h-10 opacity-20">
        <div className="w-2 h-5 border-t-2 border-x-2 border-gray-900"></div>
        <div className="w-2 h-8 border-t-2 border-x-2 border-gray-900"></div>
        <div className="w-2 h-6 border-t-2 border-x-2 border-gray-900"></div>
      </div>
      
      <span className="text-7xl font-['Playfair_Display'] font-bold text-gray-900 leading-none tracking-tighter mb-2">
        RF
      </span>

      <div className="relative px-12 py-3 border-gray-100">
        
        {/* Trabalhador da Esquerda (Acompanha a subida da coluna) */}
        {(leftIsWorking || (slabIsWorking && slabProgress < 50)) && (
          <div 
            className="absolute transition-all duration-700 ease-linear z-30"
            style={{ 
                left: slabIsWorking ? '20%' : '-15px', 
                bottom: slabIsWorking ? '100%' : `${leftWallProgress}%`,
                transform: 'translateY(10%)'
            }}
          >
            <WorkerSVG isWorking={true} direction={1} />
          </div>
        )}

        {/* Trabalhador da Direita (Acompanha a subida da coluna) */}
        {(rightIsWorking || (slabIsWorking && slabProgress >= 50)) && (
          <div 
            className="absolute transition-all duration-700 ease-linear z-30"
            style={{ 
                right: slabIsWorking ? '20%' : '-15px', 
                bottom: slabIsWorking ? '100%' : `${rightWallProgress}%`,
                transform: 'translateY(10%)'
            }}
          >
            <WorkerSVG isWorking={true} direction={-1} />
          </div>
        )}

        {/* LAJE (Horizontal superior) */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-900/5 overflow-hidden">
           <div 
             className="bg-gray-900 h-full transition-all duration-700" 
             style={{ width: `${slabProgress}%` }}
           ></div>
        </div>

        {/* Coluna Esquerda */}
        <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-gray-900/5 overflow-hidden">
           <div 
             className="bg-gray-900 w-full transition-all duration-700 absolute bottom-0" 
             style={{ height: `${leftWallProgress}%` }}
           ></div>
        </div>
        
        {/* Coluna Direita */}
        <div className="absolute right-0 bottom-0 top-0 w-1.5 bg-gray-900/5 overflow-hidden">
           <div 
             className="bg-gray-900 w-full transition-all duration-700 absolute bottom-0" 
             style={{ height: `${rightWallProgress}%` }}
           ></div>
        </div>
        
        <span className="text-4xl font-['Playfair_Display'] font-medium text-gray-900 tracking-tight">
          Construções
        </span>
      </div>

      <div className="mt-4 bg-gray-900 px-6 py-1">
        <span className="text-[10px] font-['Montserrat'] font-bold text-white uppercase tracking-[0.3em] whitespace-nowrap">
          Arquitetura e Engenharia
        </span>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const { settings } = useApp();

  const whyChooseUs = [
    {
      title: "Abordagem Integrada",
      icon: LayoutGrid,
      description: "Reunimos arquitectura, engenharia e construção num único parceiro, assegurando uma visão global e coerente em todas as fases do projecto."
    },
    {
      title: "Serviço Chave-na-Mão",
      icon: Briefcase,
      description: "Gerimos todo o processo — do conceito inicial à entrega final — proporcionando comodidade, segurança e total tranquilidade ao cliente."
    },
    {
      title: "Excelência Técnica",
      icon: Award,
      description: "A nossa equipa é composta por profissionais altamente qualificados, com experiência em projectos residenciais e corporativos de diferentes escalas."
    },
    {
      title: "Planeamento e Rigor",
      icon: Clock,
      description: "Cada obra é cuidadosamente planeada, com controlo rigoroso de prazos, custos e qualidade, garantindo resultados consistentes."
    },
    {
      title: "Transparência e Confiança",
      icon: Users,
      description: "Orçamentos claros, comunicação contínua e acompanhamento permanente, promovendo uma relação baseada no profissionalismo."
    },
    {
      title: "Qualidade Superior",
      icon: Gem,
      description: "Seleccionamos materiais de elevada qualidade e aplicamos soluções construtivas duradouras, com atenção aos pormenores."
    },
    {
      title: "Soluções Personalizadas",
      icon: UserCheck,
      description: "Desenvolvemos projectos exclusivos, adaptados às necessidades, expectativas e identidade de cada cliente."
    },
    {
      title: "Conformidade Legal",
      icon: Gavel,
      description: "Asseguramos o cumprimento integral das normas legais, técnicas e de segurança, incluindo licenciamento e fiscalização."
    },
    {
      title: "Compromisso com o Resultado",
      icon: BarChart3,
      description: "O nosso foco é entregar espaços funcionais, esteticamente equilibrados e preparados para o futuro."
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-16 animate-fade-in pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <span className="text-gray-400 font-['Montserrat'] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Conheça a nossa história</span>
          <h1 className="text-6xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">RF Construções</h1>
          <div className="h-0.5 w-24 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl font-['Lora'] text-gray-600 max-w-3xl mx-auto italic leading-relaxed">
            Elevando o padrão da arquitetura e engenharia através de um compromisso inabalável com a qualidade e o rigor técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative flex justify-center items-center p-16 bg-white rounded-sm border border-gray-100 shadow-sm min-h-[500px]">
              <div className="absolute inset-0 border-[1px] border-gray-50 transform translate-x-4 translate-y-4 -z-10"></div>
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="RF Logo" className="max-h-96 object-contain" />
              ) : (
                <LogoDisplay scale={1.2} />
              )}
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900">Solidez e Tradição</h2>
            <p className="text-gray-700 font-['Open_Sans'] leading-relaxed text-lg">
              A <strong>RF Construções</strong> nasceu com a missão de redefinir o conceito de remodelações de luxo e construções de alto desempenho. Com uma equipa multidisciplinar composta pelos melhores profissionais de arquitetura e engenharia, transformamos visões ambiciosas em realidades tangíveis.
            </p>
            <p className="text-gray-600 font-['Lora'] leading-relaxed text-xl italic border-l-4 border-gray-900 pl-8 bg-gray-50 py-6 pr-6">
              "Não construímos apenas paredes; edificamos espaços que inspiram vidas. O nosso logo é o selo de garantia de que cada milímetro da sua obra foi pensado com precisão matemática e sensibilidade estética."
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <section className="mb-24">
          <div className="text-center mb-20">
            <span className="text-gray-400 font-['Montserrat'] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Nossa Diferença</span>
            <h2 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-12">Porquê escolher-nos</h2>
            <p className="text-lg font-['Open_Sans'] text-gray-500 max-w-4xl mx-auto leading-relaxed">
              Na nossa empresa, cada projecto é tratado com rigor técnico, atenção ao detalhe e um elevado padrão de qualidade, garantindo soluções à medida para clientes particulares e empresariais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-12 border border-gray-100 hover:border-gray-900 transition-all duration-500 group flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-50 text-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 rounded-full">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-4 group-hover:translate-y-[-4px] transition-transform">{item.title}</h3>
                <p className="text-gray-500 font-['Open_Sans'] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section with Pulsing Button */}
        <section className="py-24 border-t border-gray-100 flex flex-col items-center text-center">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-8">Pronto para começar o seu projeto?</h2>
          <p className="text-gray-500 font-['Lora'] italic text-lg mb-12 max-w-2xl">
            Entre em contacto com os nossos especialistas e transforme a sua visão em realidade com o rigor técnico da RF Construções.
          </p>
          
          <Link 
            to="/orcamento" 
            className="group relative inline-flex items-center justify-center px-12 py-6 bg-gray-900 text-white font-['Montserrat'] font-bold uppercase tracking-[0.3em] text-xs hover:bg-black transition-all animate-soft-pulse overflow-hidden shadow-2xl"
          >
            <span className="relative z-10 flex items-center">
              Solicitar Orçamento <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>

          <style>{`
            @keyframes soft-pulse {
              0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
              }
              50% {
                transform: scale(1.02);
                box-shadow: 0 0 25px 10px rgba(0, 0, 0, 0.1);
              }
              100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
              }
            }
            .animate-soft-pulse {
              animation: soft-pulse 3s infinite ease-in-out;
            }
          `}</style>
        </section>

      </div>
    </div>
  );
};

export default About;