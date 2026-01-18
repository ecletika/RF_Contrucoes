import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectStatus, Project } from '../types';
import { Calendar, Hammer, Camera, X } from 'lucide-react';

const Ongoing: React.FC = () => {
  const { projects } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const ongoingProjects = projects.filter(p => p.status === ProjectStatus.IN_PROGRESS);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Obras em Andamento</h1>
          <p className="text-gray-600">Acompanhe o progresso das nossas transformações atuais.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div 
                className="md:w-2/5 h-64 md:h-auto relative group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 text-slate-900 px-4 py-2 rounded-full font-bold text-sm flex items-center shadow-lg">
                      <Camera className="mr-2 h-4 w-4" /> Ver Fotos
                    </div>
                </div>
                <div className="absolute top-4 left-4 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  Em Andamento
                </div>
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {project.startDate && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span>Início: <strong>{project.startDate}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={16} className="mr-2 text-amber-500" />
                      <span>Previsão de entrega: <strong>{project.completionDate || 'A definir'}</strong></span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700 flex items-center">
                      <Hammer size={16} className="mr-2" /> Progresso da Obra
                    </span>
                    <span className="text-sm font-bold text-amber-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-amber-400 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {ongoingProjects.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-500">Nenhuma obra em andamento registrada no momento.</h3>
          </div>
        )}

        {/* Gallery Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95" onClick={() => setSelectedProject(null)}>
            <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl" onClick={e => e.stopPropagation()}>
              <button 
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} className="text-slate-900" />
              </button>
              
              <div className="p-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedProject.title}</h2>
                    <p className="text-gray-600">{selectedProject.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Main Image */}
                  <div className="rounded-lg overflow-hidden shadow-sm h-full">
                     <div className="h-64 overflow-hidden">
                        <img src={selectedProject.imageUrl} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Principal" />
                     </div>
                     <div className="p-3 bg-gray-50 border-t">
                        <p className="text-sm font-semibold text-gray-700">Foto Principal</p>
                     </div>
                  </div>
                  
                  {/* Gallery Images */}
                  {selectedProject.gallery?.map((item, idx) => (
                     <div key={idx} className="rounded-lg overflow-hidden shadow-sm h-full bg-white border">
                        <div className="h-64 overflow-hidden">
                           <img src={item.url} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={`Galeria ${idx + 1}`} />
                        </div>
                        {item.caption && (
                          <div className="p-3 bg-gray-50 border-t">
                            <p className="text-sm text-gray-700">{item.caption}</p>
                          </div>
                        )}
                     </div>
                  ))}

                  {(!selectedProject.gallery || selectedProject.gallery.length === 0) && (
                     <div className="col-span-full py-8 text-center text-gray-400 italic bg-gray-50 rounded-lg">
                        Sem fotos adicionais disponíveis no momento.
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ongoing;