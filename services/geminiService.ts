import { GoogleGenAI } from "@google/genai";
import { ProjectType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateProjectDescription = async (title: string, type: ProjectType): Promise<string> => {
  if (!ai) {
    console.warn("API Key not found. Returning mock description.");
    return "Descrição gerada automaticamente não disponível (configure a API Key).";
  }

  try {
    const prompt = `Escreva uma descrição profissional, atraente e concisa (máximo 30 palavras) para um projeto de portfólio de uma empresa de reformas chamada DNL Remodelações. 
    Título do Projeto: ${title}
    Tipo: ${type}
    Idioma: Português.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Sem descrição gerada.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Erro ao gerar descrição.";
  }
};
