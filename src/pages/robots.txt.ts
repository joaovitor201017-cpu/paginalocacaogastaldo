import { site } from '../data/site';

// robots.txt: sem domínio final, bloqueia tudo; com domínio, libera e aponta o sitemap
export function GET() {
  const corpo = site.dominio
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site.dominio).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
