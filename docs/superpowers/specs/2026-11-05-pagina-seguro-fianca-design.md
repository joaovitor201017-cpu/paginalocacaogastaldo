# Página de serviço: Seguro Fiança (/seguro-fianca) — desenho

Data: 2026-11-05 · Fonte do texto: `Página de Serviço – Seguro Fiança Locatícia no ABC Paulista.md` (enviado pelo João)

## Intenção

Primeira página de serviço do site. Ranquear para "seguro fiança" (e variações locais do ABC) e levar o visitante a fazer a simulação ou falar no WhatsApp. É também o molde das próximas páginas de serviço (Título de Capitalização, Seguro Incêndio, Seguro Residencial): os blocos são reaproveitáveis e cada página é um arquivo de dados com o texto dela.

## Metas, não-metas, anti-metas

- **Metas:** texto completo do documento na ordem dele; H1/H2/H3 exatamente como marcados; schema Service + FAQPage + BreadcrumbList + InsuranceAgency; mesma identidade, desempenho e acessibilidade da Home (JS ≤ 5 KB, sem rolagem lateral no celular, teclado e movimento reduzido).
- **Não-metas:** simulador, páginas do blog, Fiança Empresarial e Para Imobiliárias (os links apontam para as URLs futuras, como na Home).
- **Anti-metas:** qualquer número, nota, depoimento ou dado inventado; marcações de pendência visíveis na página; repetir código que a Home já tem.

## Regras herdadas da Home (decisão do João: "todas as alterações da Home valem aqui")

- Sede em **Santo André** (o texto diz São Bernardo: corrigir).
- **Sem** nota/avaliações do Google, **sem** depoimentos, **sem** números (anos, contratos), **sem SUSEP**.
- **Sem** a reserva de logos das seguradoras.
- Nenhum botão "Cotar".
- Ícones de contato sem fundo; cards de benefícios largos (220 px) com setas.
- Avisos internos do texto ("confirme com as seguradoras", "[Links para as Condições Gerais]", "[liste aqui as seguradoras]") **não aparecem**.

## Decisão do João

- **Exceções às regras da Home, nesta página (revisão do desenho, 2026-11-05):**
  - Botão principal: **"Simular meu seguro fiança online"**; botão de Formas de pagamento: **"Simular agora"**.
  - **Selos abaixo dos botões do topo entram** (para o João avaliar depois): "Análise online e rápida", "Imóveis residenciais e comerciais", "Atendimento em todo o ABC Paulista". O selo de nota do Google fica de fora (não há dado e foi retirado da Home).
  - **Seção final "Alugue sem fiador hoje mesmo" entra**, com "Simular meu seguro fiança online" e "Falar no WhatsApp".
  - **Foto do topo: a mesma da Home** (casal com caixas + chaves).

- **FAQ entra nesta página** (sanfona com `<details>`, cada pergunta é H3, schema FAQPage). Em páginas de serviço o FAQ é permitido.
- **Abordagem: blocos reaproveitáveis + arquivo de dados por página, reaproveitando a Home.**

## Abordagens consideradas

1. Página única sob medida — mais rápida agora, mas as 3 próximas repetiriam tudo.
2. **Blocos reaproveitáveis + dados por página (escolhida)** — custo um pouco maior agora; as próximas saem rápidas e iguais.
3. Gerar a página do Markdown — o texto mistura tabela, abas, sanfona e botões; viraria um dialeto frágil.

## Como fica (estrutura da página, em ordem)

