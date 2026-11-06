import type { Servico } from './tipos';

// Texto da página "Título de Capitalização para Aluguel no ABC" (documento do João, 2026-11-02), com as regras
// do site: sede em Santo André; sem avaliações, logos, SUSEP e avisos internos; telefone fixo fora (não confirmado).
// Os exemplos (prazos, pagamento, correção, sorteios, assistências) vêm da página da Porto (nov/2026):
// conferir as condições das outras empresas de capitalização antes de liberar ao Google.
export const tituloDeCapitalizacao: Servico = {
  slug: 'titulo-de-capitalizacao',
  nome: 'Título de Capitalização para Aluguel',
  rotuloTrilha: 'Título de Capitalização',
  seo: {
    title: 'Título de Capitalização Aluguel: Sem Fiador e Sem Análise',
    description: 'Alugue sem fiador e sem análise de crédito com o título de capitalização. Simule grátis, receba a cotação no WhatsApp.',
  },
  mensagemWhatsApp: 'Olá! Quero uma cotação de título de capitalização para aluguel.',

  topo: {
    h1: 'Título de Capitalização: alugue sem fiador e receba seu dinheiro de volta',
    subtitulo: 'Alugue seu imóvel sem fiador e sem análise de crédito, mesmo com o nome restrito. Simule o valor do título grátis, receba a cotação no WhatsApp e tenha a garantia pronta para entregar à imobiliária. No fim do contrato, o dinheiro volta para você.',
    botaoPrincipal: { rotulo: 'Simular meu título de capitalização online', href: '/simulador-titulo-de-capitalizacao-aluguel' },
    botaoSecundario: 'Falar com um corretor no WhatsApp',
    selos: ['Sem análise de crédito', 'Valor devolvido no fim do contrato', 'Sorteios mensais', 'Residencial e comercial', 'Atendimento em todo o ABC Paulista'],
  },

  oQueE: {
    titulo: 'Título de capitalização para aluguel: a garantia que devolve seu dinheiro',
    paragrafos: [
      'O título de capitalização para aluguel é uma garantia locatícia em que o inquilino faz um pagamento, e esse valor fica guardado como garantia do contrato. Se o aluguel for pago em dia, o valor volta para o inquilino no fim, corrigido conforme as regras do plano.',
      'Na Lei do Inquilinato (Lei 8.245/91), ele funciona como uma forma de caução. A diferença para a caução em dinheiro é que o valor fica com uma empresa de capitalização, e não com o proprietário.',
      'Ele vale para imóveis residenciais e comerciais e é indicado para quem não tem fiador, tem restrição no nome ou não consegue comprovar renda.',
    ],
    link: { rotulo: 'O que é título de capitalização', href: null },
  },

  comoFunciona: {
    titulo: 'Como funciona o aluguel com título de capitalização',
    passos: [
      { titulo: 'Escolha do imóvel', texto: 'O inquilino escolhe o imóvel e combina com o proprietário ou a imobiliária o valor da garantia.' },
      { titulo: 'Cotação', texto: 'A corretora indica o plano e o valor do título de acordo com o que foi combinado.' },
      { titulo: 'Pagamento', texto: 'O inquilino paga o título, à vista ou parcelado, conforme a empresa de capitalização. Não há análise de crédito.' },
      { titulo: 'Emissão', texto: 'O título é emitido em nome do inquilino e fica vinculado ao contrato de aluguel como caução.' },
      { titulo: 'Durante o contrato', texto: 'O inquilino concorre a sorteios mensais e pode usar as assistências do plano.' },
      { titulo: 'Fim do contrato', texto: 'Com o imóvel entregue e sem dívidas, o proprietário libera a caução e o inquilino resgata o valor.' },
    ],
    nota: 'Se o inquilino deixar dívidas, o proprietário pode usar o valor do título para cobrir aluguéis, encargos ou danos, até o limite do título. O que sobrar volta para o inquilino.',
    links: [{ rotulo: 'Como funciona o título de capitalização para aluguel', href: null }],
  },

  vantagens: {
    titulo: 'Vantagens do título de capitalização para inquilino, proprietário e imobiliária',
    grupos: [
      {
        id: 'inquilinos',
        aba: 'Inquilino',
        titulo: 'Vantagens para o inquilino',
        itens: [
          { icone: 'pessoa', destaque: 'Alugue sem fiador', texto: 'Não precisa pedir a ninguém para assinar o contrato' },
          { icone: 'lupa', destaque: 'Sem análise de crédito', texto: 'Não há consulta a SPC ou Serasa nem comprovação de renda' },
          { icone: 'moeda', destaque: 'Dinheiro de volta', texto: 'No fim do contrato, sem dívidas, o valor é resgatado' },
          { icone: 'grafico', destaque: 'Sorteios todo mês', texto: 'Você concorre a prêmios enquanto o título estiver ativo' },
          { icone: 'cartao', destaque: 'Pagamento facilitado', texto: 'Pix ou cartão, com parcelamento conforme a empresa' },
          { icone: 'ferramenta', destaque: 'Assistências e descontos', texto: 'Serviços para o imóvel e descontos na mudança, conforme o plano' },
        ],
        botao: { rotulo: 'Fazer simulação', href: '/simulador-titulo-de-capitalizacao-aluguel' },
      },
      {
        id: 'proprietarios',
        aba: 'Proprietário',
        titulo: 'Vantagens para o proprietário',
        itens: [
          { icone: 'chave', destaque: 'Não perca a locação', texto: 'Você aluga para quem não tem fiador, sem deixar o imóvel vago' },
          { icone: 'escudo', destaque: 'Garantia de recebimento', texto: 'Se o inquilino não pagar, o valor do título pode cobrir aluguéis, encargos e danos' },
          { icone: 'aperto', destaque: 'Valor combinado por você', texto: 'O valor da garantia é acordado entre as partes no ato da contratação' },
          { icone: 'pessoa', destaque: 'Sem cobrar fiador', texto: 'Não precisa ir atrás de uma pessoa física para receber' },
          { icone: 'cadeado', destaque: 'Valor protegido', texto: 'O dinheiro fica com uma empresa de capitalização, e não na conta de alguém' },
          { icone: 'documento', destaque: 'Resgate só com liberação', texto: 'O inquilino só retira o valor depois que você libera a caução' },
          { icone: 'ferramenta', destaque: 'Assistências para o imóvel', texto: 'Chaveiro, reparo elétrico e hidráulico ajudam a manter o imóvel em ordem, conforme o plano' },
        ],
        botao: { rotulo: 'Proteger meu aluguel', mensagemWhatsApp: 'Olá! Sou proprietário e quero saber sobre o título de capitalização para aluguel.' },
      },
      {
        id: 'imobiliarias',
        aba: 'Imobiliária',
        titulo: 'Vantagens para a imobiliária',
        itens: [
          { icone: 'moeda', destaque: 'Garantia de recebimento das taxas', texto: 'Com o contrato garantido, a imobiliária recebe as taxas de administração' },
          { icone: 'relogio', destaque: 'Agilidade na locação', texto: 'Sem análise de crédito e com emissão rápida, o contrato sai em menos tempo' },
          { icone: 'chave', destaque: 'Feche mais contratos', texto: 'Atenda clientes que não têm fiador ou não passam na análise do seguro fiança' },
          { icone: 'grafico', destaque: 'Menos risco na carteira', texto: 'O proprietário tem um valor garantido para cobrir dívidas' },
          { icone: 'telefone', destaque: 'Suporte ativo e próximo', texto: 'Um contato direto na corretora para emissão, liberação e resgate' },
          { icone: 'capelo', destaque: 'Treinamento presencial para o seu time', texto: 'Treinamos seus corretores para oferecer todas as garantias locatícias' },
        ],
        botao: { rotulo: 'Quero ser imobiliária parceira', mensagemWhatsApp: 'Olá! Quero ser uma imobiliária parceira da Gastaldo.' },
      },
    ],
  },

  // "Valor, prazo, pagamento e resgate" usa os mesmos cards roláveis das coberturas
  coberturas: {
    titulo: 'Valor, prazo, pagamento e resgate',
    intro: 'O valor do título é combinado entre inquilino, proprietário e imobiliária antes da assinatura do contrato. As outras condições dependem do plano e da empresa de capitalização.',
    tabelaTitulo: 'Condições do título',
    rotuloLimite: 'Exemplo: Porto',
    linhas: [
      { icone: 'moeda', cobertura: 'Valor do título', paga: 'Combinado com o proprietário e a imobiliária', limite: 'definido entre as partes' },
      { icone: 'relogio', cobertura: 'Prazo', paga: 'Acompanha o contrato de aluguel', limite: '12, 15, 18, 24 ou 30 meses' },
      { icone: 'cartao', cobertura: 'Pagamento', paga: 'À vista ou parcelado', limite: 'Pix, ou até 18x combinando até 2 cartões' },
      { icone: 'lupa', cobertura: 'Análise de crédito', paga: 'Não tem', limite: 'sem análise e sem comprovação de renda' },
      { icone: 'documento', cobertura: 'Emissão', paga: 'Rápida', limite: 'em até 30 minutos' },
      { icone: 'grafico', cobertura: 'Correção do valor', paga: 'Atualizado durante a vigência', limite: 'TR + 0,35% ao mês' },
      { icone: 'chave', cobertura: 'Resgate', paga: 'No fim do contrato, com a liberação do proprietário', limite: 'até 100% do valor da garantia, conforme o plano' },
    ],
    nota: 'As condições mudam conforme a empresa de capitalização e o plano. Os exemplos são do título de capitalização da Porto.',
    assistencias: {
      titulo: 'Quando o valor do título é devolvido',
      texto: 'O resgate acontece no fim do contrato, depois que o proprietário libera a caução. Se houver dívidas de aluguel, encargos ou danos, o valor necessário é usado para cobri-las e o restante volta ao inquilino. O resgate antes do fim depende de acordo com o proprietário e das regras do plano.',
    },
    link: { rotulo: 'Título de capitalização ou seguro fiança: qual escolher', href: null },
  },

  // "Sorteios mensais e assistências" usa a seção de assistências (com o botão de simulação)
  assistencias: {
    titulo: 'Sorteios mensais e assistências',
    intro: 'Enquanto o título estiver ativo, o inquilino concorre a sorteios mensais em dinheiro. Cada título tem um número da sorte, e o sorteio é feito pela Loteria Federal. Na Porto, por exemplo, os prêmios vão de 1 a 5 vezes o valor do título, e o inquilino continua concorrendo até o fim da vigência, mesmo depois de ser sorteado. O prêmio tem retenção de 30% de Imposto de Renda, conforme a regra dos títulos de capitalização.',
    grupos: [
      {
        titulo: 'Assistências para o imóvel',
        itens: [
          { rotulo: 'Chaveiro', texto: 'troca de segredo e instalação de fechadura ou trava tetra' },
          { rotulo: 'Reparo hidráulico' },
          { rotulo: 'Reparo elétrico' },
          { rotulo: 'Conversão de gás' },
          { rotulo: 'Descontos com transportadoras', texto: 'para a mudança' },
        ],
      },
    ],
    nota: 'Os serviços variam conforme o plano. Na Porto, as assistências valem para imóveis residenciais.',
  },

  quemPode: {
    titulo: 'Quem pode contratar o título de capitalização para aluguel',
    texto: 'Qualquer pessoa física ou empresa que vai alugar um imóvel residencial ou comercial pode contratar. Como não há análise de crédito, o título é uma boa saída para quem tem restrição no nome, é autônomo e não consegue comprovar renda, ou não foi aprovado no seguro fiança. O único requisito é o proprietário ou a imobiliária aceitar o título de capitalização como garantia do contrato.',
    documentosTitulo: 'Documentos',
    documentos: [
      { rotulo: 'Pessoa física', texto: 'RG ou CNH e CPF.' },
      { rotulo: 'Empresa', texto: 'cartão CNPJ e documentos do responsável.' },
      { rotulo: 'Contrato', texto: 'dados do imóvel e do proprietário, e o valor combinado da garantia.' },
    ],
  },

  outras: {
    titulo: 'Outras garantias locatícias',
    intro: 'O título de capitalização não é a única forma de alugar sem fiador:',
  },

  porQue: {
    titulo: 'Por que contratar com a Gastaldo Seguros',
    texto: 'Somos uma corretora especializada em garantias locatícias, com sede em Santo André, e trabalhamos com empresas de capitalização e seguradoras parceiras. Comparamos as opções e indicamos a melhor para o seu contrato.',
    diferenciaisTitulo: 'Nossos diferenciais',
    diferenciais: [
      { icone: 'mensagem', destaque: 'Atendimento humano do início ao fim', texto: 'A mesma equipe cuida da cotação, da emissão e do resgate.' },
      { icone: 'chave', destaque: 'Ajuda na liberação e no resgate', texto: 'Orientamos inquilino e proprietário no fim do contrato para o valor sair sem dor de cabeça.' },
      { icone: 'lupa', destaque: 'Mais de uma garantia', texto: 'Se o título não for o melhor caminho, mostramos o seguro fiança e outras opções.' },
      { icone: 'capelo', destaque: 'Parceria com imobiliárias', texto: 'Suporte próximo e treinamento presencial para o time de corretores.' },
    ],
  },

  faq: {
    titulo: 'Perguntas frequentes sobre título de capitalização para aluguel',
    itens: [
      { pergunta: 'Precisa de fiador ou comprovar renda?', resposta: 'Não. O título de capitalização dispensa fiador, comprovação de renda e análise de crédito.' },
      { pergunta: 'Quem define o valor do título?', resposta: 'O valor é combinado entre o inquilino, o proprietário e a imobiliária antes de assinar o contrato.' },
      { pergunta: 'Recebo o dinheiro de volta?', resposta: 'Sim. No fim do contrato, sem dívidas, o valor é resgatado conforme as regras do plano.' },
      { pergunta: 'Posso resgatar antes do fim do contrato?', resposta: 'Só com a liberação do proprietário e conforme a tabela de resgate do plano.' },
      { pergunta: 'Posso transferir o título para outra pessoa?', resposta: 'Sim, desde que a imobiliária ou o proprietário libere a caução. Na Porto, a transferência é feita sem custo.' },
      { pergunta: 'Posso pagar parcelado?', resposta: 'Depende da empresa de capitalização. Algumas aceitam Pix e parcelamento no cartão.' },
      { pergunta: 'Como funcionam os sorteios?', resposta: 'Enquanto o título estiver ativo, você concorre a sorteios mensais, em geral pela Loteria Federal. O título continua valendo como garantia depois de um sorteio.' },
      { pergunta: 'E se o meu título for sorteado?', resposta: 'A empresa de capitalização entra em contato, confirma os documentos e paga o prêmio, com retenção de 30% de Imposto de Renda. Você continua concorrendo aos próximos sorteios e o título segue valendo como garantia.' },
      { pergunta: 'Serve para imóvel comercial?', resposta: 'Sim. O título pode garantir locações residenciais e comerciais, para pessoa física ou empresa.' },
      { pergunta: 'Negativado pode contratar?', resposta: 'Pode. Como não há análise de crédito, a restrição no nome não impede a contratação.' },
      { pergunta: 'O que acontece se o inquilino não pagar o aluguel?', resposta: 'O proprietário pode usar o valor do título para cobrir a dívida, até o limite do título.' },
    ],
  },

  final: {
    titulo: 'Alugue sem fiador e receba seu dinheiro de volta',
    texto: 'Peça sua cotação de título de capitalização para aluguel e receba a proposta no WhatsApp, com uma corretora do ABC acompanhando você até a assinatura do contrato.',
    botaoSecundario: 'Falar no WhatsApp',
  },
};
