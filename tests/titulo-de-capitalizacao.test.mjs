// Página de serviço /titulo-de-capitalizacao (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao } from './helpers.mjs';

const html = lerPagina('/titulo-de-capitalizacao');

test('SEO, noindex e um H1', () => {
  assert.match(html, /<title>Título de Capitalização Aluguel: Sem Fiador e Sem Análise<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Título de Capitalização: alugue sem fiador e receba seu dinheiro de volta<\/h1>/);
});

test('topo com 5 selos, simulação e a foto do card Título', () => {
  const topo = html.slice(html.indexOf('class="hero'), html.indexOf('id="o-que-e"'));
  assert.equal(contar(topo, /<li[\s>]/g) - 2, 5);
  assert.match(topo, /href="\/simulador-titulo-de-capitalizacao-aluguel"[^>]*>\s*Simular meu título de capitalização online/);
  assert.match(topo, /alt="Mulher etiquetando caixas da mudança no apartamento novo"/);
});

test('como funciona em 6 passos, em linhas de 3', () => {
  const s = secao(html, 'como-funciona');
  assert.equal(contar(s.slice(s.indexOf('<ol')), /<li[\s>]/g), 6);
  assert.match(s, /--colunas: 3/);
});

test('valor, prazo, pagamento e resgate em 7 cards com o exemplo da Porto', () => {
  const s = secao(html, 'coberturas');
  assert.match(s, /<h2[^>]*>Valor, prazo, pagamento e resgate<\/h2>/);
  assert.equal(contar(s, /class="cobertura"/g), 7);
  assert.equal(contar(s, /Exemplo: Porto<\/span>/g), 7);
  assert.ok(!s.includes('cobertura__tipo'), 'sem etiqueta Básica/Adicional');
  assert.match(s, /<h3[^>]*>Quando o valor do título é devolvido<\/h3>/);
});

test('sorteios e assistências com simulação', () => {
  const s = secao(html, 'assistencias');
  assert.match(s, /<h2[^>]*>Sorteios mensais e assistências<\/h2>/);
  assert.match(s, /<h3[^>]*>Assistências para o imóvel<\/h3>/);
  assert.match(s, /href="\/simulador-titulo-de-capitalizacao-aluguel"[^>]*>\s*Fazer simulação/);
});

test('vantagens, quem pode, outras garantias, FAQ e final', () => {
  assert.equal(contar(secao(html, 'vantagens'), /class="beneficio"/g), 19);
  assert.match(secao(html, 'quem-pode'), /<h3[^>]*>Documentos<\/h3>/);
  const o = secao(html, 'outras-garantias');
  for (const t of ['Seguro Fiança', 'Seguro Incêndio', 'Seguro Residencial']) assert.match(o, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  assert.ok(!o.includes('href="/titulo-de-capitalizacao"'));
  assert.equal(contar(secao(html, 'faq'), /<details/g), 11);
  assert.match(secao(html, 'chamado-final'), /<h2[^>]*>Alugue sem fiador e receba seu dinheiro de volta<\/h2>/);
});

test('schema, JS e links', () => {
  for (const t of ['Service', 'FAQPage', 'BreadcrumbList', 'InsuranceAgency']) assert.ok(html.includes(`"@type":"${t}"`), t);
  const js = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  assert.ok(js <= 5 * 1024, `JS = ${js}`);
  assert.ok(!html.includes('href="null"'));
});

test('as duas fotos do o que é são reais', () => {
  const s = secao(html, 'o-que-e');
  assert.equal(contar(s, /<picture/g), 2);
  assert.ok(!s.includes('foto__reserva'));
});
