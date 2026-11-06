// Página /cotacao-seguro-incendio (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao, jsDaPagina } from './helpers.mjs';

const html = lerPagina('/cotacao-seguro-incendio');
const form = html.slice(html.indexOf('<form'), html.indexOf('</form>'));

test('SEO, noindex, H1 e trilha Início › Seguro Incêndio › Cotação', () => {
  assert.match(html, /<title>Cotação de Seguro Incêndio para Aluguel \| Apólice Rápida<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Cotação de Seguro Incêndio para Aluguel: a apólice que a imobiliária pede<\/h1>/);
  const t = html.slice(html.indexOf('aria-label="Trilha"'), html.indexOf('</nav>', html.indexOf('aria-label="Trilha"')));
  assert.match(t, /href="\/seguro-incendio"[^>]*>Seguro Incêndio</);
  assert.match(t, /aria-current="page"[^>]*>Cotação</);
});

test('selos sem preço inventado e progresso em 2 passos', () => {
  for (const s of ['Grátis', 'Dentro da exigência do contrato', 'Apólice rápida']) assert.ok(html.includes(s), s);
  assert.ok(!html.includes('A partir de R$'));
  assert.ok(form.includes('</span>Contrato</li>') && form.includes('</span>Seus dados</li>'));
});

test('passo 1: dados do contrato', () => {
  for (const n of ['cep', 'aluguel']) assert.match(form, new RegExp(`name="${n}"[^>]*required|required[^>]*name="${n}"`), n);
  assert.ok(form.includes('name="cobertura"') && form.includes('Está na cláusula de seguro do contrato'));
  for (const o of ['Apartamento', 'Casa', 'Comercial']) assert.match(form, new RegExp(`name="tipo"[^>]*value="${o}"`), o);
  for (const o of ['Sim', 'Não', 'Não sei']) assert.match(form, new RegExp(`name="beneficiario"[^>]*value="${o}"`), o);
  assert.ok(form.includes('name="imobiliaria"') && form.includes('Ajuda a emitir no padrão que ela pede'));
  assert.equal(contar(form, /name="extras"/g), 4);
  assert.ok(form.includes('>Outra cidade<'));
});

test('passo 2: dados, prazo e consentimento', () => {
  assert.equal(contar(form, /name="perfil"/g), 3);
  for (const o of ['Hoje', 'Esta semana', 'Ainda vou alugar']) assert.match(form, new RegExp(`name="prazo"[^>]*value="${o}"`), o);
  assert.match(form, /name="consentimento"[^>]*required/);
  assert.match(form, />\s*Receber minha cotação\s*</);
});

test('resultado: resumo com os 4 itens e o botão de urgência', () => {
  for (const i of ['Cobertura de incêndio', 'Beneficiário', 'Coberturas extras', 'Preço']) assert.ok(form.includes(`>${i}<`), i);
  assert.match(form, />\s*Preciso da apólice hoje\s*</);
});

test('textos de SEO, FAQ sem o prazo e chamado final', () => {
  for (const h of ['Como funciona a cotação do seguro incêndio', 'Não sabe o valor de cobertura?', 'Quanto custa o seguro incêndio', 'Cotação de seguro incêndio no ABC Paulista', 'Perguntas frequentes sobre a cotação', 'Precisa com urgência?']) {
    assert.ok(html.includes(`>${h}</h2>`), h);
  }
  assert.equal(contar(secao(html, 'faq'), /<details/g), 4);
  assert.ok(!html.includes('Em quanto tempo recebo a apólice'));
  assert.match(secao(html, 'chamado-final'), />\s*Falar no WhatsApp agora\s*</);
  assert.match(secao(html, 'abc'), /href="\/seguro-incendio"/);
});

test('JS dentro do orçamento dos simuladores', () => {
  assert.ok(jsDaPagina(html) <= 8 * 1024);
});
