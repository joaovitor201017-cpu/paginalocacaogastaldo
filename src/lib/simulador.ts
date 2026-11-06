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
