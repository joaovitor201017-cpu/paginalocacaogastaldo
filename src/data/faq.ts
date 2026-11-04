// Perguntas frequentes da Home (perguntas do cliente; respostas redigidas pela Maria — revisar antes de publicar)
export interface ItemFaq {
  pergunta: string;
  resposta: string;
  confirmar?: boolean; // true = cliente precisa confirmar a informação
}

export const faq: ItemFaq[] = [
  {
    pergunta: 'O que é garantia locatícia?',
    resposta:
      'Garantia locatícia é o que assegura ao proprietário que o aluguel e os encargos serão pagos se o inquilino deixar de pagar. A Lei do Inquilinato (Lei 8.245/91) prevê caução, fiança, seguro fiança e cessão fiduciária de quotas de fundo de investimento. No ABC, a Gastaldo trabalha com seguro fiança e com título de capitalização, aceito como caução, para você alugar sem fiador.',
  },
  {
    pergunta: 'Como alugar um imóvel sem fiador?',
    resposta:
      'Para alugar sem fiador, use uma garantia locatícia no lugar dele: seguro fiança ou título de capitalização. No seguro fiança, a seguradora analisa o seu crédito e garante o aluguel ao proprietário, sem você deixar 3 aluguéis de caução. No título de capitalização não há análise de crédito, e o valor da garantia volta para você no fim do contrato.',
  },
  {
    pergunta: 'Qual a melhor garantia para alugar?',
    resposta:
      'Não existe uma garantia melhor para todo mundo: a certa depende do seu perfil. Se o seu crédito for aprovado na análise da seguradora, o seguro fiança costuma ser o caminho, sem fiador e sem dinheiro parado. Se você tem restrição no nome ou não consegue comprovar renda, o título de capitalização não tem análise de crédito. A Gastaldo compara as opções com você antes de fechar.',
  },
  {
    pergunta: 'Quem tem nome negativado consegue alugar?',
    resposta:
      'Sim, com o título de capitalização, que não tem análise de crédito e pode ser usado como garantia do aluguel, desde que o proprietário ou a imobiliária aceite essa modalidade. No fim do contrato, o valor da garantia volta para você. Já o seguro fiança passa pela análise de crédito da seguradora, então a aprovação depende dela.',
  },
  {
    pergunta: 'O contrato pede seguro incêndio. Vocês fazem?',
    resposta:
      'Sim. A Gastaldo faz o seguro incêndio que o contrato de aluguel pede, com o valor e o beneficiário que a imobiliária exige. Para o proprietário, existe a opção com cobertura de perda de aluguel, que protege o recebimento depois de um sinistro. Você pode contratar junto com a garantia locatícia, no mesmo atendimento.',
  },
  {
    pergunta: 'Preciso pagar algo à corretora?',
    resposta:
      'Em geral, não. A remuneração da corretora normalmente já está incluída no valor do seguro e é paga pela seguradora, então você não paga uma taxa à parte para a Gastaldo pela cotação e pela contratação. O que você paga é o próprio seguro ou o título, com parcelamento conforme a seguradora. Se houver algum custo diferente, avisamos antes de você fechar.',
    confirmar: true,
  },
  {
    pergunta: 'Quais cidades vocês atendem?',
    resposta:
      'Atendemos as sete cidades do ABC Paulista: São Bernardo do Campo, onde fica a nossa sede, Santo André, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra. A análise é online e o atendimento pode ser feito pelo WhatsApp, de qualquer cidade da região.',
  },
  {
    pergunta: 'Como minha imobiliária pode ser parceira da Gastaldo?',
    resposta:
      'Fale com a Gastaldo pelo WhatsApp e peça para ser imobiliária parceira. A parceria inclui um contato direto na corretora para cadastro, emissão, renovação e sinistro, treinamento presencial para os seus corretores e uma garantia para cada perfil de inquilino: seguro fiança para crédito aprovado e título de capitalização para quem tem restrição. O seguro incêndio sai com o valor e o beneficiário que você exige.',
  },
];
