// Textos da página /simulador-titulo-de-capitalizacao-aluguel (aba 01 do documento do João).
// A pergunta "Em quanto tempo recebo a cotação?" fica de fora até o João informar o prazo.

export const simuladorTitulo = {
  slug: 'simulador-titulo-de-capitalizacao-aluguel',
  seo: {
    title: 'Simulador de Título de Capitalização para Aluguel | Grátis',
    description: 'Simule o valor do título de capitalização para o seu aluguel, veja o parcelamento e receba a cotação no WhatsApp. Sem análise de crédito, no ABC Paulista.',
  },
  mensagemWhatsApp: 'Olá! Quero simular um título de capitalização para o meu aluguel.',
  h1: 'Simulador de Título de Capitalização para Aluguel',
  subtitulo: 'Descubra em 1 minuto quanto vai ser o título de capitalização para o seu aluguel. Sem análise de crédito e com o valor de volta no fim do contrato.',
  selos: ['Grátis', 'Sem consulta ao CPF', 'Resultado na hora', 'Atendimento no ABC'],

  // Quantos aluguéis a imobiliária pediu (sem resposta: mostra 6x e 12x)
  opcoesVezes: [6, 8, 10, 12],
  vezesSemResposta: [6, 12],

  resultado: {
    fixos: [
      'Esse valor não é um gasto: ele fica guardado e volta para você no fim do contrato, se não houver dívidas.',
      'Durante o contrato, você concorre a sorteios mensais.',
      'Parcelamento sujeito às condições de cada empresa de capitalização. Em algumas, é possível parcelar em até 18x no cartão.',
    ],
    comparacao: { texto: 'Achou alto? Com o seguro fiança, você não precisa desse valor na entrada.', botao: 'Simular seguro fiança', href: '/simulador-seguro-fianca' },
    botao: 'Receber a cotação oficial no WhatsApp',
  },

  comoFunciona: {
    titulo: 'Como funciona a simulação do título de capitalização',
    intro: 'O valor do título é combinado com o proprietário ou a imobiliária, normalmente como um número de aluguéis com encargos. O simulador faz essa conta para você e mostra uma opção de parcelamento. Depois, nossa equipe envia a cotação oficial no WhatsApp.',
    passos: [
      { titulo: 'Informe o aluguel, o condomínio e o IPTU' },
      { titulo: 'Escolha quantos aluguéis a imobiliária pediu' },
      { titulo: 'Veja o valor do título e do parcelamento' },
      { titulo: 'Receba a cotação e contrate sem análise de crédito' },
    ],
  },

  textos: [
    { id: 'quantos-alugueis', titulo: 'Quantos aluguéis o título de capitalização costuma ter?', texto: 'Não existe um valor fixo na lei. No mercado, é comum ver pedidos entre 6 e 12 vezes o aluguel com encargos. Quem define é o proprietário ou a imobiliária.', link: { rotulo: 'Como funciona o título de capitalização para aluguel', href: '/titulo-de-capitalizacao#como-funciona' } },
    { id: 'o-que-precisa', titulo: 'O que você precisa para contratar', texto: 'Não há análise de crédito nem comprovação de renda. Em geral, bastam os documentos pessoais e os dados do imóvel e do proprietário.', link: { rotulo: 'Título de Capitalização para Aluguel', href: '/titulo-de-capitalizacao' } },
  ],

  abc: {
    titulo: 'Simulador de título de capitalização no ABC Paulista',
    texto: 'Atendemos inquilinos, proprietários e imobiliárias em São Bernardo do Campo, Santo André, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra.',
  },

  faq: {
    titulo: 'Perguntas frequentes sobre a simulação',
    itens: [
      { pergunta: 'A simulação é grátis?', resposta: 'Sim, sem custo e sem compromisso.' },
      { pergunta: 'A simulação consulta meu CPF?', resposta: 'Não. E a contratação do título também não tem análise de crédito.' },
      { pergunta: 'O valor do simulador é o valor final?', resposta: 'O valor do título é o que você combinar com a imobiliária. As condições de pagamento e resgate saem na cotação oficial.' },
      { pergunta: 'Negativado pode simular e contratar?', resposta: 'Pode. Como não há análise de crédito, a restrição no nome não impede.' },
    ],
  },

  final: {
    titulo: 'Prefere falar com uma pessoa?',
    texto: 'Fazemos a simulação com você pelo WhatsApp.',
    botao: 'Simular pelo WhatsApp',
  },
};
