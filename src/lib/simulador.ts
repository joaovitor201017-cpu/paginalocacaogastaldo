// Cálculo do simulador de seguro fiança (fórmulas do documento do João).
// Mostra quanto cada plano protege em reais; o preço do seguro só sai na cotação oficial.

export interface Valores { aluguel: number; condominio: number | null; iptu: number | null }
export interface Protecao {
  aluguel: number; // aluguel e multa por atraso: 30x
  condominio: number | null; // 30x, só se informado
  iptu: number | null; // 30x, só se informado
  danos: number; // 6x o aluguel
  pintura: number; // 3x o aluguel
  rescisao: number; // 3x o aluguel
}

export function calcularProtecao({ aluguel, condominio, iptu }: Valores): Protecao {
  return {
    aluguel: aluguel * 30,
    condominio: condominio ? condominio * 30 : null,
    iptu: iptu ? iptu * 30 : null,
    danos: aluguel * 6,
    pintura: aluguel * 3,
    rescisao: aluguel * 3,
  };
}

// Lê um valor digitado ("2000", "2.000", "2.000,50", "R$ 1.250").
// Campo vazio → null; texto inválido ou zero/negativo → NaN.
export function lerValor(texto: string): number | null {
  const t = texto.replace(/R\$|\s/g, '');
  if (!t) return null;
  const normal = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t.replace(/\.(?=\d{3}(\D|$))/g, '');
  const n = /^\d+(\.\d+)?$/.test(normal) ? Number(normal) : NaN;
  return n > 0 ? n : NaN;
}

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
export function formatarReais(valor: number): string {
  return reais.format(valor);
}

export interface Lead {
  nome: string;
  perfil: string;
  aluguel: number;
  condominio: number | null;
  iptu: number | null;
  tipo: string;
  cidade: string;
  whatsapp: string;
  plano: string;
}

// Mensagem que o cliente envia no WhatsApp ao escolher o plano (já com os dados do lead para a equipe)
export function mensagemLead(l: Lead): string {
  const r = (v: number | null) => (v ? formatarReais(v).replace(/\s/g, ' ') : '—');
  return (
    `Olá! Fiz a simulação no site e quero a cotação do seguro fiança, plano ${l.plano}, aluguel de ${r(l.aluguel)}. ` +
    `Novo lead do simulador: ${l.nome} · ${l.perfil} · Aluguel ${r(l.aluguel)} · Condomínio ${r(l.condominio)} · IPTU ${r(l.iptu)} · ${l.tipo} · ${l.cidade} · WhatsApp ${l.whatsapp}`
  );
}

// --- Título de capitalização para aluguel (fórmulas do documento do João)
// valor mensal = aluguel + condomínio + IPTU; título = valor mensal × número de aluguéis; parcela de exemplo = título ÷ 18
export interface ValoresTitulo { aluguel: number; condominio: number | null; iptu: number | null; vezes: number }
export function calcularTitulo({ aluguel, condominio, iptu, vezes }: ValoresTitulo) {
  const mensal = aluguel + (condominio ?? 0) + (iptu ?? 0);
  const titulo = mensal * vezes;
  return { mensal, titulo, parcela: titulo / 18 };
}

const reaisCentavos = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
export function formatarReaisCentavos(valor: number): string {
  return reaisCentavos.format(valor);
}

export interface LeadTitulo {
  nome: string;
  perfil: string;
  aluguel: number;
  encargos: number;
  vezes: number[]; // [6] ou, quando a pessoa ainda não sabe, [6, 12]
  titulos: number[];
  tipo: string;
  cidade: string;
  whatsapp: string;
}

