import { test } from 'node:test';
import assert from 'node:assert/strict';
import { schemaHome } from '../src/lib/schema.ts';

const site = { nome: 'Gastaldo Seguros', dominio: null, whatsapp: null, telefone: null, email: null, endereco: null, horario: null, cnpj: null, susep: null, cidadeSede: 'São Bernardo do Campo', mensagemWhatsApp: 'x' };
const cidades = ['São Bernardo do Campo', 'Santo André', 'São Caetano do Sul', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra'].map((nome) => ({ nome, href: null }));

test('sem FAQ: só InsuranceAgency e WebSite', () => {
  const s = schemaHome(site, [], cidades);
  assert.deepEqual(s.map((x) => x['@type']), ['InsuranceAgency', 'WebSite']);
});

test('dados pendentes são omitidos (sem null no JSON-LD)', () => {
  const [agencia] = schemaHome(site, [], cidades);
  assert.equal('telephone' in agencia, false);
  assert.equal('address' in agencia, false);
  assert.doesNotMatch(JSON.stringify(agencia), /null/);
});

test('areaServed traz as 7 cidades', () => {
  const [agencia] = schemaHome(site, [], cidades);
  assert.equal(agencia.areaServed.length, 7);
  assert.equal(agencia.areaServed[0].name, 'São Bernardo do Campo');
});

test('com FAQ: inclui FAQPage com Question/Answer', () => {
  const s = schemaHome({ ...site, telefone: '(11) 4000-0000' }, [{ pergunta: 'P?', resposta: 'R.' }], cidades);
  assert.equal(s.length, 3);
  assert.equal(s[0].telephone, '(11) 4000-0000');
  assert.equal(s[2]['@type'], 'FAQPage');
  assert.deepEqual(s[2].mainEntity[0], { '@type': 'Question', name: 'P?', acceptedAnswer: { '@type': 'Answer', text: 'R.' } });
});

test('endereço completo vira PostalAddress estruturado e horário vira openingHours', () => {
  const comEndereco = {
    ...site,
    endereco: { logradouro: 'Av. Pereira Barreto, 1395 - Sl 65B', bairro: 'Paraíso', cidade: 'Santo André', uf: 'SP', cep: '09751-000' },
    horarioSchema: 'Mo-Fr 09:00-18:00',
  };
  const [agencia] = schemaHome(comEndereco, [], cidades);
  assert.deepEqual(agencia.address, {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Pereira Barreto, 1395 - Sl 65B - Paraíso',
    addressLocality: 'Santo André',
    addressRegion: 'SP',
    postalCode: '09751-000',
    addressCountry: 'BR',
  });
  assert.equal(agencia.openingHours, 'Mo-Fr 09:00-18:00');
});
