// Páginas de apoio: Política de Privacidade e página de "não encontrada" (404)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lerPagina, contar } from './helpers.mjs';

test('política de privacidade existe, com H1 e as seções da LGPD', () => {
  const html = lerPagina('/politica-de-privacidade');
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Política de Privacidade<\/h1>/);
  for (const h of ['Quem cuida dos seus dados', 'Quais dados coletamos', 'Para que usamos seus dados', 'Com quem compartilhamos', 'Por quanto tempo guardamos', 'Seus direitos', 'Cookies e serviços de terceiros', 'Como falar com a gente']) {
    assert.match(html, new RegExp(`<h2[^>]*>${h}</h2>`), h);
  }
  assert.ok(html.includes('Lei 13.709/2018'));
  assert.ok(html.includes('contato@gastaldoseguros.com.br'));
  assert.ok(html.includes('não pedimos o seu CPF'));
  assert.doesNotMatch(html, /noindex/);
});

test('página 404 com caminhos úteis', () => {
  const html = readFileSync('dist/404.html', 'utf8');
  assert.match(html, /<h1[^>]*>Página não encontrada<\/h1>/);
  for (const href of ['/', '/simulador-seguro-fianca', '/seguro-fianca', '/titulo-de-capitalizacao', '/seguro-incendio', '/seguro-residencial']) assert.ok(html.includes(`href="${href}"`), href);
  assert.ok(html.includes('wa.me/5511993226252'));
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
});
