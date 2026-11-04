# Design — Home "Soluções para Alugar no ABC" (Gastaldo Seguros)

Data: 2026-11-04 · Status: aprovado pelo João em 2026-11-04

## Intenção

Site de **SEO local** da Gastaldo Seguros, corretora de São Bernardo do Campo especializada em garantias locatícias no ABC Paulista. Esta primeira entrega é a **Home**, que também define o sistema visual (tokens, componentes) que as próximas páginas vão reaproveitar: serviços, simuladores, imobiliárias e cidades.

A Home ataca termos amplos ("soluções para alugar ABC", "garantia locatícia ABC", "alugar sem fiador"), mostra autoridade (imobiliárias parceiras) e distribui o visitante para as páginas certas. O texto já está pronto: `Página Home – Garantias Locatícias no ABC.pdf` (fonte da verdade do conteúdo e da hierarquia H1/H2/H3).

## Objetivos

- Reproduzir a **estrutura e o design** da página "Soluções para Alugar" da Porto Seguro (referência: `Desktop/Soluções para Alugar _ Porto Seguro.html`), com fundo branco, fotos grandes com cantos arredondados, carrossel de cards e benefícios por público.
- Aplicar a **identidade visual da Gastaldo**: logo, Poppins e paleta de azuis.
- **Performance máxima**: HTML estático, quase zero JavaScript. Meta: Lighthouse mobile ≥ 95 em Performance, SEO, Acessibilidade e Boas práticas; LCP < 2,5 s; CLS < 0,1.
- SEO técnico completo: title, meta description, canonical, Open Graph, hierarquia de headings conforme o PDF e JSON-LD (InsuranceAgency + WebSite + FAQPage).

## Não objetivos (nesta entrega)

- As outras páginas (serviços, simuladores, cidades, blog). Os links da Home apontam para as URLs definidas no PDF, mesmo que ainda deem 404.
- Simuladores funcionando.
- Backend de formulário.
- Preencher dados reais que ainda não temos.

## Anti-objetivos (seria fracasso mesmo funcionando)

- Usar React, Vue, Tailwind, jQuery ou biblioteca de carrossel. Tudo é Astro + CSS + JS nativo mínimo.
- Copiar a Porto: nada de logo, foto, texto ou cor da Porto. Copiamos só a estrutura e o ritmo do layout.
- Conteúdo importante escondido de forma que o Google não leia. O conteúdo das abas e do carrossel precisa estar no HTML.
- Números, depoimentos ou dados inventados. Todo campo `[entre colchetes]` do PDF continua visivelmente marcado como pendente.

## Restrições

- Astro 7 em modo estático (`output: 'static'`), sem integrações de framework.
- Fundo do site branco.
- Fonte **Poppins** hospedada localmente (woff2, pesos 300/400/500/600/700, só subset latino), com `font-display: swap` e preload do peso do H1. Nada de Google Fonts por CDN.
- Imagens via `astro:assets` (`<Image>`/`<Picture>`), geradas em AVIF/WebP com `width`/`height` definidos. Só a imagem do topo carrega com prioridade; o resto usa `loading="lazy"`.
- Fotos no estilo da Porto (pessoas reais, mudança, caixas, chaves, luz natural). **O João envia as fotos depois.** Nesta entrega, cada foto é um **espaço reservado**: um bloco com a proporção final, cantos arredondados e uma legenda dizendo qual imagem vai ali e em que tamanho. O componente de imagem já fica pronto para receber o arquivo via `astro:assets` sem mudar o layout.
- Português do Brasil em todo o conteúdo e comentários.

## Abordagens consideradas

1. **Astro puro, CSS próprio e JS nativo mínimo** (escolhida). HTML limpo, menor peso possível e componentes reaproveitáveis. Exige escrever o CSS na mão.
2. Astro + Tailwind. Igualmente leve, mas o HTML fica poluído de classes e acrescenta uma dependência de build.
3. Astro + ilhas React. Só se justificaria com simuladores complexos e acrescenta JS desnecessário na Home.

**Decisão do João:** opção 1, "Astro puro, puro HTML", porque o foco é performance e velocidade.

## Identidade visual (tokens)

Tirados do logo (`public/brand/`) e do padrão aprovado dos carrosséis da Gastaldo:

| Token | Valor | Uso |
|---|---|---|
| `--marinho` | `#043967` | logo, títulos, botão primário escuro |
| `--marinho-profundo` | `#0B2550` | rodapé, faixa de parceiras |
| `--azul` | `#1A7DF0` | links, botão primário |
| `--azul-escuro` | `#0A6FD6` | hover de botão |
| `--azul-claro` | `#6CB8FF` | símbolo do logo, destaques |
| `--azul-ceu` | `#A8DBFF` / `#1FB0FF` | destaques em fundo escuro |
| `--amarelo` | `#FFC53D` | acento pontual (selos, ícones) |
| `--cinza-fundo` | `#F4F7FB` | cards e faixas suaves sobre o branco |
| `--texto` | `#1B2A3A` | corpo |

