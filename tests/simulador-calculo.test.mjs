// Cálculo do simulador de seguro fiança (fórmulas do documento do João)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularProtecao, lerValor, formatarReais, mensagemLead } from '../src/lib/simulador.ts';

test('exemplo do documento: aluguel 2.000, condomínio 500, IPTU 150', () => {
  const p = calcularProtecao({ aluguel: 2000, condominio: 500, iptu: 150 });
  assert.equal(p.aluguel, 60000);
  assert.equal(p.condominio, 15000);
  assert.equal(p.iptu, 4500);
  assert.equal(p.danos, 12000);
  assert.equal(p.pintura, 6000);
  assert.equal(p.rescisao, 6000);
});

test('condomínio e IPTU em branco não aparecem (null)', () => {
  const p = calcularProtecao({ aluguel: 1500, condominio: null, iptu: null });
  assert.equal(p.condominio, null);
  assert.equal(p.iptu, null);
  assert.equal(p.aluguel, 45000);
});

test('lerValor aceita formatos brasileiros e recusa o inválido', () => {
  assert.equal(lerValor('2000'), 2000);
  assert.equal(lerValor('2.000'), 2000);
  assert.equal(lerValor('2.000,50'), 2000.5);
  assert.equal(lerValor('R$ 1.250'), 1250);
  assert.equal(lerValor(''), null);
  assert.equal(lerValor('abc'), NaN);
  assert.equal(lerValor('0'), NaN, 'aluguel zero não vale');
});

test('formatarReais sem centavos', () => {
  assert.equal(formatarReais(60000).replace(/\s/g, ' '), 'R$ 60.000');
});

test('mensagem do lead com todos os dados', () => {
  const m = mensagemLead({ nome: 'Ana', perfil: 'Inquilino', aluguel: 2000, condominio: 500, iptu: null, tipo: 'Residencial', cidade: 'Santo André', whatsapp: '(11) 91234-5678', plano: 'Completo' });
  assert.equal(m, 'Olá! Fiz a simulação no site e quero a cotação do seguro fiança, plano Completo, aluguel de R$ 2.000. Novo lead do simulador: Ana · Inquilino · Aluguel R$ 2.000 · Condomínio R$ 500 · IPTU — · Residencial · Santo André · WhatsApp (11) 91234-5678');
});

// --- Título de capitalização
import { calcularTitulo, formatarReaisCentavos, mensagemLeadTitulo } from '../src/lib/simulador.ts';

test('título: exemplo do documento (aluguel 2.000 + encargos 500, 6x)', () => {
  const t = calcularTitulo({ aluguel: 2000, condominio: 300, iptu: 200, vezes: 6 });
  assert.equal(t.mensal, 2500);
  assert.equal(t.titulo, 15000);
  assert.equal(Math.round(t.parcela * 100) / 100, 833.33);
});

test('título: sem encargos e com 12x', () => {
  const t = calcularTitulo({ aluguel: 1500, condominio: null, iptu: null, vezes: 12 });
  assert.equal(t.mensal, 1500);
  assert.equal(t.titulo, 18000);
  assert.equal(t.parcela, 1000);
});

test('formatarReaisCentavos com centavos', () => {
  assert.equal(formatarReaisCentavos(833.333).replace(/\s/g, ' '), 'R$ 833,33');
});

test('mensagem do lead do título (com e sem o número de aluguéis definido)', () => {
  const base = { nome: 'Ana', perfil: 'Inquilino', aluguel: 2000, encargos: 500, tipo: 'Residencial', cidade: 'Santo André', whatsapp: '(11) 91234-5678' };
  assert.equal(
    mensagemLeadTitulo({ ...base, vezes: [6], titulos: [15000] }),
    'Olá! Simulei no site um título de capitalização de R$ 15.000 para o meu aluguel e quero a cotação. Novo lead título de capitalização: Ana · Inquilino · Aluguel R$ 2.000 · Encargos R$ 500 · 6x · Título R$ 15.000 · Residencial · Santo André · WhatsApp (11) 91234-5678',
  );
  assert.match(mensagemLeadTitulo({ ...base, vezes: [6, 12], titulos: [15000, 30000] }), /título de capitalização de R\$ 15\.000 a R\$ 30\.000 .* · 6x a 12x · Título R\$ 15\.000 a R\$ 30\.000 ·/);
});

// --- Cotação de seguro residencial: plano sugerido
import { sugerirPlano, cepValido, mensagemLeadResidencial } from '../src/lib/simulador.ts';

test('plano sugerido conforme as respostas', () => {
  // Total: casa (qualquer quantidade) ou 5+ opções
  assert.equal(sugerirPlano({ tipo: 'Casa', condicao: 'Alugado', marcadas: 0 }), 'Total');
  assert.equal(sugerirPlano({ tipo: 'Casa em condomínio', condicao: 'Próprio', marcadas: 1 }), 'Total');
  assert.equal(sugerirPlano({ tipo: 'Apartamento', condicao: 'Alugado', marcadas: 5 }), 'Total');
  // Completo: apartamento próprio ou 3 a 4 opções
  assert.equal(sugerirPlano({ tipo: 'Apartamento', condicao: 'Próprio', marcadas: 0 }), 'Completo');
  assert.equal(sugerirPlano({ tipo: 'Apartamento', condicao: 'Alugado', marcadas: 3 }), 'Completo');
  assert.equal(sugerirPlano({ tipo: 'Apartamento', condicao: 'Alugado', marcadas: 4 }), 'Completo');
  // Essencial: apartamento alugado e até 2 opções
  assert.equal(sugerirPlano({ tipo: 'Apartamento', condicao: 'Alugado', marcadas: 2 }), 'Essencial');
  assert.equal(sugerirPlano({ tipo: 'Apartamento', condicao: 'Alugado', marcadas: 0 }), 'Essencial');
});

test('CEP com 8 números', () => {
  assert.equal(cepValido('09751-000'), true);
  assert.equal(cepValido('09751000'), true);
  assert.equal(cepValido('0975'), false);
  assert.equal(cepValido(''), false);
});

test('mensagem do lead residencial no formato do documento', () => {
  const m = mensagemLeadResidencial({ nome: 'Ana', cep: '09751-000', tipo: 'Apartamento', condicao: 'Alugado', uso: 'Moradia', opcoes: ['Danos elétricos', 'Assistência 24h'], bens: 'até R$ 20 mil', plano: 'Essencial', whatsapp: '(11) 91234-5678' });
  assert.equal(m, 'Olá! Fiz a cotação de seguro residencial no site e quero receber as propostas. Novo lead seguro residencial: Ana · CEP 09751-000 · Apartamento · Alugado · Moradia · Quer proteger: Danos elétricos, Assistência 24h · Bens: até R$ 20 mil · Plano sugerido: Essencial · WhatsApp (11) 91234-5678');
});
