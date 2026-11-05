// Regressões dos bugs apontados no QA (Marivone) e na revisão visual (Leonardo)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerHome, lerCssGerado } from './helpers.mjs';

const html = lerHome();
const css = lerCssGerado();

test('faixa de imobiliárias quebra linha em vez de esconder nomes', () => {
  const regra = css.match(/\.faixa__lista\[[^\]]+\]\{[^}]*\}|\.faixa__lista[^{,]*\{[^}]*\}/g).join(' ');
  assert.match(regra, /flex-wrap:\s*wrap/);
  assert.doesNotMatch(regra, /overflow-x:\s*auto/);
});

test('formulário sem JS leva a mensagem no parâmetro text', () => {
  const form = html.match(/<form[^>]*class="contato__form[\s\S]*?<\/form>/)[0];
  assert.match(form, /action="https:\/\/wa\.me\/[^"?]*"/);
  assert.match(form, /<input type="hidden" name="text" value="[^"]+"/);
});

test('página marca .js no <html> antes do conteúdo (menu mobile visível sem JS)', () => {
  const head = html.slice(0, html.indexOf('</head>'));
  assert.match(head, /document\.documentElement\.classList\.add\(['"]js['"]\)/);
  assert.match(css, /\.js \.topo__nav/);
});

test('Esc fecha o menu mobile', () => {
  assert.match(html, /key === 'Escape'/);
});
