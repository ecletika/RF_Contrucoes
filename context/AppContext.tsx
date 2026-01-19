import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Review, ProjectStatus, ContactForm, BudgetRequest, AppSettings, GalleryItem } from '../types';
import { supabase } from '../services/supabaseClient';

// Chave de Acesso Web3Forms (Substituindo FormSubmit)
const WEB3FORMS_ACCESS_KEY = 'f25537fd-c9fc-4583-af3b-1899643fbbf8';

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AppContextType {
  projects: Project[];
  reviews: Review[];
  budgetRequests: BudgetRequest[];
  settings: AppSettings | null;
  addProject: (project: Project, imageFile?: File | null, galleryFiles?: File[]) => Promise<void>;
  updateProject: (project: Project, imageFile?: File | null) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'approved'>) => Promise<boolean>;
  toggleReviewApproval: (id: string, currentStatus: boolean) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  createBudgetRequest: (data: ContactForm) => Promise<boolean>;
  deleteBudgetRequest: (id: string) => Promise<void>;
  deleteAllBudgetRequests: () => Promise<void>;
  updateBudgetStatus: (id: string, status: 'pendente' | 'contactado') => Promise<void>;
  updateSettings: (email: string, logoUrl?: string) => Promise<boolean>;
  uploadImage: (file: File) => Promise<string | null>;
  sendTestEmail: (email: string) => Promise<boolean>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Inicialização e Listeners
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      fetchProjects();
      fetchReviews(!!session); 
      fetchSettings();
      if (session) {
        fetchBudgetRequests();
      }
      setIsLoading(false); 
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAuth = !!session;
      setIsAuthenticated(isAuth);
      
      fetchProjects();
      fetchReviews(isAuth); 
      
      if (isAuth) {
        fetchBudgetRequests();
      } else {
        setBudgetRequests([]); 
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- FUNÇÃO AUXILIAR DE UPLOAD ---
  const uploadImageToStorage = async (file: File, bucket: string = 'siteDNL'): Promise<string | null> => {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const fileExt = cleanFileName.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        console.warn(`Erro no upload para bucket ${bucket}:`, uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Erro crítico ao fazer upload:', error);
      return null;
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .single();
      
      if (data) {
        setSettings(data);
      } else {
         if (!error || error.code === 'PGRST116') {
            const { data: newData } = await supabase.from('app_settings').insert([{ notification_email: 'mauricio.junior@ecletika.com' }]).select().single();
            if (newData) setSettings(newData);
         }
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
    }
  };

  const updateSettings = async (email: string, logoUrl?: string): Promise<boolean> => {
    if (!settings?.id) {
       const payload: any = { notification_email: email };
       if (logoUrl) payload.logo_url = logoUrl;

       const { data, error } = await supabase.from('app_settings').insert([payload]).select().single();
       
       if (!error && data) {
         setSettings(data);
         return true;
       }
       return false;
    }

    try {
      const updates: any = { notification_email: email };
      if (logoUrl !== undefined) updates.logo_url = logoUrl;

      const { error } = await supabase
        .from('app_settings')
        .update(updates)
        .eq('id', settings.id);

      if (error) throw error;
      
      setSettings(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (error: any) {
      console.error("Erro ao atualizar configurações:", error);
      alert(`Erro ao salvar: ${error.message}`);
      return false;
    }
  };

  const sendTestEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Teste de Configuração - DNL Remodelações`,
          message: "Este é um e-mail de teste. A integração com Web3Forms está funcionando corretamente!",
          email: email, 
          from_name: "DNL App Teste"
        })
      });
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Erro ao enviar email de teste:", error);
      return false;
    }
  };

  const sendNotificationEmail = async (to: string, subject: string, message: string, replyTo?: string, attachments?: string[]) => {
      try {
        let finalMessage = message;
        if (attachments && attachments.length > 0) {
            finalMessage += "\n\n--- ANEXOS ---\n" + attachments.join("\n");
        }

        const payload: any = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `DNL App: ${subject}`,
            message: finalMessage,
            from_name: "DNL Notificações",
            Detalhes: message,
            Fotos: attachments ? attachments.join(', ') : 'Nenhuma',
            Data: new Date().toLocaleString('pt-PT')
        };

        if (replyTo) {
          payload.email = replyTo; 
        }

        await fetch('https://api.web3forms.com/submit', {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Erro ao enviar email de notificação", err);
      }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedProjects: Project[] = data.map((p: any) => ({
          id: String(p.id),
          title: p.title,
          description: p.description,
          type: p.type,
          status: p.status,
          imageUrl: p.image_url,
          progress: p.progress,
          completionDate: p.completion_date,
          startDate: p.start_date,
          gallery: p.gallery || []
        }));
        setProjects(formattedProjects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      setProjects([]);
    }
  };

  const fetchReviews = async (isAdmin: boolean) => {
    try {
      let query = supabase
        .from('reviews')
        .select('*')
        .order('date', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        const formattedReviews: Review[] = data.map((r: any) => ({
          id: String(r.id),
          clientName: r.client_name,
          rating: r.rating,
          comment: r.comment,
          avatarUrl: r.avatar_url,
          date: r.date,
          approved: r.approved
        }));
        setReviews(formattedReviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      setReviews([]);
    }
  };

  const fetchBudgetRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('budget_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
          console.error("Erro Supabase Fetch Requests:", error);
          return;
      }

      if (data) {
        setBudgetRequests(data.map((r: any) => ({...r, id: String(r.id)})) as BudgetRequest[]);
      } else {
        setBudgetRequests([]);
      }
    } catch (error) {
      console.error('Erro fetchBudgetRequests:', error);
    }
  };

  const addProject = async (project: Project, imageFile?: File | null, galleryFiles?: File[]) => {
    try {
      let finalImageUrl = project.imageUrl;
      if (imageFile) {
        const url = await uploadImageToStorage(imageFile, 'siteDNL');
        if (url) finalImageUrl = url;
      }

      let finalGallery = project.gallery || [];
      if (galleryFiles && galleryFiles.length > 0) {
        const newGalleryItems: GalleryItem[] = [];
        for (const file of galleryFiles) {
           const url = await uploadImageToStorage(file, 'siteDNL');
           if (url) {
             newGalleryItems.push({ url, caption: '' });
           }
        }
        finalGallery = [...finalGallery, ...newGalleryItems];
      }

      const dbProject = {
        title: project.title,
        description: project.description,
        type: project.type,
        status: project.status,
        image_url: finalImageUrl,
        progress: project.progress,
        completion_date: project.completionDate,
        start_date: project.startDate,
        gallery: finalGallery
      };

      const { data, error } = await supabase.from('projects').insert([dbProject]).select();

      if (error) throw error;

      if (data && data.length > 0) {
        const newProject = { 
            ...project, 
            id: String(data[0].id), 
            imageUrl: finalImageUrl, 
            gallery: finalGallery 
        };
        setProjects(prev => [newProject, ...prev]);
        alert('Projeto criado com sucesso no banco de dados!');
      }
    } catch (error: any) {
      console.error('Erro ao adicionar projeto:', error);
      alert(`Erro ao salvar no banco: ${error.message}`);
    }
  };

  const updateProject = async (updatedProject: Project, imageFile?: File | null) => {
    try {
      let finalImageUrl = updatedProject.imageUrl;
      if (imageFile) {
        const url = await uploadImageToStorage(imageFile, 'siteDNL');
        if (url) finalImageUrl = url;
      }

      const dbProject = {
        title: updatedProject.title,
        description: updatedProject.description,
        type: updatedProject.type,
        status: updatedProject.status,
        image_url: finalImageUrl,
        progress: updatedProject.progress,
        completion_date: updatedProject.completionDate,
        start_date: updatedProject.startDate,
        gallery: updatedProject.gallery
      };

      const { error } = await supabase
        .from('projects')
        .update(dbProject)
        .eq('id', updatedProject.id);

      if (error) throw error;

      setProjects(prev => prev.map(p => p.id === updatedProject.id ? { ...updatedProject, imageUrl: finalImageUrl } : p));
      alert('Projeto atualizado!');
    } catch (error: any) {
      console.error('Erro ao atualizar projeto:', error);
      alert(`Erro ao atualizar: ${error.message}`);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      
      if (error) {
        console.error('Erro Supabase Delete:', error);
        alert(`Erro ao excluir no banco de dados: ${error.message}`);
        throw error;
      }
      
      setProjects(prev => prev.filter(p => String(p.id) !== String(id)));
      
    } catch (error: any) {
      console.error('Erro ao excluir projeto:', error);
      throw error;
    }
  };

  const addReview = async (review: Omit<Review, 'id' | 'approved'>): Promise<boolean> => {
    try {
      const dbReview = {
        client_name: review.clientName,
        rating: review.rating,
        comment: review.comment,
        avatar_url: review.avatarUrl || '',
        date: review.date,
        approved: false 
      };

      const { error } = await supabase.from('reviews').insert([dbReview]);

      if (error) {
        console.error('Erro ao inserir Review:', error);
        return false;
      }

      return true;
    } catch (e) {
      console.error('Exceção ao adicionar review:', e);
      return false;
    }
  };

  const createBudgetRequest = async (formData: ContactForm): Promise<boolean> => {
    try {
      const attachmentUrls: string[] = [];
      if (formData.attachments && formData.attachments.length > 0) {
        for (const file of formData.attachments) {
           const url = await uploadImageToStorage(file, 'siteDNL');
           if (url) attachmentUrls.push(url);
        }
      }

      let finalDescription = formData.description;
      if (attachmentUrls.length > 0) {
        finalDescription += "\n\n--- FOTOS ANEXADAS PELO CLIENTE ---\n" + attachmentUrls.join("\n");
      }

      const { error } = await supabase.from('budget_requests').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        description: finalDescription,
        status: 'pendente'
      }]);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Erro ao enviar pedido de orçamento:', error);
      return false;
    }
  };
  
  const deleteBudgetRequest = async (id: string) => {
    try {
      const { error } = await supabase.from('budget_requests').delete().eq('id', id);
      
      if (error) {
         console.error("Erro Supabase Delete Request:", error);
         alert(`Erro ao excluir do banco de dados: ${error.message}`);
         return;
      }
      
      setBudgetRequests(prev => prev.filter(r => String(r.id) !== String(id)));
    } catch (error) {
      console.error("Erro deleteBudgetRequest:", error);
      alert("Erro ao processar exclusão.");
    }
  };

  const deleteAllBudgetRequests = async () => {
    try {
      // Deletar todos os registros (Supabase exige um filtro ou confirmação dependendo da config)
      const { error } = await supabase.from('budget_requests').delete().neq('id', '0');
      
      if (error) {
        console.error("Erro ao limpar solicitações:", error);
        alert(`Erro ao limpar solicitações: ${error.message}`);
        return;
      }
      
      setBudgetRequests([]);
      alert("Todas as solicitações foram excluídas com sucesso.");
    } catch (error) {
      console.error("Erro deleteAllBudgetRequests:", error);
      alert("Erro ao processar exclusão em massa.");
    }
  };

  const toggleReviewApproval = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: newStatus } : r));

    const { error } = await supabase.from('reviews').update({ approved: newStatus }).eq('id', id);
    
    if (error) {
      console.error("Erro ao atualizar status da review:", error);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: currentStatus } : r));
    }
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) {
      setReviews(prev => prev.filter(r => String(r.id) !== String(id)));
    } else {
      console.error("Erro ao apagar review:", error);
      alert(`Erro ao excluir: ${error.message}`);
    }
  };

  const updateBudgetStatus = async (id: string, status: 'pendente' | 'contactado') => {
    const { error } = await supabase.from('budget_requests').update({ status }).eq('id', id);
    if (!error) {
      setBudgetRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
    }
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: !!data.session };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AppContext.Provider value={{
      projects,
      reviews,
      budgetRequests,
      settings,
      addProject,
      updateProject,
      deleteProject,
      addReview,
      toggleReviewApproval,
      deleteReview,
      createBudgetRequest,
      deleteBudgetRequest,
      deleteAllBudgetRequests,
      updateBudgetStatus,
      updateSettings,
      uploadImage: uploadImageToStorage,
      sendTestEmail,
      isAuthenticated,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};