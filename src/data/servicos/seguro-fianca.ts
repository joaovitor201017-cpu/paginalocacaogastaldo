import type { Servico } from './tipos';

// Texto da página "Seguro Fiança Locatícia no ABC Paulista" (documento do João, 2026-11-01),
// com as regras da Home: sede em Santo André, sem Google, depoimentos, números e SUSEP.
// Os limites da tabela são exemplo da Porto Seguro (nov/2026): conferir antes de liberar ao Google.
export const seguroFianca: Servico = {
  slug: 'seguro-fianca',
  nome: 'Seguro Fiança Locatícia',
  rotuloTrilha: 'Seguro Fiança',
  seo: {
    title: 'Seguro Fiança Locatícia: Alugue sem Fiador e sem Caução',
    description: 'Seguro fiança locatícia no ABC Paulista com corretora especializada. Alugue sem fiador e sem caução. Simule grátis e receba a cotação no WhatsApp.',
  },
  mensagemWhatsApp: 'Olá! Quero fazer uma cotação de seguro fiança.',

  topo: {
    h1: 'Seguro Fiança Locatícia: alugue sem fiador e sem caução',
    subtitulo: 'Alugue seu imóvel sem fiador e sem caução. Simule grátis, receba a cotação no WhatsApp e tenha a apólice pronta para entregar à imobiliária.',
    botaoPrincipal: { rotulo: 'Simular meu seguro fiança online', href: '/simulador-seguro-fianca' },
    botaoSecundario: 'Falar com um corretor no WhatsApp',
    selos: ['Análise online e rápida', 'Imóveis residenciais e comerciais', 'Atendimento em todo o ABC Paulista'],
  },

  oQueE: {
    titulo: 'O que é o seguro fiança locatícia?',
    paragrafos: [
      'O seguro fiança locatícia é uma garantia de aluguel que substitui o fiador e o depósito caução. Se o inquilino deixar de pagar o aluguel, a seguradora paga o proprietário, dentro dos limites contratados.',
      'O inquilino contrata e paga o seguro. O proprietário é o segurado e quem recebe a indenização. Por isso o seguro fiança é bem aceito por proprietários e imobiliárias.',
      'Ele vale para imóveis residenciais e comerciais. Além do aluguel, pode cobrir condomínio, IPTU, água, luz, gás, danos ao imóvel, pintura e multa por rescisão.',
    ],
    link: { rotulo: 'Guia completo do seguro fiança', href: null },
  },

  comoFunciona: {
    titulo: 'Como funciona o seguro fiança para aluguel',
    intro: 'O seguro fiança funciona em 5 passos, quase todos online. Com a nossa corretora, você tem alguém acompanhando cada etapa.',
    passos: [
      { titulo: 'Simulação', texto: 'Você informa o valor do aluguel, do condomínio e do IPTU no nosso simulador ou no WhatsApp.' },
      { titulo: 'Análise de crédito', texto: 'Enviamos o cadastro do inquilino para a seguradora. A resposta sai online, em pouco tempo. Se a seguradora precisar, pede algum documento para concluir.' },
      { titulo: 'Escolha das coberturas', texto: 'Com a aprovação, você escolhe as coberturas adicionais e recebe o valor final.' },
      { titulo: 'Contratação e apólice', texto: 'Você faz o pagamento e a apólice é emitida. Ela entra no contrato de aluguel como garantia.' },
      { titulo: 'Durante o contrato', texto: 'O seguro acompanha o prazo do contrato de aluguel. No fim de cada ciclo, a renovação é simples e feita pela corretora.' },
    ],
  },

  coberturas: {
    titulo: 'Coberturas do seguro fiança',
    intro: 'A cobertura básica garante o aluguel e a multa por atraso. As demais são adicionais: você escolhe quais incluir de acordo com o contrato.',
    tabelaTitulo: 'Cobertura básica e coberturas adicionais',
    linhas: [
      { icone: 'moeda', cobertura: 'Aluguel e multa por atraso', tipo: 'Básica', paga: 'Aluguéis que o inquilino deixar de pagar', limite: 'até 30x o valor do aluguel' },
      { icone: 'recibo', cobertura: 'Condomínio e IPTU', tipo: 'Adicional', paga: 'Encargos mensais em atraso', limite: 'até 30x o valor declarado, para cada item' },
      { icone: 'documento', cobertura: 'Água, luz e gás canalizado', tipo: 'Adicional', paga: 'Contas de consumo em atraso', limite: 'até 6x o valor declarado, para cada item' },
      { icone: 'ferramenta', cobertura: 'Danos ao imóvel', tipo: 'Adicional', paga: 'Estragos causados pelo inquilino', limite: 'até 6x o valor do aluguel' },
      { icone: 'casa', cobertura: 'Pintura interna e externa', tipo: 'Adicional', paga: 'Pintura para devolver o imóvel como foi entregue', limite: 'até 3x o valor do aluguel' },
      { icone: 'chave', cobertura: 'Multa por rescisão contratual', tipo: 'Adicional', paga: 'Multa se o inquilino sair antes do prazo', limite: 'até 3x o valor do aluguel' },
    ],
    nota: 'Os limites mudam conforme a seguradora. Os limites acima são um exemplo, do seguro fiança da Porto Seguro. As regras completas estão nas Condições Gerais de cada seguradora.',
    assistencias: {
      titulo: 'Assistências para o imóvel',
      texto: 'Além das coberturas, o cliente pode contar com serviços de assistência residencial, como chaveiro, encanador e eletricista, pelo app da seguradora.',
    },
    link: { rotulo: 'O que o seguro fiança cobre', href: null },
  },

  vantagens: {
    titulo: 'Vantagens do seguro fiança para inquilino, proprietário e imobiliária',
    intro: 'O seguro fiança resolve um problema diferente para cada lado do aluguel.',
    grupos: [
      {
        id: 'inquilinos',
        aba: 'Inquilino',
        titulo: 'Vantagens para o inquilino',
        itens: [
          { icone: 'pessoa', destaque: 'Alugue sem fiador', texto: 'Não precisa pedir favor a parente ou amigo, nem comprovar imóvel de um fiador' },
          { icone: 'carteira', destaque: 'Sem empatar dinheiro com caução', texto: 'Você não deposita 3 aluguéis adiantados para entrar no imóvel' },
          { icone: 'relogio', destaque: 'Aprovação rápida', texto: 'A análise é online e a resposta sai em pouco tempo' },
          { icone: 'cartao', destaque: 'Pagamento parcelado', texto: 'O valor cabe no orçamento, com parcelamento no cartão ou no débito' },
          { icone: 'casa', destaque: 'Mais opções de imóvel', texto: 'Proprietários e imobiliárias aceitam o seguro fiança com facilidade' },
          { icone: 'aperto', destaque: 'Benefícios extras', texto: 'Conforme a seguradora, há descontos em transportadoras para a mudança e clube de vantagens para clientes' },
          { icone: 'documento', destaque: 'Renovação simplificada', texto: 'No fim de cada ciclo, a corretora cuida da renovação' },
        ],
        botao: { rotulo: 'Fazer simulação', href: '/simulador-seguro-fianca' },
      },
      {
        id: 'proprietarios',
        aba: 'Proprietário',
        titulo: 'Vantagens para o proprietário',
        itens: [
          { icone: 'moeda', destaque: 'Aluguel garantido', texto: 'Se o inquilino atrasar, a seguradora paga o aluguel e a multa por atraso' },
          { icone: 'recibo', destaque: 'Encargos protegidos', texto: 'Com as coberturas adicionais, condomínio, IPTU, água, luz e gás também ficam garantidos' },
          { icone: 'ferramenta', destaque: 'Imóvel devolvido em ordem', texto: 'Coberturas para danos ao imóvel e pintura na saída do inquilino' },
          { icone: 'documento', destaque: 'Proteção na saída antecipada', texto: 'A multa por rescisão contratual pode ser coberta' },
          { icone: 'lupa', destaque: 'Inquilino analisado por uma seguradora', texto: 'O crédito do inquilino passa pela análise da seguradora antes da locação' },
          { icone: 'escudo', destaque: 'Sem depender de fiador', texto: 'Você não precisa cobrar uma pessoa física nem entrar na Justiça contra o fiador' },
          { icone: 'aperto', destaque: 'Corretora do seu lado', texto: 'Em caso de atraso, nós ajudamos a acionar o seguro e acompanhamos o processo' },
        ],
        botao: { rotulo: 'Proteger meu aluguel', mensagemWhatsApp: 'Olá! Sou proprietário e quero proteger meu aluguel com o seguro fiança.' },
      },
      {
        id: 'imobiliarias',
        aba: 'Imobiliária',
        titulo: 'Vantagens para a imobiliária',
        itens: [
          { icone: 'chave', destaque: 'Feche contratos mais rápido', texto: 'Sem esperar fiador, o imóvel fica menos tempo vago' },
          { icone: 'grafico', destaque: 'Menos inadimplência na carteira', texto: 'O aluguel garantido reduz o risco das locações que você administra' },
          { icone: 'relogio', destaque: 'Menos tempo com cobrança', texto: 'Em caso de atraso, o seguro é acionado e a seguradora assume o pagamento' },
          { icone: 'pasta', destaque: 'Processo simples para o corretor de imóveis', texto: 'Cadastro, análise e apólice com acompanhamento da nossa equipe' },
          { icone: 'casa', destaque: 'Proprietários mais seguros', texto: 'Fica mais fácil captar e manter imóveis na sua carteira' },
          { icone: 'telefone', destaque: 'Suporte ativo e próximo', texto: 'Um contato direto na corretora para resolver cadastro, renovação e sinistro, sem central de atendimento' },
          { icone: 'capelo', destaque: 'Treinamento presencial para o seu time', texto: 'Treinamos os corretores da sua imobiliária para oferecer e vender garantias locatícias' },
        ],
        botao: { rotulo: 'Quero ser imobiliária parceira', mensagemWhatsApp: 'Olá! Quero ser uma imobiliária parceira da Gastaldo.' },
      },
    ],
  },

  pagamento: {
    titulo: 'Formas de pagamento',
    texto: 'O seguro fiança pode ser parcelado no cartão de crédito ou no débito automático, com condições que variam por seguradora. Em algumas, o parcelamento no cartão chega a 60 vezes sem juros. O valor exato sai na simulação, depois da análise de crédito.',
    botao: { rotulo: 'Simular agora', href: '/simulador-seguro-fianca' },
    link: { rotulo: 'Quanto custa o seguro fiança', href: null },
  },

  quemPode: {
    titulo: 'Quem pode contratar o seguro fiança',
    texto: 'Qualquer pessoa física ou empresa que vai alugar um imóvel pode contratar, desde que passe na análise de crédito da seguradora. Quem contrata é o inquilino, e o proprietário precisa aceitar o seguro fiança como garantia do contrato.',
    documentosTitulo: 'Documentos para o seguro fiança',
    documentos: [
      { rotulo: 'Pessoa física', texto: 'RG ou CNH, CPF, comprovante de renda e comprovante de endereço.' },
      { rotulo: 'Empresa', texto: 'cartão CNPJ, contrato social, documentos dos sócios e comprovante de faturamento.' },
      { rotulo: 'Dados do imóvel', texto: 'endereço, valor do aluguel, condomínio e IPTU.' },
    ],
  },

  outras: {
    titulo: 'Outras garantias locatícias',
    intro: 'Se o seguro fiança não for o melhor caminho para o seu contrato, temos outras garantias para você alugar sem fiador:',
    link: { rotulo: 'Fiador, seguro fiança ou caução: qual escolher no ABC', href: null },
  },

  porQue: {
    titulo: 'Por que contratar seu seguro fiança com a Gastaldo Seguros',
    texto: 'Somos uma corretora especializada em garantias locatícias e trabalhamos com seguradoras parceiras sólidas. Assim, comparamos as opções e indicamos a melhor para o seu contrato, com uma corretora perto de você acompanhando tudo.',
    diferenciaisTitulo: 'Nossos diferenciais',
    diferenciais: [
      { icone: 'mensagem', destaque: 'Atendimento humano do início ao fim', texto: 'Você fala com a mesma equipe na simulação, na contratação, na renovação e no sinistro.' },
      { icone: 'documento', destaque: 'Ajuda na análise', texto: 'Orientamos o envio do cadastro e dos documentos para aumentar a chance de aprovação.' },
      { icone: 'escudo', destaque: 'Apoio em caso de atraso', texto: 'O proprietário ou a imobiliária aciona o seguro com a nossa ajuda.' },
      { icone: 'lupa', destaque: 'Mais de uma seguradora', texto: 'Comparamos as opções das seguradoras parceiras e indicamos a que encaixa melhor no seu contrato.' },
      { icone: 'capelo', destaque: 'Especialistas em garantias locatícias', texto: 'Além do seguro fiança, trabalhamos com título de capitalização, fiança empresarial e seguro incêndio.' },
    ],
    imobiliarias: {
      titulo: 'Seguro fiança para imobiliárias do ABC',
      texto: 'Trabalhamos lado a lado com imobiliárias. Além do seguro fiança para os seus inquilinos, oferecemos suporte ativo e próximo e treinamento presencial para o seu time de corretores vender garantias locatícias com segurança.',
      botao: 'Quero ser imobiliária parceira',
    },
  },

  cidades: {
    titulo: 'Seguro fiança no ABC Paulista: cidades atendidas',
    texto: 'Atendemos inquilinos, proprietários e imobiliárias em todas as cidades do ABC Paulista: Santo André, onde fica a nossa sede, São Bernardo do Campo, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra. A simulação e a contratação são online.',
  },

  faq: {
    titulo: 'Perguntas frequentes sobre seguro fiança',
    itens: [
      { pergunta: 'O que é seguro fiança?', resposta: 'É uma garantia de aluguel que substitui o fiador e a caução. Se o inquilino não pagar, a seguradora paga o proprietário, dentro dos limites contratados.' },
      { pergunta: 'Quem paga o seguro fiança: inquilino ou proprietário?', resposta: 'Normalmente quem paga é o inquilino. O proprietário é o segurado e quem recebe a indenização em caso de atraso.' },
      { pergunta: 'O seguro fiança substitui totalmente o fiador?', resposta: 'Sim. Com o seguro fiança, o contrato não precisa de fiador, porque a lei permite só uma garantia por contrato.' },
      { pergunta: 'Quanto tempo leva a análise de crédito?', resposta: 'Na maioria das seguradoras, a resposta sai online, em pouco tempo. Em alguns casos a seguradora pede documentos para concluir.' },
      { pergunta: 'O que o seguro fiança cobre?', resposta: 'A cobertura básica paga o aluguel e a multa por atraso. As adicionais cobrem condomínio, IPTU, água, luz, gás, danos ao imóvel, pintura e multa por rescisão.' },
      { pergunta: 'Qual a duração do seguro fiança?', resposta: 'O seguro acompanha o prazo do contrato de aluguel.' },
      { pergunta: 'O seguro fiança pode ser renovado?', resposta: 'Sim. No fim de cada ciclo, a renovação é feita pela corretora, de forma simples.' },
      { pergunta: 'Serve para imóvel comercial?', resposta: 'Sim. O seguro fiança vale para imóveis residenciais e comerciais, para pessoa física ou empresa.' },
      { pergunta: 'Como acionar o seguro fiança?', resposta: 'O proprietário ou a imobiliária fala com a corretora, que abre o aviso de sinistro na seguradora e acompanha até o pagamento.' },
    ],
  },

  final: {
    titulo: 'Alugue sem fiador hoje mesmo',
    texto: 'Simule seu seguro fiança em 1 minuto e receba a cotação no WhatsApp. Sem compromisso e com uma corretora do ABC acompanhando você até a assinatura do contrato.',
    botaoSecundario: 'Falar no WhatsApp',
  },
};
