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

test('sem domínio final o site pede para não indexar', () => {
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
});
