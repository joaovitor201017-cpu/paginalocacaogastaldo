import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerHome, lerCssGerado } from './helpers.mjs';

const html = lerHome();

test('documento em pt-BR', () => {
  assert.match(html, /<html lang="pt-BR"/);
});

test('title exato do PDF', () => {
  assert.match(html, /<title>Soluções para Alugar no ABC \| Garantias Locatícias – Gastaldo<\/title>/);
});

test('meta description exata do PDF', () => {
  assert.match(html, /<meta name="description" content="Soluções para alugar sem fiador ou caução no ABC: seguro fiança, título de capitalização, seguro incêndio e residencial. Corretora parceira das imobiliárias da região.">/);
});

test('preload da Poppins 700', () => {
  assert.match(html, /<link rel="preload" href="\/fonts\/poppins-700.woff2" as="font" type="font\/woff2" crossorigin/);
});

test('nenhum script externo', () => {
  assert.doesNotMatch(html, /<script[^>]+src="https?:\/\//);
});

test('CSS respeita prefers-reduced-motion', () => {
  assert.match(lerCssGerado(), /prefers-reduced-motion/);
});

test('com o domínio final a Home pode ser indexada', () => {
  assert.doesNotMatch(html, /noindex/);
});

test('páginas geradas como arquivo .html (a Cloudflare serve /rota sem redirecionar para /rota/)', async () => {
  const { existsSync } = await import('node:fs');
  for (const r of ['seguro-fianca', 'simulador-seguro-fianca', 'politica-de-privacidade']) assert.ok(existsSync(`dist/${r}.html`), r);
});

test('ícone da aba é o escudo da Gastaldo (não o padrão do Astro)', async () => {
  const { existsSync } = await import('node:fs');
  assert.ok(html.includes('<link rel="icon" href="/favicon.ico" sizes="48x48">'));
  assert.ok(html.includes('<link rel="icon" type="image/png" href="/icon-192.png" sizes="192x192">'));
  assert.ok(html.includes('<link rel="apple-touch-icon" href="/apple-touch-icon.png">'));
  assert.ok(!html.includes('favicon.svg'));
  for (const f of ['favicon.ico', 'icon-192.png', 'apple-touch-icon.png']) assert.ok(existsSync(`dist/${f}`), f);
  assert.ok(!existsSync('dist/favicon.svg'), 'ícone do Astro removido');
});
