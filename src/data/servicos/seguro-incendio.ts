import type { Servico } from './tipos';

// Texto da página "Seguro Incêndio para Imóvel Alugado no ABC" (documento do João, 2026-11-03), com as regras
// do site: sede em Santo André; sem avaliações, logos de seguradoras e avisos internos; botões com "Simular".
// A faixa do imóvel comercial foi retirada a pedido do João.
// A pergunta "Em quanto tempo recebo a apólice?" fica de fora até o João informar o prazo real das parceiras.
// Coberturas e assistências variam por seguradora: conferir com as parceiras antes de liberar ao Google.
export const seguroIncendio: Servico = {
  slug: 'seguro-incendio',
  nome: 'Seguro Incêndio para Imóvel Alugado',
  rotuloTrilha: 'Seguro Incêndio',
  seo: {
    title: 'Seguro Incêndio para Imóvel Alugado | Cotação Rápida',
    description: 'Seguro incêndio para casa ou apartamento alugado no ABC. Faça a cotação grátis no WhatsApp e receba a apólice pronta para o contrato.',
  },
  mensagemWhatsApp: 'Olá! Preciso de um seguro incêndio para o meu aluguel.',

  topo: {
    h1: 'Seguro Incêndio para Locação',
    subtitulo: 'O contrato de aluguel pede seguro incêndio? Faça a cotação grátis, receba o valor no WhatsApp e tenha a apólice pronta!',
    botaoPrincipal: { rotulo: 'Simular meu seguro incêndio online', href: '/cotacao-seguro-incendio' },
    botaoSecundario: 'Falar com um corretor no WhatsApp',
    selos: ['Dentro das exigências da imobiliária', 'Apólice rápida', 'Assistência 24 horas', 'Casa, apartamento e imóvel comercial', 'Atendimento em todo o ABC Paulista'],
  },

  oQueE: {
    titulo: 'Seguro incêndio para aluguel: o que é e por que a imobiliária pede',
    paragrafos: [
      'O seguro incêndio protege o imóvel contra incêndio, raio e explosão. Na locação, ele garante que, se algo acontecer, o proprietário tenha como reconstruir o imóvel, e o inquilino não fique com essa conta.',
      'Por isso, quase todo contrato de aluguel exige o seguro incêndio. A imobiliária costuma informar o valor mínimo de cobertura e, muitas vezes, pede que o proprietário apareça na apólice como beneficiário.',
      // Resumo dos antigos quadros (quem paga, como funciona no contrato); os detalhes estão no FAQ
      'Na maioria dos contratos, quem paga é o inquilino. A apólice é feita para o endereço do imóvel, entregue à imobiliária na entrada e renovada a cada 12 meses.',
    ],
    link: { rotulo: 'Quem paga o seguro incêndio, inquilino ou proprietário', href: null },
  },

  comoFunciona: {
    titulo: 'Como contratar o seguro incêndio',
    passos: [
      { titulo: 'Veja o que o contrato pede', texto: 'Confira com a imobiliária o valor de cobertura e se o proprietário precisa ser beneficiário.' },
      { titulo: 'Peça a cotação', texto: 'Informe o CEP, o tipo de imóvel e o valor exigido.' },
      { titulo: 'Escolha o plano', texto: 'Só a cobertura exigida ou com coberturas extras.' },
      { titulo: 'Pague e receba a apólice', texto: 'Enviamos a apólice pronta para entregar à imobiliária.' },
    ],
    nota: 'O preço depende do valor de cobertura, do tipo de imóvel e das coberturas escolhidas.',
    links: [{ rotulo: 'Quanto custa o seguro incêndio', href: null }],
  },

  vantagens: {
    titulo: 'Vantagens do seguro incêndio para inquilino, proprietário e imobiliária',
    grupos: [
      {
        id: 'inquilinos',
        aba: 'Inquilino',
        titulo: 'Vantagens para o inquilino',
        itens: [
          { icone: 'documento', destaque: 'Exigência do contrato resolvida', texto: 'A apólice sai com o valor e as coberturas que a imobiliária pede' },
          { icone: 'escudo', destaque: 'Sem dívida em caso de incêndio', texto: 'Se o imóvel pegar fogo por acidente, você não fica com a conta da reconstrução' },
          { icone: 'cartao', destaque: 'Preço acessível', texto: 'É o seguro mais simples e barato para o aluguel, e pode ser parcelado' },
          { icone: 'ferramenta', destaque: 'Assistência 24 horas', texto: 'Chaveiro, encanador e eletricista incluídos em muitos planos' },
          { icone: 'raio', destaque: 'Proteção extra se quiser', texto: 'Dá para incluir danos elétricos, vendaval e danos a vizinhos' },
        ],
        botao: { rotulo: 'Fazer simulação', href: '/cotacao-seguro-incendio' },
      },
      {
        id: 'proprietarios',
        aba: 'Proprietário',
        titulo: 'Vantagens para o proprietário',
        itens: [
          { icone: 'casa', destaque: 'Patrimônio protegido', texto: 'O imóvel fica coberto contra incêndio, raio e explosão durante a locação' },
          { icone: 'moeda', destaque: 'Renda protegida', texto: 'Com a cobertura de perda de aluguel, você continua recebendo se o imóvel ficar inutilizável depois de um sinistro' },
          { icone: 'pessoa', destaque: 'Beneficiário na apólice', texto: 'O proprietário pode ser indicado como beneficiário da indenização, conforme a seguradora' },
          { icone: 'carteira', destaque: 'Sem custo, se o contrato prever', texto: 'Na maioria dos contratos, quem paga é o inquilino' },
        ],
        botao: { rotulo: 'Proteger meu imóvel', mensagemWhatsApp: 'Olá! Sou proprietário e preciso de um seguro incêndio para o meu imóvel alugado.' },
      },
      {
        id: 'imobiliarias',
        aba: 'Imobiliária',
        titulo: 'Vantagens para a imobiliária',
        itens: [
          { icone: 'chave', destaque: 'Contrato fechado mais rápido', texto: 'A apólice sai ágil, sem atrasar a entrega das chaves' },
          { icone: 'documento', destaque: 'Apólice dentro do padrão', texto: 'Emitimos com o valor mínimo e o beneficiário que você exige' },
          { icone: 'relogio', destaque: 'Controle de renovação', texto: 'Avisamos antes do vencimento para o imóvel não ficar descoberto' },
          { icone: 'pasta', destaque: 'Pacote completo', texto: 'Seguro incêndio e garantia locatícia com uma só corretora' },
          { icone: 'capelo', destaque: 'Suporte ativo e treinamento presencial', texto: 'Para o seu time de corretores' },
        ],
        botao: { rotulo: 'Quero ser imobiliária parceira', mensagemWhatsApp: 'Olá! Quero ser uma imobiliária parceira da Gastaldo.' },
      },
    ],
  },

  coberturas: {
    titulo: 'Coberturas do seguro incêndio',
    intro: 'O seguro incêndio tem uma cobertura básica e pode receber coberturas adicionais, conforme o que o contrato pedir e o que você quiser proteger.',
    tabelaTitulo: 'Cobertura básica e coberturas adicionais',
    linhas: [
      { icone: 'chama', cobertura: 'Incêndio, raio e explosão', tipo: 'Básica', paga: 'Danos ao imóvel causados por fogo, fumaça, raio ou explosão, até o valor contratado' },
      { icone: 'moeda', cobertura: 'Perda ou pagamento de aluguel', tipo: 'Adicional', paga: 'O aluguel enquanto o imóvel não pode ser usado depois de um sinistro coberto' },
      { icone: 'vento', cobertura: 'Vendaval, granizo e fumaça', tipo: 'Adicional', paga: 'Danos causados por ventos fortes, furacão, ciclone e granizo' },
      { icone: 'pessoa', cobertura: 'Responsabilidade civil familiar', tipo: 'Adicional', paga: 'Danos que você causar a vizinhos, como um vazamento no apartamento de baixo' },
      { icone: 'raio', cobertura: 'Danos elétricos', tipo: 'Adicional', paga: 'Aparelhos queimados por variação de energia ou raio' },
      { icone: 'casa', cobertura: 'Quebra de vidros', tipo: 'Adicional', paga: 'Vidros e box quebrados por acidente' },
    ],
    nota: 'Os valores de cada cobertura são escolhidos na contratação. Para atender o contrato, a cobertura de incêndio precisa ser de pelo menos o valor que a imobiliária pedir.',
    link: { rotulo: 'O que o seguro incêndio cobre', href: null },
  },

  assistencias: {
    titulo: 'Assistências 24 horas',
    intro: 'Muitos planos de seguro incêndio incluem assistência residencial, para resolver os problemas do dia a dia no imóvel alugado:',
    grupos: [
      {
        itens: [
          { rotulo: 'Chaveiro', texto: 'quando você perde ou quebra a chave' },
          { rotulo: 'Encanador', texto: 'para vazamentos em torneiras, registros e descargas' },
          { rotulo: 'Eletricista', texto: 'para chuveiro, tomadas e lâmpadas' },
          { rotulo: 'Vidraceiro', texto: 'para vidros quebrados' },
        ],
      },
    ],
    nota: 'A quantidade de usos por ano depende do plano e da seguradora.',
  },

  outras: { titulo: 'Outras garantias para o aluguel' },

  porQue: {
    titulo: 'Por que contratar com a Gastaldo Seguros',
    texto: 'Somos uma corretora especializada em seguros e garantias para o aluguel, com sede em Santo André. Trabalhamos com seguradoras parceiras e conhecemos as exigências das imobiliárias do ABC.',
    diferenciaisTitulo: 'Nossos diferenciais',
    diferenciais: [
      { icone: 'documento', destaque: 'Apólice certa na primeira vez', texto: 'Valor e beneficiário conforme o contrato, sem retrabalho.' },
      { icone: 'relogio', destaque: 'Agilidade', texto: 'A apólice sai rápido para não atrasar a entrega das chaves.' },
      { icone: 'mensagem', destaque: 'Lembrete de renovação', texto: 'O seguro não vence sem você saber.' },
      { icone: 'moeda', destaque: 'Sem custo extra', texto: 'A remuneração da corretora já está incluída no preço do seguro.' },
    ],
  },

  faq: {
    titulo: 'Perguntas frequentes sobre seguro incêndio',
    itens: [
      { pergunta: 'O seguro incêndio é obrigatório no aluguel?', resposta: 'A Lei do Inquilinato coloca o seguro contra incêndio como obrigação do proprietário, e quase todo contrato exige esse seguro. O contrato pode passar o custo para o inquilino.' },
      { pergunta: 'Quem paga o seguro incêndio?', resposta: 'Depende do contrato. A Lei do Inquilinato coloca o seguro contra incêndio como obrigação do proprietário, mas permite que o contrato diga o contrário. Na prática, a maioria dos contratos passa esse custo para o inquilino. Confira o que diz o seu contrato.' },
      { pergunta: 'Como funciona o seguro incêndio no contrato de aluguel?', resposta: 'A imobiliária informa o valor de cobertura exigido no contrato. O seguro é contratado para o endereço do imóvel alugado, e a apólice é enviada à imobiliária antes ou logo depois da entrega das chaves. Ele vale por 12 meses e deve ser renovado enquanto o contrato durar.' },
      { pergunta: 'Qual a diferença entre seguro incêndio e seguro residencial?', resposta: 'O seguro incêndio é o mais simples e o mais barato, feito para atender a exigência do contrato. O seguro residencial inclui o incêndio e acrescenta coberturas como roubo, danos elétricos e danos a vizinhos. Se você quer proteger também os seus bens, o residencial pode valer mais a pena.' },
      { pergunta: 'Qual valor de cobertura devo contratar?', resposta: 'O valor que o contrato ou a imobiliária pedir. Se não houver valor definido, o ideal é uma cobertura próxima ao custo de reconstrução do imóvel.' },
      { pergunta: 'Quanto tempo dura o seguro incêndio?', resposta: 'Em geral, 12 meses. Ele deve ser renovado enquanto o contrato de aluguel estiver valendo.' },
      { pergunta: 'O seguro incêndio cobre os meus móveis?', resposta: 'O foco do seguro incêndio no aluguel é o imóvel. Para proteger os seus bens, o indicado é o seguro residencial.' },
      { pergunta: 'Posso contratar com qualquer seguradora ou a imobiliária escolhe?', resposta: 'Em geral, você pode contratar com a seguradora que preferir, desde que a apólice atenda ao que o contrato exige. Confira as regras do seu contrato.' },
    ],
  },

  final: {
    titulo: 'Resolva o seguro do seu aluguel hoje',
    texto: 'Peça sua cotação de seguro incêndio e receba a apólice pronta para entregar à imobiliária.',
    botaoSecundario: 'Falar no WhatsApp',
  },
};
