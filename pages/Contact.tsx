import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectType } from '../types';
import { Send, Phone, Mail, Check, AlertCircle, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const { createBudgetRequest } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    description: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (formData.name.trim().length < 3) {
      newErrors.name = 'O nome deve ter pelo menos 3 caracteres.';
    }

    // Phone validation (Flexible regex)
    const phoneRegex = /^[+]?[(]?[0-9]{2,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/;
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!phoneRegex.test(formData.phone) || digitsOnly.length < 9) {
      newErrors.phone = 'Insira um número de telefone válido (mín. 9 dígitos).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Insira um endereço de e-mail válido.';
    }

    // Type validation
    if (!formData.type) {
      newErrors.type = 'Por favor, selecione o tipo de obra.';
    }

    // Description validation
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Por favor, forneça mais detalhes sobre o projeto (mín. 10 caracteres).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      const success = await createBudgetRequest(formData);
      
      setIsSubmitting(false);
      
      if (success) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', type: '', description: '' });
        setErrors({});
      } else {
        alert("Ocorreu um erro ao enviar seu pedido. Por favor, tente novamente ou contate-nos por telefone.");
      }
    }
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full px-4 py-2 border rounded-lg outline-none transition-colors";
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50`;
    }
    return `${baseClass} border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Solicite um Orçamento</h1>
          <p className="text-gray-600">Conte-nos sobre o seu projeto. Responderemos o mais breve possível.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Contact Info Side */}
          <div className="bg-slate-950 text-white p-8 md:w-1/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Informações</h3>
              <p className="mb-6 text-sm text-gray-300">
                Preencha o formulário ou entre em contato direto pelos nossos canais.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-amber-400 h-5 w-5" />
                  <span>+351 933 318 169</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-amber-400 h-5 w-5" />
                  <span>contacto@dnlremodelacoes.pt</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0">
               <div className="w-16 h-1 bg-amber-400 mb-4"></div>
               <p className="text-xs text-gray-400">Atendemos toda a região de Lisboa e Vale do Tejo.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:w-2/3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pedido Recebido!</h3>
                <p className="text-gray-600">Obrigado pelo contato. Nossa equipe analisará seu projeto e entrará em contato em breve.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Enviar novo pedido
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={getInputClass('name')}
                      placeholder="Seu nome"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={getInputClass('phone')}
                      placeholder="(+351) 9XX XXX XXX"
                      disabled={isSubmitting}
                    />
                     {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={getInputClass('email')}
                      placeholder="seu@email.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" /> {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Obra</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={getInputClass('type')}
                      disabled={isSubmitting}
                    >
                      <option value="">Selecione...</option>
                      {Object.values(ProjectType).map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" /> {errors.type}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Projeto</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={getInputClass('description')}
                    placeholder="Descreva brevemente o que deseja fazer..."
                    disabled={isSubmitting}
                  ></textarea>
                   {errors.description && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" /> {errors.description}
                      </p>
                    )}
                </div>
                
                <div className="text-sm text-gray-500">
                  * Opção de anexar fotos será solicitada via e-mail após o primeiro contato.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-300 transition-colors flex items-center justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Enviar Solicitação
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;