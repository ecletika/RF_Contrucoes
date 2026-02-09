import { Project, ProjectStatus, ProjectType, Review } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Renovação Apartamento Centro',
    description: 'Reforma completa de apartamento de 120m², incluindo demolição de paredes, novo piso e iluminação moderna pela equipa RF Construções.',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.COMPLETED,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    progress: 100,
    completionDate: '2023-11-15',
    gallery: []
  },
  {
    id: '2',
    title: 'Cozinha Gourmet Moderna',
    description: 'Instalação de ilha central em mármore, armários planejados e eletrodomésticos embutidos com o rigor técnico RF.',
    type: ProjectType.KITCHEN,
    status: ProjectStatus.COMPLETED,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    progress: 100,
    completionDate: '2024-01-20',
    gallery: []
  },
  {
    id: '3',
    title: 'Reabilitação Moradia Cascais',
    description: 'Projeto de reestruturação total de moradia unifamiliar. Atualmente na fase de execução de novas redes de águas, eletricidade e reforço estrutural de lajes.',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=800&auto=format&fit=crop',
    progress: 45,
    startDate: '2024-01-10',
    completionDate: '2024-08-15',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800', caption: 'Fase de Alvenaria' },
      { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800', caption: 'Estrutura de Betão' }
    ]
  },
  {
    id: '4',
    title: 'Escritório Hub Tecnológico',
    description: 'Adaptação de espaço comercial para escritório open-space. Fase de montagem de divisórias em pladur e instalação de sistemas HVAC.',
    type: ProjectType.COMMERCIAL,
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    progress: 72,
    startDate: '2023-12-05',
    completionDate: '2024-06-20',
    gallery: []
  },
  {
    id: '5',
    title: 'Penthouse Parque das Nações',
    description: 'Remodelação integral de cobertura. Fase de demolições controladas e preparação de infraestruturas de domótica.',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
    progress: 18,
    startDate: '2024-03-01',
    completionDate: '2024-11-30',
    gallery: []
  },
  {
    id: '6',
    title: 'Restaurante Concept Porto',
    description: 'Criação de novo conceito gastronómico. Atualmente em fase de revestimentos cerâmicos e instalação de cozinha industrial.',
    type: ProjectType.COMMERCIAL,
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop',
    progress: 60,
    startDate: '2024-02-15',
    completionDate: '2024-07-10',
    gallery: []
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    clientName: 'Ana Pereira',
    rating: 5,
    comment: 'Serviço impecável! A equipa da RF Construções foi pontual, limpa e entregou a obra antes do prazo. Recomendo muito.',
    avatarUrl: 'https://picsum.photos/id/64/100/100',
    date: '2024-01-25',
    approved: true
  },
  {
    id: '2',
    clientName: 'Carlos Mendes',
    rating: 5,
    comment: 'Transformaram minha cozinha completamente. O acabamento da RF é de primeira qualidade.',
    avatarUrl: 'https://picsum.photos/id/91/100/100',
    date: '2024-02-10',
    approved: true
  }
];