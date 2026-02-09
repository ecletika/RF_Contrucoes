import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectType, ProjectStatus } from '../types';
import { ArrowUpRight } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { projects } = useApp();
  const [filter, setFilter] = useState<string>('Todos');

  const completedProjects = projects.filter(p => p.status === ProjectStatus.COMPLETED);
  
  const filteredProjects = filter === 'Todos' 
    ? completedProjects 
    : completedProjects.filter(p => p.type === filter);

  const categories = ['Todos', ...Object.values(ProjectType)];

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-48 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-gray-400 font-['Montserrat'] font-bold uppercase text-[10px] tracking-[0.4em]">Trabalhos Realizados</span>
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mt-4 mb-6">Portfólio de Obras</h1>
          <div className="h-px w-20 bg-gray-200 mx-auto"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest transition-all border ${
                filter === cat
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-400 hover:text-gray-900 border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-50 overflow-hidden group hover:shadow-2xl transition-all duration-700">
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <ArrowUpRight className="text-gray-900" size={24} />
                   </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-[0.2em]">{project.type}</span>
                  <span className="text-[9px] text-gray-300 font-['Montserrat'] font-bold uppercase tracking-widest">{new Date(project.completionDate || '').getFullYear()}</span>
                </div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-['Open_Sans'] line-clamp-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-32 border border-dashed border-gray-100 rounded-sm">
            <p className="text-gray-300 font-['Lora'] italic text-lg">Nenhum projeto registado nesta categoria para o protótipo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;