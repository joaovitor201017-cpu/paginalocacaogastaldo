// Cidades do ABC atendidas (ordem do PDF). `href` fica null até existirem as páginas de cidade.
export interface Cidade {
  nome: string;
  sede?: boolean;
  href: string | null;
}

export const cidades: Cidade[] = [
  { nome: 'Santo André', sede: true, href: null },
  { nome: 'São Bernardo do Campo', href: null },
  { nome: 'São Caetano do Sul', href: null },
  { nome: 'Diadema', href: null },
  { nome: 'Mauá', href: null },
  { nome: 'Ribeirão Pires', href: null },
  { nome: 'Rio Grande da Serra', href: null },
];
