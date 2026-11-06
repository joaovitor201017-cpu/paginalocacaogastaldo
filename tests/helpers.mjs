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

// Lê o HTML gerado de qualquer rota (ex.: '/seguro-fianca')
// (build.format = 'file': a página fica em dist/rota.html)
export function lerPagina(rota) {
  const arquivo = join('dist', `${rota.replace(/^\/|\/$/g, '')}.html`);
  return readFileSync(existsSync(arquivo) ? arquivo : join('dist', rota, 'index.html'), 'utf8');
}

// JS que uma página realmente envia ao navegador: scripts dentro do HTML (fora o JSON-LD)
// + arquivos /_astro/*.js que ela carrega + os arquivos que esses importam.
export function jsDaPagina(html) {
  const inline = [...html.matchAll(/<script(?![^>]*application\/ld\+json)(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].reduce((t, m) => t + Buffer.byteLength(m[1]), 0);
  const vistos = new Set();
  const fila = [...html.matchAll(/\/_astro\/([\w.-]+\.js)/g)].map((m) => m[1]);
  let externo = 0;
  while (fila.length) {
    const f = fila.pop();
    if (vistos.has(f) || !existsSync(join('dist/_astro', f))) continue;
    vistos.add(f);
    const conteudo = readFileSync(join('dist/_astro', f), 'utf8');
    externo += Buffer.byteLength(conteudo);
    for (const m of conteudo.matchAll(/["']\.\/([\w.-]+\.js)["']/g)) fila.push(m[1]);
  }
  return inline + externo;
}
