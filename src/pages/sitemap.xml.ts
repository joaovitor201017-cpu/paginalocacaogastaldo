import { site } from '../data/site';

// Mapa do site para o Google: todas as páginas públicas (a 404 fica de fora)
const rotas = [
  '/',
  '/seguro-fianca',
  '/titulo-de-capitalizacao',
  '/seguro-incendio',
  '/seguro-residencial',
  '/simulador-seguro-fianca',
  '/simulador-titulo-de-capitalizacao-aluguel',
  '/cotacao-seguro-residencial',
  '/cotacao-seguro-incendio',
  '/politica-de-privacidade',
];

export function GET() {
  const base = site.dominio ?? 'https://gastaldo-seguros.pages.dev';
  const urls = rotas.map((r) => `  <url><loc>${new URL(r, base).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
