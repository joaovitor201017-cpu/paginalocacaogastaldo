import type { ImageMetadata } from 'astro';

// Fotos dos treinamentos presenciais nas imobiliárias (o João envia as imagens).
// Para usar uma foto: salve em src/assets/treinamentos/ e importe no campo `foto`.
export interface Treinamento {
  legenda: string;
  foto: ImageMetadata | null;
}

export const treinamentos: Treinamento[] = [
  { legenda: 'Treinamento na imobiliária', foto: null },
  { legenda: 'Treinamento na imobiliária', foto: null },
  { legenda: 'Treinamento na imobiliária', foto: null },
  { legenda: 'Treinamento na imobiliária', foto: null },
];
