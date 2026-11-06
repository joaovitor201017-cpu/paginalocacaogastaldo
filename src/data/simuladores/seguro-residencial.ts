// Textos da página /cotacao-seguro-residencial (aba 02 do documento do João).
// Fora até o João informar: pergunta e texto do prazo de retorno. "Cotar pelo WhatsApp" virou "Simular pelo WhatsApp".

export const cotacaoResidencial = {
  slug: 'cotacao-seguro-residencial',
  seo: {
    title: 'Cotação de Seguro Residencial Online | Compare Seguradoras',
    description: 'Faça a cotação do seu seguro residencial em 2 minutos. Compare seguradoras, escolha as coberturas e receba as propostas no WhatsApp. Casa ou apartamento no ABC.',
  },
  mensagemWhatsApp: 'Olá! Quero fazer a cotação de um seguro residencial.',
  h1: 'Cotação de Seguro Residencial: compare seguradoras em 2 minutos',
  subtitulo: 'Conte sobre o seu imóvel e o que você quer proteger. Montamos as propostas com as seguradoras parceiras e enviamos lado a lado no seu WhatsApp.',
  selos: ['Grátis e sem compromisso', 'Várias seguradoras', 'Casa e apartamento', 'Próprio ou alugado'],

  // Passo 2: o que proteger (a Assistência 24h já vem marcada e não conta para o plano sugerido)
  protecoes: [
    { valor: 'Danos elétricos', rotulo: 'Aparelhos contra queima por energia', ajuda: 'Danos elétricos' },
    { valor: 'Roubo e furto', rotulo: 'Meus bens contra roubo', ajuda: 'Roubo e furto com arrombamento' },
    { valor: 'RC familiar', rotulo: 'Danos que eu causar a vizinhos', ajuda: 'Responsabilidade civil familiar' },
    { valor: 'Vazamento e alagamento', rotulo: 'Vazamentos e alagamento', ajuda: 'Vazamento de tubulações e alagamento' },
    { valor: 'Vendaval e granizo', rotulo: 'Vendaval e granizo', ajuda: '' },
    { valor: 'Perda de aluguel', rotulo: 'Aluguel se a casa ficar inutilizável', ajuda: 'Perda ou pagamento de aluguel' },
    { valor: 'Assistência 24h', rotulo: 'Assistência 24h (chaveiro, encanador, eletricista)', ajuda: 'Já vem marcada', marcada: true },
  ],
  faixasBens: ['até R$ 20 mil', 'R$ 20 a 50 mil', 'R$ 50 a 100 mil', 'mais de R$ 100 mil', 'Não sei'],

  planos: [
    { nome: 'Essencial', coberturas: ['Incêndio', 'Danos elétricos', 'Responsabilidade civil familiar', 'Assistência 24h'] },
    { nome: 'Completo', coberturas: ['Incêndio', 'Danos elétricos', 'Responsabilidade civil familiar', 'Assistência 24h', 'Roubo e furto', 'Vazamento e alagamento'] },
    { nome: 'Total', coberturas: ['Incêndio', 'Danos elétricos', 'Responsabilidade civil familiar', 'Assistência 24h', 'Roubo e furto', 'Vazamento e alagamento', 'Vendaval', 'Quebra de vidros', 'Perda de aluguel'] },
  ],
  textoResultado: 'Vamos montar esse plano com as seguradoras parceiras e enviar as propostas com preço no seu WhatsApp.',

  comoFunciona: {
    titulo: 'Como funciona a cotação de seguro residencial',
    passos: [
      { titulo: 'Conte sobre o imóvel', texto: 'CEP, tipo e se é próprio ou alugado.' },
      { titulo: 'Escolha o que proteger', texto: 'Marque as coberturas que importam para você.' },
      { titulo: 'Receba as propostas', texto: 'Cotamos com as seguradoras parceiras e enviamos lado a lado.' },
      { titulo: 'Contrate', texto: 'Escolha a melhor opção e receba a apólice.' },
    ],
  },

  preco: {
    titulo: 'O que muda o preço do seguro residencial',
    texto: 'O preço depende do CEP, do tipo de imóvel, das coberturas e dos valores segurados. Por isso, a cotação com várias seguradoras faz diferença.',
  },
  corretora: {
    titulo: 'Por que cotar com uma corretora',
    itens: [
      'Várias seguradoras de uma vez, sem preencher vários sites.',
      'Sem custo extra: a remuneração da corretora já está incluída no preço.',
      'Ajuda na escolha das coberturas, para não pagar pelo que não precisa.',
      'Apoio no sinistro do início ao fim.',
    ],
  },

  abc: {
    titulo: 'Cotação de seguro residencial no ABC Paulista',
    texto: 'Atendemos casas e apartamentos em São Bernardo do Campo, Santo André, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra.',
    link: { rotulo: 'Conheça o Seguro Residencial', href: '/seguro-residencial' },
  },

  faq: {
    titulo: 'Perguntas frequentes sobre a cotação',
    itens: [
      { pergunta: 'A cotação de seguro residencial é grátis?', resposta: 'Sim, sem custo e sem compromisso de contratação.' },
      { pergunta: 'Preciso informar o CPF para cotar?', resposta: 'Não para a primeira cotação. Alguns dados pessoais são pedidos na hora de contratar.' },
      { pergunta: 'Quem mora de aluguel pode cotar?', resposta: 'Sim. O inquilino pode segurar os próprios bens e os danos que causar a vizinhos.' },
      { pergunta: 'O seguro começa a valer quando?', resposta: 'Depois da contratação e da emissão da apólice, conforme a data de início de vigência informada pela seguradora.' },
    ],
  },

  final: {
    titulo: 'Prefere cotar com uma pessoa?',
    texto: 'Fazemos a cotação com você pelo WhatsApp e explicamos cada cobertura.',
    botao: 'Simular pelo WhatsApp',
  },
};
