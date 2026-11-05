import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { lerHome, lerCssGerado } from './helpers.mjs';

const html = lerHome();

test('JS total enviado ao cliente ≤ 5 KB', () => {
  const inline = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  const dir = 'dist/_astro';
  const externo = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.js')).reduce((t, f) => t + readFileSync(`${dir}/${f}`).length, 0) : 0;
  const total = inline + externo;
  assert.ok(total <= 5 * 1024, `JS = ${total} bytes`);
});

test('HTML da Home ≤ 80 KB', () => {
  const kb = Buffer.byteLength(html) / 1024;
  assert.ok(kb <= 80, `HTML = ${kb.toFixed(1)} KB`);
});

test('nenhuma fonte externa no CSS', () => {
  assert.doesNotMatch(lerCssGerado(), /@import\s+url\(["']?https?:|fonts\.googleapis/);
});
