// Página de serviço /seguro-incendio (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao } from './helpers.mjs';

const html = lerPagina('/seguro-incendio');

test('SEO, noindex e um H1', () => {
  assert.match(html, /<title>Seguro Incêndio para Imóvel Alugado \| Cotação Rápida<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Seguro Incêndio para Locação<\/h1>/);
});

test('topo com 5 selos, simulação e a foto do card Incêndio', () => {
  const topo = html.slice(html.indexOf('class="hero'), html.indexOf('id="o-que-e"'));
  assert.equal(contar(topo, /<li[\s>]/g) - 2, 5);
  assert.match(topo, /href="\/cotacao-seguro-incendio"[^>]*>\s*Simular meu seguro incêndio online/);
  assert.match(topo, /alt="Cozinha de apartamento alugado à noite, com detector de fumaça no teto"/);
});

test('o que é com os 3 quadros, a lista numerada e o link para o Residencial', () => {
  const s = secao(html, 'o-que-e');
  for (const t of ['Quem paga o seguro incêndio no aluguel', 'Como funciona no contrato de aluguel', 'Seguro incêndio ou seguro residencial?']) assert.match(s, new RegExp(`<h3[^>]*>${t.replace('?', '\\?')}</h3>`), t);
  const quadro = s.slice(s.indexOf('Como funciona no contrato'));
  assert.equal(contar(quadro.slice(quadro.indexOf('<ol'), quadro.indexOf('</ol>')), /<li[\s>]/g), 4);
  assert.match(s, /href="\/seguro-residencial"/);
  assert.equal(contar(s, /class="foto /g), 2, 'duas fotos ao lado do texto (padrão)');
});

test('coberturas, assistências e faixa do imóvel comercial', () => {
  assert.equal(contar(secao(html, 'coberturas'), /class="cobertura"/g), 6);
  const a = secao(html, 'assistencias');
  assert.match(a, /<h2[^>]*>Assistências 24 horas<\/h2>/);
  assert.ok(a.includes('Vidraceiro'));
  assert.match(a, /href="\/cotacao-seguro-incendio"[^>]*>\s*Fazer simulação/);
  const c = secao(html, 'imovel-comercial');
  assert.match(c, /<h2[^>]*>Seguro incêndio para imóvel comercial alugado<\/h2>/);
  assert.match(c, /wa\.me\/5511993226252\?text=[^"]*comercial/);
});

test('vantagens, passos, outras garantias, FAQ e final', () => {
  assert.equal(contar(secao(html, 'vantagens'), /class="beneficio"/g), 14);
  assert.equal(contar(secao(html, 'como-contratar').slice(secao(html, 'como-contratar').indexOf('<ol')), /<li[\s>]/g), 4);
  const o = secao(html, 'outras-garantias');
  for (const t of ['Seguro Fiança', 'Título de Capitalização', 'Seguro Residencial']) assert.match(o, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  assert.equal(contar(secao(html, 'faq'), /<details/g), 6);
  assert.match(secao(html, 'chamado-final'), /<h2[^>]*>Resolva o seguro do seu aluguel hoje<\/h2>/);
});

test('schema, JS e links', () => {
  for (const t of ['Service', 'FAQPage', 'BreadcrumbList', 'InsuranceAgency']) assert.ok(html.includes(`"@type":"${t}"`), t);
  const js = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  assert.ok(js <= 5 * 1024, `JS = ${js}`);
  assert.ok(!html.includes('href="null"'));
});
