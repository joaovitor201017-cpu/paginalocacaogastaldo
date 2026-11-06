// Textos da página /cotacao-seguro-incendio (aba 03 do documento do João).
// Fora até o João informar: selo e faixa de preço ("a partir de R$ X") e a pergunta do prazo da apólice.

export const cotacaoIncendio = {
  slug: 'cotacao-seguro-incendio',
  seo: {
    title: 'Cotação de Seguro Incêndio para Aluguel | Apólice Rápida',
    description: 'Cote o seguro incêndio que a imobiliária pede em 1 minuto. Informe o valor exigido no contrato e receba a cotação no WhatsApp. Atendimento no ABC Paulista.',
  },
  mensagemWhatsApp: 'Olá! Preciso de um seguro incêndio para o meu aluguel.',
  h1: 'Cotação de Seguro Incêndio para Aluguel: a apólice que a imobiliária pede',
  subtitulo: 'Informe o valor que o contrato exige e receba a cotação no WhatsApp. Emitimos a apólice pronta para entregar à imobiliária.',
  selos: ['Grátis', 'Dentro da exigência do contrato', 'Apólice rápida'],

  extras: ['Perda de aluguel', 'Vendaval', 'Danos elétricos', 'RC familiar'],
  prazos: ['Hoje', 'Esta semana', 'Ainda vou alugar'],
  resultado: {
    texto: 'Um especialista vai enviar a cotação no seu WhatsApp. Se precisar da apólice hoje, clique no botão abaixo.',
    botao: 'Preciso da apólice hoje',
  },

  comoFunciona: {
    titulo: 'Como funciona a cotação do seguro incêndio',
    passos: [
      { titulo: 'Veja o contrato', texto: 'Procure a cláusula de seguro e anote o valor de cobertura exigido.' },
      { titulo: 'Preencha o formulário', texto: 'Leva cerca de 1 minuto.' },
      { titulo: 'Receba a cotação', texto: 'Enviamos o valor no WhatsApp.' },
      { titulo: 'Contrate e receba a apólice', texto: 'Pronta para entregar à imobiliária.' },
    ],
  },

  textos: [
    { id: 'sem-valor', titulo: 'Não sabe o valor de cobertura?', texto: 'Sem problema. Deixe o campo em branco e informe o nome da imobiliária. Nós confirmamos o valor exigido antes de emitir. Se o contrato não definir um valor, indicamos uma cobertura próxima ao custo de reconstrução do imóvel.' },
    { id: 'quanto-custa', titulo: 'Quanto custa o seguro incêndio', texto: 'O preço depende principalmente do valor de cobertura, do tipo de imóvel e das coberturas extras.' },
  ],

  abc: {
    titulo: 'Cotação de seguro incêndio no ABC Paulista',
    texto: 'Atendemos inquilinos, proprietários e imobiliárias em São Bernardo do Campo, Santo André, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra.',
    link: { rotulo: 'Conheça o Seguro Incêndio', href: '/seguro-incendio' },
  },

  faq: {
    titulo: 'Perguntas frequentes sobre a cotação',
    itens: [
      { pergunta: 'A cotação é grátis?', resposta: 'Sim, sem custo e sem compromisso.' },
      { pergunta: 'A apólice vai sair no padrão que a imobiliária pede?', resposta: 'Sim. Emitimos com o valor de cobertura e o beneficiário que o contrato exige.' },
      { pergunta: 'Posso usar essa apólice no lugar do seguro oferecido pela imobiliária?', resposta: 'Muitas imobiliárias aceitam, desde que a cobertura seja igual ou maior que a exigida. Confirme antes com a imobiliária.' },
      { pergunta: 'Serve para imóvel comercial?', resposta: 'Sim. Escolha "Comercial" no tipo de imóvel.' },
    ],
  },

  final: {
    titulo: 'Precisa com urgência?',
    texto: 'Fale direto com a nossa equipe e resolva a apólice do seu aluguel.',
    botao: 'Falar no WhatsApp agora',
  },
};
