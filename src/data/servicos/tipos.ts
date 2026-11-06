import type { Icone } from '../../lib/icones';
import type { GrupoBeneficios } from '../beneficios';

// Estrutura de uma página de serviço. Cada serviço (Seguro Fiança, Título de Capitalização,
// Seguro Incêndio, Seguro Residencial) é um arquivo de dados com este formato.
// Seções marcadas com "?" só existem em alguns serviços; a página monta o que houver.

// Link para um post do blog: fica oculto enquanto o post não existir (href null)
export interface LinkBlog { rotulo: string; href: string | null }
export interface Acao { rotulo: string; href: string }
export interface Passo { titulo: string; texto: string }

export interface Servico {
  slug: string;
  nome: string; // nome do serviço no schema (serviceType)
  rotuloTrilha: string;
  seo: { title: string; description: string };
  mensagemWhatsApp: string;
  topo: { h1: string; subtitulo: string; botaoPrincipal: Acao; botaoSecundario: string; selos: string[] };
  // extras: quadros com H3 abaixo do texto (podem ter uma lista numerada)
  oQueE: { titulo: string; paragrafos: string[]; link: LinkBlog; extras?: { titulo: string; texto?: string; lista?: string[]; link?: LinkBlog }[] };
  // Passo a passo (Seguro Fiança: "Como funciona"; Residencial: "Como contratar")
  comoFunciona?: { titulo: string; intro?: string; passos: Passo[]; nota?: string; links?: LinkBlog[] };
  coberturas: {
    titulo: string;
    intro: string;
    tabelaTitulo: string;
    linhas: { icone: Icone; cobertura: string; tipo: string; paga: string; limite?: string }[];
    nota: string;
    assistencias?: { titulo: string; texto: string };
    link: LinkBlog;
  };
  // Seção própria de assistências 24h (Residencial)
  assistencias?: { titulo: string; intro: string; grupos: { titulo?: string; itens: { rotulo: string; texto?: string }[] }[]; nota: string };
  vantagens: { titulo: string; intro?: string; grupos: GrupoBeneficios[] };
  pagamento?: { titulo: string; texto: string; botao: Acao; link: LinkBlog };
  quemPode?: { titulo: string; texto: string; documentosTitulo: string; documentos: { rotulo: string; texto: string }[] };
  outras: { titulo: string; intro?: string; link?: LinkBlog }; // os cards vêm das soluções da Home
  porQue: {
    titulo: string;
    texto: string;
    diferenciaisTitulo: string;
    diferenciais: { destaque: string; texto: string; icone: Icone }[];
  };
  faq: { titulo: string; itens: { pergunta: string; resposta: string }[] };
  final: { titulo: string; texto: string; botaoSecundario: string };
}
