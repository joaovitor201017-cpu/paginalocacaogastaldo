// Página de serviço /seguro-residencial (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao } from './helpers.mjs';

const html = lerPagina('/seguro-residencial');

test('SEO, noindex e um H1', () => {
  assert.match(html, /<title>Seguro Residencial: Casa e Apartamento \| Cotação<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Seguro Residencial: proteja sua casa ou apartamento<\/h1>/);
});

test('topo com 5 selos, botão de simulação e uma foto (a do card Residencial)', () => {
  const topo = html.slice(html.indexOf('class="hero'), html.indexOf('id="o-que-e"'));
  assert.equal(contar(topo, /<li[\s>]/g) - 2, 5, '5 selos (descontando os 2 itens da trilha)');
  assert.match(topo, /href="\/cotacao-seguro-residencial"[^>]*>\s*Simular meu seguro residencial online/);
  assert.equal(contar(topo, /<picture/g), 1);
  assert.match(topo, /alt="Encanador consertando o vazamento embaixo da pia da cozinha"/);
});

test('ordem das seções no padrão do Seguro Fiança', () => {
  const ordem = ['o-que-e', 'como-contratar', 'vantagens', 'coberturas', 'assistencias', 'outras-garantias', 'por-que', 'cidades', 'faq', 'chamado-final'].map((id) => html.indexOf(`id="${id}"`));
  for (const i of ordem) assert.ok(i > 0);
  assert.deepEqual([...ordem].sort((a, b) => a - b), ordem);
});

test('casa e apartamento com o H3 de apartamento', () => {
  const s = secao(html, 'o-que-e');
  assert.match(s, /<h2[^>]*>Seguro residencial para casa e apartamento<\/h2>/);
  assert.match(s, /<h3[^>]*>Seguro residencial para apartamento<\/h3>/);
});

test('13 coberturas em cards roláveis, sem limite', () => {
  const s = secao(html, 'coberturas');
  assert.equal(contar(s, /class="cobertura"/g), 13);
  assert.ok(!s.includes('cobertura__limite'), 'residencial não mostra limites');
  assert.match(s, /aria-label="Próximas coberturas"/);
});

test('assistências 24h com os 2 grupos', () => {
  const s = secao(html, 'assistencias');
  assert.match(s, /<h2[^>]*>Assistências 24 horas para sua casa<\/h2>/);
  assert.match(s, /<h3[^>]*>Serviços do dia a dia<\/h3>/);
  assert.match(s, /<h3[^>]*>Serviços depois de um sinistro<\/h3>/);
  assert.ok(s.includes('Encanador') && s.includes('Caçamba'));
});

test('vantagens: 3 abas com 5 cards', () => {
  assert.equal(contar(secao(html, 'vantagens'), /class="beneficio"/g), 15);
});

test('como contratar em 4 passos', () => {
  const s = secao(html, 'como-contratar');
  assert.match(s, /<h2[^>]*>Como contratar seu seguro residencial<\/h2>/);
  assert.equal(contar(s.slice(s.indexOf('<ol')), /<li[\s>]/g), 4);
  assert.ok(s.includes('O preço depende do CEP'));
});

test('outras garantias: produtos da Home menos o Residencial', () => {
  const s = secao(html, 'outras-garantias');
  for (const t of ['Seguro Fiança', 'Título de Capitalização', 'Seguro Incêndio']) assert.match(s, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  assert.ok(!s.includes('href="/seguro-residencial"'));
});

test('por que, cidades, FAQ e chamado final', () => {
  assert.equal(contar(secao(html, 'por-que'), /class="diferencial"/g), 4);
  assert.match(secao(html, 'cidades'), /<h2[^>]*>Atendemos todo o ABC Paulista<\/h2>/);
  assert.equal(contar(secao(html, 'faq'), /<details/g), 8);
  assert.match(secao(html, 'chamado-final'), /<h2[^>]*>Proteja sua casa hoje mesmo<\/h2>/);
});

test('schema e JS dentro do orçamento', () => {
  for (const t of ['Service', 'FAQPage', 'BreadcrumbList', 'InsuranceAgency']) assert.ok(html.includes(`"@type":"${t}"`), t);
  const js = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  assert.ok(js <= 5 * 1024, `JS = ${js}`);
  assert.ok(!html.includes('href="null"'));
});

test('vantagens sem o texto da Home e outras garantias em fundo branco depois das assistências', async () => {
  assert.ok(!secao(html, 'vantagens').includes('Nossas soluções para alugar foram pensadas'));
  assert.match(html, /id="outras-garantias" class="[^"]*outras--branco/);
});

test('casa e apartamento com duas imagens ao lado do texto', () => {
  const s = secao(html, 'o-que-e');
  assert.equal(contar(s, /class="foto /g), 2);
  assert.ok(s.includes('texto-servico__fotos'));
});

test('assistências com botão de simulação', () => {
  assert.match(secao(html, 'assistencias'), /href="\/cotacao-seguro-residencial"[^>]*>\s*Fazer simulação/);
});

test('fotos reais: encanador no topo e casa e apartamento no o que é', () => {
  const topo = html.slice(html.indexOf('class="hero'), html.indexOf('id="o-que-e"'));
  assert.match(topo, /alt="Encanador consertando o vazamento embaixo da pia da cozinha"/);
  const s = secao(html, 'o-que-e');
  assert.equal(contar(s, /<picture/g), 2);
  assert.ok(!s.includes('foto__reserva'));
});
