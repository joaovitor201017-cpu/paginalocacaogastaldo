// Página /cotacao-seguro-residencial (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao } from './helpers.mjs';

const html = lerPagina('/cotacao-seguro-residencial');
const form = html.slice(html.indexOf('<form'), html.indexOf('</form>'));

test('SEO, noindex, H1 e trilha Início › Seguro Residencial › Cotação', () => {
  assert.match(html, /<title>Cotação de Seguro Residencial Online \| Compare Seguradoras<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Cotação de Seguro Residencial: compare seguradoras em 2 minutos<\/h1>/);
  const t = html.slice(html.indexOf('aria-label="Trilha"'), html.indexOf('</nav>', html.indexOf('aria-label="Trilha"')));
  assert.match(t, /href="\/seguro-residencial"[^>]*>Seguro Residencial</);
  assert.match(t, /aria-current="page"[^>]*>Cotação</);
});

test('selos e barra de progresso', () => {
  for (const s of ['Grátis e sem compromisso', 'Várias seguradoras', 'Casa e apartamento', 'Próprio ou alugado']) assert.ok(html.includes(s), s);
  for (const e of ['Imóvel', 'Proteção', 'Seus dados']) assert.ok(form.includes(`</span>${e}</li>`), e);
});

test('passo 1: CEP, tipo, próprio ou alugado, uso e negócio em casa', () => {
  assert.match(form, /name="cep"[^>]*required|required[^>]*name="cep"/);
  for (const [nome, opcoes] of [['tipo', ['Apartamento', 'Casa', 'Casa em condomínio']], ['condicao', ['Próprio', 'Alugado']], ['uso', ['Moradia', 'Veraneio', 'Alugo para terceiros']], ['negocio', ['Sim', 'Não']]]) {
    for (const o of opcoes) assert.match(form, new RegExp(`name="${nome}"[^>]*value="${o}"|value="${o}"[^>]*name="${nome}"`), `${nome}: ${o}`);
  }
});

test('passo 2: 7 opções de proteção, assistência já marcada, e faixa de bens', () => {
  assert.ok(form.includes('A cobertura de incêndio já vem incluída'));
  assert.equal(contar(form, /type="checkbox"[^>]*name="protecao"|name="protecao"[^>]*type="checkbox"/g), 7);
  assert.match(form, /value="Assistência 24h"[^>]*checked|checked[^>]*value="Assistência 24h"/);
  for (const f of ['até R$ 20 mil', 'R$ 20 a 50 mil', 'R$ 50 a 100 mil', 'mais de R$ 100 mil', 'Não sei']) assert.ok(form.includes(f), f);
});

test('passo 3 e resultado com os 3 planos possíveis', () => {
  assert.ok(form.includes('name="nome"') && form.includes('name="email"'));
  assert.match(form, /name="consentimento"[^>]*required/);
  assert.match(form, />\s*Receber minhas propostas\s*</);
  for (const p of ['Essencial', 'Completo', 'Total']) assert.match(form, new RegExp(`data-plano-card="${p}"`), p);
  assert.match(form, />\s*Falar agora no WhatsApp\s*</);
});

test('textos de SEO, FAQ sem o prazo e chamado final sem "Cotar"', () => {
  for (const h of ['Como funciona a cotação de seguro residencial', 'O que muda o preço do seguro residencial', 'Por que cotar com uma corretora', 'Cotação de seguro residencial no ABC Paulista', 'Perguntas frequentes sobre a cotação', 'Prefere cotar com uma pessoa?']) {
    assert.ok(html.includes(`>${h}</h2>`), h);
  }
  assert.equal(contar(secao(html, 'faq'), /<details/g), 4);
  assert.ok(!html.includes('Em quanto tempo recebo as propostas'));
  assert.ok(!/>\s*Cotar pelo WhatsApp\s*</.test(html));
  assert.match(secao(html, 'chamado-final'), />\s*Simular pelo WhatsApp\s*</);
  assert.match(secao(html, 'abc'), /href="\/seguro-residencial"/);
});