Tipografia: Poppins. Títulos em 700 com letter-spacing levemente negativo (−0,02 a −0,03 em; mais suave que nos carrosséis, por legibilidade); corpo em 400, 16–18 px, line-height 1,6; negritos em 600. Escala fluida com `clamp()`. Cantos arredondados grandes (20–32 px) nas fotos e cards, como na Porto. O logo marinho vai no cabeçalho e o branco no rodapé escuro.

## Estrutura da página (ordem do PDF ↔ padrão da Porto)

1. **Cabeçalho fixo** simples: logo, links (Soluções, Para Imobiliárias, Sobre, Contato) e botão "Falar com um consultor" (WhatsApp). No celular, menu com `<details>` ou um botão com JS mínimo.
2. **Breadcrumb** ("Início") como na Porto, com schema BreadcrumbList. *Decisão minha:* na Home ele é opcional, então só entra se ficar natural no layout.
3. **Hero**: H1 "Soluções para Alugar no ABC", subtítulo, botão principal (WhatsApp) e secundário (âncora para `#solucoes`), e os 4 selos de números (pendentes). À direita, colagem de 2 fotos com cantos arredondados, como a imagem `bh-solucoes-alugar` da Porto: casal na mudança + chaves sobre fundo azul da marca.
4. **Faixa de logos das imobiliárias** (sem título): "Parceira das principais imobiliárias do ABC" + logos em escala de cinza.
5. **H2 "Seguros e garantias para alugar sem fiador"** (`#solucoes`): 4 cards com foto, H3, texto e 2 botões (Saiba mais / Simular ou Cotar). No desktop ficam em grade ou fileira; no celular, carrossel com CSS `scroll-snap`, sem biblioteca. Setas com JS mínimo só no desktop, se couber. Abaixo, link "Fiador, seguro fiança ou caução: qual escolher no ABC".
6. **H2 "Alugar no ABC nunca foi tão fácil"**: abas Inquilinos / Proprietários / Imobiliárias, cada uma com H3, a lista de 7 benefícios, foto e botão. As abas são acessíveis (`role="tablist"`) com JS mínimo. Sem JS, as três listas aparecem empilhadas, e todo o conteúdo fica sempre no HTML.
7. **H2 "Referência em seguros locatícios no ABC"**: faixa de fundo azul (equivalente ao "Portal das Imobiliárias" da Porto) com a grade de logos em cards brancos (H3 Imobiliárias parceiras; cidade no `title`/hover), os números da parceria (H3), depoimentos (H3) e o botão "Quero ser uma imobiliária parceira".
8. **H2 "Sobre a Gastaldo Seguros"**: texto + espaço da história (pendente) + H3 Nossos diferenciais em 4 itens com ícone + logos das seguradoras (pendente) + link para o post do blog.
9. **H2 "Atendemos todo o ABC Paulista"**: as 7 cidades em chips/lista, com São Bernardo em destaque como sede. *Decisão minha:* cada cidade já é um link para a futura página de cidade, assim que essas URLs forem definidas; até lá, só texto.
10. **H2 "Fale com a gente"**: dados de contato (pendentes), mapa e formulário curto. O mapa usa uma **fachada**: imagem estática + botão "Ver no mapa" que só então carrega o iframe do Google, para não pesar o carregamento. *Decisão minha:* o formulário monta uma mensagem e abre o WhatsApp com os dados preenchidos, sem backend, até existir um.
11. **H2 "Pronto para alugar sem fiador?"**: CTA final com fundo marinho e os botões Simular / WhatsApp.
12. **Rodapé** (não é H2): Soluções, Simuladores, Institucional e Dados (CNPJ/SUSEP pendentes), com o logo branco.
13. **Botão flutuante de WhatsApp** em toda a página, com a mensagem "Olá! Quero saber sobre as soluções para alugar."

## Componentes (reaproveitáveis nas próximas páginas)

`BaseLayout` (head/SEO/JSON-LD), `Header`, `Footer`, `WhatsAppFlutuante`, `Botao`, `CardSolucao`, `Carrossel`, `Abas`, `FaixaParceiras`, `Pendente` (marcador visual de dado a preencher), `MapaFachada`. Os dados do site (contato, links, imobiliárias, cidades) ficam centralizados em `src/data/`, para trocar os pendentes num lugar só.

## Pendências de conteúdo (ficam marcadas no site)

Números (imobiliárias, contratos, anos, nota e avaliações do Google, corretores treinados, cidades), depoimentos, logos das imobiliárias (autorização por escrito), cidades de cada imobiliária, história/fundação/SUSEP, logos das seguradoras, WhatsApp, telefone, e-mail, endereço, horário, CNPJ e domínio final (para canonical e schema).

## O que fica a critério de quem constrói

Espaçamentos exatos, breakpoints, escolha das fotos dentro do estilo descrito, ícones (SVG inline, traço simples nas cores da marca), microinterações discretas (hover, foco visível) e respeito a `prefers-reduced-motion`.
