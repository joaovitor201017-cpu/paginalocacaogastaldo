import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerHome, contar } from './helpers.mjs';

const html = lerHome();
const header = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));

test('header usa o logo marinho', () => {
  assert.match(header, /\/brand\/logo-gastaldo\.png/);
});

test('footer usa o logo branco e as colunas do PDF', () => {
  assert.match(footer, /\/brand\/logo-gastaldo-branco\.png/);
  for (const t of ['Soluções', 'Simuladores', 'Institucional']) assert.ok(footer.includes(t), t);
});

test('um único botão flutuante de WhatsApp com a mensagem padrão', () => {
  const msg = encodeURIComponent('Olá! Quero saber sobre as soluções para alugar.');
  assert.equal(contar(html, /aria-label="Falar no WhatsApp"/g), 1);
  const m = html.match(/<a[^>]*aria-label="Falar no WhatsApp"[^>]*>/)[0];
  assert.ok(m.includes(`text=${msg.replace(/&/g, '&amp;')}`), m);
});
