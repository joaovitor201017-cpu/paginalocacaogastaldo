import type { ImageMetadata } from 'astro';
import fotoTitulo from '../assets/fotos/card-titulo-capitalizacao.jpg';
import fotoFianca from '../assets/fotos/card-seguro-fianca.jpg';
import fotoIncendio from '../assets/fotos/card-seguro-incendio.jpg';
import fotoResidencial from '../assets/fotos/card-seguro-residencial.jpg';

// As 4 soluções da Home, com as URLs definidas no PDF
export interface Solucao {
  titulo: string;
  texto: string;
  saibaMais: string;
  acao: { rotulo: 'Simular' | 'Cotar'; href: string };
  foto: string; // descrição da foto (usada na reserva enquanto não há imagem)
  imagem?: { src: ImageMetadata; alt: string };
}

export const solucoes: Solucao[] = [
  {
    titulo: 'Seguro Fiança',
    texto: 'A garantia que substitui o fiador e a caução. O proprietário recebe o aluguel garantido e você aluga sem pedir favor a ninguém.',
    saibaMais: '/seguro-fianca',
    acao: { rotulo: 'Simular', href: '/simulador-seguro-fianca' },
    foto: 'Família recebendo as chaves do novo imóvel',
    imagem: { src: fotoFianca, alt: 'Família recebendo as chaves do apartamento alugado com o corretor' },
  },
  {
    titulo: 'Título de Capitalização',
    texto: 'Alugue sem análise de crédito e sem comprovar renda. No fim do contrato, o valor da garantia volta para você.',
    saibaMais: '/titulo-de-capitalizacao',
    acao: { rotulo: 'Simular', href: '/simulador-titulo-de-capitalizacao-aluguel' },
    foto: 'Pessoa organizando caixas da mudança',
    imagem: { src: fotoTitulo, alt: 'Mulher etiquetando caixas da mudança no apartamento novo' },
  },
  {
    titulo: 'Seguro Incêndio',
    texto: 'A apólice que o contrato de aluguel pede, com o valor e o beneficiário que a imobiliária exige.',
    saibaMais: '/seguro-incendio',
    acao: { rotulo: 'Cotar', href: '/cotacao-seguro-incendio' },
    foto: 'Sala de apartamento alugado, iluminada',
    imagem: { src: fotoIncendio, alt: 'Cozinha de apartamento alugado à noite, com detector de fumaça no teto' },
  },
  {
    titulo: 'Seguro Residencial',
    texto: 'Proteção para a sua casa ou apartamento, próprio ou alugado, com assistência 24 horas.',
    saibaMais: '/seguro-residencial',
    acao: { rotulo: 'Cotar', href: '/cotacao-seguro-residencial' },
    foto: 'Casal tranquilo em casa',
    imagem: { src: fotoResidencial, alt: 'Casal tomando café e conversando no sofá de casa' },
  },
];
