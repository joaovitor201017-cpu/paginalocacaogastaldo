// Página de serviço /seguro-fianca (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao } from './helpers.mjs';

const html = lerPagina('/seguro-fianca');

// --- Task 3: SEO, trilha, topo, o que é, como funciona
test('title, description e noindex', () => {
  assert.match(html, /<title>Seguro Fiança Locatícia: Alugue sem Fiador e sem Caução<\/title>/);
  assert.match(html, /<meta name="description" content="Seguro fiança locatícia no ABC Paulista com corretora especializada\. Alugue sem fiador e sem caução\. Simule grátis e receba a cotação no WhatsApp\.">/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
});

test('um único H1 com o título do documento', () => {
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Seguro Fiança Locatícia: alugue sem fiador e sem caução<\/h1>/);
});

test('trilha Início › Seguro Fiança', () => {
  assert.match(html, /<nav[^>]*aria-label="Trilha"[\s\S]*?<a href="\/"[^>]*>Início<\/a>[\s\S]*?aria-current="page"[^>]*>Seguro Fiança</);
});

test('topo com selos e os dois botões', () => {
  for (const s of ['Análise online e rápida', 'Imóveis residenciais e comerciais', 'Atendimento em todo o ABC Paulista']) assert.ok(html.includes(s), s);
  assert.match(html, /href="\/simulador-seguro-fianca"[^>]*>\s*Simular meu seguro fiança online/);
  const link = `https://wa.me/5511993226252?text=${encodeURIComponent('Olá! Quero fazer uma cotação de seguro fiança.')}`;
  const tag = html.slice(html.indexOf(`href="${link}"`), html.indexOf('</a>', html.indexOf(`href="${link}"`)));
  assert.ok(tag.includes('Falar com um corretor no WhatsApp'), 'botão secundário leva ao WhatsApp com a mensagem da página');
});

test('botão flutuante do WhatsApp usa a mensagem da página', () => {
  const link = `https://wa.me/5511993226252?text=${encodeURIComponent('Olá! Quero fazer uma cotação de seguro fiança.')}`;
  const tag = html.slice(html.lastIndexOf('<a', html.indexOf('class="wpp')), html.indexOf('>', html.indexOf('class="wpp')));
  assert.ok(tag.includes(`href="${link}"`), tag);
});

test('o que é e como funciona em 5 passos', () => {
  assert.match(html, /<h2[^>]*>O que é o seguro fiança locatícia\?<\/h2>/);
  const s = secao(html, 'como-funciona');
  assert.match(s, /<h2[^>]*>Como funciona o seguro fiança para aluguel<\/h2>/);
  assert.equal(contar(s.slice(s.indexOf('<ol')), /<li[\s>]/g), 5);
});

test('schema com Service e BreadcrumbList', () => {
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"@type":"FAQPage"/);
});
