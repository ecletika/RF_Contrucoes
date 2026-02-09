import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectType } from '../types';
import { Send, Phone, Mail, Check, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const { createBudgetRequest } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createBudgetRequest(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-48 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-gray-400 font-['Montserrat'] font-bold uppercase text-[10px] tracking-[0.4em]">Orçamentos</span>
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mt-4 mb-6">Iniciar Projeto</h1>
          <div className="h-px w-20 bg-gray-200 mx-auto"></div>
        </div>

        <div className="bg-white border border-gray-50 shadow-sm overflow-hidden flex flex-col lg:flex-row">
          <div className="bg-gray-900 text-white p-16 lg:w-2/5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-12">Escritório Central</h3>
              <div className="space-y-12">
                <div className="flex items-start space-x-6">
                  <Phone className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <span className="block text-[10px] font-['Montserrat'] font-bold uppercase text-gray-500 tracking-widest mb-1">Linha Direta</span>
                    <span className="text-xl font-['Lora']">+351 933 318 169</span>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <Mail className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <span className="block text-[10px] font-['Montserrat'] font-bold uppercase text-gray-500 tracking-widest mb-1">E-mail Técnico</span>
                    <span className="text-xl font-['Lora']">contacto@rfconstrucoes.pt</span>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <MapPin className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <span className="block text-[10px] font-['Montserrat'] font-bold uppercase text-gray-500 tracking-widest mb-1">Morada Fiscal</span>
                    <span className="text-lg font-['Lora'] leading-snug">Rua Domingos da Cunha, 7-11B<br/>2725-606 Sintra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-16 lg:w-3/5">
            {submitted ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check className="h-10 w-10 text-gray-900" />
                </div>
                <h3 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">Pedido Registado</h3>
                <p className="text-gray-500 font-['Lora'] italic">A nossa equipa técnica entrará em contacto num prazo de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input type="text" name="name" placeholder="Nome Completo" value={formData.name} onChange={handleChange} className="w-full p-4 border-b border-gray-100 outline-none focus:border-gray-900 transition-colors font-['Open_Sans'] text-sm" required />
                  <input type="tel" name="phone" placeholder="Contacto Telefónico" value={formData.phone} onChange={handleChange} className="w-full p-4 border-b border-gray-100 outline-none focus:border-gray-900 transition-colors font-['Open_Sans'] text-sm" required />
                </div>
                <input type="email" name="email" placeholder="E-mail de Contacto" value={formData.email} onChange={handleChange} className="w-full p-4 border-b border-gray-100 outline-none focus:border-gray-900 transition-colors font-['Open_Sans'] text-sm" required />
                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-4 border-b border-gray-100 outline-none focus:border-gray-900 transition-colors font-['Open_Sans'] text-sm bg-transparent" required>
                  <option value="">Natureza do Projeto...</option>
                  {Object.values(ProjectType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <textarea name="description" placeholder="Descreva brevemente a sua visão para o projeto..." value={formData.description} onChange={handleChange} rows={4} className="w-full p-4 border-b border-gray-100 outline-none focus:border-gray-900 transition-colors font-['Open_Sans'] text-sm resize-none" required />
                <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white font-['Montserrat'] font-bold uppercase tracking-[0.2em] py-5 text-xs hover:bg-black transition-all flex items-center justify-center">
                  {isSubmitting ? 'A Processar...' : 'Enviar Pedido de Orçamento'}
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