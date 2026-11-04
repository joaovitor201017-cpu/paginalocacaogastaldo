import type { ImageMetadata } from 'astro';

// Imobiliárias parceiras citadas no PDF. Cidade e logo pendentes (logo só com autorização por escrito).
export interface Imobiliaria {
  nome: string;
  cidade: string | null;
  logo: ImageMetadata | null;
}

export const imobiliarias: Imobiliaria[] = [
  { nome: 'GRAE Imóveis', cidade: null, logo: null },
  { nome: 'Tectus', cidade: null, logo: null },
  { nome: 'Rosch', cidade: null, logo: null },
  { nome: 'Casari Imóveis', cidade: null, logo: null },
  { nome: 'BJ Flores Imóveis', cidade: null, logo: null },
  { nome: 'F&G Imóveis', cidade: null, logo: null },
  { nome: 'Otacília Imóveis', cidade: null, logo: null },
  { nome: 'Patrão Imóveis', cidade: null, logo: null },
];
