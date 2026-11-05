import type { Servico } from './tipos';

// Texto da página "Seguro Residencial no ABC" (documento do João, 2026-11-03), com as regras do site:
// sede em Santo André; sem avaliações, logos de seguradoras e avisos internos; botões com "Simular".
// Coberturas e assistências variam por seguradora: conferir com as parceiras antes de liberar ao Google.
export const seguroResidencial: Servico = {
  slug: 'seguro-residencial',
  nome: 'Seguro Residencial',
  rotuloTrilha: 'Seguro Residencial',
  seo: {
    title: 'Seguro Residencial: Casa e Apartamento | Cotação',
    description: 'Seguro residencial para casa e apartamento, próprio ou alugado, no ABC Paulista. Compare seguradoras, escolha as coberturas e peça sua cotação grátis.',
  },
  mensagemWhatsApp: 'Olá! Quero uma cotação de seguro residencial.',

  topo: {
    h1: 'Seguro Residencial: proteja sua casa ou apartamento',
    subtitulo: 'Proteja seu imóvel contra incêndio, roubo e danos elétricos, com assistência 24 horas. Faça a cotação grátis, compare as seguradoras no WhatsApp e contrate o seguro do seu jeito.',
    botaoPrincipal: { rotulo: 'Simular meu seguro residencial online', href: '/cotacao-seguro-residencial' },
    botaoSecundario: 'Falar com um corretor no WhatsApp',
    selos: ['Casa e apartamento', 'Imóvel próprio ou alugado', 'Assistência 24 horas', 'Cotação com várias seguradoras', 'Atendimento em todo o ABC Paulista'],
  },

  oQueE: {
    titulo: 'Seguro residencial para casa e apartamento',
    paragrafos: [
      'O seguro residencial protege o seu imóvel e tudo o que está dentro dele: móveis, eletrodomésticos e eletrônicos. Ele também pode cobrir danos que você causar a vizinhos e oferece serviços de assistência para a casa.',
      'Você escolhe as coberturas e monta o seguro de acordo com o seu imóvel e o seu bolso.',
    ],
    link: { rotulo: 'O que é seguro residencial e o que ele cobre', href: null },
    extra: {
      titulo: 'Seguro residencial para apartamento',
      texto: 'O seguro do condomínio protege as áreas comuns e a estrutura do prédio, mas não cobre o que está dentro do seu apartamento. O seguro residencial cobre os seus bens, os danos elétricos, o roubo e os vazamentos que atingem o vizinho de baixo, por exemplo.',
    },
  },

  coberturas: {
    titulo: 'Coberturas do seguro residencial',
    intro: 'Todo seguro residencial tem uma cobertura básica contra incêndio. As outras são adicionais, e você escolhe quais incluir. Algumas seguradoras oferecem mais de 20 coberturas para combinar.',
    tabelaTitulo: 'Cobertura básica e coberturas adicionais mais procuradas',
    linhas: [
      { icone: 'chama', cobertura: 'Incêndio, raio e explosão', tipo: 'Básica', paga: 'Prejuízos causados por fogo, fumaça, raio ou explosão no imóvel, inclusive quando o incêndio começa na vizinhança. Em muitas seguradoras, inclui também implosão e queda de aeronave' },
      { icone: 'raio', cobertura: 'Danos elétricos', tipo: 'Adicional', paga: 'Conserto ou troca de aparelhos queimados por variação de energia, curto-circuito ou raio' },
      { icone: 'cadeado', cobertura: 'Roubo e furto qualificado', tipo: 'Adicional', paga: 'Reposição de bens levados ou danificados quando a casa é arrombada, com vestígios' },
      { icone: 'pessoa', cobertura: 'Responsabilidade civil familiar', tipo: 'Adicional', paga: 'Danos que você, sua família ou seu pet causarem a outras pessoas, como um vazamento no vizinho' },
      { icone: 'vento', cobertura: 'Vendaval e granizo', tipo: 'Adicional', paga: 'Danos causados por ventos fortes, furacão, ciclone e granizo' },
      { icone: 'casa', cobertura: 'Quebra de vidros', tipo: 'Adicional', paga: 'Vidros, box e espelhos quebrados por acidente' },
      { icone: 'gota', cobertura: 'Vazamento de tubulações', tipo: 'Adicional', paga: "Danos causados por vazamento de canos e caixas d'água" },
      { icone: 'gota', cobertura: 'Alagamento', tipo: 'Adicional', paga: 'Danos por entrada de água de chuva, enchente ou inundação' },
      { icone: 'moeda', cobertura: 'Perda ou pagamento de aluguel', tipo: 'Adicional', paga: 'Aluguel enquanto o imóvel não pode ser usado depois de um sinistro coberto' },
      { icone: 'escudo', cobertura: 'Impacto de veículos', tipo: 'Adicional', paga: 'Danos quando um veículo atinge o imóvel' },
      { icone: 'casa', cobertura: 'Desmoronamento', tipo: 'Adicional', paga: 'Danos por desabamento de paredes, muros ou estruturas' },
      { icone: 'pasta', cobertura: 'Equipamentos e negócio em casa', tipo: 'Adicional', paga: 'Itens de escritório ou de um pequeno negócio que funciona na residência' },
      { icone: 'aperto', cobertura: 'Outros itens', tipo: 'Adicional', paga: 'Joias e relógios, obras de arte, bicicletas, placas solares, jardim, conforme a seguradora' },
    ],
    nota: 'As coberturas, os limites e a franquia (participação obrigatória do segurado) mudam conforme a seguradora e o plano. Tudo fica descrito nas Condições Gerais da apólice.',
    link: { rotulo: 'O que é RC familiar no seguro residencial', href: null },
  },

  assistencias: {
    titulo: 'Assistências 24 horas para sua casa',
    intro: 'Além de pagar os prejuízos, o seguro residencial resolve os pequenos problemas do dia a dia. As assistências funcionam 24 horas e, em alguns planos, passam de 40 serviços.',
    grupos: [
      {
        titulo: 'Serviços do dia a dia',
        itens: [
          { rotulo: 'Encanador', texto: 'reparo em torneiras, registros e descargas com vazamento' },
          { rotulo: 'Eletricista', texto: 'conserto de chuveiro, troca de resistência, lâmpadas e tomadas' },
          { rotulo: 'Chaveiro', texto: 'abertura de porta quando você perde ou quebra a chave' },
          { rotulo: 'Conserto de eletrodomésticos', texto: 'geladeira, fogão, máquina de lavar e outros, conforme o plano' },
        ],
      },
      {
        titulo: 'Serviços depois de um sinistro',
        itens: [
          { rotulo: 'Limpeza', texto: 'do imóvel' },
          { rotulo: 'Segurança', texto: 'do imóvel enquanto ele estiver vulnerável' },
          { rotulo: 'Caçamba', texto: 'para retirar entulho' },
        ],
      },
    ],
    nota: 'A quantidade de usos por ano e os serviços incluídos variam conforme a seguradora e o plano escolhido.',
  },

  vantagens: {
    titulo: 'Vantagens do seguro residencial para inquilino, proprietário e imobiliária',
    grupos: [
      {
        id: 'inquilinos',
        aba: 'Inquilino',
        titulo: 'Vantagens para o inquilino',
        itens: [
          { icone: 'casa', destaque: 'Seus bens protegidos', texto: 'Móveis, eletrodomésticos e eletrônicos cobertos contra incêndio, roubo e danos elétricos' },
          { icone: 'pessoa', destaque: 'Proteção contra danos a vizinhos', texto: 'Com a responsabilidade civil familiar, um vazamento no apartamento de baixo não sai do seu bolso' },
          { icone: 'ferramenta', destaque: 'Assistência 24 horas', texto: 'Encanador, eletricista e chaveiro sem precisar procurar profissional' },
          { icone: 'documento', destaque: 'Ajuda com a exigência do contrato', texto: 'Muitos contratos de aluguel pedem seguro incêndio, e o seguro residencial pode atender essa exigência, conforme o contrato' },
          { icone: 'chave', destaque: 'Leva o seguro com você', texto: 'Se mudar de imóvel, a apólice pode ser ajustada para o novo endereço, conforme a seguradora' },
        ],
        botao: { rotulo: 'Fazer simulação', href: '/cotacao-seguro-residencial' },
      },
      {
        id: 'proprietarios',
        aba: 'Proprietário',
        titulo: 'Vantagens para o proprietário',
        itens: [
          { icone: 'escudo', destaque: 'Estrutura protegida', texto: 'Paredes, telhado e instalações cobertos contra incêndio, vendaval, desmoronamento e outros riscos' },
          { icone: 'moeda', destaque: 'Renda protegida', texto: 'Com a cobertura de perda de aluguel, você não fica sem receber se o imóvel ficar inutilizável depois de um sinistro' },
          { icone: 'chave', destaque: 'Imóvel vazio também pode ser segurado', texto: 'Proteção entre um inquilino e outro, conforme a seguradora' },
          { icone: 'relogio', destaque: 'Aluguel por temporada', texto: 'Opções para imóveis anunciados em plataformas online' },
          { icone: 'ferramenta', destaque: 'Assistências para manter o imóvel em ordem', texto: 'Reparos rápidos sem depender de profissional de confiança' },
        ],
        botao: { rotulo: 'Proteger meu imóvel', mensagemWhatsApp: 'Olá! Sou proprietário e quero uma cotação de seguro residencial.' },
      },
      {
        id: 'imobiliarias',
        aba: 'Imobiliária',
        titulo: 'Vantagens para a imobiliária',
        itens: [
          { icone: 'documento', destaque: 'Exigência do contrato resolvida', texto: 'O seguro que o contrato pede pode ser contratado no mesmo atendimento da garantia locatícia' },
          { icone: 'aperto', destaque: 'Menos conflito na saída', texto: 'Danos cobertos pelo seguro não viram discussão entre inquilino e proprietário' },
          { icone: 'pasta', destaque: 'Pacote completo para o cliente', texto: 'Garantia de aluguel e seguro residencial com uma só corretora' },
          { icone: 'telefone', destaque: 'Suporte ativo e próximo', texto: 'Um contato direto para cotação, emissão e sinistro' },
          { icone: 'capelo', destaque: 'Treinamento presencial para o seu time', texto: 'Treinamos seus corretores para oferecer seguros e garantias locatícias' },
        ],
        botao: { rotulo: 'Quero ser imobiliária parceira', mensagemWhatsApp: 'Olá! Quero ser uma imobiliária parceira da Gastaldo.' },
      },
    ],
  },

  comoFunciona: {
    titulo: 'Como contratar seu seguro residencial',
    passos: [
      { titulo: 'Peça a cotação', texto: 'Informe o CEP, o tipo de imóvel e se ele é próprio ou alugado.' },
      { titulo: 'Escolha as coberturas', texto: 'Montamos as opções com as seguradoras parceiras e explicamos cada uma.' },
      { titulo: 'Compare as propostas', texto: 'Você vê preço, coberturas e assistências lado a lado.' },
      { titulo: 'Contrate', texto: 'Com a apólice emitida, sua casa já está protegida.' },
    ],
    nota: 'O preço depende do CEP, do tipo de imóvel, dos valores segurados e das coberturas escolhidas.',
    links: [
      { rotulo: 'Quanto custa o seguro residencial', href: null },
      { rotulo: 'Qual o melhor seguro residencial', href: null },
    ],
  },

  outras: { titulo: 'Outras garantias e seguros para o aluguel' },

  porQue: {
    titulo: 'Por que contratar com a Gastaldo Seguros',
    texto: 'Somos uma corretora especializada em seguros e garantias para o aluguel, com sede em Santo André, e trabalhamos com seguradoras parceiras. Comparamos as opções e indicamos a melhor para o seu imóvel.',
    diferenciaisTitulo: 'Nossos diferenciais',
    diferenciais: [
      { icone: 'lupa', destaque: 'Comparação entre seguradoras', texto: 'Você não precisa cotar uma por uma.' },
      { icone: 'moeda', destaque: 'Sem custo extra', texto: 'A remuneração da corretora já está incluída no preço do seguro.' },
      { icone: 'escudo', destaque: 'Apoio no sinistro', texto: 'Acompanhamos o seu pedido com a seguradora e orientamos documentos e prazos.' },
      { icone: 'aperto', destaque: 'Seguro e garantia juntos', texto: 'Para quem aluga, resolvemos a garantia locatícia e o seguro no mesmo atendimento.' },
    ],
  },

  faq: {
    titulo: 'Perguntas frequentes sobre seguro residencial',
    itens: [
      { pergunta: 'Imóvel alugado pode ter seguro residencial?', resposta: 'Sim. O inquilino pode segurar os próprios bens e a responsabilidade com o imóvel e os vizinhos. O proprietário pode segurar a estrutura. As duas apólices podem existir ao mesmo tempo.' },
      { pergunta: 'Seguro residencial é obrigatório?', resposta: 'Não para quem mora em imóvel próprio. No aluguel, a Lei do Inquilinato coloca o seguro contra incêndio como obrigação do proprietário, mas o contrato pode passar esse custo para o inquilino.' },
      { pergunta: 'Qual a diferença entre o seguro do condomínio e o seguro residencial?', resposta: 'O seguro do condomínio protege as áreas comuns e a estrutura do prédio. O seguro residencial protege o interior do seu apartamento, os seus bens e os danos que você causar a vizinhos.' },
      { pergunta: 'O seguro residencial cobre furto sem arrombamento?', resposta: 'Em geral, não. A cobertura de roubo e furto costuma exigir sinais de arrombamento ou violência. Confira as regras de cada seguradora.' },
      { pergunta: 'O seguro residencial tem franquia?', resposta: 'Algumas coberturas têm uma participação obrigatória do segurado, que é o valor que fica por sua conta em caso de sinistro. Ela aparece na proposta antes da contratação.' },
      { pergunta: 'Preciso pagar algo à corretora?', resposta: 'Não. A remuneração da corretora já está incluída no preço do seguro, pago à seguradora.' },
      { pergunta: 'Como acionar o seguro residencial?', resposta: 'Fale com a corretora, que abre o pedido com a seguradora e orienta sobre documentos e prazos. As assistências 24 horas também podem ser pedidas pelo telefone, app ou WhatsApp da seguradora.' },
      { pergunta: 'Posso cancelar o seguro residencial?', resposta: 'Sim. As regras de cancelamento e devolução estão nas Condições Gerais da apólice. A corretora cuida do pedido para você.' },
    ],
  },

  final: {
    titulo: 'Proteja sua casa hoje mesmo',
    texto: 'Peça sua cotação de seguro residencial e compare as opções das seguradoras parceiras, com uma corretora do ABC acompanhando você.',
    botaoSecundario: 'Falar no WhatsApp',
  },
};
