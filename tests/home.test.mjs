import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerHome, contar } from './helpers.mjs';

const html = lerHome();

// --- Hero e faixa de logos (Task 3)
test('um único H1 com o título do PDF', () => {
  assert.equal(contar(html, /<h1[\s>]/g), 1);
  assert.match(html, /<h1[^>]*>Soluções para Alugar no ABC<\/h1>/);
});

test('botão secundário desce para #solucoes', () => {
  assert.match(html, /href="#solucoes"[^>]*>\s*Conhecer as soluções/);
});

test('hero mostra só a avaliação do Google, sem selos de números', () => {
  const hero = html.slice(html.indexOf('class="hero'), html.indexOf('</section>', html.indexOf('class="hero')));
  assert.ok(hero.includes('4,5'), 'nota');
  assert.ok(hero.includes('27 avaliações no Google'), 'avaliações');
  for (const r of ['imobiliárias parceiras no ABC', 'contratos de aluguel garantidos', 'anos de mercado']) assert.ok(!hero.includes(r), r);
});

test('faixa de logos com a frase e as 8 imobiliárias', () => {
  assert.ok(html.includes('Parceira das principais imobiliárias do ABC'));
  for (const n of ['GRAE Imóveis', 'Tectus', 'Rosch', 'Casari Imóveis', 'BJ Flores Imóveis', 'F&amp;G Imóveis', 'Otacília Imóveis', 'Patrão Imóveis']) {
    assert.ok(html.includes(n), n);
  }
});

// --- Soluções (Task 4)
import { secao } from './helpers.mjs';

test('seção #solucoes com o H2 do PDF', () => {
  const s = secao(html, 'solucoes');
  assert.ok(s, 'seção ausente');
  assert.match(s, /<h2[^>]*>Seguros e garantias para alugar sem fiador<\/h2>/);
});

test('4 cards de solução com H3', () => {
  const s = secao(html, 'solucoes');
  for (const t of ['Seguro Fiança', 'Título de Capitalização', 'Seguro Incêndio', 'Seguro Residencial']) {
    assert.match(s, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  }
});

test('cards de soluções só têm Saiba mais', () => {
  const s2 = secao(html, 'solucoes');
  for (const h of ['/seguro-fianca', '/titulo-de-capitalizacao', '/seguro-incendio', '/seguro-residencial']) assert.ok(s2.includes(`href="${h}"`), h);
  assert.equal(contar(s2, />\s*Saiba mais\s*</g), 4);
  assert.doesNotMatch(s2, />\s*(Simular|Cotar)\s*</);
});

test('nenhum botão Cotar e simulação padronizada', () => {
  assert.doesNotMatch(html, />\s*Cotar\s*</);
  assert.ok(html.includes('Fazer simulação'));
});

test('link para o comparativo de garantias', () => {
  assert.ok(secao(html, 'solucoes').includes('Fiador, seguro fiança ou caução: qual escolher no ABC'));
});

test('trilha do carrossel é focável por teclado', () => {
  assert.match(secao(html, 'solucoes'), /class="[^"]*trilha[^"]*"[^>]*tabindex="0"|tabindex="0"[^>]*class="[^"]*trilha/);
});

// --- Benefícios em abas (Task 5)
test('H2 e parágrafo da seção de benefícios', () => {
  const s = secao(html, 'beneficios');
  assert.match(s, /<h2[^>]*>Alugar no ABC nunca foi tão fácil<\/h2>/);
  assert.ok(s.includes('Nossas soluções para alugar foram pensadas para dar agilidade e segurança a quem aluga, a quem é dono e a quem administra o imóvel.'));
});

test('tablist com 3 abas ligadas a painéis existentes', () => {
  const s = secao(html, 'beneficios');
  assert.equal(contar(s, /role="tablist"/g), 1);
  const controles = [...s.matchAll(/role="tab"[^>]*aria-controls="([^"]+)"|aria-controls="([^"]+)"[^>]*role="tab"/g)].map((m) => m[1] || m[2]);
  assert.equal(controles.length, 3);
  for (const id of controles) assert.match(s, new RegExp(`id="${id}"[^>]*role="tabpanel"|role="tabpanel"[^>]*id="${id}"`), id);
});

