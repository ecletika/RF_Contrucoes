import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectStatus } from '../types';

const Home: React.FC = () => {
  const { projects, reviews } = useApp();
  
  const featuredProjects = projects
    .filter(p => p.status === ProjectStatus.COMPLETED)
    .slice(0, 3);

  const processSteps = [
    {
      number: '01',
      title: 'Briefing / Visita Inicial',
      description: 'Entendemos as suas necessidades e desejos.'
    },
    {
      number: '02',
      title: 'Proposta Comercial',
      description: 'Apresentamos um orçamento detalhado e transparente.'
    },
    {
      number: '03',
      title: 'Planeamento',
      description: 'Criamos um projeto personalizado para o seu espaço.'
    },
    {
      number: '04',
      title: 'Execução',
      description: 'A nossa equipa especializada transforma o seu projeto em realidade.'
    },
    {
      number: '05',
      title: 'Entrega Final',
      description: 'Garantimos a sua satisfação total com o resultado.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-slate-950/80"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Transformamos seus sonhos em <span className="text-amber-400">Realidade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Excelência em remodelações, do projeto à entrega das chaves. Qualidade garantida e prazos cumpridos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/orcamento" 
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Solicite um Orçamento <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/portfolio" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center"
            >
              Ver Portfólio
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Qualidade Premium</h3>
              <p className="text-gray-600">Utilizamos apenas materiais de alta qualidade e técnicas modernas.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Prazo Garantido</h3>
              <p className="text-gray-600">Compromisso sério com o cronograma estabelecido para sua obra.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Orçamento Transparente</h3>
              <p className="text-gray-600">Sem surpresas no final. Transparência total nos custos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - 5 Steps */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Gestão Eficiente em 5 Etapas</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Nosso método de trabalho garante organização, transparência e resultados de excelência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-amber-500 transition-colors group relative overflow-hidden">
                <div className="text-5xl font-black text-slate-800 absolute -top-2 -right-2 opacity-50 group-hover:text-amber-500/20 group-hover:scale-110 transition-all">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <span className="inline-block text-amber-400 font-bold text-xl mb-3">{step.number}</span>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight min-h-[3rem] flex items-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Destaques Recentes</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-xl shadow-lg bg-white h-80">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-400 text-sm font-semibold mb-1">{project.type}</span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link to="/portfolio" className="text-slate-900 font-semibold hover:text-amber-600 flex items-center justify-center">
                Ver todos os projetos <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">O que dizem nossos clientes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.comment}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-300 overflow-hidden mr-3">
                     {review.avatarUrl ? (
                         <img src={review.avatarUrl} alt={review.clientName} className="h-full w-full object-cover" />
                     ) : (
                         <div className="h-full w-full flex items-center justify-center bg-slate-800 text-white font-bold">
                             {review.clientName.charAt(0)}
                         </div>
                     )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.clientName}</h4>
                    <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;