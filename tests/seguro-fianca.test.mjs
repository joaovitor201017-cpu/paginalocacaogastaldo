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

// --- Task 4: coberturas, vantagens, pagamento, documentos
test('tabela de coberturas acessível e pronta para virar cards no celular', () => {
  const s = secao(html, 'coberturas');
  assert.match(s, /<h2[^>]*>Coberturas do seguro fiança<\/h2>/);
  assert.match(s, /<h3[^>]*>Cobertura básica e coberturas adicionais<\/h3>/);
  const corpo = s.slice(s.indexOf('<tbody'), s.indexOf('</tbody>'));
  assert.equal(contar(corpo, /<tr[\s>]/g), 6);
  assert.equal(contar(s, /<th[^>]*scope="col"/g), 4);
  assert.equal(contar(corpo, /<td[^>]*data-rotulo="/g), 18, 'as 3 colunas de dados de cada linha têm rótulo');
  assert.ok(s.includes('do seguro fiança da Porto Seguro'));
  assert.match(s, /<h3[^>]*>Assistências para o imóvel<\/h3>/);
});

test('vantagens em 3 abas com 7 cards cada e ids próprios', () => {
  const s = secao(html, 'vantagens');
  assert.match(s, /<h2[^>]*>Vantagens do seguro fiança para inquilino, proprietário e imobiliária<\/h2>/);
  for (const t of ['Vantagens para o inquilino', 'Vantagens para o proprietário', 'Vantagens para a imobiliária']) assert.match(s, new RegExp(`<h3[^>]*>${t}</h3>`));
  assert.equal(contar(s, /class="beneficio"/g), 21);
  assert.match(s, /id="aba-vantagens-inquilinos"/);
});

test('formas de pagamento com Simular agora e documentos', () => {
  const s = secao(html, 'pagamento');
  assert.match(s, /<h2[^>]*>Formas de pagamento<\/h2>/);
  assert.match(s, /href="\/simulador-seguro-fianca"[^>]*>\s*Simular agora/);
  const q = secao(html, 'quem-pode');
  assert.match(q, /<h3[^>]*>Documentos para o seguro fiança<\/h3>/);
  assert.equal(contar(q.slice(q.indexOf('<ul')), /<li[\s>]/g), 3);
});

// --- Task 5: outras garantias, por que a Gastaldo, cidades, FAQ, chamado final
test('outras garantias com 3 links', () => {
  const s = secao(html, 'outras-garantias');
  assert.match(s, /<h2[^>]*>Outras garantias locatícias<\/h2>/);
  for (const href of ['/titulo-de-capitalizacao', '/seguro-fianca-empresarial', '/seguro-incendio']) assert.ok(s.includes(`href="${href}"`), href);
});

test('por que a Gastaldo: 5 diferenciais e bloco para imobiliárias', () => {
  const s = secao(html, 'por-que');
  assert.match(s, /<h2[^>]*>Por que contratar seu seguro fiança com a Gastaldo Seguros<\/h2>/);
  assert.match(s, /<h3[^>]*>Nossos diferenciais<\/h3>/);
  assert.equal(contar(s, /class="diferencial"/g), 5);
  assert.match(s, /<h3[^>]*>Seguro fiança para imobiliárias do ABC<\/h3>/);
  assert.ok(s.includes('Quero ser imobiliária parceira'));
});

test('cidades com sede em Santo André, endereço real e mapa', () => {
  const s = secao(html, 'cidades');
  assert.match(s, /<h2[^>]*>Seguro fiança no ABC Paulista: cidades atendidas<\/h2>/);
  assert.ok(s.includes('Santo André, onde fica a nossa sede'));
  assert.ok(html.includes('Av. Pereira Barreto, 1395'));
  assert.ok(html.includes('class="mapa'), 'fachada do mapa presente');
});

test('FAQ em sanfona com as 9 perguntas', () => {
  const s = secao(html, 'faq');
  assert.match(s, /<h2[^>]*>Perguntas frequentes sobre seguro fiança<\/h2>/);
  assert.equal(contar(s, /<details/g), 9);
  assert.equal(contar(s, /<summary[^>]*>\s*<h3/g), 9);
  assert.ok(s.includes('Como acionar o seguro fiança?'));
});

test('chamado final com os dois botões', () => {
  const s = secao(html, 'chamado-final');
  assert.match(s, /<h2[^>]*>Alugue sem fiador hoje mesmo<\/h2>/);
  assert.ok(s.includes('Simular meu seguro fiança online') && s.includes('Falar no WhatsApp'));
});

test('JS da página dentro do orçamento de 5 KB', () => {
  const js = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  assert.ok(js <= 5 * 1024, `JS = ${js} bytes`);
});

test('nenhum link vazio para posts que ainda não existem', () => {
  assert.ok(!html.includes('href="null"'));
  assert.ok(!html.includes('Guia completo do seguro fiança'));
});
