import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Send, CheckCircle, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ReviewForm: React.FC = () => {
  const { addReview } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    clientName: '',
    rating: 5,
    comment: ''
  });
  
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.comment) return;

    setIsSubmitting(true);
    setErrorMsg('');
    
    const success = await addReview({
      clientName: formData.clientName,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString(),
      avatarUrl: '' 
    });

    setIsSubmitting(false);
    
    if (success) {
      setSubmitted(true);
      setTimeout(() => navigate('/'), 6000);
    } else {
      setErrorMsg("Ocorreu um erro ao processar a avaliação no protótipo.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-4">
        <div className="bg-white p-16 max-w-xl w-full text-center border border-gray-100 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle className="h-10 w-10 text-gray-900" />
          </div>
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">Agradecemos o Feedback</h2>
          <p className="text-gray-500 font-['Lora'] italic text-lg mb-10 leading-relaxed">
            A sua avaliação foi submetida para moderação e ajudará a RF Construções a manter o seu padrão de excelência.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-5 bg-gray-900 text-white font-['Montserrat'] font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
          >
            Voltar à Página Principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-48 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
           <Link to="/" className="inline-flex items-center text-gray-400 hover:text-gray-900 transition-colors text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest mb-8">
              <ArrowLeft size={14} className="mr-3" /> Cancelar Avaliação
           </Link>
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">A Sua Experiência</h1>
          <p className="text-gray-500 font-['Lora'] italic text-lg leading-relaxed">
            Partilhe a sua visão sobre o rigor e a qualidade técnica dos nossos serviços.
          </p>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-12 space-y-10">
            {errorMsg && (
                <div className="bg-red-50 text-red-500 p-4 text-xs font-bold uppercase tracking-widest border-l-4 border-red-500">
                    {errorMsg}
                </div>
            )}
            
            <div>
              <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Nome do Cliente</label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                className="w-full p-4 border-b border-gray-100 outline-none focus:border-gray-900 transition-colors font-['Open_Sans'] text-sm"
                placeholder="Ex: João Silva"
              />
            </div>

            <div>
              <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Nível de Satisfação</label>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hoverRating || formData.rating)
                          ? 'text-gray-900 fill-gray-900'
                          : 'text-gray-100'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-['Montserrat'] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Testemunho Técnico</label>
              <textarea
                required
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="w-full p-4 border border-gray-50 outline-none focus:border-gray-900 transition-colors font-['Open_Sans'] text-sm resize-none bg-gray-50/30"
                placeholder="Descreva a execução da obra..."
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white font-['Montserrat'] font-bold uppercase tracking-[0.3em] py-5 text-xs hover:bg-black transition-all">
              {isSubmitting ? 'A Processar...' : 'Submeter Avaliação'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;