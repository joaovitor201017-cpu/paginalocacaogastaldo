// Página /simulador-seguro-fianca (HTML gerado em dist/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina, contar, secao } from './helpers.mjs';

const html = lerPagina('/simulador-seguro-fianca');
const form = html.slice(html.indexOf('<form'), html.indexOf('</form>'));

test('SEO, noindex e H1', () => {
  assert.match(html, /<title>Simulador de Seguro Fiança: Simule Grátis em 1 Minuto<\/title>/);
  assert.match(html, /<meta name="description" content="Simule seu seguro fiança grátis e veja na hora quanto o seu aluguel fica protegido\./);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Simulador de Seguro Fiança: simule grátis em 1 minuto<\/h1>/);
});

test('trilha Início › Seguro Fiança › Simulador', () => {
  const t = html.slice(html.indexOf('aria-label="Trilha"'), html.indexOf('</nav>', html.indexOf('aria-label="Trilha"')));
  assert.match(t, /href="\/"[^>]*>Início</);
  assert.match(t, /href="\/seguro-fianca"[^>]*>Seguro Fiança</);
  assert.match(t, /aria-current="page"[^>]*>Simulador</);
});

test('selos abaixo do subtítulo', () => {
  for (const s of ['Grátis e sem compromisso', 'Resultado na hora', 'Imóveis residenciais e comerciais', 'Corretora especializada no ABC Paulista']) assert.ok(html.includes(s), s);
});

test('calculadora: 3 passos com barra de progresso', () => {
  for (const p of ['Imóvel', 'Seus dados', 'Resultado']) assert.ok(form.includes(`>${p}<`) || html.includes(`>${p}<`), p);
  assert.match(form, /Conte sobre o imóvel/);
  assert.match(form, /Para onde enviamos sua cotação\?/);
});

test('campos do passo 1', () => {
  assert.match(form, /name="aluguel"[^>]*required|required[^>]*name="aluguel"/);
  assert.match(form, /name="aluguel"[^>]*inputmode="decimal"|inputmode="decimal"[^>]*name="aluguel"/);
  assert.ok(form.includes('name="condominio"') && form.includes('name="iptu"'));
  assert.equal(contar(form, /name="tipo"/g), 2);
  const cidades = form.slice(form.indexOf('name="cidade"'), form.indexOf('</select>', form.indexOf('name="cidade"')));
  for (const c of ['Santo André', 'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra', 'Outra cidade']) assert.ok(cidades.includes(`>${c}<`), c);
});

test('campos do passo 2 e consentimento obrigatório', () => {
  assert.ok(form.includes('name="nome"') && form.includes('name="email"'));
  assert.match(form, /name="whatsapp"[^>]*type="tel"|type="tel"[^>]*name="whatsapp"/);
  assert.equal(contar(form, /name="perfil"/g), 3);
  assert.match(form, /type="checkbox"[^>]*name="consentimento"[^>]*required|name="consentimento"[^>]*required/);
  assert.match(form, /href="\/politica-de-privacidade"/);
  assert.ok(form.includes('A simulação não consulta seu CPF'));
});

test('resultado: 3 planos com "Mais escolhido" no Completo', () => {
  for (const p of ['Essencial', 'Completo', 'Total']) assert.match(form, new RegExp(`<h3[^>]*>${p}</h3>`), p);
  assert.equal(contar(form, /Mais escolhido/g), 1);
  assert.equal(contar(form, />\s*Quero este plano\s*</g), 3);
  assert.ok(form.includes('Os limites mostrados são uma referência'));
});

test('textos de SEO abaixo da calculadora', () => {
  for (const h of ['Como funciona a simulação do seguro fiança', 'O que você precisa para simular', 'O que muda o valor do seguro fiança', 'Qual plano escolher', 'Simulação de seguro fiança para inquilinos, proprietários e imobiliárias', 'Simulador de seguro fiança no ABC Paulista', 'Perguntas frequentes sobre a simulação']) {
    assert.match(html, new RegExp(`<h2[^>]*>${h}</h2>`), h);
  }
  assert.ok(html.indexOf('</form>') < html.indexOf('Como funciona a simulação do seguro fiança'));
});

test('FAQ com 6 perguntas (sem a do prazo, que ainda não tem resposta)', () => {
  const s = secao(html, 'faq');
  assert.equal(contar(s, /<details/g), 6);
  assert.ok(!s.includes('Em quanto tempo recebo a cotação'));
});

test('chamado final com Simular pelo WhatsApp e botão flutuante com a mensagem da página', () => {
  const s = secao(html, 'chamado-final');
  assert.match(s, /<h2[^>]*>Prefere falar com uma pessoa\?<\/h2>/);
  assert.match(s, />\s*Simular pelo WhatsApp\s*</);
  const msg = encodeURIComponent('Olá! Quero simular um seguro fiança.');
  assert.ok(html.includes(`class="wpp"`) && html.includes(msg));
});

test('schema WebApplication, FAQ e trilha de 3 níveis', () => {
  assert.ok(html.includes('"@type":"WebApplication"'));
  assert.ok(html.includes('"@type":"FAQPage"'));
  const t = html.match(/"@type":"BreadcrumbList".*?\]/s)[0];
  assert.equal(contar(t, /"@type":"ListItem"/g), 3);
});

test('JS dentro do orçamento e sem links quebrados', () => {
  const inline = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  assert.ok(inline <= 5 * 1024, `JS = ${inline}`);
  assert.ok(!html.includes('href="null"'));
});
