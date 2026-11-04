// As 4 soluções da Home, com as URLs definidas no PDF
export interface Solucao {
  titulo: string;
  texto: string;
  saibaMais: string;
  acao: { rotulo: 'Simular' | 'Cotar'; href: string };
  foto: string; // descrição da foto que o João vai enviar
}

export const solucoes: Solucao[] = [
  {
    titulo: 'Seguro Fiança',
    texto: 'A garantia que substitui o fiador e a caução. O proprietário recebe o aluguel garantido e você aluga sem pedir favor a ninguém.',
    saibaMais: '/seguro-fianca',
    acao: { rotulo: 'Simular', href: '/simulador-seguro-fianca' },
    foto: 'Família recebendo as chaves do novo imóvel',
  },
  {
    titulo: 'Título de Capitalização',
    texto: 'Alugue sem análise de crédito e sem comprovar renda. No fim do contrato, o valor da garantia volta para você.',
    saibaMais: '/titulo-de-capitalizacao',
    acao: { rotulo: 'Simular', href: '/simulador-titulo-de-capitalizacao-aluguel' },
    foto: 'Pessoa organizando caixas da mudança',
  },
  {
    titulo: 'Seguro Incêndio',
    texto: 'A apólice que o contrato de aluguel pede, com o valor e o beneficiário que a imobiliária exige.',
    saibaMais: '/seguro-incendio',
    acao: { rotulo: 'Cotar', href: '/cotacao-seguro-incendio' },
    foto: 'Sala de apartamento alugado, iluminada',
  },
  {
    titulo: 'Seguro Residencial',
    texto: 'Proteção para a sua casa ou apartamento, próprio ou alugado, com assistência 24 horas.',
    saibaMais: '/seguro-residencial',
    acao: { rotulo: 'Cotar', href: '/cotacao-seguro-residencial' },
    foto: 'Casal tranquilo em casa',
  },
];
