// Verificação do Google Search Console: responde no endereço exato, com .html,
// sem o redirecionamento automático da Cloudflare para a versão sem .html.
export function onRequest() {
  return new Response('google-site-verification: google325e92fa280b009e.html', {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
