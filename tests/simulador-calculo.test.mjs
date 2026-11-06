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
