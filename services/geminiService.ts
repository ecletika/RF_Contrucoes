import { GoogleGenAI } from "@google/genai";
import { ProjectType } from "../types";

// Função para obter a chave do ambiente ou localmente se necessário
const getApiKey = () => {
  try {
    // Tenta obter do process.env (injetado no index.html)
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Environment access error", e);
  }
  return '';
};

// Instância padrão (fallback)
let defaultAi: GoogleGenAI | null = null;
const envKey = getApiKey();

if (envKey) {
  try {
    defaultAi = new GoogleGenAI({ apiKey: envKey });
  } catch (e) {
    console.error("Erro ao inicializar GoogleGenAI padrão", e);
  }
}

export const generateProjectDescription = async (title: string, type: ProjectType, dynamicApiKey?: string): Promise<string> => {
  // Usa a chave dinâmica (do banco) se fornecida, senão tenta a do ambiente
  let ai = defaultAi;
  
  if (dynamicApiKey) {
    try {
      ai = new GoogleGenAI({ apiKey: dynamicApiKey });
    } catch (e) {
      console.error("Erro ao inicializar IA com chave dinâmica", e);
    }
  }

  // Se mesmo assim não tiver instância (ex: chave inválida ou vazia)
  if (!ai) {
    // Tentativa final de criar com a chave do ambiente se o defaultAi falhou na inicialização
    const fallbackKey = getApiKey();
    if (fallbackKey) {
        ai = new GoogleGenAI({ apiKey: fallbackKey });
    } else {
        console.warn("API Key not found or invalid configuration.");
        return "Descrição automática indisponível. Por favor, configure a API Key no painel Admin.";
    }
  }

  try {
    const prompt = `Escreva uma descrição profissional, atraente e concisa (máximo 40 palavras) para um projeto de portfólio de uma empresa de reformas chamada DNL Remodelações. 
    Título do Projeto: ${title}
    Tipo: ${type}
    Idioma: Português de Portugal.`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // Modelo estável e rápido compatível com a chave padrão
      contents: prompt,
    });

    return response.text?.trim() || "Sem descrição gerada.";
  } catch (error: any) {
    console.error("Error generating description:", error);
    return `Erro ao gerar descrição: ${error.message || 'Verifique a API Key'}`;
  }
};