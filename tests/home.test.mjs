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

test('hero sem selos de números e sem avaliação do Google', () => {
  const hero = html.slice(html.indexOf('class="hero'), html.indexOf('</section>', html.indexOf('class="hero')));
  for (const r of ['avaliações no Google', 'imobiliárias parceiras no ABC', 'contratos de aluguel garantidos', 'anos de mercado']) assert.ok(!hero.includes(r), r);
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
  assert.ok(s.includes('Desde 2015'), 'texto sobre nós do cliente');
  assert.ok(!s.includes('história real'), 'sem pendência de história');
  assert.match(s, /<h3[^>]*>Nossos diferenciais<\/h3>/);
  for (const d of ['Especialização em seguros locatícios', 'Suporte ativo e próximo', 'Treinamento presencial para imobiliárias', 'Várias seguradoras parceiras']) assert.ok(s.includes(d), d);
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

// --- Dados de contato reais
test('contato mostra os dados reais e links clicáveis', () => {
  const s = secao(html, 'contato');
  assert.ok(s.includes('href="tel:+5511993226252"'), 'telefone');
  assert.ok(s.includes('href="mailto:contato@gastaldoseguros.com.br"'), 'e-mail');
  assert.ok(s.includes('Av. Pereira Barreto, 1395 - Sl 65B - Paraíso, Santo André - SP, 09751-000'), 'endereço');
  assert.ok(s.includes('Segunda a sexta, das 9h às 18h'), 'horário');
  assert.ok(!s.includes('class="pendente"'), 'sem pendências no contato');
});

test('todos os links de WhatsApp apontam para 5511993226252', () => {
  const links = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"?]*)/g)].map((m) => m[1]);
  assert.ok(links.length > 0);
  for (const l of links) assert.equal(l, 'https://wa.me/5511993226252');
});

// --- Ajustes de contato, benefícios e SUSEP
test('cada canal de contato tem ícone ao lado', () => {
  assert.equal(contar(secao(html, 'contato'), /class="contato__icone/g), 5);
});

test('botões dos três públicos de benefícios têm o mesmo estilo', () => {
  const s = secao(html, 'beneficios');
  assert.equal(contar(s, /class="botao botao--primario/g), 3);
  assert.doesNotMatch(s, /botao--whatsapp/);
});

test('SUSEP não aparece no site', () => {
  assert.doesNotMatch(html, /SUSEP/);
});

// --- Sobre: diferenciais à esquerda, carrossel de treinamentos à direita
test('sobre tem diferenciais na coluna do texto e carrossel de treinamentos', () => {
  const s = secao(html, 'sobre');
  const texto = s.slice(s.indexOf('sobre__texto'), s.indexOf('sobre__treinamentos'));
  assert.ok(texto.includes('Nossos diferenciais'), 'diferenciais ficam na coluna do texto');
  assert.ok(s.indexOf('sobre__treinamentos') > s.indexOf('Nossos diferenciais'), 'carrossel vem depois, à direita');
  assert.ok(contar(s, /class="treino__slide/g) >= 3, 'ao menos 3 fotos de treinamento');
  assert.match(s, /aria-label="Fotos dos treinamentos[^"]*"/);
});

test('hero mostra as 2 fotos reais otimizadas, a principal com prioridade', () => {
  const html = lerHome();
  const hero = html.slice(html.indexOf('class="hero'), html.indexOf('id="solucoes"'));
  assert.equal(contar(hero, /<picture/g), 2);
  assert.match(hero, /<img[^>]*alt="Casal sorrindo carregando caixas de mudança no apartamento alugado"[^>]*fetchpriority="high"|fetchpriority="high"[^>]*alt="Casal sorrindo carregando caixas de mudança no apartamento alugado"/);
  assert.match(hero, /alt="Entrega das chaves do imóvel alugado"/);
  assert.match(hero, /type="image\/avif"/);
});

test('card de Título de Capitalização tem foto real', () => {
  const html = lerHome();
  assert.match(html, /alt="Mulher etiquetando caixas da mudança no apartamento novo"/);
});

test('cards de Seguro Fiança e Seguro Incêndio têm foto real', () => {
  const html = lerHome();
  assert.match(html, /alt="Família recebendo as chaves do apartamento alugado com o corretor"/);
  assert.match(html, /alt="Cozinha de apartamento alugado à noite, com detector de fumaça no teto"/);
});

test('logos reais: cinza no carrossel do topo e coloridas nos cards das parceiras', () => {
  const nomes = ['GRAE Imóveis', 'Tectus', 'Rosch', 'Casari Imóveis', 'BJ Flores Imóveis', 'F&amp;G Imóveis', 'Otacília Imóveis', 'Patrão Imóveis'];
  const faixa = html.slice(html.indexOf('class="faixa'), html.indexOf('id="solucoes"'));
  const parceiras = secao(html, 'imobiliarias');
  for (const n of nomes) {
    assert.match(faixa, new RegExp(`<img[^>]*alt="${n}"[^>]*src="[^"]*-cinza[^"]*"|<img[^>]*src="[^"]*-cinza[^"]*"[^>]*alt="${n}"`), `faixa: ${n}`);
    assert.match(parceiras, new RegExp(`<img[^>]*alt="${n}"`), `parceiras: ${n}`);
  }
  assert.ok(!/-cinza/.test(parceiras), 'parceiras usam as logos coloridas');
});

test('card de Seguro Residencial tem foto real e nenhum card fica com reserva', () => {
  const s = secao(html, 'solucoes');
  assert.match(s, /alt="Casal tomando café e conversando no sofá de casa"/);
  assert.ok(!s.includes('foto__reserva'), 'sem espaços reservados nos cards');
});

test('sobre sem a reserva de logos das seguradoras e sem o link do blog', () => {
  const s = secao(html, 'sobre');
  assert.ok(!s.includes('logos das seguradoras parceiras'));
  assert.ok(!s.includes('gastaldo-seguros-corretora-especializada'));
});

test('carrossel de treinamentos com as 5 fotos reais e legenda da Casari', () => {
  const s = secao(html, 'sobre');
  assert.equal(contar(s, /class="treino__slide/g), 5);
  assert.equal(contar(s, /<picture/g), 5);
  assert.ok(!s.includes('treinamento-5'), 'foto 5 removida');
  assert.ok(!s.includes('foto__reserva'), 'sem espaços reservados');
  assert.match(s, /Treinamento na Casari Imóveis/);
});
