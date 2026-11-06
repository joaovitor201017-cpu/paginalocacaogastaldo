// Textos da página /simulador-seguro-fianca (documento do João, 2026-11-02).
// Sem preço: o simulador mostra quanto cada plano protege; o valor do seguro sai na cotação oficial.
// A pergunta "Em quanto tempo recebo a cotação?" fica de fora até o João informar o prazo.

export type Cobertura = 'aluguel' | 'condominio' | 'iptu' | 'consumo' | 'danos' | 'pintura' | 'rescisao';

export const simuladorFianca = {
  slug: 'simulador-seguro-fianca',
  seo: {
    title: 'Simulador de Seguro Fiança: Simule Grátis em 1 Minuto',
    description: 'Simule seu seguro fiança grátis e veja na hora quanto o seu aluguel fica protegido. Cotação no WhatsApp com corretora especializada no ABC Paulista.',
  },
  mensagemWhatsApp: 'Olá! Quero simular um seguro fiança.',
  h1: 'Simulador de Seguro Fiança: simule grátis em 1 minuto',
  subtitulo: 'Informe o valor do aluguel e veja na hora quanto o seu contrato fica protegido. Depois, receba a cotação oficial no WhatsApp, sem compromisso.',
  selos: ['Grátis e sem compromisso', 'Resultado na hora', 'Imóveis residenciais e comerciais', 'Corretora especializada no ABC Paulista'],

  // Linhas de cobertura mostradas nos cards dos planos (fórmulas em src/lib/simulador.ts)
  coberturas: [
    { chave: 'aluguel', rotulo: 'Aluguel e multa por atraso', referencia: 'até 30x o aluguel' },
    { chave: 'condominio', rotulo: 'Condomínio', referencia: 'até 30x o valor informado' },
    { chave: 'iptu', rotulo: 'IPTU', referencia: 'até 30x o valor informado' },
    { chave: 'consumo', rotulo: 'Água, luz e gás', referencia: 'até 6x o valor declarado' },
    { chave: 'danos', rotulo: 'Danos ao imóvel', referencia: 'até 6x o aluguel' },
    { chave: 'pintura', rotulo: 'Pintura interna e externa', referencia: 'até 3x o aluguel' },
    { chave: 'rescisao', rotulo: 'Multa por rescisão', referencia: 'até 3x o aluguel' },
  ] as { chave: Cobertura; rotulo: string; referencia: string }[],

  planos: [
    { nome: 'Essencial', paraQuem: 'Quem precisa só da garantia do aluguel', inclui: ['aluguel'] as Cobertura[], destaque: false },
    { nome: 'Completo', paraQuem: 'O mais pedido pelas imobiliárias', inclui: ['aluguel', 'condominio', 'iptu', 'consumo'] as Cobertura[], destaque: true },
    { nome: 'Total', paraQuem: 'Proteção máxima para o proprietário', inclui: ['aluguel', 'condominio', 'iptu', 'consumo', 'danos', 'pintura', 'rescisao'] as Cobertura[], destaque: false },
  ],
  aviso: 'Os limites mostrados são uma referência e podem mudar conforme a seguradora e a análise de crédito. O valor do seguro e as condições finais são enviados na cotação oficial.',

  comoFunciona: {
    titulo: 'Como funciona a simulação do seguro fiança',
    intro: 'A simulação leva cerca de 1 minuto e não tem custo nem compromisso. Você informa os valores do imóvel, vê na hora a proteção de cada plano e recebe a cotação oficial no WhatsApp.',
    passos: [
      { titulo: 'Informe os valores', texto: 'Aluguel, condomínio, IPTU, tipo de imóvel e cidade.' },
      { titulo: 'Veja a proteção', texto: 'O simulador mostra quanto cada plano cobre, em reais.' },
      { titulo: 'Receba a cotação', texto: 'Nossa equipe envia o valor do seguro no WhatsApp, depois da análise de crédito.' },
      { titulo: 'Contrate', texto: 'Com a aprovação, você paga e recebe a apólice para anexar ao contrato de aluguel.' },
    ],
  },

  textos: [
    { id: 'o-que-precisa', titulo: 'O que você precisa para simular', texto: 'Para simular, basta saber o valor do aluguel. Condomínio e IPTU deixam o resultado mais completo. Documentos só são pedidos depois, na hora da análise de crédito.' },
    { id: 'o-que-muda', titulo: 'O que muda o valor do seguro fiança', texto: 'O preço final depende do valor do aluguel e dos encargos, da análise de crédito do inquilino e das coberturas escolhidas. Por isso, a cotação oficial só sai depois da análise.' },
  ],

  qualPlano: {
    titulo: 'Qual plano escolher',
    itens: [
      { rotulo: 'Essencial', texto: 'quando o proprietário exige só a garantia do aluguel.' },
      { rotulo: 'Completo', texto: 'quando o contrato pede também condomínio, IPTU e contas. É o mais pedido pelas imobiliárias.' },
      { rotulo: 'Total', texto: 'quando o proprietário quer proteção contra danos, pintura e saída antecipada.' },
    ],
    nota: 'Não sabe qual escolher? Pergunte à imobiliária quais coberturas são obrigatórias no contrato, ou fale com a gente.',
  },

  perfis: {
    titulo: 'Simulação de seguro fiança para inquilinos, proprietários e imobiliárias',
    itens: [
      { rotulo: 'Inquilino', icone: 'pessoa', texto: 'Descubra a proteção antes de fechar o aluguel e chegue à imobiliária com a garantia resolvida.' },
      { rotulo: 'Proprietário', icone: 'casa', texto: 'Veja quanto do seu aluguel fica garantido e escolha as coberturas que quer exigir.' },
      { rotulo: 'Imobiliária', icone: 'pasta', texto: 'Simule para os seus clientes e conte com o nosso suporte na análise e na emissão.' },
    ] as { rotulo: string; icone: 'pessoa' | 'casa' | 'pasta'; texto: string }[],
  },

  abc: {
    titulo: 'Simulador de seguro fiança no ABC Paulista',
    texto: 'Atendemos imóveis em Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra. A cotação é feita com seguradoras parceiras, e uma corretora acompanha você até a assinatura do contrato.',
    link: { rotulo: 'Conheça o Seguro Fiança', href: '/seguro-fianca' },
  },

  faq: {
    titulo: 'Perguntas frequentes sobre a simulação',
    itens: [
      { pergunta: 'A simulação do seguro fiança é grátis?', resposta: 'Sim. A simulação não tem custo nem compromisso de contratação.' },
      { pergunta: 'A simulação consulta meu CPF?', resposta: 'Não. O simulador só usa os valores do imóvel. A análise de crédito acontece depois, apenas se você quiser seguir com a cotação.' },
      { pergunta: 'O valor mostrado no simulador é o preço final?', resposta: 'O simulador mostra quanto cada plano protege. O preço do seguro sai na cotação oficial, depois da análise de crédito.' },
      { pergunta: 'Negativado pode simular o seguro fiança?', resposta: 'Pode. A simulação é livre, e a análise considera vários fatores além da restrição no nome.' },
      { pergunta: 'Posso simular para imóvel comercial?', resposta: 'Sim. Escolha "Comercial" no primeiro passo do simulador.' },
      { pergunta: 'Sou proprietário. Posso simular para o meu imóvel?', resposta: 'Pode. Escolha "Proprietário" no segundo passo, e mostramos como oferecer o seguro fiança ao seu inquilino.' },
    ],
  },

  final: {
    titulo: 'Prefere falar com uma pessoa?',
    texto: 'Nossa equipe faz a simulação com você pelo WhatsApp e tira todas as dúvidas sobre o seguro fiança.',
    botao: 'Simular pelo WhatsApp',
  },
};
