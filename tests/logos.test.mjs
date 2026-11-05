import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alturaLogo } from '../src/lib/logos.ts';

test('logos largas e quadradas ficam com área visual parecida', () => {
  const larga = alturaLogo(588, 160, { area: 4400, max: 52 });
  const quadrada = alturaLogo(195, 160, { area: 4400, max: 52 });
  assert.ok(quadrada > larga, 'a quadrada fica mais alta');
  const areaLarga = larga * larga * (588 / 160);
  assert.ok(Math.abs(areaLarga - 4400) < 200);
});

test('altura respeita o máximo e é inteira', () => {
  const h = alturaLogo(100, 100, { area: 10000, max: 52 });
  assert.equal(h, 52);
  assert.ok(Number.isInteger(alturaLogo(300, 97, { area: 4400, max: 52 })));
});
