// Dados estruturados (JSON-LD) da Home e das páginas de serviço. Campos pendentes (null) são omitidos, nunca publicados vazios.
interface SiteSchema {
  nome: string;
  dominio: string | null;
  telefone: string | null;
  email: string | null;
  endereco: { logradouro: string; bairro: string; cidade: string; uf: string; cep: string } | null;
  horarioSchema?: string | null;
  cidadeSede: string;
}

type Obj = Record<string, unknown>;

// Remove chaves com null/undefined
const limpar = (o: Obj): Obj => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined));

type Faq = { pergunta: string; resposta: string }[];

// A corretora (dados locais, iguais ao Google Meu Negócio)
function agencia(site: SiteSchema, cidades: { nome: string }[]): Obj {
  const url = site.dominio ?? undefined;
  return limpar({
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: site.nome,
    url,
    telephone: site.telefone,
    email: site.email,
    openingHours: site.horarioSchema,
    address: site.endereco
      ? {
          '@type': 'PostalAddress',
          streetAddress: `${site.endereco.logradouro} - ${site.endereco.bairro}`,
          addressLocality: site.endereco.cidade,
          addressRegion: site.endereco.uf,
          postalCode: site.endereco.cep,
          addressCountry: 'BR',
        }
      : null,
    areaServed: cidades.map((c) => ({ '@type': 'City', name: c.nome })),
  });
}

function faqPage(faq: Faq): Obj {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.pergunta, acceptedAnswer: { '@type': 'Answer', text: f.resposta } })),
  };
}

export function schemaHome(site: SiteSchema, faq: Faq, cidades: { nome: string }[]): Obj[] {
  const url = site.dominio ?? undefined;
  const website = limpar({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.nome, url, inLanguage: 'pt-BR' });

  const corretora = agencia(site, cidades);
  return faq.length === 0 ? [corretora, website] : [corretora, website, faqPage(faq)];
}

// Trilha (BreadcrumbList) a partir de uma lista de níveis { nome, caminho }
function trilhaSchema(site: SiteSchema, niveis: { nome: string; caminho: string }[]): Obj {
  const abs = (caminho: string) => (site.dominio ? new URL(caminho, site.dominio).href : undefined);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: niveis.map((n, i) => limpar({ '@type': 'ListItem', position: i + 1, name: n.nome, item: abs(n.caminho) })),
  };
}

// Página de simulador: corretora + aplicação web gratuita + FAQ + trilha
export function schemaSimulador(
  site: SiteSchema,
  app: { nome: string; descricao: string; caminho: string },
  faq: Faq,
  cidades: { nome: string }[],
  trilha: { nome: string; caminho: string }[],
): Obj[] {
  const url = site.dominio ? new URL(app.caminho, site.dominio).href : undefined;
  const webApp = limpar({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: app.nome,
    description: app.descricao,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    inLanguage: 'pt-BR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    provider: limpar({ '@type': 'InsuranceAgency', name: site.nome, telephone: site.telefone }),
  });
  return [agencia(site, cidades), webApp, faqPage(faq), trilhaSchema(site, trilha)];
}

// Página de serviço: corretora + serviço + FAQ + trilha (Início > serviço)
export function schemaServico(
  site: SiteSchema,
  servico: { nome: string; descricao: string; caminho: string; rotulo: string },
  faq: Faq,
  cidades: { nome: string }[],
): Obj[] {
  const abs = (caminho: string) => (site.dominio ? new URL(caminho, site.dominio).href : undefined);
  const corretora = agencia(site, cidades);
  const service = limpar({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: servico.nome,
    serviceType: servico.nome,
    description: servico.descricao,
    url: abs(servico.caminho),
    provider: limpar({ '@type': 'InsuranceAgency', name: site.nome, telephone: site.telefone }),
    areaServed: cidades.map((c) => ({ '@type': 'City', name: c.nome })),
  });
  const trilha = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      limpar({ '@type': 'ListItem', position: 1, name: 'Início', item: abs('/') }),
      limpar({ '@type': 'ListItem', position: 2, name: servico.rotulo, item: abs(servico.caminho) }),
    ],
  };
  return [corretora, service, faqPage(faq), trilha];
}
