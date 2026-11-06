import type { Endereco } from '../lib/endereco';

// Dados centrais do site. `null` = pendente (aparece marcado na página e é omitido do schema).
export const site = {
  nome: 'Gastaldo Seguros',
  dominio: null as string | null,
  whatsapp: '(11) 99322-6252' as string | null,
  telefone: '(11) 99322-6252' as string | null,
  email: 'contato@gastaldoseguros.com.br' as string | null,
  // Igual ao Google Meu Negócio
  endereco: {
    logradouro: 'Av. Pereira Barreto, 1395 - Sl 65B',
    bairro: 'Paraíso',
    cidade: 'Santo André',
    uf: 'SP',
    cep: '09751-000',
  } as Endereco | null,
  horario: 'Segunda a sexta, das 9h às 18h' as string | null,
  horarioSchema: 'Mo-Fr 09:00-18:00' as string | null, // formato schema.org (sábado e domingo fechado)
  cnpj: null as string | null,
  cidadeSede: 'Santo André',
  mensagemWhatsApp: 'Olá! Quero saber sobre as soluções para alugar.',
  // Endereço (Google Apps Script) que grava os leads do simulador numa planilha. Pendente: null = só WhatsApp.
  planilhaLeads: null as string | null,
};

export type Site = typeof site;
