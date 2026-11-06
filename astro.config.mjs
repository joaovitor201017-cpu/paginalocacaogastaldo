// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Gera cada página como rota.html (ex.: seguro-fianca.html). A Cloudflare Pages serve em /seguro-fianca
  // sem redirecionar para /seguro-fianca/, igual aos links internos e ao canonical.
  build: { format: 'file' },
  trailingSlash: 'never',
});
