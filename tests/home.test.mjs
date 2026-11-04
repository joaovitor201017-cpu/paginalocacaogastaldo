import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerHome, contar } from './helpers.mjs';

const html = lerHome();

// --- Hero e faixa de logos (Task 3)
test('um único H1 com o título do PDF', () => {
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Soluções para Alugar no ABC<\/h1>/);
});

test('botão secundário desce para #solucoes', () => {
  assert.match(html, /href="#solucoes"[^>]*>\s*Conhecer as soluções/);
});

test('os 4 selos do hero estão presentes', () => {
  for (const r of ['imobiliárias parceiras no ABC', 'contratos de aluguel garantidos', 'anos de mercado', 'no Google com']) {
    assert.ok(html.includes(r), r);
  }
});

test('faixa de logos com a frase e as 8 imobiliárias', () => {
  assert.ok(html.includes('Parceira das principais imobiliárias do ABC'));
  for (const n of ['GRAE Imóveis', 'Tectus', 'Rosch', 'Casari Imóveis', 'BJ Flores Imóveis', 'F&amp;G Imóveis', 'Otacília Imóveis', 'Patrão Imóveis']) {
    assert.ok(html.includes(n), n);
  }
});

// --- Soluções (Task 4)
import { secao } from './helpers.mjs';

test('seção #solucoes com o H2 do PDF', () => {
  const s = secao(html, 'solucoes');
  assert.ok(s, 'seção ausente');
  assert.match(s, /<h2[^>]*>Seguros e garantias para alugar sem fiador<\/h2>/);
});

test('4 cards de solução com H3', () => {
  const s = secao(html, 'solucoes');
  for (const t of ['Seguro Fiança', 'Título de Capitalização', 'Seguro Incêndio', 'Seguro Residencial']) {
    assert.match(s, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  }
});

test('os 8 links de Saiba mais / Simular / Cotar do PDF', () => {
  const s = secao(html, 'solucoes');
  for (const h of ['/seguro-fianca', '/simulador-seguro-fianca', '/titulo-de-capitalizacao', '/simulador-titulo-de-capitalizacao-aluguel', '/seguro-incendio', '/cotacao-seguro-incendio', '/seguro-residencial', '/cotacao-seguro-residencial']) {
    assert.ok(s.includes(`href="${h}"`), h);
  }
});

test('link para o comparativo de garantias', () => {
  assert.ok(secao(html, 'solucoes').includes('Fiador, seguro fiança ou caução: qual escolher no ABC'));
});

test('trilha do carrossel é focável por teclado', () => {
  assert.match(secao(html, 'solucoes'), /class="[^"]*trilha[^"]*"[^>]*tabindex="0"|tabindex="0"[^>]*class="[^"]*trilha/);
});

// --- Benefícios em abas (Task 5)
test('H2 e parágrafo da seção de benefícios', () => {
  const s = secao(html, 'beneficios');
  assert.match(s, /<h2[^>]*>Alugar no ABC nunca foi tão fácil<\/h2>/);
  assert.ok(s.includes('Nossas soluções para alugar foram pensadas para dar agilidade e segurança a quem aluga, a quem é dono e a quem administra o imóvel.'));
});

test('tablist com 3 abas ligadas a painéis existentes', () => {
  const s = secao(html, 'beneficios');
  assert.equal(contar(s, /role="tablist"/g), 1);
  const controles = [...s.matchAll(/role="tab"[^>]*aria-controls="([^"]+)"|aria-controls="([^"]+)"[^>]*role="tab"/g)].map((m) => m[1] || m[2]);
  assert.equal(controles.length, 3);
  for (const id of controles) assert.match(s, new RegExp(`id="${id}"[^>]*role="tabpanel"|role="tabpanel"[^>]*id="${id}"`), id);
});

test('sem JS os 3 painéis ficam visíveis (nenhum hidden no HTML)', () => {
  const s = secao(html, 'beneficios');
  const paineis = s.match(/<[^>]*role="tabpanel"[^>]*>/g) || [];
  assert.equal(paineis.length, 3);
  for (const p of paineis) assert.doesNotMatch(p, /\shidden[\s>=]/);
});

test('os 3 H3 e os 21 benefícios', () => {
  const s = secao(html, 'beneficios');
  for (const t of ['Benefícios para inquilinos', 'Benefícios para proprietários', 'Benefícios para imobiliárias']) {
    assert.match(s, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  }
  assert.equal(contar(s, /<li[\s>]/g), 21);
});
