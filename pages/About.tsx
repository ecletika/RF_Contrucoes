import React from 'react';
import { Users, Target, Eye } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Sobre a DNL Remodelações</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Há mais de 10 anos construindo confiança e renovando espaços com dedicação e profissionalismo.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581094794329-cd132c076ca6?q=80&w=2532&auto=format&fit=crop" 
              alt="Team at work" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nossa História</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              A DNL Remodelações nasceu da paixão por transformar ambientes e melhorar a qualidade de vida das pessoas através da arquitetura e construção. Começamos como uma pequena equipe familiar e crescemos baseados na recomendação de nossos clientes satisfeitos.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hoje, contamos com uma equipe multidisciplinar de arquitetos, engenheiros e mestres de obras, todos comprometidos com a excelência em cada detalhe, desde a demolição até o acabamento final.
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all border border-gray-100">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="text-amber-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Missão</h3>
            <p className="text-gray-600">
              Entregar soluções de reforma que superem as expectativas, aliando funcionalidade, estética e durabilidade.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all border border-gray-100">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="text-amber-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Visão</h3>
            <p className="text-gray-600">
              Ser referência nacional em remodelações residenciais e comerciais, reconhecida pela inovação e qualidade.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all border border-gray-100">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-amber-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Valores</h3>
            <p className="text-gray-600">
              Transparência, Pontualidade, Limpeza, Respeito ao Cliente e Sustentabilidade.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;