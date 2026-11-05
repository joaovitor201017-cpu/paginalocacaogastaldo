# Página Seguro Fiança — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar `/seguro-fianca` com o texto do documento do João, montada com blocos de página de serviço reaproveitáveis e com o que já existe na Home.

**Architecture:** Texto e SEO num arquivo de dados por serviço (`src/data/servicos/`), blocos em `src/components/servico/`, componentes da Home generalizados por props sem mudar o HTML da Home. Schema novo `schemaServico` em `src/lib/schema.ts`.

**Tech Stack:** Astro 7 estático, CSS com escopo, JS inline mínimo, testes `node --test` sobre `dist/`.

**Spec:** `docs/superpowers/specs/2026-11-05-pagina-seguro-fianca-design.md`

## Global Constraints

- Textos exatamente como no documento do João, com as correções do spec: sede em Santo André; sem Google, depoimentos, números e SUSEP; sem avisos internos entre colchetes.
- Title: `Seguro Fiança Locatícia: Alugue sem Fiador e sem Caução`. Description: `Seguro fiança locatícia no ABC Paulista com corretora especializada. Alugue sem fiador e sem caução. Simule grátis e receba a cotação no WhatsApp.`
- Botões: "Simular meu seguro fiança online" (topo e final), "Simular agora" (pagamento), nenhum "Cotar".
- Selos: "Análise online e rápida", "Imóveis residenciais e comerciais", "Atendimento em todo o ABC Paulista".
- Mensagem do WhatsApp da página: "Olá! Quero fazer uma cotação de seguro fiança."
- JS da página ≤ 5 KB; sem rolagem lateral em 375 px; `noindex` enquanto `site.dominio` for null.
- A Home não pode mudar de comportamento: toda a suíte atual continua verde.

## Review Focus

- Página sem JS: abas mostram os 3 painéis, FAQ (`<details>`) abre e fecha, setas escondidas.
- Tabela de coberturas em 375 px: sem rolagem lateral, cada linha legível como card.
- Links para posts com `href: null` nunca geram `<a>` vazio nem `href="null"`.
- IDs repetidos: abas e seções da página de serviço não colidem com IDs do cabeçalho/rodapé.
- JSON-LD válido: FAQPage com as 9 perguntas exatas, BreadcrumbList com 2 itens.

---

### Task 1: Dados do serviço e schema

**Files:**
- Create: `src/data/servicos/tipos.ts`, `src/data/servicos/seguro-fianca.ts`
- Modify: `src/lib/schema.ts`
- Test: `tests/servico-dados.test.mjs`

**Interfaces:**
- Produces: `interface Servico { slug; seo:{title,description}; mensagemWhatsApp; topo:{h1,subtitulo,botaoPrincipal:{rotulo,href},botaoSecundario:string,selos:string[]}; oQueE:{titulo,paragrafos:string[],link:LinkBlog}; comoFunciona:{titulo,intro,passos:{titulo,texto}[]}; coberturas:{titulo,intro,tabelaTitulo,linhas:{cobertura,tipo,paga,limite}[],nota,assistencias:{titulo,texto},link:LinkBlog}; vantagens:{titulo,intro,grupos:GrupoBeneficios[]}; pagamento:{titulo,texto,botao:{rotulo,href},link:LinkBlog}; quemPode:{titulo,texto,documentosTitulo,documentos:{rotulo,texto}[]}; outras:{titulo,intro,itens:{titulo,texto,href}[],link:LinkBlog}; porQue:{titulo,texto,diferenciaisTitulo,diferenciais:{destaque,texto,icone}[],imobiliarias:{titulo,texto}}; cidades:{titulo,texto}; faq:{titulo,itens:{pergunta,resposta}[]}; final:{titulo,texto} }`, `type LinkBlog = { rotulo: string; href: string | null }`.
- Produces: `schemaServico(site, servico: {nome, descricao, url}, faq, cidades): Obj[]` → `[InsuranceAgency, Service, FAQPage, BreadcrumbList]`; `schemaHome` reaproveita a mesma montagem da agência (extrair `agencia(site, cidades)`).

- [ ] **Step 1:** Teste `tests/servico-dados.test.mjs`: 5 passos; 6 linhas de cobertura (primeira `Aluguel e multa por atraso`/`Básica`/`até 30x o valor do aluguel`); 3 grupos de vantagens com 7 itens cada; 9 FAQs; 3 selos exatos; nenhum texto contém `São Bernardo do Campo, onde fica`, `SUSEP`, `[` ou `Google`; `schemaServico` devolve tipos `['InsuranceAgency','Service','FAQPage','BreadcrumbList']`, Service com `areaServed` de 7 cidades e `serviceType: 'Seguro Fiança Locatícia'`, Breadcrumb com 2 itens (`Início`, `Seguro Fiança`).
- [ ] **Step 2:** Rodar `node --test tests/servico-dados.test.mjs` → FAIL (módulo não existe).
- [ ] **Step 3:** Implementar os arquivos com o texto do documento.
- [ ] **Step 4:** `npm test` → tudo PASS.
- [ ] **Step 5:** Commit `feat: dados e schema da página Seguro Fiança`.

