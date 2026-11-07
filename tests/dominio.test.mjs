import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { lerHome, lerPagina } from './helpers.mjs';

const DOMINIO = 'https://fianca.gastaldoseguros.com.br';
const ROTAS = ['/', '/seguro-fianca', '/titulo-de-capitalizacao', '/seguro-incendio', '/seguro-residencial', '/simulador-seguro-fianca', '/simulador-titulo-de-capitalizacao-aluguel', '/cotacao-seguro-residencial', '/cotacao-seguro-incendio', '/politica-de-privacidade'];

test('com o domínio final, as páginas são indexáveis e apontam o endereço oficial (canonical)', () => {
  for (const rota of ROTAS) {
    const html = rota === '/' ? lerHome() : lerPagina(rota);
    assert.doesNotMatch(html, /noindex/, rota);
    const esperado = rota === '/' ? `${DOMINIO}/` : `${DOMINIO}${rota}`;
    assert.ok(html.includes(`<link rel="canonical" href="${esperado}">`), rota);
  }
});

test('schema da corretora usa o domínio oficial', () => {
  assert.ok(lerHome().includes(`"url":"${DOMINIO}"`));
});

test('robots.txt libera o site e aponta o sitemap', () => {
  const r = readFileSync('dist/robots.txt', 'utf8');
  assert.match(r, /User-agent: \*/);
  assert.match(r, /Allow: \//);
  assert.ok(r.includes(`Sitemap: ${DOMINIO}/sitemap.xml`));
});

test('sitemap.xml lista todas as páginas (sem a 404)', () => {
  assert.ok(existsSync('dist/sitemap.xml'));
  const s = readFileSync('dist/sitemap.xml', 'utf8');
  for (const rota of ROTAS) assert.ok(s.includes(`<loc>${rota === '/' ? DOMINIO + '/' : DOMINIO + rota}</loc>`), rota);
  assert.ok(!s.includes('404'));
});

test('CNPJ da Gastaldo não aparece no site (rodapé e política)', () => {
  for (const rota of ['/', '/seguro-fianca', '/politica-de-privacidade']) {
    const html = rota === '/' ? lerHome() : lerPagina(rota);
    const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));
    assert.ok(!footer.includes('CNPJ'), `${rota}: rodapé`);
  }
  const politica = lerPagina('/politica-de-privacidade');
  const main = politica.slice(politica.indexOf('<main'), politica.indexOf('</main>'));
  assert.ok(!main.includes('CNPJ'), 'política');
});
