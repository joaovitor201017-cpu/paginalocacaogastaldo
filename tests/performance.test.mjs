import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { lerHome, lerCssGerado, lerPagina, jsDaPagina } from './helpers.mjs';

const html = lerHome();

// Mede o que cada página realmente carrega (inline + arquivos chamados + importados)
test('JS total enviado ao cliente ≤ 5 KB', () => {
  const total = jsDaPagina(html);
  assert.ok(total <= 5 * 1024, `JS = ${total} bytes`);
});

test('JS dos simuladores ≤ 8 KB (calculadora inclusa)', () => {
  for (const rota of ['/simulador-seguro-fianca', '/simulador-titulo-de-capitalizacao-aluguel']) {
    const total = jsDaPagina(lerPagina(rota));
    assert.ok(total <= 8 * 1024, `${rota}: JS = ${total} bytes`);
  }
});

test('a medição enxerga os arquivos externos da calculadora', () => {
  const comArquivos = jsDaPagina(lerPagina('/simulador-seguro-fianca'));
  const soInline = [...lerPagina('/simulador-seguro-fianca').matchAll(/<script(?![^>]*application\/ld\+json)(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  assert.ok(comArquivos > soInline + 2000, `${comArquivos} vs ${soInline}`);
});

test('HTML da Home ≤ 80 KB', () => {
  const kb = Buffer.byteLength(html) / 1024;
  assert.ok(kb <= 80, `HTML = ${kb.toFixed(1)} KB`);
});

test('nenhuma fonte externa no CSS', () => {
  assert.doesNotMatch(lerCssGerado(), /@import\s+url\(["']?https?:|fonts\.googleapis/);
});
