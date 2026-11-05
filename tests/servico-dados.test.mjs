// Dados e schema da página Seguro Fiança (sem depender do build)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seguroFianca as s } from '../src/data/servicos/seguro-fianca.ts';
import { schemaServico } from '../src/lib/schema.ts';

// Junta só os textos (strings) dos dados, sem a sintaxe do JSON
const textos = (v) => (typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(textos) : []);
const todoTexto = textos(s).join(' | ');

test('estrutura do texto do documento', () => {
  assert.equal(s.comoFunciona.passos.length, 5);
  assert.equal(s.coberturas.linhas.length, 6);
  assert.deepEqual(s.coberturas.linhas[0], { icone: 'moeda', cobertura: 'Aluguel e multa por atraso', tipo: 'Básica', paga: 'Aluguéis que o inquilino deixar de pagar', limite: 'até 30x o valor do aluguel' });
  assert.equal(s.vantagens.grupos.length, 3);
  for (const g of s.vantagens.grupos) assert.equal(g.itens.length, 7, g.id);
  assert.equal(s.faq.itens.length, 9);
  assert.equal(s.porQue.diferenciais.length, 5);
  assert.equal(s.quemPode.documentos.length, 3);
});

test('selos, botões e SEO como combinado', () => {
  assert.deepEqual(s.topo.selos, ['Análise online e rápida', 'Imóveis residenciais e comerciais', 'Atendimento em todo o ABC Paulista']);
  assert.equal(s.topo.botaoPrincipal.rotulo, 'Simular meu seguro fiança online');
  assert.equal(s.pagamento.botao.rotulo, 'Simular agora');
  assert.equal(s.seo.title, 'Seguro Fiança Locatícia: Alugue sem Fiador e sem Caução');
  assert.equal(s.mensagemWhatsApp, 'Olá! Quero fazer uma cotação de seguro fiança.');
});

test('regras herdadas da Home: sede em Santo André, sem Google, SUSEP ou avisos internos', () => {
  assert.ok(!todoTexto.includes('São Bernardo do Campo, onde fica'));
  for (const proibido of ['SUSEP', 'Google', '[', 'Cotar']) assert.ok(!todoTexto.includes(proibido), proibido);
});

test('schemaServico: agência, serviço, FAQ e trilha', () => {
  const site = { nome: 'Gastaldo Seguros', dominio: null, telefone: null, email: null, endereco: null, cidadeSede: 'Santo André' };
  const cidades = ['Santo André', 'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra'].map((nome) => ({ nome }));
  const out = schemaServico(site, { nome: 'Seguro Fiança Locatícia', descricao: 'x', caminho: '/seguro-fianca', rotulo: 'Seguro Fiança' }, s.faq.itens, cidades);
  assert.deepEqual(out.map((x) => x['@type']), ['InsuranceAgency', 'Service', 'FAQPage', 'BreadcrumbList']);
  const [, servico, faq, trilha] = out;
  assert.equal(servico.serviceType, 'Seguro Fiança Locatícia');
  assert.equal(servico.areaServed.length, 7);
  assert.equal(faq.mainEntity.length, 9);
  assert.deepEqual(trilha.itemListElement.map((i) => i.name), ['Início', 'Seguro Fiança']);
});

// --- Seguro Residencial
import { seguroResidencial as r } from '../src/data/servicos/seguro-residencial.ts';

test('Seguro Residencial: estrutura do documento e regras do site', () => {
  assert.equal(r.coberturas.linhas.length, 13);
  assert.equal(r.coberturas.linhas[0].tipo, 'Básica');
  assert.equal(r.assistencias.grupos.length, 2);
  assert.equal(r.comoFunciona.passos.length, 4);
  for (const g of r.vantagens.grupos) assert.equal(g.itens.length, 5, g.id);
  assert.equal(r.porQue.diferenciais.length, 4);
  assert.equal(r.faq.itens.length, 8);
  assert.equal(r.topo.selos.length, 5);
  const t = textos(r).join(' | ');
  for (const proibido of ['São Bernardo do Campo, onde fica', 'com sede em São Bernardo', 'SUSEP', 'Google', '[', 'Cotar', 'Porto']) assert.ok(!t.includes(proibido), proibido);
  assert.ok(r.porQue.texto.includes('com sede em Santo André'));
});

test('subtítulo do Seguro Residencial', () => {
  assert.equal(r.topo.subtitulo, 'Proteja seu imóvel contra incêndio, roubo e danos elétricos, com assistência 24 horas. Faça a cotação grátis, compare as seguradoras no WhatsApp e contrate o seguro do seu jeito.');
});
