import type { Icone } from '../../lib/icones';
import type { GrupoBeneficios } from '../beneficios';

// Estrutura de uma página de serviço. Cada serviço (Seguro Fiança, Título de Capitalização,
// Seguro Incêndio, Seguro Residencial) é um arquivo de dados com este formato.

// Link para um post do blog: fica oculto enquanto o post não existir (href null)
export interface LinkBlog { rotulo: string; href: string | null }
export interface Acao { rotulo: string; href: string }

export interface Servico {
  slug: string;
  nome: string; // nome do serviço no schema (serviceType)
  rotuloTrilha: string;
  seo: { title: string; description: string };
  mensagemWhatsApp: string;
  topo: { h1: string; subtitulo: string; botaoPrincipal: Acao; botaoSecundario: string; selos: string[] };
  oQueE: { titulo: string; paragrafos: string[]; link: LinkBlog };
  comoFunciona: { titulo: string; intro: string; passos: { titulo: string; texto: string }[] };
  coberturas: {
    titulo: string;
    intro: string;
    tabelaTitulo: string;
    linhas: { cobertura: string; tipo: string; paga: string; limite: string }[];
    nota: string;
    assistencias: { titulo: string; texto: string };
    link: LinkBlog;
  };
  vantagens: { titulo: string; intro: string; grupos: GrupoBeneficios[] };
  pagamento: { titulo: string; texto: string; botao: Acao; link: LinkBlog };
  quemPode: { titulo: string; texto: string; documentosTitulo: string; documentos: { rotulo: string; texto: string }[] };
  outras: { titulo: string; intro: string; itens: { titulo: string; texto: string; href: string }[]; link: LinkBlog };
  porQue: {
    titulo: string;
    texto: string;
    diferenciaisTitulo: string;
    diferenciais: { destaque: string; texto: string; icone: Icone }[];
    imobiliarias: { titulo: string; texto: string; botao: string };
  };
  cidades: { titulo: string; texto: string };
  faq: { titulo: string; itens: { pergunta: string; resposta: string }[] };
  final: { titulo: string; texto: string; botaoSecundario: string };
}
