// Dados centrais do site. `null` = pendente (aparece marcado na página e é omitido do schema).
export const site = {
  nome: 'Gastaldo Seguros',
  dominio: null as string | null,
  whatsapp: null as string | null,
  telefone: null as string | null,
  email: null as string | null,
  endereco: null as string | null,
  horario: null as string | null,
  cnpj: null as string | null,
  susep: null as string | null,
  cidadeSede: 'São Bernardo do Campo',
  mensagemWhatsApp: 'Olá! Quero saber sobre as soluções para alugar.',
};

export type Site = typeof site;
