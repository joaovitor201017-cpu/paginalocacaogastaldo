import type { ImageMetadata } from 'astro';
import grae from '../assets/logos/grae.png';
import graeCinza from '../assets/logos/grae-cinza.png';
import tectus from '../assets/logos/tectus.png';
import tectusCinza from '../assets/logos/tectus-cinza.png';
import rosch from '../assets/logos/rosch.png';
import roschCinza from '../assets/logos/rosch-cinza.png';
import casari from '../assets/logos/casari.png';
import casariCinza from '../assets/logos/casari-cinza.png';
import bjFlores from '../assets/logos/bj-flores.png';
import bjFloresCinza from '../assets/logos/bj-flores-cinza.png';
import fg from '../assets/logos/fg.png';
import fgCinza from '../assets/logos/fg-cinza.png';
import otacilia from '../assets/logos/otacilia.png';
import otaciliaCinza from '../assets/logos/otacilia-cinza.png';
import patrao from '../assets/logos/patrao.png';
import patraoCinza from '../assets/logos/patrao-cinza.png';

// Imobiliárias parceiras. `logo` é a versão colorida (cards da seção de parceiras);
// `logoCinza` é a versão em cinza escuro com fundo transparente (carrossel do topo).
// As versões foram geradas a partir dos PNGs originais enviados pelo João.
export interface Imobiliaria {
  nome: string;
  cidade: string | null;
  logo: ImageMetadata | null;
  logoCinza: ImageMetadata | null;
}

export const imobiliarias: Imobiliaria[] = [
  { nome: 'GRAE Imóveis', cidade: null, logo: grae, logoCinza: graeCinza },
  { nome: 'Tectus', cidade: null, logo: tectus, logoCinza: tectusCinza },
  { nome: 'Rosch', cidade: null, logo: rosch, logoCinza: roschCinza },
  { nome: 'Casari Imóveis', cidade: null, logo: casari, logoCinza: casariCinza },
  { nome: 'BJ Flores Imóveis', cidade: null, logo: bjFlores, logoCinza: bjFloresCinza },
  { nome: 'F&G Imóveis', cidade: null, logo: fg, logoCinza: fgCinza },
  { nome: 'Otacília Imóveis', cidade: null, logo: otacilia, logoCinza: otaciliaCinza },
  { nome: 'Patrão Imóveis', cidade: null, logo: patrao, logoCinza: patraoCinza },
];
