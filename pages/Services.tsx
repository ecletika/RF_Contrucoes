import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Paintbrush, Hammer, CheckCircle2, Zap, Droplets, 
  Layers, LayoutGrid, Flame, Wrench, Maximize2, Sparkles, 
  ShieldCheck, HardHat, Ruler
} from 'lucide-react';

const Services: React.FC = () => {
  const serviceCategories = [
    {
      title: "Estrutura e Alvenaria",
      icon: <Hammer size={24} />,
      items: [
        "Construção e execução de paredes em alvenaria",
        "Assentamento de tijolo e bloco",
        "Reboco, emboço e estuque",
        "Execução de betão armado (vigas, pilares e lajes)",
        "Regularização de paredes e pavimentos"
      ]
    },
    {
      title: "Pladur e Divisórias",
      icon: <Layers size={24} />,
      items: [
        "Montagem de paredes e tectos em pladur",
        "Tectos falsos",
        "Isolamento térmico e acústico",
        "Reparações e alterações de divisórias interiores"
      ]
    },
    {
      title: "Canalização e Redes de Água",
      icon: <Droplets size={24} />,
      items: [
        "Instalação de redes de água fria e quente",
        "Instalação de esgotos e drenagens",
        "Montagem de loiças sanitárias",
        "Instalação de torneiras, chuveiros e misturadoras",
        "Testes de estanquidade"
      ]
    },
    {
      title: "Electricidade e Telecomunicações",
      icon: <Zap size={24} />,
      items: [
        "Instalação eléctrica completa",
        "Quadros eléctricos e sistemas de protecção",
        "Tomadas, interruptores e pontos de iluminação",
        "Iluminação interior",
        "Redes de TV, internet e telefone"
      ]
    },
    {
      title: "Gás e Climatização",
      icon: <Flame size={24} />,
      items: [
        "Instalação de redes de gás",
        "Pré-instalação e instalação de ar condicionado",
        "Sistemas de ventilação",
        "Aquecimento de águas (termoacumuladores, esquentadores)"
      ]
    },
    {
      title: "Revestimentos e Pavimentos",
      icon: <LayoutGrid size={24} />,
      items: [
        "Assentamento de pavimentos cerâmicos",
        "Aplicação de flutuante, vinílico e madeira",
        "Revestimento de paredes (azulejo, cerâmica, pedra)",
        "Rodapés e acabamentos"
      ]
    },
    {
      title: "Carpintaria e Serralharia",
      icon: <Wrench size={24} />,
      items: [
        "Montagem de portas interiores",
        "Roupeiros e móveis por medida",
        "Cozinhas e armários",
        "Corrimões e guardas"
      ]
    },
    {
      title: "Pinturas e Acabamentos",
      icon: <Paintbrush size={24} />,
      items: [
        "Preparação de superfícies",
        "Pintura interior",
        "Aplicação de massas e primários",
        "Acabamentos decorativos"
      ]
    },
    {
      title: "Vidros e Caixilharias",
      icon: <Maximize2 size={24} />,
      items: [
        "Instalação de portas e janelas",
        "Colocação de vidros",
        "Caixilharia em alumínio ou PVC"
      ]
    },
    {
      title: "Limpeza e Entrega Final",
      icon: <Sparkles size={24} />,
      items: [
        "Limpeza pós-obra",
        "Acertos finais",
        "Verificação de todos os sistemas",
        "Entrega da obra pronta a utilizar"
      ]
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-48 pb-24 animate-fade-in">
      {/* Header Section */}
      <section className="px-4 max-w-7xl mx-auto text-center mb-24">
        <span className="text-gray-400 font-['Montserrat'] font-bold uppercase text-[10px] tracking-[0.4em] mb-4 block">Portfólio de Competências</span>
        <h1 className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-gray-900 mb-8">Nossa Expertise</h1>
        <div className="h-0.5 w-24 bg-gray-900 mx-auto mb-12"></div>
        <p className="text-xl font-['Lora'] text-gray-600 max-w-3xl mx-auto italic leading-relaxed">
          Oferecemos uma solução técnica completa e integrada. Cada detalhe da sua obra é gerido com precisão e rigor profissional.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {serviceCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 rounded-sm">
                  {category.icon}
                </div>
                <span className="text-[10px] font-['Montserrat'] font-bold text-gray-200 group-hover:text-gray-900 transition-colors uppercase tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-6 tracking-tight">
                {category.title}
              </h3>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start text-xs font-['Open_Sans'] text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                    <CheckCircle2 size={14} className="mr-3 mt-0.5 text-gray-900 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-gray-50">
                <Link 
                  to="/orcamento" 
                  className="inline-flex items-center text-[10px] font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-gray-900 group/btn"
                >
                  Solicitar Orçamento Técnico
                  <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Banner */}
      <section className="mt-32 max-w-7xl mx-auto px-4">
        <div className="bg-gray-50 p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-gray-100">
          <div className="lg:max-w-xl">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold mb-6">Compromisso com o Rigor</h2>
            <p className="text-gray-600 font-['Lora'] italic text-lg leading-relaxed">
              "Na RF Construções, não apenas executamos serviços. Edificamos soluções duradouras onde a segurança estrutural e a perfeição estética caminham lado a lado."
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 w-full lg:w-auto">
             <div className="text-center">
                <ShieldCheck size={40} className="mx-auto text-gray-900 mb-4" />
                <span className="block text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest text-gray-400">Segurança Total</span>
             </div>
             <div className="text-center">
                <HardHat size={40} className="mx-auto text-gray-900 mb-4" />
                <span className="block text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest text-gray-400">Rigor em Obra</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;