// Mensagem que o cliente envia no WhatsApp (já com os dados do lead para a equipe)
export function mensagemLeadTitulo(l: LeadTitulo): string {
  const r = (v: number) => formatarReais(v).replace(/\s/g, ' ');
  const faixa = (vs: number[], f: (v: number) => string) => vs.map(f).join(' a ');
  const valor = faixa(l.titulos, r);
  return (
    `Olá! Simulei no site um título de capitalização de ${valor} para o meu aluguel e quero a cotação. ` +
    `Novo lead título de capitalização: ${l.nome} · ${l.perfil} · Aluguel ${r(l.aluguel)} · Encargos ${l.encargos ? r(l.encargos) : '—'} · ` +
    `${faixa(l.vezes, (v) => `${v}x`)} · Título ${valor} · ${l.tipo} · ${l.cidade} · WhatsApp ${l.whatsapp}`
  );
}

// --- Cotação de seguro residencial (aba 02 do documento do João)
// "marcadas" conta as opções de proteção marcadas, sem a Assistência 24h (que já vem marcada).
// Ordem: Total (casa, ou 5+ opções) → Completo (apartamento próprio, ou 3 a 4 opções) → Essencial (o resto:
// apartamento alugado com até 2 opções).
export type PlanoResidencial = 'Essencial' | 'Completo' | 'Total';
export function sugerirPlano({ tipo, condicao, marcadas }: { tipo: string; condicao: string; marcadas: number }): PlanoResidencial {
  if (tipo !== 'Apartamento' || marcadas >= 5) return 'Total';
  if (condicao === 'Próprio' || marcadas >= 3) return 'Completo';
  return 'Essencial';
}

export function cepValido(cep: string): boolean {
  return /^\d{8}$/.test(cep.replace(/\D/g, '')) && cep.replace(/\D/g, '').length === cep.replace(/[\s.-]/g, '').length;
}

export interface LeadResidencial {
  nome: string;
  cep: string;
  tipo: string;
  condicao: string;
  uso: string;
  opcoes: string[];
  bens: string;
  plano: string;
  whatsapp: string;
}

export function mensagemLeadResidencial(l: LeadResidencial): string {
  return (
    'Olá! Fiz a cotação de seguro residencial no site e quero receber as propostas. ' +
    `Novo lead seguro residencial: ${l.nome} · CEP ${l.cep} · ${l.tipo} · ${l.condicao} · ${l.uso} · Quer proteger: ${l.opcoes.join(', ') || '—'} · ` +
    `Bens: ${l.bens || '—'} · Plano sugerido: ${l.plano} · WhatsApp ${l.whatsapp}`
  );
}

// --- Cotação de seguro incêndio (aba 03 do documento do João)
// Sem faixa de preço real: o resumo mostra "Enviamos o valor no WhatsApp".
export function resumoIncendio({ cobertura, beneficiario, extras }: { cobertura: number | null; beneficiario: string; extras: string[] }) {
  const beneficiarios: Record<string, string> = { Sim: 'Proprietário', Não: 'Não exigido' };
  return {
    cobertura: cobertura ? formatarReais(cobertura).replace(/\s/g, ' ') : 'Vamos confirmar com a imobiliária',
    beneficiario: beneficiarios[beneficiario] ?? 'A confirmar',
    extras: extras.length ? extras.join(', ') : 'Nenhuma',
    preco: 'Enviamos o valor no WhatsApp',
  };
}

export interface LeadIncendio {
  nome: string;
  perfil: string;
  cep: string;
  tipo: string;
  aluguel: number;
  cobertura: number | null;
  beneficiario: string;
  imobiliaria: string;
  extras: string[];
  prazo: string;
  whatsapp: string;
}

export function mensagemLeadIncendio(l: LeadIncendio): string {
  const r = (v: number) => formatarReais(v).replace(/\s/g, ' ');
  return (
    'Olá! Preciso de um seguro incêndio para o meu aluguel. ' +
    `Novo lead seguro incêndio: ${l.nome} · ${l.perfil} · CEP ${l.cep} · ${l.tipo} · Aluguel ${r(l.aluguel)} · ` +
    `Cobertura exigida ${l.cobertura ? r(l.cobertura) : '—'} · Beneficiário: ${l.beneficiario || '—'} · Imobiliária: ${l.imobiliaria || '—'} · ` +
    `Extras: ${l.extras.join(', ') || '—'} · Prazo: ${l.prazo} · WhatsApp ${l.whatsapp}`
  );
}