### Task 2: Generalizar peças da Home

**Files:** Modify `src/components/home/Beneficios.astro`, `src/components/home/Cidades.astro`, `src/components/home/Hero.astro`, `src/components/WhatsAppFlutuante.astro`, `src/layouts/BaseLayout.astro`, `src/components/Botao.astro` (se preciso). Create `src/components/ColagemFotos.astro`. Test: `tests/home.test.mjs` (já existentes) + `tests/servico-dados.test.mjs` não muda.

**Interfaces:**
- `Beneficios` props: `{ id?='beneficios', titulo?, intro?, grupos?=beneficios, tituloNivel? }` — defaults reproduzem a Home exata. IDs internos prefixados por `id` (`aba-${id}-${g.id}`) para não colidir; o script passa a selecionar pela seção recebida.
- `Cidades` props: `{ titulo?, texto? }`.
- `ColagemFotos` (sem props): as duas fotos do hero com moldura (extraídas de `Hero`).
- `BaseLayout` prop `mensagemWhatsApp?` repassada a `WhatsAppFlutuante` prop `mensagem?`.

- [ ] **Step 1:** Rodar `npm test` → baseline verde. Nenhum teste novo: a suíte da Home é a prova de que nada mudou (se o teste de abas checar `aba-inquilinos`, atualizar a expectativa para o novo prefixo antes de mudar o código).
- [ ] **Step 2:** Implementar.
- [ ] **Step 3:** `npm test` → PASS.
- [ ] **Step 4:** Commit `refactor: peças da Home aceitam conteúdo por props`.

### Task 3: Página — trilha, topo, o que é, como funciona

**Files:** Create `src/pages/seguro-fianca.astro`, `src/components/servico/{Trilha,TopoServico,Passos}.astro`. Modify `tests/helpers.mjs` (`lerPagina(rota)`). Test: `tests/seguro-fianca.test.mjs`.

- [ ] **Step 1:** Testes: title e description exatos; `noindex`; um único H1 com o texto do spec; trilha `Início` → `/` e `Seguro Fiança` com `aria-current="page"`; 3 selos; botão principal com rótulo e `href="/simulador-seguro-fianca"`; botão WhatsApp com a mensagem da página codificada; H2 "O que é o seguro fiança locatícia?"; `<ol>` com 5 itens em "Como funciona"; JSON-LD contém `"@type":"Service"` e `"@type":"BreadcrumbList"`; botão flutuante usa a mensagem da página.
- [ ] **Step 2:** Rodar → FAIL. **Step 3:** Implementar. **Step 4:** `npm test` PASS. **Step 5:** Commit `feat: seguro fiança — topo, o que é e como funciona`.

### Task 4: Coberturas, vantagens, pagamento, quem pode contratar

**Files:** Create `src/components/servico/{TabelaCoberturas,ListaDocumentos}.astro`; Modify `src/pages/seguro-fianca.astro`. Test: `tests/seguro-fianca.test.mjs`.

- [ ] **Step 1:** Testes: `<table>` com `<caption>` ou H3 associado, 6 `<tr>` no corpo, `<th scope="col">` nas 4 colunas, e `data-rotulo` em cada `<td>` (usado no modo card do celular); nota da Porto presente; H3 "Assistências para o imóvel"; abas com 3 grupos de 7 cards e os 3 H3 do documento; botão "Simular agora" → simulador; H3 "Documentos para o seguro fiança" com 3 itens; nenhum `href="null"` na página.
- [ ] **Step 2:** FAIL. **Step 3:** Implementar (tabela vira cards abaixo de 640 px usando `td::before { content: attr(data-rotulo) }`). **Step 4:** PASS. **Step 5:** Commit `feat: seguro fiança — coberturas, vantagens, pagamento e documentos`.

### Task 5: Outras garantias, por que a Gastaldo, cidades, FAQ, chamado final

**Files:** Create `src/components/servico/{OutrasGarantias,Diferenciais,Faq,ChamadoFinal}.astro`; Modify `src/pages/seguro-fianca.astro`. Test: `tests/seguro-fianca.test.mjs`.

- [ ] **Step 1:** Testes: 3 cards de outras garantias com os hrefs do spec; 5 diferenciais; H3 "Seguro fiança para imobiliárias do ABC" + botão parceira; H2 de cidades do documento e texto com "Santo André, onde fica a nossa sede"; endereço real presente; 9 `<details>` com `<summary>` contendo H3 das perguntas; H2 "Alugue sem fiador hoje mesmo" com os dois botões; JS inline total da página ≤ 5 KB.
- [ ] **Step 2:** FAIL. **Step 3:** Implementar. **Step 4:** PASS. **Step 5:** Commit `feat: seguro fiança — garantias, diferenciais, cidades, FAQ e chamado final`.

### Task 6: Verificação visual

- [ ] Prints 1280 e 375 de cada seção; `scrollWidth` igual à largura; abas e setas funcionando; FAQ abre com teclado; Home sem mudança visual. Ajustes que surgirem entram com teste quando forem verificáveis no HTML/CSS. Commit `fix:` por ajuste.