test('sem JS os 3 painéis ficam visíveis (nenhum hidden no HTML)', () => {
  const s = secao(html, 'beneficios');
  const paineis = s.match(/<[^>]*role="tabpanel"[^>]*>/g) || [];
  assert.equal(paineis.length, 3);
  for (const p of paineis) assert.doesNotMatch(p, /\shidden[\s>=]/);
});

test('os 3 H3 e os 21 benefícios', () => {
  const s = secao(html, 'beneficios');
  for (const t of ['Benefícios para inquilinos', 'Benefícios para proprietários', 'Benefícios para imobiliárias']) {
    assert.match(s, new RegExp(`<h3[^>]*>${t}</h3>`), t);
  }
  assert.equal(contar(s, /<li[\s>]/g), 21);
});

// --- Parceiras, Sobre e Cidades (Task 6)
test('seção #imobiliarias sem números nem depoimentos', () => {
  const s2 = secao(html, 'imobiliarias');
  assert.match(s2, /<h2[^>]*>Referência em seguros locatícios no ABC<\/h2>/);
  assert.match(s2, /<h3[^>]*>Imobiliárias parceiras<\/h3>/);
  assert.ok(!s2.includes('Números da parceria') && !s2.includes('O que as imobiliárias dizem'));
  assert.ok(s2.includes('Quero ser uma imobiliária parceira'));
});

test('logos em carrossel infinito no topo e na seção de parceiras', () => {
  for (const trecho of [html.slice(html.indexOf('class="faixa'), html.indexOf('</div>', html.indexOf('faixa__frase')) + 4000), secao(html, 'imobiliarias')]) {
    assert.match(trecho, /class="[^"]*marquee/);
    assert.match(trecho, /aria-hidden="true"[^>]*class="[^"]*marquee__lista|class="[^"]*marquee__lista[^"]*"[^>]*aria-hidden="true"/);
  }
});

test('seção #sobre com H2, texto e 4 diferenciais', () => {
  const s = secao(html, 'sobre');
  assert.match(s, /<h2[^>]*>Sobre a Gastaldo Seguros<\/h2>/);
  assert.ok(s.includes('corretora de Santo André especializada em seguros e garantias para o aluguel'));
  assert.match(s, /<h3[^>]*>Nossos diferenciais<\/h3>/);
  for (const d of ['Especialização em seguros locatícios.', 'Suporte ativo e próximo.', 'Treinamento presencial para imobiliárias.', 'Várias seguradoras parceiras.']) assert.ok(s.includes(d), d);
});

test('seção #cidades com H2 e as 7 cidades, sede marcada', () => {
  const s = secao(html, 'cidades');
  assert.match(s, /<h2[^>]*>Atendemos todo o ABC Paulista<\/h2>/);
  for (const c of ['São Bernardo do Campo', 'Santo André', 'São Caetano do Sul', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra']) assert.ok(s.includes(c), c);
  assert.ok(s.includes('Sede'));
});

// --- Contato, FAQ, CTA final e JSON-LD (Task 7)
test('seção #contato com H2 e formulário completo', () => {
  const s = secao(html, 'contato');
  assert.match(s, /<h2[^>]*>Fale com a gente<\/h2>/);
  for (const n of ['nome', 'whatsapp', 'perfil', 'mensagem']) assert.match(s, new RegExp(`name="${n}"`), n);
  for (const o of ['Inquilino', 'Proprietário', 'Imobiliária']) assert.ok(s.includes(`>${o}</option>`), o);
});

test('mapa não carrega iframe no HTML estático', () => {
  assert.doesNotMatch(html, /<iframe/);
});

test('sem FAQ e sem CTA final', () => {
  assert.ok(!html.includes('id="perguntas"') && !html.includes('Perguntas frequentes'));
  assert.ok(!html.includes('Pronto para alugar sem fiador?'));
  assert.doesNotMatch(html, /"@type":"FAQPage"/);
});

test('benefícios têm ícone ao lado de cada item', () => {
  const s2 = secao(html, 'beneficios');
  assert.equal(contar(s2, /<li[^>]*class="[^"]*beneficio[^"]*"[^>]*>\s*<span[^>]*class="[^"]*beneficio__icone/g), 21);
});

test('todo JSON-LD é válido e inclui InsuranceAgency', () => {
  const blocos = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.ok(blocos.some((b) => b['@type'] === 'InsuranceAgency'));
});
