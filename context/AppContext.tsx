import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Review, ProjectStatus, ContactForm, BudgetRequest, AppSettings } from '../types';
import { INITIAL_PROJECTS, INITIAL_REVIEWS } from '../constants';

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
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>({
    id: '1',
    notification_email: 'contacto@rfconstrucoes.pt',
    logo_url: undefined
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImage = async (file: File): Promise<string | null> => {
    return URL.createObjectURL(file);
  };

  const addProject = async (project: Project, imageFile?: File | null) => {
    let imageUrl = project.imageUrl;
    if (imageFile) imageUrl = URL.createObjectURL(imageFile);
    const newProject = { ...project, id: Date.now().toString(), imageUrl };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = async (updatedProject: Project, imageFile?: File | null) => {
    let imageUrl = updatedProject.imageUrl;
    if (imageFile) imageUrl = URL.createObjectURL(imageFile);
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? { ...updatedProject, imageUrl } : p));
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addReview = async (review: Omit<Review, 'id' | 'approved'>): Promise<boolean> => {
    const newReview: Review = { ...review, id: Date.now().toString(), approved: false };
    setReviews(prev => [newReview, ...prev]);
    return true;
  };

  const toggleReviewApproval = async (id: string, currentStatus: boolean) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: !currentStatus } : r));
  };

  const deleteReview = async (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const createBudgetRequest = async (formData: ContactForm): Promise<boolean> => {
    const newRequest: BudgetRequest = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: formData.type,
      description: formData.description,
      status: 'pendente',
      created_at: new Date().toISOString()
    };
    setBudgetRequests(prev => [newRequest, ...prev]);
    return true;
  };

  const deleteBudgetRequest = async (id: string) => {
    setBudgetRequests(prev => prev.filter(r => r.id !== id));
  };

  const deleteAllBudgetRequests = async () => {
    setBudgetRequests([]);
  };

  const updateBudgetStatus = async (id: string, status: 'pendente' | 'contactado') => {
    setBudgetRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const updateSettings = async (email: string, logoUrl?: string): Promise<boolean> => {
    setSettings(prev => prev ? { ...prev, notification_email: email, logo_url: logoUrl || prev.logo_url } : null);
    return true;
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    if (email === 'admin@rf.pt' && password === 'admin') {
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Credenciais: admin@rf.pt / admin" };
  };

  const logout = async () => {
    setIsAuthenticated(false);
  };

  const sendTestEmail = async (email: string) => {
    console.log(`E-mail de teste para: ${email}`);
    return true;
  };

  return (
    <AppContext.Provider value={{
      projects, reviews, budgetRequests, settings, addProject, updateProject, deleteProject,
      addReview, toggleReviewApproval, deleteReview, createBudgetRequest,
      deleteBudgetRequest, deleteAllBudgetRequests, updateBudgetStatus, updateSettings,
      uploadImage, sendTestEmail, isAuthenticated, login, logout, isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};