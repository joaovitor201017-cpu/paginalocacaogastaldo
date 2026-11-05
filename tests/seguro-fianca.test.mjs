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
test('coberturas em cards roláveis com setas, logo depois das vantagens', () => {
  const s = secao(html, 'coberturas');
  assert.match(s, /<h2[^>]*>Coberturas do seguro fiança<\/h2>/);
  assert.match(s, /<h3[^>]*>Cobertura básica e coberturas adicionais<\/h3>/);
  assert.ok(!s.includes('<table'), 'sem tabela');
  assert.equal(contar(s, /class="cobertura"/g), 6);
  assert.match(s, /aria-label="Coberturas anteriores"/);
  assert.match(s, /aria-label="Próximas coberturas"/);
  assert.ok(s.includes('até 30x o valor do aluguel'));
  assert.ok(s.includes('do seguro fiança da Porto Seguro'));
  assert.match(s, /<h3[^>]*>Assistências para o imóvel<\/h3>/);
  assert.ok(html.indexOf('id="vantagens"') < html.indexOf('id="coberturas"'), 'vantagens antes das coberturas');
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
test('outras garantias: os produtos da Home, menos o Seguro Fiança', () => {
  const s = secao(html, 'outras-garantias');
  assert.match(s, /<h2[^>]*>Outras garantias locatícias<\/h2>/);
  for (const t of ['Título de Capitalização', 'Seguro Incêndio', 'Seguro Residencial']) assert.match(s, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  for (const href of ['/titulo-de-capitalizacao', '/seguro-incendio', '/seguro-residencial']) assert.ok(s.includes(`href="${href}"`), href);
  assert.ok(!s.includes('Empresarial') && !s.includes('href="/seguro-fianca"'));
  assert.equal(contar(s, /<picture/g), 3, 'as 3 fotos da Home');
  assert.ok(!s.includes('foto__reserva'));
});

test('por que a Gastaldo igual ao Sobre da Home: diferenciais e carrossel de treinamentos', () => {
  const s = secao(html, 'por-que');
  assert.match(s, /<h2[^>]*>Por que contratar seu seguro fiança com a Gastaldo Seguros<\/h2>/);
  assert.match(s, /<h3[^>]*>Nossos diferenciais<\/h3>/);
  assert.equal(contar(s, /class="diferencial"/g), 5);
  assert.equal(contar(s, /class="treino__slide/g), 5);
  assert.ok(!s.includes('Seguro fiança para imobiliárias do ABC'), 'sem o painel escuro');
});

test('cidades igual à Home, sem endereço e mapa', () => {
  const s = secao(html, 'cidades');
  assert.match(s, /<h2[^>]*>Atendemos todo o ABC Paulista<\/h2>/);
  assert.ok(s.includes('Santo André, onde fica a nossa sede'));
  assert.ok(!html.includes('class="mapa'), 'sem mapa');
  assert.ok(!html.includes('contato-linha'), 'sem linha de endereço');
});

test('topo com uma foto só: a do card Seguro Fiança', () => {
  const topo = html.slice(html.indexOf('class="hero'), html.indexOf('id="o-que-e"'));
  assert.equal(contar(topo, /<picture/g), 1);
  assert.match(topo, /alt="Família recebendo as chaves do apartamento alugado com o corretor"/);
});

test('FAQ com o título centralizado acima das perguntas', async () => {
  const { lerCssGerado } = await import('./helpers.mjs');
  assert.match(lerCssGerado() + html, /\.faq[^{]*h2[^{]*\{[^}]*text-align:center/);
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

// --- Task 6: ajustes da revisão visual
test('listas numeradas sem os números padrão do navegador', async () => {
  const { lerCssGerado } = await import('./helpers.mjs');
  const css = lerCssGerado() + html;
  assert.match(css, /\.trilha[^{]*ol[^{]*\{[^}]*list-style:none/);
  assert.match(css, /\.passos__lista[^{]*\{[^}]*list-style:none/);
  assert.ok(!/class="container estreito"/.test(html), 'o que é alinhado à esquerda como as outras seções');
});

test('nenhum link vazio para posts que ainda não existem', () => {
  assert.ok(!html.includes('href="null"'));
  assert.ok(!html.includes('Guia completo do seguro fiança'));
});

test('formas de pagamento com ícone decorativo de fundo', () => {
  const s = secao(html, 'pagamento');
  assert.match(s, /<svg[^>]*class="pagamento__marca"[^>]*aria-hidden="true"|<svg[^>]*aria-hidden="true"[^>]*class="pagamento__marca"/);
});