1. **Trilha** visível "Início › Seguro Fiança" (BreadcrumbList com os mesmos 2 itens; não existe página "Garantias Locatícias").
2. **Topo (H1)** "Seguro Fiança Locatícia: alugue sem fiador e sem caução", subtítulo, botão principal "Simular meu seguro fiança online" → `/simulador-seguro-fianca`, secundário "Falar com um corretor no WhatsApp" (mensagem: "Olá! Quero fazer uma cotação de seguro fiança."), 3 selos. Fotos da Home ao lado, mesma composição.
3. **O que é** (H2 + 3 parágrafos).
4. **Como funciona** (H2 + intro + 5 passos numerados — é uma sequência real, numeração justificada). Sem vídeo por enquanto.
5. **Coberturas** (H2 + intro; H3 tabela com 6 linhas e 4 colunas; nota de que os limites são exemplo da Porto; H3 Assistências com a frase genérica). No celular a tabela vira cards empilhados.
6. **Vantagens** (H2) em 3 abas — **reaproveita o componente de abas da Home**, generalizado para receber os grupos por props. 7 cards por aba. Botão da aba Imobiliária: "Quero ser imobiliária parceira" (WhatsApp, igual à Home); aba Inquilino: "Fazer simulação"; aba Proprietário: "Proteger meu aluguel" (WhatsApp, igual à Home).
7. **Formas de pagamento** (H2 + parágrafo + botão "Simular agora").
8. **Quem pode contratar** (H2 + parágrafo; H3 Documentos com 3 itens).
9. **Outras garantias** (H2 + intro + 3 cards com link: Título de Capitalização `/titulo-de-capitalizacao`, Seguro Fiança Empresarial `/seguro-fianca-empresarial`, Seguro Incêndio `/seguro-incendio`).
10. **Por que a Gastaldo** (H2 + parágrafo sem a lista de seguradoras; H3 Nossos diferenciais com 5 itens no formato compacto do Sobre; H3 "Seguro fiança para imobiliárias do ABC" + botão parceira).
11. **Cidades** (H2 "Seguro fiança no ABC Paulista: cidades atendidas") — **reaproveita o bloco Cidades da Home** com título/texto por props; endereço, telefone e horário reais de `site.ts`; mapa com a fachada que já existe.
12. **FAQ** (H2 + 9 perguntas em sanfona).
13. **Chamado final** (H2 "Alugue sem fiador hoje mesmo" + parágrafo + "Simular meu seguro fiança online" + "Falar no WhatsApp"), painel marinho no estilo da seção de parceiras.

Links para posts do blog (guia completo, o que cobre, quanto custa, fiador x seguro fiança x caução) ficam no arquivo de dados com `href: null` e só aparecem quando o post existir.

## Peças

- `src/data/servicos/seguro-fianca.ts` — todo o texto, SEO, FAQ, passos, coberturas, vantagens e links.
- `src/components/servico/` — blocos novos: `TopoServico`, `Passos`, `TabelaCoberturas`, `ListaDocumentos`, `OutrasGarantias`, `Diferenciais`, `Faq`, `Trilha`, `ChamadoFinal`.
- Reaproveitados (generalizados por props, sem mudar a Home): `Beneficios` (abas), `Cidades`, `MapaFachada`, `Botao`, `ImagemReservada`.
- `BaseLayout`/`WhatsAppFlutuante` aceitam a mensagem do WhatsApp por página.
- `src/lib/schema.ts` ganha `schemaServico(...)`: Service (areaServed com as 7 cidades, provider = InsuranceAgency), FAQPage, BreadcrumbList.
- `src/pages/seguro-fianca.astro` monta tudo.

## Restrições

Astro estático, CSS com escopo, JS só inline e mínimo (sanfona sem JS via `<details>`; abas e setas já existentes). Testes no padrão atual (`node --test` sobre `dist/`), TDD. Title e meta description exatos do documento. `noindex` continua enquanto não houver domínio.

## Fica para o construtor

Espaçamentos, ritmo de fundos alternados (branco / cinza claro como na Home), ícones dos passos e diferenciais (do conjunto `icones.ts`), formato visual exato da tabela.

## Pendências do João (não bloqueiam)

Conferir limites da Porto e a lista de documentos, logos das seguradoras, vídeo, posts do blog.
