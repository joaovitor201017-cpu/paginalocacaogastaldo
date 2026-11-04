// Benefícios por público (texto do PDF). Botões de WhatsApp levam mensagem própria.
export interface GrupoBeneficios {
  id: 'inquilinos' | 'proprietarios' | 'imobiliarias';
  aba: string;
  titulo: string;
  foto: string;
  itens: { destaque: string; texto: string }[];
  botao: { rotulo: string; href?: string; mensagemWhatsApp?: string };
}

export const beneficios: GrupoBeneficios[] = [
  {
    id: 'inquilinos',
    aba: 'Inquilinos',
    titulo: 'Benefícios para inquilinos',
    foto: 'Inquilina feliz recebendo as chaves',
    itens: [
      { destaque: 'Alugue sem fiador.', texto: 'Nada de pedir favor a parente ou amigo.' },
      { destaque: 'Sem dinheiro parado.', texto: 'Com o seguro fiança, você não precisa deixar 3 aluguéis de caução.' },
      { destaque: 'Opção para quem tem restrição.', texto: 'O título de capitalização não tem análise de crédito.' },
      { destaque: 'Análise online.', texto: 'Apólice ágil para não atrasar a entrega das chaves.' },
      { destaque: 'Pagamento facilitado.', texto: 'Parcelamento conforme a seguradora.' },
      { destaque: 'Assistências para o imóvel.', texto: 'Chaveiro, encanador e eletricista em muitos planos.' },
      { destaque: 'Tudo com uma corretora só.', texto: 'Garantia, seguro incêndio e seguro residencial no mesmo atendimento.' },
    ],
    botao: { rotulo: 'Simular minha garantia', href: '/simulador-seguro-fianca' },
  },
  {
    id: 'proprietarios',
    aba: 'Proprietários',
    titulo: 'Benefícios para proprietários',
    foto: 'Proprietário tranquilo em frente ao imóvel',
    itens: [
      { destaque: 'Aluguel garantido.', texto: 'Se o inquilino atrasar, o seguro fiança paga o aluguel e os encargos contratados.' },
      { destaque: 'Encargos protegidos.', texto: 'Condomínio, IPTU, água, luz e gás em atraso também podem ser cobertos.' },
      { destaque: 'Imóvel devolvido em ordem.', texto: 'Coberturas para danos ao imóvel e pintura na saída do inquilino.' },
      { destaque: 'Inquilino analisado.', texto: 'No seguro fiança, o crédito do inquilino passa pela análise da seguradora antes da locação.' },
      { destaque: 'Sem cobrar fiador.', texto: 'Em caso de atraso, você não precisa ir atrás de uma pessoa física para receber.' },
      { destaque: 'Patrimônio e renda protegidos.', texto: 'O seguro incêndio com perda de aluguel protege o imóvel e o recebimento depois de um sinistro.' },
      { destaque: 'Imóvel alugado mais rápido.', texto: 'Com garantias para todos os perfis de inquilino, o imóvel fica menos tempo vago.' },
    ],
    botao: { rotulo: 'Proteger meu aluguel', mensagemWhatsApp: 'Olá! Sou proprietário e quero proteger meu aluguel.' },
  },
  {
    id: 'imobiliarias',
    aba: 'Imobiliárias',
    titulo: 'Benefícios para imobiliárias',
    foto: 'Equipe de imobiliária em reunião',
    itens: [
      { destaque: 'Feche contratos mais rápido.', texto: 'Sem esperar fiador, o imóvel fica menos tempo vago.' },
      { destaque: 'Uma garantia para cada perfil de inquilino.', texto: 'Seguro fiança para quem tem crédito aprovado, título de capitalização para quem tem restrição.' },
      { destaque: 'Menos inadimplência na carteira.', texto: 'Aluguel garantido por seguradoras e empresas de capitalização sólidas.' },
      { destaque: 'Garantia de recebimento das taxas de administração,', texto: 'com o aluguel garantido.' },
      { destaque: 'Suporte ativo e próximo.', texto: 'Um contato direto na corretora para cadastro, emissão, renovação e sinistro.' },
      { destaque: 'Treinamento presencial para o seu time.', texto: 'Vamos até a imobiliária treinar os corretores para oferecer as garantias com segurança.' },
      { destaque: 'Apólices no padrão da imobiliária.', texto: 'Seguro incêndio com o valor e o beneficiário que você exige.' },
    ],
    botao: { rotulo: 'Quero ser imobiliária parceira', mensagemWhatsApp: 'Olá! Quero ser uma imobiliária parceira da Gastaldo.' },
  },
];
