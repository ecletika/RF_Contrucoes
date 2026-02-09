
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Project, ProjectStatus, ProjectType, Review, GalleryItem } from '../types';
import { generateProjectDescription } from '../services/geminiService';
import { 
  Trash2, Edit, Plus, Star, LogOut, Info, Settings, 
  Loader2, FolderKanban, FileText, AlertCircle, Sparkles, X, 
  ImageIcon, Eye, EyeOff, Youtube, Upload, Camera, PlusCircle
} from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    isAuthenticated, login, logout, projects, addProject, deleteProject, 
    reviews, budgetRequests, deleteBudgetRequest, isLoading, toggleReviewApproval, deleteReview 
  } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'projects' | 'reviews' | 'requests' | 'settings'>('projects');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Form State for new project
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.IN_PROGRESS,
    progress: 10,
    imageUrl: '',
    videoUrl: '',
    gallery: []
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setNewProject(prev => ({ ...prev, imageUrl: base64 }));
    }
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newItems: GalleryItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const base64 = await fileToBase64(files[i]);
        newItems.push({ url: base64, caption: 'Foto da Obra' });
      }
      setNewProject(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...newItems]
      }));
    }
  };

  const removeGalleryItem = (index: number) => {
    setNewProject(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage('');
    const result = await login(email, password);
    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
    setIsLoggingIn(false);
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    
    const projectToAdd: Project = {
      id: Date.now().toString(),
      title: newProject.title as string,
      description: `Projeto de ${newProject.type} executado pela RF Construções.`,
      type: newProject.type as ProjectType,
      status: newProject.status as ProjectStatus,
      imageUrl: newProject.imageUrl || 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=1000&auto=format&fit=crop',
      videoUrl: newProject.videoUrl as string,
      progress: newProject.progress as number,
      startDate: new Date().toISOString().split('T')[0],
      gallery: newProject.gallery || []
    };

    await addProject(projectToAdd);
    setShowAddModal(false);
    setNewProject({
      title: '',
      type: ProjectType.RESIDENTIAL,
      status: ProjectStatus.IN_PROGRESS,
      progress: 10,
      imageUrl: '',
      videoUrl: '',
      gallery: []
    });
  };

  const generateFictionalProject = async () => {
    setIsGenerating(true);
    const types = Object.values(ProjectType);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTitle = `${randomType} Premium ${Math.floor(Math.random() * 999)}`;
    const images = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'
    ];
    const randomImg = `${images[Math.floor(Math.random() * images.length)]}?q=80&w=1000&auto=format&fit=crop`;
    const description = await generateProjectDescription(randomTitle, randomType);
    
    const fictionalProject: Project = {
      id: Date.now().toString(),
      title: randomTitle,
      description: description,
      type: randomType,
      status: Math.random() > 0.5 ? ProjectStatus.COMPLETED : ProjectStatus.IN_PROGRESS,
      imageUrl: randomImg,
      progress: Math.floor(Math.random() * 100),
      startDate: '2024-01-01',
      completionDate: '2024-12-31',
      gallery: []
    };

    await addProject(fictionalProject);
    setIsGenerating(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-gray-900 animate-spin mb-4" />
          <p className="text-gray-500 font-medium font-['Montserrat']">Carregando Painel Administrativo...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4 pt-28">
        <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex flex-col items-center mb-10 text-center">
              <span className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-2 tracking-tighter">RF</span>
              <span className="text-[10px] font-['Montserrat'] font-bold tracking-[0.2em] text-gray-400 uppercase">Gestão Construções</span>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-['Montserrat'] font-bold text-gray-400 uppercase mb-2">E-mail</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-100 rounded-sm outline-none focus:border-gray-900 transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-['Montserrat'] font-bold text-gray-400 uppercase mb-2">Senha</label>
              <input type="password" className="w-full px-4 py-3 border border-gray-100 rounded-sm outline-none focus:border-gray-900 transition-colors" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {errorMessage && <div className="text-red-500 text-xs font-medium flex items-center"><AlertCircle size={14} className="mr-2" /> {errorMessage}</div>}
            <button type="submit" disabled={isLoggingIn} className="w-full bg-gray-900 text-white py-4 rounded-sm font-['Montserrat'] font-bold uppercase tracking-widest hover:bg-black transition-colors">Entrar no Painel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col md:flex-row font-['Open_Sans'] pt-28 lg:pt-32 relative">
      <aside className="w-full md:w-72 bg-white text-gray-900 flex flex-col border-r border-gray-100 z-20">
        <div className="p-8 border-b border-gray-50 text-center">
             <div className="flex flex-col items-center">
                <span className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 tracking-tighter">RF</span>
                <span className="text-[9px] font-['Montserrat'] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1">Gestão de Obra</span>
             </div>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center px-4 py-4 rounded-sm transition-all ${activeTab === 'projects' ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50'}`}><FolderKanban className="mr-4" size={20} /> Obras</button>
          <button onClick={() => setActiveTab('requests')} className={`w-full flex items-center px-4 py-4 rounded-sm transition-all ${activeTab === 'requests' ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50'}`}><FileText className="mr-4" size={20} /> Orçamentos <span className="ml-auto bg-gray-100 text-gray-900 text-[10px] px-2 py-1 rounded-full">{budgetRequests.length}</span></button>
          <button onClick={() => setActiveTab('reviews')} className={`w-full flex items-center px-4 py-4 rounded-sm transition-all ${activeTab === 'reviews' ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50'}`}><Star className="mr-4" size={20} /> Avaliações <span className="ml-auto bg-gray-100 text-gray-900 text-[10px] px-2 py-1 rounded-full">{reviews.length}</span></button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-4 py-4 rounded-sm transition-all ${activeTab === 'settings' ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50'}`}><Settings className="mr-4" size={20} /> Ajustes</button>
        </nav>
        <div className="p-6 border-t border-gray-50">
           <button onClick={() => logout()} className="w-full flex items-center justify-center px-4 py-3 text-red-500 hover:bg-red-50 transition-colors font-bold uppercase text-xs tracking-widest"><LogOut size={16} className="mr-2" /> Sair</button>
        </div>
      </aside>
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 capitalize">
            {activeTab.replace('projects', 'Obras').replace('requests', 'Orçamentos').replace('reviews', 'Avaliações').replace('settings', 'Ajustes')}
          </h2>
          
          {activeTab === 'projects' && (
            <div className="flex gap-3">
              <button onClick={generateFictionalProject} disabled={isGenerating} className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-900 text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50">
                {isGenerating ? <Loader2 size={14} className="animate-spin mr-2" /> : <Sparkles size={14} className="mr-2 text-yellow-500" />} Gerar Obra Fictícia
              </button>
              <button onClick={() => setShowAddModal(true)} className="flex items-center px-6 py-3 bg-gray-900 text-white text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest hover:bg-black transition-all">
                <Plus size={14} className="mr-2" /> Nova Obra
              </button>
            </div>
          )}
        </div>

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 gap-6">
            {projects.length === 0 ? (
              <div className="bg-white p-20 text-center border border-dashed border-gray-200">
                <FolderKanban className="mx-auto text-gray-100 mb-4" size={64} />
                <p className="text-gray-400 font-['Lora'] italic">Nenhuma obra registada no sistema.</p>
              </div>
            ) : (
              projects.map(project => (
                <div key={project.id} className="bg-white p-6 border border-gray-100 shadow-sm flex items-center gap-6 group animate-fade-in">
                  <div className="w-24 h-24 bg-gray-50 overflow-hidden flex-shrink-0 relative">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    {project.videoUrl && (
                      <div className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-sm">
                        <Youtube size={12} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[9px] font-['Montserrat'] font-bold uppercase tracking-widest text-gray-400">{project.type}</span>
                      <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${project.status === ProjectStatus.COMPLETED ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {project.status}
                      </span>
                    </div>
                    <h4 className="text-xl font-['Playfair_Display'] font-bold text-gray-900">{project.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 text-gray-300 hover:text-gray-900 transition-colors"><Edit size={18} /></button>
                    <button onClick={() => deleteProject(project.id)} className="p-3 text-red-200 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Adicionar Obra - ULTRA COMPACTO E ORGANIZADO */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="bg-white w-full max-w-2xl p-6 shadow-2xl animate-fade-in border border-gray-100 rounded-sm">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900">Nova Obra</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleManualAdd} className="space-y-4">
                {/* NOME DA OBRA - DESTAQUE TOTAL */}
                <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                  <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-widest mb-1">Nome da Obra / Título</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 outline-none transition-all font-['Montserrat'] font-bold text-lg text-gray-900 py-1"
                    placeholder="Ex: Reforma Apartamento LX"
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                    required
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Categoria e Progresso */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-widest mb-1">Categoria</label>
                      <select 
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-sm outline-none text-sm"
                        value={newProject.type}
                        onChange={e => setNewProject({...newProject, type: e.target.value as ProjectType})}
                      >
                        {Object.values(ProjectType).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-widest mb-1">Progresso (%)</label>
                      <input 
                        type="number" min="0" max="100"
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-sm outline-none text-sm"
                        value={newProject.progress}
                        onChange={e => setNewProject({...newProject, progress: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Youtube size={12} className="text-red-600" /> YouTube (Link)
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-sm outline-none text-xs"
                        placeholder="Link do vídeo"
                        value={newProject.videoUrl}
                        onChange={e => setNewProject({...newProject, videoUrl: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Foto Principal */}
                  <div>
                    <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-widest mb-1">Foto Principal</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-[155px] bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-900 transition-all relative group overflow-hidden"
                    >
                      {newProject.imageUrl ? (
                        <>
                          <img src={newProject.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold uppercase">Trocar</div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="text-gray-300 mx-auto mb-1" size={20} />
                          <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Upload Capa</span>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleMainImageChange} />
                  </div>
                </div>

                {/* Galeria de Fotos */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-widest">Galeria de Fotos do PC</label>
                    <button 
                      type="button" 
                      onClick={() => galleryInputRef.current?.click()}
                      className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-gray-900 hover:text-gray-600"
                    >
                      <PlusCircle size={14} /> Adicionar
                    </button>
                  </div>
                  <input type="file" ref={galleryInputRef} className="hidden" multiple accept="image/*" onChange={handleGalleryImagesChange} />
                  
                  <div className="grid grid-cols-6 gap-2 max-h-24 overflow-y-auto">
                    {newProject.gallery?.map((item, idx) => (
                      <div key={idx} className="relative group aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
                         <img src={item.url} className="w-full h-full object-cover" alt="Gallery" />
                         <button type="button" onClick={() => removeGalleryItem(idx)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100"><X size={8} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Cancelar</button>
                  <button type="submit" className="px-10 py-3 bg-gray-900 text-white font-['Montserrat'] font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-md">
                    Salvar Projeto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
