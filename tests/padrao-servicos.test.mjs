// Padrão comum a todas as páginas de serviço (estrutura, botões e fundos)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerPagina } from './helpers.mjs';

const paginas = ['/seguro-fianca', '/seguro-residencial'];

// Seções do <main> na ordem em que aparecem, com as classes de cada uma
function secoes(html) {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  return [...main.matchAll(/<section id="([^"]+)"[^>]*class="([^"]*)"/g)].map((m) => ({ id: m[1], classes: m[2] }));
}

// Faixas com fundo cinza (as demais são brancas)
const cinza = (c) => /\b(passos|pagamento|outras|cidades|assist)\b/.test(c) && !/--branco\b/.test(c);

for (const rota of paginas) {
  const html = lerPagina(rota);
  const lista = secoes(html);
  const ids = lista.map((s) => s.id);

  test(`${rota}: passo a passo logo depois do "O que é"`, () => {
    assert.equal(ids[0], 'o-que-e');
    assert.match(ids[1], /^como-(funciona|contratar)$/);
    assert.equal(ids[2], 'vantagens');
    assert.equal(ids[3], 'coberturas');
  });

  test(`${rota}: mesmas seções finais, na mesma ordem`, () => {
    assert.deepEqual(ids.slice(-5), ['outras-garantias', 'por-que', 'cidades', 'faq', 'chamado-final']);
  });

  test(`${rota}: nunca duas faixas cinza seguidas`, () => {
    for (let i = 1; i < lista.length; i++) {
      assert.ok(!(cinza(lista[i - 1].classes) && cinza(lista[i].classes)), `${lista[i - 1].id} e ${lista[i].id}`);
    }
  });

  test(`${rota}: botões do meio da página no tamanho das abas; topo e final grandes`, () => {
    const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
    const meio = main.slice(main.indexOf('id="o-que-e"'), main.indexOf('id="chamado-final"'));
    assert.ok(!/botao--g/.test(meio), 'nenhum botão grande no meio');
    const topo = main.slice(0, main.indexOf('id="o-que-e"'));
    const final = main.slice(main.indexOf('id="chamado-final"'));
    assert.equal((topo.match(/botao--g/g) || []).length, 2);
    assert.equal((final.match(/botao--g/g) || []).length, 2);
  });
}
