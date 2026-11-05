import type { ImageMetadata } from 'astro';
import casari from '../assets/treinamentos/treinamento-casari.png';
import t2 from '../assets/treinamentos/treinamento-2.jpg';
import t3 from '../assets/treinamentos/treinamento-3.jpg';
import t4 from '../assets/treinamentos/treinamento-4.jpg';
import t6 from '../assets/treinamentos/treinamento-6.jpg';

// Fotos reais dos treinamentos presenciais nas imobiliárias (enviadas pelo João).
// `posicao` ajusta o enquadramento no recorte 4:3 (object-position), útil nas fotos verticais.
// Quando souber a imobiliária de cada foto, troque a legenda genérica pelo nome e cidade.
export interface Treinamento {
  legenda: string;
  foto: ImageMetadata | null;
  posicao?: string;
}

const generica = 'Treinamento em imobiliária parceira';

export const treinamentos: Treinamento[] = [
  { legenda: 'Treinamento na Casari Imóveis', foto: casari, posicao: '50% 65%' },
  { legenda: generica, foto: t2 },
  { legenda: generica, foto: t3 },
  { legenda: generica, foto: t4 },
  { legenda: generica, foto: t6, posicao: '50% 75%' },
];
