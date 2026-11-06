import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerHome, contar } from './helpers.mjs';

const html = lerHome();
const header = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));

test('header usa o logo marinho', () => {
  assert.match(header, /\/brand\/logo-gastaldo\.png/);
});

test('rodapé no novo formato: topo com logo, frase e dados; 4 colunas; faixa de baixo', () => {
  assert.match(footer, /\/brand\/logo-gastaldo-branco\.png/);
  assert.ok(footer.includes('Corretora de seguros e garantias para o aluguel no ABC Paulista, desde 2015.'));
  assert.ok(footer.includes('Av. Pereira Barreto, 1395'));
  assert.match(footer, /href="tel:\+5511993226252"/);
  for (const t of ['Atendimento', 'Seguros e garantias', 'Simuladores', 'Cidades atendidas']) assert.match(footer, new RegExp(`class="rodape__titulo"[^>]*>${t}<`), t);
  for (const href of ['/seguro-fianca', '/titulo-de-capitalizacao', '/seguro-incendio', '/seguro-residencial', '/simulador-seguro-fianca', '/simulador-titulo-de-capitalizacao-aluguel', '/cotacao-seguro-residencial', '/cotacao-seguro-incendio', '/politica-de-privacidade', '/#contato', '/#sobre']) {
    assert.ok(footer.includes(`href="${href}"`), href);
  }
  for (const c of ['Santo André', 'São Bernardo do Campo', 'Rio Grande da Serra']) assert.ok(footer.includes(c), c);
  assert.ok(footer.includes('class="rodape__base'), 'faixa de baixo');
});

test('rodapé com as redes sociais (Instagram e Facebook) em todas as páginas', async () => {
  const { lerPagina } = await import('./helpers.mjs');
  for (const pagina of [html, lerPagina('/seguro-fianca'), lerPagina('/simulador-seguro-fianca')]) {
    const f = pagina.slice(pagina.indexOf('<footer'), pagina.indexOf('</footer>'));
    assert.match(f, /href="https:\/\/www\.instagram\.com\/gastaldoseguros\/"[^>]*aria-label="Gastaldo Seguros no Instagram"|aria-label="Gastaldo Seguros no Instagram"[^>]*href="https:\/\/www\.instagram\.com\/gastaldoseguros\/"/);
    assert.match(f, /href="https:\/\/www\.facebook\.com\/gastaldoseguros"/);
    assert.match(f, /rel="noopener[^"]*"/);
  }
});

test('redes sociais também no Sobre da Home e no schema (sameAs)', () => {
  const sobre = html.slice(html.indexOf('id="sobre"'), html.indexOf('</section>', html.indexOf('id="sobre"')));
  assert.ok(sobre.includes('instagram.com/gastaldoseguros') && sobre.includes('facebook.com/gastaldoseguros'));
  assert.match(html, /"sameAs":\["https:\/\/www\.instagram\.com\/gastaldoseguros\/","https:\/\/www\.facebook\.com\/gastaldoseguros"\]/);
});

test('um único botão flutuante de WhatsApp com a mensagem padrão', () => {
  const msg = encodeURIComponent('Olá! Quero saber sobre as soluções para alugar.');
  assert.equal(contar(html, /aria-label="Falar no WhatsApp"/g), 1);
  const m = html.match(/<a[^>]*aria-label="Falar no WhatsApp"[^>]*>/)[0];
  assert.ok(m.includes(`text=${msg.replace(/&/g, '&amp;')}`), m);
});

test('rodapé: atendimento com horário (inclusive fim de semana), WhatsApp e e-mail, com ícones; sem mapa', () => {
  assert.ok(footer.includes('Segunda a sexta, das 9h às 18h'));
  assert.ok(footer.includes('Sábado e domingo: fechado'));
  assert.ok(footer.includes('contato@gastaldoseguros.com.br'));
  assert.match(footer, /WhatsApp \(11\) 99322-6252/);
  assert.equal((footer.match(/class="rodape__icone"/g) || []).length, 3);
  assert.ok(!footer.includes('class="mapa'), 'mapa fica só na seção de contato');
});

test('script do mapa vai uma vez só, mesmo com dois mapas na página', () => {
  assert.equal((html.match(/Troca a fachada pelo iframe/g) || []).length, 0, 'não fica mais inline repetido');
});

test('menu chama a seção de produtos de Seguros', () => {
  const header = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
  assert.match(header, /href="\/#solucoes"[^>]*>\s*Seguros\s*<svg[^>]*class="topo__seta/);
  assert.ok(!header.includes('>Soluções<'));
});

test('cabeçalho leva a todas as páginas do site (submenus de Seguros e Simuladores)', async () => {
  const { lerPagina } = await import('./helpers.mjs');
  for (const pagina of [html, lerPagina('/seguro-fianca'), lerPagina('/cotacao-seguro-incendio')]) {
    const h = pagina.slice(pagina.indexOf('<header'), pagina.indexOf('</header>'));
    for (const href of ['/seguro-fianca', '/titulo-de-capitalizacao', '/seguro-incendio', '/seguro-residencial', '/simulador-seguro-fianca', '/simulador-titulo-de-capitalizacao-aluguel', '/cotacao-seguro-incendio', '/cotacao-seguro-residencial', '/#imobiliarias', '/#sobre', '/#contato']) {
      assert.ok(h.includes(`href="${href}"`), href);
    }
    assert.match(h, /<ul[^>]*class="topo__sub"[^>]*aria-label="Seguros"/);
    assert.match(h, /<ul[^>]*class="topo__sub"[^>]*aria-label="Simuladores"/);
  }
});
