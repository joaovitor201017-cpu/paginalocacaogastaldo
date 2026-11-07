// Página /simulador-titulo-de-capitalizacao-aluguel (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao } from './helpers.mjs';

const html = lerPagina('/simulador-titulo-de-capitalizacao-aluguel');
const form = html.slice(html.indexOf('<form'), html.indexOf('</form>'));

test('SEO, indexável, H1 e trilha', () => {
  assert.match(html, /<title>Simulador de Título de Capitalização para Aluguel \| Grátis<\/title>/);
  assert.doesNotMatch(html, /noindex/);
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Simulador de Título de Capitalização para Aluguel<\/h1>/);
  const t = html.slice(html.indexOf('aria-label="Trilha"'), html.indexOf('</nav>', html.indexOf('aria-label="Trilha"')));
  assert.match(t, /href="\/titulo-de-capitalizacao"[^>]*>Título de Capitalização</);
});

test('selos do documento', () => {
  for (const s of ['Grátis', 'Sem consulta ao CPF', 'Resultado na hora', 'Atendimento no ABC']) assert.ok(html.includes(`${s}\n`) || html.includes(`${s}<`) || html.includes(s), s);
});

test('passo 1: aluguel, encargos, quantos aluguéis, tipo e cidade', () => {
  assert.match(form, /name="aluguel"[^>]*required|required[^>]*name="aluguel"/);
  assert.ok(form.includes('name="condominio"') && form.includes('name="iptu"'));
  for (const v of ['6', '8', '10', '12', 'nao-sei']) assert.match(form, new RegExp(`name="vezes"[^>]*value="${v}"|value="${v}"[^>]*name="vezes"`), v);
  assert.ok(form.includes('Ainda não sei'));
  assert.ok(form.includes('Pergunte à imobiliária. Se não souber, mostramos 6x e 12x'));
  assert.equal(contar(form, /name="tipo"/g), 2);
  assert.ok(form.includes('>Outra cidade<'));
  assert.match(form, />\s*Calcular meu título\s*</);
});

test('passo 2: nome, WhatsApp, perfil e consentimento', () => {
  assert.ok(form.includes('name="nome"'));
  assert.match(form, /name="whatsapp"[^>]*type="tel"|type="tel"[^>]*name="whatsapp"/);
  assert.equal(contar(form, /name="perfil"/g), 3);
  assert.match(form, /name="consentimento"[^>]*required/);
  assert.match(form, /href="\/politica-de-privacidade"/);
  assert.match(form, />\s*Ver meu resultado\s*</);
});

test('resultado: valor mensal, título, parcelamento, valor de volta, textos fixos e comparação', () => {
  for (const t of ['Valor mensal do aluguel com encargos', 'Valor do título', 'Parcelamento de exemplo', 'Valor que volta no fim']) assert.ok(form.includes(t), t);
  assert.ok(form.includes('Esse valor não é um gasto'));
  assert.ok(form.includes('Achou alto? Com o seguro fiança'));
  assert.match(form, /href="\/simulador-seguro-fianca"/);
  assert.match(form, />\s*Receber a cotação oficial no WhatsApp\s*</);
});

test('textos de SEO, FAQ sem a pergunta do prazo e chamado final', () => {
  for (const h of ['Como funciona a simulação do título de capitalização', 'Quantos aluguéis o título de capitalização costuma ter?', 'O que você precisa para contratar', 'Simulador de título de capitalização no ABC Paulista', 'Perguntas frequentes sobre a simulação', 'Prefere falar com uma pessoa?']) {
    assert.ok(html.includes(`>${h}</h2>`), h);
  }
  assert.equal(contar(secao(html, 'faq'), /<details/g), 4);
  assert.ok(!html.includes('Em quanto tempo recebo a cotação'));
  assert.ok(html.includes(encodeURIComponent('Olá! Quero simular um título de capitalização para o meu aluguel.')));
});

test('schema WebApplication e JS dentro do orçamento', () => {
  assert.ok(html.includes('"@type":"WebApplication"'));
  const inline = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  assert.ok(inline <= 5 * 1024, `JS = ${inline}`);
});
