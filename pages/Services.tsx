import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Paintbrush, Hammer, ShieldCheck, Home, Ruler, HardHat, CheckCircle2 } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Remodelações Gerais",
      description: "Transformação completa de interiores. Do planeamento à execução, realizamos demolições, construção de paredes, pavimentos, tetos falsos e acabamentos de luxo para renovar totalmente o seu espaço.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop",
      icon: <Home size={24} />,
      features: ["Demolição e Construção", "Pavimentos e Revestimentos", "Carpintaria", "Eletricidade e Canalização"]
    },
    {
      title: "Pinturas",
      description: "Serviços profissionais de pintura interior e exterior. Utilizamos tintas de alta durabilidade e técnicas que garantem acabamento uniforme, tratamento de fissuras e proteção contra humidade.",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2531&auto=format&fit=crop",
      icon: <Paintbrush size={24} />,
      features: ["Pintura Decorativa", "Lacagem de Madeiras", "Tratamento Anti-Fungos", "Impermeabilização"]
    },
    {
      title: "Impermeabilização",
      description: "Soluções definitivas para problemas de infiltração. Proteja terraços, varandas, fachadas e coberturas com membranas líquidas, telas asfálticas e argamassas técnicas.",
      image: "https://images.unsplash.com/photo-1621255554152-f4d0e5135111?q=80&w=2670&auto=format&fit=crop",
      icon: <ShieldCheck size={24} />,
      features: ["Terraços e Varandas", "Fachadas", "Piscinas", "Injeção de Fissuras"]
    },
    {
      title: "Reabilitação de Fachadas",
      description: "Recuperação estética e estrutural de edifícios. Limpeza de pedra, reparação de fissuras, rebocos e pintura para valorizar o património e garantir a segurança.",
      image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2670&auto=format&fit=crop",
      icon: <Hammer size={24} />,
      features: ["Limpeza a Jato", "Reparação de Rebocos", "Tratamento de Ferragens", "Pintura Exterior"]
    },
    {
      title: "Telhados e Coberturas",
      description: "Manutenção, reparação e construção de telhados novos. Instalação de isolamento térmico, substituição de telhas e limpeza de caleiras para uma casa seca e segura.",
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2670&auto=format&fit=crop",
      icon: <HardHat size={24} />,
      features: ["Substituição de Telhas", "Estruturas em Madeira/Ferro", "Isolamento Térmico", "Limpeza de Algerozes"]
    },
    {
      title: "Isolamento Térmico (Capoto)",
      description: "Melhore a eficiência energética da sua habitação. Aplicação de sistema ETICS (Capoto) para reduzir custos de climatização e aumentar o conforto térmico e acústico.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop",
      icon: <Ruler size={24} />,
      features: ["Sistema ETICS", "Isolamento pelo Interior", "Tetos Falsos Acústicos", "Janelas Eficientes"]
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Diagnóstico e Planeamento",
      description: "Visitamos o local, ouvimos as suas ideias e avaliamos as necessidades técnicas. Elaboramos um orçamento detalhado e um plano de obra realista.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop"
    },
    {
      number: "2",
      title: "Design e Materiais",
      description: "Ajudamos na escolha dos melhores materiais, cores e acabamentos, garantindo que o resultado final alia estética, funcionalidade e durabilidade.",
      image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2597&auto=format&fit=crop"
    },
    {
      number: "3",
      title: "Execução de Excelência",
      description: "A nossa equipa técnica executa a obra com rigor, mantendo o local limpo e organizado. Cumprimos os prazos estabelecidos com comunicação constante.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-slate-950/80"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-2 block">O que fazemos</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Soluções Completas em Construção
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Da fundação ao acabamento, entregamos qualidade superior para transformar o seu espaço no ambiente dos seus sonhos.
          </p>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Excelência Técnica & Acabamentos Premium</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            A <strong>DNL Remodelações</strong> é especialista em transformar espaços. Atuamos em toda a Grande Lisboa, oferecendo soluções completas de pintura, remodelação de interiores, reabilitação de edifícios e impermeabilizações. Combinamos técnica apurada com materiais de excelência para garantir a longevidade e beleza da sua obra.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-gray-100">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-4 right-4 bg-amber-400 p-3 rounded-xl text-slate-900 shadow-lg transform rotate-3 group-hover:rotate-0 transition-all">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <CheckCircle2 size={14} className="text-amber-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to="/orcamento" 
                    className="mt-auto inline-flex items-center justify-center w-full py-3 bg-gray-100 hover:bg-slate-900 text-slate-900 hover:text-white rounded-lg transition-colors font-semibold text-sm"
                  >
                    Pedir Orçamento <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-amber-500 font-bold uppercase text-xs tracking-wider">Metodologia</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Como trabalhamos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Um processo transparente e organizado para garantir que a sua obra corre sem imprevistos.</p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2">
                   <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                     <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                     <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-0 left-0 bg-amber-400 text-slate-900 font-black text-5xl px-8 py-6 rounded-br-3xl shadow-lg z-20">
                        {step.number}
                      </div>
                   </div>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {step.description}
                  </p>
                  <div className="h-1 w-20 bg-slate-200 rounded md:mx-0 mx-auto">
                    <div className="h-full bg-amber-400 w-1/2 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-950 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto para transformar o seu espaço?
          </h2>
          <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
            Fale conosco hoje mesmo. Oferecemos visita técnica e orçamento gratuito para o seu projeto de remodelação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/orcamento" 
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-all transform hover:scale-105 shadow-xl text-lg"
            >
              Pedir Orçamento Grátis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gray-600 text-white font-semibold rounded-lg hover:bg-white/5 transition-all text-lg"
            >
              Ver Projetos Realizados
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Services;