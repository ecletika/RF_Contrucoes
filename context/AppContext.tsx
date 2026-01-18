import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Review, ProjectStatus, ContactForm, BudgetRequest, AppSettings } from '../types';
import { INITIAL_PROJECTS, INITIAL_REVIEWS } from '../constants';
import { supabase } from '../services/supabaseClient';

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AppContextType {
  projects: Project[];
  reviews: Review[];
  budgetRequests: BudgetRequest[];
  settings: AppSettings | null;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
  createBudgetRequest: (data: ContactForm) => Promise<boolean>;
  updateBudgetStatus: (id: string, status: 'pendente' | 'contactado') => Promise<void>;
  updateSettings: (key: string) => Promise<boolean>;
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
    // 1. Buscar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      fetchProjects();
      fetchReviews();
      fetchSettings();
      if (session) {
        fetchBudgetRequests();
      }
    });

    // 2. Ouvir mudanças de estado (Login/Logout/Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      // Se necessário, recarregar dados quando o usuário logar
      if (session) {
        fetchProjects();
        fetchBudgetRequests();
      } else {
        setBudgetRequests([]); // Limpar dados sensíveis ao deslogar
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .single();
      
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Erro ao buscar configurações (pode estar vazio):', error);
    }
  };

  const updateSettings = async (key: string): Promise<boolean> => {
    // Nota: Estamos usando o campo 'notification_email' do banco para salvar a API Key do Web3Forms
    try {
      if (settings?.id) {
        // Atualizar existente
        const { error } = await supabase
          .from('app_settings')
          .update({ notification_email: key })
          .eq('id', settings.id);

        if (error) throw error;
        setSettings(prev => prev ? { ...prev, notification_email: key } : null);
      } else {
        // Criar novo se não existir
        const { data, error } = await supabase
          .from('app_settings')
          .insert([{ notification_email: key }])
          .select()
          .single();
        
        if (error) throw error;
        if (data) setSettings(data);
      }
      return true;
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error);
      return false;
    }
  };

  const sendTestEmail = async (accessKey: string): Promise<boolean> => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Teste de Configuração - DNL Remodelações`,
          message: "Este é um e-mail de teste. Se você recebeu isso, a configuração do Web3Forms está 100% correta!",
          from_name: "DNL Admin"
        })
      });
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Erro ao enviar email de teste:", error);
      return false;
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
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
        if (projects.length === 0) setProjects(INITIAL_PROJECTS);
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      if (projects.length === 0) setProjects(INITIAL_PROJECTS);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedReviews: Review[] = data.map((r: any) => ({
          id: r.id,
          clientName: r.client_name,
          rating: r.rating,
          comment: r.comment,
          avatarUrl: r.avatar_url,
          date: r.date
        }));
        setReviews(formattedReviews);
      } else {
         if (reviews.length === 0) setReviews(INITIAL_REVIEWS);
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      if (reviews.length === 0) setReviews(INITIAL_REVIEWS);
    }
  };

  const fetchBudgetRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('budget_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar orçamentos:', error);
        return;
      }

      if (data) {
        setBudgetRequests(data as BudgetRequest[]);
      }
    } catch (error) {
      console.error('Erro fetchBudgetRequests:', error);
    }
  };

  const addProject = async (project: Project) => {
    const dbProject = {
      title: project.title,
      description: project.description,
      type: project.type,
      status: project.status,
      image_url: project.imageUrl,
      progress: project.progress,
      completion_date: project.completionDate,
      start_date: project.startDate,
      gallery: project.gallery
    };

    const { data, error } = await supabase.from('projects').insert([dbProject]).select();

    if (error) {
      console.error('Erro ao adicionar projeto:', error);
      alert(`Erro ao salvar: ${error.message}`);
      return;
    }

    if (data) {
      const newProject = { ...project, id: data[0].id };
      setProjects(prev => [newProject, ...prev]);
    }
  };

  const updateProject = async (updatedProject: Project) => {
    const dbProject = {
      title: updatedProject.title,
      description: updatedProject.description,
      type: updatedProject.type,
      status: updatedProject.status,
      image_url: updatedProject.imageUrl,
      progress: updatedProject.progress,
      completion_date: updatedProject.completionDate,
      start_date: updatedProject.startDate,
      gallery: updatedProject.gallery
    };

    const { error } = await supabase
      .from('projects')
      .update(dbProject)
      .eq('id', updatedProject.id);

    if (error) {
      console.error('Erro ao atualizar projeto:', error);
      alert(`Erro ao atualizar: ${error.message}`);
      return;
    }

    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      console.error('Erro ao excluir projeto:', error);
      alert(`Erro ao excluir: ${error.message}`);
      return;
    }
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addReview = async (review: Review) => {
    const dbReview = {
      client_name: review.clientName,
      rating: review.rating,
      comment: review.comment,
      avatar_url: review.avatarUrl,
      date: review.date
    };

    const { data, error } = await supabase.from('reviews').insert([dbReview]).select();

    if (error) {
      console.error('Erro ao adicionar avaliação:', error);
      return;
    }

    if (data) {
      setReviews(prev => [review, ...prev]);
    }
  };

  const createBudgetRequest = async (formData: ContactForm): Promise<boolean> => {
    try {
      // 1. Salvar no Supabase
      const { error } = await supabase.from('budget_requests').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        description: formData.description,
        status: 'pendente'
      }]);

      if (error) throw error;

      // 2. Enviar E-mail via Web3Forms (Muito mais confiável que FormSubmit)
      // O campo notification_email agora guarda a API Key
      const accessKey = settings?.notification_email; 
      
      if (accessKey && accessKey.length > 10) {
        try {
          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: accessKey,
              subject: `Novo Orçamento: ${formData.name} (${formData.type})`,
              from_name: "DNL Site",
              message: `
                Novo pedido de orçamento recebido:
                
                Nome: ${formData.name}
                Email: ${formData.email}
                Telefone: ${formData.phone}
                Tipo de Obra: ${formData.type}
                Descrição: ${formData.description}
                
                Acesse o painel administrativo para mais detalhes.
              `
            })
          });
        } catch (emailError) {
          console.warn("Falha ao enviar notificação por email:", emailError);
          // Não retornamos false aqui pois o dado foi salvo no banco com sucesso
        }
      }

      return true;
    } catch (error) {
      console.error('Erro ao enviar pedido de orçamento:', error);
      return false;
    }
  };

  const updateBudgetStatus = async (id: string, status: 'pendente' | 'contactado') => {
    try {
      const { error } = await supabase
        .from('budget_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBudgetRequests(prev => prev.map(req => 
        req.id === id ? { ...req, status } : req
      ));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: !!data.session };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erro desconhecido' };
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
      createBudgetRequest,
      updateBudgetStatus,
      updateSettings,
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