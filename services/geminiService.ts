import { ProjectType } from "../types";

/**
 * MOCK: Generates a professional description for a project.
 */
export const generateProjectDescription = async (title: string, type: ProjectType): Promise<string> => {
  // Simula um delay de rede
  await new Promise(resolve => setTimeout(resolve, 800));

  const mocks: Record<string, string> = {
    [ProjectType.RESIDENTIAL]: `Remodelação residencial de alto padrão focada em otimização de espaço e luminosidade natural. Projeto executado com acabamentos de luxo pela RF Construções.`,
    [ProjectType.COMMERCIAL]: `Adaptação de espaço comercial moderno, aliando funcionalidade corporativa e estética sofisticada para proporcionar uma experiência única aos clientes com a assinatura RF.`,
    [ProjectType.KITCHEN]: `Cozinha gourmet totalmente renovada pela RF, apresentando design minimalista, ergonomia avançada e materiais resistentes de primeira linha.`,
    [ProjectType.BATHROOM]: `Transformação de casa de banho num refúgio de bem-estar, com revestimentos cerâmicos premium e soluções de iluminação ambiente RF.`,
    [ProjectType.EXTERIOR]: `Reabilitação de fachadas e espaços exteriores, garantindo isolamento térmico superior e valorização estética duradoura do imóvel com o selo RF.`
  };

  return mocks[type] || `Projeto exclusivo de ${title.toLowerCase()} com o rigor técnico e a visão arquitetónica da equipa RF Construções.`;
};