// Dados estruturados (JSON-LD) da Home. Campos pendentes (null) são omitidos, nunca publicados vazios.
interface SiteSchema {
  nome: string;
  dominio: string | null;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  horario: string | null;
  cidadeSede: string;
}

type Obj = Record<string, unknown>;

// Remove chaves com null/undefined
const limpar = (o: Obj): Obj => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined));

export function schemaHome(
  site: SiteSchema,
  faq: { pergunta: string; resposta: string }[],
  cidades: { nome: string }[],
): Obj[] {
  const url = site.dominio ?? undefined;

  const agencia = limpar({
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: site.nome,
    url,
    telephone: site.telefone,
    email: site.email,
    openingHours: site.horario,
    address: site.endereco
      ? { '@type': 'PostalAddress', streetAddress: site.endereco, addressLocality: site.cidadeSede, addressRegion: 'SP', addressCountry: 'BR' }
      : null,
    areaServed: cidades.map((c) => ({ '@type': 'City', name: c.nome })),
  });

  const website = limpar({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.nome, url, inLanguage: 'pt-BR' });

  if (faq.length === 0) return [agencia, website];

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.pergunta, acceptedAnswer: { '@type': 'Answer', text: f.resposta } })),
  };
  return [agencia, website, faqPage];
}
