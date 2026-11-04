// Números de autoridade. `valor: null` = pendente: use só números reais.
export interface Numero {
  valor: string | null;
  rotulo: string;
  complemento?: { valor: string | null; texto: string };
}

export const numerosHero: Numero[] = [
  { valor: null, rotulo: 'imobiliárias parceiras no ABC' },
  { valor: null, rotulo: 'contratos de aluguel garantidos' },
  { valor: null, rotulo: 'anos de mercado' },
  { valor: null, rotulo: 'no Google com', complemento: { valor: null, texto: 'avaliações' } },
];

export const numerosParceria: Numero[] = [
  { valor: null, rotulo: 'imobiliárias parceiras' },
  { valor: null, rotulo: 'contratos de aluguel garantidos' },
  { valor: null, rotulo: 'corretores de imóveis treinados' },
  { valor: null, rotulo: 'cidades atendidas no ABC' },
];
