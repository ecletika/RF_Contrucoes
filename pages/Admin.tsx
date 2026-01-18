import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Project, ProjectStatus, ProjectType, GalleryItem } from '../types';
import { generateProjectDescription } from '../services/geminiService';
import { Trash2, Edit, Plus, Star, Sparkles, LogOut, Check, Info, Upload, Image as ImageIcon, AlertCircle, Mail, Phone, Calendar, Clock, Settings, Save, Send, Key } from 'lucide-react';

const Admin: React.FC = () => {
  const { isAuthenticated, login, logout, projects, addProject, updateProject, deleteProject, reviews, budgetRequests, updateBudgetStatus, settings, updateSettings, sendTestEmail } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'reviews' | 'requests' | 'settings'>('projects');
  
  // Settings State
  const [notificationEmail, setNotificationEmail] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

  useEffect(() => {
    if (settings?.notification_email) {
      setNotificationEmail(settings.notification_email);
    }
  }, [settings]);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: '',
    progress: 0,
    startDate: '',
    completionDate: '',
    gallery: []
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await convertFileToBase64(file);
        setFormData(prev => ({ ...prev, imageUrl: base64 }));
      } catch (error) {
        console.error("Error uploading image", error);
        alert("Erro ao carregar imagem.");
      }
      // Reset input
      e.target.value = '';
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) as File[];
      
      try {
        const promises = files.map(file => convertFileToBase64(file));
        const base64Results = await Promise.all(promises);
        
        const newItems: GalleryItem[] = base64Results.map(base64 => ({
          url: base64,
          caption: ''
        }));
        
        setFormData(prev => ({ 
          ...prev, 
          gallery: [...(prev.gallery || []), ...newItems] 
        }));
      } catch (error) {
        console.error("Error uploading gallery images", error);
        alert("Erro ao carregar imagens da galeria.");
      }
      
      // Reset input to allow selecting the same files again if needed
      e.target.value = '';
    }
  };

  const updateGalleryCaption = (index: number, caption: string) => {
    setFormData(prev => {
      const newGallery = [...(prev.gallery || [])];
      newGallery[index] = { ...newGallery[index], caption };
      return { ...prev, gallery: newGallery };
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => {
      const newGallery = [...(prev.gallery || [])];
      newGallery.splice(index, 1);
      return { ...prev, gallery: newGallery };
    });
  };

  const translateError = (error: string) => {
    if (error.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
    if (error.includes('Email not confirmed')) return 'E-mail não confirmado. Verifique sua caixa de entrada.';
    return `Erro: ${error}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage('');
    
    const result = await login(email, password);
    
    if (!result.success && result.error) {
      setErrorMessage(translateError(result.error));
    }
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    const success = await updateSettings(notificationEmail);
    if (success) {
      alert("Chave salva com sucesso! Faça um teste de envio.");
    } else {
      alert("Erro ao salvar configurações.");
    }
    setIsSavingSettings(false);
  };

  const handleTestEmail = async () => {
    if (!notificationEmail || notificationEmail.length < 10) {
        alert("Salve uma chave válida primeiro.");
        return;
    }
    setIsSendingTest(true);
    const success = await sendTestEmail(notificationEmail);
    if (success) {
      alert(`Email de teste enviado! Verifique a caixa de entrada do email associado à chave.`);
    } else {
      alert("Erro ao enviar email. Verifique se a chave está correta.");
    }
    setIsSendingTest(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
             {/* Logo for Login Screen */}
             <div className="flex flex-col items-start leading-none">
                <div className="flex items-center">
                  <span className="text-4xl font-black tracking-tighter text-slate-900 italic" style={{ fontFamily: 'Arial, sans-serif' }}>
                    DNL
                  </span>
                  <div className="h-8 w-5 bg-amber-400 ml-1 skew-x-[-12deg] transform translate-y-[-2px]"></div>
                </div>
                <span className="text-xs font-bold tracking-[0.2em] text-slate-900 uppercase mt-0.5 ml-0.5">
                  Remodelações
                </span>
             </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">Acesso Administrativo</h2>
          <p className="text-center text-gray-500 text-sm mb-6">Entre com suas credenciais do sistema.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-shadow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-shadow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            {errorMessage && (
              <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? 'Entrando...' : 'Acessar Painel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? Number(value) : value
    }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.type) {
      alert("Por favor, preencha o Título e o Tipo antes de gerar a descrição.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateProjectDescription(formData.title, formData.type as ProjectType);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      id: isEditing && editId ? editId : undefined, // Let DB handle ID for new items, or preserve ID for edits
      ...formData,
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Date.now()}/800/600` // Default random image if empty
    } as Project;

    if (isEditing) {
      updateProject(projectData);
    } else {
      addProject(projectData);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: '',
      description: '',
      type: ProjectType.RESIDENTIAL,
      status: ProjectStatus.IN_PROGRESS,
      imageUrl: '',
      progress: 0,
      startDate: '',
      completionDate: '',
      gallery: []
    });
  };

  const startEdit = (project: Project) => {
    setIsEditing(true);
    setEditId(project.id);
    setFormData(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
             {/* Admin Header Logo */}
             <div className="flex flex-col items-start leading-none scale-90 md:scale-100">
                <div className="flex items-center">
                  <span className="text-3xl font-black tracking-tighter text-slate-900 italic" style={{ fontFamily: 'Arial, sans-serif' }}>
                    DNL
                  </span>
                  <div className="h-6 w-4 bg-amber-400 ml-1 skew-x-[-12deg] transform translate-y-[-2px]"></div>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-900 uppercase mt-0.5 ml-0.5">
                  Remodelações
                </span>
             </div>
             <div className="h-10 w-px bg-gray-300 hidden md:block"></div>
             <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Painel de Controle</h1>
          </div>
          
          <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-800 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 transition-colors hover:bg-red-50">
            <LogOut size={20} className="mr-2" /> Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'projects' ? 'bg-slate-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Gerir Projetos
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${activeTab === 'requests' ? 'bg-slate-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Solicitações 
            {budgetRequests.filter(r => r.status === 'pendente').length > 0 && (
              <span className="ml-2 bg-amber-400 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {budgetRequests.filter(r => r.status === 'pendente').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'reviews' ? 'bg-slate-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Avaliações
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${activeTab === 'settings' ? 'bg-slate-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Settings size={18} className="mr-2" /> Configurações
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
              <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Projeto' : 'Novo Projeto'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload Section */}
                <div className="mb-4">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa</label>
                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative">
                     {formData.imageUrl ? (
                        <div className="relative h-40 w-full mb-2">
                           <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover rounded" />
                           <button 
                             type="button"
                             onClick={() => setFormData(p => ({...p, imageUrl: ''}))}
                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md"
                           >
                             <Trash2 size={12} />
                           </button>
                        </div>
                     ) : (
                        <div className="py-4">
                          <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Clique para carregar</p>
                        </div>
                     )}
                     <input 
                       type="file" 
                       accept="image/*"
                       onChange={handleMainImageUpload}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                       disabled={!!formData.imageUrl}
                     />
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border rounded p-2">
                    {Object.values(ProjectType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                   <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Descrição</label>
                      <button 
                        type="button" 
                        onClick={handleGenerateDescription}
                        disabled={isGenerating}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center hover:bg-purple-200 transition-colors"
                      >
                         <Sparkles size={12} className="mr-1" /> 
                         {isGenerating ? 'Gerando...' : 'Gerar com IA'}
                      </button>
                   </div>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border rounded p-2"
                  />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border rounded p-2">
                      {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Início</label>
                    <input type="date" name="startDate" value={formData.startDate || ''} onChange={handleInputChange} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Conclusão</label>
                    <input type="date" name="completionDate" value={formData.completionDate || ''} onChange={handleInputChange} className="w-full border rounded p-2" />
                  </div>
                </div>

                {/* Progress & Gallery Section */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" /> Galeria e Progresso
                  </h3>
                  
                  {formData.status === ProjectStatus.IN_PROGRESS && (
                     <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Progresso (%)</label>
                      <input type="range" name="progress" min="0" max="100" value={formData.progress} onChange={handleInputChange} className="w-full accent-amber-400" />
                      <div className="text-right text-sm font-bold text-amber-600">{formData.progress}%</div>
                    </div>
                  )}

                  <div className="space-y-3">
                     <label className="block text-sm font-medium text-gray-700">Adicionar Fotos à Galeria</label>
                     <div className="relative bg-white border border-dashed border-gray-300 rounded p-2 text-center hover:bg-gray-50 cursor-pointer">
                        <Plus className="mx-auto h-5 w-5 text-gray-400" />
                        <span className="text-xs text-gray-500">Adicionar Fotos (Seleção Múltipla)</span>
                        <input type="file" accept="image/*" multiple onChange={handleGalleryImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>

                     {/* Gallery List */}
                     <div className="space-y-3 mt-4 max-h-60 overflow-y-auto pr-1">
                        {formData.gallery?.map((item, idx) => (
                           <div key={idx} className="flex gap-2 bg-white p-2 rounded border border-gray-200 shadow-sm">
                              <img src={item.url} alt="Gallery" className="w-16 h-16 object-cover rounded bg-gray-100 flex-shrink-0" />
                              <div className="flex-1">
                                 <input 
                                   type="text" 
                                   placeholder="Comentário da foto..." 
                                   value={item.caption}
                                   onChange={(e) => updateGalleryCaption(idx, e.target.value)}
                                   className="w-full text-xs border rounded p-1 mb-1 focus:ring-1 focus:ring-amber-400"
                                 />
                                 <button 
                                   type="button" 
                                   onClick={() => removeGalleryImage(idx)}
                                   className="text-xs text-red-500 hover:text-red-700 flex items-center"
                                 >
                                    <Trash2 size={12} className="mr-1" /> Remover
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-amber-400 text-slate-900 py-2 rounded hover:bg-amber-300 font-bold shadow-md transition-all">
                    {isEditing ? 'Salvar Alterações' : 'Criar Projeto'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {projects.map(project => (
                <div key={project.id} className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                   <img src={project.imageUrl} alt={project.title} className="w-24 h-24 object-cover rounded-lg bg-gray-200" />
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                         <h3 className="font-bold text-lg text-slate-900">{project.title}</h3>
                         <div className="flex gap-2">
                            <button onClick={() => startEdit(project)} className="text-blue-500 hover:bg-blue-50 p-1 rounded transition-colors" title="Editar"><Edit size={18} /></button>
                            <button onClick={() => deleteProject(project.id)} className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors" title="Excluir"><Trash2 size={18} /></button>
                         </div>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs mr-2 font-semibold ${project.status === ProjectStatus.COMPLETED ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                           {project.status}
                        </span>
                        {project.type}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{project.description}</p>
                      
                      {/* Mini progress bar for list */}
                      {project.status === ProjectStatus.IN_PROGRESS && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 mt-1">
                           <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      )}

                      <div className="mt-2 text-xs text-gray-500 flex justify-between">
                        <div>
                           {project.startDate && <span className="mr-3">Início: {project.startDate}</span>}
                           {project.completionDate && <span>Fim: {project.completionDate}</span>}
                        </div>
                        {project.gallery && project.gallery.length > 0 && (
                           <div className="flex items-center text-slate-600">
                              <ImageIcon size={12} className="mr-1" /> {project.gallery.length} fotos
                           </div>
                        )}
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
             {budgetRequests.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhuma solicitação de orçamento recebida ainda.</p>
                </div>
             ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obra</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {budgetRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center mb-1"><Mail size={12} className="mr-1" />{request.email}</div>
                          <div className="text-sm text-gray-500 flex items-center"><Phone size={12} className="mr-1" />{request.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-slate-700">{request.type}</div>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2" title={request.description}>{request.description}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === 'pendente' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {request.status === 'pendente' && (
                            <button 
                              onClick={() => updateBudgetStatus(request.id, 'contactado')}
                              className="text-indigo-600 hover:text-indigo-900 flex items-center ml-auto"
                            >
                              <Check size={16} className="mr-1" /> Marcar como Contatado
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             )}
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Settings className="mr-2" /> Configurações de E-mail
              </h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start">
                 <Info className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                 <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Como configurar o envio de e-mail (Web3Forms)</p>
                    <ol className="list-decimal pl-4 space-y-1 mb-2">
                       <li>Acesse <a href="https://web3forms.com/" target="_blank" className="underline font-bold">web3forms.com</a>.</li>
                       <li>Digite seu e-mail para criar uma <strong>Access Key</strong>.</li>
                       <li>Copie a chave que chegará no seu e-mail.</li>
                       <li>Cole a chave no campo abaixo e salve.</li>
                    </ol>
                    <p className="text-xs">
                      * Este serviço é gratuito e não requer ativação a cada envio.
                    </p>
                 </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Chave de Acesso (Web3Forms)</label>
                  <div className="flex items-center">
                    <Key className="text-gray-400 mr-2" size={20} />
                    <input
                      type="text"
                      value={notificationEmail}
                      onChange={(e) => setNotificationEmail(e.target.value)}
                      placeholder="Ex: 8a2039-44b1-..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none font-mono"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Cole aqui a chave recebida no seu e-mail.</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                  <button 
                    type="submit" 
                    disabled={isSavingSettings}
                    className="flex-1 bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center"
                  >
                    {isSavingSettings ? 'Salvando...' : <><Save size={18} className="mr-2" /> Salvar Chave</>}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={handleTestEmail}
                    disabled={isSendingTest || !notificationEmail || notificationEmail.length < 10}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
                  >
                    {isSendingTest ? 'Enviando...' : <><Send size={18} className="mr-2" /> Testar Envio</>}
                  </button>
                </div>
              </form>
           </div>
        )}
      </div>
    </div>
  );
};

export default Admin;