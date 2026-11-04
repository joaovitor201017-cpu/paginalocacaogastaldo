// Utilitários dos testes: leem o HTML e o CSS gerados pelo build em dist/
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export function lerHome() {
  return readFileSync('dist/index.html', 'utf8');
}

export function contar(html, re) {
  return (html.match(re) || []).length;
}

export function lerCssGerado() {
  const dir = 'dist/_astro';
  if (!existsSync(dir)) return lerHome();
  return readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(dir, f), 'utf8')).join('\n') + lerHome();
}

// Recorta o trecho de uma <section id="..."> para testes por seção
export function secao(html, id) {
  const ini = html.indexOf(`id="${id}"`);
  if (ini < 0) return '';
  const fim = html.indexOf('</section>', ini);
  return html.slice(ini, fim);
}
