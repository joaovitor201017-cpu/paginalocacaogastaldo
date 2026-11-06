// Regressões dos bugs apontados no QA (Marivone) e na revisão visual (Leonardo)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerHome, lerCssGerado } from './helpers.mjs';

const html = lerHome();
const css = lerCssGerado();

test('carrossel de logos anima em loop e fica parado (quebrando linha) com movimento reduzido', () => {
  assert.match(css, /\.marquee__lista[^{]*\{[^}]*animation:[^;}]*infinite/);
  const blocos = css.split('prefers-reduced-motion').slice(1).map((b) => b.slice(0, 600));
  const regra = blocos.map((b) => (b.match(/\.marquee__lista[^{]*\{([^}]*)\}/) || [])[1]).find(Boolean) || '';
  assert.match(regra, /animation:\s*none/);
  assert.match(regra, /flex-wrap:\s*wrap/);
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

test('carrossel do topo tem espaçamento maior entre as logos', async () => {
  assert.match(lerCssGerado(), /\.faixa__marquee[^{]*\{[^}]*--espaco:clamp\(2\.5rem, ?5vw, ?4\.5rem\)/);
});

test('textos do hero um pouco maiores', () => {
  const css = lerCssGerado();
  assert.match(css, /\.hero[^{]*h1[^{]*\{[^}]*font-size:clamp\(2\.25rem, ?1\.7rem \+ 2\.4vw, ?3\.5rem\)/);
  assert.match(css, /\.hero__sub[^{]*\{[^}]*font-size:clamp\(1\.0625rem, ?1rem \+ \.3vw, ?1\.25rem\)/);
  const html = lerHome();
  const hero = html.slice(html.indexOf('class="hero'), html.indexOf('class="hero__fotos'));
  assert.equal((hero.match(/botao--g/g) || []).length, 2);
});

test('ícones dos contatos sem o quadrado azul de fundo', () => {
  const regra = lerCssGerado().match(/\.contato__icone[^{]*\{([^}]*)\}/);
  assert.ok(regra, 'regra do ícone existe');
  assert.ok(!/background/.test(regra[1]), regra[1]);
});

test('títulos com mais espaço entre linhas e cabeçalho das abas mais largo', () => {
  const css = lerCssGerado();
  assert.match(css, /h2[^{]*\{[^}]*line-height:1\.22/);
  assert.match(css, /\.beneficios__topo[^{]*\{[^}]*max-width:78ch/);
});

test('fotos do carrossel de treinamentos não repetem a legenda no texto alternativo', () => {
  const html = lerHome();
  const slides = [...html.matchAll(/<li class="treino__slide[\s\S]*?<\/li>/g)].map((m) => m[0]);
  assert.ok(slides.length > 0);
  for (const s of slides) {
    const alt = (s.match(/<img[^>]*alt="([^"]*)"/) || [])[1];
    const legenda = (s.match(/class="treino__legenda"[^>]*>([^<]*)</) || [])[1];
    assert.notEqual(alt, legenda, 'alt igual à legenda');
  }
});
